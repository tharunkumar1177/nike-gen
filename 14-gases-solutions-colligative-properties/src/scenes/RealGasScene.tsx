import { AbsoluteFill, useVideoConfig } from "remotion";
import {
  dropped,
  easeInOut,
  fadeIn,
  lerp,
  pop,
  progress,
} from "../components/anim";
import {
  hexCluster,
  makeParticles,
  placeParticle,
  slowedTime,
} from "../components/particles";
import { useSceneFrame } from "../components/SceneFrame";
import { Text } from "../components/Text";
import { cue } from "../cues";
import { colors, type } from "../theme";

const TITLE_AT = cue("real-gases", "Real gases");
const HIGH_P_AT = cue("real-gases", "high pressure");
const VOLUME_AT = cue("real-gases", "actual particle volume matters");
const LOW_T_AT = cue("real-gases", "low temperature");
const FORCES_AT = cue("real-gases", "attractive intermolecular forces");

const PISTON = { x: 300, width: 400, top: 450, bottom: 850, pressed: 700 };
const PISTON_FRAMES = 90;
const BIG_RADIUS = 24;
const CROWD = makeParticles(20, 27, 0.008);

const COLD = { x: 1220, y: 450, width: 400, height: 400 } as const;
const COLD_RADIUS = 8;
const COLD_FRAMES = 60;
const COLD_PARTICLES = makeParticles(20, 41, 0.008);
const CLUSTER = hexCluster(
  COLD_PARTICLES.length,
  COLD.x + COLD.width / 2,
  COLD.y + COLD.height / 2,
  26,
);
const BONDS = CLUSTER.flatMap((a, i) =>
  CLUSTER.slice(i + 1).flatMap((b, offset) =>
    Math.hypot(a.x - b.x, a.y - b.y) < 27
      ? [[i, i + 1 + offset] as const]
      : [],
  ),
);
/** Bonds fade out beyond this length, so none stretch across the box mid-huddle. */
const BOND_REACH = 60;

export function RealGasScene() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();
  const boxIn = fadeIn(frame, HIGH_P_AT);
  const press = progress(
    frame,
    HIGH_P_AT,
    HIGH_P_AT + PISTON_FRAMES,
    easeInOut,
  );
  const pistonY = lerp(PISTON.top, PISTON.pressed, press);
  const space = {
    x: PISTON.x,
    y: pistonY,
    width: PISTON.width,
    height: PISTON.bottom - pistonY,
  };
  const crowdIn = pop(frame, fps, VOLUME_AT);

  const coldIn = fadeIn(frame, LOW_T_AT);
  const coldTime = slowedTime(frame, LOW_T_AT, COLD_FRAMES, 0.2);
  const huddle =
    0.9 * progress(frame, LOW_T_AT, LOW_T_AT + COLD_FRAMES, easeInOut);
  const cold = COLD_PARTICLES.map((particle, index) => {
    const free = placeParticle(particle, coldTime, COLD, COLD_RADIUS);
    const home = CLUSTER[index] ?? free;
    return { x: lerp(free.x, home.x, huddle), y: lerp(free.y, home.y, huddle) };
  });
  const bondsIn = fadeIn(frame, FORCES_AT);

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
        Real Gases
      </Text>
      <Text
        x={500}
        y={350}
        size={type.subtitle}
        weight={500}
        color={colors.gasText}
        anchor="middle"
        opacity={boxIn}
      >
        High Pressure
      </Text>
      <Text
        x={1420}
        y={350}
        size={type.subtitle}
        weight={500}
        color={colors.gasText}
        anchor="middle"
        opacity={coldIn}
      >
        Low Temperature
      </Text>
      <svg
        width={1920}
        height={1080}
        style={{ position: "absolute", left: 0, top: 0 }}
      >
        <g opacity={boxIn}>
          <path
            d={`M${PISTON.x} ${PISTON.top} V${PISTON.bottom} H${PISTON.x + PISTON.width} V${PISTON.top}`}
            fill="none"
            stroke={colors.gas}
            strokeWidth={4}
          />
          {crowdIn > 0 &&
            CROWD.map((particle, index) => {
              const { x, y } = placeParticle(
                particle,
                frame,
                space,
                BIG_RADIUS,
              );
              return (
                <circle
                  key={index}
                  cx={x}
                  cy={y}
                  r={BIG_RADIUS * (0.8 + 0.2 * crowdIn)}
                  fill={colors.gas}
                  fillOpacity={0.85}
                  stroke={colors.gasText}
                  strokeWidth={2}
                  opacity={Math.min(1, crowdIn * 2)}
                />
              );
            })}
          <rect
            x={PISTON.x - 10}
            y={pistonY - 12}
            width={PISTON.width + 20}
            height={12}
            rx={4}
            fill={colors.gasText}
          />
          <rect
            x={PISTON.x + PISTON.width / 2 - 8}
            y={pistonY - 60}
            width={16}
            height={48}
            fill={colors.gasText}
          />
        </g>
        <g opacity={coldIn}>
          <rect
            {...COLD}
            rx={8}
            fill="none"
            stroke={colors.gas}
            strokeWidth={4}
          />
          {bondsIn > 0 &&
            BONDS.map(([a, b]) => {
              const from = cold[a];
              const to = cold[b];
              if (!from || !to) return null;
              const length = Math.hypot(from.x - to.x, from.y - to.y);
              const reach = Math.min(1, Math.max(0, BOND_REACH / length - 1));
              return (
                <line
                  key={`${a}-${b}`}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke={colors.solute}
                  strokeWidth={2}
                  strokeDasharray="5 4"
                  opacity={bondsIn * reach}
                />
              );
            })}
          {cold.map(({ x, y }, index) => (
            <circle
              key={index}
              cx={x}
              cy={y}
              r={COLD_RADIUS}
              fill={colors.gas}
            />
          ))}
        </g>
      </svg>
    </AbsoluteFill>
  );
}
