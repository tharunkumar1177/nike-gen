import type { ReactNode } from "react";
import { AbsoluteFill, useVideoConfig } from "remotion";
import { fadeIn, lerp, pop } from "../components/anim";
import { useSceneFrame } from "../components/SceneFrame";
import { Sub } from "../components/Text";
import { colors, FONT, type, VIDEO } from "../theme";

const CARD = { left: 160, top: 180, width: 1600, height: 720 } as const;

const TAKEAWAYS: { text: ReactNode; at: number }[] = [
  {
    text: "A weak acid's equivalence point is above pH 7, not at pH 7.",
    at: 60,
  },
  {
    text: "Buffers resist pH change but do not hold pH perfectly constant.",
    at: 90,
  },
  {
    text: (<>At half-equivalence, pH = pK<Sub>a</Sub>.</>),
    at: 120,
  },
  {
    text: (<>Strong is not concentrated, and a higher pK<Sub>a</Sub> means a weaker acid.</>),
    at: 150,
  },
];

export function ClosingCard() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();
  const rise = pop(frame, fps, 30);
  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: CARD.left,
          top: CARD.top,
          width: CARD.width,
          height: CARD.height,
          boxSizing: "border-box",
          padding: "64px 80px 0",
          background: colors.box,
          border: `3px solid ${colors.muted}`,
          borderRadius: 24,
          transform: `translateY(${lerp(VIDEO.height - CARD.top, 0, rise)}px)`,
          fontFamily: FONT,
          color: colors.text,
        }}
      >
        <div style={{ fontSize: type.title, fontWeight: 700, lineHeight: 1 }}>
          Key Takeaways
        </div>
        <ul
          style={{
            margin: "48px 0 0",
            paddingLeft: 48,
            display: "flex",
            flexDirection: "column",
            gap: 32,
          }}
        >
          {TAKEAWAYS.map(({ text, at }) => {
            const shown = fadeIn(frame, at);
            return (
              <li
                key={at}
                style={{
                  fontSize: 40,
                  lineHeight: 1.25,
                  opacity: shown,
                  transform: `translateY(${lerp(20, 0, shown)}px)`,
                }}
              >
                {text}
              </li>
            );
          })}
        </ul>
      </div>
    </AbsoluteFill>
  );
}
