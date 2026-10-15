import { AbsoluteFill, spring, useVideoConfig } from "remotion";
import { fadeIn, lerp } from "../components/anim";
import { useSceneFrame } from "../components/SceneFrame";
import { colors, FONT, type, VIDEO } from "../theme";

const CARD = { left: 360, top: 190, width: 1200, height: 700 } as const;

const TAKEAWAYS = [
  {
    text: "An atom is a dense nucleus of protons and neutrons surrounded by electrons.",
    at: 60,
  },
  {
    text: "Isotopes share an atomic number but have different mass numbers.",
    at: 90,
  },
  {
    text: "Atomic weight is the weighted average of naturally occurring isotopic masses.",
    at: 120,
  },
];

export function ClosingCard() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();
  const rise = spring({
    frame,
    fps,
    config: { stiffness: 50, damping: 12, mass: 1 },
  });
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
          padding: "80px 80px 0",
          background: colors.background,
          border: `2px solid ${colors.grid}`,
          borderRadius: 24,
          boxShadow: "0 12px 24px rgba(28, 28, 30, 0.1)",
          transform: `translateY(${lerp(VIDEO.height - CARD.top, 0, rise)}px)`,
          fontFamily: FONT,
          color: colors.text,
        }}
      >
        <div
          style={{ fontSize: type.subtitle, fontWeight: 700, lineHeight: 1 }}
        >
          Key Takeaways
        </div>
        <ul
          style={{
            margin: "56px 0 0",
            paddingLeft: 48,
            display: "flex",
            flexDirection: "column",
            gap: 28,
          }}
        >
          {TAKEAWAYS.map(({ text, at }) => {
            const shown = fadeIn(frame, at);
            return (
              <li
                key={text}
                style={{
                  fontSize: type.body,
                  fontWeight: 400,
                  lineHeight: 1.2,
                  opacity: shown,
                  transform: `translateX(${lerp(-20, 0, shown)}px)`,
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
