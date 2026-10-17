import { AbsoluteFill, Html5Audio, staticFile } from "remotion";
import { SceneFrame } from "./components/SceneFrame";
import { BuildingScene } from "./scenes/BuildingScene";
import { ClosingCard } from "./scenes/ClosingCard";
import { ExampleScene } from "./scenes/ExampleScene";
import { PHOSPHORUS, VANADIUM } from "./scenes/examples";
import { OffsetsScene } from "./scenes/OffsetsScene";
import { OrderingScene } from "./scenes/OrderingScene";
import { SpecialScene } from "./scenes/SpecialScene";
import { colors, SCENES } from "./theme";

export function Lesson() {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      <Html5Audio src={staticFile("soundtrack.wav")} />
      <SceneFrame name="Ordering and groups" {...SCENES["ordering-groups"]}>
        <OrderingScene />
      </SceneFrame>
      <SceneFrame name="Building the blocks" {...SCENES["building-blocks"]}>
        <BuildingScene />
      </SceneFrame>
      <SceneFrame name="Hydrogen and helium" {...SCENES["special-cases"]}>
        <SpecialScene />
      </SceneFrame>
      <SceneFrame
        name="Offsets and exceptions"
        {...SCENES["offsets-exceptions"]}
      >
        <OffsetsScene />
      </SceneFrame>
      <SceneFrame name="Example: phosphorus" {...SCENES["example-phosphorus"]}>
        <ExampleScene example={PHOSPHORUS} />
      </SceneFrame>
      <SceneFrame name="Example: vanadium" {...SCENES["example-vanadium"]}>
        <ExampleScene example={VANADIUM} />
      </SceneFrame>
      <SceneFrame name="Key takeaways" {...SCENES["closing-card"]}>
        <ClosingCard />
      </SceneFrame>
    </AbsoluteFill>
  );
}
