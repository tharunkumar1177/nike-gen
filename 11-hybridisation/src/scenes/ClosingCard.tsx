import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, lerp, pop } from "../components/anim";
import { Box } from "../components/Panels";
import { colors } from "../theme";

const CARD_AT = 15;
const FIRST_BULLET_AT = 60;
const BULLET_STEP = 20;

const TAKEAWAYS = [
  "Hybridisation: bookkeeping model matching observed geometries.",
  "Domains set hybrids: 2 = sp, 3 = sp², 4 = sp³.",
  "σ bonds: end-to-end. π bonds: side-by-side.",
  "sp³d/sp³d² are textbook labels; d orbitals contribute little.",
];

export function ClosingCard() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const card = pop(frame, fps, CARD_AT);
  return (
    <AbsoluteFill>
      <Box
        x={160}
        y={210}
        width={1600}
        height={660}
        border={colors.lonePair}
        opacity={Math.min(1, card)}
        rise={lerp(80, 0, card)}
        style={{ borderWidth: 8, borderRadius: 24 }}
      >
        <div
          style={{
            position: "absolute",
            top: 60,
            width: "100%",
            textAlign: "center",
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.2,
          }}
        >
          Key Takeaways
        </div>
        {TAKEAWAYS.map((text, i) => {
          const shown = fadeIn(frame, FIRST_BULLET_AT + i * BULLET_STEP);
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: 72,
                top: 185 + i * 90,
                fontSize: 44,
                lineHeight: 1.2,
                whiteSpace: "nowrap",
                opacity: shown,
                transform: `translateY(${lerp(20, 0, shown)}px)`,
              }}
            >
              • {text}
            </div>
          );
        })}
      </Box>
    </AbsoluteFill>
  );
}
