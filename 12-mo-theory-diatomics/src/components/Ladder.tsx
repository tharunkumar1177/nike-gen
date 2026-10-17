import type { ReactNode } from "react";
import { colors, type } from "../theme";
import { Dashed, Level, Stage } from "./Diagram";
import { MoLabel } from "./Script";
import { Text } from "./Text";

export type Mo = {
  letter: "σ" | "π";
  star?: boolean;
  shell: "2s" | "2p";
  y: number;
};

const AO_SPACING = 80;
const PI_SPACING = 40;
const HALF = 30;

/** Centres of the level lines that make up one MO. */
export function moLines(mid: number, mo: Mo) {
  return mo.letter === "π" ? [mid - PI_SPACING, mid + PI_SPACING] : [mid];
}

/** Electron x on line `line` of an MO; up spins sit left of the line centre. */
export function electronX(
  mid: number,
  mo: Mo,
  line: number,
  dir: "up" | "down",
) {
  const centres = moLines(mid, mo);
  const centre = centres[line] ?? mid;
  return centre + (dir === "up" ? -8 : 8);
}

type Props = {
  /** x of the left AO column, the MO column and the right AO column. */
  left: number;
  mid: number;
  right: number;
  /** y of the 2s and 2p atomic levels. */
  ao: { s: number; p: number };
  mos: readonly Mo[];
  shown?: number;
  /** Left edge of the MO labels. */
  labelX: number;
  /** Electrons and other marks drawn above the ladder. */
  children?: ReactNode;
};

export function Ladder({
  left,
  mid,
  right,
  ao,
  mos,
  shown = 1,
  labelX,
  children,
}: Props) {
  if (shown <= 0) return null;
  const spread = (shell: Mo["shell"]) =>
    shell === "2s" ? HALF : AO_SPACING + HALF;
  return (
    <>
      <Stage opacity={shown}>
        {[left, right].map((x) => (
          <g key={x}>
            <Level cx={x} y={ao.s} />
            {[-AO_SPACING, 0, AO_SPACING].map((dx) => (
              <Level key={dx} cx={x + dx} y={ao.p} />
            ))}
          </g>
        ))}
        {mos.map((mo) => {
          const lines = moLines(mid, mo);
          const aoY = mo.shell === "2s" ? ao.s : ao.p;
          const first = lines[0] ?? mid;
          const last = lines[lines.length - 1] ?? mid;
          const color = mo.star ? colors.antibonding : colors.bonding;
          return (
            <g key={`${mo.letter}${mo.star ? "*" : ""}${mo.shell}`}>
              <Dashed
                x1={left + spread(mo.shell)}
                y1={aoY}
                x2={first - HALF}
                y2={mo.y}
              />
              <Dashed
                x1={right - spread(mo.shell)}
                y1={aoY}
                x2={last + HALF}
                y2={mo.y}
              />
              {lines.map((cx) => (
                <Level key={cx} cx={cx} y={mo.y} color={color} />
              ))}
            </g>
          );
        })}
        {children}
      </Stage>
      {[left, right].map((x) => (
        <div key={x} style={{ opacity: shown }}>
          <Text x={x} y={ao.s + 34} size={type.label} weight={500}>
            2s
          </Text>
          <Text x={x} y={ao.p + 34} size={type.label} weight={500}>
            2p
          </Text>
        </div>
      ))}
      {mos.map((mo) => (
        <Text
          key={`${mo.letter}${mo.star ? "*" : ""}${mo.shell}`}
          x={labelX}
          y={mo.y}
          size={type.label}
          weight={500}
          color={mo.letter === "σ" ? colors.sigmaText : colors.piText}
          anchor="start"
          opacity={shown}
        >
          <MoLabel letter={mo.letter} star={mo.star} shell={mo.shell} />
        </Text>
      ))}
    </>
  );
}
