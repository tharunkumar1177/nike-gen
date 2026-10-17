import { AbsoluteFill, useVideoConfig } from "remotion";
import {
  dropped,
  fadeIn,
  lerp,
  pop,
  popped,
  progress,
} from "../components/anim";
import {
  ATOMS,
  atomAt,
  ImfLine,
  Molecule,
  Stage,
  type MoleculeSpec,
} from "../components/Molecule";
import { useSceneFrame } from "../components/SceneFrame";
import { F, Text, Title } from "../components/Text";
import { cue } from "../cues";
import { colors, type } from "../theme";

const SCENE = "dipole-dipole";
const PERMANENT_AT = cue(SCENE, "permanent dipoles");
const PLUS_AT = cue(SCENE, "delta plus end");
const MINUS_AT = cue(SCENE, "delta minus end");
const HCL_AT = cue(SCENE, "one hundred eighty eight");
const F2_AT = cue(SCENE, "nonpolar F two");
const MASS_AT = cue(SCENE, "similar mass");
const F2_BP_AT = cue(SCENE, "eighty five kelvin");

const ROW_Y = 520;
const DELTA_Y = ROW_Y - 72;

const HCL: MoleculeSpec = {
  atoms: [
    { el: "H", x: -40, y: 0 },
    { el: "Cl", x: 40, y: 0 },
  ],
  bonds: [[0, 1]],
};
const F2: MoleculeSpec = {
  atoms: [
    { el: "F", x: -40, y: 0 },
    { el: "F", x: 40, y: 0 },
  ],
  bonds: [[0, 1]],
};

const HCL_1 = { x: 1180, y: ROW_Y };
const HCL_2 = { x: 1450, y: ROW_Y };
const F2_1 = { x: 480, y: ROW_Y };
const F2_2 = { x: 720, y: ROW_Y };

export function DipoleScene() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();
  const first = fadeIn(frame, PERMANENT_AT);
  const slide = pop(frame, fps, PLUS_AT);
  const second = { x: lerp(HCL_2.x + 300, HCL_2.x, slide), y: ROW_Y };
  const deltas = popped(frame, fps, PERMANENT_AT + 15);
  const secondDeltas = Math.min(deltas.opacity, slide * 2);
  const fluorine = fadeIn(frame, F2_AT);
  const plus = { text: "δ+", color: colors.deltaPlusText };
  const minus = { text: "δ−", color: colors.deltaMinusText };
  const deltaLabels = [
    { ...plus, x: HCL_1.x - 40, opacity: deltas.opacity },
    { ...minus, x: HCL_1.x + 40, opacity: deltas.opacity },
    { ...plus, x: second.x - 40, opacity: secondDeltas },
    { ...minus, x: second.x + 40, opacity: secondDeltas },
  ];
  return (
    <AbsoluteFill>
      <Title opacity={fadeIn(frame, 0)}>Dipole-Dipole Attractions</Title>
      <Stage>
        <ImfLine
          from={atomAt(HCL, 1, HCL_1)}
          to={atomAt(HCL, 0, HCL_2)}
          color={colors.dipole}
          progress={progress(frame, MINUS_AT, MINUS_AT + 30)}
          trim={[ATOMS.Cl.r + 8, ATOMS.H.r + 8]}
        />
        <Molecule spec={HCL} at={HCL_1} opacity={first} />
        <Molecule spec={HCL} at={second} opacity={Math.min(1, slide * 2)} />
        <ImfLine
          from={atomAt(F2, 1, F2_1)}
          to={atomAt(F2, 0, F2_2)}
          color={colors.dispersion}
          progress={progress(frame, F2_AT + 15, F2_AT + 45)}
          trim={[ATOMS.F.r + 8, ATOMS.F.r + 8]}
        />
        <Molecule spec={F2} at={F2_1} opacity={fluorine} />
        <Molecule spec={F2} at={F2_2} opacity={fluorine} />
      </Stage>
      {deltaLabels.map(({ x, text, color, opacity }, i) => (
        <Text
          key={i}
          x={x}
          y={DELTA_Y}
          size={type.label}
          weight={700}
          anchor="middle"
          color={color}
          opacity={opacity}
          scale={deltas.scale}
        >
          {text}
        </Text>
      ))}
      <Text
        x={1315}
        y={640}
        size={type.body}
        weight={500}
        anchor="middle"
        opacity={first}
      >
        HCl (polar)
      </Text>
      <Text
        x={1315}
        y={725}
        size={type.subtitle}
        weight={700}
        anchor="middle"
        color={colors.dipoleText}
        {...popped(frame, fps, HCL_AT)}
      >
        188 K
      </Text>
      <Text
        x={600}
        y={640}
        size={type.body}
        weight={500}
        anchor="middle"
        opacity={fluorine}
      >
        <F>F2</F> (nonpolar)
      </Text>
      <Text
        x={600}
        y={725}
        size={type.subtitle}
        weight={700}
        anchor="middle"
        color={colors.dispersionText}
        {...popped(frame, fps, F2_BP_AT)}
      >
        85 K
      </Text>
      <Text
        x={960}
        y={870}
        size={type.body}
        anchor="middle"
        color={colors.muted}
        {...dropped(frame, MASS_AT)}
      >
        Similar molecular mass, so the difference comes from the dipoles
      </Text>
    </AbsoluteFill>
  );
}
