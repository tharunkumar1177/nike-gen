import { AbsoluteFill, useVideoConfig } from "remotion";
import { fadeIn, lerp, pop, progress } from "../components/anim";
import { useSceneFrame } from "../components/SceneFrame";
import { Text } from "../components/Text";
import { colors, type, VIDEO } from "../theme";

const T = {
  atomicNumber: 30,
  massNumber: 180,
  isotopes: 280,
  symbols: 430,
  cl35: 540,
  cl37: 615,
} as const;

type Nuclide = {
  x: number;
  mass: string;
  counts: string;
  color: string;
  reveal: number;
};

const NUCLIDES: Nuclide[] = [
  {
    x: 660,
    mass: "35",
    counts: "17 p, 18 n",
    color: colors.cl35Text,
    reveal: T.cl35,
  },
  {
    x: 1260,
    mass: "37",
    counts: "17 p, 20 n",
    color: colors.cl37Text,
    reveal: T.cl37,
  },
];

/** Half the rendered width of "Cl" at 96 px bold, plus a small gap. */
const SCRIPT_OFFSET = 50;

const BRACE =
  "M 660 380 Q 660 360 680 360 L 940 360 Q 960 360 960 340 " +
  "Q 960 360 980 360 L 1240 360 Q 1260 360 1260 380";
const BRACE_LENGTH = 680;

export function IsotopesScene() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();
  const brace = progress(frame, T.isotopes, T.isotopes + 30);
  const braceLabel = pop(frame, fps, T.isotopes);
  const symbols = pop(frame, fps, T.symbols);

  return (
    <AbsoluteFill>
      <Text
        x={960}
        y={150}
        size={type.body}
        opacity={fadeIn(frame, T.atomicNumber)}
      >
        Atomic number Z: protons
      </Text>
      <Text
        x={960}
        y={220}
        size={type.body}
        opacity={fadeIn(frame, T.massNumber)}
      >
        Mass number A: protons + neutrons
      </Text>
      <svg
        width={VIDEO.width}
        height={VIDEO.height}
        style={{ position: "absolute" }}
      >
        {brace > 0 ? (
          <path
            d={BRACE}
            fill="none"
            stroke={colors.axis}
            strokeWidth={4}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={BRACE_LENGTH}
            strokeDashoffset={BRACE_LENGTH * (1 - brace)}
          />
        ) : null}
      </svg>
      <Text
        x={960}
        y={300}
        size={type.body}
        weight={500}
        opacity={Math.min(1, braceLabel)}
        scale={lerp(0.8, 1, braceLabel)}
      >
        Isotopes (Stable)
      </Text>
      {NUCLIDES.map((nuclide) => {
        const mass = pop(frame, fps, nuclide.reveal);
        const baseY = lerp(600, 540, symbols);
        return (
          <AbsoluteFill key={nuclide.mass}>
            <Text
              x={nuclide.x}
              y={baseY}
              size={type.title}
              weight={700}
              color={nuclide.color}
              opacity={Math.min(1, symbols)}
            >
              Cl
            </Text>
            <Text
              x={nuclide.x - SCRIPT_OFFSET}
              y={baseY + 50}
              size={type.subtitle}
              weight={500}
              color={nuclide.color}
              anchor="end"
              opacity={Math.min(1, symbols)}
            >
              17
            </Text>
            <Text
              x={nuclide.x - SCRIPT_OFFSET}
              y={490}
              size={type.subtitle}
              weight={500}
              color={nuclide.color}
              anchor="end"
              opacity={Math.min(1, mass)}
              scale={mass}
            >
              {nuclide.mass}
            </Text>
            <Text
              x={nuclide.x}
              y={680}
              size={type.label}
              opacity={Math.min(1, mass)}
              scale={mass}
            >
              {nuclide.counts}
            </Text>
          </AbsoluteFill>
        );
      })}
    </AbsoluteFill>
  );
}
