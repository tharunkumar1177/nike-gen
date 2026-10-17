# Gases, Solutions, Colligative Properties

Chemistry Foundations, Lesson 14.

## Scope

- Audience: first-year university general chemistry
- Length: about 3 minutes
- Format: 1920×1080 landscape, 30 fps, H.264 MP4
- Narration: Kokoro TTS generated in CI, with a quiet synth pad generated in code
- Framework: Remotion (React/TypeScript). Narrated explainer built from gas-law diagrams, particle boxes, solution concentration panels and colligative-property curves; diagram and text animation suits Remotion.
- Required elements (ROADMAP): concept statement, hero diagram, step panels, at least one worked example, pitfalls box, key-takeaways card.
- Gap between topics within the video: 3 to 8 seconds.
- Deliverables: `out/gases-solutions-colligative-properties.mp4` and key frames in `out/stills/`

## Brief

Concept: the ideal gas law PV = nRT models a gas of point particles with no intermolecular forces. Dissolving a solute changes the solvent's properties; colligative properties depend only on the number of solute particles (count, not kind), tracked by the van 't Hoff factor i. Molality is the temperature-independent concentration used for boiling and freezing points; osmotic pressure uses molarity.

### Definitions (sourced)

- Ideal gas law: PV = nRT; assumes negligible particle volume and no intermolecular forces. [OpenStax 9.3](https://openstax.org/books/chemistry-2e/pages/9-3-the-ideal-gas-law)
- Real gases deviate from ideal behaviour at high pressure (particle volume matters) and low temperature (attractions matter). [OpenStax 9.6](https://openstax.org/books/chemistry-2e/pages/9-6-non-ideal-gas-behavior)
- Molality m: moles of solute per kilogram of solvent; temperature-independent, unlike molarity (moles per litre of solution). [OpenStax 11.4](https://openstax.org/books/chemistry-2e/pages/11-4-colligative-properties)
- Colligative properties: depend on the concentration of solute particles, not their identity. [IUPAC Gold Book](https://goldbook.iupac.org/terms/view/C01173)
- van 't Hoff factor i: moles of particles in solution per mole of formula units dissolved; nonelectrolytes such as glucose have i = 1, NaCl ideally i = 2. [OpenStax 11.4]
- Raoult's law: P_solution = X_solvent · P°_solvent; for a non-volatile solute, ΔP = X_solute · P°_solvent. [OpenStax 11.4]
- Boiling-point elevation ΔT_b = i K_b m; freezing-point depression ΔT_f = i K_f m. [OpenStax 11.4]
- Osmosis: net flow of solvent through a semipermeable membrane from lower to higher solute concentration. Osmotic pressure Π is the pressure needed to stop it: Π = iMRT (molarity, T in kelvin). [OpenStax 11.4]

### Values

| Quantity | Value | Source |
| --- | --- | --- |
| R | 8.314462618 J/(mol·K) (exact) | [CODATA](https://physics.nist.gov/cgi-bin/cuu/Value?r) |
| R | 0.082057 L·atm/(mol·K) | derived (1 atm = 101325 Pa) |
| Water K_f | 1.86 °C·kg/mol | OpenStax 11.4 |
| Water K_b | 0.512 °C·kg/mol | OpenStax 11.4 |
| Water P° at 25 °C | 23.76 torr | [OpenStax Appendix E](https://openstax.org/books/chemistry-2e/pages/e-water-properties) |
| M(Na), M(Cl) | 22.990, 35.45 g/mol | [CIAAW](https://www.ciaaw.org/atomic-weights.htm) (abridged) |

### Worked example: freezing point of 11.7 g NaCl in 500. g water

- M(NaCl) = 22.990 + 35.45 = 58.44 g/mol
- n = 11.7 g ÷ 58.44 g/mol = 0.2002 mol
- m = 0.2002 mol ÷ 0.500 kg = 0.4004 mol/kg
- i = 2 (ideal; NaCl → Na⁺ + Cl⁻; real i ≈ 1.9 from ion pairing)
- ΔT_f = 2 × 1.86 × 0.4004 = 1.489 °C → T_f = −1.49 °C

### Osmotic pressure illustration: 0.100 M NaCl at 25 °C

- Π = 2 × 0.100 mol/L × 0.082057 L·atm/(mol·K) × 298.15 K = 4.893 atm → 4.89 atm (corrected from the researcher's 4.8938; same rounded answer)

### Misconceptions to correct

- PV = nRT is a model, not exact; real gases deviate at high P and low T.
- Molality uses kilograms of solvent, not solution; it is chosen because molarity changes as liquids expand on heating.
- Colligative effects depend on particle count, not solute identity or mass.
- i is not always a whole number; ion pairing makes real i smaller than ideal.
- In osmosis the solvent (not the solute) moves, towards the more concentrated side; osmotic pressure is the pressure that stops the flow, not the driving pressure. [J. Chem. Educ. 1999](https://pubs.acs.org/doi/10.1021/ed076p145)

### Decisions (user)

- K_f = 1.86 °C·kg/mol (OpenStax) rather than CRC 1.853.
- All four colligative properties covered fully; length may run about 3.5 minutes.
- STP is not used on screen, avoiding the 1 atm vs 1 bar conflict.

### Teaching order

1. Ideal gas law and its two assumptions.
2. Where it breaks: high P, low T.
3. Bridge to solutions: molality vs molarity.
4. Colligative properties and the van 't Hoff factor.
5. Vapour-pressure lowering (Raoult's law).
6. Boiling-point elevation and freezing-point depression.
7. Worked example: freezing point of the NaCl solution.
8. Osmosis and osmotic pressure.
9. Pitfalls.

## Design plan

Narration text lives in `audio/script.json`; on-screen cues are tied to spoken phrases via `src/cues.ts`.

### Timing

Same engine as Lesson 7: each scene lasts its declared clip length plus a 180-frame gap, narration starts 30 frames in, so lines are 6 s apart; `audio/generate.js` fails CI if any gap leaves 3–8 s and prints measured lengths. 30-frame crossfades; silent 360-frame closing card.

### Style

Bright textbook: white background, Roboto (latin + greek subsets for Δ and Π), type scale 96 / 64 / 48 / 32, 120 px safe margin.

| Token | Fill | Text | Role |
| --- | --- | --- | --- |
| gas | #88C0D0 | #2B7992 | gas particles, titles |
| solvent | #81A1C1 | #3B607B | solvent, pure-solvent curves |
| solute | #B48EAD | #7C5375 | solute particles, solution curves |
| ion | #EBCB8B | #8F6B2E | ions |
| membrane | #A3BE8C | #4A7A40 | semipermeable membrane |
| pitfall | #FFCDD2 | #C62828 | pitfalls box |
| boil / freeze | #C62828 / #1976D2 | same | ΔT_b / ΔT_f annotations |

### Scenes

1. `ideal-gas-law`: title, PV = nRT, concept statement "Models a gas of point particles with no intermolecular forces", 20 bouncing particles in a box (right), two numbered assumptions (left).
2. `real-gases`: High Pressure piston box squeezing 20 large particles; Low Temperature box where particles slow by 80 % and huddle into a hex cluster with dashed attraction lines.
3. `molality-vs-molarity` (step panels): molality = mol solute / kg solvent over a beaker on a balance ("Mass is constant"); molarity = mol solute / L solution over a heated beaker whose liquid level rises with a thermometer.
4. `colligative-properties`: concept statement "Depend on particle count, not identity"; 1 glucose gives 1 particle (i = 1) vs 1 NaCl gives Na⁺ + Cl⁻ (i = 2).
5. `vapour-pressure`: pure solvent vs solution beakers, 10 vs 4 rising vapour particles; P_solution = X_solvent · P°_solvent; P°(water, 25 °C) = 23.76 torr.
6. `boiling-freezing-points` (hero): qualitative phase diagram (pure solid lines, solution dashed), 1 atm line, ΔT_f and ΔT_b brackets at the computed crossings, "* Qualitative, not to scale"; equations ΔT_b = i·K_b·m, K_b = 0.512, ΔT_f = i·K_f·m, K_f = 1.86 °C·kg/mol.
7. `worked-example-freezing`: given 11.7 g NaCl in 500. g water; rows M, n, i = 2, m, ΔT_f; boxed T_f = 0.00 °C − 1.489 °C = −1.49 °C.
8. `osmosis-osmotic-pressure`: U-tube with membrane, levels shift towards the solution side, flow arrows; Π = iMRT; Π = 2 × 0.100 mol/L × 0.082057 L·atm/(mol·K) × 298.15 K = 4.89 atm.
9. `pitfalls`: red box with three items (kg of solvent; real i < ideal from ion pairing; solvent moves, not solute).
10. Closing card: five Key Takeaways.

### Build adjustments to the designer plan

- Narration: "van 't Hoff" written "vant Hoff" for TTS; "sodium chloride" added to the osmotic-pressure line (4.89 atm requires i = 2).
- Hero diagram sent back once (first version showed ΔT_f on a vapour-pressure plot with no solid phase); in the revision the solution triple point is moved onto the sublimation line and region, legend and axis labels are moved off curves.
- Worked-example rows reordered (i before m, ΔT_f on "freezing point becomes") so rows appear top to bottom in spoken order; T_f row shows the subtraction from the brief.
- Scene 1 shifted down to fit the concept statement; scene 3 adds the molarity fraction for parallelism; scene 8 adds "Pure water" / "Solution" labels and dark flow arrows for contrast.

## Status

- [x] Scope
- [x] Research
- [x] Design
- [x] Build
- [x] CI green: [run 39029988423](https://github.com/tharunkumar1177/nike-gen/actions/runs/39029988423) (after merging main), 6578 frames (219.3 s), all gaps 5–6 s
- [x] Merged

First run failed only on Prettier formatting (CI patch applied); narration lengths then calibrated from CI measurements. Stills were not reviewed visually (verification limited to the CI build, as for Lesson 7).
