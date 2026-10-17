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
  /** Vertical offset in px, for drop-ins. */
  dy?: number;
  /** Which horizontal edge `x` refers to. */
  anchor?: "start" | "middle" | "end";
  children: ReactNode;
};

const SHIFT = { start: "0%", middle: "-50%", end: "-100%" } as const;
const ORIGIN = { start: "left", middle: "center", end: "right" } as const;

export function Text({
  x,
  y,
  size,
  weight = 400,
  color = colors.text,
  opacity = 1,
  scale = 1,
  dy = 0,
  anchor = "start",
  children,
}: Props) {
  if (opacity <= 0) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
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

/** Renders a formula string, subscripting digits that follow an element symbol: "2 H2O" → 2 H₂O. */
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

/** Renders an equation string, subscripting the word after each underscore: "K_f" → K_f. */
export function Eq({ children }: { children: string }) {
  const parts: ReactNode[] = [];
  let last = 0;
  for (const match of children.matchAll(/_([A-Za-z]+)/g)) {
    const index = match.index ?? 0;
    parts.push(children.slice(last, index));
    parts.push(<Sub key={index}>{match[1]}</Sub>);
    last = index + match[0].length;
  }
  parts.push(children.slice(last));
  return <>{parts}</>;
}

/** Stacked fraction with a rule, sized from the surrounding font. */
export function Fraction({
  top,
  bottom,
}: {
  top: ReactNode;
  bottom: ReactNode;
}) {
  return (
    <span
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        verticalAlign: "middle",
        lineHeight: 1.1,
      }}
    >
      <span style={{ padding: "0 0.2em" }}>{top}</span>
      <span
        style={{
          padding: "0 0.2em",
          borderTop: "0.06em solid currentColor",
        }}
      >
        {bottom}
      </span>
    </span>
  );
}

/** Reaction arrow drawn inline, since the font subset has no arrow glyph. */
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

type BadgeProps = {
  color: string;
  textColor: string;
  size: number;
  children: ReactNode;
};

/** Pill label with a tinted fill so dark text keeps its contrast. */
export function Badge({ color, textColor, size, children }: BadgeProps) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "0.1em 0.5em",
        borderRadius: 999,
        border: `4px solid ${color}`,
        background: `${color}40`,
        color: textColor,
        fontSize: size,
        fontWeight: 700,
      }}
    >
      {children}
    </span>
  );
}
