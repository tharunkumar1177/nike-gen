import { AbsoluteFill, useVideoConfig } from "remotion";
import { dropped, fadeIn, popped } from "../components/anim";
import { useSceneFrame } from "../components/SceneFrame";
import { Arrow, Badge, Text } from "../components/Text";
import { cue } from "../cues";
import { colors, type } from "../theme";
import { AmmoniaHeader, LEFT_X } from "./worked";

const HEADER_AT = cue("worked-example-enthalpy-entropy", "ammonia synthesis");
const KELVIN_AT = cue(
  "worked-example-enthalpy-entropy",
  "two hundred ninety eight point one five kelvin",
);
const ENTHALPY_AT = cue(
  "worked-example-enthalpy-entropy",
  "enthalpy change is",
);
const ENTROPY_AT = cue("worked-example-enthalpy-entropy", "entropy change is");
const DROP_AT = cue("worked-example-enthalpy-entropy", "gas moles drop");

export function EnthalpyEntropyScene() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill>
      <AmmoniaHeader opacity={fadeIn(frame, HEADER_AT)} />
      <Text
        x={960}
        y={290}
        size={type.label}
        color={colors.muted}
        anchor="middle"
        opacity={fadeIn(frame, KELVIN_AT)}
      >
        Standard values at 298.15 K
      </Text>
      <Text
        x={LEFT_X}
        y={420}
        size={type.body}
        color={colors.enthalpyText}
        {...dropped(frame, ENTHALPY_AT)}
      >
        <b>ΔH°</b> = 2(−45.9) − [0 + 0] = <b>−91.8 kJ</b>
      </Text>
      <Text
        x={1200}
        y={420}
        size={type.body}
        {...popped(frame, fps, ENTHALPY_AT + 40)}
      >
        <Badge
          color={colors.exothermic}
          textColor={colors.exothermicText}
          size={type.label}
        >
          Exothermic
        </Badge>
      </Text>
      <Text
        x={LEFT_X}
        y={580}
        size={type.body}
        color={colors.entropyText}
        {...dropped(frame, ENTROPY_AT)}
      >
        <b>ΔS°</b> = 2(192.8) − [191.6 + 3(130.7)]
      </Text>
      <Text
        x={LEFT_X + 112}
        y={670}
        size={type.body}
        color={colors.entropyText}
        {...dropped(frame, ENTROPY_AT + 30)}
      >
        = 385.6 − 583.7 = <b>−198.1 J/K</b>
      </Text>
      <Text
        x={LEFT_X}
        y={820}
        size={type.body}
        color={colors.muted}
        opacity={fadeIn(frame, DROP_AT)}
      >
        4 mol gas
        <Arrow />2 mol gas: entropy falls
      </Text>
    </AbsoluteFill>
  );
}
