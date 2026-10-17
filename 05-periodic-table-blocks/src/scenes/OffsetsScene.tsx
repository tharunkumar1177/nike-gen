import { AbsoluteFill } from "remotion";
import { easeOut, fadeIn, lerp, progress } from "../components/anim";
import { FULL_LEGEND, Legend } from "../components/Legend";
import { baseline, PeriodicTable } from "../components/PeriodicTable";
import { useSceneFrame } from "../components/SceneFrame";
import { Text } from "../components/Text";
import { cue } from "../cues";
import { colors, type } from "../theme";

const SCENE = "offsets-exceptions";
const TITLE = cue(SCENE, "Notice the shell offsets");
const D_OFFSET = cue(SCENE, "The d block fills the n minus one shell");
const F_OFFSET = cue(SCENE, "and f fills n minus two");
const SHELL_N = cue(SCENE, "Only s and p");
const PITFALLS = cue(SCENE, "Block assignment follows filling position");
const CHROMIUM = cue(SCENE, "Chromium");
const GROUP_12 = cue(SCENE, "Group twelve");

/** Fits the empty groups 3–12 gap of rows 1–3, clear of row 4 at y 560. */
const BOX = { left: 546, top: 380, width: 588, height: 172 } as const;

function dropIn(frame: number, start: number) {
  return progress(frame, start, start + 15, easeOut);
}

function OffsetLabel({
  y,
  color,
  shown,
  children,
}: {
  y: number;
  color: string;
  shown: number;
  children: string;
}) {
  return (
    <Text
      x={1520}
      y={baseline(y, type.label) + lerp(-12, 0, shown)}
      size={type.label}
      weight={500}
      color={color}
      anchor="start"
      opacity={shown}
    >
      {children}
    </Text>
  );
}

export function OffsetsScene() {
  const frame = useSceneFrame();
  const clear = 1 - progress(frame, PITFALLS, PITFALLS + 15);
  const dRing = fadeIn(frame, D_OFFSET) * clear;
  const fRing = fadeIn(frame, F_OFFSET) * clear;
  const cr =
    fadeIn(frame, CHROMIUM) * (1 - progress(frame, GROUP_12, GROUP_12 + 15));
  const g12 = fadeIn(frame, GROUP_12);
  const box = fadeIn(frame, PITFALLS);
  return (
    <AbsoluteFill>
      <Text
        x={120}
        y={baseline(210, type.title)}
        size={type.title}
        weight={700}
        anchor="start"
        opacity={progress(frame, TITLE, TITLE + 15, easeOut)}
      >
        Offsets & Exceptions
      </Text>
      <PeriodicTable
        look={(el) => {
          let highlight = 0;
          if (el.block === "d") highlight = dRing;
          if (el.block === "f") highlight = fRing;
          if (el.symbol === "Cr") highlight = Math.max(highlight, cr);
          if (el.group === 12) highlight = Math.max(highlight, g12);
          return { color: 1, highlight };
        }}
        periodLabels={1}
        groupLabels={1}
        axisTitles={1}
      />
      <Legend shown={FULL_LEGEND} />
      <OffsetLabel y={410} color={colors.axis} shown={dropIn(frame, SHELL_N)}>
        s, p: shell n
      </OffsetLabel>
      <OffsetLabel y={460} color={colors.dText} shown={dropIn(frame, D_OFFSET)}>
        d-block: (n−1)
      </OffsetLabel>
      <OffsetLabel y={510} color={colors.fText} shown={dropIn(frame, F_OFFSET)}>
        f-block: (n−2)
      </OffsetLabel>
      <div
        style={{
          position: "absolute",
          left: BOX.left,
          top: BOX.top,
          width: BOX.width,
          height: BOX.height,
          boxSizing: "border-box",
          background: colors.box,
          border: `3px solid ${colors.axis}`,
          borderRadius: 12,
          opacity: box,
        }}
      />
      <PitfallLine y={414} weight={500} color={colors.text} shown={box}>
        Pitfalls
      </PitfallLine>
      <PitfallLine y={458} shown={fadeIn(frame, CHROMIUM)}>
        Cr: [Ar] 3d⁵ 4s¹ — still d-block
      </PitfallLine>
      <PitfallLine y={498} shown={fadeIn(frame, GROUP_12)}>
        Group 12 (Zn, Cd, Hg): d-block,
      </PitfallLine>
      <PitfallLine y={538} shown={fadeIn(frame, GROUP_12 + 10)}>
        not transition elements
      </PitfallLine>
    </AbsoluteFill>
  );
}

function PitfallLine({
  y,
  shown,
  weight = 500,
  color = colors.axis,
  children,
}: {
  y: number;
  shown: number;
  weight?: 400 | 500 | 700;
  color?: string;
  children: string;
}) {
  return (
    <Text
      x={BOX.left + 24}
      y={baseline(y, type.label)}
      size={type.label}
      weight={weight}
      color={color}
      anchor="start"
      opacity={shown}
    >
      {children}
    </Text>
  );
}
