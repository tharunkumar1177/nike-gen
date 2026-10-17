import type { ReactNode } from "react";
import { AbsoluteFill, Html5Audio, staticFile } from "remotion";
import { SceneFrame } from "./components/SceneFrame";
import { BronstedScene } from "./scenes/BronstedScene";
import { BufferMechanismScene } from "./scenes/BufferMechanismScene";
import { BufferWaterScene } from "./scenes/BufferWaterScene";
import { ClosingCard } from "./scenes/ClosingCard";
import { IndicatorScene } from "./scenes/IndicatorScene";
import { StrengthScene } from "./scenes/StrengthScene";
import { TitrationScene } from "./scenes/TitrationScene";
import { WeakAcidScene } from "./scenes/WeakAcidScene";
import { CLOSING, colors, SCENES, type NarratedScene } from "./theme";

const STEPS: { id: NarratedScene; name: string; scene: ReactNode }[] = [
  {
    id: "bronsted-lowry-ph",
    name: "Brønsted–Lowry and pH",
    scene: <BronstedScene />,
  },
  { id: "ka-pka-strength", name: "Ka and pKa", scene: <StrengthScene /> },
  { id: "weak-acid-ice", name: "Weak acid pH", scene: <WeakAcidScene /> },
  {
    id: "buffer-mechanism",
    name: "Buffer mechanism",
    scene: <BufferMechanismScene />,
  },
  {
    id: "buffer-vs-water",
    name: "Buffer vs water",
    scene: <BufferWaterScene />,
  },
  { id: "titration-curve", name: "Titration curve", scene: <TitrationScene /> },
  { id: "indicators", name: "Indicators", scene: <IndicatorScene /> },
];

export function Lesson() {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      <Html5Audio src={staticFile("soundtrack.wav")} />
      {STEPS.map(({ id, name, scene }) => (
        <SceneFrame
          key={id}
          name={name}
          from={SCENES[id].from}
          to={SCENES[id].to}
        >
          {scene}
        </SceneFrame>
      ))}
      <SceneFrame name="Key takeaways" from={CLOSING.from} to={CLOSING.to}>
        <ClosingCard />
      </SceneFrame>
    </AbsoluteFill>
  );
}
