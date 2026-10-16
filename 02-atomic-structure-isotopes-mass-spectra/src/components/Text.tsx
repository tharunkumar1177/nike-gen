import type { ReactNode } from "react";
import { colors, FONT } from "../theme";

type Props = {
  /** Anchor x in px. */
  x: number;
  /** Centre y in px. */
  y: number;
  size: number;
  weight?: 400 | 500 | 700;
  color?: string;
  opacity?: number;
  scale?: number;
  /** Rotation in degrees about the text centre. */
  rotate?: number;
  /** Which horizontal edge `x` refers to. */
  anchor?: "start" | "middle" | "end";
  children: ReactNode;
};

const SHIFT = { start: "0%", middle: "-50%", end: "-100%" } as const;

export function Text({
  x,
  y,
  size,
  weight = 400,
  color = colors.text,
  opacity = 1,
  scale = 1,
  rotate = 0,
  anchor = "middle",
  children,
}: Props) {
  if (opacity <= 0) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `translate(${SHIFT[anchor]}, -50%) rotate(${rotate}deg) scale(${scale})`,
        transformOrigin: "center",
        fontFamily: FONT,
        fontSize: size,
        fontWeight: weight,
        lineHeight: 1.2,
        color,
        opacity,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </div>
  );
}
