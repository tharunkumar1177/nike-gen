import type { ReactNode } from "react";
import { colors, FONT, type } from "../theme";

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

/** Scene heading, centred at the top of the frame. */
export function Title({
  opacity,
  children,
}: {
  opacity: number;
  children: ReactNode;
}) {
  return (
    <Text
      x={960}
      y={180}
      size={type.title}
      weight={700}
      anchor="middle"
      opacity={opacity}
    >
      {children}
    </Text>
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
