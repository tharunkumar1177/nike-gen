import { AbsoluteFill, useVideoConfig } from "remotion";
import { dropped, fadeIn, popped } from "../components/anim";
import { Reaction } from "../components/Reaction";
import { useSceneFrame } from "../components/SceneFrame";
import { Arrow, F, Text } from "../components/Text";
import { cue } from "../cues";
import { colors, HEADING_Y, SAFE, type } from "../theme";

const DECREASE_AT = cue("le-chatelier-volume", "Decreasing the volume");
const FEWER_AT = cue("le-chatelier-volume", "fewer moles of gas");
const SIDE_AT = cue("le-chatelier-volume", "here N two O four");
const INERT_AT = cue("le-chatelier-volume", "adding an inert gas");
const PARTIAL_AT = cue("le-chatelier-volume", "partial pressures");

export function VolumeScene() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill>
      <Text
        x={SAFE}
        y={HEADING_Y}
        size={type.subtitle}
        weight={700}
        {...popped(frame, fps, 0)}
      >
        Volume and Pressure
      </Text>
      <Reaction
        y={350}
        size={type.title}
        directional
        rings={{ left: fadeIn(frame, SIDE_AT), color: colors.reverse }}
        notes={{
          left: "1 mol gas",
          right: "2 mol gas",
          opacity: fadeIn(frame, FEWER_AT),
        }}
        {...popped(frame, fps, 10)}
      />
      <Text
        x={SAFE}
        y={600}
        size={type.body}
        weight={700}
        color={colors.text}
        {...dropped(frame, DECREASE_AT)}
      >
        Decrease volume:
      </Text>
      <Text
        x={560}
        y={600}
        size={type.body}
        weight={700}
        color={colors.reverseText}
        {...popped(frame, fps, SIDE_AT)}
      >
        <Arrow left />
        shifts left, toward fewer moles of gas
      </Text>
      <Text
        x={SAFE}
        y={760}
        size={type.body}
        weight={700}
        color={colors.text}
        {...dropped(frame, INERT_AT)}
      >
        Add inert gas at constant volume:{" "}
        <span style={{ color: colors.kqText }}>no shift</span>
      </Text>
      <Text
        x={SAFE}
        y={840}
        size={type.label}
        color={colors.muted}
        {...dropped(frame, PARTIAL_AT)}
      >
        Partial pressures of <F>N2O4</F> and <F>NO2</F> stay the same
      </Text>
    </AbsoluteFill>
  );
}
