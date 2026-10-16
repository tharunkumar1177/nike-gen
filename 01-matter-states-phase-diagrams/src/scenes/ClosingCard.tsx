import { useVideoConfig } from "remotion";
import { easeOut, lerp, pop, progress } from "../components/anim";
import { colors, FONT, type } from "../theme";

const TAKEAWAYS = [
  "Phase depends on temperature, pressure, and intermolecular forces.",
  "Plateaus show energy overcoming forces, not raising temperature.",
  "Boundary curves map exact states of two-phase equilibrium.",
];

/** `frame` is relative to the card's start (global frame 5100). */
export function ClosingCard({ frame }: { frame: number }) {
  const { fps } = useVideoConfig();
  const card = pop(frame, fps, 0);
  return (
    <div
      style={{
        position: "absolute",
        left: 360,
        top: 190,
        width: 1200,
        height: 700,
        boxSizing: "border-box",
        padding: "80px 80px 0",
        background: colors.background,
        borderRadius: 24,
        boxShadow: "0 16px 48px rgba(0,0,0,0.1)",
        opacity: Math.min(1, progress(frame, 0, 20)),
        transform: `translateY(${lerp(100, 0, card)}px)`,
        fontFamily: FONT,
        color: colors.text,
      }}
    >
      <div style={{ fontSize: type.subtitle, fontWeight: 700, lineHeight: 1 }}>
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
        {TAKEAWAYS.map((text, i) => {
          const shown = progress(frame, 30 + i * 15, 60 + i * 15, easeOut);
          return (
            <li
              key={text}
              style={{
                fontSize: type.body,
                fontWeight: 400,
                lineHeight: 1.25,
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
  );
}
