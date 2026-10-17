import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { easeInOut, pop, progress, stagger } from "../components/anim";
import { Note, Title } from "../components/Panels";
import { Zeff } from "../components/Script";
import { AcrossArrow, DownArrow, TrendMap } from "../components/TrendMap";
import { cue } from "../cues";
import { GROUP_1_BELOW, PERIOD_2, valuesOf } from "../data";
import { colors } from "../theme";

const SCENE = "atomic-radius";

const PERIOD = cue(SCENE, "Because Z effective rises");
const DECREASES = cue(SCENE, "atomic radius decreases");
const DOWN = cue(SCENE, "Down group one");
const LARGER_N = cue(SCENE, "larger n value");

const RADII = valuesOf([...PERIOD_2, ...GROUP_1_BELOW], "radius");

export function RadiusScene() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const map = progress(frame, PERIOD, PERIOD + 30);
  const reveal = {
    ...stagger(frame, PERIOD + 10, PERIOD_2),
    ...stagger(frame, DOWN, GROUP_1_BELOW),
  };
  const across = progress(frame, DECREASES, DECREASES + 40, easeInOut);
  const down = progress(frame, LARGER_N, LARGER_N + 40, easeInOut);
  const closer = pop(frame, fps, DECREASES + 20);
  const farther = pop(frame, fps, LARGER_N + 10);
  return (
    <AbsoluteFill>
      <Title>Atomic Radius</Title>
      <TrendMap
        color={colors.radius}
        values={RADII}
        format={String}
        reveal={reveal}
        legend="Covalent radius (pm)"
        opacity={map}
      />
      <AcrossArrow
        progress={across}
        color={colors.radius}
        labelColor={colors.radiusText}
        label="Decreases"
      />
      <DownArrow
        progress={down}
        color={colors.radius}
        labelColor={colors.radiusText}
        label="Increases"
      />
      <Note x={1040} y={380} show={closer}>
        <div>Higher <Zeff /></div>
        <div>= electrons pulled closer</div>
      </Note>
      <Note x={1040} y={580} show={farther}>
        <div>Larger n value</div>
        <div>= farther from nucleus</div>
      </Note>
    </AbsoluteFill>
  );
}
