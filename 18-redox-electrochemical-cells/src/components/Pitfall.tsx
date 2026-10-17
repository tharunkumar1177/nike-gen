import type { ReactNode } from "react";
import { colors, FONT, type } from "../theme";

type Props = {
  left: number;
  top: number;
  width?: number;
  opacity: number;
  /** Vertical offset in px, for drop-ins. */
  dy?: number;
  children: ReactNode;
};

/** Red-bordered pitfall box anchored at its top-left corner. */
export function Pitfall({
  left,
  top,
  width = 580,
  opacity,
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
        padding: 24,
        border: `3px solid ${colors.pitfall}`,
        borderRadius: 16,
        background: colors.pitfallFill,
        fontFamily: FONT,
        fontSize: type.body,
        lineHeight: 1.4,
        color: colors.text,
        opacity,
      }}
    >
      <span style={{ fontWeight: 700, color: colors.pitfall }}>Pitfall: </span>
      {children}
    </div>
  );
}
