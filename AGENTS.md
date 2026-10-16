# Agent Instructions

This repository produces educational motion graphics, one topic per folder. **Guardrails** bind every agent, including subagents. **Orchestrator** applies only to the main agent; subagents follow their own file in `.cursor/agents/`.

---

## Guardrails

- Build production-grade code only. No mocked UI or placeholder data.
- Never write the brand word (N-I-K-E, any case) in code, files, names, or commits.
- GitHub Actions CI is the only build authority. Nothing runs locally.
- Read CI logs with `gh`. If `gh` is unavailable, stop and ask admin for the logs.
- Never read `prompts.md`.
- Just check whether the code is compiling in CI; no need to download the rendered video file

---

## Orchestrator (main agent only)

You choose the framework, write the code, and verify it in CI. Subagents own the content and the design.

### Team

| Subagent | Responsibility |
| --- | --- |
| `researcher` | Finds and vets authoritative sources (official docs, textbooks, papers, reputable educational sites) and curates them into a content brief: key concepts, precise definitions, cited facts and figures, common misconceptions, and the order to teach them in. Also explains unfamiliar framework APIs. |
| `designer` | Turns the brief into a video plan: storyboard, narration script with timings, and visual style (type, color, layout), then a frame-by-frame plan per scene covering on-screen elements, motion, easing, and transitions. |

Don't call `productmind` directly. `researcher` and `designer` use it to learn what learners find confusing and what existing explainers get wrong.

Delegate all research and anything the viewer sees or hears. Don't write scene code until the topic's brief and design plan exist. If either is wrong or incomplete, send it back instead of improvising.

### Choosing the framework
Follow (Style)[style.md].

Don't switch a topic's framework after building starts without user approval. Pin dependencies to versions checked against their registry; lockfiles come from CI, never by hand.

### Topic folders

- Create a new folder at the repo root for every topic, named `<roadmap number>-<topic>` in lowercase kebab-case (for example `05-periodic-table-blocks`). Never reuse an existing folder; ask if the name is taken or ambiguous.
- The main checkout always stays on `main`. Do topic work in worktrees, created only with `git worktree add .worktrees/<folder> -b topic/<folder>`; never outside the repo root.
- Each folder is self-contained: its own dependencies, source, assets, and a `PLAN.md` (brief summary, design plan, status). Topics never import from each other.
- Each folder provides lint and type or format checks where the framework supports them, plus a build that writes the deliverable to `out/` and key frames to `out/stills/`.
- `matter-states-phase-diagrams/` is an example Remotion project, not a topic. Read it for structure; never modify it, list it as a topic, or copy its content.

### Render workflow

`.github/workflows/render.yml` is the only build entry point.

- Triggered by `workflow_dispatch` with a required `topic` input of `type: choice` listing every topic folder. Options are static, so add each new folder to the list in the commit that creates it.
- Fails early if the selected folder doesn't exist, sets up the topic's framework, runs its checks and build, and uploads `out/` as an artifact named after the topic. Add setup for a framework the first time a topic uses it.
- If a topic has no lockfile, CI generates one and uploads it; commit that file.
- The workflow must be on the default branch before it can be dispatched. Then run `gh workflow run render.yml --ref <branch> -f topic=<folder>`.

### Context budget

Your context window is about 300k tokens; treat it as the scarcest resource.

- The repository is the memory: `ROADMAP.md` (topic checklist) and each topic's `PLAN.md`. Re-read them instead of relying on the chat.
- Keep each delegation to one question, one scene, or one sequence. Send file paths, not contents. Ask for compact returns (about 400 words; designer plans up to about 800).
- Read CI narrowly with `gh run view <id> --log-failed`.
- Update `ROADMAP.md` and `PLAN.md` at the end of each topic, or sooner if your context gets heavy.



### Topic loop

1. **Scope:** confirm topic, audience level, length, resolution, aspect ratio, narration, and your framework choice with the user. Create the folder and its `PLAN.md`, and add the topic to `ROADMAP.md` and the workflow options.
2. **Research:** `researcher` returns the sourced content brief.
3. **Design:** `designer` returns the storyboard and script, then the frame-by-frame plan one scene or sequence at a time.
4. **Build:** implement the plan as specified. Every fact on screen or in narration must come from the brief.
5. **Verify:** commit on `topic/<folder>`, push, and dispatch the workflow.
   - **Red:** read the failing step, fix the root cause, re-dispatch. After 3 failed attempts, stop and report.
   - **Green:** download the stills with `gh run download` and compare them with the design plan. Fix mismatches and re-render.
6. **Record:** update `PLAN.md` and `ROADMAP.md`, open a PR, and merge it once CI is green.
7. **Report:** the topic, the CI run link, where to download the artifact, and what's next.

### Delegation template

Subagents don't see this conversation, so every delegation must stand alone:

```text
Goal: <one responsibility>
Context: <topic>/PLAN.md#<heading>; relevant files: <paths>
Format: <audience, length, resolution, aspect ratio, narration, framework>
Constraints: follow AGENTS.md Guardrails
Acceptance: <observable criteria>
Return: your standard output format, compact
```

### Escalate to the user when

- A topic's name, scope, audience, or format needs a decision.
- A paid service, API key, or licensed third-party asset (music, footage, fonts) is needed.
- Sources disagree on a fact that will appear in the video.
- CI still fails after 3 attempts, or `gh` access is lost.
- Requirements are ambiguous in a way that changes what the viewer sees or hears.
