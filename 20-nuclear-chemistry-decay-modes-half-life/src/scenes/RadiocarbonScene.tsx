import type { ReactNode } from "react";
import { AbsoluteFill } from "remotion";
import { dropped } from "../components/anim";
import { useSceneFrame } from "../components/SceneFrame";
import { SceneTitle } from "../components/SceneTitle";
import { Sub, Sup } from "../components/Text";
import { cue } from "../cues";
import { colors, FONT } from "../theme";

const CUES = {
  cosmic: cue("radiocarbon-dating", "Cosmic rays constantly make carbon fourteen"),
  intake: cue("radiocarbon-dating", "Living things take it in"),
  death: cue("radiocarbon-dating", "but when they die, the intake stops"),
  given: cue("radiocarbon-dating", "Let's date a wooden artifact"),
  k: cue("radiocarbon-dating", "We find k"),
  equation: cue("radiocarbon-dating", "then use the first order equation"),
  answer: cue("radiocarbon-dating", "eight thousand six hundred eighty years"),
};

const FLOW_X = 340;
const FLOW_WIDTH = 420;
const FLOW = [
  {
    y: 330,
    at: CUES.cosmic,
    text: (
      <>
        Cosmic rays make <Sup>14</Sup>C
      </>
    ),
  },
  { y: 470, at: CUES.intake, text: "Intake by living things" },
  { y: 610, at: CUES.death, text: "Death: clock starts" },
] as const;

const COLUMNS = [600, 1200] as const;
const ROWS = [280, 540] as const;
const PANEL = { width: 560, height: 220 } as const;

const PANELS: {
  column: 0 | 1;
  row: 0 | 1;
  at: number;
  title: string;
  lines: ReactNode[];
}[] = [
  {
    column: 0,
    row: 0,
    at: CUES.given,
    title: "1. Given",
    lines: [
      <>
        N/N<Sub>0</Sub> = 0.350
      </>,
      <>
        t<Sub>1/2</Sub> = 5730 y
      </>,
    ],
  },
  {
    column: 1,
    row: 0,
    at: CUES.k,
    title: "2. Rate constant",
    lines: [
      "k = 0.693 / 5730 y",
      <>
        k = 1.21 × 10<Sup>−4</Sup> y<Sup>−1</Sup>
      </>,
    ],
  },
  {
    column: 0,
    row: 1,
    at: CUES.equation,
    title: "3. Equation",
    lines: [
      "ln(0.350) = −kt",
      <>
        −1.05 = −(1.21 × 10<Sup>−4</Sup> y<Sup>−1</Sup>) t
      </>,
    ],
  },
];

function Panel({
  left,
  top,
  at,
  title,
  highlight = false,
  children,
}: {
  left: number;
  top: number;
  at: number;
  title: string;
  highlight?: boolean;
  children: ReactNode;
}) {
  const { opacity, dy } = dropped(useSceneFrame(), at);
  if (opacity <= 0) return null;
  return (
    <div
      style={{
        position: "absolute",
        left,
        top: top + dy,
        width: PANEL.width,
        height: PANEL.height,
        boxSizing: "border-box",
        padding: "24px 36px",
        borderRadius: 16,
        background: highlight ? "#FFEDD5" : colors.box,
        border: highlight ? `3px solid ${colors.halfLife}` : undefined,
        fontFamily: FONT,
        color: colors.text,
        opacity,
      }}
    >
      <div style={{ fontSize: 32, fontWeight: 700, color: colors.muted }}>
        {title}
      </div>
      {children}
    </div>
  );
}

export function RadiocarbonScene() {
  const frame = useSceneFrame();
  return (
    <AbsoluteFill>
      <SceneTitle>Worked Example: Carbon-14</SceneTitle>
      {FLOW.map(({ y, at, text }, i) => {
        const { opacity, dy } = dropped(frame, at);
        if (opacity <= 0) return null;
        return (
          <div key={y}>
            {i > 0 ? (
              <svg
                width={40}
                height={50}
                viewBox="0 0 40 50"
                style={{
                  position: "absolute",
                  left: FLOW_X - 20,
                  top: y - 95,
                  opacity,
                }}
              >
                <path
                  d="M20 4 V40 M10 30 L20 44 L30 30"
                  stroke={colors.muted}
                  strokeWidth={4}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            ) : null}
            <div
              style={{
                position: "absolute",
                left: FLOW_X - FLOW_WIDTH / 2,
                top: y - 40 + dy,
                width: FLOW_WIDTH,
                height: 80,
                boxSizing: "border-box",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 40,
                border: `3px solid ${i === 2 ? colors.halfLife : colors.grid}`,
                background: colors.background,
                fontFamily: FONT,
                fontSize: 32,
                fontWeight: i === 2 ? 700 : 400,
                color: i === 2 ? colors.halfLifeText : colors.text,
                opacity,
              }}
            >
              {text}
            </div>
          </div>
        );
      })}
      {PANELS.map(({ column, row, at, title, lines }) => (
        <Panel
          key={title}
          left={COLUMNS[column]}
          top={ROWS[row]}
          at={at}
          title={title}
        >
          {lines.map((line, i) => (
            <div
              key={i}
              style={{ fontSize: 34, marginTop: 12, whiteSpace: "nowrap" }}
            >
              {line}
            </div>
          ))}
        </Panel>
      ))}
      <Panel
        left={COLUMNS[1]}
        top={ROWS[1]}
        at={CUES.answer}
        title="4. Solve"
        highlight
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            marginTop: 20,
            color: colors.halfLifeText,
          }}
        >
          t = 8680 y
        </div>
      </Panel>
    </AbsoluteFill>
  );
}
