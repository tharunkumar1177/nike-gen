# Periodic Trends: Radius, Ionization Energy, Electron Affinity, Electronegativity

Chemistry Foundations, Lesson 6.

## Scope

- Audience: first-year university general chemistry
- Length: about 3 minutes
- Format: 1920×1080 landscape, 30 fps, H.264 MP4
- Narration: Kokoro TTS generated in CI, with a quiet, softened synth pad (lower chord, low level) generated in code
- Framework: Remotion (React/TypeScript). The lesson is built from an animated periodic-table heat map, trend arrows, and bar/line charts of measured values, which suits Remotion's React-driven diagram and data animation.
- Self-contained: Lesson 5 (table construction and blocks) is not built yet, so the lesson recaps only what it needs.
- Gap between consecutive topics (scenes) in the video: 3–8 seconds.
- Deliverables: `out/06-periodic-trends.mp4` and key frames in `out/stills/`

## Brief

Concept: radius, ionization energy, electron affinity and electronegativity all follow from Coulomb attraction between the nucleus and the valence electrons. Across a period, protons are added but electrons in the same shell shield each other poorly, so effective nuclear charge (Zeff) rises and valence electrons are held tighter. Down a group, valence electrons sit in a higher shell (larger n), farther from the nucleus.

### Definitions (sourced)

- Effective nuclear charge: Zeff = Z − S, the net positive charge a valence electron feels after shielding by other electrons. [OpenStax 6.5](https://openstax.org/books/chemistry-2e/pages/6-5-periodic-variations-in-element-properties)
- Slater's rules: electrons in the same s/p shell shield each other by about 0.35, so each step across a period raises Zeff by about +0.65 for that shell. [Slater, Phys. Rev. 36, 57 (1930)](https://doi.org/10.1103/PhysRev.36.57)
- Covalent radius: half the distance between the nuclei of two identical atoms joined by a single covalent bond. Data set: [Cordero et al., Dalton Trans. 2008, 2832](https://doi.org/10.1039/b801115j) (C value is sp³). OpenStax's figure uses an older, mixed set, so it is not used.
- First ionization energy (IE₁): energy required to remove the most loosely bound electron from a gaseous ground-state atom. [OpenStax 6.5]
- Electron affinity (EA): energy change when an electron is added to a gaseous atom. **Convention (user decision): IUPAC, EA = −ΔH, so EA is positive when energy is released.** A corner badge states this whenever EA data is on screen. [IUPAC Gold Book E01977](https://goldbook.iupac.org/terms/view/E01977)
- Electronegativity (EN): the power of an atom in a molecule to attract electrons to itself. Dimensionless, derived from bond-dissociation energies; not a measured energy of an isolated atom. [IUPAC Gold Book E01990](https://goldbook.iupac.org/terms/view/E01990)

### Values

| Element | Covalent radius (pm) | IE₁ (kJ/mol) | EA (kJ/mol, + = released) | EN (Pauling) |
| --- | --- | --- | --- | --- |
| Li | 128 | 520 | 59.6 | 0.98 |
| Be | 96 | 900 | < 0 (unbound) | 1.57 |
| B | 84 | 801 | 27.0 | 2.04 |
| C | 76 | 1086 | 121.8 | 2.55 |
| N | 71 | 1402 | < 0 (unbound) | 3.04 |
| O | 66 | 1314 | 141.0 | 3.44 |
| F | 57 | 1681 | 328.2 | 3.98 |
| Ne | 58 | 2081 | < 0 (unbound) | — |
| Na | 166 | 496 | | |
| K | 203 | 419 | | |
| Rb | 220 | 403 | | |
| Cs | 244 | 376 | | 0.79 |
| Fr | | | | 0.7 |
| Cl | 102 | | 348.6 | 3.16 |
| Br | 120 | | 324.5 | 2.96 |
| I | 139 | | 295.2 | 2.66 |

Sources: radius Cordero 2008; IE₁ [NIST ASD](https://physics.nist.gov/cgi-bin/ASD/ie.pl) (eV × 96.485, rounded to whole kJ/mol); EA [Andersen, Haugen & Hotop, J. Phys. Chem. Ref. Data 28, 1511 (1999)](https://pubs.aip.org/aip/jpr/article/28/6/1511/241881/Binding-Energies-in-Atomic-Negative-Ions-III); EN Allred, J. Inorg. Nucl. Chem. 17, 215 (1961) (Fr 0.7 is Pauling's estimate).

Isoelectronic series (10 electrons each), [Shannon 1976](https://doi.org/10.1107/S0567739476001551) effective ionic radii, coordination number VI:

| Ion | O²⁻ | F⁻ | Na⁺ | Mg²⁺ | Al³⁺ |
| --- | --- | --- | --- | --- | --- |
| Protons | 8 | 9 | 11 | 12 | 13 |
| Radius (pm) | 140 | 133 | 102 | 72 | 53.5 |

### Exceptions to show

- IE₁ Be → B dip (900 → 801): boron's electron is removed from 2p, which is higher in energy and more shielded than beryllium's 2s. [OpenStax 6.5]
- IE₁ N → O dip (1402 → 1314): oxygen's fourth 2p electron pairs in an occupied orbital; repulsion between the paired electrons makes it easier to remove. [OpenStax 6.5]
- EA unbound for N: the added electron must pair in an occupied 2p orbital, and pairing repulsion offsets the Zeff gain. [Andersen 1999]
- EA unbound for Be and Ne: the added electron must enter a higher-energy subshell (Be: 2p) or shell (Ne: 3s). [Andersen 1999]
- F < Cl in EA (328.2 < 348.6): fluorine is so small that the added electron suffers strong electron–electron repulsion. [OpenStax 6.5]

### Misconceptions to correct

- "Nuclear pull is shared out, so more electrons means less pull each": across a period Zeff rises (about +0.65 per step); protons win. [ERIC ED587760](https://eric.ed.gov/?id=ED587760); Slater 1930
- "Same-spin repulsion" causes the N → O dip: paired electrons have opposite spins; it is ordinary Coulomb repulsion within one orbital.
- EN and EA are the same thing: EA is a measured energy of an isolated gaseous atom (kJ/mol); EN is a dimensionless index of pull on bonding electrons. Nitrogen shows the difference: EA < 0 but EN 3.04.
- "Atoms want an octet": configurations are observed because they lower total energy, not because atoms want anything. [Taber 2000](https://science-education-research.com/downloads/publications/2000/Taber-2000-Multiple-frameworks-Evidence-of-manifold-conceptions-AMV.pdf)

### Teaching order

1. Model: Coulomb attraction, shells (n), shielding and Zeff (brief recap; Lesson 5 not yet built).
2. Atomic radius: decreases across period 2, increases down group 1.
3. Ionization energy: rises across, falls down; Be → B and N → O dips.
4. Electron affinity: IUPAC convention badge; general rise toward the halogens; N, Be, Ne unbound; F < Cl.
5. Electronegativity vs EA: nitrogen as the contrast; F highest (3.98), Cs/Fr lowest.
6. Worked example: rank O²⁻, F⁻, Na⁺, Mg²⁺, Al³⁺ by radius; same electron count, more protons, smaller ion.
7. Key takeaways card.

## Design plan

### Visual style

- 1920×1080, 30 fps, planned about 5210 frames (174 s); measured 5891 frames (196 s). Kokoro `af_heart` narration plus a softened code-generated pad.
- Background `#FFFFFF`; text `#1C1C1E`; axes and outlines `#4C566A`; neutral tile `#E5E9F0`.
- Property colours: radius `#88C0D0`, ionization energy `#D08770`, electron affinity `#B48EAD`, electronegativity `#A3BE8C`. Pitfall strike-outs `#D32F2F`.
- Type: Roboto. Title 96 px / 700, subtitle 64 px, body 48 px / 400, labels 32 px / 500.
- Safe margin 120 px. 30-frame crossfade between scenes.
- Corner badge "EA: energy released (+ = exothermic)" whenever EA data is on screen (scenes 4 and 5).

### Storyboard and narration

Planned timing (6.0 s silence between consecutive narration lines; video ends 3 s after the last word):

| Scene | Frames | Narration window |
| --- | --- | --- |
| 1 `model-zeff` | 0–720 | 120–630 |
| 2 `atomic-radius` | 690–1400 | 810–1300 |
| 3 `ionization-energy` | 1370–2300 | 1480–2200 |
| 4 `electron-affinity` | 2270–3200 | 2380–3100 |
| 5 `electronegativity` | 3170–3950 | 3280–3840 |
| 6 `worked-example` | 3920–4700 | 4020–4600 |
| 7 `closing-card` | 4670–5210 | 4780–5120 |

1. `model-zeff`: concept statement "Coulomb Attraction & Zeff"; nucleus pulling a valence electron through inner shielding shells; `Zeff = Z − S`; "Slater's rules: ~+0.65 per step"; pitfall strike-out "Nuclear pull is shared out".
   "Periodic trends follow from Coulomb attraction between the nucleus and valence electrons. Across a period, protons are added, but electrons in the same shell shield each other poorly. Following Slater's rules, effective nuclear charge, or Z effective, rises. Protons win, and valence electrons are held tighter."
2. `atomic-radius`: "Atomic Radius"; hero periodic-table trend map with radius arrows (decreases across period 2, increases down group 1); larger n down the group.
   "Because Z effective rises across period two, the nucleus pulls the electron cloud closer, so atomic radius decreases. Down group one, valence electrons sit in a higher shell. This larger n value means electrons are farther from the nucleus, so atomic radius increases."
3. `ionization-energy`: "First Ionization Energy"; trend map with IE arrows; line chart with Be → B (900 → 801 kJ/mol) and N → O (1402 → 1314 kJ/mol) dips; pitfall strike-out "same-spin repulsion" → "ordinary Coulomb repulsion".
   "First ionization energy is the energy required to remove the most loosely bound electron. It generally rises across a period and falls down a group. However, removing beryllium's two s electron takes nine hundred kilojoules per mole, while boron dips to eight hundred and one, because two p is higher in energy. Nitrogen to oxygen also dips, driven by ordinary Coulomb repulsion between paired electrons."
4. `electron-affinity`: "Electron Affinity"; EA badge; trend map with EA arrows; bar chart with N, Be, Ne unbound (< 0) and F 328.2 < Cl 348.6 kJ/mol; callout on fluorine's electron–electron repulsion.
   "Electron affinity is the energy change when an electron is added. By I U P A C convention, values are positive when energy is released. Affinity generally rises toward the halogens. However, nitrogen, beryllium, and neon are unbound, because the added electron must pair, or enter a higher subshell or shell. Fluorine releases less energy than chlorine, because its small size causes strong electron electron repulsion."
5. `electronegativity`: "Electronegativity"; EA badge; nitrogen contrast (EA < 0, EN 3.04); F highest (3.98), Cs (0.79) and Fr (0.7) lowest; pitfall strike-out "Atoms want an octet" → "Configurations simply lower total energy".
   "Electronegativity is an index of an atom's pull on bonding electrons, not a measured energy like affinity. Nitrogen shows this difference: its affinity is unbound, but its electronegativity is three point zero four. Fluorine is the highest at three point nine eight, while cesium and francium are the lowest."
6. `worked-example`: "Worked Example: Rank by Radius"; O²⁻, F⁻, Na⁺, Mg²⁺, Al³⁺; all 10 electrons, 8 → 13 protons; 140 → 53.5 pm; ions sort into size order.
   "Let's rank an isoelectronic series by radius: oxide, fluoride, sodium, magnesium, and aluminum ions. These all have ten electrons. As we move from eight protons in oxide to thirteen in the aluminum ion, the higher nuclear charge pulls the same ten electrons closer. Therefore, the aluminum three plus ion is the smallest."
7. `closing-card`: "Key Takeaways": "Zeff drives trends; valence electrons are held tighter across a period." / "Radius shrinks across, grows down." / "IE and EA generally rise across." / "Electronegativity is a bond-pull index, not an isolated energy."
   "Effective nuclear charge drives these trends. Radius shrinks across, but grows down. Ionization energy and affinity generally rise across. Finally, electronegativity measures bond pull, not isolated energy."

### Stills

One per scene, mid-narration (planned 380, 1060, 1840, 2740, 3560, 4310, 4950; recomputed from measured timing).

### Frame-by-frame

Delivered by `designer` in three sequences (scenes 1–2, 3–4, 5–7); exact coordinates live in `src/scenes/*`. Every beat is keyed to a spoken phrase. Summary:

- Titles top-aligned at (120, 120), 96 px.
- Trend map (scenes 2–4): main-group only, 8 columns (groups 1, 2, 13–18) × 7 periods, 80 px cells, 8 px gap, 88 px unlabeled gap where the d-block is omitted; origin (180, 320), right edge 956. Only Brief elements carry symbols/values (symbol 24 px, value 16 px); other cells blank. Fill is the property colour with opacity scaled linearly from the lowest shown value (20%) to the highest (100%). Fr: symbol only, no fill, no value. Trend arrows 8 px stroke, 24 px head: horizontal above the map, vertical left of it.
- Chart frame (scenes 3–4): (1040, 320), 760×560; chart title at y 260; y-axis label rotated at x 980; x-axis label at y 920; 4 px `#4C566A` axes; 24 px ticks.
- Scene 1: nucleus at (450, 600), inner shell r 120 with two electrons, valence shell r 250 contracting to 200 on "held tighter"; pull arrow; "+1" on "Across a period"; `Zeff = Z − S` and the Slater note at x 1000; pitfall box at (1000, 650).
- Scene 2: period 2 radii fill on "Because Z effective rises", "Decreases" arrow on "atomic radius decreases", group 1 on "Down group one", "Increases" arrow and the note "Larger n value = farther from nucleus" at (1040, 500) on "larger n value".
- Scene 3: period 2 + group 1 IE fill; IE₁ line chart Li–Ne (0–2500 kJ/mol, 500 ticks); Be/B halos and "2p higher energy" note, then N/O halos; pitfall "Same-spin repulsion" → "Ordinary Coulomb repulsion" in the chart's empty upper-left.
- Scene 4: EA badge; period 2 + group 17 fill (Be, N, Ne white with "< 0"); bar chart −100 to 400 kJ/mol, zero line at y 768; unbound elements drawn as 20 px hatched stubs below zero labelled "< 0" (no invented values); notes "Must pair" (N), "Higher subshell" (Be), "Higher shell" (Ne); F and Cl map cells pulse; callout "F < Cl: small size, strong e⁻/e⁻ repulsion".
- Scene 5: EA badge; nitrogen card (120, 260) "Nitrogen (N)" / "EA: < 0 (unbound)" / "EN: 3.04"; extremes panel "Highest: F 3.98" then "Lowest: Cs 0.79, Fr 0.7"; pitfall box (120, 560) "Atoms want an octet" → "Configurations simply lower total energy".
- Scene 6: step 1 ion list (y 260), step 2 "10 electrons each. Protons: 8, 9, 11, 12, 13" (y 340), step 3 circles at 1 px radius per pm centred on y 650 (x 300, 620, 890, 1100, 1260), scale label (y 820), step 4 "Answer: Al³⁺ is the smallest" (y 880).
- Closing card: four takeaways staggered on their spoken phrases.

### Implementation notes

- Timing is measured, not guessed: `audio/generate.js` speaks every line, then lays the timeline out from the measured clip lengths using the planned spacing (narration starts 120 frames into scene 1 and 110 frames into later scenes; 180-frame silence between lines; 30-frame crossfade; 90-frame end hold). It writes `src/timeline.json`, which the composition, the cues and the stills read. The committed `timeline.json` holds the measured layout from the first green render: Kokoro ran at about 2.5 words/s (lines 21.33, 19.20, 26.10, 27.50, 20.40, 23.10, 15.73 s), giving 5891 frames (196.4 s) with every gap exactly 6.0 s. The generator fails if any gap leaves 3–8 s, narration overlaps a crossfade, or the total leaves 150–200 s.
- Stills: two per scene, mid-narration and 1 s after the last word, computed from the measured timeline.

Implementation deviations (layout fixes, no content change):

- Trend-arrow labels sit at the arrow tip (horizontal) or rotated beside it (vertical) so they clear the title and the 120 px margin; horizontal arrow at y 288, vertical at x 166 from period 2 down.
- Each map shows its unit in the empty period-1 row ("Covalent radius (pm)", "IE₁ (kJ/mol)", "EA (kJ/mol)").
- Chart plot area is inset in the frame (1112–1780 × 340–820) so tick labels clear the rotated y-axis label; EA zero line at y 724.
- Scene 1 adds the labels "Valence electron", "Shielding" and "+1 proton", and the pitfall correction "Zeff rises across a period" (Brief fact), matching the other pitfall boxes.
- Scene 2 adds the note "Higher Zeff = electrons pulled closer" opposite "Larger n value = farther from nucleus"; notes split over two lines to fit.
- Scene 3 labels the dip points with their values (900, 801, 1402, 1314); the note "2p higher energy" sits under boron to clear the line.
- Scene 4 reason notes sit under the hatched stubs at 24 px; the F/Cl callout is two lines at 26 px ("F < Cl: 328.2 < 348.6 kJ/mol" / "small size, strong e⁻–e⁻ repulsion") placed between the y-axis and the F bar. Badge text uses the darker EA tone `#7C5375` for contrast and is right-aligned to the safe margin.
- Scene 5 EN values use the darker green `#4A7A40` for contrast on the grey panels; the extremes panel is 760 px wide so "Lowest: Cs 0.79, Fr 0.7" fits.
- Scene 6 circles carry their ion label and radius in pm; Al³⁺ gets a ring on the answer. The ions are already in size order, so there is no re-sort animation.
- Closing card bullets are 44 px so the first takeaway fits on one line.

## Status

- [x] Scope confirmed
- [x] Brief
- [x] Design plan
- [x] Build
- [x] CI green ([run 39017381857](https://github.com/tharunkumar1177/nike-gen/actions/runs/39017381857)); all 14 stills reviewed against the design plan with user approval, no mismatches
- [x] Recorded on main (PR [#9](https://github.com/tharunkumar1177/nike-gen/pull/9))
