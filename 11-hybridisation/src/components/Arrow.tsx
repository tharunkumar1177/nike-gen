import { VIDEO } from "../theme";

type Props = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
  /** 0→1 share of the arrow drawn from its tail. */
  progress: number;
  width?: number;
  head?: number;
};

export function Arrow({
  x1,
  y1,
  x2,
  y2,
  color,
  progress,
  width = 8,
  head = 24,
}: Props) {
  if (progress <= 0) return null;
  const total = Math.hypot(x2 - x1, y2 - y1);
  const length = total * progress;
  const dx = (x2 - x1) / total;
  const dy = (y2 - y1) / total;
  const shaft = Math.max(0, length - head);
  const baseX = x1 + dx * shaft;
  const baseY = y1 + dy * shaft;
  const tipX = baseX + dx * Math.min(head, length);
  const tipY = baseY + dy * Math.min(head, length);
  const half = head / 2;
  const points = [
    `${tipX},${tipY}`,
    `${baseX - dy * half},${baseY + dx * half}`,
    `${baseX + dy * half},${baseY - dx * half}`,
  ].join(" ");
  return (
    <svg
      width={VIDEO.width}
      height={VIDEO.height}
      style={{ position: "absolute", left: 0, top: 0 }}
    >
      {shaft > 0 ? (
        <line
          x1={x1}
          y1={y1}
          x2={baseX + dx}
          y2={baseY + dy}
          stroke={color}
          strokeWidth={width}
          strokeLinecap="round"
        />
      ) : null}
      <polygon points={points} fill={color} />
    </svg>
  );
}
