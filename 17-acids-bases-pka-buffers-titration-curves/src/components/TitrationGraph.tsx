import type { ReactNode } from "react";
import { AbsoluteFill } from "remotion";
import { strongCurve, TITRATION, weakCurve } from "../acidbase";
import { colors, FONT, type } from "../theme";
import { Text } from "./Text";

export const PLOT = { x: 260, y: 270, width: 860, height: 580 } as const;

const MAX_PH = 14;
const PH_TICKS = [0, 2, 4, 6, 8, 10, 12, 14];
const ML_TICKS = [0, 5, 10, 15, 20, 25, 30, 35];
const STEP_ML = 0.05;

export const xOf = (ml: number) =>
  PLOT.x + (ml / TITRATION.maxMl) * PLOT.width;
export const yOf = (pH: number) =>
  PLOT.y + PLOT.height - (pH / MAX_PH) * PLOT.height;

function sample(curve: (ml: number) => number) {
  const count = Math.round(TITRATION.maxMl / STEP_ML);
  return Array.from({ length: count + 1 }, (_, i) => {
    const ml = i * STEP_ML;
    return { ml, pH: curve(ml) };
  });
}

const WEAK = sample(weakCurve);
const STRONG = sample(strongCurve);

function path(points: readonly { ml: number; pH: number }[], upTo: number) {
  const shown = points.filter((p) => p.ml <= upTo);
  if (shown.length < 2) return "";
  return `M${shown.map((p) => `${xOf(p.ml).toFixed(1)} ${yOf(p.pH).toFixed(1)}`).join(" L")}`;
}

export type Marker = {
  ml: number;
  pH: number;
  label: ReactNode;
  opacity: number;
  /** Label offset from the point in px. */
  dx: number;
  dy: number;
};

export type Band = {
  from: number;
  to: number;
  fill: string;
  opacity: number;
};

type Props = {
  opacity: number;
  /** Volume of NaOH (mL) up to which the acetic acid curve is drawn. */
  reveal: number;
  /** Volume up to which the strong-acid comparison is drawn; 0 hides it. */
  strongReveal?: number;
  strongOpacity?: number;
  cursor?: { ml: number; opacity: number };
  markers?: readonly Marker[];
  bands?: readonly Band[];
  /** Highlight rectangle in data units, drawn behind the curves. */
  highlight?: {
    fromMl: number;
    toMl: number;
    fromPh: number;
    toPh: number;
    opacity: number;
  };
};

export function TitrationGraph({
  opacity,
  reveal,
  strongReveal = 0,
  strongOpacity = 1,
  cursor,
  markers = [],
  bands = [],
  highlight,
}: Props) {
  if (opacity <= 0) return null;
  const bottom = PLOT.y + PLOT.height;
  const right = PLOT.x + PLOT.width;
  return (
    <AbsoluteFill style={{ opacity }}>
      <svg width="100%" height="100%" style={{ position: "absolute" }}>
        {PH_TICKS.map((pH) => (
          <g key={`ph-${pH}`}>
            <line
              x1={PLOT.x}
              x2={right}
              y1={yOf(pH)}
              y2={yOf(pH)}
              stroke={colors.grid}
              strokeWidth={pH === 0 ? 0 : 2}
            />
            <text
              x={PLOT.x - 16}
              y={yOf(pH)}
              textAnchor="end"
              dominantBaseline="middle"
              fontFamily={FONT}
              fontSize={28}
              fill={colors.muted}
            >
              {pH}
            </text>
          </g>
        ))}
        {ML_TICKS.map((ml) => (
          <text
            key={`ml-${ml}`}
            x={xOf(ml)}
            y={bottom + 34}
            textAnchor="middle"
            fontFamily={FONT}
            fontSize={28}
            fill={colors.muted}
          >
            {ml}
          </text>
        ))}
        {bands.map((band) =>
          band.opacity > 0 ? (
            <rect
              key={`${band.from}-${band.to}`}
              x={PLOT.x}
              y={yOf(band.to)}
              width={PLOT.width}
              height={yOf(band.from) - yOf(band.to)}
              fill={band.fill}
              opacity={0.5 * band.opacity}
            />
          ) : null,
        )}
        {highlight && highlight.opacity > 0 ? (
          <rect
            x={xOf(highlight.fromMl)}
            y={yOf(highlight.toPh)}
            width={xOf(highlight.toMl) - xOf(highlight.fromMl)}
            height={yOf(highlight.fromPh) - yOf(highlight.toPh)}
            fill={colors.pka}
            opacity={0.3 * highlight.opacity}
          />
        ) : null}
        <path
          d={`M${PLOT.x} ${PLOT.y} V${bottom} H${right}`}
          stroke={colors.muted}
          strokeWidth={3}
          fill="none"
        />
        {markers.map((m) =>
          m.opacity > 0 ? (
            <path
              key={`drop-${m.ml}`}
              d={`M${PLOT.x} ${yOf(m.pH)} H${xOf(m.ml)} V${bottom}`}
              stroke={colors.pkaText}
              strokeWidth={3}
              strokeDasharray="10 8"
              fill="none"
              opacity={m.opacity}
            />
          ) : null,
        )}
        {strongReveal > 0 ? (
          <path
            d={path(STRONG, strongReveal)}
            stroke={colors.hydronium}
            strokeWidth={4}
            strokeDasharray="14 10"
            strokeLinecap="round"
            fill="none"
            opacity={strongOpacity}
          />
        ) : null}
        <path
          d={path(WEAK, reveal)}
          stroke={colors.muted}
          strokeWidth={6}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {markers.map((m) =>
          m.opacity > 0 ? (
            <circle
              key={`dot-${m.ml}`}
              cx={xOf(m.ml)}
              cy={yOf(m.pH)}
              r={10}
              fill={colors.pkaText}
              opacity={m.opacity}
            />
          ) : null,
        )}
        {cursor && cursor.opacity > 0 ? (
          <circle
            cx={xOf(cursor.ml)}
            cy={yOf(weakCurve(cursor.ml))}
            r={16}
            fill={colors.pka}
            stroke={colors.pkaText}
            strokeWidth={3}
            opacity={cursor.opacity}
          />
        ) : null}
        <text
          x={PLOT.x - 80}
          y={PLOT.y + PLOT.height / 2}
          textAnchor="middle"
          transform={`rotate(-90 ${PLOT.x - 80} ${PLOT.y + PLOT.height / 2})`}
          fontFamily={FONT}
          fontSize={type.label}
          fontWeight={500}
          fill={colors.muted}
        >
          pH
        </text>
        <text
          x={PLOT.x + PLOT.width / 2}
          y={bottom + 80}
          textAnchor="middle"
          fontFamily={FONT}
          fontSize={type.label}
          fontWeight={500}
          fill={colors.muted}
        >
          Volume of NaOH added (mL)
        </text>
      </svg>
      {markers.map((m) => (
        <Text
          key={`label-${m.ml}`}
          x={xOf(m.ml) + m.dx}
          y={yOf(m.pH) + m.dy}
          size={type.label}
          weight={700}
          color={colors.pkaText}
          opacity={m.opacity}
        >
          {m.label}
        </Text>
      ))}
    </AbsoluteFill>
  );
}
