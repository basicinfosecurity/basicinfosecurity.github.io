---
layout: post
title: Google CTF 2020 beginner
description: A quick post regarding the beginner challenge
image: pd43-0604-036-eye_1.jpg
---

*A short writeup for one of the first challenges for Google CTF 2020*

### The Challenge
The binary is essentially a *"flag checker:"* it checks if the input is the value of the flag.

### How does it do that?
<p align="center"><img src="{{ site.url }}/assets/img/2020-08-24-graph1.png" /></p>
<p align="center"><em>First Check</em></p>

It accepts input via `scanf`, the size being 15 characters. It then uses **SIMD instructions** to check if the flag is valid.

### The what?
Same here. Have a [wiki](https://en.wikipedia.org/wiki/SIMD){:target="_blank"}.
All of that isn't really important, save for the instructions used:
* `pshufb`
* `paddd`
* `pxor`

<p align="center"><img src="{{ site.url }}/assets/img/2020-08-24-graph2.png" /></p>
<p align="center"><em>Second Check</em></p>

There are two checks:
1. If the input is the same after it has been processed with the SIMD instructions, and
2. If the input starts with the `CTF{`

<p align="center"><img src="{{ site.url }}/assets/img/2020-08-24-disas1.png" /></p>

The input is shuffled in place, combined with a certain value, `xor`ed with a key and finally compared to the original input. The shuffle order, the added and the key values are stored as objects:

<p align="center"><img src="{{ site.url }}/assets/img/2020-08-24-hexdump1.png" /></p>
* `obj.XOR = 0xaaf986eb34f823d4385f1a8d49b45876`
* `obj.ADD32 = 0x6763746613371337fee1deaddeadbeef`
* `obj.SHUFFLE = 0x000d0c0a08040f030e090b0501070602 or [0,13,12,10,8,4,15,3,14,9,11,5,1,7,6,2]`

The shuffle order is determined by `obj.SHUFFLE` (e.g. `1234567890abcde -> 1dca954e0b62873`), followed by adding `obj.ADD32` and `xor`ing with `obj.XOR`. However, SIMD instructions are not the usual x86 instructions. They work differently, particularly `paddd`. An `add` instruction operates like [this](https://www.felixcloutier.com/x86/add){:target="_blank"}:

`DEST ← DEST + SRC;`

But `paddd` operates like [this](https://www.felixcloutier.com/x86/paddb:paddw:paddd:paddq):

`DEST[31:0] ← DEST[31:0] + SRC[31:0];
DEST[63:32] ← DEST[63:32] + SRC[63:32];`

The former combines two values and stores them in the destination register. The latter breaks up the values into "double words" (32-bits) and performs addition on each double word. If the resulting sum is larger than 32-bits, it is wrapped around dropping the carry-over bits. In other words, if it's too big, the excess is removed and the remainder is kept. The result is less accurate than the actual sum but this is crucial in finding the value of the flag.

### But wait
How is the flag found? How to get what is supposed to be looked for? Fortunately, there are two pieces of information to find the flag:
1. It starts with `CTF{` and,
2. It is 15 characters long.

Surprisingly, these are enough to find the flag with a potential third piece of information (i.e. It must be composed of printable characters). The flag's value is bruteforced for all values that pass the checks. The checks are very stringent, decreasing the possible values to find. The complex part of finding the flag is in the implementation of `paddd`:

<p align="center"><img src="{{ site.url }}/assets/img/2020-08-24-func1.png" /></p>

The function breaks up (shuffled) input and `obj.ADD32` each into 4 segments:

<p align="center"><img src="{{ site.url }}/assets/img/2020-08-24-func2.png" /></p>

Each segment is matched and added to the corresponding segment and `xor`ed with `0xffffffff` removing the carry-bits/excess value. Finally, the resulting segments are combined back into one.

To bruteforce the flag, the result of the first check is checked for printable characters. If any are found, they replace the placeholders in the flag:
<p align="center"><img src="{{ site.url }}/assets/img/2020-08-24-bf1.png" /></p>


### Code

{% highlight python %}
#!/usr/bin/env python3

import string, binascii

def main():
	prefix = "CTF{"
	
	flag = ["x" for x in range(15)]
	for i in range(4):
		flag[i] = prefix[i]
	flag += '\x00'
	
	while(1):
		print("Array: ",flag)
		shuffled = shuffle(flag)	
		print("Shuffled: ",shuffled)
		sum32 = add32(shuffled)
		print("Sum: ",hex(sum32))
		xorCheck = binascii.unhexlify(hex(xor(sum32))[2:])[::-1]
		print("XOR Check: ", xorCheck)
		tmp = xorCheck + b'\x00'
		if tmp == ''.join(map(str,flag)).encode():
			break
		else:
			for i in range(4, 15):
				if chr(xorCheck[i]) in string.printable:
					flag[i] = chr(xorCheck[i])
			print("New: ", flag)
		
	print("Found: ", "".join(map(str,flag)))	

def shuffle(flag):
	order = [0,13,12,10,8,4,15,3,14,9,11,5,1,7,6,2]
	shuffled = ""
	for	i in order:
		shuffled+=flag[i]
	return shuffled
	

def add32(shuffled):
	toBytes = int(binascii.hexlify(shuffled.encode('utf8')), 16)
	leet = 0x6763746613371337fee1deaddeadbeef
	multiple1 = wordify(toBytes)
	multiple2 = wordify(leet)
	
	sum32 = 0
	
	for m in range(4):
		sum32 += (multiple1[m] + multiple2[m]) << (96 - (32 * m)) & (0xffffffff << (96 - (32 * m)))	
	return sum32	
	
def xor(sum32):
	return 0xaaf986eb34f823d4385f1a8d49b45876 ^ sum32
	
# Break large int into 32-bit words
def wordify(largeInt):
	bits = 0xffffffff
	word1 = (largeInt >> 96) & bits
	word2 = (largeInt >> 64) & bits
	word3 = (largeInt >> 32) & bits
	word4 = largeInt & bits
	return [word1, word2, word3, word4]
	
if __name__ == "__main__":
	exit(main())

{% endhighlight %}
*Note: While input is 15 characters, the operations are done using 16 characters. Adding a null-byte to the input remedies this.*
