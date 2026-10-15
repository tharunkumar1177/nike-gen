import { AbsoluteFill, interpolate } from "remotion";
import { fadeIn } from "../components/anim";
import { useSceneFrame } from "../components/SceneFrame";
import { Text } from "../components/Text";
import { cue } from "../cues";
import { colors, type, VIDEO } from "../theme";

const SCENE = "aufbau-diagonal";

const COLUMN = { s: 810, p: 960, d: 1110 } as const;
const ROW = { 1: 250, 2: 400, 3: 550, 4: 700 } as const;
const KIND_COLOR = { s: colors.sText, p: colors.pText, d: colors.dText };

type Label = { name: string; kind: keyof typeof COLUMN; n: 1 | 2 | 3 | 4 };

const LABELS: Label[] = [
  { name: "1s", kind: "s", n: 1 },
  { name: "2s", kind: "s", n: 2 },
  { name: "2p", kind: "p", n: 2 },
  { name: "3s", kind: "s", n: 3 },
  { name: "3p", kind: "p", n: 3 },
  { name: "3d", kind: "d", n: 3 },
  { name: "4s", kind: "s", n: 4 },
  { name: "4p", kind: "p", n: 4 },
];

type Pass = { label: string; t: number; phrase: string };
type Arrow = {
  from: readonly [number, number];
  to: readonly [number, number];
  passes: readonly Pass[];
};

/** Each arrow passes its labels at fraction `t` of its length as the label is spoken. */
const ARROWS: Arrow[] = [
  {
    from: [885, 175],
    to: [735, 325],
    passes: [{ label: "1s", t: 0.5, phrase: "one s" }],
  },
  {
    from: [885, 325],
    to: [735, 475],
    passes: [{ label: "2s", t: 0.5, phrase: "two s" }],
  },
  {
    from: [1035, 325],
    to: [735, 625],
    passes: [
      { label: "2p", t: 0.25, phrase: "two p" },
      { label: "3s", t: 0.75, phrase: "three s" },
    ],
  },
  {
    from: [1035, 475],
    to: [735, 775],
    passes: [
      { label: "3p", t: 0.25, phrase: "three p" },
      { label: "4s", t: 0.75, phrase: "four s" },
    ],
  },
  {
    from: [1185, 475],
    to: [885, 775],
    passes: [
      { label: "3d", t: 0.25, phrase: "three d" },
      { label: "4p", t: 0.75, phrase: "four p" },
    ],
  },
];

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** Frame range over which an arrow draws, so it reaches each label on cue. */
function drawRange(passes: readonly Pass[]): [number, number] {
  const [first, last] = [passes[0], passes[passes.length - 1]];
  if (!first || !last) throw new Error("Arrow has no labels.");
  const a = cue(SCENE, first.phrase);
  if (first === last) return [a - 15, a + 15];
  const b = cue(SCENE, last.phrase);
  const perFrame = (last.t - first.t) / (b - a);
  return [a - first.t / perFrame, b + (1 - last.t) / perFrame];
}

const DRAWN = ARROWS.map((arrow) => ({
  ...arrow,
  range: drawRange(arrow.passes),
}));

const PASSED_AT = new Map(
  ARROWS.flatMap((arrow) =>
    arrow.passes.map((pass) => [pass.label, cue(SCENE, pass.phrase)] as const),
  ),
);

const HEAD = 18;

export function AufbauScene() {
  const frame = useSceneFrame();
  const title = fadeIn(frame, 15);
  return (
    <AbsoluteFill>
      <Text
        x={960}
        y={160 + (1 - title) * 20}
        size={type.body}
        weight={500}
        opacity={title}
      >
        Diagonal rule (guide with exceptions)
      </Text>
      <svg
        width={VIDEO.width}
        height={VIDEO.height}
        style={{ position: "absolute", left: 0, top: 0 }}
      >
        {DRAWN.map(({ from, to, range }, i) => {
          const p = interpolate(frame, range, [0, 1], clamp);
          if (p <= 0) return null;
          const x = from[0] + (to[0] - from[0]) * p;
          const y = from[1] + (to[1] - from[1]) * p;
          const length = Math.hypot(to[0] - from[0], to[1] - from[1]);
          const ux = (to[0] - from[0]) / length;
          const uy = (to[1] - from[1]) / length;
          const head = `M ${x - HEAD * ux - 10 * uy} ${y - HEAD * uy + 10 * ux} L ${x} ${y} L ${x - HEAD * ux + 10 * uy} ${y - HEAD * uy - 10 * ux}`;
          return (
            <g
              key={i}
              stroke={colors.axis}
              strokeWidth={4}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            >
              <line x1={from[0]} y1={from[1]} x2={x} y2={y} />
              <path d={head} />
            </g>
          );
        })}
        {LABELS.map(({ name, kind, n }, i) => (
          <circle
            key={name}
            cx={COLUMN[kind]}
            cy={ROW[n]}
            r={36}
            fill={colors.background}
            opacity={fadeIn(frame, 60 + i * 10)}
          />
        ))}
      </svg>
      {LABELS.map(({ name, kind, n }, i) => {
        const passed = PASSED_AT.get(name);
        if (passed === undefined) {
          throw new Error(`No arrow passes ${name}.`);
        }
        const pulse = interpolate(
          frame,
          [passed, passed + 6, passed + 18],
          [0, 1, 0],
          clamp,
        );
        return (
          <Text
            key={name}
            x={COLUMN[kind]}
            y={ROW[n]}
            size={type.label}
            weight={frame >= passed ? 700 : 500}
            color={frame >= passed ? KIND_COLOR[kind] : colors.text}
            scale={1 + 0.2 * pulse}
            opacity={fadeIn(frame, 60 + i * 10)}
          >
            {name}
          </Text>
        );
      })}
    </AbsoluteFill>
  );
}
