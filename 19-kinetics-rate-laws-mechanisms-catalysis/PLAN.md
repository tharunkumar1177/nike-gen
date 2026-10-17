# Kinetics: Rate Laws, Mechanisms, Catalysis

Chemistry Foundations, Lesson 19.

## Scope

- Audience: first-year university general chemistry
- Length: about 3 to 5 minutes
- Format: 1920×1080 landscape, 30 fps, H.264 MP4
- Narration: Kokoro TTS generated in CI, with a quiet, softened synth pad (lower chord, quieter level) generated in code
- Framework: Remotion (React/TypeScript). Concentration–time graphs, collision particles, energy diagrams and step-by-step derivations are diagram, graph and text animation that suits Remotion.
- Font: IBM Plex Sans (Latin and Greek subsets) for all on-screen text.
- Scene title: bold ~80 px title (plus optional subtitle) at the top-left between two horizontal rules spanning the safe-area width; top rule on the 120 px top margin; title inset ~32 px from the rules' left end; ~16 px padding between each rule and the text; content starts at least 16 px below the bottom rule (see `wireframe.svg` on `main`).
- Required elements (ROADMAP): concept statement, hero diagram, step panels, at least one worked example, pitfalls box, key-takeaways card.
- Gap between topics within the video: 3 to 8 seconds.
- Deliverables: `out/19-kinetics-rate-laws-mechanisms-catalysis.mp4` and key frames in `out/stills/`

### Narrative requirements (user direction)

- Every move from one concept to the next says why the next concept is needed and how it connects to the one before (for example: a rate law tells us *what* the rate depends on, but not *why*; the mechanism answers that).
- The script sparks imagination and curiosity: open scenes with a question, puzzle or everyday observation, and let the definition arrive as the answer, rather than leading with definitions.

## Brief

Concept: a reaction rate is the change in concentration over time. A rate law, rate = k[A]^m[B]^n, says what the rate depends on; its orders are found by experiment, not read off the balanced equation. Collision theory says why: molecules must collide with enough energy (≥ Ea) and the right orientation, and the Arrhenius equation gives the temperature dependence. A mechanism shows how: a sequence of elementary steps whose slowest (rate-determining) step sets the observed rate law. A catalyst opens an alternative pathway with a lower Ea; it does not change ΔH or the equilibrium position.

### Definitions (sourced)

- Rate law and orders: rate related to reactant concentrations; orders may be zero or fractional and need not match coefficients. [OpenStax 12.3](https://openstax.org/books/chemistry-2e/pages/12-3-rate-laws)
- Collision theory: collisions need energy ≥ Ea and correct orientation. Arrhenius: k = A e^(−Ea/RT); higher T raises the fraction of collisions with enough energy. [OpenStax 12.5](https://openstax.org/books/chemistry-2e/pages/12-5-collision-theory)
- Mechanism: sequence of elementary steps; the slowest step is rate-determining and sets the rate law. Intermediates are produced then consumed. [OpenStax 12.6](https://openstax.org/books/chemistry-2e/pages/12-6-reaction-mechanisms)
- Catalyst: present at the start, takes part, is regenerated; provides an alternative mechanism with a lower Ea. Homogeneous (same phase) vs heterogeneous (different phase, e.g. a solid surface). [OpenStax 12.7](https://openstax.org/books/chemistry-2e/pages/12-7-catalysis)

### Values

| Quantity | Value | Source |
| --- | --- | --- |
| R | 8.314 J mol⁻¹ K⁻¹ | [OpenStax 12.5](https://openstax.org/books/chemistry-2e/pages/12-5-collision-theory) |
| Rule of thumb | "For many chemical processes, reaction rates are approximately doubled when the temperature is raised by 10 °C." | [OpenStax 12.2](https://openstax.org/books/chemistry-2e/pages/12-2-factors-affecting-reaction-rates) |
| 2 HI → H₂ + I₂ | Ea = 1.8 × 10⁵ J mol⁻¹ (180 kJ/mol); k rises from 3.52 × 10⁻⁷ (556 K) to 3.95 × 10⁻² L mol⁻¹ s⁻¹ (781 K) | [OpenStax 12.5, Example 12.6](https://openstax.org/books/chemistry-2e/pages/12-5-collision-theory) |

### Worked example 1: initial rates, 2 NO + Cl₂ → 2 NOCl ([OpenStax 12.3, Example 12.4](https://openstax.org/books/chemistry-2e/pages/12-3-rate-laws))

| Trial | [NO] (M) | [Cl₂] (M) | Rate (mol L⁻¹ s⁻¹) |
| --- | --- | --- | --- |
| 1 | 0.10 | 0.10 | 0.00300 |
| 2 | 0.10 | 0.15 | 0.00450 |
| 3 | 0.15 | 0.10 | 0.00675 |

- Cl₂: trial 2 / trial 1: 0.00450 / 0.00300 = 1.5 = 1.5ⁿ → n = 1
- NO: trial 3 / trial 1: 0.00675 / 0.00300 = 2.25 = 1.5ᵐ → m = 2
- rate = k[NO]²[Cl₂]; k = 0.00300 / ((0.10)²(0.10)) = 3.0 L² mol⁻² s⁻¹

### Worked example 2: mechanism predicts rate law ([OpenStax 12.6](https://openstax.org/books/chemistry-2e/pages/12-6-reaction-mechanisms))

- Overall NO₂ + CO → NO + CO₂; observed rate = k[NO₂]² (zero order in CO), below 225 °C.
- Step 1 (slow): NO₂ + NO₂ → NO₃ + NO. Step 2 (fast): NO₃ + CO → NO₂ + CO₂.
- Slow step gives rate = k₁[NO₂]², matching experiment; NO₃ is an intermediate.

### Decisions

- Catalysis wording: "provides an alternative pathway with a lower activation energy" (OpenStax 12.7), never "lowers the activation energy of the reaction"; the original barrier stays visible on screen.
- Integrated rate laws and half-life are out of scope (time).

### Misconceptions to correct

- Orders come from coefficients (they are found by experiment; matches are coincidence).
- Intermediates and catalysts are the same (intermediate: made then used up; catalyst: put in first, given back last).
- Hotter just means more collisions (the main effect is a larger fraction of collisions with energy ≥ Ea).
- A catalyst gives particles more energy or shifts equilibrium (it offers a lower-Ea path and speeds the approach to the same equilibrium).

### Teaching order, hooks and bridges

1. Rates and rate laws. Hook: "Food can spoil quickly when left on the kitchen counter. However, the lower temperature inside of a refrigerator slows that process so that the same food remains fresh for days." (OpenStax 12.2). Bridge: concentration matters, but by exactly how much?
2. Method of initial rates (worked example 1). Hook: in NO₂ + CO, adding more CO does not speed the reaction at all (OpenStax 12.6). Bridge: we can measure the rate law, but what happens physically to make the rate change?
3. Collision theory and Arrhenius. Hook: a match does not ignite on its own; it must be struck (OpenStax 12.5). Bridge: collisions need enough energy, but does a reaction happen in one big collision?
4. Mechanisms and the rate-determining step (worked example 2). Hook: "Cattle can only be moved from one holding pen to another as quickly as one animal can make its way through the chute." (OpenStax 12.6, Fig. 12.18). Bridge: if the slow step's barrier holds us back, can we go around it?
5. Catalysis. Hook: a car's catalytic converter uses a metal surface to convert toxic nitric oxide to nitrogen and oxygen and poisonous carbon monoxide to carbon dioxide (OpenStax 12.7).

## Design plan

Narration text lives in `audio/script.json`; on-screen cues are tied to spoken phrases via `src/cues.ts`. Scenes are laid end to end: each narrated scene lasts its clip length plus a 6 s gap; silent ~12 s closing card.

The narration is one connected story: scene 1 asks what controls how fast a reaction goes; each later scene opens by naming the question the previous one left open. The CO puzzle is planted in scene 2 and solved in scene 4; the match and fridge hooks are explained in scene 3; scene 5 ends on the four levers on rate.

### Style

Bright textbook: white background, IBM Plex Sans (Latin + Greek), type scale title 80 (bold) / heading 64 / body 48 / small 32, 120 px safe margin. Title band per `wireframe.svg`: rules at y 120 and y 248 from x 120 to 1800, title at x 152, content from y 264.

| Token | Hex | Role |
| --- | --- | --- |
| reactant | #1E40AF | reactants, uncatalysed path |
| product | #047857 | products |
| intermediate | #B45309 | intermediates (NO₃) |
| catalyst | #6D28D9 | catalyst, catalysed path |
| energy | #BE123C | Ea, energy, temperature |
| pitfallFill / pitfall | #F2DEDE / #D32F2F | pitfall boxes |
| text / lines | #1C1C1E | body text, title rules |

Glyphs outside the font subsets (≥, ≈, arrows, ⇌, Unicode sub/superscripts) are drawn in code or written in words ("at least Ea").

### Storyboard (scene id, title: cue phrase → what appears)

1. `rates-and-rate-laws`, "Rates and Rate Laws" (concept statement, hero graph): "A reaction rate is the change" → concept statement and concentration–time graph; "A rate law, rate equals" → rate = k[A]ᵐ[B]ⁿ; "cannot just be read from the coefficients" → pitfall "Orders are not coefficients (found by experiment)". Layout: graph left; statement and rate law right; pitfall bottom right.
2. `initial-rates`, "Method of Initial Rates" / "2 NO + Cl₂ → 2 NOCl" (worked example 1, step panels): "Strangely, adding more C O does not speed" → puzzle box "NO₂ + CO: adding CO does not speed it up"; "Let's test two N O plus" → 3-trial table; "Trial two has one point five times more C l two" → panel 1: Cl₂ ×1.5 → rate ×1.5 → n = 1; "Trial three has one point five times more N O" → panel 2: NO ×1.5 → rate ×2.25 = 1.5² → m = 2; "The rate equals k times" → panel 3: rate = k[NO]²[Cl₂], k = 3.0 L² mol⁻² s⁻¹. Layout: table at x 152; panels stacked at x 900.
3. `collision-theory`, "Collision Theory & Arrhenius": "molecules must physically collide" → particle animation (bounce-off vs reacting collision); "activation energy barrier, E a" → Ea label; "The Arrhenius equation shows" → k = A e^(−Ea/RT); "Hotter does not just mean" → pitfall "Hotter is not just more collisions: a larger fraction has at least Ea"; "raising the temperature by ten degrees" → "+10 °C: rate roughly doubles". Layout: particles top; equation x 152, y 600; pitfall y 800.
4. `reaction-mechanisms`, "Reaction Mechanisms" / "Rate-Determining Step" (worked example 2): "reactions happen in simple elementary steps" → overall NO₂ + CO → NO + CO₂; "the slow step is two N O two" → step 1 (slow) with rate = k₁[NO₂]²; "C O only appears in the fast second step" → step 2 (fast); "N O three is an intermediate" → NO₃ highlighted in intermediate colour. Layout: overall at top, steps stacked, rate callout right.
5. `catalysis`, "Catalysis": "opens a different, lower pathway" → energy diagram, original barrier then lower catalysed path (original stays, dashed), ΔH unchanged; "A catalyst is put in at the start" → "Catalyst: put in first, given back last."; "does not shift equilibrium or change the delta H" → pitfall "A catalyst is not an intermediate. It does not shift equilibrium or change ΔH." Layout: energy diagram left (x 152, y 280, 800 × 600); text and pitfall right.
6. Closing card "Key Takeaways": orders are found by experiment, not read from coefficients; an intermediate is made then consumed, a catalyst is put in first and given back last; hotter means a larger fraction of collisions have at least Ea, not just more collisions; catalysts offer a lower-Ea path and do not change ΔH or the equilibrium position.

### Narration

1. Imagine leaving food on the kitchen counter. It spoils quickly. But inside a refrigerator, the lower temperature slows that process so the same food remains fresh for days. What controls how fast a reaction goes, and can we control it? A reaction rate is the change in concentration over time. A rate law, rate equals k times A to the m times B to the n, tells us exactly what the rate depends on. But the orders, m and n, cannot just be read from the coefficients. They are found by experiment. So, how do we find them?
2. To find orders, we measure them. Imagine mixing N O two and C O. Strangely, adding more C O does not speed the reaction at all, even though they react one to one! We will solve this mystery later. Let's test two N O plus C l two. Trial two has one point five times more C l two, speeding the rate by one point five. First order! Trial three has one point five times more N O, speeding the rate by one point five squared. Second order! The rate equals k times N O squared times C l two. But physically, why does concentration change the rate?
3. Concentration matters because molecules must physically collide to react. But a match does not ignite on its own; it must be struck. Striking supplies energy. Collision theory says molecules need correct orientation and enough energy to get over the activation energy barrier, E a. The Arrhenius equation shows why the refrigerator works. Hotter does not just mean more collisions. It means a larger fraction of collisions have at least E a. As a rule of thumb, raising the temperature by ten degrees Celsius roughly doubles the rate! But does a complex reaction happen in one big collision?
4. Often, it does not. Like cattle moving through a chute one animal at a time, reactions happen in simple elementary steps called a mechanism. The slowest step is rate determining, setting the overall rate. Remember our mystery? For N O two plus C O, the slow step is two N O two molecules colliding to make N O three and N O. C O only appears in the fast second step. That is why adding C O cannot speed it up! N O three is an intermediate, produced then consumed. If the slow step's barrier holds us back, can we go around it?
5. We cannot remove the barrier, but a catalyst opens a different, lower pathway around it. A car's catalytic converter uses a metal surface to convert toxic nitric oxide to nitrogen and oxygen, and poisonous carbon monoxide to carbon dioxide. A catalyst is put in at the start, takes part, and is regenerated. Its pathway has a lower E a, but it does not shift equilibrium or change the delta H. Temperature, concentration, mechanism, and catalysts. These are your levers to control how fast a reaction goes.

### Frame-by-frame plans

Designer frame plans were implemented with the shared title band (`src/components/TitleBand.tsx`), content inside the 120 px safe margin, and motion keyed to the storyboard cues (15–20 frame drop/fade-ins with ease-out cubic, spring pops, path draw-ons, 30-frame crossfades).

- Scene 1: qualitative concentration–time graph (origin 160, 880; exponential reactant decay and product rise) with a dashed tangent and run/rise triangle; statement, rate law and pitfall in a right column at x 1000.
- Scene 2: puzzle box first, then it shrinks (0.7, 55 % opacity) to the bottom left as the table arrives; table at x 152 with cells for trial 1 vs 2 and trial 1 vs 3 highlighted in sync with panels 1 and 2 at x 980; panel 3 shows rate = k[NO]²[Cl₂] and the k calculation.
- Scene 3: two deterministic collision vignettes (repeating end-on bounce; aligned collision with an energy ring and colour change at "activation energy barrier, E a"); Arrhenius equation with Ea, T and R labels; colder vs hotter collision-energy distribution with the share beyond Ea shaded; rule-of-thumb tag; full-width pitfall.
- Scene 4: funnel with a continuous queue of dots passing one at a time through the neck; overall reaction, mystery box (solved with a drawn check), step 1 with predicted vs observed rate, step 2 with CO circled, NO₃ turning intermediate colour.
- Scene 5: energy diagram with the original barrier (dashed once the catalysed path draws), catalysed lower barrier, Ea arrows for both, ΔH arrow "unchanged"; converter callout, catalyst definition, pitfall, four lever chips.
- Closing card: four takeaways in the title-band layout.

### Build adjustments to the designer plans

- Subtitled scenes (2 and 4) grow the title band by one 48 px subtitle line instead of squeezing or side-placing the subtitle; content shifts down by the same amount.
- Text that would overflow at 48 px (panel maths, pitfalls, chips, table headers) is set at 28–40 px.
- The Arrhenius "A" label is omitted (not defined in the brief); "≥", "≈" and "==" are written as "at least", "roughly" and "match".
- Converter conversions are written "NO → N₂ and O₂", "CO → CO₂" (conversions, not balanced equations; the brief gives no equations).
- Scene 4's dashed NO₃ connector is replaced by the label "intermediate: made in step 1, used up in step 2"; the mystery box uses the reactant colour in both scenes 2 and 4 for continuity.

## Status

- [x] Scope
- [x] Research
- [x] Design
- [x] Build
- [ ] CI green
- [ ] Merged
