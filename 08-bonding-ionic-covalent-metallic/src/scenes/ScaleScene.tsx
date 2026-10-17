import { useVideoConfig } from "remotion";
import { fadeIn, lerp, pop, progress } from "../components/anim";
import { Title } from "../components/Labels";
import { useSceneFrame } from "../components/SceneFrame";
import { Text } from "../components/Text";
import { cue } from "../cues";
import { colors, SAFE } from "../theme";

const SCENE = "electronegativity-scale";

const BAR = { left: 260, right: 1660, y: 380, height: 40, max: 3.3 };
const barX = (dEN: number) =>
  BAR.left + (dEN / BAR.max) * (BAR.right - BAR.left);

const BANDS = [
  {
    from: 0,
    to: 0.4,
    fill: "#D1FAE5",
    label: "Nonpolar",
    color: colors.covalentText,
  },
  {
    from: 0.4,
    to: 1.8,
    fill: "#A7F3D0",
    label: "Polar covalent",
    color: colors.covalentText,
  },
  {
    from: 1.8,
    to: 3.3,
    fill: "#EDE9FE",
    label: "Ionic",
    color: colors.ionicText,
  },
];

const TICKS = ["0.0", "0.4", "1.8", "3.3"];

const EXAMPLES = [
  {
    bond: "Cl–Cl",
    math: "|3.0 − 3.0| = 0.0",
    dEN: 0,
    y: 620,
    show: "two chlorine atoms",
    drop: "making them nonpolar",
  },
  {
    bond: "H–Cl",
    math: "|3.0 − 2.1| = 0.9",
    dEN: 0.9,
    y: 720,
    show: "Hydrogen and chlorine have",
    drop: "predicting polar covalent",
  },
  {
    bond: "Na–Cl",
    math: "|3.0 − 0.9| = 2.1",
    dEN: 2.1,
    y: 820,
    show: "Sodium and chlorine have",
    drop: "predicting ionic",
  },
] as const;

const TRI = {
  metallic: { x: 1250, y: 900 },
  covalent: { x: 1650, y: 900 },
  ionic: { x: 1450, y: 600 },
};

const TRI_DOTS = [
  {
    label: "Na–Na",
    x: 1272,
    y: 884,
    color: colors.metallic,
    lx: 1300,
    ly: 856,
    anchor: "start",
  },
  {
    label: "Cl–Cl",
    x: 1628,
    y: 884,
    color: colors.covalent,
    lx: 1600,
    ly: 856,
    anchor: "end",
  },
  {
    label: "Na–Cl",
    x: 1450,
    y: 640,
    color: colors.ionic,
    lx: 1480,
    ly: 650,
    anchor: "start",
  },
] as const;

export function ScaleScene() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();

  const barIn = fadeIn(frame, cue(SCENE, "Electronegativity is an"));
  const bands = progress(
    frame,
    cue(SCENE, "rough guide"),
    cue(SCENE, "rough guide") + 40,
  );
  const triangle = cue(SCENE, "van Arkel Ketelaar triangle");
  const triDraw = progress(frame, triangle, triangle + 45);
  const dotsAt = cue(SCENE, "properly place metallic");

  return (
    <>
      <Title title="Electronegativity Difference (ΔEN)" />

      <svg
        width={1920}
        height={1080}
        style={{ position: "absolute", left: 0, top: 0 }}
      >
        <g opacity={barIn}>
          <rect
            x={BAR.left}
            y={BAR.y - BAR.height / 2}
            width={BAR.right - BAR.left}
            height={BAR.height}
            rx={8}
            fill="#F3F4F6"
          />
          <clipPath id="band-reveal">
            <rect
              x={BAR.left}
              y={BAR.y - BAR.height / 2}
              width={(BAR.right - BAR.left) * bands}
              height={BAR.height}
            />
          </clipPath>
          <g clipPath="url(#band-reveal)">
            {BANDS.map((band) => (
              <rect
                key={band.label}
                x={barX(band.from)}
                y={BAR.y - BAR.height / 2}
                width={barX(band.to) - barX(band.from)}
                height={BAR.height}
                fill={band.fill}
              />
            ))}
          </g>
          {TICKS.map((tick) => (
            <line
              key={tick}
              x1={barX(Number(tick))}
              y1={BAR.y - BAR.height / 2}
              x2={barX(Number(tick))}
              y2={BAR.y + BAR.height / 2 + 10}
              stroke={colors.text}
              strokeWidth={3}
            />
          ))}
        </g>
        {EXAMPLES.map((example) => {
          const drop = pop(frame, fps, cue(SCENE, example.drop));
          if (drop <= 0.01) return null;
          return (
            <circle
              key={example.bond}
              cx={barX(example.dEN)}
              cy={lerp(BAR.y - 60, BAR.y, drop)}
              r={14}
              fill={colors.text}
              stroke="#FFFFFF"
              strokeWidth={3}
              opacity={Math.min(1, drop * 1.5)}
            />
          );
        })}
        {triDraw > 0 ? (
          <g>
            <path
              d={`M${TRI.metallic.x},${TRI.metallic.y} L${TRI.covalent.x},${TRI.covalent.y} L${TRI.ionic.x},${TRI.ionic.y} Z`}
              fill="#F9FAFB"
              stroke={colors.text}
              strokeWidth={4}
              strokeLinejoin="round"
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={1 - triDraw}
            />
          </g>
        ) : null}
        {TRI_DOTS.map((dot) => {
          const t = pop(frame, fps, dotsAt);
          if (t <= 0.01) return null;
          return (
            <circle
              key={dot.label}
              cx={dot.x}
              cy={dot.y}
              r={12 * t}
              fill={dot.color}
            />
          );
        })}
      </svg>

      {BANDS.map((band) => (
        <Text
          key={band.label}
          x={(barX(band.from) + barX(band.to)) / 2}
          y={310}
          size={32}
          weight={500}
          color={band.color}
          opacity={fadeIn(frame, cue(SCENE, "rough guide") + 20)}
        >
          {band.label}
        </Text>
      ))}
      {TICKS.map((tick) => (
        <Text
          key={tick}
          x={barX(Number(tick))}
          y={445}
          size={28}
          weight={500}
          color={colors.muted}
          opacity={barIn}
        >
          {tick}
        </Text>
      ))}
      <Text
        x={BAR.right}
        y={530}
        size={28}
        weight={500}
        anchor="end"
        color={colors.muted}
        opacity={fadeIn(frame, cue(SCENE, "rough guide") + 20)}
      >
        Rough guide (OpenStax)
      </Text>

      {EXAMPLES.map((example) => {
        const shown = fadeIn(frame, cue(SCENE, example.show));
        const dropped = fadeIn(frame, cue(SCENE, example.drop));
        return (
          <div key={example.bond}>
            <Text
              x={SAFE}
              y={example.y}
              size={48}
              anchor="start"
              opacity={shown}
            >
              <span style={{ fontWeight: 700 }}>{example.bond}:</span>{" "}
              {example.math}
            </Text>
            <Text
              x={barX(example.dEN)}
              y={490}
              size={28}
              weight={700}
              opacity={dropped}
            >
              {example.bond}
            </Text>
          </div>
        );
      })}

      <Text
        x={TRI.metallic.x}
        y={940}
        size={32}
        weight={700}
        color={colors.metallicText}
        opacity={triDraw}
      >
        Metallic
      </Text>
      <Text
        x={TRI.covalent.x}
        y={940}
        size={32}
        weight={700}
        color={colors.covalentText}
        opacity={triDraw}
      >
        Covalent
      </Text>
      <Text
        x={TRI.ionic.x}
        y={570}
        size={32}
        weight={700}
        color={colors.ionicText}
        opacity={triDraw}
      >
        Ionic
      </Text>
      <Text
        x={1450}
        y={940}
        size={28}
        weight={500}
        color={colors.muted}
        opacity={triDraw}
      >
        Average EN →
      </Text>
      <Text
        x={1200}
        y={760}
        size={28}
        weight={500}
        rotate={-90}
        color={colors.muted}
        opacity={triDraw}
      >
        ΔEN →
      </Text>
      {TRI_DOTS.map((dot) => (
        <Text
          key={dot.label}
          x={dot.lx}
          y={dot.ly}
          size={24}
          weight={700}
          anchor={dot.anchor}
          opacity={fadeIn(frame, dotsAt + 10)}
        >
          {dot.label}
        </Text>
      ))}
    </>
  );
}
