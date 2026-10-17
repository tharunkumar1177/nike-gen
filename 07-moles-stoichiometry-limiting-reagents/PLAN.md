# Moles, Stoichiometry, Limiting Reagents

Chemistry Foundations, Lesson 7.

## Scope

- Audience: first-year university general chemistry
- Length: about 3 minutes
- Format: 1920×1080 landscape, 30 fps, H.264 MP4
- Narration: Kokoro TTS generated in CI, with a quiet synth pad generated in code
- Framework: Remotion (React/TypeScript). The lesson is a narrated explainer built from counting visuals, a mass ↔ mole ↔ particle conversion map, balanced-equation ratio bars and a limiting-reagent worked example, all diagram and text animation that suits Remotion.
- Required elements (ROADMAP): concept statement, hero diagram, step panels, at least one worked example, pitfalls box, key-takeaways card.
- Gap between topics within the video: 3 to 8 seconds.
- Deliverables: `out/moles-stoichiometry-limiting-reagents.mp4` and key frames in `out/stills/`

## Brief

Concept: the mole is an exact counting unit that links atoms to grams. Balanced equations give mole ratios (not mass ratios) between reactants and products. When reactants are not in exact stoichiometric amounts, the limiting reagent sets the theoretical yield.

### Definitions (sourced)

- Mole (mol): SI unit of amount of substance; one mole contains exactly 6.02214076 × 10²³ elementary entities (2019 SI, no longer tied to carbon-12). [BIPM SI Brochure 9th ed.](https://www.bipm.org/en/si-base-units/mole)
- Avogadro constant: N_A = 6.02214076 × 10²³ mol⁻¹, exact. [BIPM]
- Molar mass M: mass of one mole of a substance in g/mol, numerically equal to its relative atomic or molecular mass (u, Da). [OpenStax 3.1](https://openstax.org/books/chemistry-2e/pages/3-1-formula-mass-and-the-mole-concept)
- Stoichiometric factor: ratio of coefficients in a balanced equation, relating amounts of reactants and products. [OpenStax 4.3](https://openstax.org/books/chemistry-2e/pages/4-3-reaction-stoichiometry)
- Limiting reactant: present in less than the stoichiometric amount; fully consumed; limits the product formed. [OpenStax 4.4](https://openstax.org/books/chemistry-2e/pages/4-4-reaction-yields)
- Theoretical yield: maximum product from the limiting reactant. Percent yield = actual ÷ theoretical × 100 %. [OpenStax 4.4]

### Values

| Quantity | Value | Source |
| --- | --- | --- |
| N_A | 6.02214076 × 10²³ mol⁻¹ (exact) | BIPM |
| Atomic weight H | 1.008 | [CIAAW](https://www.ciaaw.org/atomic-weights.htm) (abridged) |
| Atomic weight O | 15.999 | CIAAW (abridged) |
| M(H₂) | 2.016 g/mol | from CIAAW |
| M(O₂) | 31.998 g/mol | from CIAAW |
| M(H₂O) | 18.015 g/mol | from CIAAW |

### Worked example: 2 H₂ + O₂ → 2 H₂O, given 2.00 g H₂ and 10.0 g O₂

- n(O₂) = 10.0 g ÷ 31.998 g/mol = 0.3125 mol
- n(H₂) = 2.00 g ÷ 2.016 g/mol = 0.9921 mol
- O₂ needs 2 × 0.3125 = 0.6250 mol H₂; 0.9921 mol available, so H₂ is in excess and O₂ is limiting (despite the larger mass).
- n(H₂O) = 0.3125 mol × 2 = 0.6250 mol; m(H₂O) = 0.6250 × 18.015 = 11.26 g → 11.3 g theoretical yield
- Excess H₂ left = (0.9921 − 0.6250) mol × 2.016 g/mol = 0.740 g (mass check: 12.00 g − 11.26 g = 0.74 g)
- Percent yield if 10.0 g H₂O collected: 10.0 ÷ 11.26 × 100 = 88.8 % (unrounded theoretical yield carried; corrected from the researcher's 88.5 %, which used the rounded 11.3 g)

### Misconceptions to correct

- The reactant with the smaller mass (or smaller coefficient) is not necessarily limiting; compare moles against the ratio.
- Coefficients are mole ratios, not mass ratios (2 g H₂ + 1 g O₂ does not give 2 g H₂O). [OpenStax 4.3]
- Subscripts define the substance; coefficients define the amount. Never change subscripts to balance.
- Always balance the equation before using its ratios.

### Decisions

- Molar masses use CIAAW abridged atomic weights (H 1.008, O 15.999); no source conflict, only rounding convention.
- Carry guard digits through the calculation; round only the reported answers.

### Teaching order

1. The mole: exact counting unit, N_A.
2. Molar mass: atomic weight in u ↔ g/mol (H₂O = 18.015 g/mol).
3. Conversion map: mass ↔ moles ↔ particles.
4. Coefficients as mole ratios.
5. Worked limiting-reagent example (moles, limiting, yield, excess).
6. Pitfalls and percent yield.

## Design plan

Narration text lives in `audio/script.json`; on-screen cues are tied to spoken phrases via `src/cues.ts`.

### Timing

Scenes are laid end to end by `src/timeline.ts`: each narrated scene lasts its declared clip length (`seconds` in `audio/script.json`) plus a 180-frame gap, and narration starts 30 frames into each scene, so consecutive lines are separated by 6 s of silence. `audio/generate.js` measures every Kokoro clip and fails CI if any gap (including before the closing card) leaves 3–8 s, printing the measured lengths to copy back into `seconds`. 30-frame crossfades; silent 360-frame closing card.

### Style

Bright textbook: white background, Roboto, type scale 96 / 64 / 48 / 32, 120 px safe margin.

| Token | Fill | Text | Role |
| --- | --- | --- | --- |
| h2 | #88C0D0 | #2B7992 | H₂ |
| o2 | #B48EAD | #7C5375 | O₂ |
| h2o | #A3BE8C | #4A7A40 | H₂O, yields |
| limiting | #D08770 | #A55B46 | limiting reagent |
| excess | #EBCB8B | #8F6B2E | excess reagent |
| pitfall | #D32F2F | #D32F2F | pitfalls box |

### Scenes

1. `the-mole`: title "The Mole", subtitle "Counting Unit", concept statement "Exact counting unit linking atoms to grams."; "1 mol = 6.02214076 × 10²³ entities" (centred, y 560) on "exactly six point"; "N_A: Avogadro constant" on "Avogadro constant".
2. `molar-mass-map` (hero): "Conversion Map"; nodes Mass (g) · Moles (mol) · Particles at x 400 / 960 / 1520, y 500; arrows ÷ M, × M, × N_A, ÷ N_A draw in sequence on "conversion map"; "M(H₂O) = 18.015 g/mol" box (y 800) on "H two O has".
3. `mole-ratios`: "Mole Ratios"; 96 px equation 2 H₂ + 1 O₂ → 2 H₂O, coefficients pulse on each spoken amount, implied "1" fades in; label "Stoichiometric factors (mole ratios)".
4. `limiting-reagent`: 64 px equation at y 180; 2.00 g H₂ (x 160) and 10.0 g O₂ (x 1000) at y 400; mole conversions at y 500; half-size map inset at bottom centre, ÷ M arrow lit in H₂ then O₂ colour.
5. `identifying-limiting`: "Needs: 0.3125 × 2 = 0.6250 mol H₂" and "Have: 0.9921 mol > 0.6250 mol" at y 650; Excess / Limiting reagent badges at y 750; ring on 10.0 g O₂ with "Larger mass, but limiting".
6. `theoretical-yield`: Limiting badge, 0.3125 mol O₂ × 2 = 0.6250 mol H₂O; × 18.015 g/mol = 11.26 g → 11.3 g "Theoretical yield"; (0.9921 − 0.6250) mol × 2.016 g/mol = 0.740 g H₂ + Excess badge; inset with × M lit.
7. `percent-yield-pitfalls`: "Actual: 10.0 g H₂O"; "% Yield = (10.0 g / 11.26 g) × 100 % = 88.8 %"; red Pitfall box: "Smaller mass does not mean limiting. / Always compare moles to the balanced ratio."
8. Closing card: "Key Takeaways" with four bullets (mole, molar mass, mole ratios, limiting reactant).

### Build adjustments to the designer plan

- Timing derived in code (above) instead of hand-set frames; the designer's revised frame table was internally inconsistent.
- Map inset moved to bottom centre (y 880) so it doesn't overlap the right calculation column; Avogadro definition centred so it fits the frame.
- Badges use a tinted fill with dark text for contrast.
- Narration: "Molar mass links mass to moles" (not "to particles"); "exactly" dropped before the computed 0.6250 mol.
- Arrows are drawn as SVG and "≠" is spelled out, because the Roboto latin subset has no arrow or not-equal glyphs.
- "left" dropped after 0.740 g H₂; the Excess badge carries the meaning.

## Status

- [x] Scope
- [x] Research
- [x] Design
- [x] Build
- [x] CI green: [run 38986897693](https://github.com/tharunkumar1177/nike-gen/actions/runs/38986897693), 4654 frames (155.1 s), all gaps 5–6 s
- [x] Merged

Stills were not reviewed visually (verification limited to the CI runtime by user decision).
