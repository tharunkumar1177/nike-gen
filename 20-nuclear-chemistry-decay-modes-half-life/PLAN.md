# Nuclear Chemistry: Decay Modes, Half-Life

Chemistry Foundations, Lesson 20.

## Scope

- Audience: first-year university general chemistry
- Length: about 3–5 minutes
- Format: 1920×1080 landscape, 30 fps, H.264 MP4
- Narration: Kokoro TTS generated in CI, with a quiet, softened synth pad (lower chord, quieter level) generated in code
- Framework: Remotion (React/TypeScript), per `style.md`. Nuclide symbols, decay equations, a band-of-stability chart and computed exponential decay curves are diagram, graph and text animation that suits Remotion.
- Font: IBM Plex Sans, Latin and Greek subsets (α, β, γ, λ, ν).
- Scene titles: top-left between two horizontal rules per `wireframe.svg` (80 px bold title, rules at the safe margin, content from y 264).
- Required elements (ROADMAP): concept statement, hero diagram, step panels, at least one worked example, pitfalls box, key-takeaways card.
- Gap between topics within the video: 3 to 8 seconds.
- Deliverables: `out/20-nuclear-chemistry-decay-modes-half-life.mp4` and key frames in `out/stills/`

### Narrative direction (user request)

- Each transition between concepts says why the next concept is needed and how it connects to the one just shown, so the lesson reads as one chain of questions rather than a list of topics.
- The script provokes imagination and curiosity (a question, a puzzle, a vivid image or a surprising fact from the brief) before it defines anything; definitions follow as the answer.

## Brief

Concept: a nucleus balances the strong nuclear force against proton–proton repulsion. Nuclei with the wrong neutron-to-proton ratio, or too many protons (Z > 83), are unstable and emit particles or energy to move toward the band of stability. Single nuclei decay at random, but a large sample decays at a predictable first-order rate set by its half-life.

### Definitions (sourced)

- Band of stability: stable nuclei lie in a narrow band of n/p ratios; n/p ≈ 1 for light nuclei (Z < 20), rising to ≈ 1.5 for heavy nuclei; every nucleus with Z > 83 is radioactive. [OpenStax 21.1](https://openstax.org/books/chemistry-2e/pages/21-1-nuclear-structure-and-stability)
- Nuclear equations conserve mass number A and atomic number Z. [OpenStax 21.2](https://openstax.org/books/chemistry-2e/pages/21-2-nuclear-equations)
- Alpha (α): emits ⁴₂He; A − 4, Z − 2; typical of heavy nuclei (Z > 83). [OpenStax 21.3](https://openstax.org/books/chemistry-2e/pages/21-3-radioactive-decay)
- Beta-minus (β⁻): a neutron becomes a proton and emits ⁰₋₁e, created at the moment of decay; Z + 1, A unchanged; nuclei above the band (neutron-rich). [OpenStax 21.3]
- Positron (β⁺): a proton becomes a neutron and emits ⁰₊₁e; Z − 1, A unchanged; nuclei below the band (proton-rich). [OpenStax 21.3]
- Electron capture: the nucleus absorbs an inner-shell electron, turning a proton into a neutron; Z − 1, A unchanged; proton-rich nuclei. [OpenStax 21.3]
- Gamma (γ): a high-energy photon ⁰₀γ; A and Z unchanged; the excited nucleus releasing energy, usually after another decay. [OpenStax 21.3]
- Penetration: α stopped by paper, β by thin aluminium, γ needs thick lead or concrete. [OpenStax 21.6](https://openstax.org/books/chemistry-2e/pages/21-6-biological-effects-of-radiation)
- Half-life t½: time for half the nuclei in a sample to decay; first order, N = N₀e^(−kt), k = 0.693 / t½; independent of starting amount, temperature and pressure. [OpenStax 21.3]

### Values

| Mode | Equation | Half-life | Source |
| --- | --- | --- | --- |
| α | ²³⁸₉₂U → ²³⁴₉₀Th + ⁴₂He | 4.5 × 10⁹ y | OpenStax 21.3 |
| β⁻ | ¹⁴₆C → ¹⁴₇N + ⁰₋₁e | 5730 y | OpenStax 21.3 |
| β⁺ | ¹⁸₉F → ¹⁸₈O + ⁰₊₁e | 1.83 h | [NNDC](https://www.nndc.bnl.gov/nudat3/) |
| EC | ³⁷₁₈Ar + ⁰₋₁e → ³⁷₁₇Cl | 35.0 d | NNDC |
| γ | ⁹⁹ᵐ₄₃Tc → ⁹⁹₄₃Tc + ⁰₀γ | 6.01 h | NNDC |

Decay series: ²³⁸U reaches stable ²⁰⁶Pb through 8 α and 6 β⁻ steps (ΔA = 32 → 8 α, Z 92 → 76; 6 β⁻ → Z 82). [OpenStax 21.3]

### Worked example: radiocarbon dating

A wooden artefact retains 35.0 % of its original ¹⁴C (t½ = 5730 y).

- k = 0.693 / 5730 y = 1.21 × 10⁻⁴ y⁻¹
- ln(N/N₀) = −kt, with N/N₀ = 0.350
- ln(0.350) = −1.05
- t = 1.05 / (1.21 × 10⁻⁴ y⁻¹) = 8680 y (checked: 8676–8680 depending on rounding of k; 3 s.f. 8680)

### Curiosity hooks

- Carbon dating: cosmic rays keep making ¹⁴C in the air; living things take it in; at death intake stops and the ¹⁴C clock starts. [OpenStax 21.5](https://openstax.org/books/chemistry-2e/pages/21-5-uses-of-radioisotopes)
- Smoke detectors: a speck of ²⁴¹Am emits α particles that ionise air and carry a current; smoke blocks them and trips the alarm. [US NRC](https://www.nrc.gov/reading-rm/doc-collections/fact-sheets/smoke-detectors.html)
- PET scans: ¹⁸F emits a positron that annihilates with an electron, sending two γ rays in opposite directions for the scanner to detect. [OpenStax 21.5]

### Decisions

- Source conflict (user decision): ¹⁴C half-life 5730 y (OpenStax), not NNDC 5700 ± 30 y.
- Source conflict (user decision): ²³⁸U half-life 4.5 × 10⁹ y (OpenStax), not NNDC 4.468 × 10⁹ y.
- 0.693 is used for ln 2, as in OpenStax.

### Misconceptions to correct

- "After two half-lives it's all gone": each half-life halves what remains (½, ¼, ⅛ …).
- Half-life is a property of large samples; a single nucleus decays at random.
- The β⁻ electron is created in the decay; it was not inside the neutron or taken from the electron shell.
- Gamma emission does not change the element (A and Z unchanged).
- Heat, pressure and amount do not change a half-life.
- β⁻ raises Z by 1; track running totals of A and Z to check balance.

### Teaching order (chain of questions)

1. Why are some nuclei unstable? Strong force vs repulsion; n/p and the band of stability.
2. How does an unstable nucleus fix itself? α, β⁻, β⁺, EC mapped to its position relative to the band; γ as the energy release.
3. How do we track it? Balancing A and Z.
4. When will a nucleus decay? Random singly, predictable in crowds: half-life.
5. How fast, in numbers? First-order k and t½.
6. What can we do with it? Worked example: radiocarbon dating.

## Design plan

Narration text lives in `audio/script.json`; on-screen cues are tied to spoken phrases via `src/cues.ts`. Scenes are laid end to end: each narrated scene lasts its clip length plus a 6 s gap; silent ~12 s closing card.

### Style

White background, IBM Plex Sans (Latin + Greek), 120 px safe margin. Scene title 80 px bold between rules at y 120 and y 248 (x 120–1800, 3 px #1C1C1E), inset 32 px; content from y 264. Body 48 / label 32.

| Token | Fill | Text | Role |
| --- | --- | --- | --- |
| proton | #EF4444 | #7F1D1D | proton |
| neutron | #3B82F6 | #1E3A8A | neutron |
| alpha | #F59E0B | #78350F | α particle |
| betaMinus | #10B981 | #064E3B | β⁻ electron |
| positron | #8B5CF6 | #4C1D95 | β⁺ positron |
| gamma | #EC4899 | #831843 | γ ray |
| band | #94A3B8 | #0F172A | band of stability |
| halfLife | #F97316 | #7C2D12 | t½ markers |
| pitfall | #FEE2E2 | #B91C1C | pitfall boxes |

### Storyboard (scene id, title: trigger phrase → what appears)

1. `nuclear-stability`, "Why Nuclei Break Apart" (hero, concept statement): "A nucleus packs positively charged protons" → nucleus of red protons and blue neutrons, repulsion arrows; "The strong nuclear force holds them" → strong-force bonds; "Stable nuclei lie in a narrow band" → neutrons-vs-protons chart, band of stability, n/p = 1 line; "more than eighty three protons" → Z > 83 region shaded.
2. `alpha-decay`, "Alpha Decay": "Smoke detectors hide a speck" → ²⁴¹₉₅Am → ²³⁷₉₃Np + ⁴₂He; "Heavy nuclei with more than eighty three protons" → heavy nucleus; "emit an alpha particle" → α (2p + 2n) flies out; "drops the mass number by four" → A − 4, Z − 2 tags.
3. `beta-decay-modes`, "Fixing a Bad Ratio": "P E T scans use fluorine eighteen" → ¹⁸₉F → ¹⁸₈O + ⁰₊₁e; "Nuclei below the band are proton rich" → band chart, below-band region, positron and EC (³⁷₁₈Ar + ⁰₋₁e → ³⁷₁₇Cl); "Nuclei above the band are neutron rich" → above-band region, ¹⁴₆C → ¹⁴₇N + ⁰₋₁e; "created in the decay, not taken from the shell" → pitfall.
4. `gamma-and-penetration`, "Gamma Rays and Shielding": "After a decay, the nucleus is often left excited" → ⁹⁹ᵐ₄₃Tc → ⁹⁹₄₃Tc + ⁰₀γ; "Gamma emission does not change" → pitfall; "paper stops alpha particles" → α stops at paper; "thin aluminum stops beta" → β stops at aluminium; "gamma rays need thick lead" → γ stops in lead.
5. `balancing-equations`, "Balancing A and Z": "Uranium two thirty eight takes fourteen steps" → ²³⁸U → ²⁰⁶Pb, 8 α + 6 β⁻; "conserve both the mass number, A" → A and Z totals highlighted; "beta minus raises Z by one" → pitfall, running totals.
6. `half-life-concept`, "Random, Yet Predictable": "If you watch a single unstable nucleus" → single nucleus flickers then decays; "but a large crowd decays" → grid of nuclei decaying; "The time for half the nuclei to decay" → N₀/2 marked on curve; "four point five times ten to the nine" → U-238 t½; "Heat, pressure, and amount do not change this" → pitfall.
7. `half-life-math`, "The Half-Life Equation": "each half life halves what remains" → ½, ¼, ⅛ on the curve; "It is never all gone" → pitfall; "The rate constant, k, equals" → k = 0.693 / t½; "The remaining amount is" → N = N₀e^(−kt).
8. `radiocarbon-dating`, "Worked Example: Carbon-14" (step panels): "Cosmic rays constantly make carbon fourteen" → ¹⁴C clock concept; "Let's date a wooden artifact" → N/N₀ = 0.350, t½ = 5730 y; "We find k" → k = 1.21 × 10⁻⁴ y⁻¹; "then use the first order equation" → ln(0.350) = −1.05; "eight thousand six hundred eighty years" → t = 8680 y.
9. Closing card "Key Takeaways": track A and Z; β⁻ raises Z by 1; γ changes neither; half-life is unaffected by heat, pressure and amount; each half-life halves the remainder.

### Narration

1. A nucleus packs positively charged protons tightly together. Why don't they repel each other and fly apart? The strong nuclear force holds them, but only if the neutron to proton ratio is just right. Stable nuclei lie in a narrow band of stability. But what happens if a nucleus has the wrong ratio, or has more than eighty three protons?
2. Smoke detectors hide a speck of americium two forty one. What it shoots out ionizes the air, and smoke blocking it trips the alarm. Heavy nuclei with more than eighty three protons are unstable. To shed weight, they emit an alpha particle, which is a helium nucleus. This drops the mass number by four and the atomic number by two. But how do lighter nuclei fix a bad ratio?
3. P E T scans use fluorine eighteen. It emits a positron, which meets an electron and becomes two gamma rays the scanner can see. Nuclei below the band are proton rich, so they emit positrons or capture an inner electron. Nuclei above the band are neutron rich and emit a beta minus particle. That electron is created in the decay, not taken from the shell. But is changing particles the whole story?
4. After a decay, the nucleus is often left excited. How does it release that extra energy? It emits a gamma ray, a high energy photon. Gamma emission does not change the mass number or atomic number. While paper stops alpha particles and thin aluminum stops beta, gamma rays need thick lead or concrete. So how do we keep track of all these changes?
5. Uranium two thirty eight takes fourteen steps to become stable lead. How do we follow this chain? We use nuclear equations, which must conserve both the mass number, A, and the atomic number, Z. Remember, beta minus raises Z by one. Track the running totals of A and Z to check your balance. But if a nucleus is unstable, exactly when will it decay?
6. If you watch a single unstable nucleus, you can never predict when it will pop. A single nucleus decays at random, but a large crowd decays at a predictable rate. The time for half the nuclei to decay is its half life. For uranium two thirty eight, that is four point five times ten to the nine years. Heat, pressure, and amount do not change this. So how do we put numbers on it?
7. Each half life halves what remains: a half, then a quarter, then an eighth. It is never all gone after two half lives. Radioactive decay is a first order process. The rate constant, k, equals zero point six nine three over the half life. The remaining amount is the initial amount times e to the negative k t. How can this math let us look into the past?
8. Cosmic rays constantly make carbon fourteen in the air. Living things take it in, but when they die, the intake stops and a clock starts ticking. Let's date a wooden artifact with thirty five point zero percent of its original carbon fourteen. The half life is five thousand seven hundred thirty years. We find k, then use the first order equation to solve for time. The artifact is about eight thousand six hundred eighty years old.

### Frame-by-frame plans

Designer plans (four batches) were implemented with fades/drop-ins of 15–20 frames, ease-out cubic, spring pops for pitfalls, and 30-frame crossfades.

- Scene 1: 12-nucleon nucleus at (450, 540) with outward proton repulsion arrows that give way to strong-force links; chart origin (900, 900), Z 0–100 at 8 px, n 0–150 at 4 px; schematic band (n/p 1 → 1.5 at Z 83), dashed n = p line, Z > 83 shading.
- Scene 2: Am-241 α equation centred at y 350 with A − 4 / Z − 2 tags under Np; 44-nucleon nucleus at (960, 690); α (2p + 2n) flies to (1420, 560).
- Scene 3: β⁺, EC and β⁻ equations stacked at x 120; chart with proton-rich (purple) and neutron-rich (green) regions and arrows toward the band; pitfall at y 730.
- Scene 4: Tc-99m equation at (160, 360), pitfall at x 920; source box plus paper / aluminium / lead-concrete barriers at x 600 / 1050 / 1600; α, β⁻, γ tracks stop at their barriers.
- Scene 5: U-238 → Pb-206 series arithmetic on the left; C-14 running totals and pitfall on the right.
- Scene 6: single nucleus decays without warning; 10 × 10 grid with seeded exponential decay times and a live count; N/N₀ curve, origin (950, 850), 200 px per half-life; t½ marker.
- Scene 7: same graph with ½, ¼, ⅛ markers, pitfall, k = 0.693 / t½ and N = N₀e^(−kt) at x 495.
- Scene 8: three-step ¹⁴C clock flow on the left, 2 × 2 step panels on the right, final answer panel highlighted.
- Closing card: no title band, five bullets at x 560 revealed every second, fade to black in the last second.

### Build adjustments to the designer plans

- Scene 2 and 3 hooks reworded so every claim is in the brief (PET "to find tumors" removed; the smoke detector line no longer names α before it is introduced).
- Scene 1 adds a one-line concept statement under the nucleus (ROADMAP requirement) and protons/neutron legend.
- Scene 2 labels the nucleus "Americium-241: 95 protons, 146 neutrons" (from the nuclide notation); Np-237 follows from conserving A and Z.
- Scene 3 shows the whole chart (including Z > 83) at the "below the band" cue so α links back to scene 2.
- Scene 5 adds a "balanced" tag that pulses instead of scaling the individual numbers.
- Scene 6 pitfall moved to (1190, 410), 30 px, to clear the y-axis labels; the t½ label names ²³⁸U because 4.5 × 10⁹ y is specific to it.
- Scene 7 pitfall copy states the correction: "After two half-lives, one quarter remains, not zero."; a "First-order decay" caption appears on its cue.
- Fractions (½, ¼, ⅛) and t½ use stacked/subscript markup because ⅛ is not in the Latin subset; arrows are inline SVG.

## Status

- [x] Scope
- [x] Research
- [ ] Design
- [x] Build (typecheck and lint pass in CI)
- [x] CI green: [run 39055418396](https://github.com/tharunkumar1177/nike-gen/actions/runs/39055418396), 250.3 s, gaps 6 s (5 s before the closing card). Earlier failures, all root-caused (no local Node, so formatting and TTS timing are only checked in CI):
  - [run 39053328240](https://github.com/tharunkumar1177/nike-gen/actions/runs/39053328240): Prettier formatting; patch applied, lockfile committed
  - [run 39054208655](https://github.com/tharunkumar1177/nike-gen/actions/runs/39054208655): one narration gap 8.37 s; lengths set to measured TTS durations
  - [run 39054524708](https://github.com/tharunkumar1177/nike-gen/actions/runs/39054524708): Prettier number style (`22.80` → `22.8`) in `audio/script.json`
- [ ] Merged

Stills were not reviewed visually (verification limited to the CI build, per AGENTS.md: the artifact bundles the rendered video).
