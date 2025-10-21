---
layout: post
title: (At) the WIM of Microsoft - Uncovering Microsoft's Patch Secrets
description: Exploring the WIM File Format for Patch Diffing
image: Rembrandt_-_The_Philosopher_in_Meditation.jpeg
---

# Following the bits
While patch diffing with [PatchExtract.ps1](https://gist.github.com/wumb0/306f97dc8376c6f53b9f9865f60b4fb5), I encountered a peculiar change in Microsoft's recent patch releases. They were usually packaged as `.cab` files but now released as `.wim` files. What is this file format?

# A bit of History
Thankfully there is available documentation of this format. We will be referring to this whitepaper heavily to lay down its design elements. Microsoft's official [whitepaper](https://www.microsoft.com/en-us/download/details.aspx?id=13096) describes the format as follows:

Windows Imaging Format (WIM)
: a file-based disk image format introduced in Windows Vista. WIM files are compressed packages containing a number of related files. The format of a WIM file is optimized for maximum compression using LZX, fast compression using XPRESS, or uncompressed.[^1]

To simplify, a `.wim` is a file which is mounted to view, like you would a disk, to access the files. Think of it like inserting a CD into an optical drive to view its file contents.

The format was introduced during the Vista days and was used recently for distributing patches sometime in 2024[^2] [^3]. This change is not exactly problematic as Microsoft is not trying to keep patches out of reach from prying eyes (*it did prompt interest to this research*). All modern Windows systems have tools to deal with this format such as `ImageX` (deprecated), `dism` (which replaced `ImageX`) and the [DISM Powershell Module](https://learn.microsoft.com/en-us/powershell/module/dism/?view=windowsserver2025-ps) (which is built on top of DISM). However these tools require [Admin privileges](https://learn.microsoft.com/en-us/windows-hardware/manufacture/desktop/take-inventory-of-an-image-or-component-using-dism?view=windows-11#list-images-that-are-contained-in-a-wim-or-vhd-file) as they will mount the file as if it were a disk, hence the *"file-based disk image format"*.

There are also third party tools which can recognize and can unpack the format, with the more known of these being [7zip](https://github.com/ip7z/7zip/tree/main/CPP/7zip/Archive/Wim) and [PeaZip](https://peazip.github.io/wim-utility.html). There are scripts such as [this](https://www.elevenforum.com/t/a-script-to-extract-wim-and-psf-from-msu-windows-update-files.39262/) shared in ElevenForum by [Jen Wolf / jen1-sys](https://github.com/jen1-sys) and [this](https://github.com/m417z/winbindex/blob/main/data/upd02_get_manifests_from_updates.py#L170) from `winbindex` both leveraging 7zip. Of the two archiver utilities, 7zip unpacks faster. There is also [wimlib](https://wimlib.net/) which provides a suite of tools to work with `.wim` files.

# A Closer Look

![wim file structure]

The WIM File Structure is similar to other formats wherein a header is at the start of the file, followed by the Resource Files and the Metadata Resource, then the Lookup Table. The Resource Files are the actual files we want (e.g. `.cab` files) and the Lookup Table will tell us where to find them in the `.wim` file.

## WIM Header
The header struct is useful for telling if there are compressed files in the file, where they are located via the Lookup Table and where the Metadata resource is located. Let's take a look:
```
typedef struct _WIMHEADER_V1_PACKED
{
    CHAR ImageTag[8];                 // "MSWIM\0\0"
    DWORD cbSize;                     // Header size, always
                                      // 208 bytes
    DWORD dwVersion;                  // Always 68864
    DWORD dwFlags;                    // Describes resources
    DWORD dwCompressionSize;          // Size of wim if compressed
    GUID gWIMGuid;
    USHORT usPartNumber;
    USHORT usTotalParts;
    DWORD dwImageCount;
    RESHDR_DISK_SHORT rhOffsetTable;  // Lookup Table
    RESHDR_DISK_SHORT rhXmlData;
    RESHDR_DISK_SHORT rhBootMetadata; // Metadata resource
    DWORD dwBootIndex;
    RESHDR_DISK_SHORT rhIntegrity;
    BYTE bUnused[60];
} WIMHEADER_V1_PACKED, *LPWIMHEADER_V1_PACKED;
```

We are mainly interested if `dwFlags` indicates the following values:

```
FLAG_HEADER_COMPRESSION                 0x00000002
FLAG_HEADER_COMPRESS_XPRESS             0x00020000
FLAG_HEADER_COMPRESS_LZX                0x00040000
```

If `FLAG_HEADER_COMPRESSION` is set in the header, either `FLAG_HEADER_COMPRESS_XPRESS` or `FLAG_HEADER_COMPRESS_LZX` will also be set. As we will go over later, Resources also have their own flag to indicate whether they are compressed. The header tells us which compression method was used. It can be either [XPRESS](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-xca/a8b7cb0a-92a6-4187-a23b-5e14273b96f8) or [LZX](https://en.wikipedia.org/wiki/LZX), but there is a third commonly referred to as [LZMS](https://wimlib.net/compression.html#LZMS) for [solid WIMs](https://en.wikipedia.org/wiki/Solid_compression).

## Lookup Table
As indicated above, the Lookup Table and Metadata are of type `RESHDR_DISK_SHORT`:

```
typedef struct _RESHDR_DISK_SHORT
{
    RESHDR_BASE_DISK Base;
    LARGE_INTEGER liOriginalSize;    // Uncompressed size
                                     // of the resource
}

typedef struct _RESHDR_BASE_DISK
{
    union
    {
        ULONGLONG ullSize;
        struct
        {
            BYTE sizebytes[7];       // Compressed size
                                     // of the resource
            BYTE bFlags;
        };
    };
    LARGE_INTEGER liOffset;
}
```


`RESHDR_DISK_SHORT` is composed of another struct, `RESHDR_BASE_DISK`, which tells us the compressed size, the flags and the location of the Lookup Table/Metadata in the file. Each record in the Lookup Table will include the Resource offset, hash and compression flag:


```
typedef struct _RESHDR_DISK
{
    RESHDR_DISK_SHORT;
    USHORT usPartNumber;
    DWORD dwRefCount;
    BYTE bHash[HASH_SIZE];          // SHA1
}
```

As mentioned earlier, `dwFlags` will tell us if compression was used. Each Resource has an accommodating `bFlags` variable which is a byte value used to identify if it is compressed:

```
RESHDR_FLAG_FREE                    0x01
RESHDR_FLAG_METADATA                0x02
RESHDR_FLAG_COMPRESSED              0x04
RESHDR_FLAG_SPANNED                 0x08
```

If `FLAG_HEADER_COMPRESSION` is unset, `RESHDR_FLAG_COMPRESSED` will also be unset.

## Metadata Resource

There is a `SECURITYBLOCK_DISK` struct at the head of the Metadata resource which we can ignore. Each record in the Metadata is described as:

```
typedef struct _DIRENTRY
{    
    LARGE_INTEGER liLength;                 // Size of this struct
    DWORD dwAttributes;
    DWORD dwSecurityId;
    LARGE_INTEGER liSubdirOffset;
    LARGE_INTEGER liUnused1;
    LARGE_INTEGER liUnused2;
    // File Timestamps
    LARGE_INTEGER liCreationTime;
    LARGE_INTEGER liLastAccessTime;
    LARGE_INTEGER liLastWriteTime;
    BYTE bHash[HASH_SIZE];                  // SHA1
    union
    {
        struct
        {
            DWORD dwReparseTag;
            DWORD dwReparseReserved;
        };
        LARGE_INTEGER liHardLink;
    };
    USHORT wStreams;                        // Alternate
                                            // Data Streams
    USHORT wShortNameLength;
    USHORT wFileNameLength;
    WCHAR FileName[0];
}
```

For each entry record, we're mostly interested in:
1. `liLength` - Size of the struct which is variable
2. `bHash`
3. `wFileNameLength`
4. `FileName`

The struct is variable in size as Resources can have Alternate Data Streams, a shortname and a filename which are found at the tail end but the minimum size is [0x66 or 102 bytes](https://github.com/ebiggers/wimlib/blob/master/include/wimlib/dentry.h#L17). Since the `FileName` is at the end of the struct, it is read by seeking to the very end by adding 0x66 and then reading a `WCHAR` string of `wFileNameLength` length. The timestamps are technically unnecessary but handy to date when the `.cab` files were created and last modified.

# Unpacking the WIM
The Lookup Table and the Metadata resource go hand-in-hand to identify the resources inside the `.wim`. Think of these things as three pieces needed to retrieve or carve the files from the `.wim` file:

|-|-|
|Resource Files|File data|
|Lookup Table / rhOffsetTable|Contains the offsets and the hash of each resource file
|Metadata Resource / rhBootMetadata|Contains the file names and the hash of each entry

The whitepaper describes the file retrieval process as the "Image Apply Process"[^4]. While the process is clear enough, we can further simplify it for our purposes:
1. Get the location of the Lookup Table and the Metadata from the header.
2. Match the SHA1 from the Metadata with the Lookup Table.
3. Write the file by combining the data from the Metadata and the Lookup Table.

## Inspecting with ImHex

To understand how these pieces work together, we'll use a hex editor called [ImHex](https://github.com/WerWolv/ImHex). To aid in our investigation exercise, I wrote a [pattern file](https://github.com/basicinfosecurity/misc/blob/master/WIM/wim.hexpat):

![imhex wim pattern]

If you want to follow along, you can download any recent patch from [Microsoft Update Catalog](https://catalog.update.microsoft.com/home.aspx) and import the [pattern file](https://github.com/basicinfosecurity/misc/tree/master/WIM/wim.hexpat) to Imhex.

We'll try to understand how Microsoft packages the patch. Let's look at the header. If we check the flags at offset `+0x10`, only one flag is set which is `FLAG_HEADER_RP_FIX`. The meaning of this flag is not important for our purpose. What is important is `FLAG_HEADER_COMPRESSION` is unset:

![header flags]

At `+0x30` we find info on the Lookup Table:

![lookup table]

The resource is not compressed as supported by `liOriginalSize` and `sizebytes` being equal in value. The former refers to the uncompressed size while the latter is the compressed size. We also see the Lookup Table is located at `0x30a2d304`. We can use the `liOriginalSize` value and the size of struct `RESHDR_DISK` to compute how many records present in the Lookup Table so `liOriginalSize / sizeof(RESHDR_DISK)` amounts to 8 records.

At `+0x60` we expect to find data on the Metadata resource, however:

![metadata1]

There's nothing there. Is our patch file faulty? Is the metadata missing?

If we drill down `FileResources`, we will find something interesting at the first resource:

![metadata2]

Out of all the resources, the first resource has its `RESHDR_FLAG_METADATA` set. Why is that?

It turns out this is where [Microsoft stored the Metadata resource](https://github.com/ebiggers/wimlib/blob/e59d1de0f439d91065df7c47f647f546728e6a24/src/blob_table.c#L1050). Knowing this, we can try to parse this record as Metadata, laying on top this pattern:

```
struct metadata_resource{
    _SECURITYBLOCK_DISK security_data;
    _DIRENTRY entries[(WIM Header.rhOffsetTable.liOriginalSize/
        sizeof(_RESHDR_DISK))];   
};
```


## Parsing the Metadata
Now that we have both Lookup Table and Metadata resource, we can now piece back together the files packaged in the WIM file.

The Metadata resource is made up of Security Data and Directory Entries. The Security Data is not always present, particularly for patch files. `dwTotalLength` refers to the struct's size. If it is only 8, then it is basically empty.

Let's take a look at `boot_metadata` -> `entries`. The `dwAttributes` variable corresponds to the [File Attribute Constants](https://learn.microsoft.com/en-us/windows/win32/fileio/file-attribute-constants). The first entry is flagged as `FILE_ATTRIBUTE_DIRECTORY`:

![direntry]

This entry usually corresponds to the parent folder which contains the `.cab` files. Since we're only interested in the `.cab` files, we can skip this entry.

The next entries are of more interest:

![entry2pt1]

This record is flagged as `FILE_ATTRIBUTE_ARCHIVE` and has the name "`DesktopDeployment.cab`".

Since it's only metadata of the file, we'll need to look up the offset and size using the `bHash`:

![entry2pt2]

`bHash` is a byte array which equals to `89E96B37CC2EE5E6017FF2AB03E399133C65C002`.

Aren't the entries in the Metadata and Lookup table ordered? Unfortunately no, which is why lookups are performed. If we take the hash and match it to a record in the Lookup Table, we locate the offset and size at index 1 of `FileResources`.

![resource1]

So we can confirm that the file is located just after the header, just as depicted in the WIM structure. **We can also see the file is uncompressed.**

![dd]

# Putting it all together
We learned how the WIM format works, how to find the files in the WIM file and most importantly how Microsoft ships their patches. We find out they ship them uncompressed. This probably is due to performance reasons. Patch files are enormous and can take up to a few GB of disk space. Compressing is great for saving space but if you're applying patches decompressing files might consume a lot of resources, driving up CPU and RAM usage. This, on top of [unpacking the Patch Storage File (PSF)](https://learn.microsoft.com/en-us/windows/deployment/update/forward-reverse-differentials), will not result into a satisfactory experience.

How can we use this information? Now that we know how the format works, we can just retrieve the files using scripts. I wrote two scripts, one in [powershell](https://github.com/basicinfosecurity/misc/blob/master/WIM/wim.ps1) and another in [python](https://github.com/basicinfosecurity/misc/blob/master/WIM/wim.py).


```
...
class BaseClass{
    $size
    $offset
}
class ResourceHeader : BaseClass{
    ResourceHeader($stream, $readOffset){
        $data = Read $stream $readOffset 0x16
        $this.size = ReadSize $data[0..6]
        $this.offset = ReadValue $data[8..15]
    }
}

class MetaData{
     # 102 is the minimum size of the struct
     # https://github.com/ebiggers/wimlib/blob/master/include/
     wimlib/dentry.h#L17
    $metadataEntryStructSz = 0x66
    $length
    $CreationTime
    $LastAccessTime
    $LastWriteTime
    $SHA1
    $FileName
    MetaData($stream, $readOffset){
        $data = Read $stream $readOffset $this.metadataEntryStructSz

        # Parse metadata record entry,
        # first record is the root record which can be skipped
        $this.length = ReadSize $data[0..7]
        $this.CreationTime = ReadValue $data[40..47]
        $this.LastAccessTime = ReadValue $data[48..55]
        $this.LastWriteTime = ReadValue $data[56..63]
        $this.SHA1 = ReadHexString $data[64..83]
        $fileNameLength = ReadSize $data[100..101]
        $this.FileName = ConvertWideChar $(Read $stream ($readOffset
            + $this.metadataEntryStructSz) $fileNameLength)
    }
}

class Resource : BaseClass{
    $SHA1
    Resource($stream, $readOffset){
        $data = Read $stream $readOffset 0x32
        $this.size = ReadSize $data[16..23]
        $this.offset = ReadValue $data[8..15]
        $this.SHA1 = ReadHexString $data[30..$data.length]
    }
}
...
```

We create classes modeled after the structs we explored earlier. Then we navigate the file and read these resources to recreate the activity earlier.

```
...
$resourceHeaders = @{
    rhOffsetTableHeader = $null
    rhXmlDataHeader = $null
    rhBootMetadataHeader = $null
}

$startIndex = 0
$resourceStructSz = 0x32 # 50

# Get resource files
$resourceHeaders["rhOffsetTableHeader"] = [ResourceHeader]::new($fs, 0x30)
log_s "Offset table at $("0x{0:x}" -f $resourceHeaders["rhOffsetTableHeader"].offset)"

# Get XML Data
$resourceHeaders["rhXmlDataHeader"] = [ResourceHeader]::new($fs, 0x48)
$xmlData = BytesToString $(Read $fs $resourceHeaders["rhXmlDataHeader"].offset $resourceHeaders["rhXmlDataHeader"].size)
log_s "XML data at $("0x{0:x}" -f $resourceHeaders["rhXmlDataHeader"].offset)"

# Get Metadata if available
$resourceHeaders["rhBootMetadataHeader"] = [ResourceHeader]::new($fs, 0x60)
if($resourceHeaders["rhBootMetadataHeader"].offset){
    log_s "Boot metadata at $("0x{0:x}" -f $resourceHeaders["rhBootMetadataHeader"].offset)"
}
else{
    log_i "Metadata not included in WIM File. Checking Resource files for metadata."
    $resourceHeaders["rhBootMetadataHeader"] = [ResourceHeader]::new($fs, $resourceHeaders["rhOffsetTableHeader"].offset)
    $startIndex = 1
}

$securityDataSz = ReadSize $(Read $fs $resourceHeaders["rhBootMetadataHeader"].offset 4)

if($securityDataSz -le 8){
    log_i "No boot metadata found. Using the first resource in the offset table."
    $resourceHeaders["rhBootMetadataHeader"].offset += 0x78
}
...
```

Once we find the Lookup Table and Metadata, we start collecting the file offsets, sizes and timestamps and write the files from the stream to an output directory. Since the files are uncompressed, we avoided implementing any compression algorithm or reliance on third party tools.

![script1]

To check if we pulled out the files correctly, we manually check the SHA1 hashes and observe they match exactly with the hashes captured in the WIM file.

With some benchmarking, we observe the script is even faster than 7zip:
```
Measure-Command {& "C:\Program Files\7-Zip\7z.exe" x .\wim.msu -o7ztest}

Days              : 0
Hours             : 0
Minutes           : 0
Seconds           : 1
Milliseconds      : 726
Ticks             : 17260436
TotalDays         : 1.99773564814815E-05
TotalHours        : 0.000479456555555556
TotalMinutes      : 0.0287673933333333
TotalSeconds      : 1.7260436
TotalMilliseconds : 1726.0436
```

```
Measure-Command {.\wim.ps1 -Wim .\wim.msu -Destination wimtest}
[+] Magic bytes match WIM signature
[+] WIM File is not compressed
[*] GUID: 35C3305ECFA83CE22B673A79518C202A
[+] Offset table at 0x30a2d304
[+] XML data at 0x30a2d494
[*] Metadata not included in WIM File. Checking Resource files for metadata.
[*] No boot metadata found. Using the first resource in the offset table.
[+] Found file: DesktopDeployment.cab [89E96B37CC2EE5E6017FF2AB03E399133C65C002]
[+] Found file: DesktopDeployment_x86.cab [0884E45A1E35D453368C0E6A730317122E92A10F]
[+] Found file: SSU-26100.3764-x64.cab [2D4713681EA1FB66172EB2DDB1F6BED5D447664B]
[+] Found file: Windows11.0-KB5055523-x64.psf [A343EE70DB22870629EE0BD9F4672D1EF047F077]
[+] Found file: Windows11.0-KB5055523-x64.wim [4C698B7BA1F2F690130D6220EAA998CECD9CCE00]
[+] Found file: onepackage.AggregatedMetadata.cab [757FB964F02D464DC6D9BFE4DDDE161F67DA6C27]
[+] Found file: wsusscan.cab [AA2799D8FC05E1CF64E8E4F0CC517F7FEF62EDAD]

Days              : 0
Hours             : 0
Minutes           : 0
Seconds           : 0
Milliseconds      : 760
Ticks             : 7603211
TotalDays         : 8.80001273148148E-06
TotalHours        : 0.000211200305555556
TotalMinutes      : 0.0126720183333333
TotalSeconds      : 0.7603211
TotalMilliseconds : 760.3211
```

It's probably not a fair comparison as 7zip as a more robust tool but for our use case, this is a nice improvement.

# Coming Full Circle
I wanted to add this functionality to PatchExtract.ps1 and the more I worked on it, the more I found myself rewriting the original script. The product of this rewrite is [Expand-Patch.ps1](https://github.com/basicinfosecurity/misc/blob/master/WIM/Expand-Patch.ps1).
It should behave similarly to the original, just with the WIM parsing and some optimizations. The bulk of sorting now occurs during the unpacking of the PSF. I also fixed parsing of the PSF manifest data to occur at the [proper offset](https://gist.github.com/wumb0/306f97dc8376c6f53b9f9865f60b4fb5?permalink_comment_id=5417945#gistcomment-5417945). The repo can be found [here](https://github.com/basicinfosecurity/misc/tree/master/WIM).

![script2]

I would be grateful if people can check it out and let me know what they think of it. Thanks to Greg Linares ([@Laughing_Mantis](https://twitter.com/Laughing_Mantis/)) and [wumb0](https://wumb0.in/) for providing these scripts to researchers. Thanks also to [wimlib](https://github.com/ebiggers/wimlib) which pointed the way whenever I got lost.

[^1]: Microsoft, Windows Imaging File Format (WIM) (2007), p. 4
[^2]: https://www.reddit.com/r/techsupport/comments/1ij7e77/can_expandexe_still_extract_the_content_of_an_msu/
[^3]: https://gist.github.com/wumb0/306f97dc8376c6f53b9f9865f60b4fb5#file-patchextract-ps1-L159
[^4]: Microsoft, Windows Imaging File Format (WIM) (2007), p. 5

[wim file structure]:{{ site.url }}/assets/img/wim/wim_structure.gif
[imhex wim pattern]:{{ site.url }}/assets/img/wim/imhex 1.PNG
[header flags]:{{ site.url }}/assets/img/wim/imhex 3v2.png
[lookup table]:{{ site.url }}/assets/img/wim/lookup tablev2.png
[metadata1]:{{ site.url }}/assets/img/wim/metadata 1.PNG
[metadata2]:{{ site.url }}/assets/img/wim/resource1v2.png
[direntry]:{{ site.url }}/assets/img/wim/entry1v2.png
[entry2pt1]:{{ site.url }}/assets/img/wim/entry 2 pt1.PNG
[entry2pt2]:{{ site.url }}/assets/img/wim/entry 2 pt2.PNG
[resource1]:{{ site.url }}/assets/img/wim/resource2v2.png
[dd]:{{ site.url }}/assets/img/wim/dd.PNG
[script1]:{{ site.url }}/assets/img/wim/script1v2.png
[script2]:{{ site.url }}/assets/img/wim/expand patch 1.PNG