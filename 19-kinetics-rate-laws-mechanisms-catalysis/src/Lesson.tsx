import type { ReactNode } from "react";
import { AbsoluteFill, Html5Audio, staticFile } from "remotion";
import { SceneFrame } from "./components/SceneFrame";
import { Arrow, F } from "./components/Text";
import { CatalysisScene } from "./scenes/CatalysisScene";
import { ClosingCard } from "./scenes/ClosingCard";
import { CollisionScene } from "./scenes/CollisionScene";
import { InitialRatesScene } from "./scenes/InitialRatesScene";
import { MechanismScene } from "./scenes/MechanismScene";
import { RatesScene } from "./scenes/RatesScene";
import { CLOSING, colors, SCENES, type NarratedScene } from "./theme";

const STEPS: {
  id: NarratedScene;
  title: string;
  subtitle?: ReactNode;
  scene: ReactNode;
}[] = [
  {
    id: "rates-and-rate-laws",
    title: "Rates and Rate Laws",
    scene: <RatesScene />,
  },
  {
    id: "initial-rates",
    title: "Method of Initial Rates",
    subtitle: (
      <>
        <F>2 NO + Cl2</F>
        <Arrow />
        <F>2 NOCl</F>
      </>
    ),
    scene: <InitialRatesScene />,
  },
  {
    id: "collision-theory",
    title: "Collision Theory & Arrhenius",
    scene: <CollisionScene />,
  },
  {
    id: "reaction-mechanisms",
    title: "Reaction Mechanisms",
    subtitle: "The rate-determining step",
    scene: <MechanismScene />,
  },
  { id: "catalysis", title: "Catalysis", scene: <CatalysisScene /> },
];

export function Lesson() {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      <Html5Audio src={staticFile("soundtrack.wav")} />
      {STEPS.map(({ id, title, subtitle, scene }) => (
        <SceneFrame
          key={id}
          title={title}
          subtitle={subtitle}
          from={SCENES[id].from}
          to={SCENES[id].to}
        >
          {scene}
        </SceneFrame>
      ))}
      <SceneFrame title="Key Takeaways" from={CLOSING.from} to={CLOSING.to}>
        <ClosingCard />
      </SceneFrame>
    </AbsoluteFill>
  );
}
