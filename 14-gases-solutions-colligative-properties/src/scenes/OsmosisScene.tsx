import { AbsoluteFill, useVideoConfig } from "remotion";
import {
  dropped,
  easeInOut,
  fadeIn,
  lerp,
  popped,
  progress,
} from "../components/anim";
import { seeded } from "../components/particles";
import { useSceneFrame } from "../components/SceneFrame";
import { Text } from "../components/Text";
import { cue } from "../cues";
import { colors, type } from "../theme";

const TITLE_AT = cue("osmosis-osmotic-pressure", "In osmosis");
const TUBE_AT = cue("osmosis-osmotic-pressure", "solvent flows");
const MEMBRANE_AT = cue("osmosis-osmotic-pressure", "semipermeable membrane");
const ARROWS_AT = cue(
  "osmosis-osmotic-pressure",
  "toward the side with higher solute concentration",
);
const EQUATION_AT = cue("osmosis-osmotic-pressure", "is osmotic pressure");
const MOLARITY_AT = cue(
  "osmosis-osmotic-pressure",
  "zero point one zero zero molar",
);
const CONSTANT_AT = cue(
  "osmosis-osmotic-pressure",
  "zero point zero eight two zero five seven",
);
const RESULT_AT = cue(
  "osmosis-osmotic-pressure",
  "four point eight nine atmospheres",
);
const FLOW_FRAMES = 90;

const TUBE = {
  left: 280,
  innerLeft: 400,
  innerRight: 500,
  right: 620,
  top: 380,
  neck: 720,
  bottom: 820,
} as const;
const MEMBRANE_X = 450;
const LEVEL = { start: 550, pure: 650, solution: 450 } as const;
const SOLUTE_RADIUS = 9;
const ARROW_YS = [745, 770, 795];

const SOLUTES = (() => {
  const random = seeded(31);
  return Array.from({ length: 15 }, (_, index) => {
    const inNeck = index >= 9;
    const left = inNeck ? MEMBRANE_X + 15 : TUBE.innerRight + 12;
    const top = inNeck ? TUBE.neck + 14 : 590;
    const bottom = inNeck ? TUBE.bottom - 14 : TUBE.neck - 10;
    return {
      x: left + random() * (TUBE.right - 12 - left),
      y: top + random() * (bottom - top),
      wobble: random() * 2 * Math.PI,
    };
  });
})();

export function OsmosisScene() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();
  const tube = fadeIn(frame, TUBE_AT);
  const flow = progress(frame, TUBE_AT, TUBE_AT + FLOW_FRAMES, easeInOut);
  const pureLevel = lerp(LEVEL.start, LEVEL.pure, flow);
  const solutionLevel = lerp(LEVEL.start, LEVEL.solution, flow);
  const arrows = progress(frame, ARROWS_AT, ARROWS_AT + 15);
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
        Osmosis &amp; Osmotic Pressure
      </Text>
      <svg
        width={1920}
        height={1080}
        style={{ position: "absolute", left: 0, top: 0 }}
      >
        <g opacity={tube}>
          <path
            d={`M${TUBE.left} ${pureLevel} H${TUBE.innerLeft} V${TUBE.neck} H${TUBE.innerRight} V${solutionLevel} H${TUBE.right} V${TUBE.bottom} H${TUBE.left} Z`}
            fill={colors.solvent}
            fillOpacity={0.6}
          />
          {SOLUTES.map(({ x, y, wobble }, index) => (
            <circle
              key={index}
              cx={x + 3 * Math.sin(wobble + frame / 18)}
              cy={y + 3 * Math.cos(wobble + frame / 23)}
              r={SOLUTE_RADIUS}
              fill={colors.solute}
            />
          ))}
          <path
            d={`M${TUBE.left} ${TUBE.top} V${TUBE.bottom} H${TUBE.right} V${TUBE.top} M${TUBE.innerLeft} ${TUBE.top} V${TUBE.neck} H${TUBE.innerRight} V${TUBE.top}`}
            fill="none"
            stroke={colors.solventText}
            strokeWidth={4}
            strokeLinejoin="round"
          />
        </g>
        <line
          x1={MEMBRANE_X}
          x2={MEMBRANE_X}
          y1={TUBE.neck}
          y2={TUBE.bottom}
          stroke={colors.membraneText}
          strokeWidth={4}
          strokeDasharray="8 6"
          opacity={fadeIn(frame, MEMBRANE_AT)}
        />
        {arrows > 0 &&
          ARROW_YS.map((y) => {
            const tip = lerp(MEMBRANE_X - 30, MEMBRANE_X + 34, arrows);
            return (
              <path
                key={y}
                d={`M${MEMBRANE_X - 34} ${y} H${tip} M${tip - 9} ${y - 7} L${tip} ${y} L${tip - 9} ${y + 7}`}
                fill="none"
                stroke={colors.gasText}
                strokeWidth={4}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            );
          })}
      </svg>
      <Text
        x={(TUBE.left + TUBE.innerLeft) / 2}
        y={870}
        size={type.label}
        color={colors.solventText}
        anchor="middle"
        opacity={tube}
      >
        Pure water
      </Text>
      <Text
        x={(TUBE.innerRight + TUBE.right) / 2}
        y={870}
        size={type.label}
        color={colors.soluteText}
        anchor="middle"
        opacity={tube}
      >
        Solution
      </Text>
      <Text
        x={950}
        y={400}
        size={type.subtitle}
        weight={700}
        color={colors.gasText}
        {...dropped(frame, EQUATION_AT)}
      >
        Π = <i>iMRT</i>
      </Text>
      <Text
        x={950}
        y={550}
        size={type.body}
        color={colors.gasText}
        {...dropped(frame, MOLARITY_AT)}
      >
        Π = 2 × 0.100 mol/L ×
      </Text>
      <Text
        x={1000}
        y={650}
        size={type.body}
        color={colors.gasText}
        {...dropped(frame, CONSTANT_AT)}
      >
        0.082057 L·atm/(mol·K) × 298.15 K
      </Text>
      <Text
        x={950}
        y={800}
        size={type.subtitle}
        weight={700}
        color={colors.boil}
        {...popped(frame, fps, RESULT_AT)}
      >
        = 4.89 atm
      </Text>
    </AbsoluteFill>
  );
}
