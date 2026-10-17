import type { ReactNode } from "react";
import { colors, FONT, SAFE, type } from "../theme";
import { Text } from "./Text";

type ChipProps = {
  /** Centre x in px. */
  x: number;
  /** Centre y in px. */
  y: number;
  color?: string;
  size?: number;
  opacity?: number;
  scale?: number;
  dy?: number;
  children: ReactNode;
};

export function Chip({
  x,
  y,
  color = colors.text,
  size = type.label,
  opacity = 1,
  scale = 1,
  dy = 0,
  children,
}: ChipProps) {
  if (opacity <= 0) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y + dy,
        transform: `translate(-50%, -50%) scale(${scale})`,
        padding: "16px 32px",
        borderRadius: 16,
        backgroundColor: colors.chip,
        fontFamily: FONT,
        fontSize: size,
        fontWeight: 500,
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

type PitfallProps = {
  /** Left edge in px, or centre when `center` is set. */
  x: number;
  center?: boolean;
  /** Centre y in px. */
  y: number;
  /** 0→1 progress of the strikethrough line. */
  strike: number;
  opacity?: number;
  dy?: number;
  size?: number;
  children: ReactNode;
};

export function PitfallTag({
  x,
  center = false,
  y,
  strike,
  opacity = 1,
  dy = 0,
  size = 40,
  children,
}: PitfallProps) {
  if (opacity <= 0) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y + dy,
        transform: `translate(${center ? "-50%" : "0"}, -50%)`,
        padding: 24,
        border: `4px solid ${colors.pitfallBorder}`,
        borderRadius: 16,
        backgroundColor: colors.pitfallFill,
        fontFamily: FONT,
        fontSize: size,
        fontWeight: 400,
        lineHeight: 1.2,
        color: colors.pitfallText,
        opacity,
        whiteSpace: "nowrap",
      }}
    >
      <span style={{ position: "relative", display: "inline-block" }}>
        {children}
        <span
          style={{
            position: "absolute",
            left: 0,
            top: "50%",
            width: `${strike * 100}%`,
            height: 6,
            marginTop: -3,
            backgroundColor: colors.pitfallText,
          }}
        />
      </span>
    </div>
  );
}

export function Title({
  title,
  subtitle,
  color = colors.text,
  opacity = 1,
}: {
  title: string;
  subtitle?: string;
  color?: string;
  opacity?: number;
}) {
  return (
    <>
      <Text
        x={SAFE}
        y={180}
        size={type.title}
        weight={700}
        anchor="start"
        color={color}
        opacity={opacity}
      >
        {title}
      </Text>
      {subtitle ? (
        <Text
          x={SAFE}
          y={280}
          size={type.subtitle}
          anchor="start"
          color={colors.muted}
          opacity={opacity}
        >
          {subtitle}
        </Text>
      ) : null}
    </>
  );
}
