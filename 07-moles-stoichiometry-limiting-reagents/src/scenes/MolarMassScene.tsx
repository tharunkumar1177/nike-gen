import { AbsoluteFill, useVideoConfig } from "remotion";
import { dropIn, dropped, popped, progress } from "../components/anim";
import { ConversionMap } from "../components/ConversionMap";
import { useSceneFrame } from "../components/SceneFrame";
import { F, Text } from "../components/Text";
import { cue } from "../cues";
import { colors, SAFE, type } from "../theme";

const EXAMPLE_AT = cue("molar-mass-map", "H two O has");
const MAP_AT = cue("molar-mass-map", "conversion map");

export function MolarMassScene() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();
  const arrow = (i: number) =>
    progress(frame, MAP_AT + i * 20, MAP_AT + i * 20 + 20);
  return (
    <AbsoluteFill>
      <Text
        x={SAFE}
        y={180}
        size={type.title}
        weight={700}
        {...popped(frame, fps, 0)}
      >
        Conversion Map
      </Text>
      <ConversionMap
        x={960}
        y={500}
        nodes={[dropIn(frame, 30), dropIn(frame, 38), dropIn(frame, 46)]}
        arrows={[arrow(0), arrow(1), arrow(2), arrow(3)]}
      />
      <Text
        x={960}
        y={800}
        size={type.body}
        weight={500}
        color={colors.h2oText}
        anchor="middle"
        {...dropped(frame, EXAMPLE_AT)}
      >
        <span
          style={{
            display: "inline-block",
            padding: "16px 40px",
            borderRadius: 16,
            border: `4px solid ${colors.h2o}`,
            background: `${colors.h2o}33`,
          }}
        >
          M(<F>H2O</F>) = 18.015 g/mol
        </span>
      </Text>
    </AbsoluteFill>
  );
}
