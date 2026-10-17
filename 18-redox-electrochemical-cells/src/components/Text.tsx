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

const STROKE = {
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  fill: "none",
} as const;

/** Single arrow drawn inline, since the font subset has no arrow glyphs. */
export function Arrow({ left = false }: { left?: boolean }) {
  return (
    <svg
      width="1.1em"
      height="0.6em"
      viewBox="0 0 22 12"
      style={{
        verticalAlign: "middle",
        margin: "0 0.3em",
        transform: left ? "scaleX(-1)" : undefined,
      }}
    >
      <path d="M1 6 H19 M14 1.5 L20 6 L14 10.5" {...STROKE} />
    </svg>
  );
}

/** Approximately-equal sign (≈), which the font subset lacks. */
export function Approx() {
  return (
    <svg
      width="0.8em"
      height="0.6em"
      viewBox="0 0 16 12"
      style={{ verticalAlign: "middle", margin: "0 0.25em" }}
    >
      <path d="M1 4 Q4.5 1 8 4 T15 4 M1 9 Q4.5 6 8 9 T15 9" {...STROKE} />
    </svg>
  );
}

/** Double vertical bar (‖) marking the salt bridge in cell notation. */
export function Bridge() {
  return (
    <svg
      width="0.5em"
      height="1em"
      viewBox="0 0 10 20"
      style={{ verticalAlign: "middle", margin: "0 0.3em" }}
    >
      <path d="M3 1 V19 M7 1 V19" {...STROKE} />
    </svg>
  );
}

/** Formula with a superscript charge: <Ion f="MnO4" c="−" /> → MnO₄⁻. */
export function Ion({ f, c }: { f: string; c: string }) {
  return (
    <>
      <F>{f}</F>
      <Sup>{c}</Sup>
    </>
  );
}

/** Electron symbol e⁻. */
export function Electron() {
  return (
    <>
      e<Sup>−</Sup>
    </>
  );
}

/** Stacked fraction with a rule, aligned to the surrounding text. */
export function Frac({ num, den }: { num: ReactNode; den: ReactNode }) {
  return (
    <span
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        verticalAlign: "middle",
        margin: "0 0.2em",
      }}
    >
      <span style={{ padding: "0 0.15em 0.08em" }}>{num}</span>
      <span
        style={{
          alignSelf: "stretch",
          borderTop: "0.06em solid currentColor",
        }}
      />
      <span style={{ padding: "0.08em 0.15em 0" }}>{den}</span>
    </span>
  );
}
