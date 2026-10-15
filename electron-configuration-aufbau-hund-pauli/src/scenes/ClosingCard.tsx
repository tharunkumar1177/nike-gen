import { AbsoluteFill, spring, useVideoConfig } from "remotion";
import { fadeIn, lerp } from "../components/anim";
import { useSceneFrame } from "../components/SceneFrame";
import { colors, FONT, type, VIDEO } from "../theme";

const CARD = { left: 160, top: 230, width: 1600, height: 620 } as const;

const TAKEAWAYS = [
  { text: "Pauli: max two electrons per orbital, opposite spins.", at: 60 },
  { text: "Aufbau: fill lower-energy orbitals first.", at: 80 },
  { text: "Hund: fill equal-energy orbitals singly before pairing.", at: 100 },
  { text: "Notation: written by shell number, not filling order.", at: 120 },
];

export function ClosingCard() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();
  const rise = spring({
    frame: frame - 15,
    fps,
    config: { stiffness: 120, damping: 14, mass: 1 },
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
          padding: "70px 80px 0",
          background: colors.background,
          border: `8px solid ${colors.box}`,
          borderRadius: 24,
          transform: `translateY(${lerp(VIDEO.height - CARD.top, 0, rise)}px)`,
          fontFamily: FONT,
          color: colors.text,
        }}
      >
        <div
          style={{
            fontSize: type.subtitle,
            fontWeight: 700,
            lineHeight: 1,
            textAlign: "center",
          }}
        >
          Key Takeaways
        </div>
        <ul
          style={{
            margin: "56px 0 0",
            paddingLeft: 48,
            display: "flex",
            flexDirection: "column",
            gap: 42,
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
