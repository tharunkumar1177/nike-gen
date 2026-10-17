import { AbsoluteFill, useVideoConfig } from "remotion";
import { dropped, fadeIn, pop, popped, progress } from "../components/anim";
import {
  ArrowLine,
  ATOMS,
  atomAt,
  ImfLine,
  lonePairAt,
  Molecule,
  Stage,
  water,
} from "../components/Molecule";
import { useSceneFrame } from "../components/SceneFrame";
import { Text, Title } from "../components/Text";
import { cue } from "../cues";
import { colors, type } from "../theme";

const SCENE = "hydrogen-bonding";
const STRONG_AT = cue(SCENE, "particularly strong");
const DONOR_AT = cue(SCENE, "nitrogen oxygen or fluorine");
const LONE_AT = cue(SCENE, "lone pair");
const PREDICTED_AT = cue(SCENE, "heavier hydrides");
const ACTUAL_AT = cue(SCENE, "one hundred");

const WATER = water(0);
const ROW_Y = 470;
const A = { x: 660, y: ROW_Y };
const B = { x: 960, y: ROW_Y };
const C = { x: 1260, y: ROW_Y };
const TRIM: [number, number] = [ATOMS.H.r + 8, 12];

export function HydrogenBondScene() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();
  const lonePairs = pop(frame, fps, LONE_AT);
  const donorRing = fadeIn(frame, DONOR_AT);
  const acceptorRing = fadeIn(frame, LONE_AT + 10);
  const acceptor = lonePairAt(WATER, 0, B);
  return (
    <AbsoluteFill>
      <Title opacity={fadeIn(frame, 0)}>Hydrogen Bonding</Title>
      <Stage>
        <ImfLine
          from={atomAt(WATER, 1, A)}
          to={acceptor}
          color={colors.hbond}
          progress={progress(frame, STRONG_AT + 15, STRONG_AT + 45)}
          trim={TRIM}
        />
        <ImfLine
          from={atomAt(WATER, 1, B)}
          to={lonePairAt(WATER, 0, C)}
          color={colors.hbond}
          progress={progress(frame, STRONG_AT + 30, STRONG_AT + 60)}
          trim={TRIM}
        />
        {[A, B, C].map((at, i) => (
          <Molecule
            key={i}
            spec={WATER}
            at={at}
            opacity={fadeIn(frame, STRONG_AT + i * 5)}
            lonePairs={lonePairs}
          />
        ))}
        {donorRing > 0 && (
          <ellipse
            cx={A.x + 42}
            cy={A.y}
            rx={100 * donorRing}
            ry={52}
            fill="none"
            stroke={colors.hbondText}
            strokeWidth={4}
            opacity={donorRing}
          />
        )}
        {acceptorRing > 0 && (
          <circle
            cx={acceptor.x}
            cy={acceptor.y}
            r={24}
            fill="none"
            stroke={colors.hbondText}
            strokeWidth={4}
            opacity={acceptorRing}
          />
        )}
        <ArrowLine
          from={{ x: 890, y: 870 }}
          to={{ x: 1030, y: 870 }}
          color={colors.hbondText}
          progress={progress(frame, ACTUAL_AT, ACTUAL_AT + 20)}
        />
      </Stage>
      <Text
        x={828}
        y={410}
        size={type.label}
        weight={500}
        anchor="middle"
        color={colors.hbondText}
        opacity={fadeIn(frame, STRONG_AT + 45)}
      >
        Hydrogen bond
      </Text>
      <Text
        x={960}
        y={660}
        size={type.body}
        anchor="middle"
        {...dropped(frame, DONOR_AT)}
      >
        1. H bonded to N, O or F
      </Text>
      <Text
        x={960}
        y={730}
        size={type.body}
        anchor="middle"
        {...dropped(frame, LONE_AT)}
      >
        2. Lone pair on N, O or F of a nearby molecule
      </Text>
      <Text
        x={860}
        y={870}
        size={type.body}
        anchor="end"
        color={colors.muted}
        {...dropped(frame, PREDICTED_AT)}
      >
        Trend predicts −80 °C
      </Text>
      <Text
        x={1060}
        y={870}
        size={type.subtitle}
        weight={700}
        color={colors.hbondText}
        {...popped(frame, fps, ACTUAL_AT + 10)}
      >
        Actual: 100 °C
      </Text>
    </AbsoluteFill>
  );
}
