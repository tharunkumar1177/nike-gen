import type { ReactNode } from "react";
import { AbsoluteFill, useVideoConfig } from "remotion";
import { dropped, fadeIn, popped, progress } from "../components/anim";
import { Canvas, Stroke } from "../components/Draw";
import { PuzzleBox } from "../components/PuzzleBox";
import { useSceneFrame } from "../components/SceneFrame";
import { Arrow, F, Sub, Sup, Text } from "../components/Text";
import { contentTop } from "../components/TitleBand";
import { cue } from "../cues";
import { colors, type } from "../theme";

const SCENE = "reaction-mechanisms";
const AT = {
  chute: cue(SCENE, "Like cattle moving through a chute"),
  steps: cue(SCENE, "reactions happen in simple elementary steps"),
  mystery: cue(SCENE, "Remember our mystery"),
  slow: cue(SCENE, "the slow step is two N O two"),
  fast: cue(SCENE, "C O only appears in the fast second step"),
  solved: cue(SCENE, "That is why adding C O cannot speed it up"),
  intermediate: cue(SCENE, "N O three is an intermediate"),
};

const TOP = contentTop(true);
const RIGHT = 900;

const FUNNEL = {
  centre: 450,
  top: TOP + 60,
  neck: 720,
  exit: 820,
  mouth: 200,
  neckHalf: 40,
} as const;
const DOT = 15;
const PERIOD = 16;
const EXIT_SLOTS = 3;

const funnelHalf = (y: number) =>
  FUNNEL.neckHalf +
  ((FUNNEL.mouth - FUNNEL.neckHalf) * (FUNNEL.neck - y)) /
    (FUNNEL.neck - FUNNEL.top);

/** Queue positions from the neck upward, filling each row of the funnel. */
const SLOTS: [number, number][] = (() => {
  const slots: [number, number][] = [[FUNNEL.centre, FUNNEL.neck]];
  for (let y = FUNNEL.neck - 40; y > FUNNEL.top + 30; y -= 40) {
    const count = Math.floor((2 * (funnelHalf(y) - 12)) / 40);
    const width = (count - 1) * 40;
    for (let i = 0; i < count; i += 1) {
      slots.push([FUNNEL.centre - width / 2 + i * 40, y]);
    }
  }
  return slots;
})();
const QUEUE = SLOTS.length + EXIT_SLOTS;

function Dots({ frame }: { frame: number }) {
  const t = Math.max(0, frame - AT.chute);
  return (
    <>
      {Array.from({ length: QUEUE }, (_, i) => {
        const raw = (((i - t / PERIOD) % QUEUE) + QUEUE) % QUEUE;
        const q = raw - EXIT_SLOTS;
        if (q < 0) {
          const out = -q / EXIT_SLOTS;
          return (
            <circle
              key={i}
              cx={FUNNEL.centre}
              cy={FUNNEL.neck + out * (FUNNEL.exit - FUNNEL.neck + 40)}
              r={DOT}
              fill={colors.product}
              opacity={1 - out}
            />
          );
        }
        const low = SLOTS[Math.floor(q)] ?? SLOTS[0]!;
        const high = SLOTS[Math.ceil(q)] ?? low;
        const f = q - Math.floor(q);
        const fadeTop = Math.min(1, SLOTS.length - 1 - q + 1);
        return (
          <circle
            key={i}
            cx={low[0] + (high[0] - low[0]) * f}
            cy={low[1] + (high[1] - low[1]) * f}
            r={DOT}
            fill={colors.reactant}
            opacity={Math.max(0, fadeTop)}
          />
        );
      })}
    </>
  );
}

const FUNNEL_PATH = [
  `M${FUNNEL.centre - FUNNEL.mouth} ${FUNNEL.top} L${FUNNEL.centre - FUNNEL.neckHalf} ${FUNNEL.neck} V${FUNNEL.exit}`,
  `M${FUNNEL.centre + FUNNEL.mouth} ${FUNNEL.top} L${FUNNEL.centre + FUNNEL.neckHalf} ${FUNNEL.neck} V${FUNNEL.exit}`,
];

function Line({
  y,
  size,
  at,
  children,
}: {
  y: number;
  size: number;
  at: number;
  children: ReactNode;
}) {
  const frame = useSceneFrame();
  return (
    <Text x={RIGHT} y={y} size={size} {...dropped(frame, at)}>
      {children}
    </Text>
  );
}

export function MechanismScene() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();
  const chute = fadeIn(frame, AT.chute);
  const outline = progress(frame, AT.chute, AT.chute + 30);
  const puzzle = popped(frame, fps, AT.mystery);
  const solved = fadeIn(frame, AT.solved);
  const tick = progress(frame, AT.solved, AT.solved + 20);
  const inter = fadeIn(frame, AT.intermediate);
  const no3 = (
    <span
      style={{
        color: inter > 0.5 ? colors.intermediate : undefined,
        fontWeight: inter > 0.5 ? 700 : undefined,
      }}
    >
      <F>NO3</F>
    </span>
  );
  const co = (
    <span
      style={{
        padding: "0 8px",
        borderRadius: 999,
        border: `4px solid ${solved > 0 ? colors.product : "transparent"}`,
      }}
    >
      CO
    </span>
  );
  return (
    <AbsoluteFill>
      <Canvas opacity={chute}>
        {FUNNEL_PATH.map((d) => (
          <Stroke key={d} d={d} color={colors.text} width={5} drawn={outline} />
        ))}
        <Dots frame={frame} />
      </Canvas>
      <Text
        x={FUNNEL.centre}
        y={FUNNEL.exit + 60}
        size={36}
        weight={500}
        anchor="middle"
        opacity={chute}
      >
        slow step sets the pace
      </Text>
      <Line y={TOP + 40} size={type.body} at={AT.steps}>
        <b>Overall:</b> <F>NO2</F> + CO
        <Arrow />
        NO + <F>CO2</F>
      </Line>
      <PuzzleBox
        left={RIGHT}
        top={TOP + 90}
        width={900}
        size={30}
        opacity={puzzle.opacity}
        scale={puzzle.scale}
      >
        adding more CO does not speed up <F>NO2</F> + CO.
        <div
          style={{
            opacity: solved,
            color: colors.product,
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <svg width={34} height={30} viewBox="0 0 34 30">
            <Stroke
              d="M3 16 L13 26 L31 4"
              color={colors.product}
              width={5}
              drawn={tick}
            />
          </svg>
          Solved: CO enters only after the slow step.
        </div>
      </PuzzleBox>
      <Line y={TOP + 300} size={40} at={AT.slow}>
        <b>Step 1 (slow):</b> <F>NO2</F> + <F>NO2</F>
        <Arrow />
        {no3} + NO
      </Line>
      <Line y={TOP + 355} size={type.small} at={AT.slow + 20}>
        predicted: rate = k<Sub>1</Sub>[<F>NO2</F>]<Sup>2</Sup>
      </Line>
      <Line y={TOP + 395} size={type.small} at={AT.slow + 40}>
        observed: rate = k[<F>NO2</F>]<Sup>2</Sup>{" "}
        <b style={{ color: colors.product }}>match</b>
      </Line>
      <Line y={TOP + 470} size={40} at={AT.fast}>
        <b>Step 2 (fast):</b> {no3} + {co}
        <Arrow />
        <F>NO2</F> + <F>CO2</F>
      </Line>
      <Text
        x={RIGHT}
        y={TOP + 545}
        size={type.small}
        weight={500}
        color={colors.intermediate}
        opacity={inter}
      >
        intermediate: made in step 1, used up in step 2
      </Text>
    </AbsoluteFill>
  );
}
