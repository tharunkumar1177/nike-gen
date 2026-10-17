import type { ReactNode } from "react";
import { AbsoluteFill } from "remotion";
import { colors, FONT, type } from "../theme";
import { Text } from "./Text";

const MAX = 0.1;
const TICKS = [0, 0.02, 0.04, 0.06, 0.08, 0.1];
const SAMPLES_PER_UNIT = 240;

/** A continuous stretch of a curve over normalised time [from, to]. */
export type Piece = { from: number; to: number; c: (t: number) => number };

export type Series = {
  pieces: readonly Piece[];
  color: string;
  label: ReactNode;
};

type Props = {
  /** Left edge of the plot area in px. */
  x: number;
  /** Top edge of the plot area in px. */
  y: number;
  width: number;
  height: number;
  opacity: number;
  /** Normalised time up to which the curves are drawn. */
  reveal: number;
  series: readonly Series[];
  /** Dashed horizontal lines at fixed concentrations. */
  references?: readonly { c: number; color: string; opacity: number }[];
  /** Shaded region from `from` to the end of the time axis. */
  band?: { from: number; opacity: number; label: string };
};

function visible(pieces: readonly Piece[], reveal: number) {
  return pieces.filter((piece) => reveal > piece.from);
}

export function ConcentrationGraph({
  x,
  y,
  width,
  height,
  opacity,
  reveal,
  series,
  references = [],
  band,
}: Props) {
  if (opacity <= 0) return null;
  const xOf = (t: number) => x + t * width;
  const yOf = (c: number) => y + height - (c / MAX) * height;
  const bottom = y + height;

  const curve = (pieces: readonly Piece[]) => {
    const points: string[] = [];
    for (const piece of visible(pieces, reveal)) {
      const end = Math.min(piece.to, reveal);
      const steps = Math.max(
        1,
        Math.ceil((end - piece.from) * SAMPLES_PER_UNIT),
      );
      for (let i = 0; i <= steps; i += 1) {
        const t = piece.from + ((end - piece.from) * i) / steps;
        points.push(`${xOf(t).toFixed(1)} ${yOf(piece.c(t)).toFixed(1)}`);
      }
    }
    return points.length === 0 ? "" : `M${points.join(" L")}`;
  };

  const tip = (pieces: readonly Piece[]) => {
    const last = visible(pieces, reveal).at(-1);
    if (!last) return null;
    const t = Math.min(last.to, reveal);
    return { x: xOf(t), y: yOf(last.c(t)) };
  };

  return (
    <AbsoluteFill style={{ opacity }}>
      <svg width="100%" height="100%" style={{ position: "absolute" }}>
        {band ? (
          <rect
            x={xOf(band.from)}
            y={y}
            width={xOf(1) - xOf(band.from)}
            height={height}
            fill={colors.box}
            opacity={band.opacity}
          />
        ) : null}
        {TICKS.map((c) => (
          <g key={c}>
            <line
              x1={x}
              x2={x + width}
              y1={yOf(c)}
              y2={yOf(c)}
              stroke={colors.grid}
              strokeWidth={c === 0 ? 0 : 2}
            />
            <text
              x={x - 16}
              y={yOf(c)}
              textAnchor="end"
              dominantBaseline="middle"
              fontFamily={FONT}
              fontSize={28}
              fill={colors.muted}
            >
              {c === 0 ? "0" : c.toFixed(2)}
            </text>
          </g>
        ))}
        {references.map((ref) => (
          <line
            key={ref.c}
            x1={x}
            x2={x + width}
            y1={yOf(ref.c)}
            y2={yOf(ref.c)}
            stroke={ref.color}
            strokeWidth={3}
            strokeDasharray="14 10"
            opacity={ref.opacity}
          />
        ))}
        <path
          d={`M${x} ${y} V${bottom} H${x + width}`}
          stroke={colors.muted}
          strokeWidth={3}
          fill="none"
        />
        {series.map((s, i) => (
          <path
            key={i}
            d={curve(s.pieces)}
            stroke={s.color}
            strokeWidth={6}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        ))}
        <text
          x={x - 100}
          y={y + height / 2}
          textAnchor="middle"
          transform={`rotate(-90 ${x - 100} ${y + height / 2})`}
          fontFamily={FONT}
          fontSize={type.label}
          fontWeight={500}
          fill={colors.muted}
        >
          Concentration (M)
        </text>
        <text
          x={x + width / 2}
          y={bottom + 48}
          textAnchor="middle"
          fontFamily={FONT}
          fontSize={type.label}
          fontWeight={500}
          fill={colors.muted}
        >
          Time
        </text>
      </svg>
      {band ? (
        <Text
          x={(xOf(band.from) + xOf(1)) / 2}
          y={y + 28}
          size={type.label}
          weight={500}
          color={colors.muted}
          anchor="middle"
          opacity={band.opacity}
        >
          {band.label}
        </Text>
      ) : null}
      {series.map((s, i) => {
        const at = tip(s.pieces);
        if (!at) return null;
        return (
          <Text
            key={i}
            x={at.x + 20}
            y={at.y}
            size={type.label}
            weight={700}
            color={s.color}
          >
            {s.label}
          </Text>
        );
      })}
    </AbsoluteFill>
  );
}
