import { AbsoluteFill, useVideoConfig } from "remotion";
import { dropped, fadeIn, pop } from "../components/anim";
import { useSceneFrame } from "../components/SceneFrame";
import { Arrow, Badge, Sup, Text } from "../components/Text";
import { cue } from "../cues";
import { colors, type } from "../theme";

const TITLE_AT = cue("colligative-properties", "Dissolving a solute");
const CONCEPT_AT = cue(
  "colligative-properties",
  "Colligative properties depend only",
);
const GLUCOSE_AT = cue("colligative-properties", "number of solute particles");
const SALT_AT = cue("colligative-properties", "not their identity");
const FACTOR_AT = cue("colligative-properties", "vant Hoff factor");

const RADIUS = 24;
const ROW = { formula: 500, particles: 650, badge: 750 } as const;
const GLUCOSE_X = 500;
const SALT_X = 1420;

export function ColligativeScene() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();
  const glucose = pop(frame, fps, GLUCOSE_AT);
  const salt = pop(frame, fps, SALT_AT);
  const badge = fadeIn(frame, FACTOR_AT);
  return (
    <AbsoluteFill>
      <Text
        x={960}
        y={200}
        size={type.title}
        weight={700}
        color={colors.gasText}
        anchor="middle"
        {...dropped(frame, TITLE_AT)}
      >
        Colligative Properties
      </Text>
      <Text
        x={960}
        y={320}
        size={type.body}
        weight={500}
        color={colors.gasText}
        anchor="middle"
        opacity={fadeIn(frame, CONCEPT_AT)}
      >
        Depend on particle count, not identity
      </Text>
      <Text
        x={GLUCOSE_X}
        y={ROW.formula}
        size={type.body}
        color={colors.soluteText}
        anchor="middle"
        {...dropped(frame, GLUCOSE_AT)}
      >
        1 Glucose <Arrow /> 1 Particle
      </Text>
      <Text
        x={SALT_X}
        y={ROW.formula}
        size={type.body}
        color={colors.ionText}
        anchor="middle"
        {...dropped(frame, SALT_AT)}
      >
        1 NaCl <Arrow /> Na<Sup>+</Sup> + Cl<Sup>−</Sup>
      </Text>
      <svg
        width={1920}
        height={1080}
        style={{ position: "absolute", left: 0, top: 0 }}
      >
        {glucose > 0 && (
          <circle
            cx={GLUCOSE_X}
            cy={ROW.particles}
            r={RADIUS * (0.8 + 0.2 * glucose)}
            fill={colors.solute}
            opacity={Math.min(1, glucose * 2)}
          />
        )}
        {salt > 0 &&
          [-30, 30].map((dx) => (
            <circle
              key={dx}
              cx={SALT_X + dx}
              cy={ROW.particles}
              r={RADIUS * (0.8 + 0.2 * salt)}
              fill={colors.ion}
              opacity={Math.min(1, salt * 2)}
            />
          ))}
      </svg>
      <Text
        x={GLUCOSE_X}
        y={ROW.badge}
        size={type.label}
        anchor="middle"
        opacity={badge}
      >
        <Badge
          color={colors.solute}
          textColor={colors.soluteText}
          size={type.label}
        >
          <i>i</i> = 1
        </Badge>
      </Text>
      <Text
        x={SALT_X}
        y={ROW.badge}
        size={type.label}
        anchor="middle"
        opacity={badge}
      >
        <Badge color={colors.ion} textColor={colors.ionText} size={type.label}>
          <i>i</i> = 2
        </Badge>
      </Text>
    </AbsoluteFill>
  );
}
