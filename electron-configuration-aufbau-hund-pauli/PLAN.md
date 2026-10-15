# Electron Configuration: Aufbau, Hund, Pauli

Chemistry Foundations, Lesson 4.

## Scope

- Audience: first-year university general chemistry
- Length: about 3 minutes
- Format: 1920×1080 landscape, 30 fps, H.264 MP4
- Narration: Kokoro TTS generated in CI, with a quiet synth pad generated in code
- Framework: Remotion (React/TypeScript). The lesson is a narrated explainer built from animated orbital-box diagrams, an energy-ladder filling sequence, and kinetic configuration notation (1s² 2s² 2p⁶ …), which suits Remotion's React-driven diagram and text animation.
- Cr/Cu exceptions (4s¹3d⁵, 4s¹3d¹⁰) appear briefly as a pitfalls note, not a full scene.
- Deliverables: `out/electron-configuration-aufbau-hund-pauli.mp4` and key frames in `out/stills/`

## Brief

Concept: electrons occupy orbitals by three rules. Pauli limits each orbital to two electrons of opposite spin, Aufbau fills lower-energy subshells first, and Hund spreads electrons singly with parallel spins across equal-energy orbitals before pairing. The result is written as an electron configuration.

### Definitions (sourced)

- Quantum numbers: n (shell), l (subshell), mₗ (orbital), mₛ (spin, +½ or −½). [OpenStax 6.3](https://openstax.org/books/chemistry-2e/pages/6-3-development-of-quantum-theory)
- Pauli exclusion principle: no two electrons in an atom share all four quantum numbers. Electrons in the same orbital share n, l and mₗ, so they must differ in mₛ: at most two per orbital, with opposite spins. [OpenStax 6.3]
- Spin: an intrinsic quantum property with two measured outcomes (Stern–Gerlach), mₛ = +½ or −½; not a literal spinning ball. [OpenStax 6.3]
- Aufbau principle: electrons fill lower-energy orbitals before higher-energy ones; the n + l (Madelung) diagonal order is the usual guide. [OpenStax 6.4](https://openstax.org/books/chemistry-2e/pages/6-4-electronic-structure-of-atoms-electron-configurations)
- Hund's rule: degenerate orbitals are singly occupied with parallel spins before any pairing. [OpenStax 6.4]
- Electron configuration and noble-gas shorthand (core replaced by the preceding noble gas, e.g. [Ar]). [OpenStax 6.4]

### Values

| Quantity | Value | Source |
| --- | --- | --- |
| Subshell capacities | s 2, p 6, d 10, f 14 | OpenStax 6.4 |
| Filling order (to 4p) | 1s 2s 2p 3s 3p 4s 3d 4p | OpenStax 6.4 |
| C | [He] 2s² 2p² | [NIST](https://physics.nist.gov/cgi-bin/Elements/elInfo.pl?element=6) |
| N | [He] 2s² 2p³ | [NIST](https://physics.nist.gov/cgi-bin/Elements/elInfo.pl?element=7) |
| O | 1s² 2s² 2p⁴ | [NIST](https://physics.nist.gov/cgi-bin/Elements/elInfo.pl?element=8) |
| Fe | 1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁶ 4s² = [Ar] 3d⁶ 4s² | [NIST](https://physics.nist.gov/cgi-bin/Elements/elInfo.pl?element=26) |
| Fe²⁺ | [Ar] 3d⁶ | [NIST ASD](https://physics.nist.gov/PhysRefData/ASD/ionEnergy.html) |
| Cr | [Ar] 3d⁵ 4s¹ | [NIST](https://physics.nist.gov/cgi-bin/Elements/elInfo.pl?element=24) |
| Cu | [Ar] 3d¹⁰ 4s¹ | [NIST](https://physics.nist.gov/cgi-bin/Elements/elInfo.pl?element=29) |

### Misconceptions to correct

- The diagonal rule is a guide, not a law: it predicts most ground states but has exceptions, and 4s/3d energies shift with nuclear charge. [Vanquickenborne et al., J. Chem. Educ. 1994, 71, 469](https://pubs.acs.org/doi/10.1021/ed071p469); [Scerri, J. Chem. Educ. 1989, 66, 481](https://pubs.acs.org/doi/10.1021/ed066p481)
- "Last in, first out" for ions is wrong: in transition-metal ions 4s lies above 3d, so 4s electrons leave first (Fe²⁺ = [Ar] 3d⁶). [Vanquickenborne 1994]
- Pauli vs Hund: Pauli is a hard limit (↑↑ in one box is forbidden); Hund is an energy preference (↑↓ _ _ for carbon 2p is allowed but higher energy, an excited state).
- Spin "up/down" is not literal rotation or a fixed direction. [OpenStax 6.3]
- Cr/Cu are not "magic half-filled stability"; the observed configuration is the one with the lowest total energy. [Cann, J. Chem. Educ. 2000, 77, 1056](https://pubs.acs.org/doi/10.1021/ed077p1056)
- Written order (NIST n-order: 3d before 4s) differs from filling order.

### Decisions

- Diagonal mnemonic to 4p, labelled as a guide that works for most elements (no exception count on screen).
- Orbital boxes for C, N, O show Hund's rule; one ↑↑ box marked "Forbidden" (Pauli); carbon ↑↓ _ _ marked "Higher energy" (Hund).
- Full notation for O, then Fe full form collapsing to [Ar] 3d⁶ 4s²; written in NIST n-order with a note that 4s fills before 3d.
- Pitfalls note: Cr and Cu exceptions, and Fe → Fe²⁺ losing 4s first.
- Cr/Cu phrasing (user decision; sources disagree on the mechanism): state only that these are the measured lowest-energy configurations and that "half-filled stability" is a simplification. No mechanism is narrated.

### Teaching order

1. Orbitals, capacities, spin, Pauli (with ↑↑ forbidden).
2. Aufbau and the diagonal filling order to 4p.
3. Hund's rule: C, N, O orbital boxes; ↑↓ _ _ is higher energy.
4. Notation: O full; Fe full then [Ar] shorthand; written vs filling order.
5. Pitfalls: Cr, Cu; Fe²⁺ loses 4s first.
6. Key takeaways card.

## Design plan

### Visual style

- 1920×1080, 30 fps, 5400 frames (180 s). Kokoro `af_heart` narration plus code-generated pad.
- Background `#FFFFFF`; text `#1C1C1E`; orbital boxes `#E5E9F0` (stroke `#4C566A`).
- Subshell colours (fill / text or stroke): s `#88C0D0` / `#2B7992`; p `#B48EAD` / `#7C5375`; d `#A3BE8C` / `#4A7A40`.
- Spin arrows `#4C566A`; forbidden `#D32F2F`; higher energy `#D08770`.
- Type: Roboto. Title 96 px / 700, subtitle 64 px, body 48 px / 400, labels 32 px / 500.
- Safe margin 120 px. 30-frame crossfade between scenes.

### Storyboard and narration

| Scene | Frames | Narration window |
| --- | --- | --- |
| 1 `orbitals-pauli` | 0–900 | 30–770 |
| 2 `aufbau-diagonal` | 900–1750 | 930–1610 |
| 3 `hunds-rule` | 1750–2700 | 1780–2530 |
| 4 `notation-order` | 2700–3600 | 2730–3370 |
| 5 `shorthand-ions` | 3600–4500 | 3630–4260 |
| 6 `chromium-copper` | 4500–5100 | 4530–5030 |
| 7 `closing-card` | 5100–5400 | silent |

1. Title "Electron Configuration" / "Aufbau, Hund & Pauli". Orbital boxes for s, p, d in subshell colours, labels "s: 2", "p: 6", "d: 10". One box zooms in; ↑ then ↓ appear. A third box shows ↑↑ with red "Forbidden". Tag "Spin: quantum property, not literal rotation".
   "Electrons occupy subshells. An s subshell holds two, p holds six, and d holds ten. Electrons have a quantum property called spin, which isn't literal rotation. The Pauli exclusion principle limits each orbital to two electrons with opposite spins. Two up spins in one box is strictly forbidden."
2. Diagonal filling diagram: rows 1s; 2s 2p; 3s 3p 3d; 4s 4p. Diagonal arrows animate through 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p. Label "Diagonal rule (guide with exceptions)".
   "The Aufbau principle fills lower energy orbitals first. The diagonal rule is a helpful guide, though it has exceptions. Following the arrows, we fill one s, two s, two p, three s, three p, four s, three d, and then four p."
3. Three 2p boxes. Carbon (↑)(↑)( ); nitrogen (↑)(↑)(↑); oxygen (↑↓)(↑)(↑). Below carbon, (↑↓)( )( ) with amber "Higher energy".
   "Hund's rule applies to equal energy orbitals. For carbon, nitrogen, and oxygen, we place one electron in each box with parallel spins before pairing. Putting two electrons in the first box while leaving others empty is allowed by Pauli, but creates a higher energy state."
4. Kinetic text "O: 1s² 2s² 2p⁴", then "Fe: 1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁶ 4s²". 3d and 4s swap places to contrast written n-order with filling order; label "4s fills before 3d".
   "We write this as an electron configuration. For oxygen, it is one s two, two s two, two p four. For iron, we continue filling up to three d six. Notice the written configuration groups subshells by shell number, even though four s fills before three d."
5. Iron's core "1s² 2s² 2p⁶ 3s² 3p⁶" collapses into "[Ar]": "Fe: [Ar] 3d⁶ 4s²", then "Fe²⁺: [Ar] 3d⁶" as 4s² fades; label "4s lies above 3d in ions".
   "We often use noble gas shorthand, replacing the inner core with argon. A common pitfall is assuming 'last in, first out' for ions. In transition metal ions, four s lies above three d, so iron two plus loses the four s electrons first."
6. "Cr: [Ar] 3d⁵ 4s¹" and "Cu: [Ar] 3d¹⁰ 4s¹" with 4s¹ in the accent colour; label "Lowest total energy".
   "Chromium and copper have measured ground states of argon core, three d five, four s one, and argon core, three d ten, four s one. These are simply their lowest total energy configurations; half-filled stability is a simplification."
7. Card "Key Takeaways": "Pauli: max two electrons per orbital, opposite spins." / "Aufbau: fill lower-energy orbitals first." / "Hund: fill equal-energy orbitals singly before pairing." / "Notation: written by shell number, not filling order."

### Stills

Frames 450, 1350, 2250, 3150, 4050, 4800, 5250.

### Frame-by-frame

Delivered by `designer` in three sequences (scenes 1–2, 3–4, 5–7); exact coordinates live in `src/scenes/*`. Summary:

- Shared geometry: orbital box 120×120, radius 12, 3 px stroke in subshell colour, boxes touch; spin harpoons 6 px `#4C566A`, 80 px long, up at centre −22 (barb left), down at centre +22 (barb right), 12-frame drop-in from 20 px below.
- Scene 1: title/subtitle top-left; s/p/d rows at y 340/500/660 from x 220, springing in on "s / p / d holds"; Pauli boxes (150 px) at x 1000 (↑↓) and 1350 (↑↑, "Forbidden"); spin tag at (1250, 700).
- Scene 2: labels on a 150 px grid (s x 810, p 960, d 1110; rows y 250–700) over white discs; five 45° arrows draw so they pass each label as it is spoken; passed labels turn their subshell colour with a pulse.
- Scene 3: rows C (300), C violation (460), N (620), O (780); element labels right-aligned at x 740, "2p" at 770, boxes from x 840; "Higher energy" at x 1230.
- Scene 4: O row y 440, Fe row y 640 at a 118 px term pitch; 3d⁶ and 4s² swap along a 40 px arc on "even though"; label "4s fills before 3d".
- Scene 5: centred flex row at y 300; core terms collapse into [Ar]; struck "Last in, first out" pitfall at y 180; 3d/4s boxes at y 390; 4s² and its box leave as Fe → Fe²⁺ and the 3d boxes recentre.
- Scene 6: Cr and Cu rows at y 200/550 with 3d/4s boxes beneath; "Lowest total energy" at y 455; pitfall note at y 880.
- Closing card: 1600×800 at (160, 140), springs up; four bullets staggered 20 frames.

Implementation deviations (layout fixes, no content change):

- Animation beats are keyed to narrated phrases (`src/cues.ts`, even pace per scene) instead of fixed frames, so re-syncing to measured narration is one number per scene.
- Scene 1 boxes use the shared 120 px geometry (designer's scene 1–2 plan had 100 px); title and subtitle moved down to y 180/270 to respect the safe margin.
- Scene 2 title moved to y 160 (safe margin); arrows have arrowheads; label highlight added (requested in the delegation, missing from the plan).
- Scene 3 violation row is labelled "Carbon" in the higher-energy text colour so viewers know which element it is.
- Scene 5 restores the storyboard label "4s lies above 3d in ions" (y 720), omitted from the frame plan.
- Scene 6 restores the storyboard label "Lowest total energy"; the 4s¹ accent is an s-colour highlight chip, not `#D32F2F`, which means "forbidden" elsewhere.
- Closing card widened from 1400 to 1600 px so the longest takeaway fits on one line.
- After the first render: cues re-synced to measured Kokoro durations (scenes 1–6: 20.70, 15.68, 18.30, 17.77, 17.15, 16.05 s; every line ends before its limit, scene 6 by 18 frames). Diagonal grid moved down 50 px (rows y 300–750) so the 1s arrow clears the title; harpoon barbs lengthened (16×22 px) so arrows don't read as "1"; closing card trimmed to 620 px tall at y 230 to remove dead space.

## Status

- [x] Scope confirmed
- [x] Brief
- [x] Design plan
- [x] Build
- [ ] CI green, stills reviewed
- [ ] Recorded on main
