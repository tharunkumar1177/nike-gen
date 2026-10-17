import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, lerp, pop } from "../components/anim";
import { Box, Title } from "../components/Panels";
import { cue } from "../cues";
import { colors, type } from "../theme";

const SCENE = "pitfalls";

const BEATS = {
  box: cue(SCENE, "three pitfalls"),
};

const PITFALLS = [
  {
    text: "Geometry dictates hybrids, not vice versa.",
    at: cue(SCENE, "does not physically cause"),
  },
  {
    text: "Domains = bonded atoms + lone pairs.",
    at: cue(SCENE, "always count lone pairs"),
  },
  {
    text: "Water’s lone pairs are not identical sp³ “rabbit ears”.",
    at: cue(SCENE, "rabbit ears"),
  },
];

export function PitfallsScene() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const box = pop(frame, fps, BEATS.box);
  return (
    <AbsoluteFill>
      <Title opacity={fadeIn(frame, BEATS.box)}>Pitfalls</Title>
      <Box
        x={160}
        y={320}
        width={1600}
        height={560}
        border={colors.caution}
        opacity={Math.min(1, box)}
        rise={lerp(80, 0, box)}
        style={{ borderWidth: 8 }}
      >
        {PITFALLS.map(({ text, at }, i) => {
          const shown = fadeIn(frame, at);
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: 72,
                top: 92 + i * 140,
                fontSize: type.body,
                lineHeight: 1.2,
                whiteSpace: "nowrap",
                opacity: shown,
                transform: `translateY(${lerp(20, 0, shown)}px)`,
              }}
            >
              <span style={{ color: colors.cautionText, fontWeight: 700 }}>
                {i + 1}.
              </span>{" "}
              {text}
            </div>
          );
        })}
      </Box>
    </AbsoluteFill>
  );
}
