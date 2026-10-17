import { AbsoluteFill, useVideoConfig } from "remotion";
import { dropped, popped } from "../components/anim";
import { useSceneFrame } from "../components/SceneFrame";
import { cue } from "../cues";
import { colors, FONT, type } from "../theme";

const BOX_AT = cue("pitfalls", "avoid common pitfalls");

const ITEMS = [
  {
    text: "Spontaneous does not mean fast.",
    at: cue("pitfalls", "happens quickly"),
  },
  {
    text: "Exothermic does not guarantee spontaneous.",
    at: cue("pitfalls", "exothermic does not guarantee"),
  },
  {
    text: "Convert ΔS from J/K to kJ/K; T in kelvin.",
    at: cue("pitfalls", "match your energy units"),
  },
];

const BOX = { left: 260, top: 200, width: 1400, height: 680 } as const;

export function PitfallsScene() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();
  const box = popped(frame, fps, BOX_AT);
  if (box.opacity <= 0) return null;
  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: BOX.left,
          top: BOX.top,
          width: BOX.width,
          height: BOX.height,
          boxSizing: "border-box",
          padding: "56px 80px",
          border: `4px solid ${colors.pitfallText}`,
          borderRadius: 24,
          background: colors.pitfall,
          fontFamily: FONT,
          color: colors.text,
          opacity: box.opacity,
          transform: `scale(${box.scale})`,
        }}
      >
        <div
          style={{
            fontSize: type.subtitle,
            fontWeight: 700,
            color: colors.pitfallText,
            textAlign: "center",
          }}
        >
          Pitfalls
        </div>
        <ul
          style={{
            margin: "56px 0 0",
            paddingLeft: 48,
            display: "flex",
            flexDirection: "column",
            gap: 56,
            fontSize: type.body,
            lineHeight: 1.2,
          }}
        >
          {ITEMS.map(({ text, at }) => {
            const shown = dropped(frame, at);
            return (
              <li
                key={text}
                style={{
                  opacity: shown.opacity,
                  transform: `translateY(${shown.dy}px)`,
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
