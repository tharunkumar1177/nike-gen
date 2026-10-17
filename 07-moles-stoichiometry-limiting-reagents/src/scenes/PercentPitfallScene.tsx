import { AbsoluteFill, useVideoConfig } from "remotion";
import { dropped, popped } from "../components/anim";
import { Equation } from "../components/Equation";
import { useSceneFrame } from "../components/SceneFrame";
import { F, Text } from "../components/Text";
import { cue } from "../cues";
import { colors, FONT, SAFE, type } from "../theme";
import { EQUATION_Y } from "./worked";

const ACTUAL_AT = cue("percent-yield-pitfalls", "ten point zero grams");
const PERCENT_AT = cue("percent-yield-pitfalls", "eighty eight point eight");
const BOX_AT = cue("percent-yield-pitfalls", "A major pitfall");
const BODY_AT = cue("percent-yield-pitfalls", "smaller mass does not mean");

const BOX = { top: 650, width: 1680 } as const;

export function PercentPitfallScene() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();
  const box = popped(frame, fps, BOX_AT);
  const body = dropped(frame, BODY_AT);
  return (
    <AbsoluteFill>
      <Equation y={EQUATION_Y} size={type.subtitle} />
      <Text x={SAFE} y={350} size={type.body} {...dropped(frame, ACTUAL_AT)}>
        Actual: 10.0 g <F>H2O</F>
      </Text>
      <Text
        x={SAFE}
        y={450}
        size={type.subtitle}
        weight={700}
        color={colors.h2oText}
        {...popped(frame, fps, PERCENT_AT)}
      >
        % Yield = (10.0 g / 11.26 g) × 100 % = 88.8 %
      </Text>
      <div
        style={{
          position: "absolute",
          left: SAFE,
          top: BOX.top,
          width: BOX.width,
          boxSizing: "border-box",
          padding: "28px 40px 32px",
          border: `4px solid ${colors.pitfall}`,
          borderRadius: 16,
          background: colors.background,
          fontFamily: FONT,
          fontSize: type.body,
          lineHeight: 1.3,
          color: colors.text,
          opacity: box.opacity,
          transform: `scale(${box.scale})`,
          transformOrigin: "top left",
        }}
      >
        <div style={{ fontWeight: 700, color: colors.pitfall }}>Pitfall</div>
        <div
          style={{
            marginTop: 12,
            opacity: body.opacity,
            transform: `translateY(${body.dy}px)`,
          }}
        >
          <div>Smaller mass does not mean limiting.</div>
          <div>Always compare moles to the balanced ratio.</div>
        </div>
      </div>
    </AbsoluteFill>
  );
}
