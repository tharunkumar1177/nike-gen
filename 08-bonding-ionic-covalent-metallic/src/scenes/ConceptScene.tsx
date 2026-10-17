import { spring, useVideoConfig } from "remotion";
import { fadeIn, lerp, pop, progress } from "../components/anim";
import { Chip, PitfallTag, Title } from "../components/Labels";
import { useSceneFrame } from "../components/SceneFrame";
import { Text } from "../components/Text";
import { cue } from "../cues";
import { colors, FONT, SAFE, type } from "../theme";

const SCENE = "concept-energy";

const ORIGIN = { x: 1100, y: 850 };
const X_END = 1750;
const Y_TOP = 350;
const ZERO_Y = 500;
const WELL_X = 1350;
const DEPTH = 250;
const STIFFNESS = 0.008;
const START_X = 1700;

/** Morse-shaped potential: screen y of the curve at screen x. */
function curveY(x: number) {
  const e = Math.exp(-STIFFNESS * (x - WELL_X));
  return ZERO_Y + DEPTH * (1 - (1 - e) ** 2);
}

const LEFT_X =
  WELL_X + Math.log(1 + Math.sqrt(1 + (ZERO_Y - Y_TOP) / DEPTH)) / -STIFFNESS;

function curvePath() {
  const points: string[] = [];
  for (let x = LEFT_X; x <= X_END; x += 4) {
    points.push(
      `${points.length === 0 ? "M" : "L"}${x.toFixed(1)},${curveY(x).toFixed(1)}`,
    );
  }
  return points.join(" ");
}

const PATH = curvePath();

export function ConceptScene() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();

  const intro = cue(SCENE, "A chemical bond");
  const approach = cue(SCENE, "lowers the total energy");
  const tag = cue(SCENE, "because they want");
  const strike = cue(SCENE, "full octet", 10);
  const pulse = cue(SCENE, "attraction releases energy");

  const textIn = fadeIn(frame, intro);
  const draw = progress(frame, intro, intro + 60);
  const slide = spring({
    frame: frame - approach,
    fps,
    config: { mass: 1, damping: 14, stiffness: 50 },
  });
  const markerX = lerp(START_X, WELL_X, slide);
  const markerIn = fadeIn(frame, approach - 10);
  const separation = lerp(300, 125, slide);
  const chipIn = pop(frame, fps, approach + 40);
  const tagIn = pop(frame, fps, tag);
  const pulseT = progress(frame, pulse, pulse + 30);
  const pulseScale = 1 + 0.05 * Math.sin(Math.PI * pulseT);

  return (
    <>
      <Title title="Chemical Bonds" subtitle="Energy, Not Octets" />
      <div
        style={{
          position: "absolute",
          left: SAFE,
          top: 360,
          width: 750,
          fontFamily: FONT,
          fontSize: type.body,
          lineHeight: 1.3,
          color: colors.text,
          opacity: textIn,
          transform: `translateY(${(1 - textIn) * 20}px)`,
        }}
      >
        A chemical bond is an attraction between atoms or ions that lowers the
        total energy of the system.
      </div>
      <PitfallTag
        x={SAFE}
        y={720}
        strike={progress(frame, strike, strike + 20)}
        opacity={Math.min(1, tagIn * 1.5)}
        dy={(1 - tagIn) * -30}
      >
        Atoms want a full octet
      </PitfallTag>

      <svg
        width={1920}
        height={1080}
        style={{ position: "absolute", left: 0, top: 0 }}
      >
        <g opacity={draw > 0 ? 1 : 0}>
          <line
            x1={ORIGIN.x}
            y1={ORIGIN.y}
            x2={lerp(ORIGIN.x, X_END, draw)}
            y2={ORIGIN.y}
            stroke={colors.axis}
            strokeWidth={4}
          />
          <line
            x1={ORIGIN.x}
            y1={ORIGIN.y}
            x2={ORIGIN.x}
            y2={lerp(ORIGIN.y, Y_TOP, draw)}
            stroke={colors.axis}
            strokeWidth={4}
          />
          <g
            transform={`translate(${WELL_X} ${curveY(WELL_X)}) scale(${pulseScale}) translate(${-WELL_X} ${-curveY(WELL_X)})`}
          >
            <path
              d={PATH}
              fill="none"
              stroke={colors.covalent}
              strokeWidth={6}
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={1 - draw}
            />
          </g>
        </g>
        {markerIn > 0 ? (
          <circle
            cx={markerX}
            cy={curveY(markerX)}
            r={14}
            fill={colors.text}
            opacity={markerIn}
          />
        ) : null}
        {markerIn > 0 ? (
          <g opacity={markerIn}>
            {[-1, 1].map((side) => (
              <circle
                key={side}
                cx={1450 + (side * separation) / 2}
                cy={420}
                r={30}
                fill="#E5E7EB"
                stroke="#9CA3AF"
                strokeWidth={4}
              />
            ))}
          </g>
        ) : null}
      </svg>

      <Text x={1425} y={900} size={type.label} weight={500} opacity={draw}>
        Distance between atoms
      </Text>
      <Text
        x={1050}
        y={600}
        size={type.label}
        weight={500}
        rotate={-90}
        opacity={draw}
      >
        Energy
      </Text>
      <Chip
        x={WELL_X}
        y={800}
        opacity={Math.min(1, chipIn * 1.5)}
        scale={(0.9 + 0.1 * chipIn) * pulseScale}
        dy={(1 - chipIn) * 20}
      >
        Lower total energy
      </Chip>
    </>
  );
}
