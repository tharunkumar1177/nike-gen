import { AbsoluteFill } from "remotion";
import { fadeIn, progress } from "../components/anim";
import { baseline, PeriodicTable } from "../components/PeriodicTable";
import { useSceneFrame } from "../components/SceneFrame";
import { Text } from "../components/Text";
import { cue } from "../cues";
import { colors, type } from "../theme";

const SCENE = "ordering-groups";
const CAPTION = cue(SCENE, "atomic number");
const PERIODS = cue(SCENE, "periods");
const GROUPS = cue(SCENE, "groups");

export function OrderingScene() {
  const frame = useSceneFrame();
  const heading = progress(frame, 0, 15);
  return (
    <AbsoluteFill>
      <Text
        x={120}
        y={baseline(160, type.title)}
        size={type.title}
        weight={700}
        anchor="start"
        opacity={heading}
      >
        Periodic Table Construction
      </Text>
      <Text
        x={120}
        y={baseline(250, type.subtitle)}
        size={type.subtitle}
        color={colors.axis}
        anchor="start"
        opacity={heading}
      >
        Blocks & Configurations
      </Text>
      <PeriodicTable
        look={(el) =>
          el.group === null
            ? {}
            : {
                show: progress(
                  frame,
                  (el.period - 1) * 4,
                  (el.period - 1) * 4 + 6,
                ),
              }
        }
        periodLabels={progress(frame, PERIODS, PERIODS + 15)}
        groupLabels={progress(frame, GROUPS, GROUPS + 15)}
        axisTitles={1}
      />
      <Text
        x={960}
        y={baseline(880, type.body)}
        size={type.body}
        opacity={fadeIn(frame, CAPTION)}
      >
        The table is a map of electron configurations.
      </Text>
    </AbsoluteFill>
  );
}
