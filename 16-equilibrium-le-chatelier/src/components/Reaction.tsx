import type { ReactNode } from "react";
import { colors, FONT } from "../theme";
import { EqArrow, F } from "./Text";

type SideProps = {
  /** 0→1 opacity of the ring around this side. */
  ring: number;
  ringColor: string;
  note?: ReactNode;
  noteOpacity: number;
  children: ReactNode;
};

function alpha(amount: number) {
  const byte = Math.round(Math.max(0, Math.min(1, amount)) * 255);
  return byte.toString(16).padStart(2, "0");
}

function Side({ ring, ringColor, note, noteOpacity, children }: SideProps) {
  return (
    <span
      style={{
        position: "relative",
        display: "inline-block",
        borderRadius: 16,
        outline: `5px solid ${ringColor}${alpha(ring)}`,
        outlineOffset: 12,
      }}
    >
      {children}
      {note === undefined ? null : (
        <span
          style={{
            position: "absolute",
            top: "100%",
            left: "50%",
            transform: "translate(-50%, 24px)",
            fontSize: "0.5em",
            fontWeight: 500,
            color: colors.muted,
            whiteSpace: "nowrap",
            opacity: noteOpacity,
          }}
        >
          {note}
        </span>
      )}
    </span>
  );
}

type Props = {
  /** Centre x in px. */
  x?: number;
  /** Centre y in px. */
  y: number;
  size: number;
  opacity?: number;
  scale?: number;
  dy?: number;
  /** Opacity of a leading "Heat +"; omitted when undefined. */
  heat?: number;
  /** Colour the harpoons by direction (forward green, reverse blue). */
  directional?: boolean;
  rings?: { left?: number; right?: number; color?: string };
  notes?: { left: ReactNode; right: ReactNode; opacity: number };
};

/** N₂O₄ ⇌ 2 NO₂, coloured by species. */
export function Reaction({
  x = 960,
  y,
  size,
  opacity = 1,
  scale = 1,
  dy = 0,
  heat,
  directional = false,
  rings = {},
  notes,
}: Props) {
  if (opacity <= 0) return null;
  const ringColor = rings.color ?? colors.reverse;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y + dy,
        transform: `translate(-50%, -50%) scale(${scale})`,
        display: "flex",
        alignItems: "center",
        fontFamily: FONT,
        fontSize: size,
        fontWeight: 700,
        lineHeight: 1.2,
        color: colors.text,
        opacity,
        whiteSpace: "nowrap",
      }}
    >
      {heat === undefined ? null : (
        <span
          style={{
            color: colors.heatText,
            opacity: heat,
            marginRight: "0.4em",
          }}
        >
          Heat +
        </span>
      )}
      <Side
        ring={rings.left ?? 0}
        ringColor={ringColor}
        note={notes?.left}
        noteOpacity={notes?.opacity ?? 0}
      >
        <span style={{ color: colors.n2o4Text }}>
          <F>N2O4</F>
        </span>
      </Side>
      <EqArrow
        forward={directional ? colors.forward : undefined}
        reverse={directional ? colors.reverse : undefined}
      />
      <Side
        ring={rings.right ?? 0}
        ringColor={ringColor}
        note={notes?.right}
        noteOpacity={notes?.opacity ?? 0}
      >
        <span style={{ color: colors.no2Text }}>
          2 <F>NO2</F>
        </span>
      </Side>
    </div>
  );
}
