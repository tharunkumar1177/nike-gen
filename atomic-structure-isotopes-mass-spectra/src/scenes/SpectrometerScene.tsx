import { AbsoluteFill } from "remotion";
import { fadeIn, lerp, progress } from "../components/anim";
import { useSceneFrame } from "../components/SceneFrame";
import { Text } from "../components/Text";
import { colors, FONT, type, VIDEO } from "../theme";

const BEAM_Y = 360;
const INLET_X = 120;
const PLATES_X = 550;
const FIELD_X = 700;
const DETECTOR_X = 1400;
const ION_R = 10;

const T = {
  build: [0, 60],
  plates: [60, 120],
  field: [150, 210],
  detector: [210, 270],
  ionizeLabel: 100,
  accelerateLabel: 220,
  fieldLabel: 250,
  paths: [380, 440],
  deflectLabel: 400,
  detectLabel: 455,
} as const;

const EMIT_START = 120;
const EMIT_EVERY = 30;
const EMIT_END = 700;
/** Frames from inlet to plates, then plates to detector. */
const SLOW_FRAMES = 60;
const FAST_FRAMES = 90;
const FLASH_FRAMES = 15;

type Isotope = {
  endY: number;
  fill: string;
  stroke: string;
};

const CL35: Isotope = {
  endY: 800,
  fill: colors.cl35,
  stroke: colors.cl35Text,
};
const CL37: Isotope = {
  endY: 600,
  fill: colors.cl37,
  stroke: colors.cl37Text,
};

function curvePoint(isotope: Isotope, t: number) {
  return {
    x: FIELD_X + (DETECTOR_X - FIELD_X) * t,
    y: BEAM_Y + t * t * (isotope.endY - BEAM_Y),
  };
}

function curveLength(isotope: Isotope) {
  let length = 0;
  let last = curvePoint(isotope, 0);
  for (let i = 1; i <= 100; i += 1) {
    const next = curvePoint(isotope, i / 100);
    length += Math.hypot(next.x - last.x, next.y - last.y);
    last = next;
  }
  return length;
}

const CURVE_LENGTH = new Map([
  [CL35, curveLength(CL35)],
  [CL37, curveLength(CL37)],
]);

function ionPosition(isotope: Isotope, age: number) {
  if (age <= SLOW_FRAMES) {
    return { x: lerp(INLET_X, PLATES_X, age / SLOW_FRAMES), y: BEAM_Y };
  }
  const curve = CURVE_LENGTH.get(isotope) ?? 0;
  const straight = FIELD_X - PLATES_X;
  const travelled = ((age - SLOW_FRAMES) / FAST_FRAMES) * (straight + curve);
  if (travelled <= straight) {
    return { x: PLATES_X + travelled, y: BEAM_Y };
  }
  return curvePoint(isotope, Math.min(1, (travelled - straight) / curve));
}

const IONS = Array.from(
  { length: Math.floor((EMIT_END - EMIT_START) / EMIT_EVERY) + 1 },
  (_, i) => ({
    emitted: EMIT_START + i * EMIT_EVERY,
    isotope: i % 4 === 2 ? CL37 : CL35,
  }),
);

function pathD(isotope: Isotope) {
  return `M 300 ${BEAM_Y} L ${FIELD_X} ${BEAM_Y} Q 1050 ${BEAM_Y} ${DETECTOR_X} ${isotope.endY}`;
}

export function SpectrometerScene() {
  const frame = useSceneFrame();
  const build = progress(frame, T.build[0], T.build[1]);
  const plates = progress(frame, T.plates[0], T.plates[1]);
  const field = progress(frame, T.field[0], T.field[1]);
  const detector = progress(frame, T.detector[0], T.detector[1]);
  const paths = progress(frame, T.paths[0], T.paths[1]);

  return (
    <AbsoluteFill>
      <svg
        width={VIDEO.width}
        height={VIDEO.height}
        style={{ position: "absolute" }}
      >
        <rect
          x={FIELD_X}
          y={200}
          width={DETECTOR_X - FIELD_X}
          height={700}
          fill={colors.grid}
          opacity={field}
        />
        <g stroke={colors.axis} strokeWidth={4} strokeLinecap="round">
          {build > 0 ? (
            <>
              {[340, 380].map((y) => (
                <line
                  key={y}
                  x1={INLET_X}
                  y1={y}
                  x2={lerp(INLET_X, 300, build)}
                  y2={y}
                />
              ))}
              <rect
                x={300}
                y={320}
                width={150}
                height={80}
                fill="none"
                strokeDasharray={460}
                strokeDashoffset={460 * (1 - build)}
              />
            </>
          ) : null}
          {plates > 0 ? (
            <>
              <line x1={500} y1={300} x2={500} y2={lerp(300, 420, plates)} />
              <line x1={550} y1={300} x2={550} y2={lerp(300, 420, plates)} />
            </>
          ) : null}
          <line
            x1={DETECTOR_X}
            y1={400}
            x2={DETECTOR_X}
            y2={900}
            strokeWidth={8}
            opacity={detector}
          />
        </g>
        {[CL35, CL37].map((isotope) => (
          <path
            key={isotope.endY}
            d={pathD(isotope)}
            fill="none"
            stroke={isotope.stroke}
            strokeWidth={4}
            strokeDasharray="12 10"
            opacity={0.3 * paths}
          />
        ))}
        {IONS.map(({ emitted, isotope }) => {
          const age = frame - emitted;
          const total = SLOW_FRAMES + FAST_FRAMES;
          if (age < 0 || age > total + FLASH_FRAMES) return null;
          if (age > total) {
            const flash = (age - total) / FLASH_FRAMES;
            return (
              <circle
                key={emitted}
                cx={DETECTOR_X}
                cy={isotope.endY}
                r={lerp(ION_R, 24, flash)}
                fill="none"
                stroke={isotope.stroke}
                strokeWidth={4}
                opacity={0.6 * (1 - flash)}
              />
            );
          }
          const { x, y } = ionPosition(isotope, age);
          return (
            <g key={emitted}>
              <circle
                cx={x}
                cy={y}
                r={ION_R}
                fill={isotope.fill}
                stroke={isotope.stroke}
                strokeWidth={2}
              />
              {x >= 375 ? (
                <text
                  x={x + 15}
                  y={y - 15}
                  fontFamily={FONT}
                  fontSize={20}
                  fontWeight={700}
                  fill={colors.text}
                >
                  +1
                </text>
              ) : null}
            </g>
          );
        })}
      </svg>
      <Text
        x={375}
        y={270}
        size={type.body}
        opacity={fadeIn(frame, T.ionizeLabel)}
      >
        Ionize
      </Text>
      <Text
        x={525}
        y={470}
        size={type.body}
        opacity={fadeIn(frame, T.accelerateLabel)}
      >
        Accelerate
      </Text>
      <Text
        x={1050}
        y={850}
        size={type.body}
        color={colors.axis}
        opacity={fadeIn(frame, T.fieldLabel)}
      >
        Magnetic field
      </Text>
      <Text
        x={1050}
        y={250}
        size={type.body}
        weight={500}
        opacity={fadeIn(frame, T.deflectLabel)}
      >
        Deflect by m/z
      </Text>
      <Text
        x={1500}
        y={650}
        size={type.body}
        opacity={fadeIn(frame, T.detectLabel)}
      >
        Detect
      </Text>
    </AbsoluteFill>
  );
}
