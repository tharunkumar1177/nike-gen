import { AbsoluteFill, spring, useVideoConfig } from "remotion";
import { fadeIn, lerp } from "../components/anim";
import { useSceneFrame } from "../components/SceneFrame";
import { colors, FONT, type } from "../theme";

const CARD = { left: 160, top: 230, width: 1600, height: 620 } as const;

const TAKEAWAYS = [
  { text: "Rows are periods (n); columns are groups (1–18).", at: 40 },
  { text: "Blocks (s, p, d, f) show the subshell being filled.", at: 60 },
  { text: "Offsets: d fills (n−1), f fills (n−2).", at: 80 },
  { text: "Read configurations from the preceding noble gas.", at: 100 },
];

export function ClosingCard() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();
  const rise = spring({
    frame: frame - 15,
    fps,
    config: { stiffness: 100, damping: 14, mass: 1 },
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
          padding: "60px 80px 0",
          background: colors.background,
          border: `3px solid ${colors.axis}`,
          borderRadius: 24,
          opacity: Math.min(1, rise * 2),
          transform: `translateY(${lerp(70, 0, rise)}px)`,
          fontFamily: FONT,
          color: colors.text,
        }}
      >
        <div
          style={{
            fontSize: type.subtitle,
            fontWeight: 500,
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
