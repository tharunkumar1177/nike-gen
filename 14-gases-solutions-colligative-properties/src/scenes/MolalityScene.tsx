import { AbsoluteFill, useVideoConfig } from "remotion";
import {
  dropped,
  easeInOut,
  fadeIn,
  lerp,
  popped,
  progress,
} from "../components/anim";
import { Beaker } from "../components/Beaker";
import { useSceneFrame } from "../components/SceneFrame";
import { Fraction, Text } from "../components/Text";
import { cue } from "../cues";
import { colors, type } from "../theme";

const TITLE_AT = cue("molality-vs-molarity", "Moving from gases to solutions");
const MOLALITY_AT = cue("molality-vs-molarity", "we often use molality");
const DEFINITION_AT = cue(
  "molality-vs-molarity",
  "moles of solute per kilogram of solvent",
);
const MOLARITY_AT = cue(
  "molality-vs-molarity",
  "Molarity changes with temperature",
);
const HEAT_AT = cue(
  "molality-vs-molarity",
  "because liquids expand when heated",
);
const MASS_AT = cue("molality-vs-molarity", "molality uses mass");
const CONSTANT_AT = cue("molality-vs-molarity", "which does not change");
const HEAT_FRAMES = 60;

const BEAKER = { cx: 1380, top: 560, bottom: 860, width: 240 };
const LIQUID = { cold: 750, hot: 650 };
const THERMOMETER = { x: 1580, top: 580, bottom: 820, bulb: 22 };
const BALANCE = { cx: 500, top: 770, bottom: 850, width: 340 };
const WEIGHED = { cx: 500, top: 590, bottom: 770, width: 200, liquid: 660 };

export function MolalityScene() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();
  const heat = progress(frame, HEAT_AT, HEAT_AT + HEAT_FRAMES, easeInOut);
  const beaker = popped(frame, fps, HEAT_AT);
  const balance = popped(frame, fps, MASS_AT);
  const mercury = lerp(THERMOMETER.bottom - 40, THERMOMETER.top + 30, heat);
  return (
    <AbsoluteFill>
      <Text
        x={960}
        y={200}
        size={type.title}
        weight={700}
        color={colors.solventText}
        anchor="middle"
        {...dropped(frame, TITLE_AT)}
      >
        Solutions
      </Text>
      <Text
        x={500}
        y={330}
        size={type.subtitle}
        weight={500}
        color={colors.solventText}
        anchor="middle"
        opacity={fadeIn(frame, MOLALITY_AT)}
      >
        Molality (<i>m</i>)
      </Text>
      <Text
        x={500}
        y={460}
        size={type.body}
        color={colors.solventText}
        anchor="middle"
        {...dropped(frame, DEFINITION_AT)}
      >
        <Fraction top="mol solute" bottom="kg solvent" />
      </Text>
      <Text
        x={1420}
        y={330}
        size={type.subtitle}
        weight={500}
        color={colors.solventText}
        anchor="middle"
        opacity={fadeIn(frame, MOLARITY_AT)}
      >
        Molarity (<i>M</i>)
      </Text>
      <Text
        x={1420}
        y={460}
        size={type.body}
        color={colors.solventText}
        anchor="middle"
        {...dropped(frame, MOLARITY_AT)}
      >
        <Fraction top="mol solute" bottom="L solution" />
      </Text>
      <svg
        width={1920}
        height={1080}
        style={{ position: "absolute", left: 0, top: 0 }}
      >
        <g
          opacity={beaker.opacity}
          transform={`translate(1420 710) scale(${beaker.scale}) translate(-1420 -710)`}
        >
          <Beaker {...BEAKER} liquid={lerp(LIQUID.cold, LIQUID.hot, heat)} />
          <rect
            x={THERMOMETER.x - 10}
            y={THERMOMETER.top}
            width={20}
            height={THERMOMETER.bottom - THERMOMETER.top}
            rx={10}
            fill={colors.background}
            stroke={colors.muted}
            strokeWidth={3}
          />
          <rect
            x={THERMOMETER.x - 5}
            y={mercury}
            width={10}
            height={THERMOMETER.bottom - mercury}
            fill={colors.pitfallText}
          />
          <circle
            cx={THERMOMETER.x}
            cy={THERMOMETER.bottom + THERMOMETER.bulb - 6}
            r={THERMOMETER.bulb}
            fill={colors.pitfallText}
            stroke={colors.muted}
            strokeWidth={3}
          />
        </g>
        <g
          opacity={balance.opacity}
          transform={`translate(500 720) scale(${balance.scale}) translate(-500 -720)`}
        >
          <Beaker {...WEIGHED} />
          <rect
            x={BALANCE.cx - BALANCE.width / 2}
            y={BALANCE.top}
            width={BALANCE.width}
            height={BALANCE.bottom - BALANCE.top}
            rx={12}
            fill={colors.box}
            stroke={colors.solventText}
            strokeWidth={4}
          />
          <rect
            x={BALANCE.cx - 90}
            y={BALANCE.top + 22}
            width={180}
            height={36}
            rx={6}
            fill={colors.background}
            stroke={colors.solventText}
            strokeWidth={3}
          />
        </g>
      </svg>
      <Text
        x={500}
        y={905}
        size={type.label}
        color={colors.solventText}
        anchor="middle"
        opacity={fadeIn(frame, CONSTANT_AT)}
      >
        Mass is constant
      </Text>
    </AbsoluteFill>
  );
}
