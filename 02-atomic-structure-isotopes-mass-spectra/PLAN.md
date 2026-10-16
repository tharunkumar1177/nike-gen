# Atomic Structure: Nucleus, Isotopes, Mass Spectra

Chemistry Foundations, Lesson 2.

## Scope

- Audience: first-year university general chemistry
- Length: about 3 minutes
- Format: 1920×1080 landscape, 30 fps, H.264 MP4
- Narration: Kokoro TTS generated in CI, with a quiet synth pad generated in code
- Framework: Remotion (React/TypeScript). The lesson is a narrated explainer built from animated atom diagrams, kinetic notation labels, and an animated mass-spectrum bar chart, which suits Remotion's React-driven chart and text animation.
- Deliverables: `out/atomic-structure-isotopes-mass-spectra.mp4` and key frames in `out/stills/`

## Brief

Concept: an atom is a tiny, dense nucleus of protons and neutrons surrounded by electrons; a mass spectrometer sorts atoms by mass, showing that an element is a mixture of isotopes and that its periodic-table mass is a weighted average.

### Definitions (sourced)

- Subatomic particles: protons (+1, ≈1 u) and neutrons (0, ≈1 u) sit in the nucleus; electrons (−1, ≈0 u) surround it. [OpenStax 2.3](https://openstax.org/books/chemistry-2e/pages/2-3-atomic-structure-and-symbolism)
- Nucleus vs atom: the nucleus is about 100,000 times smaller in diameter than the atom, as Rutherford's gold-foil experiment showed (most alpha particles pass straight through; a few bounce back). [OpenStax 2.2](https://openstax.org/books/chemistry-2e/pages/2-summary)
- Atomic number Z: number of protons; defines the element. Mass number A: protons + neutrons. Nuclide notation: A as superscript, Z as subscript, before the symbol X. [OpenStax 21.1](https://openstax.org/books/chemistry-2e/pages/21-1-nuclear-structure-and-stability)
- Isotopes: atoms of the same element (same Z) with different numbers of neutrons (different A). [OpenStax 2.3]
- Mass spectrometer: vaporizes and ionizes the sample to cations, accelerates them, and deflects them in a magnetic field by mass-to-charge ratio (m/z); a detector counts them. [OpenStax 2.3]
- Mass spectrum: relative abundance (peak height) vs m/z. For +1 ions, peak position equals isotopic mass. [OpenStax 2.3]
- Average atomic mass: the weighted average of isotopic masses by natural fractional abundance. [OpenStax 2.3]

### Values

| Quantity | Value | Source |
| --- | --- | --- |
| Proton | 1.007276 u, charge +1 | [CODATA 2022 via PDG](https://pdg.lbl.gov/2026/listings/rpp2026-list-p.pdf) |
| Neutron | 1.008665 u, charge 0 | [CODATA 2022 via PDG](https://ccwww.kek.jp/pdg/2026/listings/rpp2026-list-n.pdf) |
| Electron | 0.000549 u, charge −1 | [CODATA 2022 via PDG](https://pdg.lbl.gov/2026/listings/rpp2026-list-electron.pdf) |
| Nucleus : atom diameter | ≈ 1 : 100,000 | OpenStax 2.2 |
| Cl-35 | 34.96885 u, 75.76 % | [NIST](https://physics.nist.gov/cgi-bin/Compositions/stand_alone.pl?ele=Cl) |
| Cl-37 | 36.96590 u, 24.24 % | NIST |

### Misconceptions to correct

- "A chlorine atom weighs 35.45 u": no single atom does; 35.45 is an average over the mixture.
- Simple vs weighted average: (35 + 37) / 2 = 36 is wrong because the isotopes are not equally common.
- Mass number (integer count), isotopic mass (one atom's mass), and atomic weight (the average) are three different things.
- "Isotopes are unusual or radioactive": every atom is some isotope, and most are stable.
- m/z is not mass unless z = 1; say so explicitly.
- Abundance axes are sometimes normalized to the tallest peak; this lesson uses percent of all atoms.

### Decisions

- On screen: proton and neutron ≈ 1 u, electron ≈ 0 u (≈ 1/1836 of a proton is not used).
- Chlorine isotopic masses rounded to 34.97 u and 36.97 u; abundances 75.76 % and 24.24 %.
- Worked calculation: 34.97 × 0.7576 + 36.97 × 0.2424 = 26.49 + 8.96 = 35.45 u (checked; unrounded masses give 35.4529).
- A 100-atom sample is drawn as 76 Cl-35 and 24 Cl-37 to match the abundances.
- Show the wrong simple average (36) first, then move the marker to 35.45.

### Teaching order

1. Subatomic particles: charge, mass, location; nucleus ≈ 100,000× smaller than the atom (gold foil).
2. Z, A, nuclide notation; isotopes, with chlorine-35 and chlorine-37 as the example; most isotopes are stable.
3. Mass spectrometer: ionize to +1, accelerate, deflect by m/z, detect.
4. Reading the chlorine spectrum: x = m/z = mass for +1 ions, height = abundance.
5. The 35.45 puzzle: 100 atoms (76 and 24); simple average 36 is wrong.
6. Weighted average calculation giving 35.45 u.
7. Key takeaways card.

## Design plan

### Visual style

- 1920×1080, 30 fps, 5400 frames (180 s). Kokoro `af_heart` narration plus code-generated pad.
- Background `#FFFFFF`; text `#1C1C1E`; axes `#4C566A`; grid `#E5E9F0`.
- Proton `#BF616A` (text `#99414B`); neutron `#5E81AC`; electron `#D08770` (text `#A55B46`).
- Cl-35 fill `#A3BE8C`, text/stroke `#4A7A40`; Cl-37 fill `#B48EAD`, text/stroke `#7C5375`.
- Accent fill `#88C0D0`, text/stroke `#2B7992`; error `#D32F2F`.
- Type: Roboto. Title 96 px / 700, subtitle 64 px, body 48 px / 400, labels 32 px / 500.
- Safe margin 120 px. 30-frame crossfade between scenes; scenes 5 and 6 run as one continuous sequence.

### Storyboard and narration

| Scene | Frames | Narration window |
| --- | --- | --- |
| 1 `subatomic-particles` | 0–900 | 30–870 |
| 2 `nuclide-isotopes` | 900–1800 | 930–1770 |
| 3 `mass-spectrometer` | 1800–2650 | 1830–2620 |
| 4 `reading-spectrum` | 2650–3450 | 2680–3420 |
| 5 `abundance-puzzle` | 3450–4250 | 3480–4220 |
| 6 `weighted-average` | 4250–5100 | 4280–5070 |
| 7 `closing-card` | 5100–5400 | silent |

1. Title "Atomic Structure" / "Nucleus, Isotopes & Mass Spectra". Dashed atom outline with a tiny nucleus dot; camera zooms into the nucleus, "Nucleus ≈ 100,000× smaller". Protons "Proton: +1, ≈ 1 u", neutrons "Neutron: 0, ≈ 1 u", orbiting electrons "Electron: −1, ≈ 0 u".
   "Atoms are built from subatomic particles. The nucleus is tiny and dense, about one hundred thousand times smaller than the atom. It contains protons, with a positive one charge and mass of about one unit, and neutrons, which are neutral and also weigh about one unit. Electrons have almost zero mass and surround the nucleus."
2. "Atomic number Z: protons", "Mass number A: protons + neutrons", brace "Isotopes (Stable)" over nuclide symbols ³⁵₁₇Cl (green) and ³⁷₁₇Cl (purple), with "17 p, 18 n" and "17 p, 20 n".
   "An element is defined by its atomic number, its number of protons. Mass number is the sum of protons and neutrons. Isotopes are atoms of the same element with different numbers of neutrons. For example, stable chlorine isotopes have seventeen protons, but chlorine thirty-five has eighteen, and chlorine thirty-seven has twenty."
3. Instrument schematic: inlet, "Ionize" box adding "+1" tags, "Accelerate" plates, shaded "Magnetic field", two ion paths (Cl-35 bends more), "Deflect by m/z", detector "Detect".
   "A mass spectrometer reveals these isotopes. It ionizes the sample to cations with a plus one charge, then accelerates them. A magnetic field deflects the ions based on their mass to charge ratio. Heavier ions bend less. Finally, a detector counts how many hit each spot."
4. Bar chart, y "Relative Abundance (%)" 0–100, x "m/z (Isotopic Mass for z = +1)" 34–38. Bars "34.97 u" / "75.76 %" and "36.97 u" / "24.24 %".
   "The mass spectrum plots relative percent abundance against mass to charge ratio. For plus one ions, the x axis shows isotopic mass directly. Chlorine has a tall peak at thirty-four point nine seven units, and a smaller peak at thirty-six point nine seven units."
5. 5×20 grid of 100 atoms (76 green, 24 purple), legend "Cl-35: 76 atoms" / "Cl-37: 24 atoms", number line 34–38. "Periodic table: 35.45 u ?"; marker "Simple average: 36" struck with a red X, "Wrong".
   "Out of one hundred atoms, roughly seventy-six are chlorine thirty-five and twenty-four are chlorine thirty-seven. The periodic table lists thirty-five point four five units, but no single atom weighs that. The simple average of thirty-six is wrong because the mixture is uneven."
6. Equation "34.97 u × 0.7576 + 36.97 u × 0.2424 = 35.45 u" builds term by term in isotope colours; marker glides from 36 to 35.45, "Weighted average (atomic weight): 35.45 u".
   "Instead, we calculate a weighted average by abundance. We multiply the mass of chlorine thirty-five by zero point seven five seven six, and add the chlorine thirty-seven mass times zero point two four two four. This yields thirty-five point four five units."
7. Card "Key Takeaways": "An atom is a dense nucleus of protons and neutrons surrounded by electrons." / "Isotopes share an atomic number but have different mass numbers." / "Atomic weight is the weighted average of naturally occurring isotopic masses."

### Stills

Frames 400, 800, 1700, 2550, 3350, 4150, 5000, 5300.

### Frame-by-frame

Delivered by `designer` in three sequences (scenes 1–2, 3–4, 5–7); exact coordinates and timings live in `src/scenes/*`. Summary:

- Scene 1: atom outline r 400 and nucleus dot at (960, 540); exponential zoom ×110 over 60 frames; 12 nucleons r 40 (6 p, 6 n) spring in; 4 electrons r 10 orbit.
- Scene 2: Z/A definitions at y 150/220; brace 660–1260 at y 360; nuclides at x 660 and 1260, y 540; neutron counts at y 680.
- Scene 3: inlet 120–300, ionization box 300–450 × 320–400, plates x 500/550, field 700–1400 × 200–900, detector x 1400, y 400–900. Paths `M 300 360 L 700 360 Q 1050 360 1400 800` (Cl-35) and `… 1400 600` (Cl-37). Ions every 30 frames in a 3:1 Cl-35:Cl-37 rhythm, 150 frames each, faster after the plates.
- Scene 4: plot 300–1600 × 200–800, x 34–38 (325 px/unit), y 0–100 %; 80 px bars at x 615 and 1265.
- Scenes 5–6: grid centres x 580–1340, y 160–320, 40 px spacing, r 15; number line y 750, x 360–1560 (300 px/unit); equation at y 520; marker glides 960 → 795.
- Closing card: 1200×700 at (360, 190), spring up from off-screen.

Implementation deviations (layout fixes, no content change):

- Narration sync recomputed at 2.3 words/s from each window start (the designer's estimates ran slow).
- Scene 1: the title holds for the first ~100 frames, so the atom appears at 90 and the zoom runs 120–180. The zoomed nucleus is r 220 and the electron orbit r 340 (not 300/400), so the labels sit clear of it: proton label x 330, neutron label x 1590, nucleus label y 930. Added a "Not to scale" tag.
- Scene 2: superscripts and subscripts are right-aligned to the left edge of "Cl" so they don't overlap it.
- Scene 3: "Accelerate" sits below the plates at (525, 470) (it collided with "Ionize"); ions are emitted continuously and leave a brief impact flash on the detector.
- Scene 4: bar labels lifted about 20 px off the bar tops.
- Scenes 5–6: legend moved to x 220–490 to clear the grid; equation laid out as one centred row so its terms can't overlap.
- Narration accuracy edits: neutrons "also weigh about one unit"; dropped "exactly" before 35.45.
- Pad softened after review (it had a metallic shimmer): dropped the detuned 2.002× overtone, two-stage low-pass at 400–600 Hz, chord lowered an octave (D2, A2, D3, F♯3), peak −28 dBFS instead of −24.
- Re-synced after the first render to measured Kokoro durations (scene 1–6: 21.6, 21.7, 19.1, 18.2, 18.3, 18.1 s; about 12–12.5 frames per word). Every line ends at least 190 frames before its limit.

## Status

- [x] Scope confirmed
- [x] Brief
- [x] Design plan
- [x] Build
- [x] CI green ([run 38710278276](https://github.com/tharunkumar1177/nike-gen/actions/runs/38710278276)); stills render to `out/stills/` but were not downloaded for review, per the instruction to only confirm the CI build
- [x] Recorded on main (committed directly to `main`, no PR, as requested)
