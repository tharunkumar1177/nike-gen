import { AbsoluteFill, useVideoConfig } from "remotion";
import { dropped, fadeIn, pop } from "../components/anim";
import { makeParticles, placeParticle } from "../components/particles";
import { useSceneFrame } from "../components/SceneFrame";
import { Text } from "../components/Text";
import { cue } from "../cues";
import { colors, type } from "../theme";

const TITLE_AT = cue("ideal-gas-law", "The ideal gas law");
const EQUATION_AT = cue("ideal-gas-law", "P V equals n R T");
const BOX_AT = cue("ideal-gas-law", "models a gas");
const PARTICLES_AT = cue("ideal-gas-law", "point particles");
const VOLUME_AT = cue("ideal-gas-law", "negligible volume");
const FORCES_AT = cue("ideal-gas-law", "no intermolecular forces");

const BOX = { x: 1100, y: 500, width: 600, height: 400 } as const;
const RADIUS = 8;
const PARTICLES = makeParticles(20, 14, 0.006);

export function IdealGasScene() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();
  const grow = pop(frame, fps, PARTICLES_AT);
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
        Ideal Gas Law
      </Text>
      <Text
        x={960}
        y={310}
        size={type.subtitle}
        weight={500}
        color={colors.gasText}
        anchor="middle"
        opacity={fadeIn(frame, EQUATION_AT)}
      >
        <i>PV</i> = <i>nRT</i>
      </Text>
      <Text
        x={960}
        y={410}
        size={type.body}
        color={colors.gasText}
        anchor="middle"
        opacity={fadeIn(frame, BOX_AT)}
      >
        Models a gas of point particles with no intermolecular forces
      </Text>
      <svg
        width={1920}
        height={1080}
        style={{ position: "absolute", left: 0, top: 0 }}
      >
        <rect
          {...BOX}
          rx={8}
          fill="none"
          stroke={colors.gas}
          strokeWidth={4}
          opacity={fadeIn(frame, BOX_AT)}
        />
        {grow > 0 &&
          PARTICLES.map((particle, index) => {
            const { x, y } = placeParticle(particle, frame, BOX, RADIUS);
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r={RADIUS * (0.8 + 0.2 * grow)}
                fill={colors.gas}
                opacity={Math.min(1, grow * 2)}
              />
            );
          })}
      </svg>
      <Text
        x={200}
        y={620}
        size={type.body}
        color={colors.gasText}
        {...dropped(frame, VOLUME_AT)}
      >
        1. Negligible volume
      </Text>
      <Text
        x={200}
        y={720}
        size={type.body}
        color={colors.gasText}
        {...dropped(frame, FORCES_AT)}
      >
        2. No intermolecular forces
      </Text>
    </AbsoluteFill>
  );
}
