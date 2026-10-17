# Periodic Table Construction & Blocks

Chemistry Foundations, Lesson 5.

## Scope

- Audience: first-year university general chemistry
- Length: about 3 minutes
- Format: 1920×1080 landscape, 30 fps, H.264 MP4
- Narration: Kokoro TTS generated in CI, with a quiet synth pad generated in code
- Style: bright textbook (white background, bold colour-coded diagrams, crisp sans type)
- Framework: Remotion (React/TypeScript). The lesson is a narrated explainer built from an animated periodic-table grid that assembles and colours by block, plus kinetic configuration notation, which suits Remotion's React-driven diagram and text animation (same stack as lessons 1–4).
- Required lesson parts (roadmap): concept statement, hero diagram, step panels, at least one worked example, pitfalls box, key-takeaways card.
- Pacing (style guide): 3–8 s gap between topics within the video.
- Deliverables: `out/periodic-table-blocks.mp4` and key frames in `out/stills/`

## Brief

Concept: the modern periodic table is ordered by atomic number Z, not mass, and its layout is a map of electron configurations. Each period's length equals the capacity of the subshells filled across that row, and the table divides into s, p, d and f blocks according to the subshell being filled in Aufbau order.

### Definitions (sourced)

- Periodic law: element properties are periodic functions of atomic number Z (Moseley). [OpenStax 2.5](https://openstax.org/books/chemistry-2e/pages/2-5-the-periodic-table)
- Period: a horizontal row. Period number n is the principal quantum number of the s subshell that opens the row; the row length is the summed capacity of the subshells filled across it. [OpenStax 6.4](https://openstax.org/books/chemistry-2e/pages/6-4-electronic-structure-of-atoms-electron-configurations)
- Group: a vertical column, numbered 1–18 (IUPAC). Elements in a group share a similar valence configuration. [OpenStax 6.4]; [IUPAC](https://iupac.org/what-we-do/periodic-table-of-elements/)
- Blocks: s = groups 1–2 plus He; p = groups 13–18 except He; d = groups 3–12; f = the 14-wide inner-transition rows, drawn below the main table to keep it narrow. [OpenStax 6.4]
- Transition element: "an element whose atom has an incomplete d sub-shell, or which can give rise to cations with an incomplete d sub-shell." [IUPAC Gold Book](https://doi.org/10.1351/goldbook.T06456)

### Values

| Quantity | Value | Source |
| --- | --- | --- |
| Subshells per period (length) | 1: 1s (2); 2: 2s 2p (8); 3: 3s 3p (8); 4: 4s 3d 4p (18); 5: 5s 4d 5p (18); 6: 6s 4f 5d 6p (32); 7: 7s 5f 6d 7p (32) | OpenStax 6.4 |
| Group numbering | 1–18 | IUPAC |
| P (period 3, group 15, p-block) | [Ne] 3s² 3p³ | [NIST](https://physics.nist.gov/cgi-bin/Elements/elInfo.pl?element=15) |
| V (period 4, group 5, d-block) | [Ar] 3d³ 4s² | [NIST](https://physics.nist.gov/cgi-bin/Elements/elInfo.pl?element=23) |
| Cr (d-block, exception) | [Ar] 3d⁵ 4s¹ | [NIST](https://physics.nist.gov/cgi-bin/Elements/elInfo.pl?element=24) |
| H / He | 1s¹ / 1s² | OpenStax 6.4 |

### Misconceptions to correct

- Shell offset: in the d-block the filling subshell is (n−1)d and in the f-block (n−2)f, where n is the period number; only the s and p blocks fill shell n. [OpenStax 6.4]
- Block follows Aufbau position, not every ground-state quirk: Cr is [Ar] 3d⁵ 4s¹ but is still a d-block element in group 6. [NIST]
- Not every d-block element is a transition element: Zn, Cd and Hg (group 12) have full d¹⁰ subshells in the atom and their common ions. [IUPAC Gold Book]
- He sits in group 18 for its filled shell and noble-gas behaviour, but 1s² makes it an s-block element. H is 1s¹ in group 1 but is a nonmetal, not an alkali metal. [OpenStax 2.5]; [OpenStax 6.4]
- The table is ordered by Z, not atomic mass. [OpenStax 2.5]

### Decisions

- Group 3 = Sc, Y, Lu, Lr (user decision; sources disagree: OpenStax shows La/Ac, the older IUPAC table shows a gap). f-block = La–Yb and Ac–No, 14 wide; d-block 10 wide. [Scerri et al., Chem. Int. 2021](https://doi.org/10.1515/ci-2021-0115)
- He drawn in group 18 but coloured as s-block, with a note.
- Ordering by Z is one sentence, not a history scene.
- Ground-state exception example is Cr (already met in Lesson 4). The Pd exception ([Kr] 4d¹⁰) is kept off screen to save time.

### Teaching order

1. Ordering by Z; periods (n) and groups 1–18.
2. Building the rows: period lengths 2, 8, 8, 18, 18, 32, 32 from the subshells filled; colour the s, p, d, f blocks; f-block pulled below.
3. Special cases: H (group 1, nonmetal) and He (group 18, s-block).
4. Offsets: d = (n−1), f = (n−2); group 12 is d-block but not transition; Cr stays d-block.
5. Worked example 1: P, period 3, group 15, gives [Ne] 3s² 3p³.
6. Worked example 2: V, period 4, group 5, gives [Ar] 3d³ 4s².
7. Key takeaways card.

## Design plan

### Visual style

- 1920×1080, 30 fps, 5400 frames (180 s). Kokoro `af_heart` narration plus code-generated pad.
- Background `#FFFFFF`; text `#1C1C1E`; table cells `#E5E9F0` (stroke `#4C566A`).
- Block colours (fill / text or stroke): s `#88C0D0` / `#2B7992`; p `#B48EAD` / `#7C5375`; d `#A3BE8C` / `#4A7A40`; f `#EBCB8B` / `#9A7A3A`.
- Type: Roboto. Title 96 px / 700, subtitle 64 px, body 48 px / 400, labels 32 px / 500.
- Safe margin 120 px. 30-frame crossfade between scenes; silent gap of 3 s or more between narration lines.
- One hero periodic-table component reused across scenes; cells show element symbols only (no Z).

### Storyboard and narration

| Scene | Frames | Narration window |
| --- | --- | --- |
| 1 `ordering-groups` | 0–720 | 30–660 |
| 2 `building-blocks` | 720–1600 | 750–1540 |
| 3 `special-cases` | 1600–2350 | 1630–2290 |
| 4 `offsets-exceptions` | 2350–3320 | 2380–3260 |
| 5 `example-phosphorus` | 3320–4210 | 3350–4150 |
| 6 `example-vanadium` | 4210–5040 | 4240–4990 |
| 7 `closing-card` | 5040–5400 | silent |

Retimed after the first render: Kokoro speaks these lines at about 2.3 words/s (scene 1 measured 19.3 s), so windows were widened to measured length plus about 1.7 s, with 90 frames between windows so every silent gap stays at 3 s or more.

1. Title "Periodic Table Construction" / "Blocks & Configurations". A blank 18-column grid appears; rows labelled "Period (n)" 1–7 on the left, columns labelled "Group" 1–18 across the top.
   "The modern periodic table is ordered by atomic number, not mass. It maps electron configurations. Rows are periods, numbered by the principal quantum number of the opening s subshell. Columns are groups, numbered one to eighteen. Elements in a group share similar valence configurations."
2. The table fills row by row: period 1 (2 cells), periods 2–3 (8 each), periods 4–5 (18 each), periods 6–7 (32 each, with the 14-wide f-block drawn below, leaving Sc, Y, Lu, Lr in group 3). Then it colours by block: s (groups 1–2), p (13–18), d (3–12), f.
   "A period's length equals the capacity of subshells filled across it. Period one fills one s, giving two elements. Periods two and three fill s and p, giving eight. Periods four and five add the d block, giving eighteen. Periods six and seven add the f block, giving thirty-two. It's drawn below to keep it narrow."
3. The table dims except H and He. H in group 1 labelled "Nonmetal"; He in group 18 coloured as s-block.
   "Let's look at two special cases. Hydrogen is one s one. It sits in group one, but is a nonmetal. Helium is one s two, making it an s block element. However, it sits in group eighteen because of its filled shell and noble gas behaviour."
4. The d and f blocks highlight with labels "d-block: (n−1)" and "f-block: (n−2)". Pitfalls box: "Cr: [Ar] 3d⁵ 4s¹ — still d-block" / "Group 12 (Zn, Cd, Hg): d-block, not transition elements".
   "Notice the shell offsets. The d block fills the n minus one shell, and f fills n minus two. Only s and p fill shell n. Block assignment follows filling position. Chromium is argon core, three d five, four s one, but remains a d block element. Group twelve elements are d block, but not transition elements because their d subshells are full."
5. Step panels beside the table. Ne highlights, then a path traces period 3 through the s-block (Na, Mg) into the p-block, stopping at P (group 15). Text builds "[Ne] 3s² 3p³".
   "We read configurations directly from the table. Phosphorus is period three, group fifteen, in the p block. Start with the preceding noble gas, neon. Cross the period three s block, giving three s two. Count three spots into the p block, ending at three p three. The configuration is neon core, three s two, three p three."
6. Ar highlights, then a path traces period 4 through the s-block (K, Ca) into the d-block, stopping at V (group 5). Text builds "[Ar] 3d³ 4s²".
   "Let's try vanadium: period four, group five, in the d block. The preceding noble gas is argon. Cross the four s block, giving four s two. Count three spots into the three d block, ending at three d three. Following written order, the configuration is argon core, three d three, four s two."
7. Card "Key Takeaways": "Rows are periods (n); columns are groups (1–18)." / "Blocks (s, p, d, f) show the subshell being filled." / "Offsets: d fills (n−1), f fills (n−2)." / "Read configurations from the preceding noble gas."

### Stills

Frames 640, 1560, 2270, 3260, 4170, 5000, 5300 (each scene's completed state, before its crossfade).

### Frame-by-frame

Delivered by `designer` in sequences. Text y values are baselines; shape y values are top edges. Beats are keyed to narrated phrases (`src/cues.ts`).

Shared hero table:

- Cell 56×56, gap 4 (pitch 60), radius 4. Main grid origin (top-left of H) x 422, y 380; grid spans x 422–1498, y 380–796. Only the 90 real main-table cells are drawn (row 1: groups 1 and 18; rows 2–3: groups 1–2 and 13–18).
- f rows: origin x 602 (under group 4), y 820, pitch 60; La–Yb (row 6) and Ac–No (row 7). Marker: 4 px `#4C566A` vertical line at x 540 spanning rows 6–7 (y 680–796); dotted guides from the marker to the f rows.
- Group 3 = Sc, Y, Lu, Lr. Row 6 main: Cs Ba Lu Hf … Rn; row 7 main: Fr Ra Lr Rf … Og.
- Cell styles: empty (3 px `#4C566A` stroke, white fill); neutral (stroke, `#E5E9F0` fill); block-coloured (block fill, block text colour, no stroke); dimmed (opacity 0.3); highlighted (4 px stroke in the block text colour).
- Symbols 24 px / 500 centred. Period labels 32 px / 500 right-aligned at x 380 on row centres; group labels 32 px / 500 centred on columns at y 350.
- Scenes 5–6 transform: scale 0.85 about (422, 380), then translate x −200, 30 frames `easeInOutCubic`. The result spans x ≈ 186–1136 (labels to group 18) and y ≈ 330–853, leaving x 1200–1800 free for step panels.

Scene 1: title at (120, 160) 96/700; subtitle at (120, 250) 64/400 `#4C566A`; both fade in over 15 frames at scene start, and the 90 empty main cells stagger in over 30 frames. Caption "The table is a map of electron configurations." centred at x 960, y 880, 48/400, fades in on "atomic number". Period labels fade in on "periods"; group labels on "groups" (15 frames each).

Scene 2: row-length counters (2, 8, 8, 18, 18, 32, 32) at x 1520 on row centres, 32/500 `#4C566A`. Legend top-right at (1520, 160): four 30×30 chips with labels. Each row fills straight into its block colours: row 1 (s) on "one s"; rows 2–3 (s, p) on "s and p"; rows 4–5 (s, d, p) on "add the d block"; rows 6–7 main plus the f rows on "add the f block". The f rows start collapsed (scaleX 0) at the marker. Each legend chip appears with its block's first row. On "drawn below", the f rows expand and slide to y 820 (30 frames `easeOutCubic`) and the guides fade in.

Scene 3: on "Let's look at two special cases" everything except H and He dims to 0.3 (30 frames `easeInOutCubic`). "1s¹" slides in right of H (baseline 416) on "Hydrogen is one s one"; "1s²" slides in left of He on "Helium is one s two". On "making it an s block element" He pulses (1.15 → 1) and a dashed s-colour link draws from He to the legend's s chip. Second lines ("Nonmetal", "s-block, placed in group 18") on their phrases. Everything restores over the last 30 frames.

Scene 4: title "Offsets & Exceptions" at (120, 210). Offset labels at x 1520 (baselines 410/460/510): "s, p: shell n", "d-block: (n−1)", "f-block: (n−2)"; the d and f blocks take a 4 px block-colour ring on their phrases, cleared on "Block assignment follows filling position", when the pitfalls box appears in the empty groups 3–12 gap of rows 1–3. Cr rings on "Chromium"; the group 12 column rings on "Group twelve".

Scenes 5–6: the table takes the shift transform over scene 5's first 30 frames. Step panel at x 1200: title 48/500 at baseline 300; steps 32/400 at 380/460/540/620 (1 Locate, 2 Core, 3 s subshell, 4 p or d subshell), each on its phrase; "5. Result" and the 48/500 block-coloured result at 690/750. The target and noble-gas cells ring in their block colour; a 4 px block-colour path draws across the s cells (15 frames) and then the p or d cells (20 frames), counting electrons into each cell. Vanadium's result builds in filling order "[Ar] 4s² 3d³" and the two terms swap along a 40 px arc into "[Ar] 3d³ 4s²" on "argon core".

Scene 7: card 1600×620 at (160, 230), 3 px `#4C566A` stroke, springs up 70 px (stiffness 100, damping 14) from frame 15; title 64/500; four 48 px bullets staggered 20 frames from frame 40.

Implementation deviations (layout fixes, no content change):

- Scene 1 adds the storyboard's axis titles "Period (n)" and "Group" (omitted from the frame plan); they fade out as the table shifts in scene 5, where they would leave the screen.
- Scene 3 second lines sit above their cells (baseline 310) instead of in row 2, where they overlapped Be and B–F; the He link runs up the strip between group 18 and the legend.
- Scene 4 "s, p: shell n" appears on "Only s and p" rather than at the scene start; the pitfalls box spans the whole gap (x 546–1134, 172 tall) and the group 12 line wraps to two lines to fit.
- Scenes 5–6 counters are superscripts in each cell's top-right corner, and the path runs in the 4 px gap under the row, because counters above the cells and a path through their centres would cover neighbouring symbols. A "5. Result" label was added to match the numbered steps.
- Closing card: the fourth takeaway was shortened to fit the card width.

## Status

- [x] Scope confirmed
- [ ] Brief
- [ ] Design plan
- [ ] Build
- [ ] CI green, stills reviewed
- [ ] Recorded on main
