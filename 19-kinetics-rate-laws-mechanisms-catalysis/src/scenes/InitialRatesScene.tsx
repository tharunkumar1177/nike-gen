import type { ReactNode } from "react";
import { AbsoluteFill } from "remotion";
import { dropped, fadeIn, lerp, progress } from "../components/anim";
import { PuzzleBox } from "../components/PuzzleBox";
import { useSceneFrame } from "../components/SceneFrame";
import { Arrow, Block, F, Sup } from "../components/Text";
import { contentTop } from "../components/TitleBand";
import { cue } from "../cues";
import { colors, FONT } from "../theme";

const SCENE = "initial-rates";
const AT = {
  puzzle: cue(SCENE, "Strangely, adding more C O does not speed"),
  table: cue(SCENE, "Let's test two N O plus"),
  chlorine: cue(SCENE, "Trial two has one point five times more C l two"),
  nitrogen: cue(SCENE, "Trial three has one point five times more N O"),
  law: cue(SCENE, "The rate equals k times"),
};

const TOP = contentTop(true) + 24;
const TABLE = { left: 152, row: 72, widths: [110, 170, 170, 330] } as const;
const PANEL_LEFT = 980;
const PANEL_WIDTH = 820;

const TRIALS = [
  ["1", "0.10", "0.10", "0.00300"],
  ["2", "0.10", "0.15", "0.00450"],
  ["3", "0.15", "0.10", "0.00675"],
] as const;

const HEADERS: ReactNode[] = [
  "Trial",
  "[NO] (M)",
  <>
    [<F>Cl2</F>] (M)
  </>,
  <>
    Rate (mol L<Sup>−1</Sup> s<Sup>−1</Sup>)
  </>,
];

/** Highlighted cells as [row, column] pairs for each comparison. */
const CHLORINE_CELLS = [
  [0, 2],
  [1, 2],
  [0, 3],
  [1, 3],
] as const;
const NITROGEN_CELLS = [
  [0, 1],
  [2, 1],
  [0, 3],
  [2, 3],
] as const;

const columnLeft = (column: number) =>
  TABLE.left + TABLE.widths.slice(0, column).reduce((sum, w) => sum + w, 0);

function Cell({
  row,
  column,
  children,
  weight = 400,
  color = colors.text,
  size = 40,
}: {
  row: number;
  column: number;
  children: ReactNode;
  weight?: 400 | 500 | 700;
  color?: string;
  size?: number;
}) {
  return (
    <div
      style={{
        position: "absolute",
        left: columnLeft(column),
        top: TOP + row * TABLE.row,
        width: TABLE.widths[column],
        height: TABLE.row,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: FONT,
        fontSize: size,
        fontWeight: weight,
        color,
      }}
    >
      {children}
    </div>
  );
}

function Highlight({
  cells,
  opacity,
}: {
  cells: readonly (readonly [number, number])[];
  opacity: number;
}) {
  if (opacity <= 0) return null;
  return (
    <>
      {cells.map(([row, column]) => (
        <div
          key={`${row}-${column}`}
          style={{
            position: "absolute",
            left: columnLeft(column) + 6,
            top: TOP + (row + 1) * TABLE.row + 6,
            width: (TABLE.widths[column] ?? 0) - 12,
            height: TABLE.row - 12,
            borderRadius: 10,
            background: colors.reactantFill,
            border: `3px solid ${colors.reactant}`,
            boxSizing: "border-box",
            opacity,
          }}
        />
      ))}
    </>
  );
}

export function InitialRatesScene() {
  const frame = useSceneFrame();
  const shrink = progress(frame, AT.table, AT.table + 30);
  const puzzleIn = dropped(frame, AT.puzzle);
  const table = dropped(frame, AT.table + 18);
  const chlorine =
    fadeIn(frame, AT.chlorine) * (1 - fadeIn(frame, AT.nitrogen));
  const nitrogen = fadeIn(frame, AT.nitrogen) * (1 - fadeIn(frame, AT.law));
  const tableWidth = TABLE.widths.reduce((sum, w) => sum + w, 0);
  return (
    <AbsoluteFill>
      <PuzzleBox
        left={152}
        top={lerp(TOP, 760, shrink)}
        width={760}
        size={40}
        opacity={puzzleIn.opacity * lerp(1, 0.55, shrink)}
        scale={lerp(1, 0.7, shrink)}
        dy={puzzleIn.dy}
      >
        adding more CO does not speed up <F>NO2</F> + CO.
      </PuzzleBox>
      <div
        style={{
          opacity: table.opacity,
          transform: `translateY(${table.dy}px)`,
        }}
      >
        <Highlight cells={CHLORINE_CELLS} opacity={chlorine} />
        <Highlight cells={NITROGEN_CELLS} opacity={nitrogen} />
        {HEADERS.map((header, column) => (
          <Cell key={column} row={0} column={column} weight={700} size={30}>
            {header}
          </Cell>
        ))}
        <div
          style={{
            position: "absolute",
            left: TABLE.left,
            top: TOP + TABLE.row - 1,
            width: tableWidth,
            height: 3,
            background: colors.text,
          }}
        />
        {TRIALS.map((trial, row) =>
          trial.map((value, column) => (
            <Cell key={`${row}-${column}`} row={row + 1} column={column}>
              {value}
            </Cell>
          )),
        )}
      </div>
      <Panel at={AT.chlorine} top={TOP}>
        <div style={{ fontWeight: 700, color: colors.reactant }}>
          <F>Cl2</F>: trial 2 / trial 1
        </div>
        <div>
          0.00450 / 0.00300 = 1.5 = 1.5<Sup>n</Sup>
          <Arrow />
          <b>n = 1</b>
        </div>
      </Panel>
      <Panel at={AT.nitrogen} top={TOP + 170}>
        <div style={{ fontWeight: 700, color: colors.reactant }}>
          NO: trial 3 / trial 1
        </div>
        <div>
          0.00675 / 0.00300 = 2.25 = 1.5<Sup>m</Sup>
          <Arrow />
          <b>m = 2</b>
        </div>
      </Panel>
      <Panel at={AT.law} top={TOP + 340}>
        <div style={{ fontSize: 56, fontWeight: 700 }}>
          rate = k[NO]<Sup>2</Sup>[<F>Cl2</F>]
        </div>
        <div style={{ fontSize: 32, marginTop: 16 }}>
          k = 0.00300 / ((0.10)<Sup>2</Sup>(0.10)) ={" "}
          <b>
            3.0 L<Sup>2</Sup> mol<Sup>−2</Sup> s<Sup>−1</Sup>
          </b>
        </div>
      </Panel>
    </AbsoluteFill>
  );
}

function Panel({
  at,
  top,
  children,
}: {
  at: number;
  top: number;
  children: ReactNode;
}) {
  const frame = useSceneFrame();
  const shown = dropped(frame, at);
  return (
    <Block
      left={PANEL_LEFT}
      top={top}
      width={PANEL_WIDTH}
      size={40}
      opacity={shown.opacity}
      dy={shown.dy}
    >
      {children}
    </Block>
  );
}