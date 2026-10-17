# Thermodynamics: Enthalpy, Entropy, Gibbs

Chemistry Foundations, Lesson 15.

## Scope

- Audience: first-year university general chemistry
- Length: about 4 minutes (user-approved extension of the 3-minute default; the topic is dense)
- Format: 1920×1080 landscape, 30 fps, H.264 MP4
- Narration: Kokoro TTS generated in CI, with a quiet synth pad generated in code
- Framework: Remotion (React/TypeScript). The lesson is a narrated explainer built from energy diagrams, a Hess's-law cycle, entropy particle visuals and a ΔG sign-case grid, all diagram and text animation that suits Remotion.
- Coverage (user decision, core only): enthalpy (ΔH, exo/endothermic, Hess's law), entropy (ΔS), Gibbs free energy (ΔG = ΔH − TΔS, the four sign cases), worked example. Calorimetry and ΔG° = −RT ln K are out of scope.
- Required elements (ROADMAP): concept statement, hero diagram, step panels, at least one worked example, pitfalls box, key-takeaways card.
- Gap between topics within the video: 3 to 8 seconds.
- Deliverables: `out/thermodynamics-enthalpy-entropy-gibbs.mp4` and key frames in `out/stills/`

## Brief

Concept: enthalpy (heat at constant pressure) and entropy (dispersal of energy and matter) both decide whether a process is spontaneous. Gibbs free energy combines them, ΔG = ΔH − TΔS, into one criterion for the system at constant T and P: ΔG < 0 means spontaneous.

### Definitions (sourced)

- Enthalpy H = U + PV; at constant pressure ΔH = q_p, the heat exchanged. [OpenStax Chemistry 2e 5.3](https://openstax.org/books/chemistry-2e/pages/5-3-enthalpy)
- State function: depends only on the current state, not the path. H, S and G are state functions. [OpenStax 5.3]
- System vs surroundings: the system is the part being studied; the surroundings are everything else. [OpenStax 5.1](https://openstax.org/books/chemistry-2e/pages/5-1-energy-basics)
- Exothermic ΔH < 0 (heat released to surroundings); endothermic ΔH > 0 (heat absorbed). [OpenStax 5.3]
- Standard enthalpy of formation ΔH°f: enthalpy change when 1 mol of a substance forms from its elements in their standard states (1 bar); zero for elements in standard state. [OpenStax 5.3]
- Hess's law: if a process is the sum of steps, its ΔH is the sum of the steps' ΔH. [OpenStax 5.3]
- Entropy S: a measure of the dispersal of matter and/or energy among the available microstates (S = k ln W). [OpenStax 16.2](https://openstax.org/books/chemistry-2e/pages/16-2-entropy)
- Entropy increases solid → liquid → gas, and when the number of moles of gas increases. [OpenStax 16.2]
- Second law: every spontaneous change increases the entropy of the universe, ΔS_univ = ΔS_sys + ΔS_surr > 0. [OpenStax 16.3](https://openstax.org/books/chemistry-2e/pages/16-3-the-second-and-third-laws-of-thermodynamics)
- Gibbs free energy G = H − TS; at constant T and P, ΔG = ΔH − TΔS; ΔG < 0 spontaneous, ΔG > 0 non-spontaneous (reverse is spontaneous), ΔG = 0 at equilibrium. [OpenStax 16.4](https://openstax.org/books/chemistry-2e/pages/16-4-free-energy)
- Four sign cases [OpenStax 16.4, Table 16.3]:
  - ΔH < 0, ΔS > 0: spontaneous at all temperatures
  - ΔH > 0, ΔS < 0: non-spontaneous at all temperatures
  - ΔH < 0, ΔS < 0: spontaneous at low temperature
  - ΔH > 0, ΔS > 0: spontaneous at high temperature
- Crossover temperature (ΔG = 0): T = ΔH / ΔS, assuming ΔH and ΔS roughly independent of T. [OpenStax 16.4]

### Values ([OpenStax Appendix G](https://openstax.org/books/chemistry-2e/pages/g-standard-thermodynamic-properties-for-selected-substances), 298.15 K, 1 bar; agree with NIST WebBook)

| Substance | ΔH°f (kJ/mol) | S° (J/(K·mol)) |
| --- | --- | --- |
| N₂(g) | 0 | 191.6 |
| H₂(g) | 0 | 130.7 |
| NH₃(g) | −45.9 | 192.8 |
| C(s, graphite) | 0 | — |
| CO(g) | −110.52 | — |
| CO₂(g) | −393.51 | — |

### Hess's law illustration

- C(s) + ½ O₂(g) → CO(g), ΔH° = −110.52 kJ
- CO(g) + ½ O₂(g) → CO₂(g), ΔH° = −282.99 kJ (= −393.51 − (−110.52))
- Sum: C(s) + O₂(g) → CO₂(g), ΔH° = −393.51 kJ

### Worked example: N₂(g) + 3 H₂(g) → 2 NH₃(g)

- ΔH° = 2(−45.9) − [0 + 0] = −91.8 kJ (exothermic)
- ΔS° = 2(192.8) − [191.6 + 3(130.7)] = 385.6 − 583.7 = −198.1 J/K (4 mol gas → 2 mol gas, entropy falls)
- Convert: −198.1 J/K = −0.1981 kJ/K
- ΔG° (298 K) = −91.8 − (298.15)(−0.1981) = −91.8 + 59.06 = −32.7 kJ → spontaneous at room temperature (cross-check: 2 × ΔG°f(NH₃) = 2(−16.5) = −33.0 kJ; difference is table rounding)
- Crossover: T = ΔH° / ΔS° = (−91.8) / (−0.1981) = 463 K (≈ 190 °C); above it ΔG° > 0
- Case: ΔH < 0, ΔS < 0, spontaneous only at low temperature
- Approximation: ΔH° and ΔS° treated as temperature-independent.

### Misconceptions to correct

- Spontaneous does not mean fast; thermodynamics says whether, not how quickly. [OpenStax 16.1]
- Exothermic does not guarantee spontaneous (ammonia: exothermic, but non-spontaneous above 463 K).
- ΔS_sys can be negative in a spontaneous process (water freezing below 0 °C) because ΔS_surr compensates. [OpenStax 16.3]
- Entropy is dispersal of energy and matter, not just "disorder".
- ΔS is tabulated in J/K but ΔH in kJ; convert before using ΔG = ΔH − TΔS. T must be in kelvin.

### Decisions

- Worked example switched from CaCO₃ decomposition to ammonia synthesis (user decision): OpenStax (−1220.0 kJ/mol, 110.0 J/(K·mol)) and NIST/CRC (≈ −1207.6, 91.7) disagree on CaCO₃, changing the crossover by > 200 K. Ammonia values agree across sources.

### Teaching order

1. System, surroundings, state functions; ΔH, exo vs endo (energy diagram).
2. Hess's law (C → CO → CO₂ cycle).
3. Entropy as dispersal over microstates; predicting ΔS sign.
4. Second law: ΔS_univ > 0.
5. Gibbs: ΔG = ΔH − TΔS; sign means spontaneity.
6. Four sign cases grid (hero diagram) and crossover temperature.
7. Worked example: ammonia synthesis.
8. Pitfalls; key takeaways.

## Design plan

Narration text lives in `audio/script.json`; on-screen cues are tied to spoken phrases via `src/cues.ts`.

### Timing

Scenes are laid end to end by `src/timeline.ts`: each narrated scene lasts its clip length (`seconds` in `audio/script.json`) plus a 180-frame gap, and narration starts 30 frames into each scene, so consecutive lines are separated by 6 s of silence. In CI, `audio/generate.js` measures every Kokoro clip and writes the measured lengths back into `script.json` before rendering, so the committed `seconds` values are estimates for preview only. 30-frame crossfades; silent 360-frame closing card.

### Style

Bright textbook: white background, Roboto, type scale 96 / 64 / 48 / 32, 120 px safe margin.

| Token | Fill | Text | Role |
| --- | --- | --- | --- |
| enthalpy | #FFCDD2 | #B71C1C | enthalpy, heat |
| entropy | #C8E6C9 | #2E7D32 | entropy |
| gibbs | #BBDEFB | #1565C0 | Gibbs free energy |
| exothermic | #FFE0B2 | #B23C00 | exothermic |
| endothermic | #E1BEE7 | #6A1B9A | endothermic |
| spontaneous | #B2DFDB | #00695C | spontaneous |
| nonSpontaneous | #FFCCBC | #BF360C | non-spontaneous |
| pitfall | #FFCDD2 | #D32F2F | pitfalls box |

(Exothermic text darkened from the designer's #D84315, which measured 4.45:1 on white, to #B23C00 for AA.)

### Scenes (storyboard)

1. `system-surroundings-enthalpy`: title "Thermodynamics"; system box with heat arrows to/from surroundings; "ΔH = heat at constant pressure"; Exothermic (ΔH < 0) / Endothermic (ΔH > 0).
2. `hess-law`: "Hess's Law"; energy levels C(s) + O₂(g) → CO(g) + ½ O₂(g) → CO₂(g) vs the direct path; −110.52 + (−282.99) = −393.51 kJ.
3. `entropy`: "Entropy (ΔS)"; particles disperse solid → liquid → gas; "Dispersal of matter and energy"; more moles of gas → ΔS > 0.
4. `second-law`: "Second Law"; ΔS_univ = ΔS_sys + ΔS_surr > 0; freezing example (ΔS_sys < 0, ΔS_surr larger and positive).
5. `gibbs-free-energy`: "Gibbs Free Energy"; ΔG = ΔH − TΔS builds; ΔG < 0 spontaneous, ΔG = 0 equilibrium, ΔG > 0 non-spontaneous.
6. `four-sign-cases` (hero): 2×2 grid ΔH sign × ΔS sign with the four outcomes from the brief.
7. `worked-example-enthalpy-entropy`: N₂ + 3 H₂ → 2 NH₃; ΔH° = 2(−45.9) = −91.8 kJ; ΔS° = 385.6 − 583.7 = −198.1 J/K.
8. `worked-example-gibbs`: −198.1 J/K = −0.1981 kJ/K highlighted; ΔG° = −91.8 − (298.15)(−0.1981) = −32.7 kJ; Spontaneous badge.
9. `crossover-temperature`: T = ΔH°/ΔS° = −91.8 / −0.1981 = 463 K; temperature scale split at 463 K.
10. `pitfalls`: red Pitfalls box: spontaneous is not fast; exothermic is not always spontaneous; convert J to kJ, T in kelvin.
11. Closing card "Key Takeaways".

Frame-level layouts and cue phrases were supplied per scene by the designer and are implemented in `src/scenes/` (each cue is a phrase from `audio/script.json`, resolved by `src/cues.ts`).

### Build adjustments to the designer plan

- Cue phrases for scenes 1–5 were sent back once because they did not match the narration; the revised cues are used.
- Hess diagram shifted 60 px right so the direct-path label stays inside the safe margin.
- Second-law note reads "liquid becomes solid" rather than "becomes more ordered" (the brief rejects the disorder framing).
- Added `temperatureDependent` token (#FFF9C4 / #8A5A00); the designer's #F57F17 text failed contrast.
- Sign-case grid widened to 2 × 680 px cells so "Non-spontaneous at all T" fits.
- Worked-example panels show the brief's intermediate steps (S° substitution; −91.8 + 59.06).
- Closing-card bullets shortened to fit the card.
- Badges use the token fill with a text-colour outline; Roboto loads the Greek subset for Δ.
- `audio/generate.js` writes measured clip lengths back into `script.json` before rendering, so gaps are always 6 s.

## Status

- [x] Scope
- [x] Research
- [x] Design
- [x] Build
- [ ] CI green
- [ ] Merged
