import { AbsoluteFill, useVideoConfig } from "remotion";
import { dropped, fadeIn, popped, progress } from "../components/anim";
import { DrawnArrow } from "../components/DrawnArrow";
import { useSceneFrame } from "../components/SceneFrame";
import { Arrow, Text } from "../components/Text";
import { cue } from "../cues";
import { colors, SAFE, type, VIDEO } from "../theme";

const TITLE_AT = cue("entropy", "entropy or delta S");
const DEFINITION_AT = cue("entropy", "dispersal of matter and energy");
const SOLID_AT = cue("entropy", "from a solid");
const LIQUID_AT = cue("entropy", "to a liquid");
const GAS_AT = cue("entropy", "and then to a gas");
const RULE_AT = cue("entropy", "increases the total number of moles of gas");

const BOX = 360;
const BOX_Y = 600;
const DOT = 14;
const COUNT = 16;

/** Deterministic pseudo-random sequence in [0, 1). */
function seeded(seed: number) {
  let state = seed;
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}

type Dot = { x: number; y: number; phase: number };

const SOLID: Dot[] = Array.from({ length: COUNT }, (_, i) => ({
  x: ((i % 4) - 1.5) * 2.4 * DOT,
  y: (Math.floor(i / 4) - 1.5) * 2.4 * DOT,
  phase: i,
}));

function scatter(
  seed: number,
  width: number,
  height: number,
  centreY: number,
): Dot[] {
  const next = seeded(seed);
  return Array.from({ length: COUNT }, (_, i) => ({
    x: (next() - 0.5) * width,
    y: centreY + (next() - 0.5) * height,
    phase: i * 1.7,
  }));
}

const LIQUID = scatter(7, 220, 110, 70);
const GAS = scatter(19, 300, 300, 0);

const STATES = [
  { label: "Solid", x: 300, dots: SOLID, wobble: 1.5, at: SOLID_AT },
  { label: "Liquid", x: 960, dots: LIQUID, wobble: 5, at: LIQUID_AT },
  { label: "Gas", x: 1620, dots: GAS, wobble: 12, at: GAS_AT },
] as const;

export function EntropyScene() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill>
      <Text
        x={SAFE}
        y={180}
        size={type.title}
        weight={700}
        color={colors.entropyText}
        {...dropped(frame, TITLE_AT)}
      >
        Entropy (ΔS)
      </Text>
      <Text
        x={SAFE}
        y={270}
        size={type.body}
        opacity={fadeIn(frame, DEFINITION_AT)}
      >
        Dispersal of matter and energy
      </Text>
      {STATES.map(({ label, x, dots, wobble, at }) => {
        const shown = popped(frame, fps, at);
        if (shown.opacity <= 0) return null;
        return (
          <div key={label}>
            <svg
              width={VIDEO.width}
              height={VIDEO.height}
              style={{ position: "absolute", left: 0, top: 0 }}
              opacity={shown.opacity}
            >
              <g
                transform={`translate(${x} ${BOX_Y}) scale(${shown.scale})`}
              >
                <rect
                  x={-BOX / 2}
                  y={-BOX / 2}
                  width={BOX}
                  height={BOX}
                  rx={16}
                  fill={colors.background}
                  stroke={colors.muted}
                  strokeWidth={4}
                />
                {dots.map((dot) => (
                  <circle
                    key={dot.phase}
                    cx={dot.x + wobble * Math.sin(frame / 9 + dot.phase)}
                    cy={dot.y + wobble * Math.cos(frame / 11 + dot.phase * 1.3)}
                    r={DOT}
                    fill={colors.entropy}
                    stroke={colors.entropyText}
                    strokeWidth={3}
                  />
                ))}
              </g>
            </svg>
            <Text
              x={x}
              y={850}
              size={type.body}
              anchor="middle"
              opacity={shown.opacity}
            >
              {label}
            </Text>
          </div>
        );
      })}
      <DrawnArrow
        from={[495, BOX_Y]}
        to={[765, BOX_Y]}
        progress={progress(frame, LIQUID_AT, LIQUID_AT + 20)}
        color={colors.entropyText}
      />
      <DrawnArrow
        from={[1155, BOX_Y]}
        to={[1425, BOX_Y]}
        progress={progress(frame, GAS_AT, GAS_AT + 20)}
        color={colors.entropyText}
      />
      <Text
        x={960}
        y={960}
        size={type.subtitle}
        weight={700}
        color={colors.entropyText}
        anchor="middle"
        {...popped(frame, fps, RULE_AT)}
      >
        More moles of gas
        <Arrow />
        ΔS &gt; 0
      </Text>
    </AbsoluteFill>
  );
}
