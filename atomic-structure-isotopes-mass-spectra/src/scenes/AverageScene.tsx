import { AbsoluteFill, useVideoConfig } from "remotion";
import {
  easeInOut,
  fadeIn,
  lerp,
  pop,
  progress,
  seeded,
} from "../components/anim";
import { useSceneFrame } from "../components/SceneFrame";
import { Text } from "../components/Text";
import { colors, FONT, type, VIDEO } from "../theme";

const ROWS = 5;
const COLS = 20;
const CL37_COUNT = 24;
const GRID_X = 580;
const GRID_Y = 160;
const SPACING = 40;
const ATOM_R = 15;

const LINE_Y = 750;
const LINE_LEFT = 360;
const LINE_RIGHT = 1560;
const LINE_MIN = 34;
const LINE_MAX = 38;
const LINE_TICKS = [34, 35, 36, 37, 38];
const valueX = (value: number) =>
  LINE_LEFT +
  ((value - LINE_MIN) / (LINE_MAX - LINE_MIN)) * (LINE_RIGHT - LINE_LEFT);

const SIMPLE_AVERAGE = 36;
const WEIGHTED_AVERAGE = 35.45;
const MARKER_LABEL_Y = 690;

/** Frames relative to the sequence start (global 3450); scene 6 begins at 800. */
const T = {
  grid: 30,
  line: [30, 60],
  lineTicks: [60, 90],
  cl35: 110,
  cl37: 190,
  periodic: 265,
  simple: 470,
  strike: [550, 570],
  cleanup: [830, 860],
  term1: 930,
  term2: 1130,
  result: 1330,
  weighted: 1330,
  glide: [1345, 1390],
  weightedLabel: 1390,
} as const;

const CL37_CELLS = new Set(
  Array.from({ length: ROWS * COLS }, (_, i) => i)
    .sort((a, b) => seeded(a + 1) - seeded(b + 1))
    .slice(0, CL37_COUNT),
);

const ATOMS = Array.from({ length: ROWS * COLS }, (_, i) => ({
  x: GRID_X + (i % COLS) * SPACING,
  y: GRID_Y + Math.floor(i / COLS) * SPACING,
  column: i % COLS,
  heavy: CL37_CELLS.has(i),
}));

const LEGEND = [
  {
    y: 200,
    fill: colors.cl35,
    stroke: colors.cl35Text,
    label: "Cl-35: 76 atoms",
    at: T.cl35,
  },
  {
    y: 280,
    fill: colors.cl37,
    stroke: colors.cl37Text,
    label: "Cl-37: 24 atoms",
    at: T.cl37,
  },
];

function Marker({
  x,
  color,
  drop,
}: {
  x: number;
  color: string;
  drop: number;
}) {
  const lift = lerp(-80, 0, drop);
  const tip = LINE_Y - 6 + lift;
  return (
    <polygon
      points={`${x},${tip} ${x - 14},${tip - 24} ${x + 14},${tip - 24}`}
      fill={color}
      opacity={Math.min(1, drop)}
    />
  );
}

export function AverageScene() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();
  const line = progress(frame, T.line[0], T.line[1]);
  const lineTicks = progress(frame, T.lineTicks[0], T.lineTicks[1]);
  const cleanup = 1 - progress(frame, T.cleanup[0], T.cleanup[1]);
  const simple = pop(frame, fps, T.simple);
  const strike = progress(frame, T.strike[0], T.strike[1]);
  const weighted = pop(frame, fps, T.weighted);
  const glide = progress(frame, T.glide[0], T.glide[1], easeInOut);
  const weightedX = lerp(
    valueX(SIMPLE_AVERAGE),
    valueX(WEIGHTED_AVERAGE),
    glide,
  );
  const weightedLabel = pop(frame, fps, T.weightedLabel);
  const simpleX = valueX(SIMPLE_AVERAGE);

  return (
    <AbsoluteFill>
      <svg
        width={VIDEO.width}
        height={VIDEO.height}
        style={{ position: "absolute" }}
      >
        {ATOMS.map((atom, i) => {
          const appear = pop(frame, fps, T.grid + atom.column);
          if (appear <= 0) return null;
          const start = (atom.heavy ? T.cl37 : T.cl35) + atom.column * 2;
          const filled = progress(frame, start, start + 15);
          return (
            <g key={i}>
              <circle
                cx={atom.x}
                cy={atom.y}
                r={ATOM_R * appear}
                fill={colors.background}
                stroke={colors.axis}
                strokeWidth={2}
              />
              {filled > 0 ? (
                <circle
                  cx={atom.x}
                  cy={atom.y}
                  r={ATOM_R * appear * filled}
                  fill={atom.heavy ? colors.cl37 : colors.cl35}
                  stroke={atom.heavy ? colors.cl37Text : colors.cl35Text}
                  strokeWidth={2}
                />
              ) : null}
            </g>
          );
        })}
        {LEGEND.map((entry) => (
          <circle
            key={entry.label}
            cx={220}
            cy={entry.y}
            r={ATOM_R}
            fill={entry.fill}
            stroke={entry.stroke}
            strokeWidth={2}
            opacity={fadeIn(frame, entry.at)}
          />
        ))}
        <g stroke={colors.axis} strokeWidth={4} strokeLinecap="round">
          {line > 0 ? (
            <line
              x1={LINE_LEFT}
              y1={LINE_Y}
              x2={lerp(LINE_LEFT, LINE_RIGHT, line)}
              y2={LINE_Y}
            />
          ) : null}
          {LINE_TICKS.map((tick) => (
            <line
              key={tick}
              x1={valueX(tick)}
              y1={LINE_Y - 10}
              x2={valueX(tick)}
              y2={LINE_Y + 10}
              opacity={lineTicks}
            />
          ))}
        </g>
        <g opacity={cleanup}>
          <Marker x={simpleX} color={colors.axis} drop={simple} />
          {strike > 0 ? (
            <g stroke={colors.error} strokeWidth={8} strokeLinecap="round">
              <line
                x1={simpleX - 145}
                y1={MARKER_LABEL_Y - 20}
                x2={lerp(simpleX - 145, simpleX + 145, strike)}
                y2={lerp(MARKER_LABEL_Y - 20, MARKER_LABEL_Y + 20, strike)}
              />
              <line
                x1={simpleX - 145}
                y1={MARKER_LABEL_Y + 20}
                x2={lerp(simpleX - 145, simpleX + 145, strike)}
                y2={lerp(MARKER_LABEL_Y + 20, MARKER_LABEL_Y - 20, strike)}
              />
            </g>
          ) : null}
        </g>
        {frame >= T.weighted ? (
          <Marker x={weightedX} color={colors.accentText} drop={weighted} />
        ) : null}
      </svg>
      {LEGEND.map((entry) => (
        <Text
          key={entry.label}
          x={250}
          y={entry.y}
          size={type.label}
          anchor="start"
          opacity={fadeIn(frame, entry.at)}
        >
          {entry.label}
        </Text>
      ))}
      {LINE_TICKS.map((tick) => (
        <Text
          key={tick}
          x={valueX(tick)}
          y={800}
          size={type.label}
          weight={500}
          color={colors.axis}
          opacity={lineTicks}
        >
          {tick}
        </Text>
      ))}
      <Text
        x={1360}
        y={600}
        size={type.body}
        weight={500}
        opacity={Math.min(fadeIn(frame, T.periodic), cleanup)}
      >
        Periodic table: 35.45 u ?
      </Text>
      <Text
        x={simpleX}
        y={MARKER_LABEL_Y + lerp(-80, 0, simple)}
        size={type.label}
        weight={500}
        opacity={Math.min(1, simple, cleanup)}
      >
        Simple average: 36
      </Text>
      <Text
        x={simpleX}
        y={640}
        size={type.label}
        weight={700}
        color={colors.error}
        opacity={Math.min(fadeIn(frame, T.strike[0]), cleanup)}
      >
        Wrong
      </Text>
      <Equation frame={frame} />
      <Text
        x={valueX(WEIGHTED_AVERAGE)}
        y={MARKER_LABEL_Y}
        size={type.label}
        weight={500}
        color={colors.accentText}
        opacity={Math.min(1, weightedLabel)}
        scale={lerp(0.8, 1, weightedLabel)}
      >
        Weighted average (atomic weight): 35.45 u
      </Text>
    </AbsoluteFill>
  );
}

const EQUATION = [
  { text: "34.97 u × 0.7576", color: colors.cl35Text, at: T.term1 },
  { text: "+", color: colors.text, at: T.term2 },
  { text: "36.97 u × 0.2424", color: colors.cl37Text, at: T.term2 },
  { text: "= 35.45 u", color: colors.text, at: T.result },
];

function Equation({ frame }: { frame: number }) {
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 520,
        width: VIDEO.width,
        transform: "translateY(-50%)",
        display: "flex",
        justifyContent: "center",
        gap: 28,
        fontFamily: FONT,
        fontSize: type.body,
        fontWeight: 500,
        lineHeight: 1.2,
        whiteSpace: "nowrap",
      }}
    >
      {EQUATION.map((part) => (
        <span
          key={part.text}
          style={{ color: part.color, opacity: fadeIn(frame, part.at) }}
        >
          {part.text}
        </span>
      ))}
    </div>
  );
}
