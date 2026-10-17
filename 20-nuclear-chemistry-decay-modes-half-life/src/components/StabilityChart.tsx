import { colors, FONT } from "../theme";
import { Text } from "./Text";

const ORIGIN = { x: 900, y: 900 } as const;
const PX_PER_Z = 8;
const PX_PER_N = 4;
const Z_MAX = 100;
const N_MAX = 150;
/** Heaviest element with a stable nuclide; every heavier nucleus is radioactive. */
const Z_STABLE_MAX = 83;
/** Half-width of the schematic band, in neutrons. */
const BAND_HALF = 6;

export const toX = (z: number) => ORIGIN.x + z * PX_PER_Z;
export const toY = (n: number) => ORIGIN.y - n * PX_PER_N;

/**
 * Schematic centre line of the band of stability: n/p = 1 up to Z = 20,
 * rising smoothly to n/p = 1.5 at Z = 83. Not fitted to nuclide data.
 */
export function bandCentre(z: number) {
  const heavy = Math.max(0, (z - 20) / (Z_STABLE_MAX - 20));
  return z * (1 + 0.5 * heavy ** 1.3);
}

const SAMPLES = Array.from({ length: Z_STABLE_MAX }, (_, i) => i + 1);

function polygon(upper: (z: number) => number, lower: (z: number) => number) {
  const top = SAMPLES.map((z) => `${toX(z)},${toY(upper(z))}`);
  const bottom = [...SAMPLES]
    .reverse()
    .map((z) => `${toX(z)},${toY(lower(z))}`);
  return [...top, ...bottom].join(" ");
}

const BAND = polygon(
  (z) => bandCentre(z) + BAND_HALF,
  (z) => Math.max(0, bandCentre(z) - BAND_HALF),
);
const ABOVE = polygon(
  (z) => Math.min(N_MAX, bandCentre(z) + BAND_HALF + 28),
  (z) => bandCentre(z) + BAND_HALF,
);
const BELOW = polygon(
  (z) => Math.max(0, bandCentre(z) - BAND_HALF),
  (z) => Math.max(0, bandCentre(z) - BAND_HALF - 22),
);

type Props = {
  axes: number;
  /** 0→1 draw-on of the n = p line and the band. */
  band: number;
  heavy: number;
  /** Neutron-rich region above the band (β⁻). */
  above?: number;
  /** Proton-rich region below the band (β⁺ / EC). */
  below?: number;
};

const ARROW_Z = 40;

/** Neutrons-vs-protons chart with a schematic band of stability. */
export function StabilityChart({
  axes,
  band,
  heavy,
  above = 0,
  below = 0,
}: Props) {
  const aboveStart = { z: ARROW_Z - 2, n: bandCentre(ARROW_Z) + 24 };
  const belowStart = { z: ARROW_Z + 2, n: bandCentre(ARROW_Z) - 20 };
  return (
    <>
      <svg
        width={1920}
        height={1080}
        style={{ position: "absolute", left: 0, top: 0 }}
      >
        <defs>
          <clipPath id="band-reveal">
            <rect
              x={ORIGIN.x}
              y={0}
              width={(toX(Z_MAX) - ORIGIN.x) * band}
              height={1080}
            />
          </clipPath>
          {(
            [
              ["betaMinus", colors.betaMinusText],
              ["positron", colors.positronText],
            ] as const
          ).map(([token, fill]) => (
            <marker
              key={token}
              id={`head-${token}`}
              viewBox="0 0 10 10"
              refX={8}
              refY={5}
              markerWidth={5}
              markerHeight={5}
              orient="auto"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={fill} />
            </marker>
          ))}
        </defs>
        <g opacity={heavy * 0.25}>
          <rect
            x={toX(Z_STABLE_MAX)}
            y={toY(N_MAX)}
            width={toX(Z_MAX) - toX(Z_STABLE_MAX)}
            height={ORIGIN.y - toY(N_MAX)}
            fill={colors.alpha}
          />
        </g>
        <g opacity={above * 0.3}>
          <polygon points={ABOVE} fill={colors.betaMinus} />
        </g>
        <g opacity={below * 0.3}>
          <polygon points={BELOW} fill={colors.positron} />
        </g>
        <g clipPath="url(#band-reveal)">
          <polygon points={BAND} fill={colors.band} opacity={0.75} />
          <line
            x1={toX(0)}
            y1={toY(0)}
            x2={toX(Z_MAX)}
            y2={toY(Z_MAX)}
            stroke={colors.muted}
            strokeWidth={2}
            strokeDasharray="10 8"
          />
        </g>
        <g opacity={axes} stroke={colors.text} strokeWidth={3}>
          <line x1={ORIGIN.x} y1={ORIGIN.y} x2={toX(Z_MAX)} y2={ORIGIN.y} />
          <line x1={ORIGIN.x} y1={ORIGIN.y} x2={ORIGIN.x} y2={toY(N_MAX)} />
          {[20, 40, 60, 80, 100].map((z) => (
            <line
              key={z}
              x1={toX(z)}
              y1={ORIGIN.y}
              x2={toX(z)}
              y2={ORIGIN.y + 10}
            />
          ))}
          {[50, 100, 150].map((n) => (
            <line
              key={n}
              x1={ORIGIN.x - 10}
              y1={toY(n)}
              x2={ORIGIN.x}
              y2={toY(n)}
            />
          ))}
        </g>
        <g opacity={above}>
          <line
            x1={toX(aboveStart.z)}
            y1={toY(aboveStart.n)}
            x2={toX(aboveStart.z + 5)}
            y2={toY(aboveStart.n - 5)}
            stroke={colors.betaMinusText}
            strokeWidth={5}
            markerEnd="url(#head-betaMinus)"
          />
        </g>
        <g opacity={below}>
          <line
            x1={toX(belowStart.z)}
            y1={toY(belowStart.n)}
            x2={toX(belowStart.z - 5)}
            y2={toY(belowStart.n + 5)}
            stroke={colors.positronText}
            strokeWidth={5}
            markerEnd="url(#head-positron)"
          />
        </g>
      </svg>
      {[0, 20, 40, 60, 80, 100].map((z) => (
        <Text
          key={z}
          x={toX(z)}
          y={922}
          size={26}
          anchor="middle"
          color={colors.muted}
          opacity={axes}
        >
          {z}
        </Text>
      ))}
      {[0, 50, 100, 150].map((n) => (
        <Text
          key={n}
          x={ORIGIN.x - 16}
          y={toY(n)}
          size={26}
          anchor="end"
          color={colors.muted}
          opacity={axes}
        >
          {n}
        </Text>
      ))}
      <Text x={1300} y={946} size={30} anchor="middle" opacity={axes}>
        Protons (Z)
      </Text>
      <div
        style={{
          position: "absolute",
          left: 815,
          top: 600,
          transform: "translate(-50%, -50%) rotate(-90deg)",
          fontFamily: FONT,
          fontSize: 30,
          color: colors.text,
          whiteSpace: "nowrap",
          opacity: axes,
        }}
      >
        Neutrons (n)
      </div>
      <Text
        x={toX(Z_MAX) - 8}
        y={toY(Z_MAX) + 24}
        size={26}
        anchor="end"
        color={colors.muted}
        opacity={band}
      >
        n = p
      </Text>
      <Text
        x={toX(62)}
        y={toY(bandCentre(62)) - 44}
        size={30}
        weight={700}
        anchor="end"
        color={colors.bandText}
        opacity={band}
      >
        Band of stability
      </Text>
      <Text
        x={toX(62)}
        y={toY(bandCentre(62)) - 12}
        size={22}
        anchor="end"
        color={colors.muted}
        opacity={band}
      >
        (schematic)
      </Text>
      <Text
        x={(toX(Z_STABLE_MAX) + toX(Z_MAX)) / 2}
        y={toY(140)}
        size={30}
        weight={700}
        anchor="middle"
        color={colors.alphaText}
        opacity={heavy}
      >
        Z &gt; 83
      </Text>
      <Text
        x={toX(aboveStart.z) - 12}
        y={toY(aboveStart.n) - 20}
        size={32}
        weight={700}
        anchor="end"
        color={colors.betaMinusText}
        opacity={above}
      >
        neutron-rich: β<sup style={{ fontSize: "0.6em" }}>−</sup>
      </Text>
      <Text
        x={toX(belowStart.z) + 12}
        y={toY(belowStart.n) + 26}
        size={32}
        weight={700}
        color={colors.positronText}
        opacity={below}
      >
        proton-rich: β<sup style={{ fontSize: "0.6em" }}>+</sup> or EC
      </Text>
    </>
  );
}
