# Matter, States, Phase Diagrams

Chemistry Foundations, Lesson 1.

## Scope

- Audience: first-year university general chemistry
- Length: about 3 minutes
- Format: 1920×1080 landscape, 30 fps, H.264 MP4
- Narration: Kokoro TTS generated in CI, with a quiet synth pad generated in code
- Framework: Remotion (React/TypeScript). The lesson is a narrated explainer built from animated particle models, a plotted phase diagram, and kinetic labels, which suits Remotion's React-driven chart and text animation.
- Deliverables: `out/matter-states-phase-diagrams.mp4` and key frames in `out/stills/`

## Brief

Concept: temperature and pressure compete with intermolecular forces (IMFs) to decide a substance's state; a phase diagram maps that contest in (T, P).

### Definitions (sourced)

- Matter: anything with mass that occupies space. Pure substances (elements, compounds) have constant composition; mixtures are physical combinations of two or more pure substances. [OpenStax 1.2](https://openstax.org/books/chemistry-2e/pages/1-2-phases-and-classification-of-matter)
- Solid: particles vibrate about fixed positions; definite shape and volume; IMFs dominate kinetic energy.
- Liquid: particles close but free to slide past each other; definite volume, takes the container's shape.
- Gas: particles far apart, rapid random motion, interact mainly by collisions; fills its container. [OpenStax 1.2]
- Phase changes. Endothermic: melting (s→l), vaporization (l→g), sublimation (s→g). Exothermic: freezing (l→s), condensation (g→l), deposition (g→s). [OpenStax 10.3](https://openstax.org/books/chemistry-2e/pages/10-3-phase-transitions)
- Heating curve: temperature vs heat added. Slopes = heat raises particle kinetic energy. Plateaus = heat goes into overcoming IMFs (potential energy), so temperature stays constant until the phase change completes. [OpenStax 10.3]
- Phase diagram: P vs T. Regions = single stable phase; curves = two phases in equilibrium; triple point = all three coexist; below triple-point pressure no liquid exists. The liquid–gas curve ends at the critical point; above Tc and Pc there is a single supercritical fluid. Normal melting/boiling points are where the 1 atm line crosses the curves. [OpenStax 10.4](https://openstax.org/books/chemistry-2e/pages/10-4-phase-diagrams)
- Water's solid–liquid line slopes negative because ice is less dense than liquid water (open hydrogen-bonded lattice); raising pressure favours the denser liquid. CO2's slopes positive. [OpenStax 10.4]
- Plasma: omitted (ionization, not IMFs; not on standard P–T diagrams).

### Values

| Quantity | Water | CO2 | Source |
| --- | --- | --- | --- |
| Triple point | 0.01 °C (273.16 K), 611.657 Pa (0.00604 atm) | −56.6 °C (216.59 K), 5.185 bar (5.12 atm) | [NIST WebBook](https://webbook.nist.gov/cgi/cbook.cgi?ID=C124389&Mask=4) |
| Critical point | 373.95 °C (647.096 K), 22.064 MPa (217.8 atm) | 30.98 °C (304.13 K), 7.377 MPa (72.8 atm) | IAPWS-95; Span–Wagner via [NIST fluid](https://webbook.nist.gov/chemistry/fluid/) |
| Normal melting point | 0 °C | — (sublimes at 1 atm) | OpenStax 10.3 |
| Normal boiling point | 100 °C (ITS-90 measurement: 99.974 °C) | — | OpenStax 10.3; NIST |
| Sublimation at 1 atm | — | −78.5 °C (194.69 K) | NIST |
| ΔH fus | 6.01 kJ/mol (OpenStax App. E: 6.088) | — | OpenStax 10.3 |
| ΔH vap | 40.7 kJ/mol at 100 °C | — | OpenStax 10.3 |

### Misconceptions to correct

- "No heat enters during a plateau": heat flows constantly; it changes potential energy, not temperature.
- "Ice, water and steam are different substances": same H2O molecules throughout; only arrangement and motion change.
- "Boiling point is fixed": it depends on pressure; 100 °C is the value at 1 atm.
- "Dry ice subliming is special": 1 atm lies below CO2's triple-point pressure (5.12 atm), so liquid CO2 cannot exist at 1 atm.
- "Bubbles in boiling water are air" and "visible steam is gas": bubbles are water vapour; the visible cloud is condensed droplets.

### Decisions

- Show water's normal boiling point as 100 °C (textbook convention).
- Keep enthalpy values off screen and out of narration.
- Round on screen: CO2 critical point ≈ 31 °C, 73 atm; CO2 triple point −56.6 °C, 5.1 atm; water critical point 374 °C, 218 atm.

### Teaching order

1. Matter: mass and volume; pure substances vs mixtures.
2. Three states at the particle level, same molecules throughout.
3. Six phase changes, grouped endothermic vs exothermic.
4. Water heating curve; plateaus at 0 °C and 100 °C explained by energy routing to IMFs.
5. Phase diagram anatomy: axes, regions, curves, 1 atm line.
6. Triple point and critical point; supercritical fluid.
7. Water vs CO2: negative vs positive melting slope; why dry ice sublimes at 1 atm.

## Design plan

### Visual style

- 1920×1080, 30 fps, 5400 frames (180 s). Kokoro `af_heart` narration plus code-generated pad.
- Background `#FFFFFF`; text `#1C1C1E`; axes `#4C566A`; grid `#E5E9F0`.
- States: solid `#5E81AC`, liquid `#A3BE8C`, gas `#D08770`; accent `#BF616A`.
- Phase-change arrows: endothermic `#C62828`, exothermic `#4A148C`.
- Type: Roboto (Google Fonts). Title 96 px / 700, subtitle 64 px, body 48 px / 400, labels and ticks 32 px / 500.
- Safe margin 120 px. 30-frame crossfade between scenes.
- Scenes 5–7 phase diagrams are schematic (not to scale); scenes 5–6 use water's shape.

### Storyboard and narration

| Scene | Frames | Narration window |
| --- | --- | --- |
| 1 `intro-matter` | 0–600 | 30–570 |
| 2 `states-particles` | 600–1500 | 630–1470 |
| 3 `phase-changes` | 1500–2100 | 1530–2070 |
| 4 `heating-curve` | 2100–2910 | 2130–2880 |
| 5 `phase-diagram-anatomy` | 2910–3690 | 2940–3660 |
| 6 `critical-triple-points` | 3690–4410 | 3720–4380 |
| 7 `water-vs-co2` | 4410–5100 | 4440–5100 |
| 7b `closing-card` | 5100–5400 | silent |

1. Title "Matter, States & Phase Diagrams"; tree "Matter" → "Pure Substances" / "Mixtures".
   "Everything around us is matter: anything with mass that occupies space. Matter includes pure substances with a constant composition, and mixtures, which are physical combinations of two or more pure substances."
2. Three circular viewports "Solid", "Liquid", "Gas": lattice vibrating; touching particles sliding; sparse fast particles bouncing off walls.
   "Matter exists in three states. In a solid, intermolecular forces dominate. Particles vibrate in fixed positions, giving definite shape and volume. In a liquid, particles slide past each other, taking the container's shape. In a gas, particles are far apart in rapid, random motion, filling the container."
3. Viewports form a triangle. Endothermic arrows "Melting", "Vaporization", "Sublimation"; exothermic arrows "Freezing", "Condensation", "Deposition".
   "Heat transfer drives phase changes. Adding heat causes endothermic changes: melting, vaporization, or sublimation into gas. Removing heat causes exothermic changes: freezing, condensation, or deposition into solid."
4. Plot, x "Heat Added", y "Temperature (°C)", ticks "0" and "100". Curve: slope, plateau at 0, slope, plateau at 100, slope; plateaus highlighted.
   "A heating curve plots temperature against heat added. Slopes show heat raising kinetic energy. During plateaus at zero and one hundred degrees Celsius, temperature stays constant. Heat goes into overcoming intermolecular forces, raising potential energy until the phase change finishes."
5. Plot, x "Temperature", y "Pressure". Curves draw, regions fill "Solid", "Liquid", "Gas". Dashed "1 atm" line; points "Normal melting point", "Normal boiling point".
   "A phase diagram plots pressure against temperature. Regions show where a single phase is stable. Boundary curves are equilibrium states where two phases perfectly coexist. A line at one atmosphere crosses the curves at the normal melting and boiling points."
6. Same diagram. "Triple point" dot; "Critical point" dot at end of liquid–gas curve; region beyond shaded "Supercritical fluid".
   "The curves meet at the triple point, where all three phases coexist. The liquid-gas curve ends at the critical point. Above this is a single supercritical fluid. Below the triple-point pressure, no liquid can exist."
7. Water diagram shrinks left: critical point "374 °C, 218 atm", normal boiling point "100 °C". CO2 diagram right: critical point "31 °C, 73 atm", triple point "−56.6 °C, 5.1 atm". Slopes highlighted (negative vs positive). CO2's "1 atm" line passes solid → gas, labelled "Sublimation".
   "Water's solid-liquid curve slopes negative because ice is less dense than water. Carbon dioxide's slope is positive. Its triple point is five point one atmospheres. Since one atmosphere is well below this, dry ice sublimes directly into gas."
7b. Card "Key Takeaways": "Phase depends on temperature, pressure, and intermolecular forces." / "Plateaus show energy overcoming forces, not raising temperature." / "Boundary curves map exact states of two-phase equilibrium."

### Stills

Frames 450, 1250, 1800, 2500, 3460, 4200, 4980, 5250 (moved later from the designer's list so each scene has finished building).

### Frame-by-frame

Delivered by `designer` in four sequences (scenes 1–2, 3–4, 5–6, 7–7b); the exact coordinates and timings live in `src/scenes/*` and `src/components/phases.ts`. Summary:

- Scene 1: title slides up 0–30; "Matter" springs at 40; branches draw 150–180 and 280–310 to "Pure Substances" (x 500) and "Mixtures" (x 1420).
- Scene 2: three 400 px viewports at y 460 (x 400/960/1520). Solid: 61-site hex lattice, 30 px spacing, 3 px vibration. Liquid: 55 particles, soft-collision simulation pooled at the bottom, ≤2 px/frame. Gas: 15 particles at 10 px/frame with elastic wall bounces. All motion is precomputed deterministically.
- Scene 3: viewports at 0.6 scale in a triangle (gas 960,240; solid 660,760; liquid 1260,760); six arrows drawn on as narration names them.
- Scene 4: plot 240–1680 × 240–840, −50 to 150 °C; curve draws 30–126; plateau highlights at 234 (0 °C) and 270 (100 °C).
- Scenes 5–6: water schematic in plot 300–1620 × 200–880; triple point (696, 676), critical point (1356, 336), 1 atm at y 540.
- Scene 7: water diagram springs to a 0.56-scale left panel; CO2 builds on the right (triple point above its 1 atm line); sublimation arrow at 420–450. The card slides up at 5100.

Implementation deviations (geometry fixes, no content change):

- Normal melting and boiling points are computed where the 1 atm line actually crosses each curve, rather than at the plan's estimated x.
- Scene 3 labels are rotated along their arrows, on the side away from the opposite process, so they don't overlap their own arrows or each other. The "Gas" label sits right of its viewport, inside the safe margin. I added an endothermic/exothermic colour legend at the top left so the arrow colours are explained.
- Scene 4 "Gas" label moved to (1545, 300) to clear the curve; the y-axis title sits at x 140, inside the safe margin.
- Scenes 5–7 run as one continuous sequence, so water shrinks into the comparison without a cut. Scene 7 coordinates were converted into the shared diagram space; scene 7 labels are drawn at 32 px in screen space and placed to avoid collisions.
- Closing-card bullets wrap to two lines inside the 1200 px card.
- Measured Kokoro narration runs at about 138 wpm; every line fits its window (longest: scene 2, 20.7 s). Re-synced from those timings: "Mixtures" now enters at 270; scene 6 supercritical edges at 360, label at 400, triple-point band at 420, band label at 450.
- Review fixes after the first render: water "1 atm" label moved below the line; scene 7 water critical-point label sits above-left of its point, and the CO2 critical-point label sits below-right with a leader line; CO2 "1 atm" label moved to the right end of its line; heating-curve "Solid" and "Liquid" labels moved off the curve.

## Status

- [x] Scope confirmed
- [x] Brief
- [x] Design plan
- [x] Build (first pass)
- [ ] CI green, stills reviewed
- [ ] Merged
