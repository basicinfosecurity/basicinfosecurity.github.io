---
layout: post
title: OSCP and Me
introduction: My thoughts on OSCP
description: This post took some time to write as I had my laptop's keyboard fixed. In my eagerness to reach for water, I spilled it over my keyboard. If this happened during my exam, my bowels would have dropped with biblical magnitude.
image: Gustave Dore Canto III.jpg
---
*This post took some time to write as I had my laptop's keyboard fixed. In my eagerness to reach for water, I spilled it over my keyboard. If this happened during my exam, my bowels would have dropped with biblical magnitude.*

### A Bit of History

Last year, I set my goals for 2017. My top priority was to achieve OSCP. This cert was awesome because:
* It was relatively cheaper than other industry-recognized certs.
* It was highly regarded by most security professionals due to the difficulty of the accompanying course, among other reasons.
* It greatly enhances students' knowledge on "Offensive Security" (more of the subject and less (incidentally) about the vendor)
* It had no "maintenance fees".

At that time I knew I was far from prepared:
* Neither did I know how to avail the course nor did I personally knew any OSCP holder who can guide me.
* There were huge gaps between my knowledge and of the subjects included in the [PWK Course Syllabus](https://www.offensive-security.com/documentation/penetration-testing-with-kali.pdf), particularly with Buffer Overflows, Client Side Attacks and Port Redirection and Tunneling.
* My pentesting skills, though palpable, were not mature enough. They were mostly effective in isolated environments (e.g. vulnhubs).

A good way to know if you're prepared is to ask "If you were in the middle of a situation *X*, would you overcome it?". If someone asked me to take the course at that moment, I would have struggled twice as hard than if I had prepared appropriately.

### What's the plan?

To prepare, it was necessary to take stock of my overall capabilities and resources:
* I had ample knowledge of web vulnerabilities from Vulnhub VMs and CTFs.
* I knew how to read and to program in various programming languages, particularly Python.
* I am experienced in using Linux, particularly, Kali.
* I had a good laptop that is capable of running VMs.
* I had a fundamental understanding of network protocols (e.g. TCP, UDP)

My biggest hurdle was on the subject of Buffer Overflows as my knowledge of it was mediocre. I knew nothing of Client Side attacks and I can barely simulate port forwarding. Everything else in the PWK Syllabus I have already practiced. It was only a matter of filling up these gaps in order to be competent enough for the course. But I also had practical worries:

* Money - There was less than a year to save up for the budget.
* Time -  There was less than a year to study.
* Internet - My internet plan needed to support the VPN for the labs. Internet in the Philippines can be described with various four letter words. Decide which you prefer.

If I wanted to take the course, I needed enough time and money to capture my budget and to allot time for the course and any exam attempts. For my plan to work, I needed to save enough for the 60 day labs + Exam attempt package and upgrading my internet plan.

My plan was simple but risky.
1. Save enough money to avail the course and any retake attempts.
2. Gather enough studying material based on the PWK course syllabus.
3. Study the materials to gain enough knowledge to accomplish the labs as soon as the course starts.
4. Take the exam.

Its slipshod and not recommended. Due to my financial situation, I had to adapt to a strict budget and time frame which seemed to convolute things. Indeed they did. But time and money were not on my side. I have been saving up for a long time ever since I made OSCP one of my goals for 2017. The rate at which I saved only allowed 60 days worth of labtime with a cushion fund for about two retakes. If I wanted 90 days worth of labs, my goal would have been pushed to 2018 as it meant I would need to begin my labs at a later date. That was unacceptable; I had to be practical if I were to do it.

### The *"Plan"* in action

The budget needed to be built right away. For the following months, I set aside an additional portion of my pay, besides my savings, and any extra income for the budget. At the same time, I studied. To make the most out of lab time, I needed to be equipped with the basic skills necessary to progress as soon as it started. But my pace was leisurely. It does not take too much time to acquire the basic skills as most of the time was used in practising and honing them. I did Vulnhub VMs whenever I could and read whenever I were away from my laptop. I also begun collecting blog posts and articles of OSCP holders to get an idea of what to expect from the course. [Jollyfrogs' account](http://www.techexams.net/forums/security-certifications/110760-oscp-jollyfrogs-tale.html) of the course mentions that there were around 60 machines (in truth there were around 50) in the labs. This was both fortunate and unfortunate as though there were enough lab time, it required taking down one machine per day.

For almost a year I stuck to my plan and eventually it bore some fruit. As early as June I had enough money to avail the course. It was finally time to [register](https://www.offensive-security.com/preregistration.php?cid=21). As I was not sponsored by my company, I had to do things a bit differently. For starters, when submitting your details at the Registration Sign-up Form, it requires you to submit scans of your government-issued ID. I sent over a pdf of my driver's license scans to [registrar@offensive-security.com](mailto:registrar@offensive-security.com). After acknowledging receipt, they sent an email containing confirmation of successful reservation for the course, my OSID/Student ID, and instructions for testing lab VPN connectivity and for paying the fees. I scheduled my labs to begin a full month after I registered as I figured it would not hurt to have final preparations before starting.

And so it begun. There was no going back. To quote Canto III of the Inferno, "Abandon all hope, ye who enter here."

### Descending the Rings of Hell

Labs started. I received my course materials and have downloaded the [PWK VM](https://support.offensive-security.com/#!pwk-kali-vm.md) in advance. Prior that, I joined a slack community, [NetSecFocus](https://netsecfocus.herokuapp.com/) where fellow students studied together. There was a channel where only students may join and where some Offsec student admins make appearances (all hail the great llama Abatchy!). Students and OSCP holders offered some great advice, articles and tools that helped in taking the course. If need be, I had the help of the student community at close reach as well as a wealth of knowledge from the course materials. At that moment I felt ready to take on the course.

![baby groot]

On the same evening I took down my first machine, Alice. It was a really easy machine but a good first step. I begun to fulfill my quota of 1 machine/lab day, working 3 to 4 hours each weeknight and as much time in the weekends throughout the course. Of course there were times I was not able to stick to my quota: On some days I would be away on vacation, on some days I would be stuck on some boxes. Nevertheless I finished all the lab machines across three subnets. It was only in the labs that I was able to learn pivoting and client side attacks. As I progressed, I formed my own methodology based on what worked best. I discovered that:
1. **Information gathering is very important.** Take down as many notes as you can. Capture screenshots whenever you've confirmed a vulnerability, any vulnerability, especially once you've escalated privileges. The purpose of a good information gathering phase is twofold. First, the more time spent on this phase, the less time you need to compromise the target. If ever there's a time a wall has been reached, it is most likely there is not enough information to go by. Second, it will prevent you from backtracking by providing you enough material to build your Lab Report. Submitting a Lab Report helps a student pass by adding 5 bonus points to your exam score.
2. **Pay attention to details.** Sometimes, *the devil is in the details.* Learn to put two and two together and you'll be able to see the bigger picture.
3. **A good Post-Exploitation phase helps in lateral movement.** Once you've successfully taken down a machine, explore it. Because the lab machines form a corporate network, they have relationships to other lab machines that become apparent upon further inspection. This was an entirely new concept to me as I was so used to isolated Vulnhub VMs that required no prerequisites and that required only direct attacks.
4. **Build a Kit.** It's annoying to have to go back and forth transferring multiple tools and exploits from your machine to your target. Make the process easier by building a kit. A good kit is composed of tools that will aid you in transferring other tools, creating backdoors, uncovering credentials and escalating privileges. My kit is usually composed of a privilege escalation suggester script, netcat, two well-known kernel exploits, and credential dumping tools all packed inside a Zip archive. A Python SimpleHTTPServer is running to serve the kit and any of the individual files should Zip decompressing prove to be impossible.
5. **Don't go after the Big Four immediately.** This one is contentious, I think. Very often, students race to finish them for whatever reason. I think these machines serve a better purpose by helping students prepare for the exam. What I did with them is to simulate a "mock exam" by doing all of them simultaneously in addition to another lab box within the span of 24 hours. Though in my case, I failed by my own standards. Having stumbled on sufferance in my first 2 weeks, there were only three of the Big Four left for the mock exam. Not only that, after finishing all of these boxes I was so tired that by the end I was unable to do two more. The experience did teach me that the exam was no joke as it was both mentally and physically burdening. It also taught me that dwelling on a box before moving on severely hinders progress. It was better to switch boxes from time to time.

By the time I finished the entire lab network I had less than a week left of lab time. This time was used to rush my Lab Report ahaha. It was probably the most tedious part as I begun going through the lab materials right before the end. There were so many of these exercises to answer and to document that I had to sacrifice sleep time just to finish the report. Damn 5 bonus points.

### The 9th Circle
![cocytus]

After finishing the lab report, I had about two weeks ahead before taking the exam. This was the soonest schedule I got. Coming out of the labs, left me drained. The ordeal was toilsome though the end was also near. Or so I thought.

My activity in the weeks ahead of the exam alternated between resting and practising. I figured that it was necessary to keep my health up while retaining everything the course taught me. I reviewed my notes and wrote "Lessons Learned" sections for each as refreshers. Kits were prepared. The lab report was cleaned up and an exam report template was also prepared.

Exam day came. I was scheduled in the afternoon but only had 3 hours worth of sleep. Tossing and turning didn't help get more. With each hour of unrest I grew more anxious that by the time I started I was wide awake with stress. It was only the beginning of worse things ahead. After 5 hours I got my first machine. 9 hours before exam ended I got my second. Five hours after, I got a low privileged shell on another. The rest of my time was consumed in desperately throwing every exploit I could find. My first exam attempt ended in miserable failure. During the exam, I could feel the stress washing over me in waves. Each frustrated attempt was punctuated by heavy exhalation. As each hour passed my head felt hotter, my heart beat faster, my hands shook more heavily and my eyes grew more bloodshot. In essence, I strayed from the methodology I've learned, let stress get to me and surrendered my fate to luck.

I fought the battle to the bitter end. But the war went on.

### Purgatorio

![purgatorio]

I knew I didn't have enough points to pass. Even worse, there was one screenshot missing. So, there were even less points to not pass. Great.

I contacted support to fail me so I could immediately schedule my next exam attempt. They were very obliging so after submitting my report, they sent instructions for the exam retake. The exam report was not necessary but I wanted experience on writing a proper one and I needed feedback on my performance.

The following days were spent in dejection. Fear of failure was greater than before. I was haunted. But hope was there. I reviewed my weak areas and prepared accordingly. My confidence slowly restored. Doubt still lingered but I had to forge ahead in spite of it.

Exam day came again. This time it went better. The preparations safeguarded me from previous pitfalls. On this attempt I went back to my roots, and got enough points to pass and remembered to secure screenshots! Writing the report for the second time was easier with the insights I learned from the first attempt. Three hours before the submission, the reports were finished, archived, uploaded and sent for review.

### Paradiso

The following day, Offsec sent this:
![passed]

It feels great to be OSCP. But honestly, I still feel like a *script kiddie* in the sense that I still have a lot of things to learn.

And that is what drives me, **learning**. You would suspect that being acknowledged for hard work would imbue a greater sense of self-worth. But it is more correct to say that having been shown the great expanse of the InfoSec field made me more aware and more excited for my education.

Achieving the highly regarded certification is no easy undertaking as it had drawn out potential I never thought I had. In the past I was satisfied with the rate at which I educated myself. My usual routine would be to gather free studying material on any topic I would fancy and go through them at a steady pace. After having grasped the material, it was tested out at my home lab. But with the PWK course, this process was exaggerated. I am tempted to say that the way I did things may have had a role to play, but the course's difficulty, for the common security enthusiast, is the main factor in driving growth.

### Lessons Learned

Offensive Security is known to urge people to *"Try Harder!"* But I think their other pithy, golden phrase receives less emphasis: *"Stay Humble!"* Abandon hope as if you're starting humbly from scratch. Then take on the challenges. With each challenge overcome is hope regained. Failing is fine just as failure of fear is also fine. Just make sure to do better next time.

I really enjoyed the course. Through it I proved I can be better. Most importantly, I gained new friends. I'd like to thank my study buddies at slack for their company and insights, my family, friends, and my girlfriend for all the encouragement and support. This is not yet the end so I hope I can depend on you again next time!

### Study Materials
For a complete beginner, I believe the materials below will help in preparing for the course. The more time invested, the closer to getting OSCP certified.
* [Vulnhub](https://www.vulnhub.com/)
* [Exploit Exercises](https://exploit-exercises.com/) - these helped me study for Buffer Overflows and SUID/SGID vulnerabilities
* [OSCP-like Vulnhub VMs](http://www.abatchy.com/2017/02/oscp-like-vulnhub-vms.html) - I finished the beginner friendly and intermediate VMs before taking the exam.
* [Cybrary](https://www.cybrary.it/) - I did not use this resource but beginners would find this very useful.
* [LiveOverflow](https://www.youtube.com/channel/UClcE-kVhqyiHCcjYwcpfj9w) - Awesome video tutorials. Because of his videos, I grew to love GDB over any debugger.
* [GynvaelEN](https://www.youtube.com/user/GynvaelEN/videos) - His videos might be advanced but informative.
* [Xapax's Security Notepad](https://www.gitbook.com/book/xapax/security/details) - An excellent compendium of notes. Useful in Windows Exploitation.
* [Basic Linux Privilege Escalation](https://blog.g0tmi1k.com/2011/08/basic-linux-privilege-escalation/) - a well known guide to linux privesc. It can be argued that a lot of people whether taking OSCP or not, owe something to this guide.
* [Windows Privilege Escalation Fundamentals](http://www.fuzzysecurity.com/tutorials/16.html) - another well known guide for Windows privesc.
* [HighOn.Coffee](https://highon.coffee/) - excellent resource for Web Vulnerabilities and attacks

[cocytus]:{{ site.url }}/assets/img/Gustave_Dore_Inferno34.jpg
{: height="300px" width="500px"}
[baby groot]:{{ site.url }}/assets/img/baby groot.jpg
{: height="300px" width="500px"}
[passed]:{{ site.url }}/assets/img/passed.png
[purgatorio]:{{ site.url }}/assets/img/purgatorio.jpg
{: height="700px" width="500px"}
