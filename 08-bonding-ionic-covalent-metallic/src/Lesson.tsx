import { AbsoluteFill, Html5Audio, staticFile } from "remotion";
import { SceneFrame } from "./components/SceneFrame";
import { ClosingCard } from "./scenes/ClosingCard";
import { ConceptScene } from "./scenes/ConceptScene";
import { CovalentScene } from "./scenes/CovalentScene";
import { IonicScene } from "./scenes/IonicScene";
import { MetallicScene } from "./scenes/MetallicScene";
import { PropertiesScene } from "./scenes/PropertiesScene";
import { ScaleScene } from "./scenes/ScaleScene";
import { colors, SCENES } from "./theme";

export function Lesson() {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      <Html5Audio src={staticFile("soundtrack.wav")} />
      <SceneFrame name="What a bond is" {...SCENES["concept-energy"]}>
        <ConceptScene />
      </SceneFrame>
      <SceneFrame name="Covalent bonding" {...SCENES["covalent-shared"]}>
        <CovalentScene />
      </SceneFrame>
      <SceneFrame name="Ionic bonding" {...SCENES["ionic-lattice"]}>
        <IonicScene />
      </SceneFrame>
      <SceneFrame name="Metallic bonding" {...SCENES["metallic-sea"]}>
        <MetallicScene />
      </SceneFrame>
      <SceneFrame
        name="Electronegativity difference"
        {...SCENES["electronegativity-scale"]}
      >
        <ScaleScene />
      </SceneFrame>
      <SceneFrame
        name="Properties and pitfalls"
        {...SCENES["properties-pitfalls"]}
      >
        <PropertiesScene />
      </SceneFrame>
      <SceneFrame name="Key takeaways" {...SCENES["closing-card"]}>
        <ClosingCard />
      </SceneFrame>
    </AbsoluteFill>
  );
}
