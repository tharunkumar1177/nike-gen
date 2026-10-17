import { AbsoluteFill, Html5Audio, staticFile } from "remotion";
import { SceneFrame } from "./components/SceneFrame";
import { FillingScene } from "./scenes/FillingScene";
import { HookScene } from "./scenes/HookScene";
import { LcaoScene } from "./scenes/LcaoScene";
import { MixingScene } from "./scenes/MixingScene";
import { Period2Scene } from "./scenes/Period2Scene";
import { PitfallsScene } from "./scenes/PitfallsScene";
import { SeriesScene } from "./scenes/SeriesScene";
import { TakeawaysScene } from "./scenes/TakeawaysScene";
import { colors, SCENES } from "./theme";

export function Lesson() {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      <Html5Audio src={staticFile("soundtrack.wav")} />
      <SceneFrame name="Liquid oxygen hook" {...SCENES["hook-o2-magnet"]}>
        <HookScene />
      </SceneFrame>
      <SceneFrame name="LCAO and bond order" {...SCENES["lcao-bond-order"]}>
        <LcaoScene />
      </SceneFrame>
      <SceneFrame name="Period-2 orbitals" {...SCENES["period-2-orbitals"]}>
        <Period2Scene />
      </SceneFrame>
      <SceneFrame name="s-p mixing" {...SCENES["sp-mixing"]}>
        <MixingScene />
      </SceneFrame>
      <SceneFrame name="Filling O2 and B2" {...SCENES["filling-o2-b2"]}>
        <FillingScene />
      </SceneFrame>
      <SceneFrame
        name="O2 series worked example"
        {...SCENES["worked-example-o2-series"]}
      >
        <SeriesScene />
      </SceneFrame>
      <SceneFrame name="Pitfalls" {...SCENES.pitfalls}>
        <PitfallsScene />
      </SceneFrame>
      <SceneFrame name="Key takeaways" {...SCENES["key-takeaways"]}>
        <TakeawaysScene />
      </SceneFrame>
    </AbsoluteFill>
  );
}
