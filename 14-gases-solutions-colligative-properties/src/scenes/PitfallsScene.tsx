import { AbsoluteFill, useVideoConfig } from "remotion";
import { dropped, fadeIn, popped } from "../components/anim";
import { useSceneFrame } from "../components/SceneFrame";
import { Text } from "../components/Text";
import { cue } from "../cues";
import { colors, type } from "../theme";

const TITLE_AT = cue("pitfalls", "Remember");

const BOX = { left: 260, top: 350, width: 1400, height: 500 } as const;

const ITEMS = [
  {
    text: "Molality uses kg of solvent, not solution.",
    y: 450,
    at: cue("pitfalls", "kilograms of solvent"),
  },
  {
    text: "Real i is smaller than ideal due to ion pairing.",
    y: 600,
    at: cue("pitfalls", "smaller than ideal"),
  },
  {
    text: "In osmosis, solvent moves, not solute.",
    y: 750,
    at: cue("pitfalls", "solvent that moves"),
  },
] as const;

export function PitfallsScene() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();
  const box = popped(frame, fps, TITLE_AT);
  return (
    <AbsoluteFill>
      <Text
        x={960}
        y={200}
        size={type.title}
        weight={700}
        color={colors.pitfallText}
        anchor="middle"
        {...dropped(frame, TITLE_AT)}
      >
        Pitfalls
      </Text>
      <div
        style={{
          position: "absolute",
          left: BOX.left,
          top: BOX.top,
          width: BOX.width,
          height: BOX.height,
          boxSizing: "border-box",
          border: `4px solid ${colors.pitfallText}`,
          borderRadius: 16,
          background: colors.pitfall,
          opacity: box.opacity,
          transform: `scale(${box.scale})`,
        }}
      />
      {ITEMS.map(({ text, y, at }) => (
        <Text
          key={text}
          x={350}
          y={y}
          size={type.body}
          weight={500}
          color={colors.pitfallText}
          opacity={fadeIn(frame, at)}
        >
          • {text}
        </Text>
      ))}
    </AbsoluteFill>
  );
}
