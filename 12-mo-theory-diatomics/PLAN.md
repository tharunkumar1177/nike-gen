# MO Theory: Diatomics, Bond Order, Paramagnetism

Chemistry Foundations, Lesson 12.

## Scope

- Audience: first-year university general chemistry
- Length: about 3 minutes
- Format: 1920×1080 landscape, 30 fps, H.264 MP4
- Narration: Kokoro TTS generated in CI, with a quiet synth pad generated in code
- Framework: Remotion (React/TypeScript), 2D vector graphics. The lesson is built from animated MO energy-level diagrams, 2D orbital lobes combining in and out of phase, electron filling, and bond-order arithmetic, which suits Remotion's React-driven diagram and text animation.
- Gap between topics in the video: 3 to 8 seconds
- Deliverables: `out/12-mo-theory-diatomics.mp4` and key frames in `out/stills/`

## Brief

Concept: MO theory treats electrons in a molecule as occupying orbitals spread over the whole molecule. Combining atomic orbitals (LCAO) gives bonding and antibonding MOs; filling them predicts bond order and magnetism, including O₂'s paramagnetism, which a simple Lewis structure misses.

Sources: [OS] [OpenStax Chemistry 2e 8.4](https://openstax.org/books/chemistry-2e/pages/8-4-molecular-orbital-theory) · [LT-MO] [LibreTexts MO Theory](https://chem.libretexts.org/Bookshelves/Physical_and_Theoretical_Chemistry_Textbook_Maps/Supplemental_Modules_(Physical_and_Theoretical_Chemistry)/Chemical_Bonding/Fundamentals_of_Chemical_Bonding/Molecular_Orbital_Theory) · [CCCBDB] [NIST CCCBDB diatomic bond lengths](https://cccbdb.nist.gov/diatomicexpbondx.asp) · [LT-BE] [LibreTexts Bond Energies](https://chem.libretexts.org/Bookshelves/Physical_and_Theoretical_Chemistry_Textbook_Maps/Supplemental_Modules_(Physical_and_Theoretical_Chemistry)/Chemical_Bonding/Fundamentals_of_Chemical_Bonding/Bond_Energies) · [PCCP] [doi:10.1039/c8cp04652b](https://doi.org/10.1039/c8cp04652b) · [JCE] [J. Chem. Educ. 2021](https://pubs.acs.org/doi/full/10.1021/acs.jchemed.1c00919)

### Facts

- LCAO: in-phase (constructive) combination gives a lower-energy bonding MO; out-of-phase (destructive) gives a higher-energy antibonding MO with a node between the nuclei. [OS]
- n atomic orbitals combine into n molecular orbitals; both bonding and antibonding always form. [OS]
- The antibonding MO is raised slightly more than the bonding MO is lowered. [LT-MO]
- s orbitals give σ2s / σ*2s. Head-on p overlap gives σ2p / σ*2p; side-by-side p overlap gives two degenerate π2p and two degenerate π*2p. [OS]
- Bond order = (bonding e⁻ − antibonding e⁻) / 2. Higher bond order means a stronger, shorter bond. [OS]
- H₂: BO 1. He₂⁺: BO ½. He₂: BO 0, no stable bond predicted. [OS]
- s–p mixing: for B₂, C₂, N₂ the 2s–2p gap is small, σ2s and σ2p interact and σ2p is pushed above π2p. For O₂ and F₂ the larger gap removes significant mixing, so σ2p lies below π2p. [OS]
- Aufbau, Pauli and Hund's rule apply to MOs as to AOs. [OS]
- Paramagnetic: unpaired electrons, attracted into a magnetic field. Diamagnetic: all electrons paired. [OS]
- O₂: Lewis structure shows all electrons paired, but MO filling puts two unpaired electrons in the degenerate π*2p; liquid O₂ is attracted to a magnet. [OS]
- B₂ is paramagnetic: with π2p below σ2p its two highest electrons occupy the two π2p singly, which is evidence for s–p mixing. [OS]

### Period-2 homonuclear diatomics

| Molecule | Valence configuration | BO | Magnetism | Length (pm) [CCCBDB] | Bond energy (kJ/mol) [LT-BE] |
| --- | --- | --- | --- | --- | --- |
| Li₂ | (σ2s)² | 1 | diamagnetic | 267 | 105 |
| Be₂ | (σ2s)²(σ*2s)² | 0 | no stable bond predicted | — | — |
| B₂ | (σ2s)²(σ*2s)²(π2p)² | 1 | paramagnetic | 159 | 289 |
| C₂ | (σ2s)²(σ*2s)²(π2p)⁴ | 2 | diamagnetic | 124 | 607 |
| N₂ | (σ2s)²(σ*2s)²(π2p)⁴(σ2p)² | 3 | diamagnetic | 110 | 945 |
| O₂ | (σ2s)²(σ*2s)²(σ2p)²(π2p)⁴(π*2p)² | 2 | paramagnetic | 121 | 498 |
| F₂ | (σ2s)²(σ*2s)²(σ2p)²(π2p)⁴(π*2p)⁴ | 1 | diamagnetic | 141 | 159 |
| Ne₂ | … (π*2p)⁴(σ*2p)² | 0 | no stable bond predicted | — | — |

### Worked example: the O₂ series [PCCP]

| Species | Valence electrons in π*2p | BO | Length (pm) |
| --- | --- | --- | --- |
| O₂⁺ | 1 | 2.5 | 112 |
| O₂ | 2 | 2 | 121 |
| O₂⁻ | 3 | 1.5 | ≈ 134 |
| O₂²⁻ | 4 | 1 | 149 |

Superoxide length: sources give 133 or 135 pm; the user chose to show "≈ 134 pm".

### Misconceptions

1. s–p mixing is not sp hybridisation; it is an interaction between same-symmetry σ MOs. Avoid the word "hybrid" in that scene.
2. "σ is always below π" fails for B₂, C₂, N₂.
3. It is the simple Lewis structure, not valence-bond theory, that fails for O₂. [JCE] Say "Lewis structure".
4. Reading bond order backwards: low bond order means weaker, longer bonds.
5. Two AOs always give both a bonding and an antibonding MO, not one or the other.
6. Bond order 0 means no stable bond predicted; avoid "cannot exist" (weak van der Waals dimers are observed).

### Teaching order

1. Hook: liquid O₂ held by a magnet; the Lewis structure predicts no unpaired electrons.
2. LCAO: 1s + 1s → σ1s and σ*1s; node; orbital count conserved; H₂, He₂⁺, He₂ and the bond-order formula.
3. Period-2 orbitals: σ and π from 2p overlap.
4. s–p mixing switch: small gap (B–N) vs large gap (O, F).
5. Filling O₂ (two unpaired π*) and B₂ (paramagnetism as evidence of mixing).
6. Worked example: O₂⁺, O₂, O₂⁻, O₂²⁻ bond order vs bond length.
7. Key takeaways.

### Key takeaways

- n AOs make n MOs: bonding (in phase) and antibonding (node).
- Bond order = (bonding − antibonding) / 2; higher means stronger and shorter.
- The 2s–2p gap decides whether π2p or σ2p fills first.
- MO theory explains the paramagnetism of O₂ and B₂.
- Aufbau, Pauli and Hund's rule fill MOs just like AOs.

## Design

### Visual style

- Palette: background `#FFFFFF`, text `#1C1C1E`, axis/lines `#4C566A`, orbital boxes `#E5E9F0`, bonding MOs / in-phase lobes `#88C0D0`, antibonding MOs / out-of-phase lobes `#D08770`, σ labels `#B48EAD`, π labels `#A3BE8C`, unpaired electrons `#D32F2F`.
- Type (Roboto): title 96/700, subtitle 64/500, body 48/400, labels 32/500.
- Layout: 120 px safe margin; diagrams centred, step panels and text left-aligned.
- Motion: purposeful spring-eased transitions (150–250 ms), no layout shifts.
- Transitions: 3 s silent hold on each scene's final frame, then a 30-frame crossfade (4 s gap between narrated topics).

### Storyboard (192 s)

| # | id | Scene (s) | Narration (s) | On screen |
| --- | --- | --- | --- | --- |
| 1 | `hook-o2-magnet` | 0–15 | 1–11 | Concept statement; magnet pulling neutral-coloured liquid; O=O Lewis structure, all pairs; red cross "Fails to predict paramagnetism" |
| 2 | `lcao-bond-order` | 15–50 | 16–46 | Hero: 1s + 1s in phase → σ1s, out of phase → σ*1s with dashed node; energy diagram filling H₂ (BO 1), He₂⁺ (BO ½), He₂ (BO 0, "no stable bond predicted"); formula |
| 3 | `period-2-orbitals` | 50–68 | 51–64 | Step panels: head-on 2p → σ2p (purple label); side-by-side 2p → two π2p (green label) |
| 4 | `sp-mixing` | 68–92 | 69–88 | Two energy ladders: O/F (σ2p below π2p) vs B/C/N (dashed σ2s–σ2p interaction pushes σ2p above π2p) |
| 5 | `filling-o2-b2` | 92–122 | 93–118 | O₂ fills; last two e⁻ red, single in each π*2p, "Paramagnetic"; switch to B₂, two red e⁻ single in π2p, "Paramagnetic" |
| 6 | `worked-example-o2-series` | 122–154 | 123–150 | Worked example: rows O₂⁺ 2.5/112, O₂ 2/121, O₂⁻ 1.5/≈134, O₂²⁻ 1/149 pm with BO-vs-length plot |
| 7 | `pitfalls` | 154–172 | 155–168 | Pitfalls box, three bullets |
| 8 | `key-takeaways` | 172–192 | 173–188 | Key-takeaways card, five bullets |

### Narration

1. Liquid oxygen is attracted to a magnet, meaning it has unpaired electrons. But the standard Lewis structure shows all electrons paired. We need molecular orbital theory.
2. Two atomic orbitals always combine to form two molecular orbitals. Two one s orbitals combine in phase to form a lower-energy sigma bonding orbital, and out of phase to form a higher-energy sigma star antibonding orbital with a node. Bond order is bonding minus antibonding electrons, divided by two. H two has a bond order of one. He two plus has bond order one half. He two has bond order zero, so no stable bond is predicted.
3. In period two, s orbitals form sigma two s and sigma star two s. Head-on p overlap forms sigma two p, while side-by-side overlap forms two degenerate pi two p orbitals.
4. For oxygen and fluorine, a large energy gap between two s and two p orbitals means sigma two p lies below pi two p. But for boron, carbon, and nitrogen, the gap is small. The sigma two s and sigma two p orbitals interact, pushing sigma two p above pi two p.
5. Aufbau, Pauli, and Hund's rule apply to molecular orbitals. Filling oxygen, the last two electrons go singly into the degenerate pi star two p orbitals, explaining its paramagnetism. For boron, s p mixing places pi two p below sigma two p. Its highest two electrons singly occupy the pi two p orbitals, making boron paramagnetic too, which is evidence for s p mixing.
6. Let's compare the oxygen series by removing or adding pi star electrons. O two plus has bond order two point five and length one hundred twelve picometers. O two has bond order two and length one hundred twenty one. Adding electrons makes superoxide, O two minus, at about one hundred thirty four, and peroxide, O two two minus, at one hundred forty nine. Higher bond order means a stronger, shorter bond.
7. Watch out for these pitfalls. S p mixing is an interaction, not sp hybridisation. Sigma is not always below pi. And bond order zero means no stable bond predicted, not that molecules cannot exist.
8. Key takeaways. N atomic orbitals make N molecular orbitals. Bond order predicts stability. The two s two p gap dictates filling order. Molecular orbital theory explains paramagnetism. And standard rules fill molecular orbitals just like atomic orbitals.

### Timing (as built, 193 s, 5790 frames)

Scenes are sized from the Kokoro clip lengths measured in CI: 1 s lead-in, narration plus about 1 s margin, then a 3 s hold, so gaps between narrated topics are 4–5 s.

| Scene | Frames | Narration start / end-by | Measured clip |
| --- | --- | --- | --- |
| hook-o2-magnet | 0–480 | 30 / 420 | 11.97 s |
| lcao-bond-order | 480–1410 | 510 / 1350 | 26.07 s |
| period-2-orbitals | 1410–1950 | 1440 / 1890 | 13.43 s |
| sp-mixing | 1950–2670 | 1980 / 2610 | 19.80 s |
| filling-o2-b2 | 2670–3570 | 2700 / 3510 | 25.77 s |
| worked-example-o2-series | 3570–4470 | 3600 / 4410 | 25.23 s |
| pitfalls | 4470–5070 | 4500 / 5010 | 15.13 s |
| key-takeaways | 5070–5790 | 5100 / 5700 | 18.45 s |

### Frame plans (summary)

Beats are tied to narration phrases through `src/cues.ts`, not fixed frames.

1. Hook: title + subtitle at x 120; U-magnet (path M400 500 … L400 800, 60 px, red/blue poles); flowing neutral dashed stream (M600 350 Q300 650 600 950); O=O Lewis structure at (1200, 650) with two lone pairs per O; red cross and "Fails to predict paramagnetism" at y 800.
2. LCAO: 1s + 1s circles; in-phase ellipse σ1s at (700, 200); out-of-phase blue/orange circles with dashed node, σ*1s at y 320; 120 px box diagram (AOs at x 200 / 800, y 700; σ1s box y 850; σ*1s box y 550); H₂ → He₂⁺ (lone σ*1s electron red) → He₂; BO fraction and rows at x 1000.
3. Period 2: head-on pz lobes (atoms at x 400 / 800, y 400) slide and merge into σ2p at x 1400; side-by-side px lobes (y 800) merge into π2p with dashed node; σ2s/σ*2s note at y 980.
4. s–p mixing: two ladders (O₂/F₂ AO x 300/900, MO x 600; B₂/C₂/N₂ AO x 1150/1750, MO x 1450); σ2p springs from below π2p to above it after the dashed orange σ2s–σ2p interaction curve; gap arrows; highlight frame on O/F σ2p/π2p.
5. Filling: ladder AO x 360/1560, MO x 960; O₂ fills 12 valence e⁻ (Aufbau, Hund), last two red in π*2p; crossfade to B₂ (6 e⁻), last two red in π2p; "Paramagnetic" labels.
6. Series: table (Species / Valence e⁻ in π*2p / BO / Length) left; BO-vs-length plot (x: BO 1→1200 … 3→1680; y: 800 − (L − 100)·10) right; rows, points and dashed segments appear per species; trend arrow "Stronger, shorter bond".
7. Pitfalls: red-bordered card (120, 230, 1680×620), warning icon, three cross bullets.
8. Key takeaways: card (120, 150, 1680×780), five check bullets, fade to white over last 30 frames.

Layout deviations from the designer's plans, made to avoid overlaps: scene 3 lower heading at y 630; scene 4 levels moved below the title (y 300–940); scene 2 formula shortened to "BO ="; MO notation uses normal digits (σ2p) because Roboto's web subsets lack Unicode subscript letters.

## Status

- Done. CI green (run 39020253668): typecheck, lint, format, Kokoro soundtrack (193.00 s, peak −3.0 dBFS), MP4 render and stills.
- CI history: run 1 failed the format check (patch applied, lockfile committed); run 2 failed because the pitfalls narration overran its window by 4 frames; scenes were then retimed from measured clip lengths.
- Stills were not reviewed against the plan: the repo guardrails ask only for a CI compile check, without downloading the render artifact.
