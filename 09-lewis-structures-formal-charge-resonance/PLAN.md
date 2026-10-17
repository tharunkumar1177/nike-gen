# Lewis Structures, Formal Charge, Resonance

Chemistry Foundations, Lesson 9.

## Scope

- Audience: first-year university general chemistry
- Length: about 3 minutes
- Format: 1920×1080 landscape, 30 fps, H.264 MP4
- Narration: Kokoro TTS generated in CI, with a quiet, softened synth pad (lower chord, quieter level) generated in code
- Scene gaps: 3–8 s between topics within the video
- Framework: Remotion (React/TypeScript), per `style.md`. The lesson is a narrated explainer built from step-by-step 2D structure diagrams (electron counting, bonds and lone pairs placed one by one, formal-charge bookkeeping, resonance arrows), which suits Remotion's React/SVG animation.
- Lesson requirements (`roadmap.md`): concept statement, hero diagram, step panels, ≥1 worked example, pitfalls box, key-takeaways card.
- Deliverables: `out/lewis-structures-formal-charge-resonance.mp4` and key frames in `out/stills/`

## Brief

Concept: a Lewis structure shows how a molecule's valence electrons are arranged as bonding pairs (lines) and lone pairs (dots). The octet rule guides the arrangement; formal charge is bookkeeping that picks the best of several candidate structures; when more than one valid structure exists, the real molecule is a single resonance hybrid, not a mixture that flips between them.

### Definitions (sourced)

- Lewis structure: valence electrons drawn as dots, shared pairs as lines. [OpenStax 7.3](https://openstax.org/books/chemistry-2e/pages/7-3-lewis-symbols-and-structures)
- Lone pair: a pair of valence electrons not shared between atoms; bonding pair: a shared pair forming a covalent bond. [OpenStax 7.3]
- Octet rule: main-group atoms tend to form bonds until surrounded by eight valence electrons. A guideline with exceptions: H (2 electrons), electron-deficient BF₃ (B has 6), odd-electron NO (11 valence electrons), expanded octet SF₆ (12 around S). [OpenStax 7.3]
- Formal charge: the hypothetical charge an atom would have if bonding electrons were shared equally. FC = V − N − B/2 (valence electrons − nonbonding electrons − half the bonding electrons). [OpenStax 7.4](https://openstax.org/books/chemistry-2e/pages/7-4-formal-charges-and-resonance)
- Resonance: when two or more Lewis structures with the same atom arrangement can be drawn, the actual electron distribution is an average of them, the resonance hybrid. [OpenStax 7.4]

### Procedure (OpenStax 7.3)

1. Count total valence electrons (add one per negative charge, subtract one per positive charge).
2. Draw a skeleton with single bonds; least electronegative atom central; H is never central.
3. Complete octets on terminal atoms (H gets 2).
4. Put leftover electrons on the central atom.
5. If the central atom lacks an octet, convert terminal lone pairs into multiple bonds.

### Formal-charge rules (OpenStax 7.4)

- A structure with all formal charges zero is preferable; otherwise minimize their magnitudes.
- Among similar distributions, negative formal charge on the more electronegative atom is preferable.
- Formal charges sum to the overall charge of the molecule or ion.

### Worked examples (verified counts)

| Example | Valence electrons | Result |
| --- | --- | --- |
| HCN (procedure) | 1 + 4 + 5 = 10 | Skeleton H–C–N uses 4; 6 go to N; C has only 4, so two N lone pairs become bonds: H–C≡N with one lone pair on N. All FC 0. |
| CO₂ (formal charge) | 4 + 2×6 = 16 | O=C=O: all FC 0 (preferred). O≡C–O: triple-bonded O +1, C 0, single-bonded O −1. |
| O₃ (resonance) | 3×6 = 18 | O=O–O ↔ O–O=O. Central O +1, double-bonded O 0, single-bonded O −1. |
| O₃ bond lengths | — | Both bonds 128 pm, between O=O 121 pm (O₂) and O–O 147 pm (H₂O₂); bond order 1.5. [LibreTexts 7.14](https://chem.libretexts.org/Bookshelves/General_Chemistry/ChemPRIME_(Moore_et_al.)/07%3A_Further_Aspects_of_Covalent_Bonding/7.14%3A_Resonance) |

### Misconceptions to correct

- "Resonance structures flip back and forth": the molecule is one hybrid all the time. [OpenStax 7.4]
- "Formal charge is the real charge": it is hypothetical bookkeeping that assumes equal sharing. [OpenStax 7.4]
- "The octet rule is a law": H, BF₃, NO and SF₆ break it. [OpenStax 7.3]

### Source disagreements

- Expanded octets in period-3 oxoanions (e.g. SO₄²⁻): textbooks draw S=O double bonds to minimize formal charge; modern bonding analysis finds no meaningful d-orbital role and highly polarized bonds. [J. Chem. Educ.](https://pubs.acs.org/doi/10.1021/acs.jchemed.0c00368) Decision: the video does not draw SO₄²⁻; SF₆ represents expanded octets as a counting fact only.

### Teaching order

1. What a Lewis structure is: valence electrons, bonding vs lone pairs, octet.
2. Five-step procedure, worked through on HCN (step panels).
3. Formal charge formula; choose between two CO₂ structures.
4. Resonance in O₃; the hybrid with equal 128 pm bonds (hero diagram).
5. Pitfalls: octet exceptions, resonance is not flipping, formal charge is not real charge.
6. Key takeaways card.

## Design plan

### Visual style

- 1920×1080, 30 fps, 5400 frames (180 s). Kokoro `af_heart` narration plus code-generated softened pad.
- Background `#FFFFFF`; text `#1C1C1E`; muted `#4B5563`.
- Semantic accents (AA text shades on white): bonding pairs `#047857`, lone pairs `#B45309`, positive formal charge `#1D4ED8`, negative formal charge `#B91C1C`, resonance arrows and hybrid bonds `#6D28D9`.
- Atom discs and chips `#F9FAFB` fill, `#4B5563` stroke.
- Type: Roboto. Title 96 px / 700, subtitle 64 px, body 48 px / 400, labels 32 px / 500.
- Safe margin 120 px. 30-frame crossfade between scenes.

### Storyboard and narration

| Scene | Content |
| --- | --- |
| 1 `concept-lewis` | Concept statement; F₂ with bonding pair (line) and lone pairs (dots); octet ring |
| 2 `procedure-hcn` | Five step panels building H–C≡N |
| 3 `formal-charge-co2` | FC = V − N − B/2; O=C=O (all 0, preferred) vs O≡C–O (+1, 0, −1) |
| 4 `resonance-o3` | Hero: two O₃ structures ↔, hybrid with equal 128 pm bonds; struck "flips between structures" |
| 5 `pitfalls-exceptions` | Pitfalls box: H 2, BF₃ 6, NO 11 (odd), SF₆ 12; struck "Formal charge is a real charge" |
| 6 `closing-card` | Silent key-takeaways card, 10 s |

Scene ranges are budgeted from Kokoro's measured pace (about 2.45 words/s in Lesson 8) and re-synced to the measured clip lengths after the first CI render, so every silence between lines stays within 3–8 s.

1. "A Lewis structure is a diagram that shows how a molecule's valence electrons are arranged. We draw shared bonding pairs as lines, and unshared lone pairs as dots. The arrangement is guided by the octet rule, where main group atoms tend to form bonds until they are surrounded by eight valence electrons."
2. "Let's build H C N. First, count the valence electrons: one plus four plus five equals ten. Second, draw a skeleton with single bonds. H is never central, so carbon is in the middle. This uses four electrons. Third, complete terminal octets. H only gets two, so we put the remaining six electrons on nitrogen. Finally, carbon lacks an octet, so we convert two of nitrogen's lone pairs into bonding pairs, creating a triple bond."
3. "When multiple structures are possible, we use formal charge to choose the best one. Formal charge is the valence electrons minus nonbonding electrons minus half the bonding electrons. For C O two, a structure with two double bonds gives all atoms a formal charge of zero. A structure with a triple and single bond gives the oxygens charges of plus one and minus one. The structure with all zero formal charges is preferred."
4. "Sometimes, two or more valid structures can be drawn. For O three, we can draw a double bond on the left or the right. These are resonance structures. The real molecule is not a mixture that flips between them. It is a single resonance hybrid, an average of both structures. Both bonds in O three are equal at one hundred twenty-eight picometers, between a single and a double bond."
5. "Remember these common pitfalls. The octet rule has exceptions. Hydrogen is full with two electrons. B F three is electron deficient, N O has an odd number, and S F six has an expanded octet. Also, formal charge is not a real electrical charge; it is just hypothetical bookkeeping that assumes electrons are shared equally."
6. Card "Key Takeaways": Lewis structures show bonding and lone pairs; the octet rule guides structures but has exceptions; formal charge picks the best candidate structure; a resonance hybrid is one structure, an average.

F₂ in scene 1 is a counting illustration (7 + 7 = 14 valence electrons: one bonding pair, three lone pairs per F).

### Timing (first pass, estimated at 2.45 words/s)

| Scene | Frames | Narration start | Words |
| --- | --- | --- | --- |
| 1 `concept-lewis` | 0–816 | 30 | 52 |
| 2 `procedure-hcn` | 816–1914 | 846 | 75 |
| 3 `formal-charge-co2` | 1914–2988 | 1944 | 73 |
| 4 `resonance-o3` | 2988–4013 | 3018 | 69 |
| 5 `pitfalls-exceptions` | 4013–4896 | 4043 | 55 |
| 6 `closing-card` | 4896–5196 | silent | 0 |

### Shared Lewis drawing conventions

- Atoms are element symbols (no discs): 80 px / 500, `#1C1C1E`, centred on their coordinate.
- Bonds: 6 px emerald `#047857` round-capped lines between atoms 180 px apart (centre to centre), trimmed 44 px from each centre; double/triple bonds are parallel lines 16 px apart.
- Lone pair: two amber `#B45309` dots, radius 8, 20 px apart, centred 62 px from the atom centre on a free side (top, bottom, left, right).
- Formal charge badge: circle r 28 at (+58, −58) from the atom centre, white fill, 4 px stroke; text 32 px / 700. Blue `#1D4ED8` for positive, red `#B91C1C` for negative, muted `#4B5563` for 0.
- Beats are keyed to narrated phrases (each beat names the phrase that triggers it), not fixed frames.

### Stills

One per scene at a fully built moment, chosen after the cue timings are known.

## Status

- [x] Scope confirmed
- [x] Brief
- [ ] Design plan
- [ ] Build
- [ ] CI green, stills reviewed
- [ ] Recorded on main
