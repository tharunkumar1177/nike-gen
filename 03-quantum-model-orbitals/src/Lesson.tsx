import { AbsoluteFill, Html5Audio, staticFile } from "remotion";
import { SceneFrame } from "./components/SceneFrame";
import { ClosingCard } from "./scenes/ClosingCard";
import { DOrbitalsScene } from "./scenes/DOrbitalsScene";
import { FOrbitalsScene } from "./scenes/FOrbitalsScene";
import { NodesScene } from "./scenes/NodesScene";
import { NumbersScene } from "./scenes/NumbersScene";
import { OrbitsScene } from "./scenes/OrbitsScene";
import { POrbitalsScene } from "./scenes/POrbitalsScene";
import { SOrbitalsScene } from "./scenes/SOrbitalsScene";
import { colors, SCENES } from "./theme";

export function Lesson() {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      <Html5Audio src={staticFile("soundtrack.wav")} />
      <SceneFrame name="Orbits fail" {...SCENES.orbits}>
        <OrbitsScene />
      </SceneFrame>
      <SceneFrame name="Quantum numbers" {...SCENES.numbers}>
        <NumbersScene />
      </SceneFrame>
      <SceneFrame name="s orbitals and radial nodes" {...SCENES.sOrbitals}>
        <SOrbitalsScene />
      </SceneFrame>
      <SceneFrame name="p orbitals" {...SCENES.pOrbitals}>
        <POrbitalsScene />
      </SceneFrame>
      <SceneFrame name="d orbitals" {...SCENES.dOrbitals}>
        <DOrbitalsScene />
      </SceneFrame>
      <SceneFrame name="f orbitals" {...SCENES.fOrbitals}>
        <FOrbitalsScene />
      </SceneFrame>
      <SceneFrame name="Node counting" {...SCENES.nodes}>
        <NodesScene />
      </SceneFrame>
      <SceneFrame name="Closing card" {...SCENES.closing}>
        <ClosingCard />
      </SceneFrame>
    </AbsoluteFill>
  );
}
