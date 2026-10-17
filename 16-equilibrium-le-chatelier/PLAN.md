# Equilibrium & Le Chatelier

Chemistry Foundations, Lesson 16.

## Scope

- Audience: first-year university general chemistry
- Length: about 3 minutes
- Format: 1920×1080 landscape, 30 fps, H.264 MP4
- Narration: Kokoro TTS generated in CI, with a quiet synth pad generated in code
- Framework: Remotion (React/TypeScript). Dynamic equilibrium, concentration–time graphs, K expressions, Q vs K and Le Chatelier shifts are diagram, graph and text animation that suits Remotion.
- Required elements (ROADMAP): concept statement, hero diagram, step panels, at least one worked example, pitfalls box, key-takeaways card.
- Gap between topics within the video: 3 to 8 seconds.
- Deliverables: `out/16-equilibrium-le-chatelier.mp4` and key frames in `out/stills/`

## Brief

Concept: reversible reactions reach dynamic equilibrium, where forward and reverse rates are equal and concentrations stay constant (but not equal). K is the ratio of products to reactants at equilibrium; Q compared with K predicts the direction of change. Le Chatelier's principle predicts how a stressed equilibrium shifts; only temperature changes K.

### Definitions (sourced)

- Dynamic equilibrium: forward and reverse reactions proceed at equal rates; concentrations stay constant; the reaction has not stopped and concentrations are not necessarily equal. [OpenStax 13.1](https://openstax.org/books/chemistry-2e/pages/13-1-chemical-equilibria)
- Equilibrium constant Kc: value of the reaction quotient at equilibrium; products over reactants, each raised to its coefficient; pure solids and liquids omitted. Kp uses partial pressures, Kp = Kc(RT)^Δn. [OpenStax 13.2](https://openstax.org/books/chemistry-2e/pages/13-2-equilibrium-constants)
- Magnitude: K ≫ 1 products favoured; K ≪ 1 reactants favoured. [OpenStax 13.2]
- Reaction quotient Q: same expression with current concentrations. Q < K shifts right (toward products); Q > K shifts left. [OpenStax 13.2]
- Le Chatelier's principle: a stressed equilibrium shifts to relieve the stress. [OpenStax 13.3](https://openstax.org/books/chemistry-2e/pages/13-3-shifting-equilibria-le-chateliers-principle)
  - Concentration: changes Q; adding reactant shifts right, removing reactant shifts left.
  - Volume/pressure: decreasing volume shifts toward fewer moles of gas; inert gas at constant volume causes no shift.
  - Temperature: the only factor that changes K; treat heat as a reactant (endothermic) or product (exothermic).
  - Catalyst: speeds both directions equally; equilibrium reached faster; K and equilibrium concentrations unchanged.

### Values

| Quantity | Value | Source |
| --- | --- | --- |
| Hero system | N₂O₄(g, colourless) ⇌ 2 NO₂(g, brown) | OpenStax 13.1 |
| ΔH° | +57.2 kJ/mol (endothermic) | [LibreTexts 2.6](https://chem.libretexts.org/Courses/University_of_Wisconsin_Oshkosh/Chem_370%3A_Physical_Chemistry_1_-_Thermodynamics_(Gutow)/02%3A_Chemical_Equilibria/2.06%3A_Equilibrium_Dependence_on_Conditions); consistent with NIST ΔfH° (2 × 33.18 − 9.16) |

### Worked example: N₂O₄ ⇌ 2 NO₂, 0.050 mol N₂O₄ in 1.0 L, [NO₂]eq = 0.016 M

- Initial: [N₂O₄] = 0.050 M, [NO₂] = 0 M
- Change: −x, +2x; 2x = 0.016 M, so x = 0.008 M
- Equilibrium: [N₂O₄] = 0.050 − 0.008 = 0.042 M, [NO₂] = 0.016 M
- Kc = (0.016)² / 0.042 = 0.000256 / 0.042 = 0.0060952… → 6.1 × 10⁻³ (2 s.f.)
- Q check (Le Chatelier link): adding N₂O₄ raises the denominator so Q < K and the system shifts right.

### Decisions

- Source conflict: thermodynamic data give Kc ≈ 5.8 × 10⁻³ at 25 °C, the textbook-style data above give 6.1 × 10⁻³. The video presents the example as measured data "at a fixed temperature" and never states a reference K at 25 °C, so no disputed value appears on screen.

### Misconceptions to correct

- Equilibrium does not mean equal concentrations; it means equal rates.
- The reaction does not stop; both directions keep running.
- Le Chatelier does not restore the original concentrations; Q returns to K with a new set of concentrations.
- Adding a pure solid or liquid does not shift the equilibrium.
- A catalyst does not shift the equilibrium; it only gets there faster.

### Teaching order

1. Dynamic equilibrium: rates equalise, concentrations constant but unequal.
2. Kc expression (solids/liquids omitted, Kp note).
3. Magnitude of K.
4. Worked ICE example for N₂O₄ ⇌ 2 NO₂.
5. Q vs K.
6. Le Chatelier: concentration, volume (fewer gas moles), inert gas.
7. Temperature (changes K) and catalysts (no shift).

## Design plan

Narration text lives in `audio/script.json`; on-screen cues are tied to spoken phrases via `src/cues.ts`.

### Timing

Scenes are laid end to end by `src/timeline.ts`: each narrated scene lasts its declared clip length (`seconds` in `audio/script.json`) plus a 180-frame gap; narration starts 30 frames in, so consecutive lines are separated by 6 s of silence. `audio/generate.js` fails CI if any gap leaves 3–8 s. 30-frame crossfades; silent 360-frame closing card.

### Style

Bright textbook: white background, Roboto (latin + greek for Δ), type scale 96 / 64 / 48 / 32, 120 px safe margin. ⇌, ≫ and ≪ are drawn as SVG.

| Token | Fill | Text | Role |
| --- | --- | --- | --- |
| n2o4 | #ECEFF4 | #4C566A | N₂O₄ (colourless) |
| no2 | #D08770 | #8F3B26 | NO₂ (brown) |
| forward | #A3BE8C | #4A7A40 | forward rate, shift right |
| reverse | #88C0D0 | #2B7992 | reverse rate, shift left |
| kq | #B48EAD | #7C5375 | K and Q |
| heat | #EBCB8B | #8F6B2E | heat, endothermic |
| pitfall | #F2DEDE | #D32F2F | pitfall boxes |

### Scenes

1. `dynamic-equilibrium` (hero): "Dynamic Equilibrium"; concept statement "Forward and reverse rates are equal. Concentrations are constant."; N₂O₄ ⇌ 2 NO₂ with forward (green) and reverse (blue) rate arrows converging to equal length on "rates become equal", pulsing on "reaction does not stop"; concentration–time graph draws on "not necessarily equal" (N₂O₄ 0.050 → 0.042 M, NO₂ 0 → 0.016 M, flat at different heights).
2. `kc-expression`: Kc = [NO₂]² / [N₂O₄] on "ratio of product concentrations"; exponent pulses on "raised to its coefficient"; pitfall "Pure solids and liquids do not appear in K. Adding them does not shift the equilibrium." on "always omitted"; Kp = Kc(RT)^Δn on "partial pressures".
3. `magnitude-of-k`: balance (reactants left, products right) tips right with "K ≫ 1: products favoured" on "much greater than one", then left with "K ≪ 1: reactants favoured" on "much less than one".
4. `ice-table` (worked example): I / C / E rows for [N₂O₄] and [NO₂]: 0.050 / 0 on "zero point zero five zero", 0.016 on "zero point zero one six", −0.008 / +0.016 and 0.042 on "Calculating the changes"; Kc = (0.016)² / 0.042 = 6.1 × 10⁻³ on "six point one".
5. `reaction-quotient`: Qc expression on "exact same expression"; "Q < K: shifts right" (green) and "Q > K: shifts left" (blue) on their phrases.
6. `le-chatelier-concentration`: hero graph at equilibrium; N₂O₄ spikes on "Adding N two O four"; "Q < K, shifts right" on "making Q less than K"; curves settle at new levels (computed from Kc) with dashed old levels; pitfall "Original concentrations are not restored." on "without restoring".
7. `le-chatelier-volume`: "1 mol gas ⇌ 2 mol gas" under the equation, left side highlighted with leftward shift arrow on "fewer moles"; "Inert gas at constant volume: no shift" on "adding an inert gas".
8. `temperature-catalyst`: "Heat + N₂O₄ ⇌ 2 NO₂", ΔH° = +57.2 kJ/mol on "only factor that changes K"; flask tints colourless → brown on "Adding heat shifts it right"; "Catalyst: reaches equilibrium faster" on "speeds up both directions"; pitfall "A catalyst does not shift the equilibrium." on "without shifting".
9. Closing card: "Key Takeaways" with four bullets (equal rates not equal concentrations; K ratio and Q direction; Le Chatelier; only temperature changes K).

## Status

- [x] Scope
- [ ] Research
- [ ] Design
- [ ] Build
- [ ] CI green
- [ ] Merged
