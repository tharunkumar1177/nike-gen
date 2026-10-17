import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { easeInOut, fadeIn, lerp, pop, progress } from "../components/anim";
import { SvgLabel } from "../components/Boxes";
import { Atom, Bond, LonePair } from "../components/Molecule";
import { Stage, Title } from "../components/Panels";
import { Text } from "../components/Text";
import { cue } from "../cues";
import { colors, FONT } from "../theme";

const SCENE = "worked-example";

const BEATS = {
  structure: cue(SCENE, "analyse acetic acid"),
  methyl: cue(SCENE, "The methyl carbon"),
  carbonyl: cue(SCENE, "The carbonyl carbon"),
  hydroxyl: cue(SCENE, "The hydroxyl oxygen"),
  sigma: cue(SCENE, "seven sigma bonds"),
  pi: cue(SCENE, "one pi bond"),
};

type Point = { x: number; y: number };

const C1 = { x: 400, y: 540 };
const C2 = { x: 640, y: 540 };
const O1 = { x: 880, y: 540 };
const O2 = { x: 640, y: 300 };
const H_METHYL = [
  { x: 260, y: 540 },
  { x: 400, y: 400 },
  { x: 400, y: 680 },
];
const H_HYDROXYL = { x: 1020, y: 540 };

const SINGLE_BONDS: [Point, Point][] = [
  ...H_METHYL.map((h): [Point, Point] => [C1, h]),
  [C1, C2],
  [C2, O1],
  [O1, H_HYDROXYL],
];
const DOUBLE_OFFSET = 7;

const mid = (a: Point, b: Point) => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });

const CENTRES = [
  {
    at: C1,
    beat: BEATS.methyl,
    badges: [...H_METHYL.map((h) => mid(C1, h)), mid(C1, C2)],
    text: "Methyl C: 4 domains = sp³",
  },
  {
    at: C2,
    beat: BEATS.carbonyl,
    badges: [mid(C1, C2), mid(C2, O2), mid(C2, O1)],
    text: "Carbonyl C: 3 domains = sp²",
  },
  {
    at: O1,
    beat: BEATS.hydroxyl,
    badges: [
      mid(C2, O1),
      mid(O1, H_HYDROXYL),
      { x: O1.x, y: O1.y - 100 },
      { x: O1.x, y: O1.y + 100 },
    ],
    text: "Hydroxyl O: 4 domains = sp³",
  },
];

const STEP_X = 1140;
const STEP_TOPS = [340, 480, 620];

function Badge({ x, y, n, scale }: Point & { n: number; scale: number }) {
  if (scale <= 0) return null;
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <circle r={16} fill={colors.hybrid} stroke={colors.hybridText} strokeWidth={2} />
      <text
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily={FONT}
        fontSize={20}
        fontWeight={700}
        fill={colors.text}
      >
        {n}
      </text>
    </g>
  );
}

export function WorkedExampleScene() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const structure = pop(frame, fps, BEATS.structure);
  const sigma = progress(frame, BEATS.sigma, BEATS.sigma + 15);
  const pi = progress(frame, BEATS.pi, BEATS.pi + 15);

  const active = CENTRES.reduce(
    (current, centre, i) => (frame >= centre.beat ? i : current),
    -1,
  );
  const ringFrom = CENTRES[Math.max(0, active - 1)]!.at;
  const ringTo = CENTRES[Math.max(0, active)]!.at;
  const move =
    active > 0
      ? progress(frame, CENTRES[active]!.beat, CENTRES[active]!.beat + 15, easeInOut)
      : 1;
  const ring = {
    x: lerp(ringFrom.x, ringTo.x, move),
    y: lerp(ringFrom.y, ringTo.y, move),
  };
  const ringShown = active >= 0 ? fadeIn(frame, CENTRES[0]!.beat) * (1 - sigma) : 0;

  return (
    <AbsoluteFill>
      <Title>Worked Example: Acetic Acid</Title>
      <Stage>
        <g
          opacity={Math.min(1, structure)}
          transform={`translate(${C2.x} ${C2.y}) scale(${structure}) translate(${-C2.x} ${-C2.y})`}
        >
          {SINGLE_BONDS.map(([a, b], i) => (
            <g key={i}>
              <Bond a={a} b={b} />
              <Bond a={a} b={b} color={colors.sigmaText} opacity={sigma} />
            </g>
          ))}
          <Bond a={C2} b={O2} offset={-DOUBLE_OFFSET} />
          <Bond a={C2} b={O2} offset={-DOUBLE_OFFSET} color={colors.sigmaText} opacity={sigma} />
          <Bond a={C2} b={O2} offset={DOUBLE_OFFSET} />
          <Bond a={C2} b={O2} offset={DOUBLE_OFFSET} color={colors.piText} opacity={pi} />
          <LonePair x={O2.x - 44} y={O2.y - 44} angle={-45} />
          <LonePair x={O2.x + 44} y={O2.y - 44} angle={45} />
          <LonePair x={O1.x} y={O1.y - 62} />
          <LonePair x={O1.x} y={O1.y + 62} />
          <Atom {...C1}>C</Atom>
          <Atom {...C2}>C</Atom>
          <Atom {...O1}>O</Atom>
          <Atom {...O2}>O</Atom>
          {[...H_METHYL, H_HYDROXYL].map((h, i) => (
            <Atom key={i} {...h}>
              H
            </Atom>
          ))}
        </g>
        {ringShown > 0 ? (
          <circle
            cx={ring.x}
            cy={ring.y}
            r={46}
            fill="none"
            stroke={colors.hybridText}
            strokeWidth={4}
            opacity={ringShown}
          />
        ) : null}
        {CENTRES.map((centre, i) => {
          if (i !== active || sigma >= 1) return null;
          return centre.badges.map((b, n) => (
            <Badge
              key={`${i}-${n}`}
              {...b}
              n={n + 1}
              scale={pop(frame, fps, centre.beat + 4 * n) * (1 - sigma)}
            />
          ));
        })}
        <SvgLabel x={1140} y={780} anchor="start" size={48} weight={700} color={colors.sigmaText} opacity={sigma}>
          7 σ
        </SvgLabel>
        <SvgLabel x={1340} y={780} anchor="start" size={48} weight={700} color={colors.piText} opacity={pi}>
          1 π
        </SvgLabel>
      </Stage>
      {CENTRES.map((centre, i) => (
        <Text
          key={i}
          x={STEP_X}
          y={STEP_TOPS[i]! + 30}
          size={40}
          weight={500}
          anchor="start"
          opacity={fadeIn(frame, centre.beat)}
        >
          <span style={{ color: colors.hybridText, fontWeight: 700 }}>
            {i + 1}.
          </span>{" "}
          {centre.text}
        </Text>
      ))}
    </AbsoluteFill>
  );
}
