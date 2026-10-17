import type { ReactNode } from "react";
import { AbsoluteFill } from "remotion";
import { fadeIn, lerp, progress } from "../components/anim";
import { Nuclide } from "../components/Nuclide";
import { Pitfall } from "../components/Pitfall";
import { useSceneFrame } from "../components/SceneFrame";
import { SceneTitle } from "../components/SceneTitle";
import { Arrow, Sup, Text } from "../components/Text";
import { cue } from "../cues";
import { colors } from "../theme";

const SOURCE = { x: 160, y: 550, width: 120, height: 320 } as const;
const BARRIER = { y: 530, height: 360, width: 40 } as const;

const BARRIERS = [
  { x: 600, label: "Paper", fill: "#E2E8F0", stroke: colors.muted },
  { x: 1050, label: "Aluminium", fill: colors.band, stroke: colors.muted },
  { x: 1600, label: "Lead / Concrete", fill: "#334155", stroke: "#1E293B" },
] as const;

const CUES = {
  equation: cue(
    "gamma-and-penetration",
    "After a decay, the nucleus is often left excited",
  ),
  pitfall: cue("gamma-and-penetration", "Gamma emission does not change"),
  alpha: cue("gamma-and-penetration", "paper stops alpha particles"),
  beta: cue("gamma-and-penetration", "thin aluminum stops beta"),
  gamma: cue("gamma-and-penetration", "gamma rays need thick lead"),
};

type Track = {
  y: number;
  stopX: number;
  start: number;
  frames: number;
  fill: string;
  ink: string;
  label: ReactNode;
};

const TRACKS: Track[] = [
  {
    y: 610,
    stopX: BARRIERS[0].x,
    start: CUES.alpha,
    frames: 20,
    fill: colors.alpha,
    ink: colors.alphaText,
    label: "α",
  },
  {
    y: 710,
    stopX: BARRIERS[1].x,
    start: CUES.beta,
    frames: 30,
    fill: colors.betaMinus,
    ink: colors.betaMinusText,
    label: (
      <>
        β<Sup>−</Sup>
      </>
    ),
  },
  {
    y: 810,
    stopX: BARRIERS[2].x + BARRIER.width / 2,
    start: CUES.gamma,
    frames: 40,
    fill: colors.gamma,
    ink: colors.gammaText,
    label: "γ",
  },
];

const TRACK_FROM = SOURCE.x + SOURCE.width;

export function GammaScene() {
  const frame = useSceneFrame();
  const diagram = fadeIn(frame, CUES.pitfall);
  return (
    <AbsoluteFill>
      <SceneTitle>Gamma Rays and Shielding</SceneTitle>
      <Text x={160} y={360} size={64} opacity={fadeIn(frame, CUES.equation)}>
        <Nuclide a="99m" z="43">
          Tc
        </Nuclide>
        <Arrow />
        <Nuclide a="99" z="43">
          Tc
        </Nuclide>
        <span style={{ margin: "0 0.35em" }}>+</span>
        <Nuclide a="0" z="0" color={colors.gammaText}>
          γ
        </Nuclide>
      </Text>
      <Pitfall top={280} left={920} width={760} size={36} opacity={diagram}>
        Gamma emission does not change the mass number or atomic number.
      </Pitfall>
      <svg
        width={1920}
        height={1080}
        style={{ position: "absolute", left: 0, top: 0 }}
        opacity={diagram}
      >
        <rect
          x={SOURCE.x}
          y={SOURCE.y}
          width={SOURCE.width}
          height={SOURCE.height}
          rx={16}
          fill={colors.muted}
        />
        {BARRIERS.map(({ x, fill, stroke }) => (
          <rect
            key={x}
            x={x}
            y={BARRIER.y}
            width={BARRIER.width}
            height={BARRIER.height}
            rx={6}
            fill={fill}
            stroke={stroke}
            strokeWidth={2}
          />
        ))}
        {TRACKS.map(({ y, stopX, start, frames, fill }) => {
          const t = progress(frame, start, start + frames);
          if (t <= 0) return null;
          const head = lerp(TRACK_FROM, stopX, t);
          return (
            <g key={y}>
              <line
                x1={TRACK_FROM}
                y1={y}
                x2={head}
                y2={y}
                stroke={fill}
                strokeWidth={8}
                strokeLinecap="round"
              />
              <circle
                cx={head}
                cy={y}
                r={14}
                fill={fill}
                stroke={colors.background}
                strokeWidth={3}
              />
            </g>
          );
        })}
      </svg>
      <Text
        x={SOURCE.x + SOURCE.width / 2}
        y={SOURCE.y + SOURCE.height / 2}
        size={28}
        weight={700}
        anchor="middle"
        color={colors.background}
        opacity={diagram}
      >
        Source
      </Text>
      {TRACKS.map(({ y, start, ink, label }) => (
        <Text
          key={y}
          x={440}
          y={y - 34}
          size={44}
          weight={700}
          anchor="middle"
          color={ink}
          opacity={fadeIn(frame, start)}
        >
          {label}
        </Text>
      ))}
      {BARRIERS.map(({ x, label }) => (
        <Text
          key={x}
          x={x + BARRIER.width / 2}
          y={930}
          size={32}
          anchor="middle"
          opacity={diagram}
        >
          {label}
        </Text>
      ))}
    </AbsoluteFill>
  );
}
