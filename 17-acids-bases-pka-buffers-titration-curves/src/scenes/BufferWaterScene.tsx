import { AbsoluteFill, interpolate, useVideoConfig } from "remotion";
import { BUFFER } from "../acidbase";
import {
  dropped,
  easeInOut,
  fadeIn,
  popped,
  progress,
} from "../components/anim";
import { Beaker } from "../components/Beaker";
import { Chip } from "../components/Chip";
import { useSceneFrame } from "../components/SceneFrame";
import { Sub, Sup, Text } from "../components/Text";
import { cue } from "../cues";
import { colors, HEADING_Y, SAFE, type } from "../theme";

const SHOW_AT = cue("buffer-vs-water", "Consider a buffer");
const START_AT = cue("buffer-vs-water", "Its p H is four point seven four");
const BUFFER_AT = cue(
  "buffer-vs-water",
  "drops the p H to four point six five",
);
const WATER_AT = cue("buffer-vs-water", "drops the p H from seven to two");

const BEAKER = { y: 350, width: 300, height: 400 } as const;
const LEFT = 330;
const RIGHT = 1290;
const MID = 960;
const DROP = { from: 330, to: 480, frames: 30 } as const;

const WATER_PH = 7;
const fixed = (value: number) => value.toFixed(2);
const signed = (value: number) => `−${Math.abs(value).toFixed(2)}`;

const PARTICLES = Array.from({ length: 10 }, (_, i) => ({
  species: i % 2 === 0 ? ("acid" as const) : ("base" as const),
  x: LEFT + BEAKER.width / 2 + ((i % 5) - 2) * 56,
  y: 610 + Math.floor(i / 5) * 70,
}));

function Minus() {
  return <Sup>−</Sup>;
}

function Drop({ frame, at, x }: { frame: number; at: number; x: number }) {
  const fall = progress(frame, at, at + DROP.frames, easeInOut);
  const opacity =
    frame < at
      ? 0
      : interpolate(
          frame,
          [at, at + 6, at + DROP.frames, at + 45],
          [0, 1, 1, 0],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          },
        );
  return (
    <Chip
      species="hydronium"
      x={x}
      y={DROP.from + (DROP.to - DROP.from) * fall}
      radius={20}
      opacity={opacity}
    >
      H<Sup>+</Sup>
    </Chip>
  );
}

function Reading({
  x,
  frame,
  fps,
  at,
  before,
  after,
}: {
  x: number;
  frame: number;
  fps: number;
  at: number;
  before: number;
  after: number;
}) {
  const swap = progress(frame, at + 20, at + 35);
  const centre = x + BEAKER.width / 2;
  return (
    <>
      <Text
        x={centre}
        y={820}
        size={type.body}
        weight={700}
        anchor="middle"
        opacity={fadeIn(frame, SHOW_AT) * (1 - swap)}
      >
        pH = {fixed(before)}
      </Text>
      <Text
        x={centre}
        y={820}
        size={type.body}
        weight={700}
        anchor="middle"
        opacity={swap}
      >
        pH = {fixed(after)}
      </Text>
      <Text
        x={centre}
        y={890}
        size={type.label}
        weight={700}
        color={colors.hydroniumText}
        anchor="middle"
        {...popped(frame, fps, at + 35)}
      >
        ΔpH = {signed(after - before)}
      </Text>
    </>
  );
}

export function BufferWaterScene() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();
  const shown = fadeIn(frame, SHOW_AT);
  const startPulse = interpolate(
    frame,
    [START_AT, START_AT + 15, START_AT + 30],
    [1, 1.2, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const added = BUFFER.added.toFixed(3);
  return (
    <AbsoluteFill>
      <Text
        x={SAFE}
        y={HEADING_Y}
        size={type.subtitle}
        weight={700}
        {...popped(frame, fps, 0)}
      >
        Worked Example: Buffer vs. Pure Water
      </Text>
      <Text
        x={LEFT + BEAKER.width / 2}
        y={290}
        size={type.label}
        weight={500}
        color={colors.muted}
        anchor="middle"
        opacity={shown}
      >
        Buffer, 1.00 L: {BUFFER.ha.toFixed(3)} mol HA + {BUFFER.a.toFixed(3)}{" "}
        mol A<Minus />
      </Text>
      <Text
        x={RIGHT + BEAKER.width / 2}
        y={290}
        size={type.label}
        weight={500}
        color={colors.muted}
        anchor="middle"
        opacity={shown}
      >
        Pure water, 1.00 L
      </Text>
      <Beaker
        x={LEFT}
        y={BEAKER.y}
        width={BEAKER.width}
        height={BEAKER.height}
        opacity={shown}
      >
        {PARTICLES.map((p, i) => (
          <Chip key={i} species={p.species} x={p.x} y={p.y} radius={26}>
            {p.species === "acid" ? (
              "HA"
            ) : (
              <>
                A<Minus />
              </>
            )}
          </Chip>
        ))}
      </Beaker>
      <Beaker
        x={RIGHT}
        y={BEAKER.y}
        width={BEAKER.width}
        height={BEAKER.height}
        opacity={shown}
      />
      <Drop frame={frame} at={BUFFER_AT} x={LEFT + BEAKER.width / 2} />
      <Drop frame={frame} at={WATER_AT} x={RIGHT + BEAKER.width / 2} />
      <Text
        x={LEFT + BEAKER.width + 30}
        y={420}
        size={type.label}
        weight={700}
        color={colors.hydroniumText}
        {...dropped(frame, BUFFER_AT)}
      >
        + {added} mol HCl
      </Text>
      <Text
        x={RIGHT - 30}
        y={420}
        size={type.label}
        weight={700}
        color={colors.hydroniumText}
        anchor="end"
        {...dropped(frame, WATER_AT)}
      >
        + {added} mol HCl
      </Text>
      <Text
        x={MID}
        y={540}
        size={type.label}
        color={colors.muted}
        anchor="middle"
        opacity={fadeIn(frame, START_AT)}
      >
        pH = pK<Sub>a</Sub> + log([A
        <Minus />] / [HA])
      </Text>
      <Text
        x={MID}
        y={620}
        size={type.label}
        weight={500}
        color={colors.pkaText}
        anchor="middle"
        {...dropped(frame, START_AT + 10)}
        scale={startPulse}
      >
        {fixed(BUFFER.before)} + log({BUFFER.a.toFixed(3)} /{" "}
        {BUFFER.ha.toFixed(3)}) = {fixed(BUFFER.before)}
      </Text>
      <Text
        x={MID}
        y={700}
        size={type.label}
        weight={500}
        color={colors.hydroniumText}
        anchor="middle"
        {...dropped(frame, BUFFER_AT + 20)}
      >
        {fixed(BUFFER.before)} + log({BUFFER.aAfter.toFixed(3)} /{" "}
        {BUFFER.haAfter.toFixed(3)}) = {fixed(BUFFER.after)}
      </Text>
      <Reading
        x={LEFT}
        frame={frame}
        fps={fps}
        at={BUFFER_AT}
        before={BUFFER.before}
        after={BUFFER.after}
      />
      <Reading
        x={RIGHT}
        frame={frame}
        fps={fps}
        at={WATER_AT}
        before={WATER_PH}
        after={BUFFER.water}
      />
    </AbsoluteFill>
  );
}
