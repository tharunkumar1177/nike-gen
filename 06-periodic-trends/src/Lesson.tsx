import { AbsoluteFill, Html5Audio, staticFile } from "remotion";
import { SceneFrame } from "./components/SceneFrame";
import { AffinityScene } from "./scenes/AffinityScene";
import { ClosingCard } from "./scenes/ClosingCard";
import { ElectronegativityScene } from "./scenes/ElectronegativityScene";
import { IonizationScene } from "./scenes/IonizationScene";
import { ModelScene } from "./scenes/ModelScene";
import { RadiusScene } from "./scenes/RadiusScene";
import { WorkedExampleScene } from "./scenes/WorkedExampleScene";
import { colors } from "./theme";

export function Lesson() {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      <Html5Audio src={staticFile("soundtrack.wav")} />
      <SceneFrame id="model-zeff" name="Coulomb attraction and Zeff">
        <ModelScene />
      </SceneFrame>
      <SceneFrame id="atomic-radius" name="Atomic radius">
        <RadiusScene />
      </SceneFrame>
      <SceneFrame id="ionization-energy" name="Ionization energy">
        <IonizationScene />
      </SceneFrame>
      <SceneFrame id="electron-affinity" name="Electron affinity">
        <AffinityScene />
      </SceneFrame>
      <SceneFrame id="electronegativity" name="Electronegativity">
        <ElectronegativityScene />
      </SceneFrame>
      <SceneFrame id="worked-example" name="Worked example">
        <WorkedExampleScene />
      </SceneFrame>
      <SceneFrame id="closing-card" name="Key takeaways">
        <ClosingCard />
      </SceneFrame>
    </AbsoluteFill>
  );
}
