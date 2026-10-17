import type { ReactNode } from "react";
import { AbsoluteFill, Html5Audio, staticFile } from "remotion";
import { SceneFrame } from "./components/SceneFrame";
import { BalancingScene } from "./scenes/BalancingScene";
import { ClosingCard } from "./scenes/ClosingCard";
import { ElectrolysisScene } from "./scenes/ElectrolysisScene";
import { FreeEnergyScene } from "./scenes/FreeEnergyScene";
import { GalvanicCellScene } from "./scenes/GalvanicCellScene";
import { NernstScene } from "./scenes/NernstScene";
import { RedoxIntroScene } from "./scenes/RedoxIntroScene";
import { ReductionPotentialsScene } from "./scenes/ReductionPotentialsScene";
import { CLOSING, colors, SCENES, type NarratedScene } from "./theme";

const STEPS: { id: NarratedScene; name: string; scene: ReactNode }[] = [
  { id: "redox-intro", name: "Oxidation states", scene: <RedoxIntroScene /> },
  { id: "balancing", name: "Balancing redox", scene: <BalancingScene /> },
  { id: "galvanic-cell", name: "Galvanic cells", scene: <GalvanicCellScene /> },
  {
    id: "reduction-potentials",
    name: "Standard potentials",
    scene: <ReductionPotentialsScene />,
  },
  { id: "free-energy", name: "Free energy", scene: <FreeEnergyScene /> },
  { id: "nernst-equation", name: "Nernst equation", scene: <NernstScene /> },
  { id: "electrolysis", name: "Electrolysis", scene: <ElectrolysisScene /> },
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
