import type { ReactNode } from "react";
import { AbsoluteFill } from "remotion";
import { dropped, progress } from "../components/anim";
import { useSceneFrame } from "../components/SceneFrame";
import { Sup, Text } from "../components/Text";
import { CLOSING, colors } from "../theme";

const BULLET_X = 560;

const TAKEAWAYS: { text: ReactNode; at: number; y: number }[] = [
  { text: "Track A and Z", at: 30, y: 420 },
  {
    text: (
      <>
        β<Sup>−</Sup> raises Z by 1
      </>
    ),
    at: 60,
    y: 520,
  },
  { text: "γ changes neither", at: 90, y: 620 },
  {
    text: "Half-life is unaffected by heat, pressure and amount",
    at: 120,
    y: 720,
  },
  { text: "Each half-life halves the remainder", at: 150, y: 820 },
];

const FADE_OUT = 30;

export function ClosingCard() {
  const frame = useSceneFrame();
  const length = CLOSING.to - CLOSING.from;
  const blackout = progress(frame, length - FADE_OUT, length);
  return (
    <AbsoluteFill>
      <Text x={960} y={300} size={80} weight={700} anchor="middle">
        Key Takeaways
      </Text>
      {TAKEAWAYS.map(({ text, at, y }) => {
        const { opacity, dy } = dropped(frame, at);
        return (
          <div key={at}>
            <div
              style={{
                position: "absolute",
                left: BULLET_X - 40,
                top: y - 9 - dy * (20 / 24),
                width: 18,
                height: 18,
                borderRadius: "50%",
                background: colors.halfLife,
                opacity,
              }}
            />
            <Text
              x={BULLET_X}
              y={y}
              size={48}
              opacity={opacity}
              dy={-dy * (20 / 24)}
            >
              {text}
            </Text>
          </div>
        );
      })}
      <AbsoluteFill style={{ backgroundColor: "#000000", opacity: blackout }} />
    </AbsoluteFill>
  );
}
