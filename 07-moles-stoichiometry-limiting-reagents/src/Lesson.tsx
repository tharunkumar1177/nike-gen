import type { ReactNode } from "react";
import { AbsoluteFill, Html5Audio, staticFile } from "remotion";
import { SceneFrame } from "./components/SceneFrame";
import { ClosingCard } from "./scenes/ClosingCard";
import { IdentifyLimitingScene } from "./scenes/IdentifyLimitingScene";
import { LimitingReagentScene } from "./scenes/LimitingReagentScene";
import { MolarMassScene } from "./scenes/MolarMassScene";
import { MoleScene } from "./scenes/MoleScene";
import { PercentPitfallScene } from "./scenes/PercentPitfallScene";
import { RatioScene } from "./scenes/RatioScene";
import { YieldScene } from "./scenes/YieldScene";
import { CLOSING, colors, SCENES, type NarratedScene } from "./theme";

const STEPS: { id: NarratedScene; name: string; scene: ReactNode }[] = [
  { id: "the-mole", name: "The mole", scene: <MoleScene /> },
  { id: "molar-mass-map", name: "Conversion map", scene: <MolarMassScene /> },
  { id: "mole-ratios", name: "Mole ratios", scene: <RatioScene /> },
  {
    id: "limiting-reagent",
    name: "Masses to moles",
    scene: <LimitingReagentScene />,
  },
  {
    id: "identifying-limiting",
    name: "Limiting reagent",
    scene: <IdentifyLimitingScene />,
  },
  {
    id: "theoretical-yield",
    name: "Theoretical yield",
    scene: <YieldScene />,
  },
  {
    id: "percent-yield-pitfalls",
    name: "Percent yield and pitfalls",
    scene: <PercentPitfallScene />,
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
