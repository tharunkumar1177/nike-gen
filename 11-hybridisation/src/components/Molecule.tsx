import type { ReactNode } from "react";
import { colors, FONT } from "../theme";

export const ATOM_R = 34;
const BOND_WIDTH = 6;

type Point = { x: number; y: number };

export function Atom({
  x,
  y,
  children,
  opacity = 1,
  ring = colors.text,
  size = 48,
}: Point & {
  children: ReactNode;
  opacity?: number;
  ring?: string;
  size?: number;
}) {
  if (opacity <= 0) return null;
  return (
    <g opacity={opacity}>
      <circle
        cx={x}
        cy={y}
        r={ATOM_R}
        fill={colors.background}
        stroke={ring}
        strokeWidth={3}
      />
      <text
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily={FONT}
        fontSize={size}
        fontWeight={700}
        fill={colors.text}
      >
        {children}
      </text>
    </g>
  );
}

/** Ends of the segment between two atom centres, trimmed to the atom rings. */
function trimmed(a: Point, b: Point, inset = ATOM_R) {
  const length = Math.hypot(b.x - a.x, b.y - a.y);
  const ux = (b.x - a.x) / length;
  const uy = (b.y - a.y) / length;
  return {
    x1: a.x + ux * inset,
    y1: a.y + uy * inset,
    x2: b.x - ux * inset,
    y2: b.y - uy * inset,
    ux,
    uy,
    length: length - 2 * inset,
  };
}

type BondProps = {
  a: Point;
  b: Point;
  color?: string;
  /** 0→1 share drawn from `a`. */
  progress?: number;
  opacity?: number;
  /** Perpendicular offset in px (for multiple bonds). */
  offset?: number;
  width?: number;
};

export function Bond({
  a,
  b,
  color = colors.text,
  progress = 1,
  opacity = 1,
  offset = 0,
  width = BOND_WIDTH,
}: BondProps) {
  if (progress <= 0 || opacity <= 0) return null;
  const t = trimmed(a, b);
  const nx = -t.uy * offset;
  const ny = t.ux * offset;
  return (
    <line
      x1={t.x1 + nx}
      y1={t.y1 + ny}
      x2={t.x1 + nx + (t.x2 - t.x1) * progress}
      y2={t.y1 + ny + (t.y2 - t.y1) * progress}
      stroke={color}
      strokeWidth={width}
      strokeLinecap="round"
      opacity={opacity}
    />
  );
}

/** Wedge bond (towards the viewer), narrow at `a`. */
export function Wedge({
  a,
  b,
  color = colors.text,
  opacity = 1,
}: Omit<BondProps, "progress" | "offset" | "width">) {
  if (opacity <= 0) return null;
  const t = trimmed(a, b, ATOM_R - 4);
  const half = 11;
  const points = [
    `${t.x1},${t.y1}`,
    `${t.x2 - t.uy * half},${t.y2 + t.ux * half}`,
    `${t.x2 + t.uy * half},${t.y2 - t.ux * half}`,
  ].join(" ");
  return <polygon points={points} fill={color} opacity={opacity} />;
}

/** Hashed bond (away from the viewer), narrow at `a`. */
export function Dash({
  a,
  b,
  color = colors.text,
  opacity = 1,
}: Omit<BondProps, "progress" | "offset" | "width">) {
  if (opacity <= 0) return null;
  const t = trimmed(a, b, ATOM_R - 4);
  const count = Math.max(4, Math.round(t.length / 12));
  const lines = Array.from({ length: count }, (_, i) => {
    const f = (i + 0.5) / count;
    const cx = t.x1 + (t.x2 - t.x1) * f;
    const cy = t.y1 + (t.y2 - t.y1) * f;
    const half = 2 + 10 * f;
    return (
      <line
        key={i}
        x1={cx - t.uy * half}
        y1={cy + t.ux * half}
        x2={cx + t.uy * half}
        y2={cy - t.ux * half}
        stroke={color}
        strokeWidth={3}
        strokeLinecap="round"
      />
    );
  });
  return <g opacity={opacity}>{lines}</g>;
}

/** Lone pair: two dots on a pill, centred at (x, y), rotated by `angle`. */
export function LonePair({
  x,
  y,
  angle = 0,
  opacity = 1,
}: Point & { angle?: number; opacity?: number }) {
  if (opacity <= 0) return null;
  return (
    <g
      transform={`translate(${x} ${y}) rotate(${angle})`}
      opacity={opacity}
    >
      <rect
        x={-22}
        y={-12}
        width={44}
        height={24}
        rx={12}
        fill={colors.lonePair}
      />
      <circle cx={-10} cy={0} r={5} fill={colors.lonePairText} />
      <circle cx={10} cy={0} r={5} fill={colors.lonePairText} />
    </g>
  );
}

/** Angle arc at `at` between two directions (degrees), with a label. */
export function AngleArc({
  at,
  from,
  to,
  radius = 60,
  color = colors.muted,
  label,
  labelRadius = radius + 40,
  opacity = 1,
  progress = 1,
}: {
  at: Point;
  from: number;
  to: number;
  radius?: number;
  color?: string;
  label?: ReactNode;
  labelRadius?: number;
  opacity?: number;
  progress?: number;
}) {
  if (opacity <= 0 || progress <= 0) return null;
  const end = from + (to - from) * progress;
  const rad = (deg: number) => (deg * Math.PI) / 180;
  const sx = at.x + radius * Math.cos(rad(from));
  const sy = at.y + radius * Math.sin(rad(from));
  const ex = at.x + radius * Math.cos(rad(end));
  const ey = at.y + radius * Math.sin(rad(end));
  const large = Math.abs(end - from) > 180 ? 1 : 0;
  const sweep = end > from ? 1 : 0;
  const mid = rad((from + to) / 2);
  return (
    <g opacity={opacity}>
      <path
        d={`M ${sx} ${sy} A ${radius} ${radius} 0 ${large} ${sweep} ${ex} ${ey}`}
        fill="none"
        stroke={color}
        strokeWidth={3}
        strokeDasharray="8 6"
      />
      {label && progress >= 1 ? (
        <text
          x={at.x + labelRadius * Math.cos(mid)}
          y={at.y + labelRadius * Math.sin(mid)}
          textAnchor="middle"
          dominantBaseline="central"
          fontFamily={FONT}
          fontSize={32}
          fontWeight={500}
          fill={color}
        >
          {label}
        </text>
      ) : null}
    </g>
  );
}
