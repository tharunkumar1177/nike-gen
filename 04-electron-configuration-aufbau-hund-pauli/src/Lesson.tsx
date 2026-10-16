import { AbsoluteFill, Html5Audio, staticFile } from "remotion";
import { SceneFrame } from "./components/SceneFrame";
import { AufbauScene } from "./scenes/AufbauScene";
import { ClosingCard } from "./scenes/ClosingCard";
import { ExceptionsScene } from "./scenes/ExceptionsScene";
import { HundScene } from "./scenes/HundScene";
import { NotationScene } from "./scenes/NotationScene";
import { PauliScene } from "./scenes/PauliScene";
import { ShorthandScene } from "./scenes/ShorthandScene";
import { colors, SCENES } from "./theme";

export function Lesson() {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      <Html5Audio src={staticFile("soundtrack.wav")} />
      <SceneFrame name="Orbitals and Pauli" {...SCENES["orbitals-pauli"]}>
        <PauliScene />
      </SceneFrame>
      <SceneFrame name="Aufbau diagonal rule" {...SCENES["aufbau-diagonal"]}>
        <AufbauScene />
      </SceneFrame>
      <SceneFrame name="Hund's rule" {...SCENES["hunds-rule"]}>
        <HundScene />
      </SceneFrame>
      <SceneFrame name="Notation" {...SCENES["notation-order"]}>
        <NotationScene />
      </SceneFrame>
      <SceneFrame name="Shorthand and ions" {...SCENES["shorthand-ions"]}>
        <ShorthandScene />
      </SceneFrame>
      <SceneFrame name="Chromium and copper" {...SCENES["chromium-copper"]}>
        <ExceptionsScene />
      </SceneFrame>
      <SceneFrame name="Key takeaways" {...SCENES["closing-card"]}>
        <ClosingCard />
      </SceneFrame>
    </AbsoluteFill>
  );
}
