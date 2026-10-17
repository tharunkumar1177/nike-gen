import { AbsoluteFill, useVideoConfig } from "remotion";
import { dropped, fadeIn, popped, progress } from "../components/anim";
import { useSceneFrame } from "../components/SceneFrame";
import { Title } from "../components/Text";
import { cue } from "../cues";
import { colors, FONT, SAFE } from "../theme";

const SCENE = "pitfalls";
const BOX_AT = cue(SCENE, "three pitfalls");

const ITEMS = [
  {
    wrong: "Boiling breaks covalent bonds.",
    right: "Boiling separates molecules; covalent bonds stay intact.",
    at: cue(SCENE, "Boiling separates molecules"),
  },
  {
    wrong: "A hydrogen bond is a covalent bond.",
    right:
      "Hydrogen bonds are intermolecular, about 5–10 % as strong as covalent bonds.",
    at: cue(SCENE, "Hydrogen bonds are intermolecular"),
  },
  {
    wrong: "Polar always beats nonpolar.",
    right:
      "Dispersion grows with size: compare polarity only at similar size.",
    at: cue(SCENE, "polar does not always beat"),
  },
] as const;

const TEXT_SIZE = 40;

export function PitfallsScene() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();
  const box = popped(frame, fps, BOX_AT);
  return (
    <AbsoluteFill>
      <Title opacity={fadeIn(frame, 0)}>Common Pitfalls</Title>
      <div
        style={{
          position: "absolute",
          left: SAFE,
          top: 290,
          width: 1920 - 2 * SAFE,
          height: 620,
          boxSizing: "border-box",
          padding: "44px 64px",
          display: "flex",
          flexDirection: "column",
          gap: 44,
          background: colors.pitfallFill,
          border: `4px solid ${colors.pitfall}`,
          borderRadius: 16,
          fontFamily: FONT,
          fontSize: TEXT_SIZE,
          lineHeight: 1.3,
          opacity: box.opacity,
          transform: `scale(${box.scale})`,
          transformOrigin: "top center",
        }}
      >
        {ITEMS.map(({ wrong, right, at }) => {
          const shown = dropped(frame, at);
          const strike = progress(frame, at + 15, at + 27);
          const fixed = dropped(frame, at + 27);
          return (
            <div key={wrong}>
              <div
                style={{
                  opacity: shown.opacity,
                  transform: `translateY(${shown.dy}px)`,
                }}
              >
                <span
                  style={{
                    position: "relative",
                    display: "inline-block",
                    color: colors.pitfall,
                    fontWeight: 700,
                  }}
                >
                  {wrong}
                  <span
                    style={{
                      position: "absolute",
                      left: 0,
                      top: "52%",
                      height: 5,
                      width: `${strike * 100}%`,
                      background: colors.pitfall,
                    }}
                  />
                </span>
              </div>
              <div
                style={{
                  color: colors.text,
                  opacity: fixed.opacity,
                  transform: `translateY(${fixed.dy}px)`,
                }}
              >
                {right}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
}
