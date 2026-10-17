import { AbsoluteFill, useVideoConfig } from "remotion";
import { dropped, fadeIn, popped, progress } from "../components/anim";
import { ArrowLine, Canvas, Stroke } from "../components/Draw";
import { Pitfall } from "../components/Pitfall";
import { useSceneFrame } from "../components/SceneFrame";
import { Arrow, Block, Ea, F, Text } from "../components/Text";
import { cue } from "../cues";
import { colors, FONT, type } from "../theme";

const SCENE = "catalysis";
const AT = {
  path: cue(SCENE, "opens a different, lower pathway"),
  converter: cue(SCENE, "catalytic converter uses a metal surface"),
  catalyst: cue(SCENE, "A catalyst is put in at the start"),
  pitfall: cue(SCENE, "does not shift equilibrium or change the delta H"),
  levers: cue(SCENE, "These are your levers"),
};

const AXIS = { x: 200, top: 300, y: 880, right: 900 } as const;
const REACTANT_Y = 520;
const PRODUCT_Y = 760;
const PEAK_X = 560;
const UNCATALYSED_PEAK = 330;
const CATALYSED_PEAK = 450;

const barrier = (peak: number) =>
  `M380 ${REACTANT_Y} C470 ${REACTANT_Y}, 480 ${peak}, ${PEAK_X} ${peak} C640 ${peak}, 650 ${PRODUCT_Y}, 740 ${PRODUCT_Y}`;

const RIGHT = 1000;
const LEVERS = ["Temperature", "Concentration", "Mechanism", "Catalyst"];

export function CatalysisScene() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();
  const base = fadeIn(frame, 0);
  const catalysed = progress(frame, AT.path, AT.path + 40);
  const dashed = catalysed >= 1;
  const catalysedLabels = fadeIn(frame, AT.path + 40);
  const delta = fadeIn(frame, AT.path + 55);
  const pitfall = popped(frame, fps, AT.pitfall);
  return (
    <AbsoluteFill>
      <Canvas opacity={base}>
        <path
          d={`M${AXIS.x} ${AXIS.top} V${AXIS.y} H${AXIS.right}`}
          fill="none"
          stroke={colors.text}
          strokeWidth={3}
        />
        <path
          d={`M240 ${REACTANT_Y} H380`}
          stroke={colors.reactant}
          strokeWidth={5}
        />
        <path
          d={`M740 ${PRODUCT_Y} H880`}
          stroke={colors.product}
          strokeWidth={5}
        />
        <Stroke
          d={barrier(UNCATALYSED_PEAK)}
          color={colors.reactant}
          dashed={dashed}
        />
        <path
          d={`M260 ${UNCATALYSED_PEAK} H${PEAK_X}`}
          stroke={colors.reactant}
          strokeWidth={2}
          strokeDasharray="6 6"
        />
        <ArrowLine
          x1={260}
          y1={REACTANT_Y}
          x2={260}
          y2={UNCATALYSED_PEAK + 2}
          color={colors.reactant}
        />
        <Stroke
          d={barrier(CATALYSED_PEAK)}
          color={colors.catalyst}
          width={5}
          drawn={catalysed}
        />
        <g opacity={catalysedLabels}>
          <path
            d={`M330 ${CATALYSED_PEAK} H${PEAK_X}`}
            stroke={colors.catalyst}
            strokeWidth={2}
            strokeDasharray="6 6"
          />
          <ArrowLine
            x1={330}
            y1={REACTANT_Y}
            x2={330}
            y2={CATALYSED_PEAK + 2}
            color={colors.catalyst}
          />
        </g>
        <g opacity={delta}>
          <path
            d={`M700 ${REACTANT_Y} H840`}
            stroke={colors.text}
            strokeWidth={2}
            strokeDasharray="6 6"
          />
          <ArrowLine
            x1={820}
            y1={REACTANT_Y}
            x2={820}
            y2={PRODUCT_Y - 2}
            color={colors.text}
          />
        </g>
      </Canvas>
      <div style={{ opacity: base }}>
        <div
          style={{
            position: "absolute",
            left: AXIS.x - 40,
            top: (AXIS.top + AXIS.y) / 2,
            transform: "translate(-50%, -50%) rotate(-90deg)",
            fontFamily: FONT,
            fontSize: type.small,
            color: colors.text,
          }}
        >
          energy
        </div>
        <Text
          x={(AXIS.x + AXIS.right) / 2}
          y={AXIS.y + 36}
          size={type.small}
          anchor="middle"
        >
          reaction progress
        </Text>
        <Text x={240} y={REACTANT_Y + 30} size={28} color={colors.reactant}>
          reactants
        </Text>
        <Text x={740} y={PRODUCT_Y + 30} size={28} color={colors.product}>
          products
        </Text>
        <Text
          x={272}
          y={400}
          size={type.small}
          weight={700}
          color={colors.reactant}
        >
          <Ea />
        </Text>
        <Text
          x={PEAK_X}
          y={UNCATALYSED_PEAK - 30}
          size={28}
          anchor="middle"
          color={colors.reactant}
        >
          original path
        </Text>
      </div>
      <Text
        x={342}
        y={485}
        size={type.small}
        weight={700}
        color={colors.catalyst}
        opacity={catalysedLabels}
      >
        <Ea />
      </Text>
      <Text
        x={650}
        y={440}
        size={28}
        weight={500}
        color={colors.catalyst}
        opacity={catalysedLabels}
      >
        catalysed path
      </Text>
      <Text x={834} y={620} size={type.small} weight={700} opacity={delta}>
        ΔH
      </Text>
      <Text x={834} y={656} size={26} opacity={delta}>
        unchanged
      </Text>
      <Block
        left={RIGHT}
        top={290}
        width={800}
        size={type.small}
        {...dropped(frame, AT.converter)}
      >
        <div style={{ fontWeight: 700 }}>
          Catalytic converter (metal surface)
        </div>
        <div>
          NO
          <Arrow />
          <F>N2</F> and <F>O2</F>
        </div>
        <div>
          CO
          <Arrow />
          <F>CO2</F>
        </div>
      </Block>
      <Block
        left={RIGHT}
        top={470}
        width={800}
        size={40}
        {...dropped(frame, AT.catalyst)}
      >
        <span style={{ fontWeight: 700, color: colors.catalyst }}>
          Catalyst:
        </span>{" "}
        put in first, given back last.
      </Block>
      <Pitfall
        top={560}
        left={RIGHT}
        width={800}
        size={34}
        opacity={pitfall.opacity}
        scale={pitfall.scale}
      >
        a catalyst is not an intermediate. It does not shift equilibrium or
        change ΔH.
      </Pitfall>
      <div
        style={{
          position: "absolute",
          left: RIGHT,
          top: 800,
          display: "flex",
          gap: 12,
        }}
      >
        {LEVERS.map((lever, i) => {
          const chip = dropped(frame, AT.levers + i * 5);
          return (
            <div
              key={lever}
              style={{
                padding: "10px 16px",
                borderRadius: 16,
                background: colors.catalystFill,
                border: `2px solid ${colors.catalyst}`,
                fontFamily: FONT,
                fontSize: 28,
                fontWeight: 500,
                color: colors.text,
                opacity: chip.opacity,
                transform: `translateY(${chip.dy}px)`,
              }}
            >
              {lever}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
}
