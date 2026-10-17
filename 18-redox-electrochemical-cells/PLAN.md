# Redox & Electrochemical Cells

Chemistry Foundations, Lesson 18.

## Scope

- Audience: first-year university general chemistry
- Length: about 3–5 minutes
- Format: 1920×1080 landscape, 30 fps, H.264 MP4
- Narration: Kokoro TTS generated in CI, with a quiet, softened synth pad (lower chord, quieter level) generated in code
- Framework: Remotion (React/TypeScript). Oxidation-state bookkeeping, half-reaction balancing, cell diagrams with electron/ion flow, a reduction-potential ladder and E°/ΔG°/Nernst relationships are diagram, graph and text animation that suits Remotion.
- Content (user decision): core — oxidation states, half-reactions and balancing, galvanic cells, standard reduction potentials, E°cell, ΔG° = −nFE°, Nernst equation; electrolysis only as a brief contrast.
- Required elements (ROADMAP): concept statement, hero diagram, step panels, at least one worked example, pitfalls box, key-takeaways card.
- Gap between topics within the video: 3 to 8 seconds.
- Typography and layout (style.md): IBM Plex Sans (Latin + Greek subsets) for all text; each scene title (bold, ~80 px) and optional subtitle top-left between two horizontal lines per `wireframe.svg` (top line on the 120 px safe margin, 32 px left inset, 16 px line-to-text padding, content starts ≥16 px below the bottom line).
- Narrative (user decision): every transition between concepts must say why the next concept is needed and how it connects to what came before. The script should spark curiosity and imagination (questions, puzzles, vivid real-world images) rather than simply define terms.
- Deliverables: `out/18-redox-electrochemical-cells.mp4` and key frames in `out/stills/`

## Brief

Concept: redox reactions transfer electrons. Separating oxidation (electron loss) and reduction (electron gain) into two half-cells forces the electrons through an external wire, where they can do work; a salt bridge keeps both halves neutral by ion flow. Standard reduction potentials rank each half-cell's pull on electrons against the standard hydrogen electrode (SHE). E°cell links to free energy (ΔG° = −nFE°) and to K, and the Nernst equation tracks the voltage falling as concentrations shift, reaching 0 V at equilibrium.

### Definitions (sourced)

- Oxidation state: the charge an atom would have if the compound were purely ionic. [OpenStax 4.2](https://openstax.org/books/chemistry-2e/pages/4-2-classifying-chemical-reactions)
- Oxidation is loss of electrons (oxidation state rises); reduction is gain (oxidation state falls). OIL RIG. The species oxidised is the reducing agent; the species reduced is the oxidising agent. [OpenStax 17.1](https://openstax.org/books/chemistry-2e/pages/17-1-review-of-redox-chemistry)
- Half-reaction method (acidic solution): balance each half separately, adding H₂O, H⁺ and e⁻, then equalise electrons. [OpenStax 17.1](https://openstax.org/books/chemistry-2e/pages/17-1-review-of-redox-chemistry)
- Galvanic (voltaic) cell: a spontaneous redox reaction occurring indirectly. Oxidation at the anode (negative terminal), reduction at the cathode (positive terminal); electrons flow through the external wire; ions flow through the salt bridge to maintain charge balance. Notation: anode | anode ion ‖ cathode ion | cathode. [OpenStax 17.2](https://openstax.org/books/chemistry-2e/pages/17-2-galvanic-cells)
- Standard reduction potential E°: relative tendency to be reduced, measured against the SHE, defined as exactly 0 V. E°cell = E°cathode − E°anode. [OpenStax 17.3](https://openstax.org/books/chemistry-2e/pages/17-3-electrode-and-cell-potentials)
- ΔG° = −nFE°cell; with ΔG° = −RT ln K this links E° to K. Nernst: E = E° − (RT/nF) ln Q = E° − (0.0592 V/n) log Q at 298 K. [OpenStax 17.4](https://openstax.org/books/chemistry-2e/pages/17-4-potential-free-energy-and-equilibrium)
- Electrolysis: an external power source drives a non-spontaneous redox reaction; oxidation is still at the anode, which is now the positive electrode. [OpenStax 17.7](https://openstax.org/books/chemistry-2e/pages/17-7-electrolysis)

### Values

| Quantity | Value | Source |
| --- | --- | --- |
| Faraday constant F | 96 485 C/mol e⁻ | OpenStax 17.3 |
| R | 8.314 J/(mol·K) | [OpenStax Appendix B](https://openstax.org/books/chemistry-2e/pages/b-essential-mathematics) |
| T | 298.15 K | OpenStax 17.4 |
| SHE E° | 0 V (exact, by definition) | OpenStax 17.3, Table 17.1 |
| Zn²⁺ + 2e⁻ → Zn, E° | −0.7618 V | OpenStax Table 17.1 = Appendix L |
| Cu²⁺ + 2e⁻ → Cu, E° | +0.34 V | OpenStax Table 17.1 = Appendix L |
| AA and D alkaline cells | both ~1.5 V | [OpenStax 17.5](https://openstax.org/books/chemistry-2e/pages/17-5-batteries-and-fuel-cells) |

### Worked example 1: oxidation state of Mn in MnO₄⁻

- Net charge −1; each O is −2, so 4 O = −8. Mn − 8 = −1 → Mn = +7.

### Worked example 2: MnO₄⁻ + Fe²⁺ in acidic solution

- Oxidation: Fe²⁺ → Fe³⁺ + e⁻
- Reduction: MnO₄⁻ → Mn²⁺; balance O: + 4H₂O; balance H: + 8H⁺; balance charge: MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O
- Oxidation × 5, add: 5Fe²⁺ + MnO₄⁻ + 8H⁺ → 5Fe³⁺ + Mn²⁺ + 4H₂O
- Charge check: +10 − 1 + 8 = +17 left; +15 + 2 = +17 right.

### Worked example 3: Daniell cell Zn | Zn²⁺ ‖ Cu²⁺ | Cu

- E°cell = +0.34 − (−0.7618) = +1.10 V (two decimals, limited by Cu)
- n = 2; ΔG° = −2 × 96 485 × 1.10 = −212 267 J/mol ≈ −212 kJ/mol
- 0.0592 V = (RT/F) ln 10 = (8.314 × 298.15 / 96 485) × 2.3026
- log K = 2 × 1.10 / 0.0592 = 37.16 → K ≈ 1.4 × 10³⁷
- Nernst, [Zn²⁺] = 0.10 M, [Cu²⁺] = 0.010 M: Q = 10; E = 1.10 − (0.0592/2) × 1 = 1.07 V

### Misconceptions to correct

- Electrons never travel through the salt bridge; ions do, preventing charge build-up.
- The anode is negative in a galvanic cell but positive in electrolysis; oxidation is always at the anode.
- E° is intensive: multiplying a half-reaction by a coefficient does not multiply E°.
- A single half-cell potential can't be measured alone; all values are relative to the SHE.
- Nernst errors: ln with 0.0592, flipping Q, or including solids in Q.

### Teaching order

1. Oxidation states, OIL RIG, oxidising and reducing agents (worked example 1).
2. Balancing by half-reactions (worked example 2).
3. Galvanic cell anatomy: anode/cathode, electron vs ion flow, notation.
4. SHE, reduction-potential table, E°cell.
5. ΔG° = −nFE° and K.
6. Nernst equation (worked example 3 completes here).
7. Electrolysis contrast.

### Curiosity hooks and transitions (sourced)

1. Hook: a clean copper wire in clear silver nitrate: the solution turns blue as Cu²⁺ forms, and silver metal deposits on the wire, yet no useful current is produced [OpenStax 17.2]. → Why next: to harness that energy we must separate electron loss from electron gain.
2. Hook: balancing is about invisible electrons that must exactly match between the halves. → Once balanced on paper, how do we physically separate the halves?
3. Hook: without a salt bridge, charge builds up and the reaction stops almost immediately, so no sustained current flows [OpenStax 17.2]. → How do we predict which metal pushes electrons and which pulls?
4. Hook: a single electrode's voltage can't be measured alone; everything is compared with a hydrogen "zero" [OpenStax 17.3]. → Voltage is an electrical push; how does it relate to chemical energy?
5. Hook: a small AA and a large D alkaline cell are both ~1.5 V: same chemistry, same E°; the bigger cell holds more reactant, so more total charge, not a stronger push per electron [OpenStax 17.5]. → Standard values assume 1 M; real cells drift as concentrations change.
6. Hook: as a cell discharges, Nernst tracks its falling voltage until it reaches 0 V at equilibrium [OpenStax 17.4]. → What if we push the dead cell backwards?
7. Hook: an external power source can force electrons the "wrong" way, driving a non-spontaneous reaction [OpenStax 17.7].

## Design plan

Narration text lives in `audio/script.json`; on-screen cues are tied to spoken phrases via `src/cues.ts`. Scenes are laid end to end: each narrated scene lasts its clip length plus a 5 s silent gap; silent ~10 s closing card. Target runtime ~3:40–4:00.

### Style

Bright textbook: white background, IBM Plex Sans (Latin + Greek). Type scale 80 (scene title, bold) / 48 (subtitle) / 40 (hero labels) / 32 (math, body). Title band per `wireframe.svg`: lines at y 120 and y 248 spanning x 120–1800 (3 px, #1C1C1E), title inset 32 px, content from y 264 within the 120 px safe margin. Motion: fade/drop-in 15–20 frames ease-out cubic; spring pops for computed numbers; 30-frame crossfades.

| Token | Fill | Text | Role |
| --- | --- | --- | --- |
| oxidation | #F59E0B | #78350F | anode, electron loss |
| reduction | #3B82F6 | #1E3A8A | cathode, electron gain |
| electrons | #A855F7 | #4C1D95 | e⁻ particles |
| cations | #10B981 | #064E3B | positive ions (salt bridge) |
| anions | #EF4444 | #7F1D1D | negative ions (salt bridge) |
| pitfall | #FEE2E2 | #B91C1C | pitfall boxes |

### Storyboard and narration

Every scene opens with why the concept is needed and how it connects to the previous one (user requirement). Trigger phrase → what appears.

1. `redox-intro` — Oxidation States / Tracking electron flow
   - "Drop a clean copper wire" → beaker of clear AgNO₃ with Cu wire; "spontaneously turns blue" → solution tints blue, Ag crystals grow; "copper is oxidized" / "silver ions are reduced" → Cu²⁺ and Ag⁺ labels; "reducing agent" / "oxidizing agent" → labels under the species; "jump directly at the wire's surface" → electron sparks on the wire surface; "track electrons using oxidation states" → beaker fades, MnO₄⁻ diagram; "oxygen is minus two" → O tags −2; "manganese must be plus seven" → Mn +7, Mn − 8 = −1.
   - Narration: Drop a clean copper wire into clear silver nitrate. The solution spontaneously turns blue as copper is oxidized to C u two plus, and silver ions are reduced to solid silver. Copper is the reducing agent, and silver ion the oxidizing agent. Because electrons jump directly at the wire's surface, none flow through a circuit. To harness this, we track electrons using oxidation states. In permanganate, oxygen is minus two. For a net minus one charge, manganese must be plus seven.
2. `balancing` — Balancing Redox / The half-reaction method
   - "If electrons are to travel" → split panels Fe²⁺ → Fe³⁺ and MnO₄⁻ → Mn²⁺; "balance oxygen with water" → + 4H₂O; "hydrogen with H plus" → + 8H⁺; "electrons to balance the charges" → + e⁻ and + 5e⁻; "multiply the iron reaction by five" → × 5 on iron, halves merge into the net equation with charge check.
   - Narration: see "Final wording for scene 2" below.
3. `galvanic-cell` (hero) — Galvanic Cells / Harnessing the flow
   - "We build a galvanic cell" → Zn/Cu cell hero diagram; "zinc in zinc ions" / "copper in copper ions" → labels; "negative anode" / "positive cathode" → anode (−) oxidation colour, cathode (+) reduction colour; "flow through an external wire" → electrons travel along the wire; "A salt bridge allows ions" → salt bridge, cations to cathode, anions to anode; "keeping both halves neutral" → pitfall "Electrons never travel through the salt bridge; only ions do."; "Standard cell notation" → Zn | Zn²⁺ ‖ Cu²⁺ | Cu.
   - Narration: We build a galvanic cell to physically separate the halves. Here, zinc in zinc ions connects to copper in copper ions. Spontaneous oxidation occurs at the negative anode, and reduction at the positive cathode. Electrons flow through an external wire to do work. A salt bridge allows ions to flow, keeping both halves neutral so current continues. Standard cell notation summarizes this: zinc, vertical line, zinc ion, double line for the salt bridge, copper ion, line, copper.
4. `reduction-potentials` — Standard Potentials / Pushing and pulling electrons
   - "why does zinc hand electrons" → question mark above the wire; "standard hydrogen electrode" → SHE half-cell reading 0.00 V; "copper pulls electrons" → Cu E° = +0.34 V; "zinc pushes" → Zn E° = −0.7618 V and pitfall "A single half-cell potential cannot be measured alone."; "total cell potential" → +0.34 − (−0.7618) = +1.10 V.
   - Narration: We now have a working cell, but why does zinc hand electrons to copper and not the reverse? We measure this pull as standard reduction potential. A single half-cell cannot be measured alone; it is compared to a standard hydrogen electrode, defined as exactly zero volts. Copper pulls electrons with a potential of plus zero point three four volts, while zinc pushes at minus zero point seven six volts. Subtracting the anode from the cathode, the total cell potential is one point one zero volts.
5. `free-energy` — Free Energy / Thermodynamics of a cell
   - "small A A and a large D" → AA and D cells both labelled 1.5 V; "E naught is intensive" → pitfall "E° is intensive; multiplying a half-reaction does not multiply E°."; "It equals minus n F" → ΔG° = −nFE°cell; "With two moles of electrons" → n = 2, F = 96 485, E° = 1.10 V; "minus two hundred and twelve" → ΔG° = −212 kJ/mol; "massive equilibrium constant" → K ≈ 1.4 × 10³⁷.
   - Narration: A small A A and a large D alkaline cell both provide one point five volts. E naught is intensive; the bigger cell simply holds more reactant. Standard free energy relates this voltage to chemical energy per mole of reaction. It equals minus n F E naught cell. With two moles of electrons, our Daniell cell yields a free energy of minus two hundred and twelve kilojoules per mole. This huge negative energy means a massive equilibrium constant, favoring the products.
6. `nernst-equation` — The Nernst Equation / Voltage away from standard conditions
   - "assume one molar" → 1 M labels on the cell; "changes its own concentrations" → 1 M labels dim; "Nernst equation tracks this" → E = E° − (0.0592 V / n) log Q; "E naught is one point one zero" → 1.10 V substituted; "If zinc" → [Zn²⁺] = 0.10 M, [Cu²⁺] = 0.010 M; "voltage drops" → Q = 10, E = 1.07 V and pitfall "Use log with 0.0592, and leave solids out of Q."
   - Narration: see "Final wording for scene 6" below.
7. `electrolysis` — Electrolysis / Forcing non-spontaneous reactions
   - "zero volts at equilibrium" → voltmeter falls to 0.00 V; "external power source" → power source replaces voltmeter, electrons reverse; "anode is the positive electrode" → anode label flips to (+), pitfall "Oxidation is always at the anode, but the anode is positive in electrolysis."
   - Narration: As a cell discharges, the Nernst equation tracks its falling voltage until it reaches exactly zero volts at equilibrium. What if we push the dead cell backwards? In electrolysis, an external power source drives electrons the wrong way, forcing a non-spontaneous reaction. Oxidation still happens at the anode, but now the anode is the positive electrode.
8. `takeaways` — Key Takeaways (silent, ~10 s)
   - OIL RIG: oxidation is loss (anode), reduction is gain (cathode).
   - Electrons flow through the wire; ions flow through the salt bridge.
   - E° is measured against the SHE and is intensive.
   - ΔG° = −nFE°; Nernst tracks the falling voltage to 0 V at equilibrium.
   - Electrolysis uses an external source to drive a non-spontaneous reaction.

Final wording for scene 2: If electrons are to travel through a circuit, both halves must trade exactly the same number. We balance them using the half-reaction method. For iron two plus and permanganate in acid, we balance oxygen with water, and hydrogen with H plus. We add electrons to balance the charges. But how do we make the electron counts match? We multiply the iron reaction by five, equalizing them before adding them together into a net equation.

Final wording for scene 6: Standard values like E naught and delta G naught assume one molar standard states. But a cell that runs changes its own concentrations, so why does a battery slowly lose voltage? The Nernst equation tracks this falling voltage as the reaction proceeds. Our E naught is one point one zero volts. Suppose zinc ions are at zero point one zero molar and copper ions at zero point zero one zero molar. Our reaction quotient Q is ten. The cell voltage drops to one point zero seven volts. (Cues: "assume one molar", "changes its own concentrations", "Nernst equation tracks this", "E naught is one point one zero", "Suppose zinc ions", "reaction quotient Q is ten", "voltage drops to one point zero seven".)

### Frame-by-frame plans

No subtitles (the wireframe band fits only the 80 px title). Title baseline y 214 at x 152. Sub/superscripts render as baseline-shifted spans at ~0.6× size.

- Scene 1: beaker x 400–700, y 400–800; clear → #DBEAFE solution; Cu wire 40 × 450 at x 530; grey Ag crystals grow on the wire; Cu²⁺ / Ag⁺ labels with reducing / oxidising agent tags (oxidation / reduction text colours); purple e⁻ sparks on the wire surface. Then MnO₄⁻: Mn r 60 at (960, 500), four O r 40 at (840/1080, 380/620), −2 tags, +7 tag, "Mn − 8 = −1" at y 800.
- Scene 2: oxidation panel x 120–920 (#FFFBEB / #F59E0B) and reduction panel x 960–1800 (#EFF6FF / #3B82F6), y 300–500, equations 40 px; terms add on cue; × 5 pop; panels fade and halves merge into the net equation at y 700 with the charge check at y 800.
- Cell geometry (scenes 3, 4, 6, 7): beakers x 200–520 / 700–1020, y 560–900, solution from y 600 (Zn²⁺ #F8FAFC, Cu²⁺ #DBEAFE); electrodes 40 × 390 from y 460 centred x 360 (Zn #9CA3AF) / 860 (Cu #B45309), Zn thins 40→24 and Cu thickens 40→56 while running; wire M 360 460 V 340 H 550 … H 860 V 460 (4 px #4B5563); meter circle (610, 340) r 60; salt bridge 40 px U-tube legs x 500 / 720 down to y 800, arc top y 430; electrons r 6 at 200 px/s, 40 px apart; cations → cathode, anions → anode at 50 px/s; Anode / Cathode titles at y 960 under the electrodes. Right column x 1180–1800 holds pitfall (580 wide, 24 padding, 32 px / 1.4, ≤3 lines), notation (y 460) and the ladder.
- Scene 3: cell fades in; labels on cue; meter shows 1.10 V on "negative anode"; electrons on "flow through an external wire"; bridge then ions; pitfall at (1180, 264); notation at (1180, 460).
- Scene 4: "?" in the meter; SHE (Pt, H₂ bubbles, H⁺ 1 M, tag "E° = 0 V (defined)") replaces Zn; with Cu the meter reads 0.34 V and the Cu mark appears on the ladder (axis x 1220, y 440–850, 0 V ≈ y 593, 245 px/V: Cu y 510, Zn y 780); Zn returns, Zn mark, pitfall at (1180, 264); bracket and "E°cell = +1.10 V" at y 645, meter 1.10 V.
- Scene 5: AA (80 × 200) and larger D cell (160 wide) with + nubs, labels "AA 1.5 V" / "D 1.5 V"; pitfall at (800, 264) width 900; math lines at x 800/880, y 450 / 520 / 590 / 680: ΔG° = −nFE°cell; = −(2)(96 485 C/mol)(1.10 V); = −212 267 J/mol ≈ −212 kJ/mol; K ≈ 1.4 × 10³⁷.
- Scene 6: cell at translate(120, 280) scale(0.6) with 1 M tags that dim, then 0.10 M / 0.010 M; math at x 950, y 350 / 430 / 510 / 590: E = E° − (0.0592 V / n) log Q; E = 1.10 V − (0.0592 V / 2) log Q; Q = [Zn²⁺]/[Cu²⁺] = 0.10 / 0.010 = 10; E = 1.10 − 0.0296 = 1.07 V; meter 1.07 V; pitfall at (950, 750).
- Scene 7: meter ticks 1.10 → 0.00 V and particles stop; meter swaps for a dark "DC power source" box; electrons and ions reverse; Anode / Cathode titles swap electrodes (Cu becomes Anode (+), Zn Cathode (−)); pitfall at (1180, 264).
- Scene 8: card x 120–1800 with five rows, each with a colour bar (oxidation, electrons, cations, reduction, anions) and 32 px text; card drops in, rows stagger 10 f.

### Build adjustments to the designer plans

- Half-cell labels use 28 px type placed in the gap between beaker wall and electrode (the designer's centred 32 px labels overlapped the electrodes); the SHE tag is split over two lines above the beaker.
- Takeaways card widened to the full safe width so the longest row fits on one line.
- Scene 1 layout moved left (beaker x 240–540, MnO₄⁻ centred at (700, 590), steps at x 1080) so the equations and agent tags fit beside the beaker.
- Scene 2 panels stay on screen above the net equation instead of fading out; step chips (O, H, charge, × 5) sit between them and the net equation.
- Scene 3 shows the salt bridge from the start, since a cell without it would not carry current; ions start moving on "A salt bridge allows ions".
- Scene 4 meter reads "?", then 0.34 V (SHE vs Cu), then 1.10 V (Zn vs Cu); the subtraction sits under the ladder at y 870 / 925.
- Scene 5 adds a caption for "Standard free energy relates" and the log K = 37.16 note.
- Scene 6 keeps the cell full size (the 0.6 scale made the labels illegible); the math column starts at x 1080.

## Status

- [x] Scope
- [x] Research
- [x] Design
- [ ] Build
- [ ] CI green
- [ ] Merged
