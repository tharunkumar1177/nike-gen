import type { ReactNode } from "react";
import { AbsoluteFill, useVideoConfig } from "remotion";
import { dropped, fadeIn, popped } from "../components/anim";
import { Nuclide } from "../components/Nuclide";
import { Pitfall } from "../components/Pitfall";
import { useSceneFrame } from "../components/SceneFrame";
import { SceneTitle } from "../components/SceneTitle";
import { StabilityChart } from "../components/StabilityChart";
import { Arrow, Sup, Text } from "../components/Text";
import { cue } from "../cues";
import { colors } from "../theme";

const CUES = {
  positron: cue("beta-decay-modes", "P E T scans use fluorine eighteen"),
  below: cue("beta-decay-modes", "Nuclei below the band are proton rich"),
  above: cue("beta-decay-modes", "Nuclei above the band are neutron rich"),
  pitfall: cue(
    "beta-decay-modes",
    "created in the decay, not taken from the shell",
  ),
};

function Equation({
  y,
  appear,
  mode,
  modeColor,
  children,
}: {
  y: number;
  appear: number;
  mode: ReactNode;
  modeColor: string;
  children: ReactNode;
}) {
  const { opacity, dy } = dropped(useSceneFrame(), appear);
  return (
    <>
      <Text
        x={120}
        y={y - 50}
        size={26}
        weight={700}
        color={modeColor}
        opacity={opacity}
        dy={dy}
      >
        {mode}
      </Text>
      <Text x={120} y={y} size={48} opacity={opacity} dy={dy}>
        {children}
      </Text>
    </>
  );
}

export function BetaScene() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();
  const chart = fadeIn(frame, CUES.below);
  const pitfall = popped(frame, fps, CUES.pitfall);
  return (
    <AbsoluteFill>
      <SceneTitle>Fixing a Bad Ratio</SceneTitle>
      <Equation
        y={370}
        appear={CUES.positron}
        mode={
          <>
            POSITRON EMISSION (β<Sup>+</Sup>)
          </>
        }
        modeColor={colors.positronText}
      >
        <Nuclide a="18" z="9">
          F
        </Nuclide>
        <Arrow />
        <Nuclide a="18" z="8">
          O
        </Nuclide>
        <span style={{ margin: "0 0.35em" }}>+</span>
        <Nuclide a="0" z="+1" color={colors.positronText}>
          e
        </Nuclide>
      </Equation>
      <Equation
        y={510}
        appear={CUES.below + 10}
        mode="ELECTRON CAPTURE (EC)"
        modeColor={colors.positronText}
      >
        <Nuclide a="37" z="18">
          Ar
        </Nuclide>
        <span style={{ margin: "0 0.35em" }}>+</span>
        <Nuclide a="0" z="−1">
          e
        </Nuclide>
        <Arrow />
        <Nuclide a="37" z="17">
          Cl
        </Nuclide>
      </Equation>
      <Equation
        y={650}
        appear={CUES.above + 10}
        mode={
          <>
            BETA-MINUS (β<Sup>−</Sup>)
          </>
        }
        modeColor={colors.betaMinusText}
      >
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
      </Equation>
      <StabilityChart
        axes={chart}
        band={chart}
        heavy={chart}
        below={fadeIn(frame, CUES.below + 10)}
        above={fadeIn(frame, CUES.above + 10)}
      />
      <Pitfall
        top={730}
        width={680}
        size={30}
        opacity={pitfall.opacity}
        scale={pitfall.scale}
      >
        The β<Sup>−</Sup> electron is created in the decay; it was not inside
        the neutron or taken from the electron shell.
      </Pitfall>
    </AbsoluteFill>
  );
}
