import type { ReactNode } from "react";
import { colors, VIDEO } from "../theme";

/** Full-frame SVG layer in video pixel coordinates. */
export function Stage({
  children,
  opacity = 1,
}: {
  children: ReactNode;
  opacity?: number;
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

/** Scales children about (`cx`, `cy`). */
export function ScaleAbout({
  cx,
  cy,
  scale,
  opacity = 1,
  children,
}: {
  cx: number;
  cy: number;
  scale: number;
  opacity?: number;
  children: ReactNode;
}) {
  if (scale <= 0 || opacity <= 0) return null;
  return (
    <g
      opacity={opacity}
      transform={`translate(${cx} ${cy}) scale(${scale}) translate(${-cx} ${-cy})`}
    >
      {children}
    </g>
  );
}

/** Horizontal energy level centred on `cx`, drawn outward from the centre. */
export function Level({
  cx,
  y,
  width = 60,
  shown = 1,
  color = colors.axis,
}: {
  cx: number;
  y: number;
  width?: number;
  shown?: number;
  color?: string;
}) {
  if (shown <= 0) return null;
  const half = (width / 2) * shown;
  return (
    <line
      x1={cx - half}
      x2={cx + half}
      y1={y}
      y2={y}
      stroke={color}
      strokeWidth={6}
      strokeLinecap="round"
    />
  );
}

/** 30 px half-arrow electron centred on (`x`, `y`); drops in as `shown` rises. */
export function Electron({
  x,
  y,
  dir,
  shown,
  color = colors.axis,
}: {
  x: number;
  y: number;
  dir: "up" | "down";
  shown: number;
  color?: string;
}) {
  if (shown <= 0) return null;
  const d =
    dir === "up"
      ? `M ${x} ${y + 15} L ${x} ${y - 15} L ${x - 8} ${y - 5}`
      : `M ${x} ${y - 15} L ${x} ${y + 15} L ${x + 8} ${y + 5}`;
  return (
    <path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={4}
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity={shown}
      transform={`translate(0 ${(shown - 1) * 20})`}
    />
  );
}

/** Dashed line drawn from its first point as `shown` rises. */
export function Dashed({
  x1,
  y1,
  x2,
  y2,
  shown = 1,
  color = colors.axis,
  width = 3,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  shown?: number;
  color?: string;
  width?: number;
}) {
  if (shown <= 0) return null;
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x1 + (x2 - x1) * shown}
      y2={y1 + (y2 - y1) * shown}
      stroke={color}
      strokeWidth={width}
      strokeDasharray="10 10"
    />
  );
}

/** Straight arrow drawn from its tail as `shown` rises. */
export function Arrow({
  x1,
  y1,
  x2,
  y2,
  shown = 1,
  color = colors.axis,
  width = 4,
  head = 16,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  shown?: number;
  color?: string;
  width?: number;
  head?: number;
}) {
  if (shown <= 0) return null;
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const ex = x1 + (x2 - x1) * shown;
  const ey = y1 + (y2 - y1) * shown;
  const barb = (side: number) =>
    `${ex - head * Math.cos(angle + side)} ${ey - head * Math.sin(angle + side)}`;
  return (
    <g
      stroke={color}
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    >
      <line x1={x1} y1={y1} x2={ex} y2={ey} />
      <path d={`M ${barb(-0.5)} L ${ex} ${ey} L ${barb(0.5)}`} />
    </g>
  );
}
