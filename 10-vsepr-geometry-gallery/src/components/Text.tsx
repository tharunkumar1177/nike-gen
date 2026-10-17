import type { CSSProperties, ReactNode } from "react";
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
  /** Extra vertical offset in px, e.g. for slide-ins. */
  dy?: number;
  maxWidth?: number;
  align?: CSSProperties["textAlign"];
  /** Which horizontal edge `x` refers to. */
  anchor?: "start" | "middle" | "end";
  italic?: boolean;
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
  dy = 0,
  maxWidth,
  align,
  anchor = "middle",
  italic = false,
  children,
}: Props) {
  const textAlign =
    align ??
    (anchor === "start" ? "left" : anchor === "end" ? "right" : "center");
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y + dy,
        transform: `translate(${SHIFT[anchor]}, -50%) scale(${scale})`,
        transformOrigin: "center",
        fontFamily: FONT,
        fontSize: size,
        fontWeight: weight,
        fontStyle: italic ? "italic" : "normal",
        lineHeight: 1.2,
        color,
        opacity,
        textAlign,
        whiteSpace: maxWidth ? "normal" : "nowrap",
        width: maxWidth,
      }}
    >
      {children}
    </div>
  );
}
