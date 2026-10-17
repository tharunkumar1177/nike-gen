import { AbsoluteFill, useVideoConfig } from "remotion";
import { dropped, fadeIn, popped } from "../components/anim";
import { Equation } from "../components/Equation";
import { useSceneFrame } from "../components/SceneFrame";
import { Badge, F, Text } from "../components/Text";
import { cue } from "../cues";
import { colors, type } from "../theme";
import {
  BADGE_Y,
  CHECK_Y,
  EQUATION_Y,
  GivenRows,
  LEFT_X,
  MASS_Y,
  RIGHT_X,
} from "./worked";

const NEEDS_AT = cue("identifying-limiting", "our O two needs");
const HAVE_AT = cue("identifying-limiting", "We have more than that");
const EXCESS_AT = cue("identifying-limiting", "making H two the excess");
const LIMITING_AT = cue("identifying-limiting", "the limiting reactant");
const CALLOUT_AT = cue("identifying-limiting", "despite having the larger");

export function IdentifyLimitingScene() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill>
      <Equation y={EQUATION_Y} size={type.subtitle} />
      <GivenRows ring={fadeIn(frame, CALLOUT_AT)} />
      <Text
        x={1360}
        y={MASS_Y}
        size={type.label}
        weight={500}
        color={colors.muted}
        {...dropped(frame, CALLOUT_AT)}
      >
        Larger mass, but limiting
      </Text>
      <Text
        x={RIGHT_X}
        y={CHECK_Y}
        size={type.body}
        {...dropped(frame, NEEDS_AT)}
      >
        Needs: 0.3125 × 2 = 0.6250 mol <F>H2</F>
      </Text>
      <Text
        x={LEFT_X}
        y={CHECK_Y}
        size={type.body}
        {...dropped(frame, HAVE_AT)}
      >
        Have: 0.9921 mol &gt; 0.6250 mol
      </Text>
      <Text
        x={LEFT_X}
        y={BADGE_Y}
        size={type.body}
        {...popped(frame, fps, EXCESS_AT)}
      >
        <Badge
          color={colors.excess}
          textColor={colors.excessText}
          size={type.body}
        >
          Excess
        </Badge>
      </Text>
      <Text
        x={RIGHT_X}
        y={BADGE_Y}
        size={type.body}
        {...popped(frame, fps, LIMITING_AT)}
      >
        <Badge
          color={colors.limiting}
          textColor={colors.limitingText}
          size={type.body}
        >
          Limiting reagent
        </Badge>
      </Text>
    </AbsoluteFill>
  );
}
