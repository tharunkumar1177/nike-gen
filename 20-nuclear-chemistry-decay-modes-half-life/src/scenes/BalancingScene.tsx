import { AbsoluteFill, interpolate, useVideoConfig } from "remotion";
import { dropped, fadeIn, popped, progress } from "../components/anim";
import { Nuclide } from "../components/Nuclide";
import { Pitfall } from "../components/Pitfall";
import { useSceneFrame } from "../components/SceneFrame";
import { SceneTitle } from "../components/SceneTitle";
import { Arrow, Sup, Text } from "../components/Text";
import { cue } from "../cues";
import { colors } from "../theme";

const CUES = {
  series: cue("balancing-equations", "Uranium two thirty eight takes fourteen steps"),
  conserve: cue("balancing-equations", "conserve both the mass number, A"),
  pitfall: cue("balancing-equations", "beta minus raises Z by one"),
};

const A_COLOR = colors.neutronText;
const Z_COLOR = colors.protonText;

/** Scale that swells 1 → 1.1 → 1 over 20 frames from `start`. */
function emphasis(frame: number, start: number) {
  const t = interpolate(frame, [start, start + 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return 1 + 0.1 * Math.sin(Math.PI * t);
}

export function BalancingScene() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();
  const series = fadeIn(frame, CUES.series);
  const steps = progress(frame, CUES.series + 20, CUES.series + 50);
  const totals = dropped(frame, CUES.conserve + 15);
  const pitfall = popped(frame, fps, CUES.pitfall);
  const pulse = emphasis(frame, CUES.conserve + 35);
  return (
    <AbsoluteFill>
      <SceneTitle>Balancing A and Z</SceneTitle>
      <Text x={160} y={360} size={64} opacity={series}>
        <Nuclide a="238" z="92">
          U
        </Nuclide>
        <Arrow />
        <Nuclide a="206" z="82">
          Pb
        </Nuclide>
      </Text>
      <Text x={160} y={460} size={48} opacity={steps}>
        <span style={{ color: colors.alphaText, fontWeight: 700 }}>8 α</span>{" "}
        steps +{" "}
        <span style={{ color: colors.betaMinusText, fontWeight: 700 }}>
          6 β<Sup>−</Sup>
        </span>{" "}
        steps = 14 steps
      </Text>
      <Text x={160} y={540} size={48} opacity={steps}>
        <b style={{ color: A_COLOR }}>A:</b> 238 − (8 × 4) = 206
      </Text>
      <Text x={160} y={610} size={48} opacity={steps}>
        <b style={{ color: Z_COLOR }}>Z:</b> 92 − (8 × 2) + (6 × 1) = 82
      </Text>
      <Text x={1050} y={360} size={64} opacity={fadeIn(frame, CUES.conserve)}>
        <Nuclide a="14" z="6">
          C
        </Nuclide>
        <Arrow />
        <Nuclide a="14" z="7">
          N
        </Nuclide>
        <span style={{ margin: "0 0.35em" }}>+</span>
        <Nuclide a="0" z="−1" color={colors.betaMinusText}>
          e
        </Nuclide>
      </Text>
      <Text
        x={1050}
        y={460}
        size={48}
        opacity={totals.opacity}
        dy={-totals.dy * 0.8}
      >
        <b style={{ color: A_COLOR }}>A:</b> 14 = 14 + 0
      </Text>
      <Text
        x={1050}
        y={530}
        size={48}
        opacity={totals.opacity}
        dy={-totals.dy * 0.8}
      >
        <b style={{ color: Z_COLOR }}>Z:</b> 6 = 7 + (−1)
      </Text>
      <Text
        x={1580}
        y={495}
        size={40}
        weight={700}
        anchor="middle"
        color={colors.betaMinusText}
        opacity={totals.opacity}
        scale={pulse}
      >
        balanced
      </Text>
      <Pitfall
        top={600}
        left={1050}
        width={700}
        size={36}
        opacity={pitfall.opacity}
        scale={pitfall.scale}
      >
        Beta minus raises Z by one.
      </Pitfall>
    </AbsoluteFill>
  );
}
