import type { ReactNode } from "react";
import { colors, FONT, SAFE, type } from "../theme";
import { Text } from "./Text";

/** Scene title with its top edge at y 120. */
export function Title({ children }: { children: ReactNode }) {
  return (
    <Text x={SAFE} y={178} size={type.title} weight={700} anchor="start">
      {children}
    </Text>
  );
}

/** Left-aligned block of body text that rises into place as `show` goes 0→1. */
export function Note({
  x,
  y,
  show,
  children,
}: {
  x: number;
  y: number;
  show: number;
  children: ReactNode;
}) {
  if (show <= 0) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        fontFamily: FONT,
        fontSize: type.body,
        lineHeight: 1.35,
        color: colors.text,
        whiteSpace: "nowrap",
        opacity: Math.min(1, show),
        transform: `translateY(${(1 - show) * 20}px)`,
      }}
    >
      {children}
    </div>
  );
}

const PITFALL_LABEL = {
  fontWeight: 700,
  color: colors.forbidden,
  marginRight: "0.3em",
} as const;

type PitfallProps = {
  x: number;
  y: number;
  size: number;
  width?: number;
  wrong: ReactNode;
  correction: ReactNode;
  opacity: number;
  /** 0→1 progress of the red strike-out across `wrong`. */
  strike: number;
  /** Opacity of the correction line. */
  fix: number;
};

export function Pitfall({
  x,
  y,
  size,
  width,
  wrong,
  correction,
  opacity,
  strike,
  fix,
}: PitfallProps) {
  if (opacity <= 0) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width,
        boxSizing: "border-box",
        padding: "16px 28px",
        border: `3px solid ${colors.forbidden}`,
        borderRadius: 16,
        background: colors.background,
        fontFamily: FONT,
        fontSize: size,
        lineHeight: 1.2,
        color: colors.text,
        whiteSpace: "nowrap",
        opacity,
      }}
    >
      <div>
        <span style={PITFALL_LABEL}>Pitfall:</span>
        <span style={{ position: "relative" }}>
          {wrong}
          <span
            style={{
              position: "absolute",
              left: 0,
              top: "55%",
              width: `${strike * 100}%`,
              height: Math.max(3, Math.round(size / 12)),
              background: colors.forbidden,
            }}
          />
        </span>
      </div>
      <div style={{ opacity: fix }}>{correction}</div>
    </div>
  );
}

/** Electron-affinity sign convention, shown whenever EA data is on screen. */
export function AffinityBadge({
  opacity,
  scale = 1,
}: {
  opacity: number;
  scale?: number;
}) {
  if (opacity <= 0) return null;
  return (
    <div
      style={{
        position: "absolute",
        right: SAFE,
        top: 126,
        padding: "8px 20px",
        border: `2px solid ${colors.ea}`,
        borderRadius: 999,
        fontFamily: FONT,
        fontSize: 24,
        fontWeight: 500,
        lineHeight: 1.2,
        color: colors.eaText,
        whiteSpace: "nowrap",
        opacity,
        transform: `scale(${scale})`,
        transformOrigin: "right center",
      }}
    >
      EA: energy released (+ = exothermic)
    </div>
  );
}
