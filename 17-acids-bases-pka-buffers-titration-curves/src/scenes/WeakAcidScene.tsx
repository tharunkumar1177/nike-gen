import type { ReactNode } from "react";
import { AbsoluteFill, useVideoConfig } from "remotion";
import { KA, WEAK } from "../acidbase";
import { dropped, fadeIn, popped } from "../components/anim";
import { useSceneFrame } from "../components/SceneFrame";
import { EqArrow, F, Frac, Sub, Sup, Text } from "../components/Text";
import { cue } from "../cues";
import { colors, HEADING_Y, SAFE, type } from "../theme";

const START_AT = cue("weak-acid-ice", "Let's find the p H");
const TABLE_AT = cue("weak-acid-ice", "Using an I C E table");
const SMALL_AT = cue("weak-acid-ice", "assuming x is small");
const X_AT = cue("weak-acid-ice", "is one point three four");
const PH_AT = cue("weak-acid-ice", "The p H is two point eight seven");

const LABEL_X = 170;
const COLUMNS = [400, 640, 860] as const;
const ROWS = { header: 340, initial: 450, change: 550, equilibrium: 650 };
const STEPS_X = 1040;

function Minus() {
  return <Sup>−</Sup>;
}

/** Mantissa and exponent of `value` in scientific notation. */
function scientific(value: number, digits: number) {
  const exponent = Math.floor(Math.log10(value));
  return { mantissa: (value / 10 ** exponent).toFixed(digits), exponent };
}

function Power({ value, digits }: { value: number; digits: number }) {
  const { mantissa, exponent } = scientific(value, digits);
  return (
    <>
      {mantissa} × 10<Sup>{`−${Math.abs(exponent)}`}</Sup>
    </>
  );
}

function Row({
  y,
  label,
  cells,
  reveal,
}: {
  y: number;
  label: string;
  cells: readonly ReactNode[];
  reveal: { opacity: number; dy?: number };
}) {
  return (
    <>
      <Text
        x={LABEL_X}
        y={y}
        size={type.body}
        weight={700}
        color={colors.muted}
        anchor="middle"
        {...reveal}
      >
        {label}
      </Text>
      {cells.map((cell, i) => (
        <Text
          key={i}
          x={COLUMNS[i] ?? 0}
          y={y}
          size={type.body}
          anchor="middle"
          {...reveal}
        >
          {cell}
        </Text>
      ))}
    </>
  );
}

export function WeakAcidScene() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();
  const start = fadeIn(frame, START_AT);
  const rows = dropped(frame, TABLE_AT);
  const c = WEAK.c.toFixed(3);
  const H3O = (
    <>
      <F>H3O</F>
      <Sup>+</Sup>
    </>
  );
  return (
    <AbsoluteFill>
      <Text
        x={SAFE}
        y={HEADING_Y}
        size={type.subtitle}
        weight={700}
        {...popped(frame, fps, 0)}
      >
        Worked Example: pH of {c} M Acetic Acid
      </Text>
      <Text
        x={SAFE}
        y={225}
        size={type.label}
        color={colors.muted}
        opacity={start}
      >
        <F>CH3COOH</F>, K<Sub>a</Sub> = <Power value={KA} digits={1} /> at 25 °C
      </Text>
      <svg
        width="100%"
        height="100%"
        style={{ position: "absolute", opacity: start }}
      >
        <rect
          x={SAFE}
          y={ROWS.header - 50}
          width={COLUMNS[2] + 120 - SAFE}
          height={100}
          fill={colors.box}
        />
      </svg>
      <Text
        x={COLUMNS[0]}
        y={ROWS.header}
        size={type.body}
        weight={700}
        color={colors.acidText}
        anchor="middle"
        opacity={start}
      >
        HA
      </Text>
      <Text
        x={(COLUMNS[0] + COLUMNS[1]) / 2}
        y={ROWS.header}
        size={type.body}
        anchor="middle"
        opacity={start}
      >
        <EqArrow />
      </Text>
      <Text
        x={COLUMNS[1]}
        y={ROWS.header}
        size={type.body}
        weight={700}
        color={colors.hydroniumText}
        anchor="middle"
        opacity={start}
      >
        {H3O}
      </Text>
      <Text
        x={(COLUMNS[1] + COLUMNS[2]) / 2}
        y={ROWS.header}
        size={type.body}
        anchor="middle"
        opacity={start}
      >
        +
      </Text>
      <Text
        x={COLUMNS[2]}
        y={ROWS.header}
        size={type.body}
        weight={700}
        color={colors.baseText}
        anchor="middle"
        opacity={start}
      >
        A<Minus />
      </Text>
      <Row
        y={ROWS.initial}
        label="I"
        cells={[c, "0", "0"]}
        reveal={{ opacity: start }}
      />
      <Row y={ROWS.change} label="C" cells={["−x", "+x", "+x"]} reveal={rows} />
      <Row
        y={ROWS.equilibrium}
        label="E"
        cells={[`${c} − x`, "x", "x"]}
        reveal={rows}
      />
      <Text
        x={STEPS_X}
        y={ROWS.initial}
        size={type.body}
        {...dropped(frame, SMALL_AT)}
      >
        <Frac
          num={
            <>
              x<Sup>2</Sup>
            </>
          }
          den={c}
        />{" "}
        = <Power value={KA} digits={1} />
      </Text>
      <Text
        x={STEPS_X}
        y={ROWS.change + 40}
        size={type.body}
        {...dropped(frame, X_AT)}
      >
        x = [{H3O}] = <Power value={WEAK.x} digits={2} /> M
      </Text>
      <Text
        x={STEPS_X}
        y={ROWS.change + 110}
        size={type.label}
        color={colors.muted}
        {...dropped(frame, X_AT + 20)}
      >
        5% check: {WEAK.percent.toFixed(2)}% of {c} M, so small x is valid
      </Text>
      <Text
        x={STEPS_X}
        y={800}
        size={type.subtitle}
        weight={700}
        color={colors.hydroniumText}
        {...popped(frame, fps, PH_AT)}
      >
        pH = {WEAK.pH.toFixed(2)}
      </Text>
    </AbsoluteFill>
  );
}
