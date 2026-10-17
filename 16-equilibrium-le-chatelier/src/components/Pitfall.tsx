import type { ReactNode } from "react";
import { colors, FONT, SAFE } from "../theme";

type Props = {
  top: number;
  left?: number;
  width: number;
  size?: number;
  opacity: number;
  scale?: number;
  children: ReactNode;
};

/** Red-bordered pitfall box anchored at its top-left corner. */
export function Pitfall({
  top,
  left = SAFE,
  width,
  size = 40,
  opacity,
  scale = 1,
  children,
}: Props) {
  if (opacity <= 0) return null;
  return (
    <div
      style={{
        position: "absolute",
        left,
        top,
        width,
        boxSizing: "border-box",
        padding: "20px 32px",
        border: `4px solid ${colors.pitfall}`,
        borderRadius: 16,
        background: colors.pitfallFill,
        fontFamily: FONT,
        fontSize: size,
        lineHeight: 1.3,
        color: colors.text,
        opacity,
        transform: `scale(${scale})`,
        transformOrigin: "top left",
      }}
    >
      <span style={{ fontWeight: 700, color: colors.pitfall }}>Pitfall: </span>
      {children}
    </div>
  );
}
