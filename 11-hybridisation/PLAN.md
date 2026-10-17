# Hybridisation (sp to sp³d²)

Chemistry Foundations, Lesson 11.

## Scope

- Audience: first-year university general chemistry
- Length: about 4 minutes (raised from 3 for curiosity-led narration with concept bridges)
- Format: 1920×1080 landscape, 30 fps, H.264 MP4
- Narration: Kokoro TTS generated in CI, with a quiet, softened synth pad generated in code
- Scene gaps: 3–8 s between topics within the video
- Framework: Remotion (React/TypeScript). The lesson is a narrated explainer built from orbital energy diagrams, hybrid-orbital lobe drawings and geometry diagrams, which suits Remotion's React/SVG-driven animation.
- Deliverables: `out/11-hybridisation.mp4` and key frames in `out/stills/`

## Brief

Concept: hybridisation is a model that mixes a central atom's valence atomic orbitals into an equal number of hybrid orbitals pointing along the observed bonds and lone pairs. Geometry is known first (experiment, VSEPR); the hybrid set is then chosen to match it. It is bookkeeping, not a physical process.

### Definitions (sourced)

- Hybridisation: mathematical combination of atomic orbitals on one atom into a set of hybrid orbitals aimed at the bonds and lone pairs; number of hybrids = number of atomic orbitals mixed. [OpenStax 8.2](https://openstax.org/books/chemistry-2e/pages/8-2-hybrid-atomic-orbitals)
- sp / sp² / sp³: one s mixed with one / two / three p; two / one / zero unhybridised p orbitals remain. s character follows from the count: 1 s in 2, 3, 4 hybrids = 50%, 33%, 25%. [OpenStax 8.2]
- σ bond: end-to-end overlap, density on the internuclear axis. π bond: side-by-side overlap of unhybridised p orbitals, density above and below the axis. [OpenStax 8.1](https://openstax.org/books/chemistry-2e/pages/8-1-valence-bond-theory)
- Electron domains (steric number): bonded atoms plus lone pairs; a multiple bond counts once. Domains set the hybrid set. [OpenStax 7.6](https://openstax.org/books/chemistry-2e/pages/7-6-molecular-structure-and-polarity)
- Promote-then-mix (C: 2s² 2p² → four sp³) is formal bookkeeping; no electron physically jumps. [Grushow, J. Chem. Educ. 2011, 88, 860](https://doi.org/10.1021/ed100155c)

### Values

| Hybrid | Domains | Geometry | Ideal angle | s character | Example | Source |
| --- | --- | --- | --- | --- | --- | --- |
| sp | 2 | Linear | 180° | 50% | C₂H₂: 3 σ, 2 π | OpenStax 8.2, 8.3 |
| sp² | 3 | Trigonal planar | 120° | 33% | C₂H₄: 5 σ, 1 π; BF₃ | OpenStax 8.2, 8.3 |
| sp³ | 4 | Tetrahedral | 109.5° | 25% | CH₄ | OpenStax 8.2 |
| sp³d | 5 | Trigonal bipyramidal | 90°, 120° | not given (axial ≠ equatorial) | PCl₅ | OpenStax 8.2 |
| sp³d² | 6 | Octahedral | 90° | not given | SF₆ | OpenStax 8.2 |

Worked example, acetic acid CH₃COOH: CH₃ carbon 4 domains → sp³; carbonyl carbon 3 domains (C=O counts once) → sp²; –OH oxygen 2 bonds + 2 lone pairs = 4 domains → sp³. Bonds: 7 σ, 1 π (the C=O π uses the sp² carbon's unhybridised p). [OpenStax 8.2, 8.3]

### Misconceptions to correct

- Hybridisation does not cause geometry; geometry is known first and hybrids are assigned to match. [Grushow 2011]
- Electrons are not physically promoted; promotion is bookkeeping. [Grushow 2011]
- Counting bond lines instead of domains (a double bond is one domain; lone pairs count).
- Water's lone pairs as two identical sp³ "rabbit ears" is a simplification; photoelectron spectra show two lone-pair levels of different energy. [Laing, J. Chem. Educ. 1987, 64, 124](https://doi.org/10.1021/ed064p124)
- d-orbital hybrids for PCl₅, SF₆: computations show d orbitals contribute little; ionic and three-centre bonding describe them better. [Magnusson, JACS 1990, 112, 7940](https://doi.org/10.1021/ja00178a014); [Reed & Schleyer, JACS 1990, 112, 1434](https://doi.org/10.1021/ja00160a022)

### Decisions

- sp³d / sp³d² (user decision; sources disagree): show both with their geometries and the textbook labels, plus a short note that d orbitals contribute little in reality. No d-orbital mixing animation; % s not shown for these two.
- Water lone-pair caveat appears only as a pitfall line.
- Worked example: acetic acid, three centres, with σ/π count.

### Teaching order

1. Problem: carbon 2s² 2p² vs methane's four equal bonds at 109.5°.
2. Model: promote-then-mix bookkeeping into four sp³ hybrids; geometry first.
3. sp² and sp with leftover p orbitals forming π bonds (ethene, ethyne); s character.
4. Five and six domains: sp³d (PCl₅), sp³d² (SF₆) with the d-orbital caveat.
5. Worked example: acetic acid.
6. Pitfalls: causality, bonds vs domains, water's lone pairs.
7. Key takeaways card.

## Design plan

### Visual style

- 1920×1080, 30 fps. Kokoro `af_heart` narration plus code-generated pad.
- Background `#FFFFFF`; text `#1C1C1E`.
- Fill / stroke-and-text: s `#88C0D0` / `#236B8E`; p `#B48EAD` / `#6A4A64`; hybrid `#A3BE8C` / `#4A7235`; lone pair `#E5E9F0` / `#4C566A`; σ `#81A1C1` / `#436080`; π uses the p colours (it comes from leftover p orbitals); caution `#D08770` / `#9B492E`.
- Type: IBM Plex Sans (Latin + Greek). Title 70 px / 700, subtitle 40 px muted, body 48 px / 400, labels 32 px / 500.
- Scene title at the top-left per `wireframe.svg`, no rules: line box x 128, y 114–198; subtitle directly below (y 206–254); scene content from y 226 (282 with a subtitle).
- Safe margin 100 px. 30-frame crossfade between scenes.

### Storyboard and narration

Each line opens with a hook and closes by setting up the next concept (`style.md`, Narration). Planned at 6 s silence between lines, about 4 minutes total; the final timeline is laid out from measured narration (see Frame-by-frame).

| Scene | Planned length | Words |
| --- | --- | --- |
| 1 `problem-methane` | 39 s | 80 |
| 2 `sp3-model` | 41 s | 84 |
| 3 `sp2-sp-pi-bonds` | 43 s | 88 |
| 4 `expanded-octet` | 40 s | 82 |
| 5 `worked-example` | 41 s | 84 |
| 6 `pitfalls` | 38 s | 76 |
| 7 `closing-card` | 8 s | silent |

1. `problem-methane`. Hero diagram: left, carbon energy diagram "C: 2s² 2p²"; right, tetrahedral CH₄ "109.5°". Concept statement: "Hybridisation mathematically combines atomic orbitals to match observed geometry."
   "Let us look at carbon's ground state. It has two electrons in two s, and two in two p. Yet in methane, experiments show carbon forms four identical single bonds, separated by exactly one hundred nine point five degrees. How does it achieve this perfect symmetry from unequal atomic orbitals? To explain this, we use a mathematical bookkeeping model called hybridisation. This model mathematically combines atomic orbitals to match the observed geometry. Let us see how this mixing works in practice."
2. `sp3-model`. Promote-then-mix: 2s and 2p levels, promotion tagged "Promotion is formal bookkeeping, not physical."; s sphere and p dumbbells become four green sp³ lobes at tetrahedral corners; "sp³ (25% s character)".
   "How do we construct methane's shape? Geometry is known first from experiment, and we assign hybrids to match it. To get a tetrahedral shape, we mathematically mix one s and three p atomic orbitals. We often draw an electron being promoted first, but this is just bookkeeping; no electron physically jumps. This forms four equivalent S P three hybrids, each with twenty five percent s character. This explains four electron domains perfectly, but what if an atom has fewer than four electron domains?"
3. `sp2-sp-pi-bonds`. Step panels: ethene (trigonal planar, "sp² (33% s)") and ethyne (linear, "sp (50% s)"); leftover p orbitals form π above/below the axis vs end-to-end σ; labels "σ: end-to-end", "π: side-by-side".
   "When an atom has fewer domains, we mix fewer orbitals. For three domains, like ethene, mixing one s and two p orbitals yields three S P two hybrids at one hundred twenty degrees. For two domains, like ethyne, we get two linear S P hybrids. But what about the unused p orbitals? Leftover unhybridised p orbitals form pi bonds by overlapping side by side. This distinction matters because pi bonds sit above and below the internuclear axis, unlike end-to-end sigma bonds. Can we expand beyond four domains?"
4. `expanded-octet`. Static PCl₅ (trigonal bipyramidal, 90°/120°, "sp³d") and SF₆ (octahedral, 90°, "sp³d²"); caution box "Note: d orbitals contribute very little in reality." No mixing animation, no % s.
   "Some molecules exceed four domains, requiring a different label. Five domains form a trigonal bipyramidal shape, labelled S P three D, like in phosphorus pentachloride. Six domains are octahedral, labelled S P three D two, as in sulfur hexafluoride. Here is a surprising fact: textbooks often mix in D orbitals to explain these expanded shapes, but modern computations show they actually contribute very little to the bonding. Now that we have the labels, how do we apply them to a real molecule?"
5. `worked-example`. "Worked Example: Acetic Acid" Lewis structure; each centre highlighted in turn: "Methyl C: 4 domains = sp³", "Carbonyl C: 3 domains = sp²", "Hydroxyl O: 4 domains = sp³"; tally "7 σ, 1 π".
   "Counting electron domains is what lets you assign hybridisation in a real molecule. Let us analyse acetic acid. The methyl carbon has four domains, so it is S P three. The carbonyl carbon has three domains, because a double bond counts once, making it S P two. The hydroxyl oxygen has two bonds and two lone pairs, so it is also S P three. In total, there are seven sigma bonds and one pi bond. This seems straightforward, but what traps do students fall into?"
6. `pitfalls`. Caution-coloured pitfalls box, three bullets on cue: "Geometry dictates hybrids, not vice versa." / "Domains = bonded atoms + lone pairs." / "Water's lone pairs are not identical sp³ "rabbit ears"."
   "Even with the rules clear, misconceptions are common. Remember these three pitfalls. First, hybridisation does not physically cause molecular geometry; it merely models what we already observe. Second, always count lone pairs as electron domains, not just the visible bond lines. Finally, treating water's lone pairs as two identical S P three rabbit ears is a known oversimplification, as they actually have different energies. Keep these facts in mind as we review the key takeaways."
7. `closing-card`. "Key Takeaways": "Hybridisation: bookkeeping model matching observed geometries." / "Domains set hybrids: 2 = sp, 3 = sp², 4 = sp³." / "σ bonds: end-to-end. π bonds: side-by-side." / "sp³d/sp³d² are textbook labels; d orbitals contribute little."

### Stills

Scene 1 at 3/4, 2 at 3/4, 3 at 3/4, 4 at 1/2, 5 at 1/2 and 3/4, 6 at 3/4, 7 at 1/2.

### Frame-by-frame

Delivered by `designer` in three sequences (scenes 1–2, 3–4, 5–7); exact coordinates live in `src/scenes/*`. Summary:

- Shared geometry: atoms are 48 px symbols in r 34 white discs with a 3 px ring; bonds 6 px, wedge/dash for depth; lobes 160 px teardrops at 85% fill with 3 px dark stroke (hybrid = large lobe + small back lobe); orbital boxes 80 px; harpoons 56 px.
- Scene 1: energy axis x 200; 2s box (300, 700), 2p boxes y 500; CH₄ centred (1300, 600) with 109.5° arc; concept statement y 940.
- Scene 2: same boxes; the 2s ↓ electron moves to the empty 2p box as ↑ on "promoted", then all four boxes slide to one row (y 600) and turn hybrid green; s sphere + three p dumbbells on the right become four tetrahedral sp³ lobes at (1150, 600).
- Scene 3: ethene panel (C at x 440/640) and ethyne panel (C at x 1280/1480), y 560; sp²/sp lobes, σ overlap ellipse, vertical p lobes with dashed π bands; ethyne's second p set is tilted and lighter; 120° and 180° arcs; legend at y 940.
- Scene 4: PCl₅ at (540, 500) and SF₆ at (1380, 500), axial atoms ±200 px; 90°/120° and 90° arcs; labels at y 790/842; caution box 1200×80 at (360, 880).
- Scene 5: acetic acid (C 400/640, O 880 and 640,300); a ring moves between centres with numbered domain badges; step lines at x 1140; bonds recolour to σ blue and the second C=O line to π; tally "7 σ, 1 π".
- Scene 6: caution box 1600×560 at (160, 320), three numbered bullets on cue.
- Closing card: 1600×660 at (160, 210), title 64 px, four bullets from frame 60, 20 frames apart.

Implementation deviations (layout fixes, no content change):

- Animation beats are keyed to narrated phrases (`src/cues.ts`); the timeline is laid out from measured narration by `audio/generate.js`, which fails CI if any silence leaves 3–8 s or the total leaves 210–270 s.
- Scene 1: concept statement at 40 px (48 px overflows the safe width); "CH₄" label added under the molecule.
- Scene 2: the 2p boxes sit at x 390–570 (not 300–480) so the merged row clears the energy axis; a "four sp³" row label replaces the 2s/2p labels after mixing; caution text uses the dark caution colour for contrast.
- Scene 3: titles shown from the scene start; panel labels name the molecule ("Ethene · sp² (33% s)").
- Scene 4: title "Five and Six Domains" instead of "Expanded Octet" (the brief does not endorse the expanded-octet picture); molecules raised 40 px and labels merged with the geometry name so they clear the caution box.
- Scenes 5–7: bullets are numbered and spaced to fill their boxes; closing bullets at 44 px so the longest fits.
- After the first render (measured narration 18.10, 22.40, 19.43, 21.63, 21.03, 21.73 s; 6 s between lines, 4 s before the card; 168.3 s total): spin harpoons replaced by full ↑/↓ arrows (half-barbs read as "1"); the promoted electron travels above the 2p boxes instead of through them; sp³ lobes scaled 1.3×; scene 3 drops ethyne's tilted second p set (clutter) and instead labels bond counts from the brief ("5 σ, 1 π", "3 σ, 2 π (one π shown)"), with the σ/π legend moved top-right; scene 4's 120° arc now spans the two left equatorial Cl atoms and SF₆'s 90° arc sits between the front-right F and the lower axial F so neither crosses a bond or label.
- Style update after `style.md` and `wireframe.svg` changed: Roboto replaced by IBM Plex Sans; titles moved to the wireframe's 70 px top-left block; safe margin 100 px; scene 3's σ/π legend moved from the title band to y 300/350.

## Status

- [x] Scope confirmed
- [x] Brief
- [x] Design plan
- [x] Build
- [x] CI green, stills reviewed ([run 39020913408](https://github.com/tharunkumar1177/nike-gen/actions/runs/39020913408))
- [x] Recorded on main
- [ ] Restyled to the current style guide (font, title block, safe margin)
- [ ] Curiosity-led narration with concept bridges (about 4 minutes)
