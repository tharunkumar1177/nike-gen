import type { ReactNode } from "react";
import { AbsoluteFill } from "remotion";
import { lerp } from "./anim";
import { Text } from "./Text";
import { colors, FONT, type, VIDEO } from "../theme";

/** Galvanic-cell geometry shared by every cell scene (px, 1920 × 1080). */
export const CELL = {
  beakerTop: 560,
  beakerBottom: 900,
  beakerWidth: 320,
  solutionTop: 600,
  left: { x: 200, electrode: 360, label: 270 },
  right: { x: 700, electrode: 860, label: 950 },
  electrodeTop: 460,
  electrodeBottom: 850,
  wireY: 340,
  meter: { cx: 610, cy: 340, r: 60 },
  source: { width: 180, height: 84 },
  electrodeLabelY: 520,
  solutionLabelY: 750,
  concentrationY: 792,
  titleY: 935,
} as const;

type Point = readonly [number, number];

type Segment = {
  x: number;
  y: number;
  dx: number;
  dy: number;
  length: number;
};

function segmentsOf(points: readonly Point[]) {
  const segments: Segment[] = [];
  points.forEach(([x, y], i) => {
    const next = points[i + 1];
    if (!next) return;
    const dx = next[0] - x;
    const dy = next[1] - y;
    segments.push({ x, y, dx, dy, length: Math.hypot(dx, dy) });
  });
  return segments;
}

const totalLength = (segments: readonly Segment[]) =>
  segments.reduce((sum, segment) => sum + segment.length, 0);

const wrap = (value: number, length: number) =>
  ((value % length) + length) % length;

/** Position and unit normal at `distance` along a path. */
function pointAt(segments: readonly Segment[], distance: number) {
  let remaining = distance;
  for (const segment of segments) {
    if (remaining <= segment.length) {
      const t = remaining / segment.length;
      return {
        x: segment.x + segment.dx * t,
        y: segment.y + segment.dy * t,
        nx: -segment.dy / segment.length,
        ny: segment.dx / segment.length,
      };
    }
    remaining -= segment.length;
  }
  throw new Error(`Distance ${distance} is beyond the path.`);
}

const WIRE = segmentsOf([
  [CELL.left.electrode, CELL.electrodeTop],
  [CELL.left.electrode, CELL.wireY],
  [CELL.right.electrode, CELL.wireY],
  [CELL.right.electrode, CELL.electrodeTop],
]);
const WIRE_LENGTH = totalLength(WIRE);
const ELECTRON_COUNT = Math.floor(WIRE_LENGTH / 40);

const BRIDGE_PATH =
  "M 500 800 L 500 480 Q 500 450 530 450 L 690 450 Q 720 450 720 480 L 720 800";
const BRIDGE = segmentsOf([
  [500, 790],
  [500, 480],
  [509, 459],
  [530, 450],
  [690, 450],
  [711, 459],
  [720, 480],
  [720, 790],
]);
const BRIDGE_LENGTH = totalLength(BRIDGE);
const ION_COUNT = 6;

/** A period of particle motion; direction +1 runs from the left half-cell to the right. */
export type Flow = { from: number; to?: number; direction: 1 | -1 };

const ELECTRON_SPEED = 200 / VIDEO.fps;
const ION_SPEED = 50 / VIDEO.fps;

function travelled(frame: number, flows: readonly Flow[], speed: number) {
  return flows.reduce((sum, { from, to = Infinity, direction }) => {
    const active = Math.max(0, Math.min(frame, to) - from);
    return sum + direction * active * speed;
  }, 0);
}

type Props = {
  frame: number;
  opacity?: number;
  /** 0 shows the zinc half-cell, 1 the standard hydrogen electrode. */
  she?: number;
  /** 0 → 1: zinc thins and copper thickens as the cell runs. */
  wear?: number;
  bridge?: number;
  electrons?: number;
  electronFlows?: readonly Flow[];
  ions?: number;
  ionFlows?: readonly Flow[];
  /** 0 shows the voltmeter, 1 the external power source. */
  source?: number;
  reading?: ReactNode;
};

function Beaker({ x, solution }: { x: number; solution: string }) {
  const { beakerTop, beakerBottom, beakerWidth, solutionTop } = CELL;
  return (
    <>
      <rect
        x={x + 2}
        y={solutionTop}
        width={beakerWidth - 4}
        height={beakerBottom - solutionTop - 2}
        fill={solution}
      />
      <path
        d={`M ${x} ${beakerTop} V ${beakerBottom} H ${x + beakerWidth} V ${beakerTop}`}
        fill="none"
        stroke={colors.glass}
        strokeWidth={4}
        strokeLinejoin="round"
      />
    </>
  );
}

function Electrode({
  x,
  width,
  fill,
  opacity = 1,
}: {
  x: number;
  width: number;
  fill: string;
  opacity?: number;
}) {
  const { electrodeTop, electrodeBottom, solutionTop } = CELL;
  return (
    <g opacity={opacity}>
      <rect
        x={x - 20}
        y={electrodeTop}
        width={40}
        height={solutionTop - electrodeTop}
        fill={fill}
      />
      <rect
        x={x - width / 2}
        y={solutionTop}
        width={width}
        height={electrodeBottom - solutionTop}
        fill={fill}
      />
    </g>
  );
}

function HydrogenElectrode({
  frame,
  opacity,
}: {
  frame: number;
  opacity: number;
}) {
  const x = CELL.left.electrode;
  const bubbles = Array.from({ length: 8 }, (_, i) => {
    const rise = wrap(frame * 2 + i * 30, 240);
    return {
      x: x + (i % 2 === 0 ? -1 : 1) * (36 + (i % 3) * 6),
      y: 840 - rise,
      r: 4 + (i % 3),
    };
  });
  return (
    <g opacity={opacity}>
      <rect
        x={x - 30}
        y={CELL.electrodeTop + 10}
        width={60}
        height={330}
        fill="#FFFFFF"
        fillOpacity={0.5}
        stroke={colors.glass}
        strokeWidth={3}
      />
      <line
        x1={x}
        y1={CELL.electrodeTop}
        x2={x}
        y2={800}
        stroke={colors.silverStroke}
        strokeWidth={4}
      />
      <rect
        x={x - 15}
        y={800}
        width={30}
        height={40}
        fill={colors.silverStroke}
      />
      {bubbles.map((bubble, i) => (
        <circle
          key={i}
          cx={bubble.x}
          cy={bubble.y}
          r={bubble.r}
          fill="#FFFFFF"
          stroke={colors.bridgeStroke}
          strokeWidth={2}
          opacity={bubble.y > CELL.solutionTop ? 1 : 0}
        />
      ))}
    </g>
  );
}

/** The two half-cells, wire, salt bridge, particles and meter or power source. */
export function Cell({
  frame,
  opacity = 1,
  she = 0,
  wear = 0,
  bridge = 1,
  electrons = 0,
  electronFlows = [],
  ions = 0,
  ionFlows = [],
  source = 0,
  reading,
}: Props) {
  if (opacity <= 0) return null;
  const electronShift = travelled(frame, electronFlows, ELECTRON_SPEED);
  const ionShift = travelled(frame, ionFlows, ION_SPEED);
  const { meter } = CELL;
  return (
    <AbsoluteFill style={{ opacity }}>
      <svg
        width={VIDEO.width}
        height={VIDEO.height}
        viewBox={`0 0 ${VIDEO.width} ${VIDEO.height}`}
        style={{ position: "absolute", inset: 0 }}
      >
        <Beaker x={CELL.left.x} solution={colors.clear} />
        <Beaker x={CELL.right.x} solution={colors.copperSolution} />
        <g opacity={bridge}>
          <path
            d={BRIDGE_PATH}
            fill="none"
            stroke={colors.bridgeStroke}
            strokeWidth={44}
          />
          <path
            d={BRIDGE_PATH}
            fill="none"
            stroke={colors.bridge}
            strokeWidth={40}
          />
          {Array.from({ length: ION_COUNT * 2 }, (_, i) => {
            const cation = i % 2 === 0;
            const base = (i / 2) * (BRIDGE_LENGTH / ION_COUNT);
            const shift = cation ? ionShift : -ionShift;
            const p = pointAt(BRIDGE, wrap(base + shift, BRIDGE_LENGTH));
            const side = cation ? -8 : 8;
            return (
              <circle
                key={i}
                cx={p.x + p.nx * side}
                cy={p.y + p.ny * side}
                r={8}
                fill={cation ? colors.cation : colors.anion}
                opacity={ions}
              />
            );
          })}
        </g>
        <Electrode
          x={CELL.left.electrode}
          width={lerp(40, 28, wear)}
          fill={colors.zinc}
          opacity={1 - she}
        />
        {she > 0 ? <HydrogenElectrode frame={frame} opacity={she} /> : null}
        <Electrode
          x={CELL.right.electrode}
          width={lerp(40, 52, wear)}
          fill={colors.copper}
        />
        <path
          d={`M ${CELL.left.electrode} ${CELL.electrodeTop} V ${CELL.wireY} H ${CELL.right.electrode} V ${CELL.electrodeTop}`}
          fill="none"
          stroke={colors.wire}
          strokeWidth={4}
          strokeLinejoin="round"
        />
        {electrons > 0
          ? Array.from({ length: ELECTRON_COUNT }, (_, i) => {
              const base = i * (WIRE_LENGTH / ELECTRON_COUNT);
              const p = pointAt(WIRE, wrap(base + electronShift, WIRE_LENGTH));
              return (
                <circle
                  key={i}
                  cx={p.x}
                  cy={p.y}
                  r={6}
                  fill={colors.electron}
                  opacity={electrons}
                />
              );
            })
          : null}
        <circle
          cx={meter.cx}
          cy={meter.cy}
          r={meter.r}
          fill="#FFFFFF"
          stroke={colors.text}
          strokeWidth={4}
          opacity={1 - source}
        />
        <rect
          x={meter.cx - CELL.source.width / 2}
          y={meter.cy - CELL.source.height / 2}
          width={CELL.source.width}
          height={CELL.source.height}
          rx={12}
          fill={colors.source}
          opacity={source}
        />
      </svg>
      <Text
        x={meter.cx}
        y={meter.cy}
        size={type.body}
        weight={700}
        anchor="middle"
        opacity={1 - source}
      >
        {reading}
      </Text>
      <SourceLabel opacity={source} />
    </AbsoluteFill>
  );
}

function SourceLabel({ opacity }: { opacity: number }) {
  if (opacity <= 0) return null;
  const { meter, source } = CELL;
  const terminal = {
    position: "absolute",
    top: meter.cy,
    transform: "translateY(-50%)",
    fontFamily: FONT,
    fontSize: type.hero,
    fontWeight: 700,
    lineHeight: 1,
    color: colors.sourceText,
  } as const;
  return (
    <div style={{ position: "absolute", inset: 0, opacity }}>
      <div style={{ ...terminal, left: meter.cx - source.width / 2 + 14 }}>
        −
      </div>
      <div
        style={{
          ...terminal,
          left: meter.cx + source.width / 2 - 14,
          transform: "translate(-100%, -50%)",
        }}
      >
        +
      </div>
      <div
        style={{
          ...terminal,
          left: meter.cx,
          transform: "translate(-50%, -50%)",
          fontSize: type.label,
        }}
      >
        DC
      </div>
    </div>
  );
}
