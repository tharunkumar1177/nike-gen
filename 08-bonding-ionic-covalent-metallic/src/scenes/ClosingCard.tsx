import { spring, useVideoConfig } from "remotion";
import { fadeIn } from "../components/anim";
import { useSceneFrame } from "../components/SceneFrame";
import { Text } from "../components/Text";
import { colors, FONT } from "../theme";

const BULLETS = [
  {
    lead: "Covalent",
    rest: "atoms share electron pairs.",
    color: colors.covalentText,
  },
  {
    lead: "Ionic",
    rest: "a lattice of oppositely charged ions.",
    color: colors.ionicText,
  },
  {
    lead: "Metallic",
    rest: "cations in a sea of delocalized electrons.",
    color: colors.metallicText,
  },
  {
    lead: "ΔEN",
    rest: "only a rough guide to bond type.",
    color: colors.text,
  },
];

export function ClosingCard() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();
  const card = spring({
    frame,
    fps,
    config: { mass: 1, stiffness: 60, damping: 14 },
  });

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: 160,
          top: 240,
          width: 1600,
          height: 600,
          boxSizing: "border-box",
          backgroundColor: "#F9FAFB",
          border: "4px solid #E5E7EB",
          borderRadius: 24,
          boxShadow: "0 12px 32px rgba(28, 28, 30, 0.08)",
          opacity: Math.min(1, card * 1.5),
          transform: `translateY(${(1 - card) * 40}px) scale(${0.96 + 0.04 * card})`,
        }}
      />
      <Text x={960} y={330} size={64} weight={700} opacity={fadeIn(frame, 0)}>
        Key Takeaways
      </Text>
      {BULLETS.map((bullet, i) => {
        const t = fadeIn(frame, 20 + i * 20);
        if (t <= 0) return null;
        return (
          <div
            key={bullet.lead}
            style={{
              position: "absolute",
              left: 240,
              top: 460 + i * 85,
              transform: `translateY(calc(-50% + ${(1 - t) * 10}px))`,
              fontFamily: FONT,
              fontSize: 48,
              lineHeight: 1.2,
              color: colors.text,
              opacity: t,
              whiteSpace: "nowrap",
            }}
          >
            <span style={{ fontWeight: 700, color: bullet.color }}>
              {bullet.lead}:
            </span>{" "}
            {bullet.rest}
          </div>
        );
      })}
    </>
  );
}
