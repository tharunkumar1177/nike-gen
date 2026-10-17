import { AbsoluteFill, useVideoConfig } from "remotion";
import { dropped, fadeIn, popped } from "../components/anim";
import { Equation } from "../components/Equation";
import { useSceneFrame } from "../components/SceneFrame";
import { cue } from "../cues";
import { colors, type } from "../theme";
import { EQUATION_Y, GivenRows, MapInset } from "./worked";

const H2_MASS_AT = cue("limiting-reagent", "two point zero zero grams");
const O2_MASS_AT = cue("limiting-reagent", "ten point zero grams");
const INSET_AT = cue("limiting-reagent", "Converting mass to moles");
const H2_MOLES_AT = cue("limiting-reagent", "nine nine two one");
const O2_MOLES_AT = cue("limiting-reagent", "three one two five");

export function LimitingReagentScene() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();
  const highlight =
    frame >= O2_MOLES_AT
      ? { arrow: 0 as const, color: colors.o2, textColor: colors.o2Text }
      : frame >= H2_MOLES_AT
        ? { arrow: 0 as const, color: colors.h2, textColor: colors.h2Text }
        : undefined;
  return (
    <AbsoluteFill>
      <Equation y={EQUATION_Y} size={type.subtitle} />
      <GivenRows
        h2Mass={popped(frame, fps, H2_MASS_AT)}
        o2Mass={popped(frame, fps, O2_MASS_AT)}
        h2Moles={dropped(frame, H2_MOLES_AT)}
        o2Moles={dropped(frame, O2_MOLES_AT)}
      />
      <MapInset opacity={fadeIn(frame, INSET_AT)} highlight={highlight} />
    </AbsoluteFill>
  );
}
