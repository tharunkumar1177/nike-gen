import type { CSSProperties, ReactNode } from "react";
import { colors, FONT, type } from "../theme";

type CardProps = {
  cx: number;
  cy: number;
  width: number;
  height?: number;
  opacity?: number;
  scale?: number;
  /** Colour of the top accent bar; none if omitted. */
  accent?: string;
  align?: CSSProperties["alignItems"];
  gap?: number;
  padding?: number;
  children: ReactNode;
};

/** Rounded panel centred on (cx, cy) whose children stack vertically. */
export function Card({
  cx,
  cy,
  width,
  height,
  opacity = 1,
  scale = 1,
  accent,
  align = "center",
  gap = 16,
  padding = 40,
  children,
}: CardProps) {
  if (opacity <= 0) {
    return null;
  }
  return (
    <div
      style={{
        position: "absolute",
        left: cx,
        top: cy,
        width,
        height,
        transform: `translate(-50%, -50%) scale(${scale})`,
        boxSizing: "border-box",
        padding,
        paddingTop: accent ? padding + 8 : padding,
        borderRadius: 24,
        background: colors.card,
        border: `2px solid ${accent ?? colors.cardBorder}`,
        borderTop: accent ? `12px solid ${accent}` : undefined,
        opacity,
        display: "flex",
        flexDirection: "column",
        alignItems: align,
        justifyContent: "center",
        gap,
        fontFamily: FONT,
        color: colors.text,
      }}
    >
      {children}
    </div>
  );
}

type LineProps = {
  size?: number;
  weight?: 400 | 500 | 700;
  color?: string;
  opacity?: number;
  /** Extra vertical offset in px, for slide-ins. */
  dy?: number;
  children: ReactNode;
};

/** A text line inside a `Card`. */
export function Line({
  size = type.body,
  weight = 400,
  color = colors.text,
  opacity = 1,
  dy = 0,
  children,
}: LineProps) {
  return (
    <div
      style={{
        fontSize: size,
        fontWeight: weight,
        color,
        opacity,
        lineHeight: 1.2,
        whiteSpace: "nowrap",
        transform: `translateY(${dy}px)`,
      }}
    >
      {children}
    </div>
  );
}

type PillProps = {
  x: number;
  y: number;
  color: string;
  textColor?: string;
  size?: number;
  opacity?: number;
  scale?: number;
  children: ReactNode;
};

/** Small filled tag centred on (x, y). */
export function Pill({
  x,
  y,
  color,
  textColor = "#FFFFFF",
  size = type.label,
  opacity = 1,
  scale = 1,
  children,
}: PillProps) {
  if (opacity <= 0) {
    return null;
  }
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `translate(-50%, -50%) scale(${scale})`,
        padding: "6px 18px",
        borderRadius: 999,
        background: color,
        color: textColor,
        fontFamily: FONT,
        fontWeight: 500,
        fontSize: size,
        lineHeight: 1.2,
        whiteSpace: "nowrap",
        opacity,
      }}
    >
      {children}
    </div>
  );
}

/** Text with a strike line drawn across it as `strike` goes 0→1. */
export function Struck({
  strike,
  color,
  children,
}: {
  strike: number;
  color: string;
  children: ReactNode;
}) {
  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      {children}
      <span
        style={{
          position: "absolute",
          left: -6,
          top: "52%",
          height: 6,
          width: `calc(${strike * 100}% + ${strike * 12}px)`,
          background: color,
          borderRadius: 3,
        }}
      />
    </span>
  );
}
