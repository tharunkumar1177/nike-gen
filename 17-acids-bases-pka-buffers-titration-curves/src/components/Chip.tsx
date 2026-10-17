import type { ReactNode } from "react";
import { colors, FONT } from "../theme";

export type Species = "acid" | "base" | "hydronium" | "hydroxide" | "water";

const STYLE: Record<Species, { fill: string; ink: string }> = {
  acid: { fill: colors.acid, ink: colors.text },
  base: { fill: colors.base, ink: colors.text },
  hydronium: { fill: colors.hydronium, ink: colors.background },
  hydroxide: { fill: colors.hydroxide, ink: colors.hydroxideInk },
  water: { fill: colors.water, ink: colors.muted },
};

type Props = {
  species: Species;
  /** Centre x in px. */
  x: number;
  /** Centre y in px. */
  y: number;
  radius: number;
  opacity?: number;
  scale?: number;
  children: ReactNode;
};

/** Labelled particle drawn as a filled circle centred on (x, y). */
export function Chip({
  species,
  x,
  y,
  radius,
  opacity = 1,
  scale = 1,
  children,
}: Props) {
  if (opacity <= 0) return null;
  const { fill, ink } = STYLE[species];
  return (
    <div
      style={{
        position: "absolute",
        left: x - radius,
        top: y - radius,
        width: radius * 2,
        height: radius * 2,
        borderRadius: "50%",
        background: fill,
        border: species === "water" ? `2px solid ${colors.grid}` : undefined,
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: FONT,
        fontWeight: 700,
        fontSize: radius * 0.7,
        color: ink,
        opacity,
        transform: `scale(${scale})`,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </div>
  );
}
