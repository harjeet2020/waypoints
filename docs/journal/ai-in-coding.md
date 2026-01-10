---
title: How to Use AI in Coding (Without Creating a Mess)
sidebar_label: How to Use AI in Coding?
---
## Introduction

The recent advancements in AI are beginning to fundamentally reshape certain aspects of our society. Out of all industries, software engineering has been arguably affected the most. The debate is still raging - some believe that AI will soon completely replace human developers, while others dismiss it as a bubble fueled by hype. I believe that the truth lies somewhere in the middle. In this article, we will examine the current state of the so called _vibe coding_, outlining what AI is already good at, in which aspects it still struggles, and how to get the most out of it. And to make it more fun, we will look at practical examples taken from my personal _prompting_ experience.

## Vibe Coding Basics

If you are unfamiliar with _vibe coding_, there are several things you need to know. The rather loose term refers to the practice of writing code through prompting an AI _agent_. An agent is a tool that lets LLMs perform real actions - such as reading / creating / modifying / deleting files on your computer - instead of being limited to chat interface. Coding agents leverage large context windows to scan vast amounts of code, then make modifications according to your instructions that inherently fit everything else. Besides the basic functionalities, many agents have dedicated planning modes that increase output accuracy, and their functionality can be further extended by _mcp servers_ - tools that allow the agent to interact with external software (for example read or modify a database, summarize your emails, or perform a web search). All this makes for quite a robust toolset that, when used correctly, can skyrocket your productivity as a developer. Sounds wonderful, right? Unfortunately, there is a catch - if you are not careful, the AI can wreak absolute havoc in your codebase - introducing security vulnerabilities, hard to detect errors, design inconsistencies, and overall messy code, hard to understand and maintain.

## Going Beyond the “Vibes”

The fundamental issue here is that AI models do not truly think - they are just incredibly good at guessing. While they are very capable at writing code, they lack creativity or capacity to make architectural decisions. That is why asking AI to write a complex application from scratch with a single prompt is inherently doomed to fail. Conversely, to get the best results from AI agents, the more specific you are in your instructions, the more granular tasks you give them, the better. The established flow here is **discuss - plan - implement & review - test** cycle, also known as _spec-driven development_.

To better understand why this flow is so useful, let us go through a practical example. We will be implementing a backend feature - a cron job that deletes unverified accounts after 14 days.

### Phase 1: Discuss

**Prompt:** Our goal is to configure our backend to automatically delete unverified accounts after 14 days. The email verification process happens with Firebase in the frontend; current user verification status is available to us through firebase admin sdk. Please scan this repo and suggest how to best implement this.

**Result:** A detailed strategy that aligns with our goals. The agent suggested that implementation will include creating a new cleanup function, refactoring the existing deleteAccount endpoint to support internal deletion (no req / res), installing cron as a dependency, setting up the cron job and running the cleanup on server startup to account for downtime.

**Conclusions:** So far so good. The general direction seemed good to me, but I added a new requirement - unverified account deletion shouldn’t apply to dev accounts to facilitate development. The agent suggested adding a dedicated isDevAccount field to the user schema, and I accepted - then asked it to compile a more detailed implementation plan with code snippets, moving on to the next phase.

### Phase 2: Plan

**Plan Review:** After scanning through the plan, I found one big issue. The agent decided to query my database for all users that `!isDevAccount & createdAt > 14 days`, then for each entry check emailVerified property on firebase user - if false, proceed with the deletion. The obvious problem here is that the database query is likely to return a huge collection of users - over 90% of the entire user collection, certainly. Needless to say, this is atrocious code. Let’s say we have 1 million users, 90% of whom are not dev accounts and have registered more than 14 days ago - but only 200 of those failed to verify within 14 days. In this scenario, assuming the agent’s suggested approach, we would be running our custom logic on 900,000 users instead of just 200 - atrocious indeed. So I iterated, pointing out the flaw to the agent and asking for refinements.

**Prompt:** This looks mostly good - but there is a serious performance issue in your plan. The database query is likely to return almost the entire user collection, since most users aren’t devs and have registered more than 14 days ago. The more efficient approach would be to create an emailVerified boolean in the user schema and rely on that instead for filtering - but the tradeoff is that now we need to come up with a strategy to sync firebase email verified status with our database. Please reevaluate and suggest the best approach.

**Result:** The agent immediately corrected itself. It seamlessly updated the plan to follow the logic I proposed, deciding to create emailVerified in the database, which would be populated/synced with Firebase (source of truth) in the auth middleware from the received token. Assuming the dataset from the previous example (1 million users, 200 to be deleted), the cleanup function would now take about 3.3 minutes instead of 48.5 minutes to execute - about 14.5x faster.

### Phase 3: Implement & Review

I had the agent implement the refined plan, then reviewed the code briefly. I found one more snag in the implementation. The agent suggested syncing emailVerified between firebase and mongodb in auth middleware, which happened on every API call. While not performance-critical, it would create lots of unnecessary database writes (I’m ashamed I didn’t catch it immediately). So instead, I asked it to move the logic to the cleanup function instead - the mongodb field would be used for initial filtering, but the cleanup function would check firebase directly. If emailVerified false, we delete. If true (but false in mongo), we update the mongo value instead.

So in practice, all new accounts go through the cleanup function exactly once after the 14-day period; then the account is either deleted (user didn’t verify in time) or emailVerified is set to true and never changes again. Since the cron job runs every day, the amount of users being processed is likely small (limited to daily user sign-ups). Considering this, I decided not to mess with concurrency for now - but if my app ever scales to tens of thousands of daily sign-ups, I know I will need to.

### Phase 4: Testing

Since I was quite diligent with the logic in the previous steps, all my manual tests passed. I tested if the users were deleted correctly, if the verifiedEmail field was updated as expected, and if dev users were skipped - all cases covered.

### Conclusion

If you are accustomed to vibe coding without a second thought, you are likely thinking “this seems like a lot of work”. And you are right. If I’d let the agent just implement this from a single prompt, I would have got a working version within 20 minutes. Instead, I spent 2 hours manually reviewing code and thinking about architecture and performance implications. But without taking this time, I would have ended up with code that breaks with scale. If you write an entire app “riding on the vibes”, you end up with massive technical debt. On the outside, everything seems to work - but once you put the system under pressure, it falls apart like a house of cards, and it is literally easier to build everything from scratch again than fix it.

The productivity gain from using AI is still huge - as a junior-level hobbyist developer new to my tech stack, I would have likely spent a day or two implementing this manually. You can argue that a senior could have done it way faster - and you would be correct. But a senior using AI well could do it faster still. The thing is, because of advancements in AI, the role of the developer is changing. To implement all that, I didn’t need to know any syntax. I didn’t have to look up documentation. Instead I just examined the logic, ensuring the system is well designed and performant enough for my needs.

## The Future of Coding

From the example we covered, it is very clear that at least for the time being, coding agents are not a replacement for human developers - but they are powerful tools that can provide a major productivity boost if used well. And actually, they are a direct solution to a problem that has plagued software engineering for years.

Let us go back in history to the origins of internet and the early days of object-oriented programming. In its infancy, programming was blissfully simple - loops, if statements, I/O operations, memory management. As a programmer, you understood what every single piece of your code did. However, as computer programs became increasingly more complex, this created a huge maintainability problem. We wanted to build larger, better software, but with low-level code alone it simply wasn’t possible. That’s because no human is capable of keeping millions of lines of code in their memory. The code was monolithic; changing one small part often broke everything else, large teams failed to coordinate, and as a result the cost of building software was increasing exponentially with scale - both in terms of money and time.

Then OOP (object-oriented programming) came and gradually revolutionized everything. With classes and objects, core logic for solving common problems was abstracted away into libraries and frameworks. You could do more with less, and faster - however, at an important tradeoff. As abstraction increased, developers inevitably started to write code they didn’t fully understand. There was always another language or framework to learn to stay on top, and a software engineering career became an endless grind of “upgrading” your knowledge. To succeed, you needed to specialize - companies were looking for people who were deeply familiar with a particular tech stack instead of just “good engineers”. This system worked fine for many years - but with time we learned that there is such a thing as too much abstraction. After all, who hasn’t spent days debugging their code only to find out that the issue was with a dependency they never even knew their project was using in the first place? Not to mention security vulnerabilities - yes, I’m talking about you **npm!**

Fortunately for us, we are entering the AI era. In my humble opinion, the arrival of AI in programming is comparable to the arrival of internet and OOP. It changes the game entirely. When programming was in its infancy, you had to learn from books, and wrote your code on a piece of paper before executing it. In the OOP era, you learned from online documentation and had IDE support to detect syntax errors. In the AI era, you do not need to worry about correct syntax anymore. You don’t need to worry about writing the code manually anymore (unless you want to). The AI can handle that - while you take care of the logic. You are now more than just a developer; you become an artist/orchestrator that directs and supervises your artificial employee. Instead of spending hours writing boilerplate code, debugging an issue, or refactoring code to conform to new architecture, you focus on the more pleasant, creative aspects of development. Of course, at the moment you still need to be suspicious of everything that your artificial employee does for you - but if the 21st century has taught us anything, it is that technological progress is not only inevitable, it is exponential - so given time, AI is likely to improve dramatically.

## So, Is Traditional Coding Dead?

Far from it. Just because AI can code faster than humans do, it doesn’t mean that abandoning coding by hand completely is advisable. For one, top-level problem solvers will always be needed. But we also need to distinguish between prototyping, building and maintenance stages of software development. While AI is strongest in prototyping and genuinely helpful in building (if used correctly), it offers limited benefits in maintenance. The core thing is to choose the right tool for the right task. Using a large hammer to add intricate details to a small, delicate sculpture is no better than trying to build a skyscraper with brick and clay alone.

Of course, in the real world there will always be executives who mass-layoff thousands of people due to “AI restructuring”, then end up rehiring them months later when their codebases collapse on themselves. There will always be those who cut hiring juniors, only to find out in a couple of years that as senior devs retire, there are no mid-level devs to replace them. As with any revolution, the emergence of AI has triggered fever-like enthusiasm in many, and we can hardly expect that everyone will be reasonable about it. But with time the fever will pass, the hype will cool down, and slowly but surely, the world will begin to adjust.

## Tips for Effective Vibe Coding

To wrap up this article, I would like to share with you a few tips on how you can best leverage AI-assisted coding. Many an old-school developer has written off AI not because the agent itself was deficient, but because they were using it poorly. Contrary to the popular belief, the trick to successful vibe coding is not about “prompt engineering” - it is simply understanding how LLMs behave, how to properly interact with agents, and what things to watch out for. Let’s have a look!

### Use Version Control Religiously

It sounds obvious, and yet somehow it isn’t. This is advisable for all software projects - but if you are using a coding agent, it is a must. You never know when AI decides to go on a rampage and delete half of your codebase - so you should always hold the power of reverting any changes AI makes. If you have ever made the mistake of forgetting to commit, then watch AI irreversibly ruin the whole day of your work; well, now you know.

### If You Don’t Understand, Ask

The AI agent often spews out code that works, but that the human eye doesn’t immediately comprehend. This is especially true for hobbyist developers, juniors or devs experimenting with unfamiliar tech stacks. The human temptation is to simply let it go and proceed to the next task. However, this is when technical debt tends to creep in, and things begin to drift apart. So when you don’t fully understand the code LLM generates for you, simply… ask it. It will be more than happy to explain, and you will often discover bugs or inconsistencies in the process.

### Be Suspicious

LLMs have a miraculous ability of inventing things that don’t exist and presenting them as absolute truth - this is called LLM hallucination. While without technical knowledge it is at times difficult to tell the difference, if you listen carefully to what the LLM tells you, you will more often than not be able to tell that something is off. When in doubt, ask it to verify its claims by performing web search, or investigate on your own. It will save you both time and embarrassment.

### Beware of Bloated Context & Debug Loops

One thing that makes AI agents as good at coding as they are is their ability to read your entire codebase, analyze it, and design their code patches while taking everything else into account. However, more context is not necessarily better. When the context window gets very large, the LLM performance degrades sharply, and it becomes much more prone to hallucinations and debug loops - it just keeps breaking the code more and more instead of fixing it, then breaks down emotionally and starts apologizing. Better avoid the emotional drama by keeping close tabs on your context window - up to 200k tokens is usually the sweet spot.

### Discuss - Plan - Implement & Review - Test

I know that I am being boring, but seriously - use AI as your companion in coding, not as a magical oracle. If you think your AI agent is actually capable of real reasoning, you are sorely mistaken; artificial intelligence is just what it is - artificial. That’s why you do the thinking, while AI can code for you - anything else, and you are just producing AI slop that is destined to break in a million different ways (eventually).

### Use MCP Tools - But Mindfully

MCP servers can absolutely supercharge an AI agent. You can perform web search in an instant to identify potential solutions to your problem, fetch version-specific documentation to make your agent aware of the modern syntax/patterns instead of relying on stale training data, use sequential thinking to force the agent to approach the implementation more carefully, read your database and perform queries, use a memory bank for persistent memory across sessions, and much more. The possibilities are endless - but as always, be careful. If you allow it to, your agent will be more than happy to wipe your entire database in a stroke of bad mood. And each mcp server you enable bloats your context - so only use what is truly needed.

### Victory Favors Preparation

Napoleon’s favorite saying aged well. Taking the time to prepare your AI coding session and keep things organized provides immense benefits the longer you work on a project. Specifically, it is very important to document architectural decisions you make, then use project-specific agent rules (such as [CLAUDE.md](http://CLAUDE.md) files) to enforce them. For example, recently I migrated from native navigation stack to jsstack in my react native application to eliminate screen glitches when navigating between transparent screens (which my app heavily uses due to an animated background). I had AI create a reusable stack navigator component that abstracted away the custom crossfade logic I implemented, then asked it to create a comprehensive documentation reference file with instructions on how to use it. Finally, I introduced a small section in my [CLAUDE.md](http://CLAUDE.md) that asked AI to always use this component for stack navigators, with a short usage example and link to the doc file. The result? I don’t have to tell AI what to do anymore; it automatically conforms to my app’s architecture instead of generating code that doesn’t fit.

### console.log Is Your Friend

Debugging through breakpoints has been more intuitive for many devs than writing and reading console logs while testing. This has changed with AI agents too. If you can’t identify what’s wrong, and the agent neither, all you need to do is add comprehensive logs to trace the entire logic flow, then paste log output for the agent to analyze. Sometimes you get dozens, or even hundreds of logs that would be very draining to analyze manually. But the agent can easily take an input of a few hundred logs and trace the entire logic within seconds. Granted, it doesn’t always work - but it is worth a try. Most often than not, the agentic console.log method has saved me hours of dull debugging.

## Conclusion

In this article, I did my best to provide an honest assessment of the current state of vibe coding. The AI tools we now have are just that - tools; and the outcome of our work depends not only on the tool itself, but on how we use it. I strongly believe that AI is here to enhance developers, not to replace them. That said, I'd love to hear your perspective - do you use AI in coding? How is it working out for you?”