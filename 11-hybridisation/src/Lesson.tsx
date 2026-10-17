import { AbsoluteFill, Html5Audio, staticFile } from "remotion";
import { SceneFrame } from "./components/SceneFrame";
import { ClosingCard } from "./scenes/ClosingCard";
import { ExpandedScene } from "./scenes/ExpandedScene";
import { PiBondScene } from "./scenes/PiBondScene";
import { PitfallsScene } from "./scenes/PitfallsScene";
import { ProblemScene } from "./scenes/ProblemScene";
import { Sp3Scene } from "./scenes/Sp3Scene";
import { WorkedExampleScene } from "./scenes/WorkedExampleScene";
import { colors } from "./theme";

export function Lesson() {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      <Html5Audio src={staticFile("soundtrack.wav")} />
      <SceneFrame id="problem-methane" name="The methane problem">
        <ProblemScene />
      </SceneFrame>
      <SceneFrame id="sp3-model" name="sp3 model">
        <Sp3Scene />
      </SceneFrame>
      <SceneFrame id="sp2-sp-pi-bonds" name="sp2, sp and pi bonds">
        <PiBondScene />
      </SceneFrame>
      <SceneFrame id="expanded-octet" name="Five and six domains">
        <ExpandedScene />
      </SceneFrame>
      <SceneFrame id="worked-example" name="Worked example">
        <WorkedExampleScene />
      </SceneFrame>
      <SceneFrame id="pitfalls" name="Pitfalls">
        <PitfallsScene />
      </SceneFrame>
      <SceneFrame id="closing-card" name="Key takeaways">
        <ClosingCard />
      </SceneFrame>
    </AbsoluteFill>
  );
}
