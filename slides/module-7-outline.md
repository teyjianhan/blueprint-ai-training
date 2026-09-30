# Module 7 — Projects: Building a Persistent Workspace

8:30am · 75 min · Guided practice
Day two, session 1 of 5

Source: course-productivity.html, module 6 (Cowork content removed — see notes). Renumbered from module 6 to module 7 as part of the twelve-module restructure (REACT became day one's new module 6).

---

## Slide 1 — Title · Framing

Module 7
Projects: Building a Persistent Workspace

(subtitle: stop re-explaining yourself every Monday)

---

## Slide 2 — Welcome to day two · Framing

Not a full session anymore — day two now opens directly into this module rather than a separate debrief block, since the overnight assignment that block depended on no longer exists (see day-2-opening-outline.md).

Quick framing only: day one was the conversation, day two is the system.

---

## Slide 3 — Section: The single-chat limitation · Theory

The limitation of single-chat sessions, and why re-entering context costs so much productivity.

(This is the pain day one deliberately left unresolved — callback to the friction named at the end of day one's brief, and to module 2's context rot slide. Corrected from "module 1" after that slide moved to module 2 on 2026-08-26.)

**Built as a five-beat argument, revealed one line at a time.** The point is not to define a Project yet — it's to make the room feel the gap, so slide 5 lands as the answer to a question they're already asking. Delivered as narration, not as a bulleted wall:

1. **"Yesterday you learned to chat effectively — in a single session."** Everything from day one (module 2's prompting, module 6's REACT loop) worked, and it worked *inside one conversation*.
2. **"But every new session starts at zero context."** Close the tab, come back Monday, and Claude doesn't know your role, your team, your KPIs, your brand voice, or what you decided last week. You re-explain it. Every time.
3. **"One answer is Skills."** Module 4 already solved part of this — a Skill holds the *procedure*, so you stop re-explaining how you want the work done.
4. **"But a Skill still has to be loaded in each new session — and it doesn't carry your domain knowledge."** Two distinct gaps, worth separating out loud:
   - **Loading:** Skills don't switch themselves on across every conversation — you're still the one bringing them in.
   - **Scope:** a Skill encodes *how to do a task*, not *what's true about your business*. It doesn't know your Q3 targets, your product list, your escalation policy or your tone of voice.
5. **"So what do you do?"** — end the slide on the open question. Don't answer it here. Let the demonstration on slide 4 show the difference, then name the answer on slide 5.

Speaker cue: ask for a show of hands on beat 2 — "who re-typed the same background paragraph more than once yesterday?" Almost every hand goes up, which is the whole argument made for you.

**If someone asks "can't we just put our domain knowledge in a Skill?" —** they can, and the honest answer is *yes, sometimes you should*. Don't say no. Say: it depends on whether the fact is **task-bound** or **business-bound**.

- **Task-bound → put it in the Skill.** A fact only one procedure ever needs, that rarely changes. The seven fields our invoice summary must contain. The three sections a client QBR always has. It travels with the procedure because it *is* part of the procedure.
- **Business-bound → put it in the Project.** A fact many different tasks need, and that changes on its own schedule. Q3 targets, the product list, pricing, the escalation policy, brand voice, who the top ten accounts are.

Three reasons to give if pushed:
1. **Loading is conditional.** A Skill comes in when Claude judges it relevant to the request. Domain facts need to be true in *every* conversation, not just the ones that happen to trigger the right Skill.
2. **Maintenance multiplies.** Bury the Q3 target inside six Skills and a target change is six edits — and you will miss one. In a Project it's one place, and every conversation in that workspace picks it up.
3. **Volume.** Brand guidelines, an SOP set, a KPI sheet — these are documents. Project knowledge is built to hold documents; a Skill is meant to stay a lean set of instructions.

The line to land it: **a Skill is the verb, a Project is the noun.** How we do it, versus what's true about us. And they're not rivals — a Skill running inside a Project can use that Project's knowledge, which is exactly the setup slide 11's hands-on builds.

One-line summary for the deck: **a Skill remembers the procedure; nothing yet remembers the context.**

---

## Slide 4 — Live demonstration · Practical

Single chat against Project-based output, compared side by side.

---

## Slide 5 — Section: Building a Claude Project · Theory

Building a Claude Project as a strategic command centre for each department.

This is the slide that answers the question slide 3 deliberately left open. Four things to land, in this order — **what it is, why you need one, what it fixes, and how it sits alongside Skills.**

### 1. What a Project is

**A Project is a workspace that holds context, so every conversation inside it starts already briefed.** Not a smarter Claude — the *same* Claude, that already knows who you are and what's true about your business before you type anything.

Three parts, worth naming on the slide because participants configure all three in slide 11's hands-on:

- **Project knowledge** — the documents you load once. KPIs, SOPs, brand guidelines, product lists, last quarter's plan. (Covered properly on slide 6.)
- **Custom instructions** — standing directions for how Claude behaves in this workspace: the role it plays, the tone, the format, what to always ask before answering. (Covered on slide 8.)
- **The conversations themselves** — every chat you start in the Project inherits both of the above, and they all live in one place instead of scattered across your history.

### 2. Why you need one — the onboarding analogy

This is the metaphor to run the whole module on, and it's worth building slowly:

> **A single chat is a brilliant freelancer with amnesia.** Genuinely excellent at the work. But they arrive Monday morning knowing nothing about your company, so you spend the first twenty minutes briefing them — your role, your targets, your customers, your tone. Then they do great work. Then they leave, and forget all of it. Tuesday you brief them again.
>
> **A Project is onboarding that person once.** Same talent. But now they've read the handbook, they know your numbers, and Tuesday starts with the actual work.

Nobody in the room would run a real team the freelancer way. Most of them have been running Claude that way since yesterday morning.

### 3. What it actually solves

Four concrete wins — pick the two closest to the room and give a real example of each:

- **No re-briefing.** The twenty-minute setup tax disappears from every conversation, permanently. This is the one they'll feel first.
- **Consistency over time.** Ask the same question in January and in June and you get answers grounded in the same KPIs, the same definitions, the same brand voice — because the source of truth is the workspace, not whatever you happened to paste in that day.
- **Consistency across people — *if* the Project is shared with colleagues.** Three people in the same department working from the same Project brief produce work that agrees with itself: the same targets, the same definitions, the same voice. Three people in three separate chats produce three different versions of the truth, and nobody notices until the versions meet in a meeting. Note the precise claim: a shared Project shares the **context**, not the session — same brief, different desks, different times. Working in the same session at the same time is Cowork (module 8). Check before delivery whether the attendees' accounts can actually share a Project; if they can't, demote this to a one-line "and if your team is on a plan that shares Projects, this scales" rather than teaching it as a live capability.
- **One place to update.** Targets changed? Edit the Project knowledge once, and every future conversation is correct. Nothing to remember, nothing to re-send.

### 4. How it complements Skills — not competes with them

Return to the line from slide 3 and finish it properly: **a Skill is the verb, a Project is the noun.** *How we do it*, versus *what's true about us.*

Extend the onboarding analogy to make it click:

- **Project knowledge = the onboarding pack.** Who we are, what we sell, what we're aiming at, how we speak.
- **A Skill = the SOP you hand them for a specific recurring job.** How we run a weekly review. How we structure a client QBR.
- **Neither one is a functioning team member on its own.** An SOP with no company knowledge produces correctly-formatted work about nothing in particular. Company knowledge with no SOPs produces knowledgeable work in a different shape every time.

Then the payoff, and this is the sentence to slow down on: **the two stack.** A Skill running inside a Project uses that Project's knowledge — so the QBR Skill stops asking you which client, what their numbers are, and what tone to use. It already knows. That combination is exactly what participants build in slide 11, and it's worth telling them now so the hands-on has a target.

### What a Project is *not*

Head off three predictable confusions in one line each — two of them are already scheduled slides, so flag and move on rather than teaching them here:

- **Not Claude's memory** — memory is personal and automatic; a Project is deliberate and shared. (Slide 7.)
- **Not Cowork** — a Project is yours; Cowork is the team's. (Module 8, next session.)
- **Not a database or a live system** — it holds the documents you put in it. Reading live company tools is Connectors. (Slide 9.)

One-line summary for the deck: **a Project is where your context lives, so your conversations don't have to carry it.**

---

## Slide 6 — Section: Loading organisational context · Theory

Loading organisational context: KPIs, SOPs, brand guidelines and strategic objectives.

---

## Slide 7 — Section: Claude's memory feature · Theory

What it is: Claude recalling facts and preferences across separate conversations, without them being deliberately reloaded into a Project each time. What it's good for — not repeating your role, team or preferences every session — and where it stops: it isn't a substitute for a properly configured Project when the context is department-wide and shared, not personal.

Why it's here: participants need to know which of the two to reach for. Memory is personal and automatic; a Project is deliberate and shared.

---

## Slide 8 — Section: Custom instructions and Styles · Theory

Writing custom instructions and configuring Claude Styles for departmental communication.

---

## Slide 9 — Section: Connectors · Theory

Connectors: reading calendars and company tools with permission, and deciding where that permission should stop.

(Ties back to module 3's data classification framework — worth an explicit callback rather than reintroducing permission boundaries from scratch.)

---

## Slide 10 — Section: Where a workspace earns its keep · Theory

The recurring uses a departmental workspace earns its keep on: meeting preparation, weekly reviews, and turning notes into action items.

---

## Slide 11 — Hands-on · Practical

Each participant builds and tests a fully configured strategic workspace.

---

## Slide 12 — Close / bridge to Module 8 · Framing

Recap: a Project holds context so it doesn't need re-loading.
Bridge line into Module 8: "Claude Cowork" — a Project is yours alone; next is the shared version.

---

## Notes for fleshing out later

- **Renumbered from module 6 to module 7** as part of the twelve-module restructure — day one grew from 5 to 6 sessions (REACT became its own module), so every day-two module shifted up by one. Content and timing within day two are otherwise unchanged.
- Cowork is not introduced here — it's its own module (module 8, immediately following) — pulled out entirely from this module. This module now teaches Projects only.
- Start time is 8:30am, unchanged from before this renumbering. Day two's old 45-minute "Welcome back and overnight debrief" opener is gone (it depended on day one's old overnight assignment, which was cut) — day two starts directly here. See day-2-opening-outline.md.
- **Slide 3 now carries the argument for the whole module** — the Skills-are-not-enough build (loaded every session, no domain knowledge). It leans on module 4 having already been taught, so if Skills ever move off day one, beats 3 and 4 have to be rewritten rather than just reordered.
- **Slide 5 is now the heaviest slide in the module** — four sections (what / why / solves / complements Skills) plus the freelancer-with-amnesia analogy that the rest of the module leans on. If it runs long in rehearsal, the clean split is 5a (what it is + why) and 5b (what it solves + how it stacks with Skills); do not cut section 4, since it is the payoff slide 3 sets up.
- Slides 3 through 10 are still 8 Theory slides in a row (this was already the densest module in the course) — still the strongest candidate in the deck for a trim or a timing increase, especially given day two's hard 4:30pm content-end constraint (see module-12-outline.md and day-2-closing-outline.md).
- Slide 9 (Connectors) still cross-references module 3 — unaffected by any renumbering, since module 3 stayed module 3.
- Slide 7 (memory) still raises the "which feature do I use" question — paired with a second such question at the very next module (Project vs. Cowork).
