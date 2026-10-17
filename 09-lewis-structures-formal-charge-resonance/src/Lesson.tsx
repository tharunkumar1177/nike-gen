import { AbsoluteFill, Html5Audio, staticFile } from "remotion";
import { SceneFrame } from "./components/SceneFrame";
import { ClosingCard } from "./scenes/ClosingCard";
import { ConceptScene } from "./scenes/ConceptScene";
import { FormalChargeScene } from "./scenes/FormalChargeScene";
import { PitfallsScene } from "./scenes/PitfallsScene";
import { ProcedureScene } from "./scenes/ProcedureScene";
import { ResonanceScene } from "./scenes/ResonanceScene";
import { colors, SCENES } from "./theme";

export function Lesson() {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      <Html5Audio src={staticFile("soundtrack.wav")} />
      <SceneFrame name="Lewis structures" {...SCENES["concept-lewis"]}>
        <ConceptScene />
      </SceneFrame>
      <SceneFrame name="Procedure: HCN" {...SCENES["procedure-hcn"]}>
        <ProcedureScene />
      </SceneFrame>
      <SceneFrame name="Formal charge" {...SCENES["formal-charge-co2"]}>
        <FormalChargeScene />
      </SceneFrame>
      <SceneFrame name="Resonance" {...SCENES["resonance-o3"]}>
        <ResonanceScene />
      </SceneFrame>
      <SceneFrame name="Pitfalls" {...SCENES["pitfalls-exceptions"]}>
        <PitfallsScene />
      </SceneFrame>
      <SceneFrame name="Key takeaways" {...SCENES["closing-card"]}>
        <ClosingCard />
      </SceneFrame>
    </AbsoluteFill>
  );
}
