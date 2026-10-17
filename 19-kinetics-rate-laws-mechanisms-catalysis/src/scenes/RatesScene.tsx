import { AbsoluteFill, useVideoConfig } from "remotion";
import { dropped, fadeIn, popped, progress } from "../components/anim";
import { ArrowLine, Canvas, polyline, Stroke } from "../components/Draw";
import { Pitfall } from "../components/Pitfall";
import { useSceneFrame } from "../components/SceneFrame";
import { Block, Sup, Text } from "../components/Text";
import { cue } from "../cues";
import { colors, type } from "../theme";

const SCENE = "rates-and-rate-laws";
const AT = {
  rate: cue(SCENE, "A reaction rate is the change"),
  law: cue(SCENE, "A rate law, rate equals"),
  pitfall: cue(SCENE, "cannot just be read from the coefficients"),
};

const ORIGIN = { x: 160, y: 880 } as const;
const AXIS_END = { x: 880, y: 320 } as const;
const TAU = 220;
const TANGENT_X = 300;

const decay = (x: number) => Math.exp(-(x - ORIGIN.x) / TAU);
const reactantY = (x: number) => ORIGIN.y - 520 * decay(x);
const productY = (x: number) => ORIGIN.y - 480 * (1 - decay(x));

const samples = Array.from({ length: 91 }, (_, i) => ORIGIN.x + i * 8);
const REACTANT = polyline(samples.map((x) => [x, reactantY(x)] as const));
const PRODUCT = polyline(samples.map((x) => [x, productY(x)] as const));

const tangentY0 = reactantY(TANGENT_X);
const slope = (520 / TAU) * decay(TANGENT_X);
const tangentAt = (x: number) => tangentY0 + slope * (x - TANGENT_X);
const RUN = 80;

export function RatesScene() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();
  const axes = progress(frame, AT.rate, AT.rate + 30);
  const curves = progress(frame, AT.rate + 10, AT.rate + 55);
  const labels = fadeIn(frame, AT.rate + 30);
  const tangent = fadeIn(frame, AT.rate + 55);
  const pitfall = popped(frame, fps, AT.pitfall);
  return (
    <AbsoluteFill>
      <Canvas>
        <Stroke
          d={`M${ORIGIN.x} ${ORIGIN.y} L${ORIGIN.x} ${AXIS_END.y}`}
          color={colors.text}
          width={3}
          drawn={axes}
        />
        <Stroke
          d={`M${ORIGIN.x} ${ORIGIN.y} L${AXIS_END.x} ${ORIGIN.y}`}
          color={colors.text}
          width={3}
          drawn={axes}
        />
        <Stroke d={REACTANT} color={colors.reactant} drawn={curves} />
        <Stroke d={PRODUCT} color={colors.product} drawn={curves} />
        <g opacity={tangent}>
          <path
            d={`M${TANGENT_X - 90} ${tangentAt(TANGENT_X - 90)} L${TANGENT_X + 130} ${tangentAt(TANGENT_X + 130)}`}
            stroke={colors.energy}
            strokeWidth={3}
            strokeDasharray="10 8"
          />
          <path
            d={`M${TANGENT_X} ${tangentY0} H${TANGENT_X + RUN} V${tangentAt(TANGENT_X + RUN)}`}
            stroke={colors.energy}
            strokeWidth={3}
            fill="none"
          />
          <circle cx={TANGENT_X} cy={tangentY0} r={8} fill={colors.energy} />
        </g>
        <ArrowLine
          x1={ORIGIN.x}
          y1={ORIGIN.y}
          x2={ORIGIN.x}
          y2={AXIS_END.y - 4}
          color={colors.text}
          opacity={axes >= 1 ? 1 : 0}
        />
        <ArrowLine
          x1={ORIGIN.x}
          y1={ORIGIN.y}
          x2={AXIS_END.x + 4}
          y2={ORIGIN.y}
          color={colors.text}
          opacity={axes >= 1 ? 1 : 0}
        />
      </Canvas>
      <Text x={ORIGIN.x} y={292} size={type.small} opacity={labels}>
        concentration
      </Text>
      <Text
        x={AXIS_END.x}
        y={918}
        size={type.small}
        anchor="end"
        opacity={labels}
      >
        time
      </Text>
      <Text
        x={640}
        y={786}
        size={type.small}
        weight={500}
        color={colors.reactant}
        opacity={labels}
      >
        reactant
      </Text>
      <Text
        x={640}
        y={410}
        size={type.small}
        weight={500}
        color={colors.product}
        opacity={labels}
      >
        product
      </Text>
      <Text
        x={330}
        y={334}
        size={type.small}
        weight={500}
        color={colors.energy}
        opacity={tangent}
      >
        rate = Δconcentration / Δtime
      </Text>
      <Block
        left={1000}
        top={300}
        width={800}
        size={type.body}
        {...dropped(frame, AT.rate)}
      >
        <span style={{ fontWeight: 700 }}>A reaction rate</span> is the change
        in concentration over time.
      </Block>
      <Text
        x={1000}
        y={500}
        size={type.heading}
        weight={500}
        {...dropped(frame, AT.law)}
      >
        rate = k[A]<Sup>m</Sup>[B]<Sup>n</Sup>
      </Text>
      <Pitfall
        top={600}
        left={1000}
        width={800}
        size={40}
        opacity={pitfall.opacity}
        scale={pitfall.scale}
      >
        orders m and n are <b>not</b> the balanced-equation coefficients. They
        are found by experiment.
      </Pitfall>
    </AbsoluteFill>
  );
}
