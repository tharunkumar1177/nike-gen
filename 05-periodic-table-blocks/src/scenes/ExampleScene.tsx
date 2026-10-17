import type { ReactNode } from "react";
import { AbsoluteFill } from "remotion";
import {
  easeInOut,
  easeOut,
  fadeIn,
  lerp,
  progress,
} from "../components/anim";
import {
  baseline,
  CELL,
  cellAt,
  PeriodicTable,
} from "../components/PeriodicTable";
import { useSceneFrame } from "../components/SceneFrame";
import { Text } from "../components/Text";
import { cue } from "../cues";
import { element } from "../elements";
import { blockColors, colors, type, type Block } from "../theme";

type Term = { text: string; block: Block | "core" };

export type Example = {
  scene: "example-phosphorus" | "example-vanadium";
  title: string;
  target: string;
  core: string;
  /** Cells crossed in the s subshell, then in the next subshell. */
  sCells: string[];
  nextCells: string[];
  nextBlock: Block;
  steps: [ReactNode, ReactNode, ReactNode, ReactNode];
  /** Result terms in filling order; `swap` reorders the last two into written order. */
  result: [Term, Term, Term];
  swap?: string;
  cues: {
    locate: string;
    core: string;
    sPath: string;
    sStep: string;
    nextPath: string;
    nextStep: string;
    result: string;
  };
  /** Scene 5 shifts the table at its start; scene 6 begins shifted. */
  shiftIn: boolean;
};

const PANEL_X = 1200;
const STEP_BASELINES = [380, 460, 540, 620] as const;
const RESULT_LABEL = 690;
const RESULT = 750;
const SLOT = 120;
const S_DRAW = 15;
const NEXT_DRAW = 20;

const termColor = (block: Term["block"]) =>
  block === "core" ? colors.axis : blockColors[block].text;

export function Colored({
  block,
  children,
}: {
  block: Block;
  children: string;
}) {
  return <span style={{ color: blockColors[block].text }}>{children}</span>;
}

export function ExampleScene({ example }: { example: Example }) {
  const frame = useSceneFrame();
  const at = (phrase: string) => cue(example.scene, phrase);
  const c = {
    locate: at(example.cues.locate),
    core: at(example.cues.core),
    sPath: at(example.cues.sPath),
    sStep: at(example.cues.sStep),
    nextPath: at(example.cues.nextPath),
    nextStep: at(example.cues.nextStep),
    result: at(example.cues.result),
  };
  const swapAt = example.swap ? at(example.swap) : null;
  const shift = example.shiftIn ? progress(frame, 0, 30, easeInOut) : 1;
  const titleIn = example.shiftIn ? fadeIn(frame, 15) : 1;

  const counted = new Map<string, { n: number; at: number; block: Block }>();
  const track = (cells: string[], start: number, draw: number, block: Block) =>
    cells.forEach((symbol, i) =>
      counted.set(symbol, {
        n: i + 1,
        at: start + (draw * (i + 0.5)) / cells.length,
        block,
      }),
    );
  track(example.sCells, c.sPath, S_DRAW, "s");
  track(example.nextCells, c.nextPath, NEXT_DRAW, example.nextBlock);

  const swap =
    swapAt === null ? 0 : progress(frame, swapAt, swapAt + 30, easeInOut);
  const [core, first, second] = example.result;
  const resultIn = fadeIn(frame, c.result);

  return (
    <AbsoluteFill>
      <PeriodicTable
        look={(el) => {
          const count = counted.get(el.symbol);
          let highlight = 0;
          if (el.symbol === example.target) highlight = fadeIn(frame, c.locate);
          if (el.symbol === example.core) highlight = fadeIn(frame, c.core);
          return {
            color: 1,
            highlight,
            badge: count && {
              text: String(count.n),
              color: blockColors[count.block].text,
              opacity: progress(frame, count.at, count.at + 6),
            },
          };
        }}
        periodLabels={1}
        groupLabels={1}
        axisTitles={1 - shift}
        shift={shift}
      >
        <Underline
          cells={example.sCells}
          block="s"
          drawn={progress(frame, c.sPath, c.sPath + S_DRAW)}
        />
        <Underline
          cells={example.nextCells}
          block={example.nextBlock}
          drawn={progress(frame, c.nextPath, c.nextPath + NEXT_DRAW)}
        />
      </PeriodicTable>
      <Text
        x={PANEL_X}
        y={baseline(300, type.body)}
        size={type.body}
        weight={500}
        anchor="start"
        opacity={titleIn}
      >
        {example.title}
      </Text>
      {example.steps.map((step, i) => (
        <Text
          key={i}
          x={PANEL_X}
          y={baseline(STEP_BASELINES[i] ?? 0, type.label)}
          size={type.label}
          anchor="start"
          opacity={fadeIn(
            frame,
            [c.locate, c.core, c.sStep, c.nextStep][i] ?? 0,
          )}
        >
          {step}
        </Text>
      ))}
      <Text
        x={PANEL_X}
        y={baseline(RESULT_LABEL, type.label)}
        size={type.label}
        anchor="start"
        opacity={resultIn}
      >
        5. Result
      </Text>
      <ResultTerm term={core} x={PANEL_X} lift={0} shown={resultIn} />
      <ResultTerm
        term={first}
        x={PANEL_X + lerp(SLOT, 2 * SLOT, swap)}
        lift={-40 * Math.sin(Math.PI * swap)}
        shown={resultIn}
      />
      <ResultTerm
        term={second}
        x={PANEL_X + lerp(2 * SLOT, SLOT, swap)}
        lift={40 * Math.sin(Math.PI * swap)}
        shown={resultIn}
      />
    </AbsoluteFill>
  );
}

function ResultTerm({
  term,
  x,
  lift,
  shown,
}: {
  term: Term;
  x: number;
  lift: number;
  shown: number;
}) {
  return (
    <Text
      x={x}
      y={baseline(RESULT, type.body) + lift + lerp(12, 0, easeOut(shown))}
      size={type.body}
      weight={500}
      color={termColor(term.block)}
      anchor="start"
      opacity={shown}
    >
      {term.text}
    </Text>
  );
}

/** Drawn in the 4 px gap under the row so it never covers a symbol. */
function Underline({
  cells,
  block,
  drawn,
}: {
  cells: string[];
  block: Block;
  drawn: number;
}) {
  const first = cells[0];
  const last = cells[cells.length - 1];
  if (!first || !last || drawn <= 0) return null;
  const start = cellAt(element(first));
  const end = cellAt(element(last));
  const width = end.x + CELL - start.x;
  return (
    <div
      style={{
        position: "absolute",
        left: start.x,
        top: start.y + CELL,
        width: width * drawn,
        height: 4,
        borderRadius: 2,
        background: blockColors[block].text,
      }}
    />
  );
}
