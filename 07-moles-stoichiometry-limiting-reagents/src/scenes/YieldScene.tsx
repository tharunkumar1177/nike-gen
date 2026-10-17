import { AbsoluteFill, useVideoConfig } from "remotion";
import { dropped, fadeIn, popped } from "../components/anim";
import { Equation } from "../components/Equation";
import { useSceneFrame } from "../components/SceneFrame";
import { Arrow, Badge, Text } from "../components/Text";
import { cue } from "../cues";
import { colors, SAFE, type } from "../theme";
import { Amount, EQUATION_Y, MapInset } from "./worked";

const MOLES_AT = cue("theoretical-yield", "six two five zero moles");
const GRAMS_AT = cue("theoretical-yield", "eleven point three grams");
const EXCESS_AT = cue("theoretical-yield", "zero point seven four zero grams");
const TAG_AT = cue("theoretical-yield", "in excess");

const ROW_1 = 350;
const ROW_2 = 450;
const ROW_3 = 650;
const CALC_X = 640;
const RESULT_X = 1060;

export function YieldScene() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();
  const highlight =
    frame >= GRAMS_AT
      ? { arrow: 1 as const, color: colors.h2o, textColor: colors.h2oText }
      : undefined;
  return (
    <AbsoluteFill>
      <Equation y={EQUATION_Y} size={type.subtitle} />
      <Text x={SAFE} y={ROW_1} size={type.body}>
        <Badge
          color={colors.limiting}
          textColor={colors.limitingText}
          size={type.body}
        >
          Limiting reagent
        </Badge>
      </Text>
      <Text x={CALC_X} y={ROW_1} size={type.body}>
        <Amount n="0.3125 mol" of="O2" />
      </Text>
      <Text x={980} y={ROW_1} size={type.body} {...dropped(frame, MOLES_AT)}>
        × 2 = <Amount n="0.6250 mol" of="H2O" />
      </Text>
      <Text x={CALC_X} y={ROW_2} size={type.body} {...dropped(frame, GRAMS_AT)}>
        × 18.015 g/mol =
      </Text>
      <Text
        x={RESULT_X}
        y={ROW_2}
        size={type.body}
        weight={700}
        color={colors.h2oText}
        {...popped(frame, fps, GRAMS_AT + 12)}
      >
        11.26 g <Arrow /> 11.3 g
      </Text>
      <Text
        x={RESULT_X}
        y={ROW_2 + 60}
        size={type.label}
        weight={500}
        color={colors.h2oText}
        {...dropped(frame, GRAMS_AT + 12)}
      >
        Theoretical yield
      </Text>
      <Text x={SAFE} y={ROW_3} size={type.body} {...dropped(frame, EXCESS_AT)}>
        (0.9921 − 0.6250) mol × 2.016 g/mol = <Amount n="0.740 g" of="H2" />
      </Text>
      <Text x={1320} y={ROW_3} size={type.body} {...popped(frame, fps, TAG_AT)}>
        <Badge
          color={colors.excess}
          textColor={colors.excessText}
          size={type.body}
        >
          Excess
        </Badge>
      </Text>
      <MapInset opacity={fadeIn(frame, 10)} highlight={highlight} />
    </AbsoluteFill>
  );
}
