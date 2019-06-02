---
layout: post
title: OSCE and Me
introduction: My thoughts on the OSCE Exam
description: This post details my experience with acquiring the OSCE Certification
image: 640px-The_Experts_MET_DT209332.jpg
---
*So it's time for that yearly blog update. I hope to maintain this consistency throughout the lifetime of this blog.*

### Catching-up
The beginning of the year brought exciting changes to my career: A new role and a lot more time. This was perfect as there's a lot of catching-up with the backlog of reading materials and planned trainings.

Last year was tough. Work kept me from immersing in my studies; the spare time between commutes and the few moments of downtime were spent reading. But no sapling ever grew to awesome heights with specks of sunlight and drops of dew. And so I resolved to change my predicament and looked for another job.

After settling-in, I attempted the [CTP Registration Challenge](http://fc4.me/). While not going in stark blind, I can't say I knew what I was doing at the time. The challenge was quite interesting and can be solved by tinkering and being "curious" of what's under the hood.

### The Course
The course is quite short: A month of lab time, and dedicating maybe 30 minutes to an hour every day is enough to finish it. The syllabus can be viewed as the list of the few exercises to accomplish. There are no extra exercises to attempt (unlike OSCP but more on this later). For practice, you can follow some guides out there, look for exploits in [exploit-db](https://www.exploit-db.com/) or find vulnerabilities on your own (the former is more practical). Building a lab environment is feasible, and the concepts from each exercise are portable so things can be done at your own pace.

The materials are easy to follow, though some topics were lacking (e.g. alphanumeric encoding). There are excellent supplementary guides from [Corelan](https://www.corelan.be/) & [SecuritySift](https://www.securitysift.com/) that expand on the the syllabus. They're lengthy and best studied while following along. The distro of choice is [the old Backtrack](https://www.backtrack-linux.org/) but any other is fine, even for the exam ([Parrot OS](https://www.parrotsec.org/) is a great choice). A lot of time was spent wrestling to replicate exploits locally. Sometimes it can be done with `wine` but it is still best to keep a Windows VM handy.

[comment]: Please bear with me until I can figure out how to center images with jekyll
<p align="center">
<img src="{{ site.url }}/assets/img/93px-WINE-logo.png" />
</p>
> *[WINE]((https://wiki.winehq.org/Main_Page)) Is Not an Emulator. It's not a miracle either.*

Throughout the course, I relied heavily on [`radare2`](https://github.com/radare/radare2), [radare2 tools](https://r2wiki.readthedocs.io/en/latest/home/radare2-tools/) (i.e. `rasm2`, `rax2`, `ragg2`) and Python. Learning `r2` during the course was a great boon and since then it is part of my toolset.

*A word of caution: while `r2` might be great, it can be pretty unreliable. Modifying files can be dodgy. For your sanity, refrain from using that feature (until they fix [this](https://github.com/radare/radare2/issues/2738)). I think I grew some wrinkles, in visible and non-visible places, trying to make it work.*

[comment]: Please bear with me until I can figure out how to center images with jekyll
<p align="center">
<img src="{{ site.url }}/assets/img/black-rotten-banana-isolated-over-white-background-stock-photography_csp14303409.jpg" />
</p>

[Assembly language](https://nets.ec/Assembly) is heavily used so it's best to have references handy. The folks over at nets.ec have this [great wiki](https://nets.ec/Ascii_shellcode) to aid in writing shellcode, especially when encoding to Alphanumeric/ASCII. `rasm2` is useful as well:

```
rasm2 "jmp 16"
eb0e
rasm2 -d eb0e
jmp 0x10
rasm2 -D eb0e
0x00000000 2 eb0e jmp 0x10
```

And for De Bruijn patterns, `ragg2`:
```
ragg2 -P 10
41414142414143414144
ragg2 -P 10 -r
AAABAACAAD
ragg2 -q 0x43414144
Little endian: -1
Big endian: 6
```

While `r2` is a great tool, Ollydbg is the tried & true debugger. Hard as I tried, I couldn't fully do without this excellent tool. It is very beneficial to learn its [basic commands](https://www.aldeid.com/wiki/OllyDbg) to fully appreciate its capabilities. It's best to know basic step commands, breakpoint setting, memory & command searching.

### The Exam Attempt
Before the week labs ended, I scheduled my exam. If I would've known the next available slot was a month away, I would've scheduled as soon as receiving the course materials! I watched the schedule page almost every day for earlier slots. In the end none opened up, and I was stuck with a crappy one which began past midnight on a work day. Having no more lab time, I resolved to practice on my own and study exploits from exploit-db.

Exam day arrived. First day: things were going great. Two items solved, two remained. Though a simple mistake crushed my chances. Basically, I was smart enough not to realize that [opening an application through the debugger](https://blogs.msdn.microsoft.com/jiangyue/2010/03/15/windows-heap-overrun-monitoring/) is not the same as [opening an application and attaching the debugger to it](http://www.nobugs.org/developer/win32/debug_crt_heap.html). That proved to be a critical (and costly) mistake. The exam ended with arms raised in frustrated defeat. It didn't really feel that bad because I can always try again. That is until the next day when the mistake was discovered **with** the vulnerability that was missed!

On the third day ~~(half)~~ a report was submitted to offsec. **Big Oof.**

### The Exam Attempt (Part Deux)
The schedule was still tightly booked; the next slot was another month away. *"No matter"*, I thought. *"I'll make it this time."*

Realizing my errors and shortcomings, I resolved to work on them. I polished my code and ported them from my home lab to the course lab (to get a re-attempt, a lab extension must be purchased). I felt refreshed and ready to try again.

Exam day arrived again. This time I had a better schedule and a clearer path. **And yeah**, I made sure to start the app and attach the debugger this time *(as anyone with sense has been doing all this time)*. I was able to finish up on the first day, wrote the report and sent it off for grading by Saturday midnight.

### Try (Waiting) Harder
The next week was spent in anxious waiting. The lack of updates from offsec had me in a nervous state. *"Did I miss anything? Are my solutions wrong? Were hundreds of screenshots not enough?"* By the middle of the week, I broke the silence and reached out through email and live chat. They politely told me to ~~fuck off~~ wait as the report was still being graded. I didn't want to risk waiting for a failed result and spend the rest of the year retaking the exam over and over and over and...

By Saturday night, the results came in. While it felt great to pass, it did not feel as jubilant it should have been. Offsec has excellent service, but I believe their processes can be improved, especially when their certs are gaining worth and recognition. Nevertheless, I thanked their support staff for putting up with my whining and for confering the certification.

### Wrapping up
OSCE is a really great course and it deepened my knowledge and understanding of exploit development. It shows its age which, in itself, is an old criticism. But there is little to update to this course anyway, at least for exploit development. Sure the practice vulnerabilities can be updated but that is as far as it goes. The Web & Network related topics seem to be there to pad the course out. Surely, these topics are areas in need of improvement.

While short, it felt a lot shorter. In OSCP, there were three networks to break but for OSCE there isn't even one. To practice, you must build a lab. The price bump seems hard to justify, but there aren't many courses that can compare on top of its industry recognition among other things.

I am still grateful for taking this course, and I am excited to take on OSEE. It's damn expensive but as they say, *"See how"*.

### Study Materials
*Note: I didn't really have a study plan so I just followed other people's guides, which were more than enough.*
* [OSCE/CTP Prep Guide (Tulpa Security)](https://tulpa-security.com/2017/07/18/288/)
* [OSCE Course & Exam Review (Christopher Hudel)](https://www.linkedin.com/pulse/osce-course-exam-review-christopher-hudel)
* [OSCE Study Plan (abatchy)](https://www.abatchy.com/2017/03/osce-study-plan)
* [Corelan (Yeah, all of it)](https://www.corelan.be/index.php/articles/)
* [Windows Exploit Development (SecuritySift)](http://www.securitysift.com/windows-exploit-development-part-1-basics/)
* [Writing W32 shellcode (FuzzySecurity)](https://www.fuzzysecurity.com/tutorials/expDev/6.html)
* [Radare2 cheat Sheet (Anas Aboureada)](https://aboureada.com/cheat_sheet/2017/12/20/radare2_cheat_sheet.html)
* [Exploit-DB](https://www.exploit-db.com/)
* [Ollydbg (Aldeid)](https://www.aldeid.com/wiki/OllyDbg)
* [Basics of fuzzing (Gynvael)](https://www.youtube.com/watch?v=BrDujogxYSk)
* [Fuzzing proprietary protocols with Scapy, radamsa and a handful of PCAPs (Wildfire Labs)](https://wildfire.blazeinfosec.com/fuzzing-proprietary-protocols-with-scapy-radamsa-and-a-handful-of-pcaps/)
* [Hacking: The Art of Exploitation 2nd Ed. (Jon Erickson)](https://nostarch.com/hacking2.htm)
* [The Shellcoder's Handbook: Discovering and Exploiting Security Holes, 2nd Edition (Anley, Heasman, Lindner, Richarte)](https://www.wiley.com/en-sg/The+Shellcoder%27s+Handbook%3A+Discovering+and+Exploiting+Security+Holes%2C+2nd+Edition-p-9780470080238)
