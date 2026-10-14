Course structure lives in CURRICULUM.md (70 lessons: 20 Foundations, 20 Inorganic, 30 Organic).

## Phase 1 — Shell & design system

### 1.1 Design tokens (src/styles.css)
- [ ] Define color tokens: ink, paper, muted, accent (deep teal), warn (amber), danger (red), element-category palette (s/p/d/f blocks, halogens, noble gases) — NO purple/indigo
- [ ] Define typography tokens: display font (bold geometric sans for headings), text font (readable sans for body), mono (formulas/data)
- [ ] Define spacing, radius, shadow tokens; diagram stroke/fill tokens
- [ ] Dark-mode-safe token structure (light-first, bright textbook)

### 1.2 Fonts & base styles
- [ ] Load fonts via <link> in src/routes/__root.tsx head (no remote @import in CSS)
- [ ] Base styles: headings scale, body rhythm, sub/superscript styling for formulas, table styles

### 1.3 App shell
- [ ] Root layout: persistent sidebar (curriculum nav) + content column + top bar with site title
- [ ] Mobile: collapsible drawer nav
- [ ] <Toaster /> (sonner) mounted once in __root.tsx

### 1.4 Curriculum registry (src/lib/curriculum.ts)
- [ ] Types: Track, Module, Lesson (id, slug, title, track, order, summary)
- [ ] Static registry of all 70 lessons from CURRICULUM.md
- [ ] Helpers: getTrack, getLesson, getPrevNext, lessonsByTrack

### 1.5 Routes & navigation
- [ ] / (index): learning-path overview — track cards, lesson counts, visual path map
- [ ] /tracks/$trackId: track page with ordered lesson list and descriptions
- [ ] /lesson/$lessonId: lesson page shell rendering registered lesson content
- [ ] head() with unique title/description/og tags on every route
- [ ] 404 handling for unknown slugs

## Phase 2 — Reusable visual components

### 2.1 Lesson primitives
- [ ] LessonLayout (title block, concept statement, sections)
- [ ] H2/H3 section headings with anchor styling
- [ ] P / Formula (styled chemical/equation text with sub/sup)
- [ ] Callout (info), Pitfall (misconception box), KeyTakeaways (summary card)
- [ ] WorkedExample (stepped solution block)
- [ ] StepPanels (step-by-step visual breakdown with numbered captions)
- [ ] DataTable (comparison/trend tables)

### 2.2 Core chemistry visualizations (SVG-based)
- [ ] AtomViz: nucleus + shells, labelled
- [ ] OrbitalViz: s, p, d, f orbital shapes with nodes labelled
- [ ] PeriodicTable: full table, color-coded blocks, highlight-by-property mode
- [ ] MoleculeViz: 2D skeletal/structural formulas with atom labels and bond orders
- [ ] MechanismViz: stepper showing curved-arrow pushing, per-step captions
- [ ] EnergyDiagram: reaction coordinate (labels: Ea, ΔH, intermediates, TS)
- [ ] MODiagram: orbital energy-level diagrams with electron filling
- [ ] ChartViz: trend charts (atomic radius, IE, electronegativity across period/group)
- [ ] CrystalLattice: unit cells (SC, BCC, FCC), packing diagrams
- [ ] SpectrumViz: annotated IR / NMR / mass spectra
- [ ] TitrationCurve / PhaseDiagram / EllinghamDiagram (specialized plots)

### 2.3 Component docs
- [ ] Props documented per component; sample usage in a hidden /dev/viz route for QA





----------------




# Motion Graphics

- **Remotion (React/TypeScript):** you build the animation as React components and it renders to MP4. This is the best fit if you want product-style motion graphics like animated stats, charts, kinetic text, or logo reveals. It would also fit this repo's web stack.
- **Lottie / SVG / CSS animations:** lightweight animations that play inside the app itself, such as loaders, onboarding, or celebration effects.
- **Manim (Python):** good for explainer-style animations with diagrams, data and math.
- **ffmpeg pipelines:** putting together image sequences, overlays and transitions.
- **Still frames:** I can generate images for storyboards or key frames, but not the moving video itself.

**One constraint in this project:** your rules say nothing builds locally, so rendering would run in a GitHub Actions job. That job would render the video and upload the MP4 as a build artifact you can download. I wouldn't be able to preview the result myself until CI produces it.

**What I'd need from you:**
1. What the video is for (an in-app animation, a promo or demo clip, a social post, data storytelling).
2. Length, resolution and aspect ratio (for example 15s at 1080×1920 vertical).
3. The content and style: text, data, brand colors, references you like.

If this is meant to be part of the tracker app, it would go through the normal process: an architect plan and a designer plan first, then implementation and a CI render.


What format and length?

30s landscape 1920×1080 (website / YouTube) - 30-second, 1920×1080, graphics-only Remotion ad as a side slice, rendered in CI
(1920×1080, 30 fps) and GitHub Actions rendered it to an MP4




--------


Free licence: individuals, for-profit companies with up to 3 employees, non-profits, and evaluation. Commercial use is allowed under it, so a solo developer or a team of up to three can monetize freely.

Two more things affect whether you can monetize the video:

Fonts: Inter and JetBrains Mono are under the SIL Open Font License, which allows commercial use.
Other content: the video has no stock footage or music, so there are no third-party rights to clear.










Kokoro: free, open source, generated in Cl with no API key (Recommended)

ElevenLabs: best quality, needs a paid plan and an API key added as a GitHub secret

OpenAI TTS: very good, cheap, needs an API key added as a GitHub secret

I'll record my own voice and give you the files








## Background music

- Voice only
- A quiet synth pad generated in code, so there are no licensing issues
- I'll supply a royalty-free track I have the rights to



## The script 

- Use the draft lines above
- Have the designer write and time the script
- I'll write it myself
