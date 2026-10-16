import { AbsoluteFill, Html5Audio, staticFile } from "remotion";
import { SceneFrame } from "./components/SceneFrame";
import { ChangesScene } from "./scenes/ChangesScene";
import { DiagramScene } from "./scenes/DiagramScene";
import { HeatingScene } from "./scenes/HeatingScene";
import { IntroScene } from "./scenes/IntroScene";
import { StatesScene } from "./scenes/StatesScene";
import { colors, SCENES } from "./theme";

export function Lesson() {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      <Html5Audio src={staticFile("soundtrack.wav")} />
      <SceneFrame name="Intro" {...SCENES.intro}>
        <IntroScene />
      </SceneFrame>
      <SceneFrame name="States" {...SCENES.states}>
        <StatesScene />
      </SceneFrame>
      <SceneFrame name="Phase changes" {...SCENES.changes}>
        <ChangesScene />
      </SceneFrame>
      <SceneFrame name="Heating curve" {...SCENES.heating}>
        <HeatingScene />
      </SceneFrame>
      <SceneFrame name="Phase diagrams" {...SCENES.diagram}>
        <DiagramScene />
      </SceneFrame>
    </AbsoluteFill>
  );
}
