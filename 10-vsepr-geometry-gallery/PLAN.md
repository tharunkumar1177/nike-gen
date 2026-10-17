# VSEPR Geometry Gallery

Chemistry Foundations, Lesson 10.

## Scope

- Audience: first-year university general chemistry
- Length: about 4.5 minutes (4–5 min window)
- Format: 1920×1080 landscape, 30 fps, H.264 MP4
- Narration: Kokoro TTS generated in CI, with a quiet synth pad generated in code (softened: lower chord, quieter level)
- Pacing: gap between narrated topics 3–8 s
- Framework: Remotion (React/TypeScript) with `@remotion/three` (three.js). The hero visuals are 3D ball-and-stick molecules and lone-pair lobes that rotate to reveal bond angles, so three.js renders the geometry while Remotion handles narration sync, kinetic text, tables, and 2D panels.
- Coverage: full gallery, steric numbers 2–6 including every lone-pair variant (linear, trigonal planar, bent, tetrahedral, trigonal pyramidal, trigonal bipyramidal, seesaw, T-shaped, octahedral, square pyramidal, square planar).
- Each lesson includes: concept statement, hero diagram, step panels, ≥1 worked example, pitfalls box, key-takeaways card.
- Deliverables: `out/vsepr-geometry-gallery.mp4` and key frames in `out/stills/`

## Brief

Concept: electron domains around a central atom spread out to minimise repulsion. The number of domains (steric number) fixes the electron-domain geometry; which positions hold atoms rather than lone pairs fixes the molecular geometry.

### Definitions (sourced)

- Electron domain: a region of high electron density around the central atom. A lone pair, a single bond, a double bond, and a triple bond each count as one domain. Steric number (SN) = bonded atoms + lone pairs on the central atom. [OpenStax 7.6](https://openstax.org/books/chemistry-2e/pages/7-6-molecular-structure-and-polarity)
- Electron-domain geometry is the arrangement of all domains; molecular geometry describes only the positions of the atoms. [OpenStax 7.6]
- AXₘEₙ notation: A = central atom, X = bonded atom (m of them), E = lone pair (n of them). [LibreTexts (Tro) 10.2](https://chem.libretexts.org/Bookshelves/General_Chemistry/Map%3A_A_Molecular_Approach_(Tro)/10%3A_Chemical_Bonding_II-_Valance_Bond_Theory_and_Molecular_Orbital_Theory/10.02%3A_VSEPR_Theory_-_The_Five_Basic_Shapes)
- Repulsion order: lone pair–lone pair > lone pair–bonding pair > bonding pair–bonding pair. Lone pairs occupy more space than bonding pairs, so they compress bond angles below the ideal values. [OpenStax 7.6]
- SN 5: lone pairs go in equatorial positions, where each meets only two domains at 90° (an axial position meets three). SN 6: two lone pairs sit trans (180° apart), avoiding a 90° lone pair–lone pair repulsion; with one lone pair all six positions are equivalent. [OpenStax 7.6]

### Geometry table

Sources: [OpenStax 7.6]; [LibreTexts ETSU 3.2](https://chem.libretexts.org/Courses/East_Tennessee_State_University/CHEM_4110%3A_Advanced_Inorganic_Chemistry/03%3A_Simple_Bonding_Theories/3.02%3A_The_Shapes_of_Molecules_(VSEPR_Theory)_and_Orbital_Hybridization).

| SN | AXₘEₙ | Electron geometry | Molecular geometry | Ideal angle | Example | Measured |
| --- | --- | --- | --- | --- | --- | --- |
| 2 | AX₂ | linear | linear | 180° | CO₂ | 180° |
| 3 | AX₃ | trigonal planar | trigonal planar | 120° | BF₃ | 120° |
| 3 | AX₂E | trigonal planar | bent | <120° | SO₂ | 119° |
| 4 | AX₄ | tetrahedral | tetrahedral | 109.5° | CH₄ | 109.5° |
| 4 | AX₃E | tetrahedral | trigonal pyramidal | <109.5° | NH₃ | 107° |
| 4 | AX₂E₂ | tetrahedral | bent | <109.5° | H₂O | 104.5° |
| 5 | AX₅ | trigonal bipyramidal | trigonal bipyramidal | 90°, 120° | PCl₅ | 90°, 120° |
| 5 | AX₄E | trigonal bipyramidal | seesaw | <90°, <120° | SF₄ | 173.1° (axial F–S–F), 101.6° (equatorial) |
| 5 | AX₃E₂ | trigonal bipyramidal | T-shaped | <90° | ClF₃ | 87.5° |
| 5 | AX₂E₃ | trigonal bipyramidal | linear | 180° | XeF₂ (also I₃⁻) | 180° |
| 6 | AX₆ | octahedral | octahedral | 90° | SF₆ | 90° |
| 6 | AX₅E | octahedral | square pyramidal | <90° | BrF₅ | 84.8° |
| 6 | AX₄E₂ | octahedral | square planar | 90° | XeF₄ | 90° |

Source variance: NH₃ is also cited as 107.3° and SO₂ as 119.5°; the video uses the rounded values above (107°, 119°).

### Procedure (step panels)

1. Draw the Lewis structure. 2. Count electron domains on the central atom (SN). 3. Pick the electron geometry from SN. 4. Place lone pairs where they have the most room (equatorial for SN 5, trans for SN 6). 5. Name the molecular geometry from the atom positions only. 6. Expect angles smaller than ideal next to lone pairs. [OpenStax 7.6]

### Worked examples

- SF₄: 4 bonds + 1 lone pair → SN 5, trigonal bipyramidal; lone pair equatorial (two 90° neighbours instead of three) → seesaw; angles squeezed to 173.1° and 101.6°.
- XeF₄: 4 bonds + 2 lone pairs → SN 6, octahedral; lone pairs trans → square planar, F–Xe–F 90°.

### Pitfalls

- Counting a double or triple bond as more than one domain (CO₂ is SN 2, linear).
- Naming the electron geometry instead of the molecular geometry (H₂O is bent, not tetrahedral), or ignoring lone pairs and predicting H₂O linear.
- Putting SN 5 lone pairs axial because the position "looks" more open.

### Teaching order

1. Concept and hero: domains repel; SN; repulsion order. 2. Six-step procedure. 3. SN 2–4 gallery with angle compression (CO₂, BF₃, SO₂, CH₄, NH₃, H₂O). 4. SN 5 family (PCl₅; worked example SF₄; ClF₃; XeF₂). 5. SN 6 family (SF₆; BrF₅; worked example XeF₄). 6. Pitfalls box, then key takeaways.

## Design plan

### Visual style

- 1920×1080, 30 fps, 8100 frames (270 s). Kokoro `af_heart` narration plus code-generated pad. 30-frame crossfades; safe margin 120 px.
- Background `#FFFFFF`; text `#1C1C1E`.
- Central atom `#424242`; ligands: F, Cl, Br `#4CAF50`; O `#E53935`; H `#B0BEC5`; other `#1E88E5`. Every atom carries its element symbol, so colour is never the only cue.
- Bonds `#9E9E9E`; lone pairs `#FFC107` translucent teardrop lobes; domain frame `#E0E0E0` wireframe; angle arcs and labels `#00897B`; highlight `#1E88E5`; pitfall accent `#D81B60`.
- Type: Roboto. Title 96 px / 700, subtitle 64 px, body 48 px / 400, labels 32 px / 500.
- Motion: molecules rotate 0.2°/frame about the vertical axis; cards and labels spring or ease in.

### Storyboard and narration

| Scene | Frames | Narration window | Words | Speech end (12 f/word) | Gap |
| --- | --- | --- | --- | --- | --- |
| 1 `concept-hero` | 0–1300 | 60–1200 | 89 | 1128 | 192 |
| 2 `procedure-steps` | 1300–2200 | 1320–2130 | 62 | 2064 | 186 |
| 3 `sn-2-4-gallery` | 2200–3950 | 2250–3850 | 125 | 3750 | 210 |
| 4 `sn-5-family` | 3950–5500 | 3980–5400 | 114 | 5348 | 172 |
| 5 `sn-6-family` | 5500–6750 | 5520–6650 | 88 | 6576 | 204 |
| 6 `pitfalls` | 6750–7750 | 6780–7650 | 67 | 7584 | 166 |
| 7 `closing-card` | 7750–8100 | silent | | | |

Gaps are re-checked against measured Kokoro clip lengths after the first CI run.

1. `concept-hero`. Hero `Molecule3D` whose domains push apart inside a `DomainFrame3D`; labels "Steric number = bonded atoms + lone pairs" and the repulsion order.
   "An electron domain is a region of high electron density around the central atom. These domains spread out to minimise repulsion. A lone pair, single bond, double bond, or triple bond each count as one domain. The steric number is the sum of bonded atoms and lone pairs. This fixes the electron domain geometry. Molecular geometry describes only the positions of the atoms. Lone pairs occupy more space, so the repulsion order is lone pair lone pair, then lone pair bonding pair, then bonding pair bonding pair."
2. `procedure-steps`. `StepList` 1–6 with a `Lewis2D` beside step 1.
   "To find the shape, follow six steps. First, draw the Lewis structure. Second, count electron domains on the central atom to find the steric number. Third, pick the electron geometry. Fourth, place lone pairs where they have the most room. Fifth, name the molecular geometry from the atom positions only. Sixth, expect angles smaller than ideal next to lone pairs."
3. `sn-2-4-gallery`. CO₂, BF₃, SO₂, CH₄, NH₃, H₂O in turn, each with frame and angle arc, then shrinking into a thumbnail strip.
   "Steric numbers two through four give linear, trigonal planar, and tetrahedral electron geometries. We use A X m E n notation, where A is the central atom, X is a bonded atom, and E is a lone pair. C O two is A X two, linear at one hundred eighty degrees. B F three is A X three, trigonal planar at one hundred twenty degrees. S O two is A X two E, bent at one hundred nineteen degrees. C H four is A X four, tetrahedral at one hundred nine point five degrees. N H three is A X three E, trigonal pyramidal at one hundred seven degrees. H two O is A X two E two, bent at one hundred four point five degrees."
4. `sn-5-family`. PCl₅; worked example SF₄ (Lewis crossfades to 3D, equatorial lone pair, two arcs); ClF₃; XeF₂; thumbnail strip.
   "Steric number five is trigonal bipyramidal. Lone pairs go in equatorial positions, where each meets only two domains at ninety degrees. P C L five is A X five, trigonal bipyramidal. For a worked example, S F four has four bonds and one lone pair, giving steric number five. The lone pair is equatorial, making an A X four E seesaw shape with angles squeezed to one hundred seventy three point one and one hundred one point six degrees. C L F three is A X three E two, a T shape at eighty seven point five degrees. X E F two is A X two E three, linear at one hundred eighty degrees."
5. `sn-6-family`. SF₆; BrF₅; worked example XeF₄ (Lewis crossfades to 3D, trans lone pairs, 90° arc); thumbnail strip.
   "Steric number six is octahedral. All six positions are equivalent. S F six is A X six, octahedral with ninety degree angles. B R F five is A X five E, square pyramidal at eighty four point eight degrees. For our next worked example, X E F four has four bonds and two lone pairs. The two lone pairs sit trans, one hundred eighty degrees apart, to avoid a ninety degree repulsion. This leaves an A X four E two square planar geometry with exactly ninety degree bond angles."
6. `pitfalls`. Pitfalls box: CO₂ Lewis (one domain per double bond), H₂O 3D (bent, not tetrahedral or linear), SN 5 molecule with an axial lone pair crossed out in pink.
   "Watch out for common pitfalls. Do not count a double or triple bond as more than one domain. C O two is steric number two, linear. Do not name the electron geometry instead of the molecular geometry, or ignore lone pairs and predict H two O is linear. Finally, do not put steric number five lone pairs in axial positions just because they look more open."
7. `closing-card`. Silent "Key Takeaways": "Electron domains spread out to minimise repulsion." / "Steric number = bonded atoms + lone pairs." / "Lone pairs compress bond angles." / "SN 5 lone pairs go equatorial; SN 6 lone pairs go trans."

### Stills

Frames 650, 1750, 3000, 4700, 6100, 7200, 7900.

### Rendering primitives

Positions are screen pixels (origin top-left); frames are scene-local.

- `Molecule3D { cls, central, ligands, cx, cy, size, rotX, rotY, rotZ, opacity, showLonePairs, morphFrom, morphProgress, highlight }`: ball-and-stick, orthographic camera; `size` is the on-screen diameter in px of the sphere through the domain tips. Each atom shows its element symbol. Lone pairs are translucent amber teardrops.
- Domain conventions (molecule frame, before rotation; y is screen-up, x screen-right, z toward the viewer):
  - SN 2: ±x. SN 3: in the xy plane, one domain at +y. SN 4: one domain at +y, three below.
  - SN 5: axial ±y, equatorial in the xz plane (one at +z).
  - SN 6: ±x, ±y, ±z.
  - Lone pairs: AX₂E puts E at +y. AX₃E puts E at +y. AX₂E₂ puts both E on the upper pair of tetrahedral positions. SN 5 lone pairs take equatorial slots. AX₅E puts E at −y. AX₄E₂ puts E at ±y.
- Default view: 15° elevation (rotX 15) and rotY 0; `rotY` may be animated.
- `DomainFrame3D`: translucent wireframe of the electron-domain polyhedron, attached to a `Molecule3D`.
- `AngleArc3D { a, b, label }`: arc between domains a and b with a degree label.
- `Lewis2D { formula }`: flat Lewis structure with element symbols, bond lines, and lone-pair dots.
- `Label`, `Arrow`, `Card`, `Callout`, `StepList`, `ThumbStrip` (row of small `Molecule3D` with formula and shape name): Roboto text and SVG primitives, spring or ease in.

### Frame-by-frame

The `designer` delivered four sequences (scenes 1–2, 3, 4, 5–7). Events are anchored to narration phrases through `cue()`; exact values live in `src/scenes/*`. Summary:

- Scene 1: hero AX₃E (A/X) at (960, 580) spreads from clumped to tetrahedral at "spread out to minimise repulsion", frame fades in, lone pair grows 1.3×. Four domain fragments (lone pair, single, double, triple) at x 384/768/1152/1536, each tagged "1 domain". Steric-number card. NH₃ electron geometry (frame + lone pair) vs molecular geometry (atoms only) side by side. H₂O with pulsing lone pairs beside the repulsion order list.
- Scene 2: six-step list at x 880, y 300–800; SF₄ Lewis → "4 bonds + 1 lone pair = SN 5" → AX₅ frame → lone pair takes an equatorial slot → "seesaw" → 173.1° and 101.6° arcs.
- Scenes 3–5 share one gallery layout: hero molecule (600, 420, 560 px), info card (1350, 420), thumbnail strip at y 790 with formula and shape name below. Each hero rotates so its labelled angle lies flat on screen, eases from ideal to measured angle (grey ideal ghost arc where they differ), then shrinks into the strip.
- Scene 4: PCl₅ with axial slot and its three 90° neighbours highlighted pink, then an equatorial slot and its two highlighted blue; SF₄ worked example (Lewis + count card → 3D seesaw → 173.1° in profile, 101.6° looking down the axis); ClF₃ 87.5°; XeF₂ 180°.
- Scene 5: SF₆ (all six positions tinted at "equivalent"), BrF₅ 84.8°, XeF₄ worked example (Lewis + count card → trans lone pairs with a 180° arc → turns to face the square plane → 90°).
- Scene 6: pink-accented pitfalls box with three rows: CO₂ Lewis with "1 domain" tags; H₂O labelled bent with "tetrahedral" and "linear" struck through; SN 5 with an axial lone pair crossed out beside the correct equatorial one.
- Scene 7: Key Takeaways card, then all 13 shapes as a spinning thumbnail strip with formulas.

Implementation deviations (geometry and legibility only, no content change):

- Scene 1 uses generic A–X fragments for the four domain types; the plan's HCN is not in the brief.
- Angle-facing poses are computed from the domain geometry (`facePose`) instead of the plan's Euler values, several of which put the angle edge-on in this axis convention.
- Scenes 4–5 use scene 3's gallery layout; the plan's centred hero and card overlapped the thumbnail strip.
- Amber and light-grey text use darker tints (`#8D6E00`, `#616161`), and the green "X" in AXₘEₙ uses `#2E7D32`, for contrast on white. The pitfall check mark is teal for the same reason.
- Step-list text is 42 px and thumbnail shape names are 28 px so they fit their columns.

## Status

- [x] Scope confirmed
- [x] Brief
- [x] Design plan
- [x] Build
- [ ] CI green, stills reviewed
- [ ] Merged
