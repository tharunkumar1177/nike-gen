import { AbsoluteFill, useVideoConfig } from "remotion";
import { dropped, fadeIn, popped } from "../components/anim";
import { useSceneFrame } from "../components/SceneFrame";
import { Badge, Text } from "../components/Text";
import { cue } from "../cues";
import { colors, type } from "../theme";
import { AmmoniaHeader, LEFT_X } from "./worked";

const CONVERT_AT = cue("worked-example-gibbs", "kilojoules per kelvin");
const SUBSTITUTE_AT = cue("worked-example-gibbs", "delta G equals");
const RESULT_AT = cue("worked-example-gibbs", "point seven kilojoules");
const SPONTANEOUS_AT = cue("worked-example-gibbs", "reaction is spontaneous");

export function GibbsExampleScene() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();
  const convert = popped(frame, fps, CONVERT_AT);
  return (
    <AbsoluteFill>
      <AmmoniaHeader />
      <Text
        x={LEFT_X}
        y={360}
        size={type.body}
        color={colors.enthalpyText}
        opacity={fadeIn(frame, 0)}
      >
        ΔH° = −91.8 kJ
      </Text>
      <Text
        x={LEFT_X}
        y={470}
        size={type.body}
        color={colors.entropyText}
        opacity={fadeIn(frame, 0)}
      >
        ΔS° = −198.1 J/K
      </Text>
      <Text x={660} y={470} size={type.body} {...convert}>
        <span
          style={{
            display: "inline-block",
            padding: "0.1em 0.4em",
            borderRadius: 12,
            border: `4px solid ${colors.pitfallText}`,
            color: colors.pitfallText,
            fontWeight: 700,
          }}
        >
          = −0.1981 kJ/K
        </span>
      </Text>
      <Text
        x={LEFT_X}
        y={640}
        size={type.body}
        {...dropped(frame, SUBSTITUTE_AT)}
      >
        <b style={{ color: colors.gibbsText }}>ΔG°</b> = ΔH° − TΔS° = −91.8 −
        (298.15)(−0.1981)
      </Text>
      <Text
        x={LEFT_X + 140}
        y={750}
        size={type.body}
        {...dropped(frame, RESULT_AT)}
      >
        = −91.8 + 59.06 ={" "}
        <b style={{ color: colors.gibbsText }}>−32.7 kJ</b>
      </Text>
      <Text
        x={LEFT_X + 140}
        y={880}
        size={type.body}
        {...popped(frame, fps, SPONTANEOUS_AT)}
      >
        <Badge
          color={colors.spontaneous}
          textColor={colors.spontaneousText}
          size={type.body}
        >
          ΔG° &lt; 0: Spontaneous at 298 K
        </Badge>
      </Text>
    </AbsoluteFill>
  );
}
