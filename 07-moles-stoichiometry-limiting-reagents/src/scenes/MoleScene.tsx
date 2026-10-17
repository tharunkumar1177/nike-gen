import { AbsoluteFill, useVideoConfig } from "remotion";
import { dropped, popped } from "../components/anim";
import { useSceneFrame } from "../components/SceneFrame";
import { Sub, Sup, Text } from "../components/Text";
import { cue } from "../cues";
import { colors, SAFE, type } from "../theme";

const DEFINITION_AT = cue("the-mole", "exactly six point");
const AVOGADRO_AT = cue("the-mole", "Avogadro constant");

export function MoleScene() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill>
      <Text
        x={SAFE}
        y={180}
        size={type.title}
        weight={700}
        {...popped(frame, fps, 0)}
      >
        The Mole
      </Text>
      <Text
        x={SAFE}
        y={270}
        size={type.subtitle}
        color={colors.muted}
        {...popped(frame, fps, 10)}
      >
        Counting Unit
      </Text>
      <Text x={SAFE} y={380} size={type.body} {...popped(frame, fps, 30)}>
        Exact counting unit linking atoms to grams.
      </Text>
      <Text
        x={960}
        y={560}
        size={type.subtitle}
        weight={500}
        anchor="middle"
        {...dropped(frame, DEFINITION_AT)}
      >
        1 mol = 6.02214076 × 10<Sup>23</Sup> entities
      </Text>
      <Text
        x={960}
        y={660}
        size={type.body}
        color={colors.muted}
        anchor="middle"
        {...dropped(frame, AVOGADRO_AT)}
      >
        N<Sub>A</Sub>: Avogadro constant
      </Text>
    </AbsoluteFill>
  );
}
