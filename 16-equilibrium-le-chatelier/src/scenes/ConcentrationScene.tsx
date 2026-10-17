import { AbsoluteFill, useVideoConfig } from "remotion";
import { easeInOut, fadeIn, popped, progress, pulse } from "../components/anim";
import { ConcentrationGraph } from "../components/ConcentrationGraph";
import { Pitfall } from "../components/Pitfall";
import { useSceneFrame } from "../components/SceneFrame";
import { Arrow, F, Text } from "../components/Text";
import { cue } from "../cues";
import { afterStress, EQ_N2O4, EQ_NO2, STRESS_AT } from "../equilibrium";
import { colors, HEADING_Y, SAFE, type } from "../theme";

const PRINCIPLE_AT = cue("le-chatelier-concentration", "stressed equilibrium");
const ADD_AT = cue("le-chatelier-concentration", "Adding N two O four");
const Q_AT = cue("le-chatelier-concentration", "making Q less than K");
const SHIFT_AT = cue("le-chatelier-concentration", "system shifts right");
const RESTORE_AT = cue("le-chatelier-concentration", "without restoring");

const GRAPH = { x: 360, y: 290, width: 1060, height: 420 } as const;
const SPIKE = 0.004;

export function ConcentrationScene() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();
  const reveal =
    STRESS_AT * progress(frame, 10, 60, easeInOut) +
    SPIKE * progress(frame, ADD_AT, ADD_AT + 4) +
    (1 - STRESS_AT - SPIKE) *
      progress(frame, SHIFT_AT, SHIFT_AT + 120, easeInOut);
  const original = fadeIn(frame, ADD_AT + 10);
  const quotient = popped(frame, fps, Q_AT);
  const pitfall = popped(frame, fps, RESTORE_AT);
  const spikeX = GRAPH.x + STRESS_AT * GRAPH.width;
  return (
    <AbsoluteFill>
      <Text
        x={SAFE}
        y={HEADING_Y}
        size={type.subtitle}
        weight={700}
        {...popped(frame, fps, 0)}
      >
        Le Chatelier's Principle
      </Text>
      <Text
        x={SAFE}
        y={215}
        size={type.label}
        color={colors.muted}
        {...popped(frame, fps, PRINCIPLE_AT)}
      >
        A stressed equilibrium shifts to relieve the stress.
      </Text>
      <Text
        x={1800}
        y={HEADING_Y}
        size={type.body}
        weight={700}
        color={colors.forwardText}
        anchor="end"
        opacity={quotient.opacity}
        scale={quotient.scale * pulse(frame, SHIFT_AT)}
      >
        Q {"<"} K<Arrow />
        shifts right
      </Text>
      <ConcentrationGraph
        {...GRAPH}
        opacity={1}
        reveal={reveal}
        references={[
          { c: EQ_N2O4, color: colors.n2o4Text, opacity: original * 0.6 },
          { c: EQ_NO2, color: colors.no2Text, opacity: original * 0.6 },
        ]}
        series={[
          {
            pieces: [
              { from: 0, to: STRESS_AT, c: () => EQ_N2O4 },
              { from: STRESS_AT, to: 1, c: afterStress.n2o4 },
            ],
            color: colors.n2o4Text,
            label: <F>N2O4</F>,
          },
          {
            pieces: [
              { from: 0, to: STRESS_AT, c: () => EQ_NO2 },
              { from: STRESS_AT, to: 1, c: afterStress.no2 },
            ],
            color: colors.no2Text,
            label: <F>NO2</F>,
          },
        ]}
      />
      <Text
        x={spikeX - 24}
        y={GRAPH.y + 34}
        size={type.label}
        weight={700}
        color={colors.n2o4Text}
        anchor="end"
        {...popped(frame, fps, ADD_AT)}
      >
        Add <F>N2O4</F>
      </Text>
      <Text
        x={GRAPH.x + GRAPH.width}
        y={GRAPH.y + GRAPH.height + 48}
        size={type.label}
        color={colors.muted}
        anchor="end"
        opacity={original}
      >
        Dashed: original equilibrium
      </Text>
      <Pitfall
        top={820}
        width={1680}
        opacity={pitfall.opacity}
        scale={pitfall.scale}
      >
        The original concentrations are not restored.
      </Pitfall>
    </AbsoluteFill>
  );
}
