# Quantum Model: Orbitals s/p/d/f, Shapes, Nodes

Chemistry Foundations, Lesson 3.

## Scope

- Audience: first-year university general chemistry
- Length: about 4.5 minutes (4–5 min window)
- Format: 1920×1080 landscape, 30 fps, H.264 MP4
- Narration: Kokoro TTS generated in CI, with a quiet synth pad generated in code
- Framework: Remotion (React/TypeScript) with `@remotion/three` (three.js). The lesson is a narrated explainer whose hero visuals are 3D orbital shapes and nodal planes, so three.js renders surfaces computed from the real hydrogen-like wavefunctions while Remotion handles narration sync, kinetic text, and charts (radial plots, cross-section density maps).
- Deliverables: `out/quantum-model-orbitals.mp4` and key frames in `out/stills/`

## Brief

Concept: an electron in an atom is not a particle on a path but a standing wave ψ described by quantum numbers n, l, m_l; ψ² gives probability density, and the wave's shape, phase signs, and nodes follow directly from n and l.

### Definitions (sourced)

- Bohr's fixed orbits are incompatible with the uncertainty principle; the quantum-mechanical model gives no path, only a wavefunction ψ. [OpenStax 6.3](https://openstax.org/books/chemistry-2e/pages/6-3-development-of-quantum-theory)
- ψ² is the probability density of finding the electron at a point. An orbital is the wavefunction; it is drawn as a boundary surface enclosing about 90% of the probability. [OpenStax 6.3]
- Quantum numbers [OpenStax 6.3]:
  - n = 1, 2, 3, …: size and energy.
  - l = 0 … n−1: shape; letters s, p, d, f for l = 0, 1, 2, 3.
  - m_l = −l … +l: orientation; 2l+1 orbitals per subshell (s 1, p 3, d 5, f 7).
  - m_s: electron spin, ±½; not an orbital property (mention only).
- Shapes: s sphere; p dumbbell along x, y, or z (p_x, p_y, p_z); d: four cloverleaves (d_xy, d_xz, d_yz, d_x²−y²) and d_z² (two lobes on z plus a torus in the xy plane); f: seven orbitals. In this lesson they're shown in the general set: f_z³, f_xz², f_yz², f_xyz, f_z(x²−y²), f_x(x²−3y²), f_y(3x²−y²). [OpenStax 6.3]; [LibreTexts 2.2.4 f-orbitals](https://chem.libretexts.org/Bookshelves/Inorganic_Chemistry/Map%3A_Inorganic_Chemistry_(Miessler_Fischer_Tarr)/02%3A_Atomic_Structure/2.02%3A_The_Schrodinger_Equation/2.2.04%3A_f-orbitals)
- Phase sign (+/−) is the sign of the wave amplitude, which matters when orbitals combine (constructive or destructive overlap). It is not electric charge. [LibreTexts 6.6 Orbital Nodes](https://chem.libretexts.org/Bookshelves/Physical_and_Theoretical_Chemistry_Textbook_Maps/Map%3A_Physical_Chemistry_(McQuarrie_and_Simon)/06%3A_The_Hydrogen_Atom/6.06%3A_Orbital_Nodes)
- Nodes are surfaces where ψ = 0, so the probability density is zero. Total nodes = n−1; angular nodes = l (planes or cones); radial nodes = n−l−1 (spheres). [LibreTexts 6.6]
- The radial probability distribution r²R² gives the probability at distance r; 1s, 2s, and 3s have 0, 1, and 2 radial nodes, and the outer peak moves outward as n grows. [LibreTexts 6.6]

### Values (hydrogen, Z = 1, ρ = r/a₀)

| Quantity | Value |
| --- | --- |
| 2s radial node | r = 2 a₀ |
| 3s radial nodes | r = (9 ± 3√3)/2 a₀ ≈ 1.90 a₀ and 7.10 a₀ |
| 3p radial node | r = 6 a₀ |
| d_z² nodal cones | θ = arccos(±1/√3) ≈ 54.7° and 125.3° from the z axis |
| Node counts | 2s: 1 radial, 0 angular; 3p: 1 radial, 1 angular; 3d: 0 radial, 2 angular; 4f: 0 radial, 3 angular |

Radial polynomial factors (normalisation is irrelevant because the 90% boundary is found numerically): R10 ∝ e^−ρ; R20 ∝ (2−ρ)e^−ρ/2; R21 ∝ ρe^−ρ/2; R30 ∝ (27−18ρ+2ρ²)e^−ρ/3; R31 ∝ ρ(6−ρ)e^−ρ/3; R32 ∝ ρ²e^−ρ/3; R40 ∝ (192−144ρ+24ρ²−ρ³)e^−ρ/4; R43 ∝ ρ³e^−ρ/4. Real angular parts in Cartesian form (times r^−l): p_x ∝ x, p_y ∝ y, p_z ∝ z; d_z² ∝ 3z²−r², d_xz ∝ xz, d_yz ∝ yz, d_x²−y² ∝ x²−y², d_xy ∝ xy; f_z³ ∝ z(5z²−3r²), f_xz² ∝ x(5z²−r²), f_yz² ∝ y(5z²−r²), f_xyz ∝ xyz, f_z(x²−y²) ∝ z(x²−y²), f_x(x²−3y²) ∝ x(x²−3y²), f_y(3x²−y²) ∝ y(3x²−y²). [LibreTexts: The Hydrogen Atom](https://chem.libretexts.org/Bookshelves/Physical_and_Theoretical_Chemistry_Textbook_Maps/Map%3A_Physical_Chemistry_(McQuarrie_and_Simon)/06%3A_The_Hydrogen_Atom)

### Misconceptions to correct

- "The electron travels a figure-8 path around the p lobes": there's no path, only a probability density.
- "A node is a wall the electron can't cross": a node is where a standing wave has zero amplitude, not a barrier.
- "The boundary surface is a hard edge": density fades continuously; the surface is a 90% convention.
- "The two p lobes are two orbitals": they are one orbital with opposite phase.
- "+/− means charge": it is the sign of the wave amplitude.

### Decisions

- Shapes are true ψ isosurfaces enclosing 90% probability, computed from the hydrogen functions above (2p, 3d, 4f for the shape gallery), coloured by phase.
- f orbitals are shown in the general set (names above), not the cubic set; this is stated on screen as "general set".
- No energies or numeric probability values beyond the node radii and the cone angle.

### Teaching order

1. Orbits fail: Bohr path dissolves into a ψ² density cloud; the 90% boundary convention.
2. Quantum numbers n, l, m_l and the subshell letters with their counts (1, 3, 5, 7).
3. s orbitals and radial nodes: 1s, 2s, 3s cross-sections plus r²R² plots (nodes at 2 a₀; 1.90 and 7.10 a₀).
4. p orbitals: three orientations, phase colours, nodal planes; one orbital, not two.
5. d orbitals: four cloverleaves plus d_z²; two angular nodes; 54.7° cones.
6. f orbitals: seven, general set; three angular nodes.
7. Node-counting rules with worked examples (2s, 3p, 3d, 4f), then key takeaways.

## Design plan

### Visual style

- 1920×1080, 30 fps, 8100 frames (270 s). Kokoro `af_heart` narration plus code-generated pad.
- Background `#FFFFFF`; text `#1C1C1E`; axes `#4C566A`; grid `#E5E9F0`.
- Phase colours (colour-blind safe, not red/green): positive `#1E88E5` (blue), negative `#FFC107` (amber).
- Nodal surfaces: translucent grey `#9E9E9E` at 40% opacity with a white wireframe.
- 3D orbitals: real ψ isosurfaces (90% boundary), software WebGL, at most 7 meshes on screen.
- Type: Roboto (Google Fonts). Title 96 px / 700, subtitle 64 px, body 48 px / 400, labels 32 px / 500.
- Safe margin 120 px. 30-frame crossfade between scenes.

### Storyboard and narration

| Scene | Frames | Narration window |
| --- | --- | --- |
| 1 `orbits-fail` | 0–1050 | 30–900 |
| 2 `quantum-numbers` | 1050–2100 | 1080–2010 |
| 3 `s-orbitals-nodes` | 2100–3450 | 2130–3360 |
| 4 `p-orbitals` | 3450–4500 | 3480–4410 |
| 5 `d-orbitals` | 4500–5550 | 4530–5460 |
| 6 `f-orbitals` | 5550–6600 | 5580–6450 |
| 7 `node-counting` | 6600–7800 | 6630–7650 |
| 8 `closing-card` | 7800–8100 | silent |

1. 2D. A Bohr orbit dissolves into a ψ² dot cloud; a hard boundary circle softens into a gradient, then the 90% boundary forms.
   "Bohr's fixed orbits are incompatible with the uncertainty principle. The quantum-mechanical model gives no path, only a wavefunction, psi. Psi squared gives the probability density of finding the electron at a point. The boundary surface is not a hard edge; density fades continuously. We draw an orbital as a surface enclosing about ninety percent of the probability."
2. Kinetic table: n (size and energy), l (shape; s, p, d, f for 0–3), m_l (orientation; 1, 3, 5, 7 orbitals); m_s (spin, ±½) set apart below.
   "Orbitals are described by quantum numbers. The principal number, n, determines size and energy. The angular number, l, determines shape, using letters s, p, d, and f for l equals zero, one, two, and three. The magnetic number, m sub l, determines orientation, giving one, three, five, or seven orbitals per subshell. Electron spin is a separate property, not part of the orbital."
3. 2D. 1s, 2s, 3s cross-section density maps side by side; r²R² plots below; node labels "2 a₀", "1.90 a₀", "7.10 a₀".
   "The s orbitals are spheres. A cross-section of the one s orbital shows continuous density. The two s and three s orbitals have radial nodes, spherical surfaces where psi is zero, so the probability density is zero. A node is not a barrier the electron can't cross. The radial probability distribution shows the outer peak moves outward as n grows. Two s has one node at two a naught; three s has two nodes at one point nine and seven point one a naught."
4. 3D. p_x, p_y, p_z; p_z highlighted with blue and amber lobes; grey nodal plane between the lobes.
   "The three p orbitals are dumbbells along the x, y, and z axes. The electron does not travel a figure-eight path; there is only a probability density. The two lobes are a single orbital with opposite phase signs. This is the sign of the wave amplitude, not electric charge, and it matters for overlap. The plane between the lobes is an angular node."
5. 3D. Five d orbitals; four cloverleaves; d_z² highlighted with lobes and torus; nodal cones at 54.7°.
   "There are five d orbitals. Four are cloverleaves: d x y, d x z, d y z, and d x squared minus y squared. The fifth, d z squared, has two lobes on the z axis and a torus in the x y plane. All d orbitals have two angular nodes. For the cloverleaves, these are planes. For d z squared, the nodes are two cones at fifty-four point seven degrees from the z axis."
   (Revised after review; the first draft claimed the cloverleaves are "named for their planes". Scene 4's line was also tightened to 55 words.)
6. 3D. Seven f orbitals, general set, rotating slowly; phase colours alternate across nodes.
   "The seven f orbitals are shown here in the general set, such as f z cubed and f x y z. They have complex shapes with three angular nodes, which can be planes or cones. The alternating phase colours show how the wave amplitude changes sign across each node."
7. Rules (total n−1, angular l, radial n−l−1) and an example table: 2s, 3p, 3d, 4f.
   "We can count nodes using simple rules. Total nodes equal n minus one. Angular nodes equal l, and radial nodes equal n minus l minus one. For example, two s has one radial node and zero angular nodes. Three p has one radial and one angular node. Three d has zero radial and two angular nodes. Four f has zero radial and three angular nodes."
8. Silent card "Key Takeaways": "Orbitals are probability density standing waves, not paths." / "n, l, m_l determine size, shape, and orientation." / "Phase signs matter for overlap, not charge." / "Nodes are surfaces of zero probability, not barriers."

### Stills

Frames 950, 2000, 3350, 4400, 5450, 6500, 7700, 8050.

### Rendering primitives

Frame plans should be expressed with these building blocks. All positions are in screen pixels (origin top-left, 1920×1080) and all frames are local to the scene (0 = scene start).

- `Orbital3D { orbital, cx, cy, size, rotX, rotY, rotZ, opacity }`: a ψ isosurface (90% boundary) of one named orbital (1s, 2s, 2p_x, 2p_y, 2p_z, 3d_xy, 3d_xz, 3d_yz, 3d_x²−y², 3d_z², or 4f in the general set), lobes coloured by phase. It's rendered with an orthographic camera so `size` is the on-screen diameter in px of the orbital's bounding sphere. Rotations are in degrees and may be animated. The default view is z up, x toward the viewer's lower left, and y to the right, at 20° elevation.
- `NodalPlane3D` / `NodalCone3D`: attached to an `Orbital3D`, translucent grey, with fade in/out.
- `Axes3D`: thin x/y/z axis lines with labels, attached to an `Orbital3D`.
- `DensityMap { orbital, cx, cy, size, plane }`: a 2D ψ² heat map of a cross-section through the nucleus (white to phase colour; the sign of ψ is shown by hue), with optional node rings or lines.
- `RadialPlot { orbitals[], x, y, w, h, rMax (a₀) }`: r²R² curves that draw on, with optional node markers and labels.
- `DotCloud { cx, cy, radius, count ≤ 3000 }`: points sampled from 1s ψ² in projection, deterministic, with fade-in.
- `Label`, `Arrow`, `Table`, `Card`: Roboto text and SVG primitives, spring or ease in.

### Frame-by-frame

The `designer` delivered four sequences (scenes 1–2, 3, 4–5, 6–8). Exact coordinates and timings live in `src/scenes/*`. Summary (scene-local frames):

- Scene 1: title 0–120; Bohr orbit with an orbiting electron; 3000-dot 1s ψ² cloud at 70 px/a₀; "Wavefunction ψ" at 160, swapped for "ψ²: Probability Density" at 300; 1s density map 470–670; translucent 1s 90% surface from 610 with "90% Boundary Surface".
- Scene 2: title at 30; table columns at x 300/500/800/1200; rows n (120), l (225), m_l (500); spin card at 720.
- Scene 3: 3D 1s sphere 30–140, then 1s/2s/3s density maps (half-widths 5/10/15 a₀) with dashed node rings; amber "not a barrier" callout 580–740; r²R² plot out to 20 a₀ from 750, curves drawn 780–880; node markers at 970 (2 a₀) and 1100 (1.90 and 7.10 a₀), with the rings pulsing.
- Scene 4: 2p_x/2p_y/2p_z at size 350, rotating 0.2°/frame about z; axes and labels at 120/150/180; phase legend at 400; nodal plane on 2p_z at 660.
- Scene 5: five 3d orbitals at size 280 (rows y 380/740); labels 110–280; d_z² pulse at 340; cloverleaf nodal plane pairs at 570; d_z² cones at 690.
- Scene 6: seven 4f orbitals at size 240 (4 + 3 grid), staggered 15 frames, rotating 0.2°/frame about y; three nodal planes on f_xyz at 300.
- Scene 7: rules at 60/150/240; table header at 350; rows 2s/3p/3d/4f at 400/550/700/850, each with an 80 px 3D thumbnail.
- Scene 8: card title at 0; takeaway lines at 60/90/120/150.

Implementation deviations (geometry and legibility only, no content change):

- Scene 1: the title fades out at 90–120 so the Bohr orbit has time on screen (100–220). The 1s boundary surface uses the same 70 px/a₀ scale as the cloud and density map, rather than the plan's 700 px, so the 90% surface is shown at its true size.
- Scene 2: the spin text is 40 px so it fits inside its 1200 px card.
- Scene 3: panels are 340 px at y 345 with labels at y 140, inside the safe margin. The plot is at y 630–870 so the axis title fits. The callout is dark text on an amber pill, because amber text on white is unreadable. The "2 a₀" and "1.90 a₀" labels sit above the plot on opposite sides of their lines because the nodes are only 0.1 a₀ apart. Curve legend added. Marker labels are coloured by curve.
- Scenes 4–5: the plan's base rotX 20° duplicates the default 20° view elevation, so it is not applied (it would tilt p_z off vertical). Small axis letters were added at the p axis tips. A "Nodal cones at 54.7°" label sits beside d_z². Orbital labels are 40 px for subscript legibility.
- Scene 6: the caption reads "Seven 4f orbitals, general set".
- Scene 7: thumbnails are 2s, 3p_z, 3d_xy, and 4f_xyz.
- Narration re-sync ([run 38737647908](https://github.com/tharunkumar1177/nike-gen/actions/runs/38737647908)). At speed 1, Kokoro ran 2.3–3.0 words/s, and every line ended 1.5–11 s before its window. The voice is now at speed 0.88, closer to the planned 138 wpm. Cues were re-timed from each line's measured words/s:
  - Scene 3: maps 87/201/247, callout 453–613, plot 567, node markers 715 and 807.
  - Scene 4: labels 166/181/196, legend 499, emphasis 680, plane 816.
  - Scene 5: labels 122/156/190/224/316, torus 476, planes 613, cones 682.
  - Scene 6: f_xyz planes 358.
  - Scene 7: rules 119/195/259, header 361, rows 386/513/628/742.
  - Scenes 1–2 already matched within about 10 frames.

## Status

- [x] Scope confirmed
- [x] Brief
- [x] Design plan
- [x] Build
- [ ] CI green, stills reviewed
- [ ] Merged
