import type { ReactNode } from "react";
import { AbsoluteFill, Html5Audio, staticFile } from "remotion";
import { SceneFrame } from "./components/SceneFrame";
import { AlphaScene } from "./scenes/AlphaScene";
import { BalancingScene } from "./scenes/BalancingScene";
import { BetaScene } from "./scenes/BetaScene";
import { ClosingCard } from "./scenes/ClosingCard";
import { GammaScene } from "./scenes/GammaScene";
import { HalfLifeMathScene } from "./scenes/HalfLifeMathScene";
import { HalfLifeScene } from "./scenes/HalfLifeScene";
import { RadiocarbonScene } from "./scenes/RadiocarbonScene";
import { StabilityScene } from "./scenes/StabilityScene";
import { CLOSING, colors, SCENES, type NarratedScene } from "./theme";

const STEPS: { id: NarratedScene; name: string; scene: ReactNode }[] = [
  {
    id: "nuclear-stability",
    name: "Nuclear stability",
    scene: <StabilityScene />,
  },
  { id: "alpha-decay", name: "Alpha decay", scene: <AlphaScene /> },
  { id: "beta-decay-modes", name: "Beta decay modes", scene: <BetaScene /> },
  {
    id: "gamma-and-penetration",
    name: "Gamma and shielding",
    scene: <GammaScene />,
  },
  {
    id: "balancing-equations",
    name: "Balancing equations",
    scene: <BalancingScene />,
  },
  {
    id: "half-life-concept",
    name: "Half-life concept",
    scene: <HalfLifeScene />,
  },
  {
    id: "half-life-math",
    name: "Half-life equation",
    scene: <HalfLifeMathScene />,
  },
  {
    id: "radiocarbon-dating",
    name: "Radiocarbon dating",
    scene: <RadiocarbonScene />,
  },
];

export function Lesson() {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      <Html5Audio src={staticFile("soundtrack.wav")} />
      {STEPS.map(({ id, name, scene }) => (
        <SceneFrame
          key={id}
          name={name}
          from={SCENES[id].from}
          to={SCENES[id].to}
        >
          {scene}
        </SceneFrame>
      ))}
      <SceneFrame name="Key takeaways" from={CLOSING.from} to={CLOSING.to}>
        <ClosingCard />
      </SceneFrame>
    </AbsoluteFill>
  );
}
