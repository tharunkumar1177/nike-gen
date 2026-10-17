import { AbsoluteFill, useVideoConfig } from "remotion";
import { dropped, popped } from "../components/anim";
import { Reaction } from "../components/Reaction";
import { useSceneFrame } from "../components/SceneFrame";
import { Arrow, F, Frac, Sub, Sup, Text } from "../components/Text";
import { cue } from "../cues";
import { colors, HEADING_Y, SAFE, type } from "../theme";

const EXPRESSION_AT = cue("reaction-quotient", "exact same expression");
const CURRENT_AT = cue("reaction-quotient", "current concentrations");
const LESS_AT = cue("reaction-quotient", "Q is less than K");
const GREATER_AT = cue("reaction-quotient", "Q is greater than K");

const RULE_X = 460;

export function QuotientScene() {
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
        Reaction Quotient, Q
      </Text>
      <Reaction
        x={1800 - 220}
        y={HEADING_Y}
        size={type.body}
        directional
        {...popped(frame, fps, 10)}
      />
      <Text
        x={960}
        y={380}
        size={type.title}
        weight={700}
        color={colors.kqText}
        anchor="middle"
        {...popped(frame, fps, EXPRESSION_AT)}
      >
        Q<Sub>c</Sub> ={" "}
        <Frac
          num={
            <span style={{ color: colors.no2Text }}>
              [<F>NO2</F>]<Sup>2</Sup>
            </span>
          }
          den={
            <span style={{ color: colors.n2o4Text }}>
              [<F>N2O4</F>]
            </span>
          }
        />
      </Text>
      <Text
        x={960}
        y={540}
        size={type.label}
        weight={500}
        color={colors.muted}
        anchor="middle"
        {...dropped(frame, CURRENT_AT)}
      >
        Same form as K, using the current concentrations
      </Text>
      <Text
        x={RULE_X}
        y={680}
        size={type.subtitle}
        weight={700}
        color={colors.forwardText}
        {...popped(frame, fps, LESS_AT)}
      >
        Q {"<"} K<Arrow />shifts right, toward products
      </Text>
      <Text
        x={RULE_X}
        y={820}
        size={type.subtitle}
        weight={700}
        color={colors.reverseText}
        {...popped(frame, fps, GREATER_AT)}
      >
        Q {">"} K<Arrow left />shifts left, toward reactants
      </Text>
    </AbsoluteFill>
  );
}
