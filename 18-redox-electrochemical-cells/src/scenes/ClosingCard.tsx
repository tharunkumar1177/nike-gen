import { AbsoluteFill } from "remotion";
import { dropped } from "../components/anim";
import { useSceneFrame } from "../components/SceneFrame";
import { TitleBand } from "../components/TitleBand";
import { colors, FONT, SAFE, VIDEO } from "../theme";

const CARD = { top: 300, rowHeight: 104, padding: 40 } as const;

const TAKEAWAYS: { text: string; color: string }[] = [
  {
    text: "OIL RIG: oxidation is loss (anode), reduction is gain (cathode).",
    color: colors.oxidation,
  },
  {
    text: "Electrons flow through the wire; ions flow through the salt bridge.",
    color: colors.electron,
  },
  {
    text: "E° is measured against the SHE and is intensive.",
    color: colors.cation,
  },
  {
    text: "ΔG° = −nFE°; Nernst tracks the falling voltage to 0 V at equilibrium.",
    color: colors.reduction,
  },
  {
    text: "Electrolysis uses an external source to drive a non-spontaneous reaction.",
    color: colors.anion,
  },
];

export function ClosingCard() {
  const frame = useSceneFrame();
  const card = dropped(frame, 15);
  return (
    <AbsoluteFill>
      <TitleBand>Key Takeaways</TitleBand>
      <div
        style={{
          position: "absolute",
          left: SAFE,
          top: CARD.top + card.dy,
          width: VIDEO.width - 2 * SAFE,
          boxSizing: "border-box",
          padding: CARD.padding,
          background: colors.panel,
          border: `2px solid ${colors.panelStroke}`,
          borderRadius: 24,
          fontFamily: FONT,
          fontSize: 34,
          lineHeight: 1.3,
          color: colors.text,
          opacity: card.opacity,
        }}
      >
        {TAKEAWAYS.map(({ text, color }, i) => {
          const row = dropped(frame, 30 + i * 10);
          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 28,
                height: CARD.rowHeight,
                opacity: row.opacity,
                transform: `translateY(${row.dy}px)`,
              }}
            >
              <div
                style={{
                  width: 12,
                  height: 56,
                  borderRadius: 6,
                  background: color,
                  flexShrink: 0,
                }}
              />
              <div>{text}</div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
}
