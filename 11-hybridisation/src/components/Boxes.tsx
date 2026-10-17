import type { ReactNode } from "react";
import { colors, FONT } from "../theme";

export const BOX = 80;
const HARPOON = 56;

/** Orbital box centred at (x, y). */
export function OrbitalBox({
  x,
  y,
  stroke,
  opacity = 1,
}: {
  x: number;
  y: number;
  stroke: string;
  opacity?: number;
}) {
  if (opacity <= 0) return null;
  return (
    <rect
      x={x - BOX / 2}
      y={y - BOX / 2}
      width={BOX}
      height={BOX}
      rx={10}
      fill={colors.background}
      stroke={stroke}
      strokeWidth={3}
      opacity={opacity}
    />
  );
}

/**
 * Spin harpoon centred at (x, y): up has its barb on the left, down on the
 * right, so the two read as a pair.
 */
export function Harpoon({
  x,
  y,
  up,
  opacity = 1,
}: {
  x: number;
  y: number;
  up: boolean;
  opacity?: number;
}) {
  if (opacity <= 0) return null;
  const half = HARPOON / 2;
  const tip = up ? y - half : y + half;
  const tail = up ? y + half : y - half;
  const barbX = up ? x - 18 : x + 18;
  const barbY = up ? tip + 24 : tip - 24;
  return (
    <g opacity={opacity}>
      <line
        x1={x}
        y1={tail}
        x2={x}
        y2={tip}
        stroke={colors.muted}
        strokeWidth={6}
        strokeLinecap="round"
      />
      <line
        x1={x}
        y1={tip}
        x2={barbX}
        y2={barbY}
        stroke={colors.muted}
        strokeWidth={6}
        strokeLinecap="round"
      />
    </g>
  );
}

/** Vertical energy axis from (x, bottom) up to (x, top), labelled above. */
export function EnergyAxis({
  x,
  top,
  bottom,
  opacity = 1,
}: {
  x: number;
  top: number;
  bottom: number;
  opacity?: number;
}) {
  if (opacity <= 0) return null;
  return (
    <g opacity={opacity}>
      <line
        x1={x}
        y1={bottom}
        x2={x}
        y2={top + 10}
        stroke={colors.muted}
        strokeWidth={4}
      />
      <polygon
        points={`${x},${top - 12} ${x - 12},${top + 14} ${x + 12},${top + 14}`}
        fill={colors.muted}
      />
      <SvgLabel x={x} y={top - 40}>
        Energy
      </SvgLabel>
    </g>
  );
}

export function SvgLabel({
  x,
  y,
  children,
  color = colors.text,
  size = 32,
  weight = 500,
  anchor = "middle",
  opacity = 1,
}: {
  x: number;
  y: number;
  children: ReactNode;
  color?: string;
  size?: number;
  weight?: 400 | 500 | 700;
  anchor?: "start" | "middle" | "end";
  opacity?: number;
}) {
  if (opacity <= 0) return null;
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      dominantBaseline="central"
      fontFamily={FONT}
      fontSize={size}
      fontWeight={weight}
      fill={color}
      opacity={opacity}
    >
      {children}
    </text>
  );
}
