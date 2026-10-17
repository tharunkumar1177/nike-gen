# Acids/Bases: pKa, Buffers, Titration Curves

Chemistry Foundations, Lesson 17.

## Scope

- Audience: first-year university general chemistry
- Length: about 3 minutes
- Format: 1920×1080 landscape, 30 fps, H.264 MP4
- Narration: Kokoro TTS generated in CI, with a quiet, softened synth pad (lower chord, quieter level) generated in code
- Framework: Remotion (React/TypeScript). pH scales, Ka/pKa relationships, buffer particle diagrams and computed titration curves are diagram, graph and text animation that suits Remotion.
- Required elements (ROADMAP): concept statement, hero diagram, step panels, at least one worked example, pitfalls box, key-takeaways card.
- Gap between topics within the video: 3 to 8 seconds.
- Deliverables: `out/17-acids-bases-pka-buffers-titration-curves.mp4` and key frames in `out/stills/`

## Brief

Concept: a Brønsted–Lowry acid donates H⁺ and a base accepts it. Ka (and pKa = −log Ka) measures how far a weak acid ionises. A buffer (weak acid + conjugate base) resists pH change because each partner neutralises one kind of added ion; Henderson–Hasselbalch gives its pH. A weak acid–strong base titration curve shows the buffer region, pH = pKa at half-equivalence, and an equivalence point above pH 7.

### Definitions (sourced)

- Brønsted–Lowry: acids donate H⁺, bases accept H⁺; they form conjugate pairs. [OpenStax 14.1](https://openstax.org/books/chemistry-2e/pages/14-1-bronsted-lowry-acids-and-bases)
- pH = −log[H₃O⁺]; Kw = [H₃O⁺][OH⁻] = 1.0 × 10⁻¹⁴ at 25 °C. [OpenStax 14.2](https://openstax.org/books/chemistry-2e/pages/14-2-ph-and-poh)
- pKa = −log Ka; smaller pKa means a stronger acid. [OpenStax 14.3](https://openstax.org/books/chemistry-2e/pages/14-3-relative-strengths-of-acids-and-bases)
- Buffer: appreciable amounts of a weak conjugate acid–base pair; HA neutralises added OH⁻, A⁻ neutralises added H⁺. pH = pKa + log([A⁻]/[HA]); effective range pKa ± 1; capacity greatest at pH = pKa. [OpenStax 14.6](https://openstax.org/books/chemistry-2e/pages/14-6-buffers)
- Titration curves and indicators. [OpenStax 14.7](https://openstax.org/books/chemistry-2e/pages/14-7-acid-base-titrations)

### Values

| Quantity | Value | Source |
| --- | --- | --- |
| Acetic acid Ka (25 °C) | 1.8 × 10⁻⁵ → pKa 4.74 | [OpenStax Appendix H](https://openstax.org/books/chemistry-2e/pages/h-ionization-constants-of-weak-acids) |
| Phenolphthalein | colourless below ~8.3, pink by 10.0 | OpenStax 14.7, Fig. 14.19 |
| Methyl red | red below ~3.2, yellow above 5.0 | OpenStax 14.7, Fig. 14.19 |

### Worked example 1: pH of 0.100 M acetic acid

- ICE: I 0.100 / 0 / 0; C −x / +x / +x; 1.8 × 10⁻⁵ = x² / (0.100 − x)
- Small-x: x² = 1.8 × 10⁻⁶, x = [H₃O⁺] = 1.34 × 10⁻³ M; 5 % check 1.34 % (valid)
- pH = 2.87

### Worked example 2: buffer, 1.00 L with 0.100 mol HA + 0.100 mol A⁻

- pH = 4.74 + log(1) = 4.74
- Add 0.010 mol HCl: A⁻ 0.090 mol, HA 0.110 mol; pH = 4.74 + log(0.090/0.110) = 4.65 (ΔpH −0.09)
- Same HCl in 1.00 L pure water: pH 7.00 → 2.00 (ΔpH −5.00)

### Worked example 3: 25.00 mL 0.100 M acetic acid with 0.100 M NaOH

| V(NaOH) | Region | pH |
| --- | --- | --- |
| 0.00 mL | weak acid | 2.87 |
| 12.50 mL | half-equivalence, [HA] = [A⁻] | 4.74 (= pKa) |
| 25.00 mL | equivalence, 0.0500 M A⁻; Kb = 5.56 × 10⁻¹⁰, [OH⁻] = 5.27 × 10⁻⁶ M, pOH 5.28 | 8.72 |
| 30.00 mL | excess OH⁻ 0.00050 mol / 55.00 mL = 0.00909 M, pOH 2.04 | 11.96 |

Strong acid–strong base equivalence point: pH 7.00. Phenolphthalein's range brackets the 8.72 jump; methyl red would change colour far too early.

### Decisions

- Source conflict (user decision): acetic acid pKa uses OpenStax Ka = 1.8 × 10⁻⁵ → 4.74, not NIST's thermodynamic 4.756.
- Source conflict (user decision): phenolphthalein range shown as 8.3–10.0 (OpenStax), not LibreTexts' 8.2–10.0.
- The ICE value is shown unrounded as 1.34 × 10⁻³ M so pH 2.87 follows on screen.

### Misconceptions to correct

- The equivalence point is not always pH 7: A⁻ takes H⁺ from water, making OH⁻.
- A buffer resists pH change; it does not hold pH constant (and has finite capacity).
- Strong ≠ concentrated: strength is extent of ionisation, concentration is amount per volume.
- Higher pKa is a weaker acid, not stronger; pKa is the pH where the acid is 50/50 HA/A⁻.
- Half-equivalence (pH = pKa) is not the equivalence point.
- Learners memorise Henderson–Hasselbalch without the particle mechanism; show which partner absorbs the added ion.

### Teaching order

1. Brønsted–Lowry, conjugate pairs, pH, Kw.
2. Ka, pKa, strong vs weak (and strong ≠ concentrated).
3. Worked example 1 (weak-acid ICE).
4. Buffers: mechanism, Henderson–Hasselbalch, range.
5. Worked example 2 (buffer vs water).
6. Titration curve (worked example 3), half-equivalence and equivalence > 7, strong-acid contrast.
7. Indicator choice.

## Design plan

Narration text lives in `audio/script.json`; on-screen cues are tied to spoken phrases via `src/cues.ts`. Scenes are laid end to end: each narrated scene lasts its clip length plus a 6 s gap; silent ~12 s closing card.

### Style

Bright textbook, consistent with Lesson 16: white background, Roboto, type scale 96 / 64 / 48 / 32, 120 px safe margin.

| Token | Fill | Text | Role |
| --- | --- | --- | --- |
| acid | #81A1C1 | #4C566A | weak acid HA |
| base | #B48EAD | #7C5375 | conjugate base A⁻ |
| hydronium | #BF616A | #8F3B26 | H₃O⁺ / H⁺ |
| hydroxide | #5E81AC | #ECEFF4 (on fill only) | OH⁻ |
| pka | #EBCB8B | #8F6B2E | pKa / half-equivalence marker |
| pitfall | #F2DEDE | #D32F2F | pitfall boxes |

### Storyboard (scene id: cues, trigger phrase → what appears)

1. `bronsted-lowry-ph` (hero, concept statement): "A Bronsted Lowry acid donates" → "Acids donate H⁺. Bases accept H⁺."; "In water, it forms" → HA + H₂O ⇌ H₃O⁺ + A⁻ particle animation; "We measure this with p H" → pH = −log[H₃O⁺]; "the product of H three O plus" → Kw = [H₃O⁺][OH⁻] = 1.0 × 10⁻¹⁴.
2. `ka-pka-strength`: "Weak acids only partially ionize" → HA ⇌ H⁺ + A⁻; "We measure this with K a" → Ka expression; "or its negative log, p K a" → pKa = −log Ka; "A smaller p K a" → pitfall "Higher pKa = weaker acid"; "while concentration is" → pitfall adds "Strong ≠ concentrated".
3. `weak-acid-ice` (worked example 1, step panels): "Let's find the p H" → ICE I row 0.100 / 0 / 0; "Using an I C E table" → C and E rows; "assuming x is small" → x² / 0.100 = 1.8 × 10⁻⁵; "is one point three four" → x = [H₃O⁺] = 1.34 × 10⁻³ M; "The p H is two point eight seven" → pH = 2.87.
4. `buffer-mechanism`: "A buffer contains" → beaker of HA and A⁻; "the acid neutralizes added O H minus" → OH⁻ + HA → A⁻ + H₂O; "the base neutralizes added H plus" → H⁺ + A⁻ → HA; "does not hold p H perfectly constant" → pitfall "Resists pH change, does not hold it constant."; "The Henderson Hasselbalch equation" → pH = pKa + log([A⁻]/[HA]).
5. `buffer-vs-water` (worked example 2): "Consider a buffer" → two beakers, buffer and water; "Its p H is four point seven four" → buffer 4.74 pulses; "drops the p H to four point six five" → buffer 4.65 (ΔpH −0.09); "drops the p H from seven to two" → water 7.00 → 2.00 (ΔpH −5.00).
6. `titration-curve` (worked example 3): "Titrating this acid" → axes, computed curve draws with a cursor-synced HA/A⁻ particle panel; "At half equivalence" → 12.50 mL, pH 4.74, "pH = pKa", 50/50 panel; "At equivalence" → 25.00 mL, pH 8.72, all A⁻; "reacts with water to make O H minus" → A⁻ + H₂O ⇌ HA + OH⁻; "not seven like a strong acid" → pitfall "Equivalence point ≠ pH 7" and dashed strong-acid curve through pH 7.
7. `indicators`: "changes color during the steep jump" → steep region highlighted; "Phenolphthalein changes" → band 8.3–10.0 over the jump; "Methyl red would change" → band 3.2–5.0 far below equivalence.
8. Closing card "Key Takeaways": equivalence point ≠ pH 7 for weak acids; buffers resist pH change but don't hold it constant; half-equivalence: pH = pKa; strong ≠ concentrated, higher pKa = weaker acid.

### Narration

1. A Bronsted Lowry acid donates an H plus, and a base accepts it. In water, it forms H three O plus and its conjugate base. We measure this with p H, the negative log of H three O plus. In pure water, the product of H three O plus and O H minus is one point zero times ten to the negative fourteen.
2. Weak acids only partially ionize. We measure this with K a, or its negative log, p K a. A smaller p K a means a stronger acid. Remember, strength is how much it ionizes, while concentration is how much is dissolved.
3. Let's find the p H of zero point one zero zero molar acetic acid. Its K a is one point eight times ten to the negative five. Using an I C E table and assuming x is small, the H three O plus concentration is one point three four times ten to the negative three molar. The p H is two point eight seven.
4. A buffer contains a weak acid and its conjugate base. It resists p H changes because the acid neutralizes added O H minus, and the base neutralizes added H plus. It does not hold p H perfectly constant. The Henderson Hasselbalch equation finds its p H.
5. Consider a buffer with equal moles of acetic acid and its conjugate base. Its p H is four point seven four. Adding zero point zero one zero moles of strong acid drops the p H to four point six five. Adding that same acid to pure water drops the p H from seven to two.
6. Titrating this acid with a strong base creates a curve. At half equivalence, p H equals p K a, four point seven four. At equivalence, the conjugate base reacts with water to make O H minus. So, the equivalence point is p H eight point seven two, not seven like a strong acid.
7. To see this equivalence point, we need an indicator that changes color during the steep jump. Phenolphthalein changes between eight point three and ten point zero, which is perfect. Methyl red would change too early.

### Frame-by-frame plans

Designer frame plans were implemented with headings 64 px at y 150, content inside the 120 px safe margin, and motion keyed to the storyboard cues (fade/drop-in 15–20 frames ease-out cubic, spring pops, 30-frame crossfades).

- Scene 1: centred hero row HA + H₂O ⇌ H₃O⁺ + A⁻ (chips r 70 at y 450) with role labels; H⁺ chip flies from HA to H₂O before the products appear; pH and Kw centred at y 700 / 800.
- Scene 2: equation, Ka fraction and pKa stacked at x 120; pitfall box at x 900 gains its second point on "while concentration is".
- Scene 3: ICE grid (HA, H₃O⁺, A⁻ columns) on the left; steps on the right (x²/0.100 = Ka, x = 1.34 × 10⁻³ M, 5 % check, pH = 2.87).
- Scene 4: beaker of 3 HA + 3 A⁻; neutralisation equations slide in from the right; pitfall; Henderson–Hasselbalch at the bottom.
- Scene 5: buffer and water beakers with H⁺ drops; pH readouts swap to 4.65 / 2.00 with ΔpH tags.
- Scene 6: graph plot rect x 260, y 270, 860 × 580 (0–35 mL, pH 0–14); curve draws over 60 frames with a cursor; cursor glides to 12.50 mL and 25.00 mL callouts; 10-chip HA/A⁻ panel (2 × 5) tracks the cursor; dashed strong-acid curve with pitfall.
- Scene 7: same graph; steep-region highlight (24–26 mL, pH 4–11); phenolphthalein (8.3–10.0, pink) and methyl red (3.2–5.0, orange) bands with labels at the right.

### Build adjustments to the designer plans

- Curves are computed from the exact charge balance in `src/acidbase.ts`; printed values use the brief's approximations (2.87, 4.74, 4.65, 8.72) so they match the brief digit for digit.
- "≠" is written as "is not" in pitfalls and takeaways (glyph not guaranteed in the Roboto subset).
- Scene 6 heading shortened, with the titration conditions in a subtitle; graph moved right so axis labels stay inside the safe area; particle panel wrapped to 2 × 5.
- Scene 5 shows the Henderson–Hasselbalch steps between the beakers; beakers are labelled.
- Scene 1 is a centred hero row rather than the plan's small top-left row; the closing card reuses the Lesson 16 card style.

## Status

- [x] Scope
- [x] Research
- [x] Design
- [ ] Build
- [ ] CI green
- [ ] Merged
