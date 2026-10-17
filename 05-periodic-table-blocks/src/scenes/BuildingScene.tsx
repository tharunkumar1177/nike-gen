import { AbsoluteFill } from "remotion";
import { easeOut, fadeIn, progress } from "../components/anim";
import { Legend } from "../components/Legend";
import {
  CELL,
  ORIGIN,
  PeriodicTable,
  PITCH,
} from "../components/PeriodicTable";
import { useSceneFrame } from "../components/SceneFrame";
import { Text } from "../components/Text";
import { cue } from "../cues";
import { colors, type } from "../theme";

const SCENE = "building-blocks";
const BELOW = cue(SCENE, "drawn below");

/** Rows 1–7 fill when their period phrase is spoken. */
const ROW_CUES = [
  cue(SCENE, "one s"),
  cue(SCENE, "s and p"),
  cue(SCENE, "s and p"),
  cue(SCENE, "add the d block"),
  cue(SCENE, "add the d block"),
  cue(SCENE, "add the f block"),
  cue(SCENE, "add the f block"),
];

const LENGTHS = [2, 8, 8, 18, 18, 32, 32];

const rowCue = (period: number) => ROW_CUES[period - 1] ?? 0;

export function BuildingScene() {
  const frame = useSceneFrame();
  const fSlide = progress(frame, BELOW, BELOW + 30, easeOut);
  return (
    <AbsoluteFill>
      <PeriodicTable
        look={(el) => {
          const column = el.group ?? (el.fColumn ?? 0) + 3;
          const start = rowCue(el.period) + column;
          return { show: 1, color: progress(frame, start, start + 20) };
        }}
        periodLabels={1}
        groupLabels={1}
        axisTitles={1}
        fSlide={fSlide}
        guides={fadeIn(frame, BELOW + 15)}
      />
      {LENGTHS.map((length, i) => (
        <Text
          key={i}
          x={1520}
          y={ORIGIN.y + i * PITCH + CELL / 2}
          size={type.label}
          weight={500}
          color={colors.axis}
          anchor="start"
          opacity={fadeIn(frame, rowCue(i + 1))}
        >
          {length}
        </Text>
      ))}
      <Legend
        shown={{
          s: fadeIn(frame, rowCue(1)),
          p: fadeIn(frame, rowCue(2)),
          d: fadeIn(frame, rowCue(4)),
          f: fadeIn(frame, rowCue(6)),
        }}
      />
    </AbsoluteFill>
  );
}
