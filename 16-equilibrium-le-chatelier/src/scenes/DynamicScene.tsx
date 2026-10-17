import { AbsoluteFill, useVideoConfig } from "remotion";
import {
  dropped,
  easeInOut,
  fadeIn,
  lerp,
  popped,
  progress,
  pulse,
} from "../components/anim";
import { ConcentrationGraph } from "../components/ConcentrationGraph";
import { Reaction } from "../components/Reaction";
import { useSceneFrame } from "../components/SceneFrame";
import { F, Text } from "../components/Text";
import { cue } from "../cues";
import { fromStart } from "../equilibrium";
import { colors, HEADING_Y, SAFE, type } from "../theme";

const EQUAL_AT = cue("dynamic-equilibrium", "rates become equal");
const RUNNING_AT = cue("dynamic-equilibrium", "does not stop");
const CONSTANT_AT = cue("dynamic-equilibrium", "concentrations stay constant");
const UNEQUAL_AT = cue("dynamic-equilibrium", "not necessarily equal");

const RATES = { center: 520, forwardY: 560, reverseY: 700 } as const;
const GRAPH = { x: 1000, y: 360, width: 560, height: 440 } as const;

type RateArrowProps = {
  y: number;
  length: number;
  color: string;
  left: boolean;
  scale: number;
};

function RateArrow({ y, length, color, left, scale }: RateArrowProps) {
  const half = (length * scale) / 2;
  const tail = left ? RATES.center + half : RATES.center - half;
  const head = left ? RATES.center - half : RATES.center + half;
  const dir = left ? -1 : 1;
  return (
    <g stroke={color} strokeWidth={10} strokeLinecap="round" fill="none">
      <line x1={tail} y1={y} x2={head - dir * 6} y2={y} />
      <polyline
        points={`${head - dir * 30},${y - 24} ${head},${y} ${head - dir * 30},${y + 24}`}
        strokeLinejoin="round"
      />
    </g>
  );
}

export function DynamicScene() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();
  const equal = progress(frame, EQUAL_AT, EQUAL_AT + 45, easeInOut);
  const arrows = fadeIn(frame, EQUAL_AT - 25);
  const beat = Math.max(
    pulse(frame, RUNNING_AT),
    pulse(frame, RUNNING_AT + 20),
  );
  const reveal = progress(frame, UNEQUAL_AT - 10, UNEQUAL_AT + 80, easeInOut);
  const values = fadeIn(frame, UNEQUAL_AT + 80);
  return (
    <AbsoluteFill>
      <Text
        x={SAFE}
        y={HEADING_Y}
        size={type.subtitle}
        weight={700}
        {...popped(frame, fps, 0)}
      >
        Dynamic Equilibrium
      </Text>
      <Text
        x={SAFE}
        y={240}
        size={type.body}
        color={colors.muted}
        {...dropped(frame, EQUAL_AT)}
      >
        Forward and reverse rates are equal. Concentrations are constant.
      </Text>
      <Reaction
        x={RATES.center}
        y={420}
        size={type.subtitle}
        directional
        {...popped(frame, fps, 10)}
      />
      <svg
        width="100%"
        height="100%"
        style={{ position: "absolute", opacity: arrows }}
      >
        <RateArrow
          y={RATES.forwardY}
          length={lerp(560, 320, equal)}
          color={colors.forward}
          left={false}
          scale={beat}
        />
        <RateArrow
          y={RATES.reverseY}
          length={lerp(80, 320, equal)}
          color={colors.reverse}
          left
          scale={beat}
        />
      </svg>
      <Text
        x={RATES.center}
        y={RATES.forwardY + 50}
        size={type.label}
        weight={500}
        color={colors.forwardText}
        anchor="middle"
        opacity={arrows}
      >
        Forward rate
      </Text>
      <Text
        x={RATES.center}
        y={RATES.reverseY + 50}
        size={type.label}
        weight={500}
        color={colors.reverseText}
        anchor="middle"
        opacity={arrows}
      >
        Reverse rate
      </Text>
      <Text
        x={RATES.center}
        y={850}
        size={type.label}
        weight={700}
        color={colors.text}
        anchor="middle"
        opacity={fadeIn(frame, CONSTANT_AT)}
      >
        Both directions keep running
      </Text>
      <ConcentrationGraph
        {...GRAPH}
        opacity={fadeIn(frame, UNEQUAL_AT - 20)}
        reveal={reveal}
        band={{
          from: 0.5,
          opacity: progress(frame, UNEQUAL_AT + 60, UNEQUAL_AT + 80),
          label: "Equilibrium",
        }}
        series={[
          {
            pieces: [{ from: 0, to: 1, c: fromStart.n2o4 }],
            color: colors.n2o4Text,
            label: (
              <>
                <F>N2O4</F> <span style={{ opacity: values }}>0.042 M</span>
              </>
            ),
          },
          {
            pieces: [{ from: 0, to: 1, c: fromStart.no2 }],
            color: colors.no2Text,
            label: (
              <>
                <F>NO2</F> <span style={{ opacity: values }}>0.016 M</span>
              </>
            ),
          },
        ]}
      />
    </AbsoluteFill>
  );
}
