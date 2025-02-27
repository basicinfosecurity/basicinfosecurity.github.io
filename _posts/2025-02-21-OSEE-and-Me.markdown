---
layout: post
title: OSEE and Me
description: My thoughts on OSEE and Offsec
image: Man_proposes_god_disposes_-_Edwin_Landseer_-_RH.jpg
---

*This is the final post on the "OSXX and Me" series. Checkout the rest:*
- *[OSCP and Me]({% post_url 2017-10-17-OSCP-and-Me %})*
- *[OSCE and Me]({% post_url 2019-06-02-OSCE-and-Me %})*

# Prelude
It was May 2019. Having claimed--the now outdated--OSCE, I set my sights for OSEE. A direct path proved to be elusive. Offsec used to offer AWE/EXP-401 training at Blackhat Asia. It was last offered during the [2019 iteration](https://www.blackhat.com/asia-19/training/schedule/) in April. Options were now limited to expensive trips outside Singapore, usually for BH Las Vegas or Europe. As much as I wanted, it was financially forbidding. I was hopeful for a day it returns and having change to spare for it.

Then the pandemic hit.

Around 2020, Corelan offered its [trainings](https://www.corelan-training.com/index.php/training/heap/) in Singapore. I thought it was a great way to learn Windows Exploitation if EXP-401 never returned. The raging virus ravaged the world delaying the training to 2023.

In late 2023, early bird promos for EXP-401 was announced to my suprise! Even for an early bird slot, the price was almost triple of BH Asia(perhaps the ticket sales were used to pay the rest of the training costs?). It was hard to pass up.

# Interlude
## Training Week
Training was held in late May 2024 at a nice hotel. I swear putrefied slush streamed from my ears. The food was nice and consoling though.

Nights were spent on exercises. My skill level was inadequate to take on any extra miles. There were students who claimed challenge coins even though they just received the handbook. Having completed all the extra miles by myself, I can say there are students who *really really* wanted those coins. The instructors also gave out stickers for completing exercises from the text book. I may not have claimed any coins but I was happy to get a sticker.

## Training Months
The rest of 2024 was devoted to studying the tome of a text book. During bootcamp, I was up from evening to morning trying to catch up,showing up dazed and hardly attentive for class. Imagine stumbling and divining your way through a cave, and into a circuitous network of keyholes. Outside the bootcamp setting, I was able to rest and to pace myself accordingly. These contributed greatly to my improvement and to my morale. The extra miles--the true exercises of the course--were once thought impossible. Steady progress were made on each until all of them were completed. I enjoyed Browser Exploitation the most and VMWare exploitation the least for the former had targets easy to debug and the latter the most tedious to manage and rebuild.

## First Attempt
I booked the exam for November as I wanted to claim the certification before EOY. There were some clues to the challenges in the exam report but prep time was scarce.

On exam day, I assumed the most difficult challenge was the one most unfamiliar to me. I went straight for the second challenge. It was a grave mistake. By the end of the third day, I only solved the second challenge and did not complete the first. Even though it only amounted to half of the requirements, I still wrote the report. The next day, the failure result came but not for an incomplete report. It turns out I failed to upload the report properly. My mind was mushed soup, barely contained by the bowl I called a head.

## Second attempt
I took the exam again in January. Having already done the second, I poured my efforts into the first. Perhaps in any walk of life, good recon will net the necessary edge to overcome any situation. Most of the time was consumed in RE, to cover more ground than my previous attempt. The solution I came up with was unconventional; I was unsure if it was the intended solution. Hacking is a pragmatic science, I suppose? Despite having doubts, the exploit worked and fulfilled the necessary objectives. To salve my conscience, I made sure to use the remaining time collecting data and screenshots and prepping the report. After rest on the fourth day, I wrote and submitted the report the morning after and reported in for work. And yes, this time I was able to upload the report properly.

# Postlude
The course is a newer version of AWE, the materials updated and released back in 2023 to my knowledge. I have no reference point as this is my first time taking it but I can finally say I now have some idea what a primitive means. It's such a vague term for me, pinning down what it exactly means is as elusive as its etymology. [zardus](https://youtu.be/PY9fNJel-X8?t=225) formulates it in the most digestible form I've found. Anyway, the materials were a joy to study on their own. Having said this it still shows its age in some parts even though it was refreshed. Corrections to the labs reported by students are missing from the materials. They enable the conditions for the exploits to work properly, instead of making the extra miles easier. I'm unsure why they are yet to be added.

I'm also unsure if the steep price is proportional to the value of the service you're getting. This course is unlike any other in Offsec's catalog: no videos, no recordings. You get a text book, PoC code and VMs for practice. Purchasing the course and viewing exam results are unavailable in the student portal. I can understand the former but the latter? Not so much. This is my latest, and probably my last, Offsec course so I was pleasantly surprised the exam results are now shared to students. The pleasantness faded as soon as I discovered AWE is yet to receive the same treatment.

## When "Try Harder" is not enough
The instructors, while they constructed and provided excellent material, were unresponsive to inquiries. At the end of the bootcamp they gave out their contact details. From the emails I sent, only the first one received a reply. I would have appreciated hearing from and interacting with them. There is also a private discord channel for students and instructors; it's often too quiet. You're lucky to get a reply.

From a student.

This is problematic as students have no obligation to help. Perhaps its par for the course. After all this is Offsec.

The result is given out [within ten business days](https://help.offsec.com/hc/en-us/articles/360046458732-EXP-401-Advanced-Windows-Exploitation-OSEE-Exam-Guide#results). It seems there are two types of vocal students: those who get their result in 24 hours and those waiting out the 10 days, if not more. Those who wait 3-6 days or a week might have no gripes. The unenviably unlucky ones endure 10 or more days. Unable to act or plan immediately, they are forced into stasis. Ten days might seem fair, but considering the total time investment makes it unpalatable. For AWE, the exam is 4 days. Adding the waiting period, 2 weeks. Imagine a student receiving a failing result after investing 2 weeks, and potentially another 2 weeks for the retake.

That's a month.

The total hikes up further if we consider slot availability. After all, it's not always easy to line up *4 back to back, open days*. Students will probably forgo other plans. They can't simply *"try harder"* their way out. This might happen to the unluckiest of students but I think there are students who can strongly relate. For my second attempt the result came after 10 business days. With the exam the ordeal was 18 calendar days. It is difficult for me to write about this as part of me thinks *"It's okay to be patient and to wait"*. Part of me also thinks *"Is it unreasonable of me to feel so uneasy with the amount of time and money invested in this?"*

The [current syllabus](https://www.offsec.com/awe/EXP401_syllabus.pdf) is at odds with the [credentials description](https://www.credential.net/group/360702):
![creds]
* Preventing ASLR was not tackled in the course. The course placed focus on obtaining info leaks and converting them into useful primitives.
* EMET is long gone as of this writing. It was used as supplementary material for [WDEG](https://www.microsoft.com/en-us/security/blog/2017/10/23/windows-defender-exploit-guard-reduce-the-attack-surface-against-next-generation-malware/) but not a focal point.
* We mostly used 64 bit

Probably for the sake of previous holders, Offsec kept the same details for newer holders. It's a shame since newer holders will have to contend with displaying an outdated version of their achievement. An OSEE/OSEE+ split might be unonscionable; simply thinking about it gives me shivers.

Offsec has been around for a while, they must receive similar feedback in some form or another. If not, I hope they consider this post in improving the learning experience of their students. Despite the remonstrances, I am thankful to them for creating wonderful courses and for helping me advance my career. There's still a lot to learn. Thanks to Offsec, I may be able to go the distance with new found skills and experience. If ever I am interested in any of their new content I will check them out. Though I cannot take nor recommend them without reluctance.

## What's Next?
My backlog is swelling and there are some things I've been wanting to post for some time now. I'll come out with technical content to make up for the lack in this post. As for certs, I have some pushed aside so I'll continue pursuing them. Thanks for visiting my blog. Please look out for more posts.

[creds]:{{ site.url }}/assets/img/credentials 1.PNG