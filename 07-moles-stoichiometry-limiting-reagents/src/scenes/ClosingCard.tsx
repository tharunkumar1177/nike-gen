import { AbsoluteFill, useVideoConfig } from "remotion";
import { fadeIn, lerp, pop } from "../components/anim";
import { useSceneFrame } from "../components/SceneFrame";
import { colors, FONT, type, VIDEO } from "../theme";

const CARD = { left: 160, top: 200, width: 1600, height: 680 } as const;

const TAKEAWAYS = [
  { text: "Mole: an exact counting unit (Avogadro constant).", at: 60 },
  { text: "Molar mass links mass to moles.", at: 90 },
  { text: "Balanced equations give mole ratios.", at: 120 },
  { text: "The limiting reactant sets the theoretical yield.", at: 150 },
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
                key={text}
                style={{
                  fontSize: type.body,
                  lineHeight: 1.2,
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
