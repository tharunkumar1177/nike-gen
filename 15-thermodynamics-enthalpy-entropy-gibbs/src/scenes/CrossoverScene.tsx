import { AbsoluteFill, useVideoConfig } from "remotion";
import { dropped, fadeIn, popped, progress } from "../components/anim";
import { useSceneFrame } from "../components/SceneFrame";
import { Arrow, Text } from "../components/Text";
import { cue } from "../cues";
import { colors, type, VIDEO } from "../theme";
import { AmmoniaHeader, LEFT_X } from "./worked";

const LOW_T_AT = cue(
  "crossover-temperature",
  "spontaneous at lower temperatures",
);
const ZERO_AT = cue("crossover-temperature", "delta G to zero");
const RESULT_AT = cue("crossover-temperature", "sixty three kelvin");
const ABOVE_AT = cue(
  "crossover-temperature",
  "above this specific temperature",
);

const SCALE = { left: 200, right: 1720, y: 800, height: 24 } as const;
/** Linear temperature axis placing 298 K at x 400 and 463 K at x 960. */
const kelvinToX = (kelvin: number) => 400 + ((kelvin - 298) * 560) / 165;
const CROSSOVER_X = kelvinToX(463);

export function CrossoverScene() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();
  const scale = fadeIn(frame, LOW_T_AT);
  const split = progress(frame, ABOVE_AT, ABOVE_AT + 30);
  return (
    <AbsoluteFill>
      <AmmoniaHeader />
      <Text
        x={LEFT_X}
        y={340}
        size={type.body}
        color={colors.gibbsText}
        opacity={fadeIn(frame, 0)}
      >
        ΔG° = −32.7 kJ at 298.15 K
      </Text>
      <Text
        x={LEFT_X}
        y={430}
        size={type.label}
        color={colors.temperatureDependentText}
        opacity={fadeIn(frame, LOW_T_AT)}
      >
        ΔH &lt; 0 and ΔS &lt; 0: spontaneous only at low temperature
      </Text>
      <Text x={LEFT_X} y={560} size={type.body} {...dropped(frame, ZERO_AT)}>
        Set ΔG = 0
      </Text>
      <Text
        x={480}
        y={560}
        size={type.body}
        {...popped(frame, fps, RESULT_AT)}
      >
        <Arrow />T = ΔH° / ΔS° = −91.8 / −0.1981 ={" "}
        <b style={{ color: colors.gibbsText }}>463 K</b>
      </Text>
      <svg
        width={VIDEO.width}
        height={VIDEO.height}
        style={{ position: "absolute", left: 0, top: 0 }}
        opacity={scale}
      >
        <rect
          x={SCALE.left}
          y={SCALE.y - SCALE.height / 2}
          width={SCALE.right - SCALE.left}
          height={SCALE.height}
          rx={SCALE.height / 2}
          fill={colors.box}
          stroke={colors.muted}
          strokeWidth={3}
        />
        <rect
          x={SCALE.left}
          y={SCALE.y - SCALE.height / 2}
          width={(CROSSOVER_X - SCALE.left) * split}
          height={SCALE.height}
          fill={colors.spontaneous}
        />
        <rect
          x={CROSSOVER_X}
          y={SCALE.y - SCALE.height / 2}
          width={(SCALE.right - CROSSOVER_X) * split}
          height={SCALE.height}
          fill={colors.nonSpontaneous}
        />
        {[298, 463].map((kelvin) => (
          <line
            key={kelvin}
            x1={kelvinToX(kelvin)}
            x2={kelvinToX(kelvin)}
            y1={SCALE.y - 34}
            y2={SCALE.y + 34}
            stroke={kelvin === 463 ? colors.gibbsText : colors.text}
            strokeWidth={kelvin === 463 ? 6 : 4}
          />
        ))}
      </svg>
      <Text
        x={kelvinToX(298)}
        y={730}
        size={type.label}
        anchor="middle"
        opacity={scale}
      >
        298 K
      </Text>
      <Text
        x={CROSSOVER_X}
        y={730}
        size={type.label}
        weight={700}
        color={colors.gibbsText}
        anchor="middle"
        opacity={fadeIn(frame, RESULT_AT)}
      >
        463 K
      </Text>
      <Text
        x={(SCALE.left + CROSSOVER_X) / 2}
        y={880}
        size={type.label}
        weight={700}
        color={colors.spontaneousText}
        anchor="middle"
        opacity={split}
      >
        Spontaneous (ΔG &lt; 0)
      </Text>
      <Text
        x={(CROSSOVER_X + SCALE.right) / 2}
        y={880}
        size={type.label}
        weight={700}
        color={colors.nonSpontaneousText}
        anchor="middle"
        opacity={split}
      >
        Non-spontaneous (ΔG &gt; 0)
      </Text>
    </AbsoluteFill>
  );
}
