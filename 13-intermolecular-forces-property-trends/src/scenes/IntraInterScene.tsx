import { AbsoluteFill } from "remotion";
import { dropped, easeInOut, fadeIn, lerp, progress } from "../components/anim";
import {
  ATOMS,
  atomAt,
  BOND_WIDTH,
  ImfLine,
  Molecule,
  Stage,
  water,
  type Point,
} from "../components/Molecule";
import { useSceneFrame } from "../components/SceneFrame";
import { Text, Title } from "../components/Text";
import { cue } from "../cues";
import { colors, type } from "../theme";

const COVALENT_AT = cue("intra-vs-inter", "strong covalent bonds");
const IMF_AT = cue("intra-vs-inter", "weaker attractions");
const BOIL_AT = cue("intra-vs-inter", "substance boils");
const INTACT_AT = cue("intra-vs-inter", "stay intact");

const WATER = water(0);
const TRIM: [number, number] = [ATOMS.H.r + 8, ATOMS.O.r + 8];

const START: Point[] = [
  { x: 680, y: 660 },
  { x: 960, y: 660 },
  { x: 1240, y: 660 },
];
const BOILED: Point[] = [
  { x: 400, y: 520 },
  { x: 960, y: 610 },
  { x: 1520, y: 800 },
];

export function IntraInterScene() {
  const frame = useSceneFrame();
  const shown = fadeIn(frame, COVALENT_AT);
  const boil = progress(frame, BOIL_AT, BOIL_AT + 60, easeInOut);
  const beforeBoil = 1 - progress(frame, BOIL_AT, BOIL_AT + 20);
  const imf = progress(frame, IMF_AT, IMF_AT + 30);
  const swell = progress(frame, INTACT_AT, INTACT_AT + 30, (t) => t);
  const bondWidth = BOND_WIDTH + 4 * Math.sin(Math.PI * swell);
  const at = START.map((start, i) => {
    const end = BOILED[i] ?? start;
    return { x: lerp(start.x, end.x, boil), y: lerp(start.y, end.y, boil) };
  });
  const [m1, m2, m3] = at as [Point, Point, Point];
  const covalentLabel = Math.min(fadeIn(frame, COVALENT_AT + 15), beforeBoil);
  const imfLabel = Math.min(fadeIn(frame, IMF_AT + 15), beforeBoil);
  return (
    <AbsoluteFill>
      <Title opacity={fadeIn(frame, 0)}>Intermolecular Forces</Title>
      <Text
        x={960}
        y={290}
        size={type.body}
        anchor="middle"
        color={colors.muted}
        opacity={fadeIn(frame, 10)}
      >
        IMFs: attractions between molecules,
      </Text>
      <Text
        x={960}
        y={350}
        size={type.body}
        anchor="middle"
        color={colors.muted}
        opacity={fadeIn(frame, 10)}
      >
        much weaker than the bonds within them.
      </Text>
      <Stage>
        <ImfLine
          from={atomAt(WATER, 1, m1)}
          to={atomAt(WATER, 0, m2)}
          color={colors.hbond}
          progress={imf}
          trim={TRIM}
          opacity={beforeBoil}
        />
        <ImfLine
          from={atomAt(WATER, 1, m2)}
          to={atomAt(WATER, 0, m3)}
          color={colors.hbond}
          progress={imf}
          trim={TRIM}
          opacity={beforeBoil}
        />
        {at.map((point, i) => (
          <Molecule
            key={i}
            spec={WATER}
            at={point}
            opacity={shown}
            bondWidth={bondWidth}
          />
        ))}
        {covalentLabel > 0 && (
          <line
            x1={560}
            y1={795}
            x2={655}
            y2={715}
            stroke={colors.covalent}
            strokeWidth={3}
            opacity={covalentLabel}
          />
        )}
      </Stage>
      <Text
        x={520}
        y={820}
        size={type.label}
        weight={500}
        anchor="middle"
        color={colors.covalent}
        opacity={covalentLabel}
      >
        Covalent bond
      </Text>
      <Text
        x={862}
        y={600}
        size={type.label}
        weight={500}
        anchor="middle"
        color={colors.hbondText}
        opacity={imfLabel}
      >
        Intermolecular force
      </Text>
      <Text
        x={960}
        y={940}
        size={type.body}
        weight={500}
        anchor="middle"
        color={colors.covalent}
        {...dropped(frame, INTACT_AT)}
      >
        Covalent bonds stay intact
      </Text>
    </AbsoluteFill>
  );
}
