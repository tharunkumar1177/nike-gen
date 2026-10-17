import type { CSSProperties, ReactNode } from "react";
import {
  colors,
  FONT,
  SUBTITLE_BOTTOM,
  SUBTITLE_TOP,
  TITLE,
  TITLE_BOTTOM,
  type,
  VIDEO,
} from "../theme";
import { Text } from "./Text";

/** Bold scene title at the top-left, per `wireframe.svg`. */
export function Title({
  children,
  opacity = 1,
}: {
  children: ReactNode;
  opacity?: number;
}) {
  return (
    <Text
      x={TITLE.left}
      y={(TITLE.top + TITLE_BOTTOM) / 2}
      size={type.title}
      weight={700}
      anchor="start"
      opacity={opacity}
    >
      {children}
    </Text>
  );
}

/** Muted subtitle directly under the title, sharing its left edge. */
export function Subtitle({
  children,
  opacity = 1,
}: {
  children: ReactNode;
  opacity?: number;
}) {
  return (
    <Text
      x={TITLE.left}
      y={(SUBTITLE_TOP + SUBTITLE_BOTTOM) / 2}
      size={type.subtitle}
      color={colors.muted}
      anchor="start"
      opacity={opacity}
    >
      {children}
    </Text>
  );
}

/** Full-frame SVG layer for diagrams. */
export function Stage({
  children,
  opacity = 1,
}: {
  children: ReactNode;
  opacity?: number;
}) {
  if (opacity <= 0) return null;
  return (
    <svg
      width={VIDEO.width}
      height={VIDEO.height}
      viewBox={`0 0 ${VIDEO.width} ${VIDEO.height}`}
      style={{ position: "absolute", left: 0, top: 0, opacity }}
    >
      {children}
    </svg>
  );
}

/** Rounded box positioned by its top-left corner. */
export function Box({
  x,
  y,
  width,
  height,
  border,
  background = colors.background,
  opacity = 1,
  rise = 0,
  style,
  children,
}: {
  x: number;
  y: number;
  width: number;
  height?: number;
  border: string;
  background?: string;
  opacity?: number;
  /** Vertical offset in px (for rise-in motion). */
  rise?: number;
  style?: CSSProperties;
  children: ReactNode;
}) {
  if (opacity <= 0) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width,
        height,
        boxSizing: "border-box",
        border: `3px solid ${border}`,
        borderRadius: 16,
        background,
        fontFamily: FONT,
        color: colors.text,
        opacity,
        transform: `translateY(${rise}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
