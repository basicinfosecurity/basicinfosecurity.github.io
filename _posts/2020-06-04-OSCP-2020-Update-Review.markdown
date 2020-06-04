---
layout: post
title: PWK Update 2020
description: A quick review of the updated PWK course in 2020
image: stanczyk_zoomedin.jpg
---

*If you want to know my experience before the update, see my bloviations [here]({{ site.url }}/blog/OSCP-and-Me){:target="_blank"}.*

### A Look Back

If you've ever read reviews on Offsec's courses, you'd probably come across several saying they're ["outdated"](https://community.infosecinstitute.com/discussion/134006/interesting-article-it-s-time-to-move-on-from-offensive-security-certifications){:target="_blank"}, ["not for new people"](https://www.reddit.com/r/AskNetsec/comments/4uzril/pwkoscp_is_not_for_new_people/){:target="_blank"}, and they're the ["new CEH"](https://infosec.exchange/@tnkr/100807652073155230){:target="_blank"} (The last one might be confusing as CEH is usually recommended as an alternative due to PWK's difficulty). There have also been allegations of cheating gaining traction around 2018 and culminated to the implementation of [proctored exams](https://www.csoonline.com/article/3336068/oscp-cheating-allegations-a-reminder-to-verify-hacking-skills-when-hiring.html){:target="_blank"} by early 2019 due to an exam leak.

[comment]: Remember this guy? He tried harder so you can try harderer.
<p align="center"><img src="{{ site.url }}/assets/img/cyb3rsick_ihelped.jpg" /></p>
<p align="center"><em>A disgruntled student</em></p>

While public perception of the courses is positive, it gradually soured. OSCP holders have had a lead over other entry-level certifications. As a comparison, in the US the [average salary](https://www.payscale.com/research/US/Certification=Offensive_Security_Certified_Professional_(OSCP)/Salary){:target="_blank"} of a pentester with CEH is $91,000 while the average salary for an OSCP holder is $97,000. Granted, CEH holders have an edge and flexibility as the overall average salary across multiple cybersecurity roles is slightly higher than those of OSCP holders, it's clear if you want to be well-paid as a pentester, you must go for OSCP. Moreover, a new role has become more relevant: the [\#RedTeamer](https://twitter.com/hashtag/redteam){:target="_blank"}. [\#RedTeam](https://twitter.com/hashtag/redteam){:target="_blank"} roles have been on the rise and more course offerings are put out to help fill the skills gap, something PWK lacked at the time. As demand for OSCP holders grew, they also received more scrutiny. The reputation of the courses, the brand Offsec has been building up, and the credibility of cert holders were put into question. The proctored exams were a step in the right direction but there was still a long way to go.

### Gruntling the Disgruntled
On February 11, 2020, Offsec announced the update [^1] [^2]. The responses were mixed:
<p align="center">
<img src="{{ site.url }}/assets/img/cool2.png" />
</p>
<p align="center">
<img src="{{ site.url }}/assets/img/justenrolled2.png" />
</p>
<p align="center">
<img src="{{ site.url }}/assets/img/wrongo.png" />
</p>

<p align="center">
<img src="{{ site.url }}/assets/img/payharder.png" />
</p>
<p align="center"><em>Joe needs to calm down.</em></p>

The confusion was understandable. The change was communicated poorly; there was little to no announcement of the plans for the update in any of their channels to existing students. Their social accounts made no mention of the upgrade up until the announcement. It could have been posted in the student forums and it would be just as effective.

<p align="center">
<img src="{{ site.url }}/assets/img/gimmedatawae.jpg" />
</p>

Oddly enough, it fits Offsec's "style". They'll dump the details on you and you do the research (\#TryHarder indeed, right Joe?). This is not the first time they upgraded their course. To think after several upgrades, they will fumble such important news.

### The Update

[comment]: Clown world will eat us all. Go hack some boxes.
<p align="center">
<img src="{{ site.url }}/assets/img/stanczyk_scaled.jpg" />
</p>

If you haven't read up on the changes yet, you can go through [here](https://www.offensive-security.com/offsec/pwk-2020-update/){:target="_blank"} and [here](https://www.offensive-security.com/pwk-oscp/){:target="_blank"}. But if you're a returning student, what changed?

*In a nutshell:*
* Most of the Windows and \*nix machines were upgraded.
* Powershell is now viable and highly significant.
* Active Directory attacks are now possible.

*Also:*
* The machines increased from ~50 to ~70 (excluding the Sandbox/Poultry network).
* The Big 4 are no more. There is now the Big 5.
* Due to infrastructure upgrades, some attacks and methods on legacy technology (e.g. snmp cracking) are no longer possible.
* The materials are now "new people friendly".

Kudos to Offsec! They made the labs more engaging and more challenging than ever before. The upgrade to the latest windows version modernized the lab environment, bringing it closer to how corporate environments are designed. This also made powershell more significant and a great boon. In the past, powershell was rare and barely usable. It's now one of my favorite tools and attack surfaces ([\#RedTeam](https://twitter.com/hashtag/redteam){:target="_blank"}). The upgrades also revived old machines. They have tauted:

> *... The new version of PWK contains more than double the content and 33% more lab machines.*[^3]

And they certainly delivered. They toned down the "CTF-style" boxes and revamped the old ones to require new approaches. This needed sharpening of old skills, learning new ones and adding new tools to your arsenal. Combining both revamps and new machines, I'd say there's easily 50% new machines (practically speaking). Some of the "Big 4" got nerfed. New and more difficult machines usurped their place to form the "Big 5". As most of the new machines were added to the Public network, there's more than enough activities there to keep you engaged. Besides these, there are other subtle changes to the labs for students to discover.

In the past, I didn't bother much with the web player which came with the videos. Now it's more easy to play them anywhere, anytime (mobile friendly and supports dark mode!). The course guide is easier to follow but remains challenging: it walks you through the attacks as you perform them in the Sandbox environment (to be honest, I just skimmed through them). Customer support is quicker and better but could be improved. They junked the reservation system. No more waiting for slots to open! Upon registration, you get your labs next day and your materials only a few hours after payment. For inquiries it used to take more than a day just to get a reply, but now you can expect a quicker turnaround.

### Wait!
<p align="center">
<img src="{{ site.url }}/assets/img/beforeyoubuy_oscp.png" />
</p>

Should you upgrade? No.

I thought there could be some wiggle room here but this quote stuck out to me:

> *There is no requirement from OffSec to update your certification – once an OSCP, always an OSCP.* [^4]

Certainly, there is value in the course but if you're certified, why bother? The update, while welcome, can be sought elsewhere and this rings more true as courses increase in quality and quantity. It is only important insofar as it keeps the course fresh. If you bought the course shortly before the update, there might be cause to get it. But considering the price is $200, it's pretty steep especially considering expenses on courses and exams are planned out in advance, something students were clearly unprepared. While the labs offer some [\#RedTeaming](https://twitter.com/hashtag/redteam){:target="_blank"} exercises, you can arguably get better value from other courses for lower fees. Its tempting to think the upgraded PWK is comparable to other [\#RedTeaming](https://twitter.com/hashtag/redteam){:target="_blank"} courses but upon closer look, it's more of an introductory course.

### Wrapping up
While the PWK 2020 experience was enjoyable, I had some reservations. PWK still delivers value just as it always did but it received an upgrade a little late, with competitors already overtaking them (I am purposely leaving out these other courses as I don't want to get into the comparison). For the student, if you have time and money, maybe this upgrade is for you. If you have both and already certified, save (unless you're in it for nostalgia). You're not at a loss by buying the upgrade, but you can do better elsewhere. Your job prospects remain the same regardless if you're certified through PWB v2.0/PWB v3.0/PWK/PWK 2020. To repeat Offsec, *"Once an OSCP, always an OSCP"*. OSCP has already opened many doors to many professionals and carried many further into their careers. I will close with this:

> *In recent weeks I have been reading comments online about the Penetration Testing with Kali Linux (PWK) course and OSCP exam taking a lot of flak for being “tool old” and using "outdated exploits that don’t even work anymore."... But that is beside the point. The PWK and OSCP exam are all about teaching you how to think, solve problems, persevere, and develop a pentesting methodology that works for you.* [^5]

[^1]: [@offsectraining (Offensive Security). "So...you know that PWK update everyone's been asking for? IT'S HERE! We've overhauled the prep course for the OSCP exam, adding more than 2x the content and 33% more lab machines. Get info plus FAQs in this blog post: https://hubs.ly/H0mZzFL0" Twitter, 11 Feb. 2020](https://twitter.com/offsectraining/status/1227242809805066240){:target="_blank"}
[^2]: [Offensive Security. So...you know that PWK update everyone's.... Facebook, 11 Feb. 2020](https://www.facebook.com/offsec/photos/a.1005384106165595/2760935590610429/){:target="_blank"}
[^3]: [Offensive Security. "PWK & OSCP Frequently Asked Questions" The Offsec Blog, 11 Feb 2020](https://www.offensive-security.com/offsec/pwk-oscp-faq/){:target="_blank"}
[^4]: [Offensive Security. "PWK: All New for 2020" The Offsec Blog, 11 Feb 2020](https://www.offensive-security.com/offsec/pwk-2020-update/){:target="_blank"}
[^5]: [Chatham, Will. "Thoughts on OSCP being 'outdated'", Will Chatham(blog), 31 Aug 2019](https://www.willchatham.com/general/thoughts-on-oscp-being-outdated/){:target="_blank"}
