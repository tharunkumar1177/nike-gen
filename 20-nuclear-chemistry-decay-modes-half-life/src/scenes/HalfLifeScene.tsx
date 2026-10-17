import { AbsoluteFill, interpolate } from "remotion";
import { fadeIn, progress } from "../components/anim";
import { DecayGraph, graphX } from "../components/DecayGraph";
import { Pitfall } from "../components/Pitfall";
import { useSceneFrame } from "../components/SceneFrame";
import { SceneTitle } from "../components/SceneTitle";
import { Sub, Sup, Text } from "../components/Text";
import { cue } from "../cues";
import { colors } from "../theme";

const SINGLE = { x: 960, y: 600, r: 80 } as const;
const GRID = { x: 250, y: 400, columns: 10, rows: 10, spacing: 50, r: 15 };
const CURVE_FRAMES = 150;
const linear = (t: number) => t;

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const random = mulberry32(20);
/** Decay time of each nucleus in half-lives, drawn from the exponential distribution. */
const DECAY_TIMES = Array.from(
  { length: GRID.columns * GRID.rows },
  () => -Math.log2(1 - random()),
);

const CUES = {
  single: cue("half-life-concept", "If you watch a single unstable nucleus"),
  pop: cue("half-life-concept", "predict when it will pop"),
  crowd: cue("half-life-concept", "but a large crowd decays"),
  half: cue("half-life-concept", "The time for half the nuclei to decay"),
  uranium: cue("half-life-concept", "four point five times ten to the nine"),
  pitfall: cue("half-life-concept", "Heat, pressure, and amount do not change this"),
};

export function HalfLifeScene() {
  const frame = useSceneFrame();
  const single =
    fadeIn(frame, CUES.single) * (1 - fadeIn(frame, CUES.crowd - 10));
  const flicker = interpolate(
    frame,
    [CUES.pop + 10, CUES.pop + 13, CUES.pop + 16],
    [1, 0.5, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const singleDecayed = frame >= CUES.pop + 13;
  const crowd = fadeIn(frame, CUES.crowd);
  const curve = progress(frame, CUES.half, CUES.half + CURVE_FRAMES, linear);
  const elapsed = curve * 4;
  const remaining = DECAY_TIMES.filter((t) => t > elapsed).length;
  const markerStart = CUES.half + CURVE_FRAMES / 4;
  return (
    <AbsoluteFill>
      <SceneTitle>Random, Yet Predictable</SceneTitle>
      <svg
        width={1920}
        height={1080}
        style={{ position: "absolute", left: 0, top: 0 }}
      >
        {single > 0 ? (
          <circle
            cx={SINGLE.x}
            cy={SINGLE.y}
            r={SINGLE.r}
            fill={singleDecayed ? colors.band : colors.proton}
            opacity={single * flicker}
          />
        ) : null}
        <g opacity={crowd}>
          {DECAY_TIMES.map((t, i) => (
            <circle
              key={i}
              cx={GRID.x + (i % GRID.columns) * GRID.spacing}
              cy={GRID.y + Math.floor(i / GRID.columns) * GRID.spacing}
              r={GRID.r}
              fill={t > elapsed ? colors.proton : colors.band}
            />
          ))}
        </g>
      </svg>
      <Text
        x={SINGLE.x}
        y={SINGLE.y + SINGLE.r + 50}
        size={36}
        weight={700}
        anchor="middle"
        color={singleDecayed ? colors.muted : colors.protonText}
        opacity={single}
      >
        {singleDecayed ? "Decayed, with no warning" : "When will it decay?"}
      </Text>
      <Text
        x={GRID.x + ((GRID.columns - 1) * GRID.spacing) / 2}
        y={340}
        size={44}
        weight={700}
        anchor="middle"
        opacity={crowd}
      >
        Nuclei remaining: {remaining}
      </Text>
      <DecayGraph
        axes={crowd}
        curve={curve}
        markers={[
          {
            halfLives: 1,
            label: null,
            reveal: progress(frame, markerStart, markerStart + 15),
          },
        ]}
      />
      <Text
        x={graphX(1) + 20}
        y={585}
        size={36}
        weight={700}
        color={colors.halfLifeText}
        opacity={fadeIn(frame, CUES.uranium)}
      >
        <Sup>238</Sup>U: t<Sub>1/2</Sub> = 4.5 × 10<Sup>9</Sup> y
      </Text>
      <Pitfall
        top={410}
        left={1190}
        width={560}
        size={30}
        opacity={fadeIn(frame, CUES.pitfall)}
      >
        Heat, pressure and amount do not change a half-life.
      </Pitfall>
    </AbsoluteFill>
  );
}
