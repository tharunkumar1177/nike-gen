import type { ReactNode } from "react";
import { AbsoluteFill, Html5Audio, staticFile } from "remotion";
import { SceneFrame } from "./components/SceneFrame";
import { ClosingCard } from "./scenes/ClosingCard";
import { ConcentrationScene } from "./scenes/ConcentrationScene";
import { DynamicScene } from "./scenes/DynamicScene";
import { IceScene } from "./scenes/IceScene";
import { KcScene } from "./scenes/KcScene";
import { MagnitudeScene } from "./scenes/MagnitudeScene";
import { QuotientScene } from "./scenes/QuotientScene";
import { TemperatureScene } from "./scenes/TemperatureScene";
import { VolumeScene } from "./scenes/VolumeScene";
import { CLOSING, colors, SCENES, type NarratedScene } from "./theme";

const STEPS: { id: NarratedScene; name: string; scene: ReactNode }[] = [
  {
    id: "dynamic-equilibrium",
    name: "Dynamic equilibrium",
    scene: <DynamicScene />,
  },
  { id: "kc-expression", name: "Equilibrium constant", scene: <KcScene /> },
  { id: "magnitude-of-k", name: "Magnitude of K", scene: <MagnitudeScene /> },
  { id: "ice-table", name: "ICE table", scene: <IceScene /> },
  {
    id: "reaction-quotient",
    name: "Reaction quotient",
    scene: <QuotientScene />,
  },
  {
    id: "le-chatelier-concentration",
    name: "Concentration stress",
    scene: <ConcentrationScene />,
  },
  {
    id: "le-chatelier-volume",
    name: "Volume and pressure",
    scene: <VolumeScene />,
  },
  {
    id: "temperature-catalyst",
    name: "Temperature and catalysts",
    scene: <TemperatureScene />,
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
