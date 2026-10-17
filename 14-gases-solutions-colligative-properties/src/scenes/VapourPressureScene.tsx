import { AbsoluteFill } from "remotion";
import { dropped, fadeIn } from "../components/anim";
import { Beaker } from "../components/Beaker";
import { seeded } from "../components/particles";
import { useSceneFrame } from "../components/SceneFrame";
import { Eq, Text } from "../components/Text";
import { cue } from "../cues";
import { colors, type } from "../theme";

const TITLE_AT = cue("vapour-pressure", "Adding a non-volatile solute");
const SOLUTION_AT = cue(
  "vapour-pressure",
  "lowers the solvent's vapour pressure",
);
const RAOULT_AT = cue("vapour-pressure", "According to Raoult's law");
const VALUE_AT = cue("vapour-pressure", "twenty three point seven six torr");

const GLASS = { top: 500, bottom: 800, width: 240, liquid: 550 } as const;
const PURE_X = 360;
const SOLUTION_X = 820;
const VAPOUR = { from: 550, to: 400, spread: 90, radius: 8, frames: 75 };
const SOLUTE_RADIUS = 12;

/** Rising vapour particles: each loops from the surface to the top of the rise. */
function vapour(count: number, seed: number) {
  const random = seeded(seed);
  return Array.from({ length: count }, (_, index) => ({
    phase: index / count,
    dx: (random() * 2 - 1) * VAPOUR.spread,
    wobble: random() * 2 * Math.PI,
  }));
}

const PURE_VAPOUR = vapour(10, 5);
const SOLUTION_VAPOUR = vapour(4, 9);

const SOLUTES = (() => {
  const random = seeded(23);
  const inner = GLASS.width - 8 - 4 * SOLUTE_RADIUS;
  const depth = GLASS.bottom - GLASS.liquid - 4 * SOLUTE_RADIUS;
  return Array.from({ length: 10 }, () => ({
    x: SOLUTION_X - inner / 2 + random() * inner,
    y: GLASS.liquid + 2 * SOLUTE_RADIUS + random() * depth,
    wobble: random() * 2 * Math.PI,
  }));
})();

function Vapour({
  cx,
  particles,
  frame,
  opacity,
}: {
  cx: number;
  particles: ReturnType<typeof vapour>;
  frame: number;
  opacity: number;
}) {
  return (
    <g opacity={opacity}>
      {particles.map(({ phase, dx, wobble }, index) => {
        const t = (frame / VAPOUR.frames + phase) % 1;
        return (
          <circle
            key={index}
            cx={cx + dx + 8 * Math.sin(wobble + t * 2 * Math.PI)}
            cy={VAPOUR.from - t * (VAPOUR.from - VAPOUR.to)}
            r={VAPOUR.radius}
            fill={colors.gas}
            opacity={Math.sin(Math.PI * t)}
          />
        );
      })}
    </g>
  );
}

export function VapourPressureScene() {
  const frame = useSceneFrame();
  const pure = fadeIn(frame, TITLE_AT);
  const solution = fadeIn(frame, SOLUTION_AT);
  return (
    <AbsoluteFill>
      <Text
        x={960}
        y={180}
        size={type.title}
        weight={700}
        color={colors.gasText}
        anchor="middle"
        {...dropped(frame, TITLE_AT)}
      >
        Vapour-Pressure Lowering
      </Text>
      <svg
        width={1920}
        height={1080}
        style={{ position: "absolute", left: 0, top: 0 }}
      >
        <g opacity={pure}>
          <Beaker cx={PURE_X} {...GLASS} />
        </g>
        <Vapour
          cx={PURE_X}
          particles={PURE_VAPOUR}
          frame={frame}
          opacity={solution}
        />
        <g opacity={solution}>
          <Beaker cx={SOLUTION_X} {...GLASS}>
            {SOLUTES.map(({ x, y, wobble }, index) => (
              <circle
                key={index}
                cx={x + 4 * Math.sin(wobble + frame / 20)}
                cy={y + 4 * Math.cos(wobble + frame / 25)}
                r={SOLUTE_RADIUS}
                fill={colors.solute}
              />
            ))}
          </Beaker>
        </g>
        <Vapour
          cx={SOLUTION_X}
          particles={SOLUTION_VAPOUR}
          frame={frame}
          opacity={solution}
        />
      </svg>
      <Text
        x={PURE_X}
        y={850}
        size={type.body}
        color={colors.solventText}
        anchor="middle"
        opacity={pure}
      >
        Pure Solvent
      </Text>
      <Text
        x={SOLUTION_X}
        y={850}
        size={type.body}
        color={colors.soluteText}
        anchor="middle"
        opacity={solution}
      >
        Solution
      </Text>
      <Text
        x={1420}
        y={450}
        size={type.body}
        color={colors.gasText}
        anchor="middle"
        {...dropped(frame, RAOULT_AT)}
      >
        <Eq>P_solution = X_solvent · P°_solvent</Eq>
      </Text>
      <Text
        x={1420}
        y={600}
        size={type.body}
        color={colors.solventText}
        anchor="middle"
        opacity={fadeIn(frame, VALUE_AT)}
      >
        P°(water, 25 °C) = 23.76 torr
      </Text>
    </AbsoluteFill>
  );
}
