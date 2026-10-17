import type { ReactNode } from "react";
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
  /** Horizontal offset in px, for slide-ins. */
  dx?: number;
  /** Vertical offset in px, for drop-ins. */
  dy?: number;
  /** Which horizontal edge `x` refers to. */
  anchor?: "start" | "middle" | "end";
  children: ReactNode;
};

const SHIFT = { start: "0%", middle: "-50%", end: "-100%" } as const;
const ORIGIN = { start: "left", middle: "center", end: "right" } as const;

/** Single line of text centred vertically on `y`. */
export function Text({
  x,
  y,
  size,
  weight = 400,
  color = colors.text,
  opacity = 1,
  scale = 1,
  dx = 0,
  dy = 0,
  anchor = "start",
  children,
}: Props) {
  if (opacity <= 0) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: x + dx,
        top: y + dy,
        transform: `translate(${SHIFT[anchor]}, -50%) scale(${scale})`,
        transformOrigin: ORIGIN[anchor],
        fontFamily: FONT,
        fontSize: size,
        fontWeight: weight,
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

type BlockProps = {
  left: number;
  top: number;
  width: number;
  size: number;
  weight?: 400 | 500 | 700;
  color?: string;
  opacity?: number;
  dx?: number;
  dy?: number;
  children: ReactNode;
};

/** Wrapping paragraph anchored at its top-left corner. */
export function Block({
  left,
  top,
  width,
  size,
  weight = 400,
  color = colors.text,
  opacity = 1,
  dx = 0,
  dy = 0,
  children,
}: BlockProps) {
  if (opacity <= 0) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: left + dx,
        top: top + dy,
        width,
        fontFamily: FONT,
        fontSize: size,
        fontWeight: weight,
        lineHeight: 1.3,
        color,
        opacity,
      }}
    >
      {children}
    </div>
  );
}

const SCRIPT_STYLE = { fontSize: "0.65em", lineHeight: 0 } as const;

export function Sub({ children }: { children: ReactNode }) {
  return (
    <span style={{ ...SCRIPT_STYLE, verticalAlign: "-0.25em" }}>
      {children}
    </span>
  );
}

export function Sup({ children }: { children: ReactNode }) {
  return (
    <span style={{ ...SCRIPT_STYLE, verticalAlign: "0.55em" }}>{children}</span>
  );
}

/** Renders a formula string, subscripting digits that follow an element symbol: "2 NO2" → 2 NO₂. */
export function F({ children }: { children: string }) {
  const parts: ReactNode[] = [];
  let last = 0;
  for (const match of children.matchAll(/\d+/g)) {
    const index = match.index ?? 0;
    const before = children[index - 1];
    if (before === undefined || !/[A-Za-z)]/.test(before)) continue;
    parts.push(children.slice(last, index));
    parts.push(<Sub key={index}>{match[0]}</Sub>);
    last = index + match[0].length;
  }
  parts.push(children.slice(last));
  return <>{parts}</>;
}

/** "Ea" with a subscript a. */
export function Ea() {
  return (
    <>
      E<Sub>a</Sub>
    </>
  );
}

/** Single right arrow drawn inline, since the font subsets have no arrow glyphs. */
export function Arrow() {
  return (
    <svg
      width="1.1em"
      height="0.6em"
      viewBox="0 0 22 12"
      style={{ verticalAlign: "middle", margin: "0 0.3em" }}
    >
      <path
        d="M1 6 H19 M14 1.5 L20 6 L14 10.5"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
