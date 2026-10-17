import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fadeIn, lerp } from "../components/anim";
import { Title } from "../components/Panels";
import { Zeff } from "../components/Script";
import { cue } from "../cues";
import { colors, FONT, SAFE } from "../theme";

const SCENE = "closing-card";

const ZEFF_TAKEAWAY =
  "drives trends; valence electrons are held tighter across a period.";

const TAKEAWAYS = [
  {
    text: <><Zeff /> {ZEFF_TAKEAWAY}</>,
    at: cue(SCENE, "Effective nuclear charge drives"),
  },
  {
    text: "Radius shrinks across, grows down.",
    at: cue(SCENE, "Radius shrinks across"),
  },
  {
    text: "IE and EA generally rise across.",
    at: cue(SCENE, "Ionization energy and affinity"),
  },
  {
    text: "Electronegativity is a bond-pull index, not an isolated energy.",
    at: cue(SCENE, "Finally, electronegativity measures"),
  },
];

const FIRST_TOP = 280;
const PITCH = 120;

export function ClosingCard() {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Title>Key Takeaways</Title>
      {TAKEAWAYS.map(({ text, at }, index) => {
        const shown = fadeIn(frame, at);
        return (
          <div
            key={index}
            style={{
              position: "absolute",
              left: SAFE,
              top: FIRST_TOP + index * PITCH,
              fontFamily: FONT,
              fontSize: 44,
              lineHeight: 1.2,
              color: colors.text,
              whiteSpace: "nowrap",
              opacity: shown,
              transform: `translateY(${lerp(20, 0, shown)}px)`,
            }}
          >
            • {text}
          </div>
        );
      })}
    </AbsoluteFill>
  );
}
