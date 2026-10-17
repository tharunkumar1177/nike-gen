import type { ReactNode } from "react";
import { AbsoluteFill, Html5Audio, staticFile } from "remotion";
import { SceneFrame } from "./components/SceneFrame";
import { ClosingCard } from "./scenes/ClosingCard";
import { CrossoverScene } from "./scenes/CrossoverScene";
import { EnthalpyEntropyScene } from "./scenes/EnthalpyEntropyScene";
import { EnthalpyScene } from "./scenes/EnthalpyScene";
import { EntropyScene } from "./scenes/EntropyScene";
import { GibbsExampleScene } from "./scenes/GibbsExampleScene";
import { GibbsScene } from "./scenes/GibbsScene";
import { HessScene } from "./scenes/HessScene";
import { PitfallsScene } from "./scenes/PitfallsScene";
import { SecondLawScene } from "./scenes/SecondLawScene";
import { SignCasesScene } from "./scenes/SignCasesScene";
import { CLOSING, colors, SCENES, type NarratedScene } from "./theme";

const STEPS: { id: NarratedScene; name: string; scene: ReactNode }[] = [
  {
    id: "system-surroundings-enthalpy",
    name: "System and enthalpy",
    scene: <EnthalpyScene />,
  },
  { id: "hess-law", name: "Hess's law", scene: <HessScene /> },
  { id: "entropy", name: "Entropy", scene: <EntropyScene /> },
  { id: "second-law", name: "Second law", scene: <SecondLawScene /> },
  {
    id: "gibbs-free-energy",
    name: "Gibbs free energy",
    scene: <GibbsScene />,
  },
  { id: "four-sign-cases", name: "Four sign cases", scene: <SignCasesScene /> },
  {
    id: "worked-example-enthalpy-entropy",
    name: "Ammonia: enthalpy and entropy",
    scene: <EnthalpyEntropyScene />,
  },
  {
    id: "worked-example-gibbs",
    name: "Ammonia: Gibbs free energy",
    scene: <GibbsExampleScene />,
  },
  {
    id: "crossover-temperature",
    name: "Crossover temperature",
    scene: <CrossoverScene />,
  },
  { id: "pitfalls", name: "Pitfalls", scene: <PitfallsScene /> },
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
