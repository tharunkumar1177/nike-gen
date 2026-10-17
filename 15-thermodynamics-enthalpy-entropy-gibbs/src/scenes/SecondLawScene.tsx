import { AbsoluteFill, useVideoConfig } from "remotion";
import { dropped, fadeIn, popped } from "../components/anim";
import { useSceneFrame } from "../components/SceneFrame";
import { Sub, Text } from "../components/Text";
import { cue } from "../cues";
import { colors, SAFE, type } from "../theme";

const TITLE_AT = cue("second-law", "second law of thermodynamics");
const LAW_AT = cue("second-law", "increases the total entropy of the universe");
const SYSTEM_AT = cue("second-law", "system's entropy decreases");
const EXAMPLE_AT = cue("second-law", "liquid water freezing into solid ice");
const SURROUNDINGS_AT = cue("second-law", "surroundings must compensate");
const CONCLUSION_AT = cue("second-law", "larger entropy increase");

const TERMS_Y = 700;
const NOTE_Y = 775;

export function SecondLawScene() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();
  const system = fadeIn(frame, SYSTEM_AT);
  const surroundings = popped(frame, fps, SURROUNDINGS_AT);
  return (
    <AbsoluteFill>
      <Text
        x={SAFE}
        y={180}
        size={type.title}
        weight={700}
        {...dropped(frame, TITLE_AT)}
      >
        Second Law
      </Text>
      <Text
        x={960}
        y={400}
        size={type.subtitle}
        weight={700}
        anchor="middle"
        {...popped(frame, fps, LAW_AT)}
      >
        ΔS<Sub>univ</Sub> = ΔS<Sub>sys</Sub> + ΔS<Sub>surr</Sub>{" "}
        <span style={{ color: colors.entropyText }}>&gt; 0</span>
      </Text>
      <Text
        x={SAFE}
        y={550}
        size={type.body}
        opacity={fadeIn(frame, EXAMPLE_AT)}
      >
        Water freezing below 0 °C:
      </Text>
      <Text
        x={500}
        y={TERMS_Y}
        size={type.subtitle}
        anchor="middle"
        opacity={system}
      >
        ΔS<Sub>sys</Sub> &lt; 0
      </Text>
      <Text
        x={500}
        y={NOTE_Y}
        size={type.label}
        color={colors.muted}
        anchor="middle"
        opacity={fadeIn(frame, EXAMPLE_AT)}
      >
        liquid becomes solid
      </Text>
      <Text
        x={960}
        y={TERMS_Y}
        size={type.subtitle}
        weight={700}
        anchor="middle"
        opacity={surroundings.opacity}
      >
        +
      </Text>
      <Text
        x={1420}
        y={TERMS_Y}
        size={type.subtitle}
        weight={700}
        color={colors.entropyText}
        anchor="middle"
        {...surroundings}
      >
        ΔS<Sub>surr</Sub> &gt; 0
      </Text>
      <Text
        x={1420}
        y={NOTE_Y}
        size={type.label}
        color={colors.muted}
        anchor="middle"
        opacity={surroundings.opacity}
      >
        heat released to surroundings
      </Text>
      <Text
        x={960}
        y={880}
        size={type.body}
        weight={700}
        color={colors.entropyText}
        anchor="middle"
        {...dropped(frame, CONCLUSION_AT)}
      >
        Larger increase outweighs the decrease: ΔS<Sub>univ</Sub> &gt; 0
      </Text>
    </AbsoluteFill>
  );
}
