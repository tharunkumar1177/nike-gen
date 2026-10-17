import { AbsoluteFill, useVideoConfig } from "remotion";
import { dropped, fadeIn, popped, pulse } from "../components/anim";
import { Equation } from "../components/Equation";
import { useSceneFrame } from "../components/SceneFrame";
import { Text } from "../components/Text";
import { cue } from "../cues";
import { SAFE, type } from "../theme";

const H2_AT = cue("mole-ratios", "Two moles of H two");
const O2_AT = cue("mole-ratios", "one mole of O two");
const H2O_AT = cue("mole-ratios", "two moles of H two O");
const LABEL_AT = cue("mole-ratios", "These coefficients are");

export function RatioScene() {
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
        Mole Ratios
      </Text>
      <Equation
        y={450}
        size={type.title}
        opacity={fadeIn(frame, 30)}
        one={fadeIn(frame, O2_AT)}
        pulses={{
          h2: pulse(frame, H2_AT),
          o2: pulse(frame, O2_AT),
          h2o: pulse(frame, H2O_AT),
        }}
      />
      <Text
        x={960}
        y={650}
        size={type.body}
        anchor="middle"
        {...dropped(frame, LABEL_AT)}
      >
        Stoichiometric factors (mole ratios)
      </Text>
    </AbsoluteFill>
  );
}
