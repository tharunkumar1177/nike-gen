import type { ReactNode } from "react";
import { colors } from "../theme";

type Props = {
  /** Left edge in px. */
  x: number;
  /** Top edge in px. */
  y: number;
  width: number;
  height: number;
  opacity: number;
  /** Fraction of the height filled with liquid. */
  level?: number;
  children?: ReactNode;
};

/** Open-topped beaker outline with liquid; children are positioned in page px. */
export function Beaker({
  x,
  y,
  width,
  height,
  opacity,
  level = 0.8,
  children,
}: Props) {
  if (opacity <= 0) return null;
  const liquidTop = y + height * (1 - level);
  return (
    <div style={{ position: "absolute", inset: 0, opacity }}>
      <svg width="100%" height="100%" style={{ position: "absolute" }}>
        <path
          d={`M${x} ${liquidTop} V${y + height - 24} Q${x} ${y + height} ${x + 24} ${y + height} H${x + width - 24} Q${x + width} ${y + height} ${x + width} ${y + height - 24} V${liquidTop} Z`}
          fill={colors.water}
        />
        <path
          d={`M${x - 14} ${y} H${x} V${y + height - 24} Q${x} ${y + height} ${x + 24} ${y + height} H${x + width - 24} Q${x + width} ${y + height} ${x + width} ${y + height - 24} V${y} H${x + width + 14}`}
          stroke={colors.muted}
          strokeWidth={6}
          strokeLinejoin="round"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      {children}
    </div>
  );
}
