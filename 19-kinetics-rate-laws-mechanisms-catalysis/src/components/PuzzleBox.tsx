import type { ReactNode } from "react";
import { colors, FONT } from "../theme";

type Props = {
  left: number;
  top: number;
  width: number;
  size: number;
  opacity: number;
  scale?: number;
  dy?: number;
  children: ReactNode;
};

/** The NO₂ + CO mystery, planted in the initial-rates scene and solved in the mechanism scene. */
export function PuzzleBox({
  left,
  top,
  width,
  size,
  opacity,
  scale = 1,
  dy = 0,
  children,
}: Props) {
  if (opacity <= 0) return null;
  return (
    <div
      style={{
        position: "absolute",
        left,
        top: top + dy,
        width,
        boxSizing: "border-box",
        padding: "18px 28px",
        border: `3px solid ${colors.reactant}`,
        borderRadius: 16,
        background: colors.reactantFill,
        fontFamily: FONT,
        fontSize: size,
        lineHeight: 1.3,
        color: colors.text,
        opacity,
        transform: `scale(${scale})`,
        transformOrigin: "top left",
      }}
    >
      <span style={{ fontWeight: 700, color: colors.reactant }}>Mystery: </span>
      {children}
    </div>
  );
}
