import { AbsoluteFill, useVideoConfig } from "remotion";
import { dropped, fadeIn, popped } from "../components/anim";
import { useSceneFrame } from "../components/SceneFrame";
import { Eq, Text } from "../components/Text";
import { cue } from "../cues";
import { colors, FONT, type } from "../theme";

const TITLE_AT = cue(
  "worked-example-freezing",
  "Let's find the freezing point",
);
const GIVEN_AT = cue("worked-example-freezing", "eleven point seven grams");
const MOLAR_MASS_AT = cue("worked-example-freezing", "sodium chloride");
const MOLES_AT = cue("worked-example-freezing", "five hundred grams");
const FACTOR_AT = cue("worked-example-freezing", "ideal factor of two");
const MOLALITY_AT = cue("worked-example-freezing", "a molality of");
const DEPRESSION_AT = cue("worked-example-freezing", "freezing point becomes");
const RESULT_AT = cue("worked-example-freezing", "minus one point four nine");

const LEFT = 200;

const STEPS = [
  { text: "M(NaCl) = 22.990 + 35.45 = 58.44 g/mol", y: 440, at: MOLAR_MASS_AT },
  { text: "n = 11.7 g ÷ 58.44 g/mol = 0.2002 mol", y: 520, at: MOLES_AT },
  { text: "i = 2 (ideal)", y: 600, at: FACTOR_AT },
  {
    text: "m = 0.2002 mol ÷ 0.500 kg = 0.4004 mol/kg",
    y: 680,
    at: MOLALITY_AT,
  },
] as const;

export function WorkedExampleScene() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();
  const result = popped(frame, fps, RESULT_AT);
  return (
    <AbsoluteFill>
      <Text
        x={960}
        y={150}
        size={type.title}
        weight={700}
        color={colors.gasText}
        anchor="middle"
        {...dropped(frame, TITLE_AT)}
      >
        Worked Example: Freezing Point
      </Text>
      <Text
        x={LEFT}
        y={300}
        size={type.subtitle}
        weight={500}
        color={colors.solventText}
        opacity={fadeIn(frame, GIVEN_AT)}
      >
        11.7 g NaCl in 500. g water
      </Text>
      {STEPS.map(({ text, y, at }) => (
        <Text
          key={text}
          x={LEFT}
          y={y}
          size={type.body}
          color={colors.gasText}
          {...dropped(frame, at)}
        >
          {text}
        </Text>
      ))}
      <Text
        x={LEFT}
        y={760}
        size={type.body}
        color={colors.freeze}
        {...dropped(frame, DEPRESSION_AT)}
      >
        <Eq>ΔT_f = i · K_f · m = 2 × 1.86 × 0.4004 = 1.489 °C</Eq>
      </Text>
      <div
        style={{
          position: "absolute",
          left: LEFT,
          top: 820,
          padding: "12px 32px",
          border: `4px solid ${colors.boil}`,
          borderRadius: 16,
          fontFamily: FONT,
          fontSize: type.subtitle,
          fontWeight: 700,
          lineHeight: 1.2,
          color: colors.boil,
          whiteSpace: "nowrap",
          opacity: result.opacity,
          transform: `scale(${result.scale})`,
          transformOrigin: "left center",
        }}
      >
        <Eq>T_f = 0.00 °C − 1.489 °C = −1.49 °C</Eq>
      </div>
    </AbsoluteFill>
  );
}
