import type { ReactNode } from "react";
import { AbsoluteFill, useVideoConfig } from "remotion";
import { dropped, fadeIn, popped } from "../components/anim";
import { Reaction } from "../components/Reaction";
import { useSceneFrame } from "../components/SceneFrame";
import { F, Sub, Sup, Text } from "../components/Text";
import { cue } from "../cues";
import { CHANGE, EQ_N2O4, EQ_NO2, INITIAL_N2O4, KC } from "../equilibrium";
import { colors, HEADING_Y, SAFE, type } from "../theme";

const INITIAL_AT = cue("ice-table", "zero point zero five zero molar");
const MEASURED_AT = cue("ice-table", "zero point zero one six molar");
const CHANGE_AT = cue("ice-table", "fell by half that");
const LEFT_AT = cue("ice-table", "leaving zero point zero four two");
const K_AT = cue("ice-table", "six point one");

const COLUMNS = [200, 360, 820, 1280] as const;
const ROWS = { header: 300, initial: 400, change: 500, equilibrium: 600 };
const ROW_HEIGHT = 100;
const NOTE_X = 1360;

const ROW_LABELS = [
  ["I", ROWS.initial],
  ["C", ROWS.change],
  ["E", ROWS.equilibrium],
] as const;

const START = INITIAL_N2O4.toFixed(3);
const X = CHANGE.toFixed(3);
const NO2 = EQ_NO2.toFixed(3);
const N2O4 = EQ_N2O4.toFixed(3);
const K = (KC * 1000).toFixed(1);

type CellProps = {
  column: 1 | 2;
  y: number;
  color: string;
  reveal: { opacity?: number; scale?: number; dy?: number };
  children: ReactNode;
};

function Cell({ column, y, color, reveal, children }: CellProps) {
  const left = COLUMNS[column];
  const right = COLUMNS[column + 1];
  if (left === undefined || right === undefined) return null;
  return (
    <Text
      x={(left + right) / 2}
      y={y}
      size={type.body}
      weight={700}
      color={color}
      anchor="middle"
      {...reveal}
    >
      {children}
    </Text>
  );
}

export function IceScene() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();
  const table = fadeIn(frame, 15);
  const initial = popped(frame, fps, INITIAL_AT);
  const measured = popped(frame, fps, MEASURED_AT);
  const change = popped(frame, fps, CHANGE_AT);
  const left = popped(frame, fps, LEFT_AT);
  const top = ROWS.header - ROW_HEIGHT / 2;
  const bottom = ROWS.equilibrium + ROW_HEIGHT / 2;
  return (
    <AbsoluteFill>
      <Text
        x={SAFE}
        y={HEADING_Y}
        size={type.subtitle}
        weight={700}
        {...popped(frame, fps, 0)}
      >
        Worked Example: ICE Table
      </Text>
      <Reaction
        x={1800 - 220}
        y={HEADING_Y}
        size={type.body}
        {...popped(frame, fps, 10)}
      />
      <Text
        x={SAFE}
        y={225}
        size={type.label}
        color={colors.muted}
        {...dropped(frame, 20)}
      >
        {START} mol <F>N2O4</F> in 1.0 L, fixed temperature
      </Text>
      <svg
        width="100%"
        height="100%"
        style={{ position: "absolute", opacity: table }}
      >
        <rect
          x={COLUMNS[0]}
          y={top}
          width={COLUMNS[3] - COLUMNS[0]}
          height={ROW_HEIGHT}
          fill={colors.box}
        />
        {[top, top + ROW_HEIGHT, bottom].map((y) => (
          <line
            key={y}
            x1={COLUMNS[0]}
            x2={COLUMNS[3]}
            y1={y}
            y2={y}
            stroke={colors.muted}
            strokeWidth={3}
          />
        ))}
        {[ROWS.change, ROWS.equilibrium].map((y) => (
          <line
            key={y}
            x1={COLUMNS[0]}
            x2={COLUMNS[3]}
            y1={y - ROW_HEIGHT / 2}
            y2={y - ROW_HEIGHT / 2}
            stroke={colors.grid}
            strokeWidth={2}
          />
        ))}
        {COLUMNS.slice(1, 3).map((x) => (
          <line
            key={x}
            x1={x}
            x2={x}
            y1={top}
            y2={bottom}
            stroke={colors.grid}
            strokeWidth={2}
          />
        ))}
      </svg>
      {ROW_LABELS.map(([label, y]) => (
        <Text
          key={label}
          x={(COLUMNS[0] + COLUMNS[1]) / 2}
          y={y}
          size={type.body}
          weight={700}
          color={colors.muted}
          anchor="middle"
          opacity={table}
        >
          {label}
        </Text>
      ))}
      <Cell
        column={1}
        y={ROWS.header}
        color={colors.n2o4Text}
        reveal={{ opacity: table }}
      >
        [<F>N2O4</F>]
      </Cell>
      <Cell
        column={2}
        y={ROWS.header}
        color={colors.no2Text}
        reveal={{ opacity: table }}
      >
        [<F>NO2</F>]
      </Cell>
      <Cell column={1} y={ROWS.initial} color={colors.text} reveal={initial}>
        {START} M
      </Cell>
      <Cell column={2} y={ROWS.initial} color={colors.text} reveal={initial}>
        0 M
      </Cell>
      <Cell
        column={2}
        y={ROWS.equilibrium}
        color={colors.no2Text}
        reveal={measured}
      >
        {NO2} M
      </Cell>
      <Cell
        column={1}
        y={ROWS.change}
        color={colors.reverseText}
        reveal={change}
      >
        −x = −{X} M
      </Cell>
      <Cell
        column={2}
        y={ROWS.change}
        color={colors.forwardText}
        reveal={change}
      >
        +2x = +{NO2} M
      </Cell>
      <Cell
        column={1}
        y={ROWS.equilibrium}
        color={colors.n2o4Text}
        reveal={left}
      >
        {N2O4} M
      </Cell>
      <Text
        x={NOTE_X}
        y={ROWS.change}
        size={type.label}
        color={colors.muted}
        {...dropped(frame, CHANGE_AT + 10)}
      >
        2x = {NO2}, so x = {X}
      </Text>
      <Text
        x={NOTE_X}
        y={ROWS.equilibrium}
        size={type.label}
        color={colors.muted}
        {...dropped(frame, LEFT_AT + 10)}
      >
        {START} − {X} = {N2O4}
      </Text>
      <Text
        x={960}
        y={820}
        size={type.subtitle}
        weight={700}
        color={colors.kqText}
        anchor="middle"
        {...popped(frame, fps, K_AT)}
      >
        K<Sub>c</Sub> = ({NO2})<Sup>2</Sup> / {N2O4} = {K} × 10<Sup>−3</Sup>
      </Text>
    </AbsoluteFill>
  );
}
