Build a Notion clone, every features should exactly be like Notion but keep the project name as something else. Tech stack - for frontend I think they use Next js and figure out other stacks (come up optimal one)

optimize the guardrails for AI Agent. Do not elaborate it or exaggerate it. keep it short and simple


keep in mind that Orchestrator should not just give the other agents a big chunk of work [because the model has only 300k context window], instead it should iteratively build the application using these agents

Github Actions CI is the only compile and Build authority, there is no local runtime. By default use Blueprints skill for  managing context. first come up with a plan and write Agent file for cursor. Build our application with aesthetics and intuitive UI. 


architect doesn't going to run build commands, it's job is to calculate the feasibility, trade-offs and future scope for better scalability and maintainbility
I have described the Agent requirements vaguely, coming up with best config is your job

considering the following, whil agent file, 




If there is any architectural flaws/quirks - come up with a plan. Only proceeed further if it is approved. 
you can always propose optimal implementation than in the blueprint , only proceed further if user say approved it

This project right now has many flaws, a lot features / functionalities isn't working as expected. instead of directly editing it, ask questions of "how it could have been implemented better?" or "Stick with the existing system."


Stick with the existing Privileged broker and cleanup [as described in blueprints].
For [clean up for browser, system, temp files and so on] clearing system-level files - on a scheduled date and time. I think there is no UI for user to set these things up. so Create one




--------------


# Guardrails

- Never use the word (`N-I-K-E`, any case) in codebase, file creation, names, or commits.
- GitHub Actions CI is the only build authority. Nothing runs locally.
- Read CI logs with `gh-cli`. If `gh` is unavailable, stop and ask the user for the logs.
- Never read `prompts.md` or add it to `.gitignore`.


### Engineering practices
- Start every file with a header comment and give every function a doc comment.
- Build production-grade code only. No mocks or placeholder data.
- Manage context with the Blueprints skill.
- Take project context only from `README.md` and `architecture.md`; ignore the root and git folder names.
- Never use GitHub Actions run IDs as verification status in blueprints.
- Store diagrams in `assets/.diagrams/` and wireframes in `assets/wireframes/`.


## Git commands
```
Remove-Item -Recurse -Force .git
rmdir /s /q .git

git init
git log --oneline

echo "# Nike-op" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/<>.git
git push -u origin main

```



## Migration Checklist

- [ ] Blueprints Skill
- [ ] AGENTS.md, AGENTs folder
- [ ] prompts.md
- [ ] Design files / Wireframes (Excalidraw)



## PROMPTS

### AGENT Instruction definition guidelines

- AGENT instruction should not be - too prescriptive or too vague, It should be inbetween somewhere.
- Do not elaborate or exaggerate instruction for the AGENT; keep it clean and concise



- Diagrams/ web pages / Explainer videos (create a 3Blue1Brown style video explainer on X. ElevenLabs for audio narration)



## CURSOR

- /summarize, /visualize

- Execution and Approvals > Auto-Review

- `is_background: true` — the main agent starts the subagent and keeps working without waiting for it to finish.

- Fork - Agents Window > Right Click

- Keyboard Shortcuts —— `Cmd+I` (open agent), `Cmd+/` (change models)

- Plan Mode ——> AI research your codebase and generate a structured implementation plan



## AGENTIC Engineering practices

- Plan ——> code (context) ——> Build & Test ——> Review
- Faster != Better          ——>     Incremental developement



### Prompt structure

```
    <rules>                                     ——  AGENTS.md
    <context - (Feature requirement, task...)>  
        <problem>
        <behavior>
    </context>
    <contraints>                                ——  Don't change any other modal behavior or layout.
```

--------------


## AGENT HQ

we already have agents [Research, Designer, Architect, Coder, Planner, Reviewer]. find the opitimal model for these from the available list.
Design specialized subagent for Cursor [ Reviewer]. Describe its role and how it should respond. Give description for each agent (cursor) and if additional property required - add them as well.



Research Agent - Research for the existing product's system, features.

Designer - responsible for designing Aesthetics and intuitive UI,  UI workflows. Returns Design plan with granular details. currently it writes code

Productmind - Researches [external media like relevant subreddit page, ] what existing product failed address or could have done better that speaks for the product itself. can only be called by {Designer, Research Agent}

Reviewer - reviews code by build error check via gh-cli CI logs, polls and returns what actually causing build fails/ errors


---

write all the Agent config in an .md file


subAgent - Research, review through CI logs


- Also come up with the list of best model that are best fit that specific role. [Do web research, get data from only legit sites. Do not spawn subAgents for this task]


### SubAgent models:

- **Claude:** Opus 4.5 (high thinking), Sonnet 4.5 (thinking), Sonnet 4, Haiku 4.5 (thinking)
- **GPT:** 5.1, 5.2, 5.3 Codex, 5.4 Mini, 5.4 Nano, 5 Mini
- **Gemini:** 3.1 Pro, 3.5 Flash, 3 Flash, 2.5 Flash
- **Others:** Kimi K3, Kimi K2.7 Code, GLM 5.2, Composer 2.5

ROADMAP.md

-Phases of implementation plan. It should have iterative improvement and refinement of features and workflows... with granular details 


In the Agent Orchestration workflow, the main agent has to write code here after (No coder Agent). Do not write instructions like you will have to write code, blah blah blah. keep it short and simple and remove Coder Agent from AGENTS.md. 


-----------------



**Agent Layout** is Cursor’s agent-first IDE arrangement: the window is organized around chatting with the agent, running tools, and reviewing changes—not only a code editor with chat bolted on the side.

### How it differs from other UIs

| Surface | What it is | Typical shortcut |
|--------|------------|------------------|
| **Sidepanel chat** | Agent chat in a side panel; editor stays VS Code–like | **Ctrl+I** or **Ctrl+L** |
| **Agent Layout** | Whole-window layout tuned for agent work (sidebars flip/rearrange) | **Ctrl+E** (toggle) |
| **Agents Window** | Separate agent-focused window (multi-agent, worktrees, diffs) | Command Palette → **Open Agents Window** |

Opening the sidepanel does **not** automatically switch Agent Layout. **Ctrl+E** toggles the layout mode; **Ctrl+I** toggles the chat panel.

Community reports (not always spelled out in docs): in **Editor** layout the main sidebar (Explorer, Git) is often on the **left**; in **Agent** layout agents may be on the **left** and the classic sidebar on the **right**.

### What you get in Agent Layout

Same agent features as elsewhere—modes (Agent, Ask, Plan, Debug), diffs, checkpoints, queued messages, browser tools—but the chrome is arranged for that workflow. Browser docs also call out extra session isolation when the integrated browser runs in this layout.

### Related: “Agents Window”

That’s a **different surface**: projects/agents list on the left, chat in the center, **Files / Terminal / Browser / Changes** on the right. Use it when you want a dedicated agent desk, not just **Ctrl+E** inside the normal editor window.

### Settings you might see

- **Cursor Settings → Agents** — auto-run, browser approval, usage summary, etc.
- **`cursor.agent_layout_browser_beta_setting`** — community/forum beta flag for browser-in-layout; not in the main docs index.

Docs: [Keyboard shortcuts](https://cursor.com/docs/reference/keyboard-shortcuts), [Agent overview](https://cursor.com/docs/agent/overview), [Agents Window](https://cursor.com/docs/agent/agents-window).




For a new task, start a fresh chat instead (Ctrl+N in the IDE, /clear in the CLI). To bring over just part of an old chat, mention it with @Chats, or use /fork from a specific message.

Alternatives: /clear for a new session, /fork to branch from a message.

Start a new chat (/clear or /new in the CLI)


-----------------












The agent finds the library's ID, then pulls the relevant docs into its context.

**Name the library directly** to skip the lookup step. Use its ID, written as `/owner/repo`:

> Implement Supabase auth with email magic links. use library /supabase/supabase

**Make it automatic with a rule.** Create `.cursor/rules/context7.mdc`:

```markdown
---
description: Use Context7 for library documentation
alwaysApply: true
---
When writing code that uses a third-party library or framework, or when generating
setup/configuration steps, use the Context7 MCP tools to fetch current docs
before answering.
```


## Note for this repo

Context7 ....`researcher` and `architect` --- checking library APIs and versions. That would mean mentioning it in their files under `.cursor/agents/`. The remote option also fits your "nothing runs locally" rule, since no local process is involved.



- If you have branch conflict, while commiting, stop and ask user


------------





A worktree is a second working folder attached to the same git repository. Each folder has a different branch checked out, and you can edit both at the same time.

Normally a repository has one folder (here `c:\nike-tracker`), and it can only show one branch at a time. Switching branches swaps the files in that folder. `git worktree add <folder> <branch>` creates another folder with a different branch checked out, and both folders share the same history, commits and remote. A commit made in either folder is immediately visible from the other, because there's only one repository underneath.

That's why I used one:
- Another session had `c:\nike-tracker` on the `promo-video` branch.
- I needed to work on `slice-2-project-shell` without switching branches under that session.
- So I ran `git worktree add C:\tron-slice2 slice-2-project-shell`, which gave me a second folder showing the Slice 2 branch.
- I committed and pushed from there, then removed it with `git worktree remove`.

Removing a worktree only deletes that extra folder. The commits made in it stay in the repository, so nothing was lost.

Useful commands:
- `git worktree list` shows every folder attached to the repository.
- `git worktree add <path> <branch>` creates one.
- `git worktree remove <path>` deletes one. Git refuses if the folder has uncommitted changes.




---------------

The next level up is **upper-division undergraduate**: second- or third-year students taking physical chemistry or chemical thermodynamics. The current video assumes intro chemistry. At this level, viewers already know the vocabulary and expect the "why" in equations.

For this topic, that level would usually add:

- **Chemical potential:** phases coexist where their chemical potentials are equal, and the curves on the diagram are where that holds.
- **Clapeyron equation:** the slope of each boundary is dP/dT = ΔH / (T·ΔV). This explains water's negative solid–liquid slope directly, because ice has a larger volume than liquid water. The current video only gives the density argument in words.
- **Clausius–Clapeyron equation:** relates vapour pressure to temperature. It also explains why the liquid–gas curve rises the way it does.
- **Gibbs phase rule:** F = C − P + 2, which explains why a triple point is a single point and a two-phase boundary is a line.
- **Real numbers and scales:** enthalpy values, log-pressure axes, and diagrams drawn to scale rather than schematically.
- **Beyond one substance:** binary phase diagrams (liquid–vapour and solid–liquid, with eutectics) and P–V–T surfaces.

After that comes **graduate or specialist level**: statistical-mechanics derivations, critical exponents and the behaviour near the critical point, and multiple solid phases (water has many forms of ice).

If you want a second version at the upper-division level, it would need a new topic folder and its own scope confirmation, because the audience changes the brief and the script.

-----------


How should I fix the background sound for this lesson? (Only this topic's folder changes; then I re-render in Cl.)

- Soften the pad: drop the detuned overtone, darker filter, lower chord, quieter level (Recommended)
- Remove the pad entirely (narration only)
- Keep the pad as-is, just make it quieter
- Leave it as it is




---

### Choosing the framework

Pick the best fit for each topic and state the choice and reason when confirming scope:

- **Remotion (React/TypeScript):** narrated explainers, kinetic text, animated charts and data.
- **Manim (Python):** math, equations, geometry, algorithms, and data structures.
- **Lottie / SVG / CSS:** lightweight, looping animations meant to embed in web or app pages.
- **ffmpeg pipelines:** assembling image sequences, overlays, audio, and transitions.
- **Still frames:** diagrams, infographics, or storyboards where motion adds nothing.




Pick the best fit for each topic and state the choice and reason when confirming scope:

- **Remotion (React/TypeScript):** narrated explainers, kinetic text, animated charts and data.
- **Manim (Python):** math, equations, geometry, algorithms, and data structures.
- **Lottie / SVG / CSS:** lightweight, looping animations meant to embed in web or app pages.
- **ffmpeg pipelines:** assembling image sequences, overlays, audio, and transitions.
- **Still frames:** diagrams, infographics, or storyboards where motion adds nothing.
---




For complex topic / concept leave a brief note on the screen; but it shouldn't be look like a note but kinda caption yet note
-> Print-friendly typography

check whether AGENTS.md is checking for gh auth status in the beginning of the session.

For new video generation, the folder should be - number followed by folder name <number in roadmap><folder name>.


This repo has to be in the main branch, always; but agents can create worktree and work on various worktree.



pitfalls box





so they count as "inside" and the protections you want stay on.
# add to .gitignore
.worktrees/



- Instruct the agent to Keep worktrees inside the workspace (.worktrees) - Put them under an ignored folder in the repo

- add it to AGENTS.md so agents create new worktrees there, for example: "Create worktrees only with git worktree add .worktrees/<folder> -b topic/<folder>; never outside the repo root."


### Session start

1. Read `ROADMAP.md` if it exists and resume the next unchecked topic.
2. If `render.yml` isn't on the default branch, build and merge it first.






## prompts

No need to download the .mp4 or stills, just verify the runtime in the CI


Does the implementation over, or need to work on it


What does it means - "Thermodynamics will determine whether the process will occur" - It's not at all explanatory 



while moving on from one concept to another in a video, I think it's good to address
why that concept is essential and how it's interconnected?



The script should trigger imagination curiosity of the audience rather than simply defining the concept.


---------------------


In the wireframe:

Font size: the title is now 80 px instead of 96 px.
Position: the title starts 32 px in from the left end of the lines (x=152 instead of x=120). The lines still start at the 120 px safe margin.
Padding: the padding scales with the font, so it's now 16 px above and below the title. That moves the bottom line up from y=273 to y=248, and content can start from y=264.



Pixels are the right unit here. "1080p" wasn't needed, so I removed it, and the rule in `style.md` now just says "Title is bold, about 70 px."

Remotion runs your scenes in a headless browser, but it isn't a web page that resizes to fit a screen. The composition is fixed at 1920×1080, the size set under "Resolution and aspect ratio" in `style.md`. Remotion captures each frame as an image that exact size and encodes those images into the video. So 1 px in the code is 1 pixel of the final video, whatever screen it's later watched on. That makes px a precise unit: 70 px is always 70 of the frame's 1080 rows. "At 1080p" only repeated the resolution, which `style.md` already fixes.

Your question is still written at the bottom of `style.md`. I left it alone, so delete it whenever you're ready.

