import type { ReactNode } from "react";
import { AbsoluteFill, Html5Audio, staticFile } from "remotion";
import { SceneFrame } from "./components/SceneFrame";
import { ClosingCard } from "./scenes/ClosingCard";
import { DipoleScene } from "./scenes/DipoleScene";
import { DispersionScene } from "./scenes/DispersionScene";
import { HydrogenBondScene } from "./scenes/HydrogenBondScene";
import { IntraInterScene } from "./scenes/IntraInterScene";
import { PitfallsScene } from "./scenes/PitfallsScene";
import { TrendsScene } from "./scenes/TrendsScene";
import { WorkedExampleScene } from "./scenes/WorkedExampleScene";
import { CLOSING, colors, SCENES, type NarratedScene } from "./theme";

const STEPS: { id: NarratedScene; name: string; scene: ReactNode }[] = [
  {
    id: "intra-vs-inter",
    name: "Intra vs inter",
    scene: <IntraInterScene />,
  },
  {
    id: "london-dispersion",
    name: "London dispersion",
    scene: <DispersionScene />,
  },
  { id: "dipole-dipole", name: "Dipole-dipole", scene: <DipoleScene /> },
  {
    id: "hydrogen-bonding",
    name: "Hydrogen bonding",
    scene: <HydrogenBondScene />,
  },
  { id: "property-trends", name: "Property trends", scene: <TrendsScene /> },
  {
    id: "worked-example",
    name: "Worked example",
    scene: <WorkedExampleScene />,
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
