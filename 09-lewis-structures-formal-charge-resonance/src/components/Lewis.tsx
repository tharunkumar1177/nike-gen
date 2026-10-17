import type { ReactNode } from "react";
import { colors, FONT, VIDEO } from "../theme";

export const BOND_LENGTH = 180;
export const BOND_TRIM = 44;
export const BOND_GAP = 16;
export const BOND_WIDTH = 6;
export const PAIR_DISTANCE = 62;
export const PAIR_SPACING = 20;
export const DOT_RADIUS = 8;

export type Point = { x: number; y: number };

/** Full-frame SVG layer so every structure shares video coordinates. */
export function Stage({
  opacity = 1,
  children,
}: {
  opacity?: number;
  children: ReactNode;
}) {
  if (opacity <= 0) return null;
  return (
    <svg
      width={VIDEO.width}
      height={VIDEO.height}
      viewBox={`0 0 ${VIDEO.width} ${VIDEO.height}`}
      style={{ position: "absolute", left: 0, top: 0, opacity }}
    >
      {children}
    </svg>
  );
}

export function AtomSymbol({
  x,
  y,
  symbol,
  size = 80,
  color = colors.text,
  opacity = 1,
}: Point & {
  symbol: string;
  size?: number;
  color?: string;
  opacity?: number;
}) {
  if (opacity <= 0) return null;
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      dominantBaseline="central"
      fontFamily={FONT}
      fontSize={size}
      fontWeight={500}
      fill={color}
      opacity={opacity}
    >
      {symbol}
    </text>
  );
}

type LineStyle = "solid" | "dashed";

/**
 * Bond of one or more parallel lines between two atom centres, trimmed so it
 * clears the symbols. `draw` grows each line from `from` towards `to`.
 */
export function Bond({
  from,
  to,
  lines = ["solid"],
  color = colors.bond,
  draw = 1,
  opacity = 1,
  trim = BOND_TRIM,
}: {
  from: Point;
  to: Point;
  lines?: LineStyle[];
  color?: string;
  draw?: number;
  opacity?: number;
  trim?: number;
}) {
  if (opacity <= 0 || draw <= 0) return null;
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const length = Math.hypot(dx, dy);
  const ux = dx / length;
  const uy = dy / length;
  const start = { x: from.x + ux * trim, y: from.y + uy * trim };
  const span = (length - 2 * trim) * draw;
  const end = { x: start.x + ux * span, y: start.y + uy * span };
  return (
    <g opacity={opacity}>
      {lines.map((style, i) => {
        const offset = (i - (lines.length - 1) / 2) * BOND_GAP;
        const ox = -uy * offset;
        const oy = ux * offset;
        return (
          <line
            key={i}
            x1={start.x + ox}
            y1={start.y + oy}
            x2={end.x + ox}
            y2={end.y + oy}
            stroke={color}
            strokeWidth={BOND_WIDTH}
            strokeLinecap="round"
            strokeDasharray={style === "dashed" ? "14 12" : undefined}
          />
        );
      })}
    </g>
  );
}

export const bondOrder = (order: number): LineStyle[] =>
  Array.from({ length: order }, () => "solid");

/** Unit-direction angles in degrees, measured clockwise from +x (SVG y points down). */
export const SIDE = { right: 0, bottom: 90, left: 180, top: 270 } as const;

/** Centre of a lone pair placed on `angle` around an atom. */
export function pairCentre(atom: Point, angle: number, distance = PAIR_DISTANCE) {
  const rad = (angle * Math.PI) / 180;
  return {
    x: atom.x + Math.cos(rad) * distance,
    y: atom.y + Math.sin(rad) * distance,
  };
}

/** Two dots centred on `at`, laid perpendicular to `angle`. */
export function LonePair({
  at,
  angle,
  color = colors.lonePair,
  opacity = 1,
  scale = 1,
}: {
  at: Point;
  angle: number;
  color?: string;
  opacity?: number;
  scale?: number;
}) {
  if (opacity <= 0) return null;
  const rad = (angle * Math.PI) / 180;
  const px = -Math.sin(rad) * (PAIR_SPACING / 2);
  const py = Math.cos(rad) * (PAIR_SPACING / 2);
  return (
    <g opacity={opacity}>
      <circle cx={at.x + px} cy={at.y + py} r={DOT_RADIUS * scale} fill={color} />
      <circle cx={at.x - px} cy={at.y - py} r={DOT_RADIUS * scale} fill={color} />
    </g>
  );
}

/** Lone pairs on several sides of one atom. */
export function LonePairs({
  atom,
  angles,
  opacity = 1,
  scale = 1,
}: {
  atom: Point;
  angles: number[];
  opacity?: number;
  scale?: number;
}) {
  return (
    <>
      {angles.map((angle) => (
        <LonePair
          key={angle}
          at={pairCentre(atom, angle)}
          angle={angle}
          opacity={opacity}
          scale={scale}
        />
      ))}
    </>
  );
}

export const formatCharge = (value: number) =>
  value > 0 ? `+${value}` : value < 0 ? `−${Math.abs(value)}` : "0";

export const chargeColor = (value: number) =>
  value > 0 ? colors.positive : value < 0 ? colors.negative : colors.muted;

/** Formal-charge badge at the upper right of an atom. */
export function ChargeBadge({
  atom,
  value,
  opacity = 1,
  scale = 1,
  dx = 58,
  dy = -58,
}: {
  atom: Point;
  value: number;
  opacity?: number;
  scale?: number;
  dx?: number;
  dy?: number;
}) {
  if (opacity <= 0) return null;
  const color = chargeColor(value);
  const cx = atom.x + dx;
  const cy = atom.y + dy;
  return (
    <g
      opacity={opacity}
      transform={`translate(${cx} ${cy}) scale(${scale}) translate(${-cx} ${-cy})`}
    >
      <circle cx={cx} cy={cy} r={28} fill="#FFFFFF" stroke={color} strokeWidth={4} />
      <text
        x={cx}
        y={cy}
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily={FONT}
        fontSize={value === 0 ? 32 : 26}
        fontWeight={700}
        fill={color}
      >
        {formatCharge(value)}
      </text>
    </g>
  );
}
