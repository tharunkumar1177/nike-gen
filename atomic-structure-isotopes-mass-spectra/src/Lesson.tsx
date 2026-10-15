import { AbsoluteFill, Html5Audio, staticFile } from "remotion";
import { SceneFrame } from "./components/SceneFrame";
import { AverageScene } from "./scenes/AverageScene";
import { ClosingCard } from "./scenes/ClosingCard";
import { IsotopesScene } from "./scenes/IsotopesScene";
import { ParticlesScene } from "./scenes/ParticlesScene";
import { SpectrometerScene } from "./scenes/SpectrometerScene";
import { SpectrumScene } from "./scenes/SpectrumScene";
import { colors, SCENES } from "./theme";

export function Lesson() {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      <Html5Audio src={staticFile("soundtrack.wav")} />
      <SceneFrame name="Subatomic particles" {...SCENES.particles}>
        <ParticlesScene />
      </SceneFrame>
      <SceneFrame name="Isotopes" {...SCENES.isotopes}>
        <IsotopesScene />
      </SceneFrame>
      <SceneFrame name="Mass spectrometer" {...SCENES.spectrometer}>
        <SpectrometerScene />
      </SceneFrame>
      <SceneFrame name="Mass spectrum" {...SCENES.spectrum}>
        <SpectrumScene />
      </SceneFrame>
      <SceneFrame name="Average atomic mass" {...SCENES.average}>
        <AverageScene />
      </SceneFrame>
      <SceneFrame name="Key takeaways" {...SCENES.closing}>
        <ClosingCard />
      </SceneFrame>
    </AbsoluteFill>
  );
}
