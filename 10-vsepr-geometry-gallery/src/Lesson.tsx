import { AbsoluteFill, Html5Audio, staticFile } from "remotion";
import { SceneFrame } from "./components/SceneFrame";
import { ClosingCard } from "./scenes/ClosingCard";
import { ConceptScene } from "./scenes/ConceptScene";
import { PitfallsScene } from "./scenes/PitfallsScene";
import { ProcedureScene } from "./scenes/ProcedureScene";
import { Sn24Scene } from "./scenes/Sn24Scene";
import { Sn5Scene } from "./scenes/Sn5Scene";
import { Sn6Scene } from "./scenes/Sn6Scene";
import { colors, SCENES } from "./theme";

export function Lesson() {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      <Html5Audio src={staticFile("soundtrack.wav")} />
      <SceneFrame name="Electron domains" {...SCENES["concept-hero"]}>
        <ConceptScene />
      </SceneFrame>
      <SceneFrame name="Six steps" {...SCENES["procedure-steps"]}>
        <ProcedureScene />
      </SceneFrame>
      <SceneFrame name="Steric numbers 2-4" {...SCENES["sn-2-4-gallery"]}>
        <Sn24Scene />
      </SceneFrame>
      <SceneFrame name="Steric number 5" {...SCENES["sn-5-family"]}>
        <Sn5Scene />
      </SceneFrame>
      <SceneFrame name="Steric number 6" {...SCENES["sn-6-family"]}>
        <Sn6Scene />
      </SceneFrame>
      <SceneFrame name="Pitfalls" {...SCENES.pitfalls}>
        <PitfallsScene />
      </SceneFrame>
      <SceneFrame name="Key takeaways" {...SCENES["closing-card"]}>
        <ClosingCard />
      </SceneFrame>
    </AbsoluteFill>
  );
}
