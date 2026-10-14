import type { Point } from "./particles";

type Props = {
  from: Point;
  to: Point;
  color: string;
  /** 0→1 draw-on progress. */
  drawn: number;
  width?: number;
  head?: number;
};

export function Arrow({ from, to, color, drawn, width = 8, head = 20 }: Props) {
  if (drawn <= 0) return null;
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const length = Math.hypot(dx, dy);
  const ux = dx / length;
  const uy = dy / length;
  const tipX = from.x + dx * drawn;
  const tipY = from.y + dy * drawn;
  const shaft = Math.max(0, length * drawn - head * 0.8);
  const baseX = tipX - ux * head;
  const baseY = tipY - uy * head;
  const half = head * 0.6;
  return (
    <g>
      <line
        x1={from.x}
        y1={from.y}
        x2={from.x + ux * shaft}
        y2={from.y + uy * shaft}
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
      />
      <polygon
        points={`${tipX},${tipY} ${baseX - uy * half},${baseY + ux * half} ${baseX + uy * half},${baseY - ux * half}`}
        fill={color}
      />
    </g>
  );
}
