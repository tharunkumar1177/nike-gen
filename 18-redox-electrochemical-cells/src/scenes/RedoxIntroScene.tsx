import { AbsoluteFill, useVideoConfig } from "remotion";
import { dropped, fadeIn, lerp, popped, progress } from "../components/anim";
import { useSceneFrame } from "../components/SceneFrame";
import { Arrow, Electron, F, Ion, Text } from "../components/Text";
import { TitleBand } from "../components/TitleBand";
import { cue } from "../cues";
import { colors, SAFE, type, VIDEO } from "../theme";

const SCENE = "redox-intro";
const WIRE_AT = cue(SCENE, "Drop a clean copper wire");
const BLUE_AT = cue(SCENE, "spontaneously turns blue");
const OXIDIZED_AT = cue(SCENE, "copper is oxidized");
const REDUCED_AT = cue(SCENE, "silver ions are reduced");
const REDUCING_AT = cue(SCENE, "reducing agent");
const OXIDIZING_AT = cue(SCENE, "oxidizing agent");
const JUMP_AT = cue(SCENE, "jump directly at the wire's surface");
const STATES_AT = cue(SCENE, "track electrons using oxidation states");
const OXYGEN_AT = cue(SCENE, "oxygen is minus two");
const MANGANESE_AT = cue(SCENE, "manganese must be plus seven");

const BEAKER = { x: 240, top: 400, bottom: 800, width: 300, fill: 440 };
const WIRE = { x: 390, width: 40, top: 300, bottom: 750 };
const TEXT_X = 640;
const AGENT_X = 1180;

const CRYSTALS = Array.from({ length: 14 }, (_, i) => ({
  side: i % 2 === 0 ? -1 : 1,
  y: 490 + i * 18,
  size: 9 + (i % 3) * 4,
}));

const SPARKS = Array.from({ length: 6 }, (_, i) => ({
  x: WIRE.x + (i % 2 === 0 ? -34 : 34),
  y: 520 + i * 36,
  phase: i * 7,
}));

const MN = { x: 700, y: 590, r: 60 };
const OXYGENS = [
  { x: 580, y: 470, tag: -1 },
  { x: 820, y: 470, tag: -1 },
  { x: 580, y: 710, tag: 1 },
  { x: 820, y: 710, tag: 1 },
] as const;
const STEPS_X = 1080;

function WireDemo({ frame }: { frame: number }) {
  const drop = progress(frame, WIRE_AT, WIRE_AT + 20);
  const blue = progress(frame, BLUE_AT, BLUE_AT + 30);
  const growth = progress(frame, BLUE_AT + 10, BLUE_AT + 50);
  const sparks = fadeIn(frame, JUMP_AT);
  const wireShift = lerp(-120, 0, drop);
  return (
    <svg
      width={VIDEO.width}
      height={VIDEO.height}
      style={{ position: "absolute", inset: 0 }}
    >
      <rect
        x={BEAKER.x + 2}
        y={BEAKER.fill}
        width={BEAKER.width - 4}
        height={BEAKER.bottom - BEAKER.fill - 2}
        fill={colors.clear}
      />
      <rect
        x={BEAKER.x + 2}
        y={BEAKER.fill}
        width={BEAKER.width - 4}
        height={BEAKER.bottom - BEAKER.fill - 2}
        fill={colors.copperSolution}
        opacity={blue}
      />
      <g opacity={drop} transform={`translate(0 ${wireShift})`}>
        <rect
          x={WIRE.x - WIRE.width / 2}
          y={WIRE.top}
          width={WIRE.width}
          height={WIRE.bottom - WIRE.top}
          rx={6}
          fill={colors.copper}
        />
      </g>
      {CRYSTALS.map(({ side, y, size }, i) => {
        const s = size * growth;
        const cx = WIRE.x + side * (WIRE.width / 2 + s * 0.6);
        return (
          <polygon
            key={i}
            points={`${cx},${y - s} ${cx + s},${y} ${cx},${y + s} ${cx - s},${y}`}
            fill={colors.silver}
            stroke={colors.silverStroke}
            strokeWidth={2}
            opacity={growth}
          />
        );
      })}
      {SPARKS.map(({ x, y, phase }, i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={7}
          fill={colors.electron}
          opacity={
            sparks * (0.35 + 0.65 * Math.abs(Math.sin((frame + phase) / 9)))
          }
        />
      ))}
      <path
        d={`M ${BEAKER.x} ${BEAKER.top} V ${BEAKER.bottom} H ${BEAKER.x + BEAKER.width} V ${BEAKER.top}`}
        fill="none"
        stroke={colors.glass}
        strokeWidth={4}
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Permanganate({ frame }: { frame: number }) {
  const shown = fadeIn(frame, STATES_AT + 10);
  return (
    <svg
      width={VIDEO.width}
      height={VIDEO.height}
      style={{ position: "absolute", inset: 0, opacity: shown }}
    >
      {OXYGENS.map(({ x, y }, i) => (
        <line
          key={i}
          x1={MN.x}
          y1={MN.y}
          x2={x}
          y2={y}
          stroke={colors.muted}
          strokeWidth={4}
        />
      ))}
      {OXYGENS.map(({ x, y }, i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={40}
          fill={colors.panel}
          stroke={colors.muted}
          strokeWidth={3}
        />
      ))}
      <circle
        cx={MN.x}
        cy={MN.y}
        r={MN.r}
        fill={colors.panel}
        stroke={colors.text}
        strokeWidth={4}
      />
      <path
        d="M 500 400 H 480 V 800 H 500 M 900 400 H 920 V 800 H 900"
        fill="none"
        stroke={colors.text}
        strokeWidth={4}
      />
    </svg>
  );
}

export function RedoxIntroScene() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();
  const partOne = 1 - progress(frame, STATES_AT, STATES_AT + 20);
  const partTwo = fadeIn(frame, STATES_AT + 10);
  return (
    <AbsoluteFill>
      <TitleBand>Oxidation States</TitleBand>
      <AbsoluteFill style={{ opacity: partOne }}>
        <WireDemo frame={frame} />
        <Text
          x={BEAKER.x + BEAKER.width / 2}
          y={850}
          size={type.label}
          color={colors.muted}
          anchor="middle"
          opacity={fadeIn(frame, WIRE_AT)}
        >
          Cu wire in <F>AgNO3</F>
        </Text>
        <Text
          x={TEXT_X}
          y={440}
          size={type.hero}
          weight={700}
          color={colors.oxidationText}
          {...dropped(frame, OXIDIZED_AT)}
        >
          Cu
          <Arrow />
          <Ion f="Cu" c="2+" /> + 2<Electron />
        </Text>
        <Text
          x={TEXT_X}
          y={495}
          size={type.label}
          color={colors.oxidationText}
          opacity={fadeIn(frame, OXIDIZED_AT + 10)}
        >
          Oxidized: loses electrons
        </Text>
        <Text
          x={TEXT_X}
          y={590}
          size={type.hero}
          weight={700}
          color={colors.reductionText}
          {...dropped(frame, REDUCED_AT)}
        >
          <Ion f="Ag" c="+" /> + <Electron />
          <Arrow />
          Ag
        </Text>
        <Text
          x={TEXT_X}
          y={645}
          size={type.label}
          color={colors.reductionText}
          opacity={fadeIn(frame, REDUCED_AT + 10)}
        >
          Reduced: gains electrons
        </Text>
        <Text
          x={AGENT_X}
          y={440}
          size={type.body}
          weight={500}
          color={colors.oxidationText}
          {...popped(frame, fps, REDUCING_AT)}
        >
          Cu: reducing agent
        </Text>
        <Text
          x={AGENT_X}
          y={590}
          size={type.body}
          weight={500}
          color={colors.reductionText}
          {...popped(frame, fps, OXIDIZING_AT)}
        >
          <Ion f="Ag" c="+" />: oxidizing agent
        </Text>
        <Text
          x={TEXT_X}
          y={760}
          size={type.body}
          weight={700}
          color={colors.electronText}
          {...dropped(frame, JUMP_AT)}
        >
          <Electron /> jump directly at the surface: no circuit, no current
        </Text>
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: partTwo }}>
        <Text x={SAFE} y={310} size={type.body} weight={700}>
          Worked example: oxidation state of Mn in <Ion f="MnO4" c="−" />
        </Text>
        <Permanganate frame={frame} />
        <Text x={MN.x} y={MN.y} size={44} weight={700} anchor="middle">
          Mn
        </Text>
        {OXYGENS.map(({ x, y }, i) => (
          <Text key={i} x={x} y={y} size={type.body} anchor="middle">
            O
          </Text>
        ))}
        {OXYGENS.map(({ x, y, tag }, i) => (
          <Text
            key={i}
            x={x}
            y={y + tag * 62}
            size={type.body}
            weight={700}
            color={colors.reductionText}
            anchor="middle"
            {...popped(frame, fps, OXYGEN_AT + i * 5)}
          >
            −2
          </Text>
        ))}
        <Text
          x={MN.x + 92}
          y={MN.y}
          size={type.hero}
          weight={700}
          color={colors.oxidationText}
          anchor="middle"
          {...popped(frame, fps, MANGANESE_AT)}
        >
          +7
        </Text>
        <Text x={935} y={410} size={type.hero} weight={700}>
          −
        </Text>
        <Text
          x={STEPS_X}
          y={470}
          size={type.body}
          {...dropped(frame, OXYGEN_AT)}
        >
          Each O is −2: 4 × (−2) = −8
        </Text>
        <Text
          x={STEPS_X}
          y={550}
          size={type.body}
          {...dropped(frame, OXYGEN_AT + 20)}
        >
          Net charge of the ion: −1
        </Text>
        <Text
          x={STEPS_X}
          y={630}
          size={type.body}
          {...dropped(frame, MANGANESE_AT)}
        >
          Mn − 8 = −1
        </Text>
        <Text
          x={STEPS_X}
          y={720}
          size={type.heading}
          weight={700}
          color={colors.oxidationText}
          {...popped(frame, fps, MANGANESE_AT + 15)}
        >
          Mn = +7
        </Text>
      </AbsoluteFill>
    </AbsoluteFill>
  );
}
