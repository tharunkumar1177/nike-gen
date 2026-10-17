# Bonding Overview: Ionic vs Covalent vs Metallic

Chemistry Foundations, Lesson 8.

## Scope

- Audience: first-year university general chemistry
- Length: about 3 minutes
- Format: 1920×1080 landscape, 30 fps, H.264 MP4
- Narration: Kokoro TTS generated in CI, with a quiet, softened synth pad (lower chord, quieter level) generated in code
- Scene gaps: 3–8 s between topics within the video
- Framework: Remotion (React/TypeScript), per `style.md`. The lesson is a narrated explainer built from animated particle diagrams (electron transfer, shared pairs, a cation lattice in an electron sea) and an electronegativity-difference scale, which suits Remotion's React-driven diagram animation.
- Lesson requirements (`roadmap.md`): concept statement, hero diagram, step panels, ≥1 worked example, pitfalls box, key-takeaways card.
- Deliverables: `out/bonding-ionic-covalent-metallic.mp4` and key frames in `out/stills/`

## Brief

Concept: a chemical bond is an attraction between atoms or ions that lowers the total energy of the system. Bonding is a continuum, usually sorted into covalent (shared electron pairs), ionic (electron transfer, then a lattice of oppositely charged ions) and metallic (a lattice of cations among delocalized valence electrons). Electronegativity difference (ΔEN) is a rough guide to where a bond sits.

### Definitions (sourced)

- Chemical bond: "When forces acting between two atoms or groups of atoms lead to the formation of a stable independent molecular entity, a chemical bond is considered to exist." [IUPAC Gold Book CT07009](https://goldbook.iupac.org/terms/view/CT07009)
- Ionic bond: electrostatic attraction between oppositely charged ions, typically formed by electron transfer; ionic compounds are extended lattices written as formula units (NaCl), not discrete molecules. [OpenStax 7.1](https://openstax.org/books/chemistry-2e/pages/7-1-ionic-bonding)
- Covalent bond: attraction between nuclei and a shared pair of electrons; nonpolar (equal sharing) or polar (unequal sharing). [OpenStax 7.2](https://openstax.org/books/chemistry-2e/pages/7-2-covalent-bonding)
- Metallic bond: a lattice of positive ion cores held together by delocalized (itinerant) valence electrons; the "electron sea" is an introductory model. [Sutton, J. Chem. Educ. 2024, 101, 2710](https://pubs.acs.org/doi/10.1021/acs.jchemed.4c00010)
- Electronegativity: the tendency of an atom to attract the electrons in a bond (Pauling scale). [OpenStax 7.2]
- van Arkel–Ketelaar triangle: plots ΔEN against average EN, placing metallic, covalent and ionic bonding at its corners. [Jensen, J. Chem. Educ. 1995, 72, 395](https://pubs.acs.org/doi/10.1021/ed072p395)

### Values

| Quantity | Value | Source |
| --- | --- | --- |
| Pauling EN | F 4.0, O 3.5, N 3.0, Cl 3.0, C 2.5, H 2.1, Mg 1.2, Na 0.9 | OpenStax 7.2 Fig. 7.6 |
| ΔEN guide | < 0.4 nonpolar covalent; 0.4–1.8 polar covalent; > 1.8 ionic ("a general guide… with many exceptions") | OpenStax 7.2 |
| Cl–Cl | ΔEN 0.0, nonpolar covalent | computed |
| H–Cl | ΔEN 0.9, polar covalent | computed |
| C–O | ΔEN 1.0, polar covalent | computed |
| Na–Cl | ΔEN 2.1, ionic | computed |
| Mg–F | ΔEN 2.8, ionic | computed |
| H–F | ΔEN 1.9, yet a polar covalent molecule (exception) | OpenStax 7.2 |
| Na first ionization energy | +496 kJ/mol (costs energy) | [OpenStax 7.5](https://openstax.org/books/chemistry-2e/pages/7-5-strengths-of-ionic-and-covalent-bonds) |
| Cl electron affinity | −349 kJ/mol (releases energy) | OpenStax 7.5 |
| NaCl | mp 801 °C; brittle; conducts only when molten or dissolved | [PubChem / CRC](https://pubchem.ncbi.nlm.nih.gov/compound/Sodium-Chloride) |
| Cu | mp 1084.62 °C; malleable; conducts as a solid | [NIST WebBook](https://webbook.nist.gov/cgi/inchi?ID=C7440508&Mask=4) |

### Misconceptions to correct

- "Atoms bond because they want a full octet": bonding is energetics. Na → Na⁺ costs 496 kJ/mol and Cl's electron affinity returns only 349; the attraction of the ions in the lattice releases far more and makes NaCl stable.
- "NaCl is a molecule": it is an extended lattice; NaCl is a formula unit (ratio).
- "Metal + nonmetal is always ionic": bonding is a continuum (AlCl₃ has substantial covalent character). [RSC Education](https://edu.rsc.org/cpd/teaching-structure-and-bonding-post-16/4013267.article)
- ΔEN cutoffs are guidelines, not laws (H–F, ΔEN 1.9, is covalent). Same-element metals have ΔEN 0 yet are metallic, so ΔEN alone cannot place a bond; the triangle adds average EN.
- "Breaking bonds releases energy": breaking a bond always costs energy; forming one releases it. [OpenStax 7.5]

### Source disagreements

- ΔEN cutoffs: OpenStax uses 0.4 / 1.8; other texts use 1.7 or 2.0. The video shows OpenStax's values labelled "a rough guide".
- NaCl lattice energy is quoted as 769–788 kJ/mol depending on source and definition, so the video describes the lattice step qualitatively (no number).

### Decisions

- One consistent EN set (OpenStax 2e Fig. 7.6) for every number on screen.
- Worked example: classify Cl–Cl, H–Cl, Na–Cl (and Mg–F if time allows) on a ΔEN bar; H–F appears as the exception in the pitfalls box.
- The van Arkel–Ketelaar triangle appears briefly to place Na (metallic) correctly; no numeric axes beyond corner labels.
- Properties compared for NaCl vs Cu only.

### Teaching order

1. What a bond is: attraction that lowers energy (not "wanting" an octet).
2. Covalent: shared pairs; Cl₂ nonpolar vs HCl polar.
3. Ionic: Na → Na⁺ + e⁻, Cl + e⁻ → Cl⁻, energy accounting, lattice and formula unit.
4. Metallic: cation lattice in delocalized electrons.
5. ΔEN continuum and worked example; triangle places metallic bonding.
6. Properties: NaCl vs Cu (melting point, conductivity, brittle vs malleable); pitfalls box.
7. Key takeaways card.

## Design plan

### Visual style

- 1920×1080, 30 fps, 5400 frames (180 s). Kokoro `af_heart` narration plus code-generated softened pad.
- Background `#FFFFFF`; text `#1C1C1E`.
- Bond types (accents/strokes): covalent `#10B981`, ionic `#8B5CF6`, metallic `#F97316`.
- Particles: electrons/shared pairs `#F59E0B`; cations and metal ion cores `#3B82F6`; anions `#EF4444`.
- Type: Roboto. Title 96 px / 700, subtitle 64 px, body 48 px / 400, labels 32 px / 500.
- Safe margin 120 px. 30-frame crossfade between scenes.

### Storyboard and narration

| Scene | Frames | Narration window |
| --- | --- | --- |
| 1 `concept-energy` | 0–760 | 30–700 |
| 2 `covalent-shared` | 760–1500 | 790–1440 |
| 3 `ionic-lattice` | 1500–2330 | 1530–2260 |
| 4 `metallic-sea` | 2330–3010 | 2360–2950 |
| 5 `electronegativity-scale` | 3010–4100 | 3040–4040 |
| 6 `properties-pitfalls` | 4100–5100 | 4130–5040 |
| 7 `closing-card` | 5100–5400 | silent |

Windows are re-synced to measured narration after the first render so every silence between lines stays within 3–8 s.

1. Title "Chemical Bonds" / "Energy, Not Octets". Concept statement. Potential-energy curve: two atoms approach and settle into the energy well, label "Lower total energy". Crossed-out pitfall "Atoms want a full octet".
   "A chemical bond is an attraction between atoms or ions that lowers the total energy of the system. Atoms do not form bonds because they want a full octet; they bond because the attraction releases energy, making the resulting structure more stable than the separate atoms."
2. Title "Covalent: Shared Pairs". Left: Cl₂ with a centred shared pair, "Nonpolar". Right: HCl with the pair pulled toward Cl, δ⁺/δ⁻, "Polar".
   "In a covalent bond, atoms share pairs of electrons. If the atoms are identical, like two chlorine atoms, they share the electrons equally, forming a nonpolar covalent bond. If the atoms differ, like hydrogen and chlorine, the sharing is unequal, creating a polar covalent bond."
3. Title "Ionic: Electron Transfer". Three step panels: Na and Cl, one electron moves ("Electron transfer", with "+496 kJ/mol" and "−349 kJ/mol"); Na⁺ and Cl⁻ ("Electrostatic attraction"); alternating lattice ("Formula unit: NaCl").
   "Ionic bonds usually form through electron transfer. Removing an electron from sodium costs energy, and adding it to chlorine releases some energy. But the real driving force is the formation of a massive lattice of oppositely charged ions, releasing huge amounts of energy. Sodium chloride is an extended lattice, not a discrete molecule."
4. Title "Metallic: Electron Sea". Lattice of blue cations with amber electrons moving freely; label "Delocalized valence electrons".
   "Metallic bonding is a lattice of positive ion cores surrounded by a sea of delocalized valence electrons. These electrons move freely throughout the structure and hold the metal together. This model explains why solid metals can bend and conduct electricity."
5. Title "Electronegativity Difference (ΔEN)". Hero diagram: horizontal covalent-to-ionic bar with OpenStax guide bands. Worked examples drop onto it: Cl–Cl 0.0, H–Cl 0.9, Na–Cl 2.1. Small van Arkel–Ketelaar triangle places Na–Na at the metallic corner.
   "Electronegativity is an atom's tendency to attract bonded electrons. The difference between atoms provides a rough guide to bond type. For example, two chlorine atoms have a difference of zero, making them nonpolar covalent. Hydrogen and chlorine have a difference of zero point nine, predicting polar covalent. Sodium and chlorine have a difference of two point one, predicting ionic. A van Arkel Ketelaar triangle adds average electronegativity to properly place metallic bonds."
6. Title "Properties & Exceptions". Left: NaCl lattice cracks, "Brittle", "mp 801 °C". Right: Cu layers slide, "Malleable", "mp 1084.62 °C". Pitfalls box: "H–F: ΔEN 1.9, yet a polar covalent molecule".
   "Bonding determines bulk properties. An ionic lattice like sodium chloride is brittle and conducts only when molten or dissolved. A metallic lattice like copper is malleable and conducts as a solid. A common pitfall is treating electronegativity cutoffs as strict laws. Hydrogen fluoride has a difference of one point nine, yet it forms a polar covalent molecule, not an ionic one."
7. Card "Key Takeaways": covalent shares pairs; ionic is a lattice of oppositely charged ions; metallic is cations in an electron sea; ΔEN only roughly predicts bond type.

### Stills

Frames 400, 1200, 2000, 2800, 3700, 4700, 5250.

### Frame-by-frame

Delivered by `designer` in three sequences (scenes 1–2, 3–4, 5–7); exact coordinates live in `src/scenes/*`. Summary:

- Shared geometry: atom disc r 60 (H 40), fill `#F9FAFB`, 4 px stroke `#4B5563`, symbol 48 px / 500; electron dot r 8 amber; label chip `#F3F4F6`, radius 16, 32 px / 500; charges 32 px / 700 at 45° top-right; pitfall tag red-50 fill, red-300 border, red-600 text with a 6 px strikethrough. Text on white uses the 700-shade of each accent (WCAG AA).
- Scene 1: title/subtitle top-left; concept statement x 120, y 360, 750 px wide; Morse-shaped energy curve (origin 1100, 850; well at 1350, 750); marker springs into the well while two atoms above close their gap; "Lower total energy" chip; struck "Atoms want a full octet".
- Scene 2: Cl₂ at x 500 (atoms touch, centred pair, "Cl₂", "Nonpolar"); HCl at x 1400 (pair slides toward Cl, δ+ / δ−, "HCl", "Polar").
- Scene 3: three numbered step panels: Na → Cl electron arc with "+496 kJ/mol Ionization" and "−349 kJ/mol Electron affinity"; Na⁺ (small) and Cl⁻ (large) pulled together, "Electrostatic attraction"; 5×5 lattice growing ring by ring, "Lattice releases far more energy", "Formula unit: NaCl", struck "NaCl molecule".
- Scene 4: 6×4 cation cores in an orange-outlined box, 36 drifting electrons; top two rows shear on "bend"; electrons gain a rightward drift and a "Current" arrow on "conduct electricity".
- Scene 5: ΔEN bar 0–3.3 with OpenStax bands, worked examples with arithmetic at left, markers dropping onto the bar; van Arkel–Ketelaar triangle (Metallic / Covalent / Ionic corners) with Na–Na, Cl–Cl, Na–Cl dots.
- Scene 6: NaCl lattice cracks and splits ("Brittle", "mp 801 °C", "Conducts when molten or dissolved"); Cu lattice top rows slide one spacing ("Malleable", "mp 1084.62 °C", "Conducts as a solid"); pitfall box with the H–F exception.
- Closing card: 1600×600, four colour-coded takeaways staggered 20 frames.

Implementation deviations (layout fixes, no content change):

- Beats are keyed to narrated phrases (`src/cues.ts`) instead of fixed frames; scene ranges were re-budgeted at Kokoro's measured ~2.4 words/s (the plan assumed 2.9, which overran most windows).
- Scene 1 "Lower total energy" chip moved to y 800 (plan's y 850 sat on the x-axis).
- Scene 2 shared pair starts at the H–Cl contact point and shifts 28 px; dots are 20 px apart (12 px made 8 px dots overlap).
- Scene 3 lattice pitch 56 px (40 px overlapped the 24 px anions); energy tags split into value + label above Na and below Cl; step numbers at y 300 to clear the title.
- Scene 4 box 960×440 with chips below it (plan's side chips overlapped the box and the safe margin); cores show "+" inside.
- Scene 5 bar moved to y 380 with band labels at y 310 (plan's y 220–280 overlapped the title); markers are discs on the bar with bond labels beneath; triangle shrunk to base y 900, apex y 600 so it clears the bar labels.
- Scene 6 lattices use a 56 px pitch; "NaCl" and "Cu" headings added beside each lattice so viewers know which is which; Cu box shows electrons between cores.
- Closing card last bullet leads with "ΔEN" (the plan's "Electronegativity" overstated it).

## Status

- [x] Scope confirmed
- [x] Brief
- [x] Design plan
- [x] Build
- [ ] CI green, stills reviewed
- [ ] Recorded on main
