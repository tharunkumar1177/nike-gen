import { AbsoluteFill, useVideoConfig } from "remotion";
import { dropped, fadeIn, pop, progress } from "../components/anim";
import { useSceneFrame } from "../components/SceneFrame";
import { Eq, Text } from "../components/Text";
import { cue } from "../cues";
import { colors, type } from "../theme";

const TITLE_AT = cue(
  "boiling-freezing-points",
  "This lowered vapour pressure",
);
const BOIL_AT = cue("boiling-freezing-points", "elevates the boiling point");
const FREEZE_AT = cue(
  "boiling-freezing-points",
  "depresses the freezing point",
);
const KB_AT = cue("boiling-freezing-points", "zero point five one two");
const KF_AT = cue("boiling-freezing-points", "one point eight six");
const WIPE_FRAMES = 30;

const AXES = { left: 200, bottom: 850, right: 1100, top: 250 } as const;
const ATM_Y = 400;
const BRACKET_Y = 870;

type Point = { x: number; y: number };
type Curve = readonly [Point, Point, Point];

/** Point on the sublimation line at `x`; both triple points lie on it. */
const onSublimation = (x: number): Point => ({
  x,
  y: 850 - ((x - 200) * 200) / 300,
});

const PURE_TRIPLE = onSublimation(500);
const SOLUTION_TRIPLE = onSublimation(450);
const SUBLIMATION: Curve = [
  onSublimation(200),
  onSublimation(350),
  PURE_TRIPLE,
];
const PURE_FUSION: Curve = [
  PURE_TRIPLE,
  { x: 525, y: 450 },
  { x: 550, y: 250 },
];
const PURE_BOILING: Curve = [
  PURE_TRIPLE,
  { x: 800, y: 600 },
  { x: 1000, y: 250 },
];
const SOLUTION_FUSION: Curve = [
  SOLUTION_TRIPLE,
  { x: 475, y: 470 },
  { x: 500, y: 250 },
];
const SOLUTION_BOILING: Curve = [
  SOLUTION_TRIPLE,
  { x: 820, y: 640 },
  { x: 1050, y: 300 },
];

function at([a, c, b]: Curve, t: number): Point {
  const u = 1 - t;
  return {
    x: u * u * a.x + 2 * t * u * c.x + t * t * b.x,
    y: u * u * a.y + 2 * t * u * c.y + t * t * b.y,
  };
}

/** x where a curve (rising from left to right) crosses height `y`. */
function crossing(curve: Curve, y: number) {
  let low = 0;
  let high = 1;
  for (let i = 0; i < 40; i += 1) {
    const mid = (low + high) / 2;
    if (at(curve, mid).y > y) low = mid;
    else high = mid;
  }
  return at(curve, (low + high) / 2).x;
}

const path = ([a, c, b]: Curve) =>
  `M${a.x} ${a.y} Q${c.x} ${c.y} ${b.x} ${b.y}`;

const FREEZE = {
  pure: crossing(PURE_FUSION, ATM_Y),
  solution: crossing(SOLUTION_FUSION, ATM_Y),
};
const BOIL = {
  pure: crossing(PURE_BOILING, ATM_Y),
  solution: crossing(SOLUTION_BOILING, ATM_Y),
};

function Bracket({
  from,
  to,
  color,
  shown,
}: {
  from: number;
  to: number;
  color: string;
  shown: number;
}) {
  if (shown <= 0) return null;
  const mid = (from + to) / 2;
  return (
    <g
      opacity={Math.min(1, shown * 2)}
      transform={`translate(${mid} ${BRACKET_Y}) scale(${0.8 + 0.2 * shown}) translate(${-mid} ${-BRACKET_Y})`}
    >
      {[from, to].map((x) => (
        <line
          key={x}
          x1={x}
          x2={x}
          y1={ATM_Y}
          y2={BRACKET_Y}
          stroke={color}
          strokeWidth={2}
          strokeDasharray="4 6"
        />
      ))}
      <path
        d={`M${from} ${BRACKET_Y - 10} V${BRACKET_Y} H${to} V${BRACKET_Y - 10}`}
        fill="none"
        stroke={color}
        strokeWidth={3}
      />
    </g>
  );
}

export function PhaseDiagramScene() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();
  const plotIn = fadeIn(frame, TITLE_AT);
  const axes = progress(frame, TITLE_AT, TITLE_AT + 20);
  const wipe = progress(frame, TITLE_AT, TITLE_AT + WIPE_FRAMES);
  const boil = pop(frame, fps, BOIL_AT);
  const freeze = pop(frame, fps, FREEZE_AT);
  return (
    <AbsoluteFill>
      <Text
        x={960}
        y={150}
        size={type.title}
        weight={700}
        color={colors.gasText}
        anchor="middle"
        {...dropped(frame, TITLE_AT)}
      >
        Boiling &amp; Freezing Points
      </Text>
      <svg
        width={1920}
        height={1080}
        style={{ position: "absolute", left: 0, top: 0 }}
      >
        <defs>
          <clipPath id="phase-wipe">
            <rect
              x={AXES.left}
              y={0}
              width={(AXES.right - AXES.left) * wipe}
              height={1080}
            />
          </clipPath>
        </defs>
        <path
          d={`M${AXES.left} ${AXES.top} V${AXES.bottom} H${AXES.right}`}
          fill="none"
          stroke={colors.gasText}
          strokeWidth={4}
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - axes}
        />
        <line
          x1={AXES.left}
          x2={AXES.right}
          y1={ATM_Y}
          y2={ATM_Y}
          stroke={colors.gasText}
          strokeWidth={2}
          strokeDasharray="2 6"
          strokeLinecap="round"
          opacity={plotIn}
        />
        <g clipPath="url(#phase-wipe)" fill="none" strokeWidth={4}>
          {[SUBLIMATION, PURE_FUSION, PURE_BOILING].map((curve, index) => (
            <path key={index} d={path(curve)} stroke={colors.solvent} />
          ))}
          {[SOLUTION_FUSION, SOLUTION_BOILING].map((curve, index) => (
            <path
              key={index}
              d={path(curve)}
              stroke={colors.solute}
              strokeDasharray="14 10"
            />
          ))}
        </g>
        <Bracket
          from={BOIL.pure}
          to={BOIL.solution}
          color={colors.boil}
          shown={boil}
        />
        <Bracket
          from={FREEZE.solution}
          to={FREEZE.pure}
          color={colors.freeze}
          shown={freeze}
        />
        <g opacity={plotIn}>
          <line
            x1={1200}
            x2={1260}
            y1={840}
            y2={840}
            stroke={colors.solvent}
            strokeWidth={4}
          />
          <line
            x1={1200}
            x2={1260}
            y1={890}
            y2={890}
            stroke={colors.solute}
            strokeWidth={4}
            strokeDasharray="14 10"
          />
        </g>
      </svg>
      <Text
        x={150}
        y={550}
        size={type.label}
        color={colors.gasText}
        anchor="middle"
        opacity={plotIn}
      >
        <span
          style={{ display: "inline-block", transform: "rotate(-90deg)" }}
        >
          Pressure
        </span>
      </Text>
      <Text
        x={700}
        y={920}
        size={type.label}
        color={colors.gasText}
        anchor="middle"
        opacity={plotIn}
      >
        Temperature
      </Text>
      <Text
        x={210}
        y={380}
        size={type.label}
        color={colors.gasText}
        opacity={plotIn}
      >
        1 atm
      </Text>
      {[
        { label: "Solid", x: 330, y: 310 },
        { label: "Liquid", x: 720, y: 310 },
        { label: "Gas", x: 850, y: 750 },
      ].map(({ label, x, y }) => (
        <Text
          key={label}
          x={x}
          y={y}
          size={type.body}
          weight={500}
          color={colors.gasText}
          anchor="middle"
          opacity={plotIn}
        >
          {label}
        </Text>
      ))}
      <Text
        x={1280}
        y={840}
        size={type.label}
        color={colors.solventText}
        opacity={plotIn}
      >
        Pure solvent
      </Text>
      <Text
        x={1280}
        y={890}
        size={type.label}
        color={colors.soluteText}
        opacity={plotIn}
      >
        Solution
      </Text>
      <Text
        x={1800}
        y={940}
        size={type.label}
        color={colors.muted}
        anchor="end"
        opacity={plotIn}
      >
        * Qualitative, not to scale
      </Text>
      <Text
        x={(BOIL.pure + BOIL.solution) / 2}
        y={910}
        size={type.label}
        weight={700}
        color={colors.boil}
        anchor="middle"
        opacity={Math.min(1, boil * 2)}
      >
        <Eq>ΔT_b</Eq>
      </Text>
      <Text
        x={(FREEZE.pure + FREEZE.solution) / 2}
        y={910}
        size={type.label}
        weight={700}
        color={colors.freeze}
        anchor="middle"
        opacity={Math.min(1, freeze * 2)}
      >
        <Eq>ΔT_f</Eq>
      </Text>
      <Text
        x={1450}
        y={400}
        size={type.body}
        weight={500}
        color={colors.boil}
        anchor="middle"
        {...dropped(frame, KB_AT)}
      >
        <Eq>ΔT_b = i · K_b · m</Eq>
      </Text>
      <Text
        x={1450}
        y={500}
        size={type.body}
        color={colors.boil}
        anchor="middle"
        {...dropped(frame, KB_AT + 8)}
      >
        <Eq>K_b = 0.512 °C·kg/mol</Eq>
      </Text>
      <Text
        x={1450}
        y={650}
        size={type.body}
        weight={500}
        color={colors.freeze}
        anchor="middle"
        {...dropped(frame, KF_AT)}
      >
        <Eq>ΔT_f = i · K_f · m</Eq>
      </Text>
      <Text
        x={1450}
        y={750}
        size={type.body}
        color={colors.freeze}
        anchor="middle"
        {...dropped(frame, KF_AT + 8)}
      >
        <Eq>K_f = 1.86 °C·kg/mol</Eq>
      </Text>
    </AbsoluteFill>
  );
}
