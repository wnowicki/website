---
layout: "post"
title: "Prep your ticket"
subtitle: "How to perform technical inception of business requirements?"
date: "2018-09-09 17:45"
author: wojtek
post_id: 8b808f7667f141bab8e9def097be161b
heading_image: 2018-09-scrum.jpg
categories: development
language: en
tags:
    - agile
    - scrum
    - documentation
---

[Agile](https://en.wikipedia.org/wiki/Agile_software_development) ticket flow usually sounds easy, as a dev you are getting a ticket with all business requirements defined by a product owner, business analyst etc. Then you just have to deliver it, submit it for a review, pass QA and UAT and then it finally lands in the live environment.

Wait... just deliver... here comes the difficult element and something that can generate an unnecessary cost. Of course, there is the technical side which can be done wrong, inefficient and low in quality.  But this article is more about the soft side of your ticket. And this soft side can cause the same negative effects as bad technical implementation or can lead you to bad implementation.

To avoid failing you have to answer those questions:

- How to organise your work?
- What things should you check?
- And what questions you should ask?

## Before you start

In order to get things right you have to sort out things from the list below:

1. **Can I start it?**

    Yes, do you have all the information you need on the ticket? In an ideal world, you would get what you need. But we are not living there. Even more to that, there may be no business analysis in your company or anyone with the skills to write a good business case. So before moving forward check if you have all the information you need. If not ask relevant people. Remember now you are the owner of this ticket and you have to deliver it. So you need to do everything which is required to complete it.

2. **Do I understand the problem I’m solving?**

    That’s a fair question. No yet from a technical point but from a business point, do you understand what problem you are trying to solve? What process will this feature improve? A decent level of understanding will be good to make sure you are solving right thin in right way.

3. **What parts of the system am I touching?**

    The first step into a technical element of your ticket. Just check what parts of the system you need to work in to be able to complete your story. First, it will help you to better understand the scope of the task. And as well it will allow you to check if you have access to all relevant parts. A small suggestion here each separate part of the system is either a task or even separate ticket.

4. **Do I have clear acceptance criteria?**

    Or do you have any at all? Will be good to know what positive completion looks like.

5. **Is anything big enough to be split out?**

    It’s always better to play smaller tickets. As well it will allow to share them in between your team, so it gets delivered faster.

> ### Write what you don’t know!
> 
> And your prep will become getting those questions answered.

Remember about some key principles. Timebox everything, make sure you are not spinning on anything. If you get stuck ask for help.

Don’t be worried too much, remember that you are not alone there. You are working as a part of a team of a company. So I’m guessing there is a senior developer, architect, business analyst, product owner to help you with your prep.

## Do your prep

Now it’s time to start doing some technical preparation. Assuming that you know everything you need from the previous stage. Now there are a few more questions to be answered.

Remember that in this stage it’s really important to write down key things. As in this stage, you will be creating actual tasks or even additional tickets. Anyone who will pick this after you should be able to complete it without repeating what you’ve done already. Creating **clear tasks is important as well from a visibility point** of view so [SCRUM](https://en.wikipedia.org/wiki/Scrum_(software_development)) Master, iteration manager or event the rest of a business can see progress.

0. **What documentation I need to write?**

    Documentation is really important part of the software, although clean code should explain itself some higher level description is key. Especially with API’s, another developer to work with this code needs to know where to start. So check what documentation you need to update or create.

0. **Is this affect the external world?**

    For example, am I changing public API? If so, then the previous point becomes even more important. Remember to be really careful in this area. Other people are using it so you can’t introduce any breaking changes or remove any functionality. And don’t forget to apply some standards like paginations, limits, filters where applicable.

0. **What is the architecture?**

    How do I design it? Should I introduce a new service? Or add this as a part of the existing one? How might this thing evolve in the future? Is it extendable? Don’t forget to align your solution with the overall architecture of your system. And use some best practices ex. [SOLID design principles](https://stackify.com/solid-design-principles/).

0. **What technologies I need to use?**

    Do I need to introduce any new technologies? If so what technologies? Is what you have at the moment available insufficient? Or introducing new will make things a lot easier? But then what additional implications would it bring? And management overhead for future? Potentially second difficult question here.

0. **Do I need to change any data structures?**

    If things are already abstracted properly then you almost shouldn’t care about it. But if they are not then you must check if your changes won’t break anything in other parts of the system or even out of it like reporting.

0. **How I will be testing it?**

    Last but not the least. Good testing is priceless. Current tests should make sure that you are not breaking anything in the system. That’s why so far there wasn’t much about making sure you are not breaking anything. So don’t break current… but as well to maintain coverage and your safe sleep in future you have to write some good tests. Prepare a plan for it and validate it with your QA.

And you feel like you still haven’t to write any code. Absolutely not! What is the point of theoretical prep? Especially in cases like new technology architecture and so on. There should be some base code created already. How you want to start doing final step without checking first if your ideas will work.

## Before you start...

Just make sure

1. The ticket is updated with your solution
2. All relevant tickets and tasks are created
3. Everything has size estimated
4. And you’ve not missed anything from previous sections!

Depending on the rules in your team this is the time you want to have a quick chat with your senior developer and check if he is happy with what you’ve done so far. Potentially this person will be reviewing your work later so better to make sure you have the same things in your minds.

Although this whole "process" may look like it's time-consuming and decreasing your productivity. Nothing more wrong than that! These steps are just a suggestion of how you can perform something which must be done anyway. You don't need to use them but you should get into the similar result. Looking on it from a delivery perspective even if there is a little bit more of work to do upfront it will benefit later. And the whole process will be more efficient. Because now you should know everything you need and it’s just a case of converting your knowledge into code.

**Good luck!**
