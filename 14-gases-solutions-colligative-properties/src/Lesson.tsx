import type { ReactNode } from "react";
import { AbsoluteFill, Html5Audio, staticFile } from "remotion";
import { SceneFrame } from "./components/SceneFrame";
import { ClosingCard } from "./scenes/ClosingCard";
import { ColligativeScene } from "./scenes/ColligativeScene";
import { IdealGasScene } from "./scenes/IdealGasScene";
import { MolalityScene } from "./scenes/MolalityScene";
import { OsmosisScene } from "./scenes/OsmosisScene";
import { PhaseDiagramScene } from "./scenes/PhaseDiagramScene";
import { PitfallsScene } from "./scenes/PitfallsScene";
import { RealGasScene } from "./scenes/RealGasScene";
import { VapourPressureScene } from "./scenes/VapourPressureScene";
import { WorkedExampleScene } from "./scenes/WorkedExampleScene";
import { CLOSING, colors, SCENES, type NarratedScene } from "./theme";

const STEPS: { id: NarratedScene; name: string; scene: ReactNode }[] = [
  { id: "ideal-gas-law", name: "Ideal gas law", scene: <IdealGasScene /> },
  { id: "real-gases", name: "Real gases", scene: <RealGasScene /> },
  {
    id: "molality-vs-molarity",
    name: "Molality vs molarity",
    scene: <MolalityScene />,
  },
  {
    id: "colligative-properties",
    name: "Colligative properties",
    scene: <ColligativeScene />,
  },
  {
    id: "vapour-pressure",
    name: "Vapour-pressure lowering",
    scene: <VapourPressureScene />,
  },
  {
    id: "boiling-freezing-points",
    name: "Boiling and freezing points",
    scene: <PhaseDiagramScene />,
  },
  {
    id: "worked-example-freezing",
    name: "Worked example",
    scene: <WorkedExampleScene />,
  },
  {
    id: "osmosis-osmotic-pressure",
    name: "Osmotic pressure",
    scene: <OsmosisScene />,
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
