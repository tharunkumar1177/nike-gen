# Intermolecular Forces & Property Trends

Chemistry Foundations, Lesson 13.

## Scope

- Audience: first-year university general chemistry
- Length: about 3 minutes
- Format: 1920×1080 landscape, 30 fps, H.264 MP4
- Narration: Kokoro TTS generated in CI, with a quiet synth pad generated in code
- Framework: Remotion (React/TypeScript). The lesson is a narrated explainer built from molecular diagrams, partial-charge and dipole animations, and boiling-point charts, all 2D diagram and text animation that suits Remotion.
- Required elements (ROADMAP): concept statement, hero diagram, step panels, at least one worked example, pitfalls box, key-takeaways card.
- Gap between topics within the video: 3 to 8 seconds.
- Deliverables: `out/intermolecular-forces-property-trends.mp4` and key frames in `out/stills/`

## Brief

Concept: intermolecular forces (IMFs) are attractions between molecules. They are much weaker than the covalent bonds inside molecules, and their strength sets physical properties: boiling point, vapour pressure, viscosity and surface tension.

### Definitions (sourced)

- Intramolecular forces hold atoms together within a molecule (covalent bonds); intermolecular forces are attractions between molecules. Boiling and other phase changes overcome IMFs only; covalent bonds stay intact. [OpenStax 10.1](https://openstax.org/books/chemistry-2e/pages/10-1-intermolecular-forces)
- London dispersion forces: attractions between temporary (instantaneous) dipoles and the dipoles they induce; present between all molecules. Strength grows with polarizability (ease of distorting the electron cloud), which grows with size/molar mass; elongated shapes with more contact area have stronger dispersion than compact ones. [OpenStax 10.1]
- Dipole-dipole attractions: between the permanent dipoles of polar molecules (δ+ end of one toward δ− end of another). [OpenStax 10.1]
- Hydrogen bonding: a particularly strong dipole-dipole attraction between H bonded to a highly electronegative atom (N, O or F) and a lone pair on N, O or F of a nearby molecule. Hydrogen bonds are intermolecular, not covalent; about 5 to 10 % as strong as covalent bonds, but generally much stronger than other dipole-dipole and dispersion forces. [OpenStax 10.1]. IUPAC 2011 allows a broader set of donors/acceptors ([IUPAC](https://publications.iupac.org/pac/pdf/2011/pdf/8308x1637.pdf)); the lesson teaches the first-year N, O, F criterion.
- Property trends: stronger IMFs give higher boiling point, lower vapour pressure [OpenStax 10.3](https://openstax.org/books/chemistry-2e/pages/10-3-phase-transitions), higher viscosity and higher surface tension [OpenStax 10.2](https://openstax.org/books/chemistry-2e/pages/10-2-properties-of-liquids).

### Values

| Quantity | Value | Source |
| --- | --- | --- |
| Molar mass CH₄ / SiH₄ / GeH₄ / SnH₄ | ≈ 16 / 32 / 77 / 123 g/mol; bp order CH₄ < SiH₄ < GeH₄ < SnH₄ | OpenStax 10.1 |
| bp n-pentane / neopentane (C₅H₁₂) | 36 °C / 9.5 °C | OpenStax 10.1; NIST WebBook (36.1, 9.5) |
| bp F₂ / HCl (similar mass) | 85 K / 188 K | OpenStax 10.1; NIST WebBook |
| bp H₂O: trend-predicted vs actual | about −80 °C vs 100 °C | OpenStax 10.1 |
| bp propane / dimethyl ether / ethanol | −42 °C / −25 °C / 78 °C (44, 46, 46 g/mol) | OpenStax 10.1 (−42.1, −24.8, 78.4–78.5) |
| Surface tension at 25 °C, water / ethanol | 71.99 / 21.97 mN/m | OpenStax 10.2 Table 10.3 |
| Viscosity at 25 °C, ethanol / ethylene glycol | 1.074 / 16.1 mPa·s | OpenStax 10.2 Table 10.2 |

### Worked example: rank boiling points of propane, dimethyl ether, ethanol

1. Similar shape and molar mass (44, 46, 46 g/mol), so dispersion forces are similar.
2. Propane CH₃CH₂CH₃ is nonpolar: dispersion only.
3. Dimethyl ether CH₃OCH₃ is polar: adds dipole-dipole (no H on O, so no hydrogen bonding between its molecules).
4. Ethanol CH₃CH₂OH has O–H: adds hydrogen bonding.
5. Ranking: propane (−42 °C) < dimethyl ether (−25 °C) < ethanol (78 °C).

### Misconceptions to correct

- Boiling breaks covalent bonds. Boiling separates molecules; O–H bonds in water stay intact. [OpenStax 10.1]
- A hydrogen bond is a covalent bond to H. It is an intermolecular attraction, about 5–10 % as strong as a covalent bond. [OpenStax 10.1]
- Polar always beats nonpolar. Dispersion grows with size; compare only when size and shape are similar (e.g. SnH₄ trend; pentane isomers). [OpenStax 10.1]
- Any H in the molecule means hydrogen bonding. H must be bonded to N, O or F (dimethyl ether's H atoms are on C). [OpenStax 10.1]

### Decisions

- The researcher's kJ/mol energy ranges were dropped: the cited OpenStax page gives no such ranges. The lesson uses OpenStax's "about 5 to 10 % as strong as covalent bonds".
- Worked example switched from CH₄/HCl/H₂O (unequal masses) to OpenStax's propane/dimethyl ether/ethanol, which holds size constant.
- Boiling points shown to whole degrees (pentane isomers to OpenStax precision) because OpenStax lists ethanol as both 78.4 and 78.5 °C.

### Teaching order

1. Intra vs inter: bonds within vs attractions between; boiling separates molecules.
2. London dispersion: temporary dipoles, polarizability, size (group 14 hydrides) and shape (pentane isomers).
3. Dipole-dipole: permanent dipoles; F₂ 85 K vs HCl 188 K.
4. Hydrogen bonding: N, O, F criterion; water predicted −80 °C vs actual 100 °C.
5. Property trends: boiling point, vapour pressure, viscosity, surface tension.
6. Worked example: propane < dimethyl ether < ethanol.
7. Pitfalls box, then key-takeaways card.

## Design plan

Narration text lives in `audio/script.json`; on-screen cues are tied to spoken phrases via `src/cues.ts`.

### Timing

Same scheme as Lesson 7: each narrated scene lasts its declared clip length (`seconds`) plus a 180-frame gap; narration starts 30 frames in, so lines are separated by 6 s of silence. `audio/generate.js` fails CI if any gap leaves 3–8 s and prints the measured lengths. 30-frame crossfades; silent 360-frame closing card. Estimated runtime about 183 s.

### Style

Bright textbook: white background, Roboto (latin + greek subsets, for δ), type scale 96 / 64 / 48 / 32, 120 px safe margin. Arrows are SVG.

| Token | Fill / stroke | Text | Role |
| --- | --- | --- | --- |
| covalent | #4C566A | #4C566A | covalent bonds (solid 8 px) |
| dispersion | #88C0D0 | #2B7992 | London dispersion |
| dipole | #B48EAD | #7C5375 | dipole-dipole |
| hbond | #A3BE8C | #4A7A40 | hydrogen bonds |
| δ+ | #81A1C1 | #3E6A99 | partial positive |
| δ− | #D08770 | #A55B46 | partial negative |
| pitfall | #FFEBEE | #D32F2F | pitfalls box |

Atoms: H r 24 white with dark outline; C r 32 #4C566A; O r 32 #BF616A; F r 32 / Cl r 36 #A3BE8C; Si 36 / Ge 40 / Sn 48 #B48EAD. Intermolecular attractions are 8 px dashed lines (12/12) in the force colour.

### Scenes

1. `intra-vs-inter`: "Intermolecular Forces"; concept statement "IMFs: attractions between molecules, / much weaker than the bonds within them." Three waters at y 660 with "Covalent bond" and "Intermolecular force" labels; on "substance boils" they fly apart and the dashed lines vanish; bonds swell on "stay intact" with caption "Covalent bonds stay intact".
2. `london-dispersion` (hero): Size panel: CH₄, SiH₄, GeH₄, SnH₄ with growing electron clouds, molar masses 16/32/77/123 g/mol, CH₄ cloud shifts to show δ−/δ+, arrow "Boiling point increases". Shape panel: n-pentane (elongated cloud, 36 °C) vs neopentane (round cloud, 9.5 °C), "Both C₅H₁₂".
3. `dipole-dipole`: HCl pair head-to-tail with δ+/δ− labels and a dashed dipole line, "HCl (polar) 188 K"; F₂ pair with dispersion line, "F₂ (nonpolar) 85 K"; caption "Similar molecular mass, so the difference comes from the dipoles".
4. `hydrogen-bonding`: three waters with lone pairs and dashed H-bonds; criteria "1. H bonded to N, O or F" and "2. Lone pair on N, O or F of a nearby molecule" with rings on the donor O–H and acceptor lone pair; "Trend predicts −80 °C" then arrow to "Actual: 100 °C".
5. `property-trends`: "Stronger IMFs hold molecules together more tightly"; four panels: Boiling point, Viscosity, Surface tension (water 71.99 / ethanol 21.97 mN/m at 25 °C) with up arrows "Higher", Vapour pressure with down arrow "Lower".
6. `worked-example`: propane, dimethyl ether, ethanol (ball-and-stick, heavy atoms + O–H), formulas and 44/46/46 g/mol; badges stack Dispersion / Dipole-dipole / Hydrogen bond; boiling points −42 °C < −25 °C < 78 °C.
7. `pitfalls`: red box with three struck-through misconceptions and corrections (boiling vs covalent bonds; H-bond strength 5–10 %; polar vs size).
8. Closing card "Key Takeaways", four bullets.

### Build adjustments to the designer plan

- Size panel labels hydrides with molar mass (the brief has no boiling points for them) and adds GeH₄.
- Viscosity panel shows no figures: OpenStax attributes water's high surface tension to hydrogen bonding but does not attribute the viscosity table values to IMFs alone. Surface tension figures use the brief's exact values, not the designer's rounding.
- δ+ text colour changed from #3B4252 to #3E6A99 so δ+ and δ− are distinguishable.
- H atoms get a dark outline (a pale stroke disappears on white); bond lengths lengthened so bonds are visible between atoms.

## Status

- [x] Scope
- [x] Research
- [x] Design
- [x] Build
- [ ] CI green
- [ ] Merged
