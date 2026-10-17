import type { ReactNode } from "react";
import { VIDEO } from "../theme";

/** Full-frame SVG layer in video pixel coordinates. */
export function Canvas({
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

type StrokeProps = {
  d: string;
  color: string;
  width?: number;
  /** 0→1 share of the path drawn so far. */
  drawn?: number;
  dashed?: boolean;
  opacity?: number;
};

/** Path that can be drawn on progressively. */
export function Stroke({
  d,
  color,
  width = 4,
  drawn = 1,
  dashed = false,
  opacity = 1,
}: StrokeProps) {
  if (drawn <= 0 || opacity <= 0) return null;
  return (
    <path
      d={d}
      pathLength={1}
      fill="none"
      stroke={color}
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray={dashed ? "0.012 0.012" : `${drawn} 1`}
      opacity={opacity}
    />
  );
}

type ArrowLineProps = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
  width?: number;
  head?: number;
  opacity?: number;
};

/** Straight line with an arrowhead at (x2, y2). */
export function ArrowLine({
  x1,
  y1,
  x2,
  y2,
  color,
  width = 3,
  head = 14,
  opacity = 1,
}: ArrowLineProps) {
  if (opacity <= 0) return null;
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const wing = (side: number) => {
    const a = angle + side * (Math.PI * 0.82);
    return `${x2 + head * Math.cos(a)} ${y2 + head * Math.sin(a)}`;
  };
  return (
    <g
      opacity={opacity}
      stroke={color}
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    >
      <path d={`M${x1} ${y1} L${x2} ${y2}`} />
      <path d={`M${wing(1)} L${x2} ${y2} L${wing(-1)}`} />
    </g>
  );
}

/** Polyline path through points, for computed curves. */
export function polyline(points: readonly (readonly [number, number])[]) {
  return points
    .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`)
    .join(" ");
}
