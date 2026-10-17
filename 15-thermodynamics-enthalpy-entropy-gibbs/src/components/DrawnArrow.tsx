import { VIDEO } from "../theme";

type Props = {
  from: [number, number];
  to: [number, number];
  /** 0→1 share of the shaft drawn; the head appears once the shaft is complete. */
  progress: number;
  color: string;
  width?: number;
  dashed?: boolean;
};

const HEAD = 22;

/** Straight arrow in frame coordinates, drawn from `from` towards `to`. */
export function DrawnArrow({
  from,
  to,
  progress,
  color,
  width = 6,
  dashed = false,
}: Props) {
  if (progress <= 0) return null;
  const [x1, y1] = from;
  const [x2, y2] = to;
  const length = Math.hypot(x2 - x1, y2 - y1);
  const ux = (x2 - x1) / length;
  const uy = (y2 - y1) / length;
  const tipX = x1 + (x2 - x1) * progress;
  const tipY = y1 + (y2 - y1) * progress;
  const shaftEndX = tipX - ux * HEAD * 0.6 * progress;
  const shaftEndY = tipY - uy * HEAD * 0.6 * progress;
  const head = Math.max(0, (progress - 0.85) / 0.15);
  const back = { x: tipX - ux * HEAD, y: tipY - uy * HEAD };
  const side = { x: -uy * HEAD * 0.6, y: ux * HEAD * 0.6 };
  return (
    <svg
      width={VIDEO.width}
      height={VIDEO.height}
      style={{ position: "absolute", left: 0, top: 0 }}
    >
      <line
        x1={x1}
        y1={y1}
        x2={shaftEndX}
        y2={shaftEndY}
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
        strokeDasharray={dashed ? `${width * 2.5} ${width * 2}` : undefined}
      />
      {head > 0 ? (
        <polygon
          points={`${tipX},${tipY} ${back.x + side.x},${back.y + side.y} ${back.x - side.x},${back.y - side.y}`}
          fill={color}
          opacity={head}
        />
      ) : null}
    </svg>
  );
}
