import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import {
  easeInOut,
  easeOutQuart,
  fadeIn,
  lerp,
  pop,
  progress,
  stagger,
} from "../components/anim";
import { categoryX, ChartFrame, valueY } from "../components/Chart";
import { Pitfall, Title } from "../components/Panels";
import { Sub } from "../components/Script";
import { Text } from "../components/Text";
import { AcrossArrow, DownArrow, TrendMap } from "../components/TrendMap";
import { cue } from "../cues";
import { element, GROUP_1_BELOW, PERIOD_2, valuesOf } from "../data";
import { colors, type, VIDEO } from "../theme";

const SCENE = "ionization-energy";

const START = cue(SCENE, "First ionization energy is the energy required");
const RISES = cue(SCENE, "It generally rises across a period");
const FALLS = cue(SCENE, "and falls down a group");
const BERYLLIUM = cue(SCENE, "However, removing beryllium's");
const TWO_P = cue(SCENE, "because two p is higher in energy");
const NITROGEN = cue(SCENE, "Nitrogen to oxygen also dips");
const COULOMB = cue(SCENE, "driven by ordinary Coulomb repulsion");

const IE = valuesOf([...PERIOD_2, ...GROUP_1_BELOW], "ie");
const SCALE = { min: 0, max: 2500 };
const TICKS = [0, 500, 1000, 1500, 2000, 2500];
const POINT_R = 16;
const HALO_R = 30;

function ieOf(symbol: string) {
  const { ie } = element(symbol);
  if (ie === undefined) {
    throw new Error(`No ionization energy for ${symbol}.`);
  }
  return ie;
}

const POINTS = PERIOD_2.map((symbol, index) => ({
  symbol,
  value: ieOf(symbol),
  x: categoryX(index, PERIOD_2.length),
  y: valueY(ieOf(symbol), SCALE),
}));

function point(symbol: string) {
  const found = POINTS.find((entry) => entry.symbol === symbol);
  if (!found) {
    throw new Error(`${symbol} is not on the chart.`);
  }
  return found;
}

const DIPS: readonly { symbols: readonly string[]; at: number }[] = [
  { symbols: ["Be", "B"], at: BERYLLIUM },
  { symbols: ["N", "O"], at: NITROGEN },
];

/** Polyline through the points, drawn up to `reveal` (0 … points - 1). */
function linePath(reveal: number) {
  const whole = Math.floor(reveal);
  const drawn = POINTS.slice(0, whole + 1);
  const last = POINTS[whole];
  const next = POINTS[whole + 1];
  const vertices = drawn.map(({ x, y }) => `${x},${y}`);
  if (last && next && reveal > whole) {
    const t = reveal - whole;
    vertices.push(`${lerp(last.x, next.x, t)},${lerp(last.y, next.y, t)}`);
  }
  return vertices.join(" ");
}

export function IonizationScene() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const map = progress(frame, START, START + 30);
  const reveal = {
    ...stagger(frame, START + 10, PERIOD_2),
    ...stagger(frame, START + 10 + 6 * PERIOD_2.length, GROUP_1_BELOW),
  };
  const across = progress(frame, RISES, RISES + 40, easeInOut);
  const down = progress(frame, FALLS, FALLS + 40, easeInOut);
  const chart = fadeIn(frame, RISES);
  const drawn = progress(frame, RISES + 10, RISES + 70, easeOutQuart);
  const line = drawn * (POINTS.length - 1);
  const note = fadeIn(frame, TWO_P);
  const pitfall = fadeIn(frame, COULOMB);
  const strike = progress(frame, COULOMB + 10, COULOMB + 30, easeOutQuart);
  const fix = pop(frame, fps, COULOMB + 30);
  const boron = point("B");
  return (
    <AbsoluteFill>
      <Title>First Ionization Energy</Title>
      <TrendMap
        color={colors.ie}
        values={IE}
        format={String}
        reveal={reveal}
        legend={
          <>
            IE<Sub>1</Sub> (kJ/mol)
          </>
        }
        opacity={map}
      />
      <AcrossArrow
        progress={across}
        color={colors.ie}
        labelColor={colors.ieText}
        label="Rises"
      />
      <DownArrow
        progress={down}
        color={colors.ie}
        labelColor={colors.ieText}
        label="Falls"
      />

      <ChartFrame
        title="Period 2 First Ionization Energy"
        yLabel={
          <>
            IE<Sub>1</Sub> (kJ/mol)
          </>
        }
        scale={SCALE}
        ticks={TICKS}
        categories={PERIOD_2}
        opacity={chart}
      />
      <svg
        width={VIDEO.width}
        height={VIDEO.height}
        style={{ position: "absolute", left: 0, top: 0 }}
      >
        <polyline
          points={linePath(line)}
          fill="none"
          stroke={colors.ie}
          strokeWidth={6}
          strokeLinejoin="round"
          opacity={chart}
        />
        {POINTS.map(({ symbol, x, y }, index) => (
          <circle
            key={symbol}
            cx={x}
            cy={y}
            r={POINT_R}
            fill={colors.ie}
            opacity={Math.min(1, Math.max(0, (line - index) * 3 + 1))}
          />
        ))}
        {DIPS.flatMap(({ symbols, at }) =>
          symbols.map((symbol) => {
            const { x, y } = point(symbol);
            const halo = pop(frame, fps, at);
            return (
              <circle
                key={symbol}
                cx={x}
                cy={y}
                r={HALO_R * halo}
                fill="none"
                stroke={colors.ieText}
                strokeWidth={4}
                opacity={Math.min(1, halo)}
              />
            );
          }),
        )}
      </svg>
      {DIPS.flatMap(({ symbols, at }) =>
        symbols.map((symbol) => {
          const { x, y, value } = point(symbol);
          return (
            <Text
              key={symbol}
              x={x}
              y={y - HALO_R - 22}
              size={24}
              weight={700}
              color={colors.ieText}
              opacity={fadeIn(frame, at + 10)}
            >
              {value}
            </Text>
          );
        }),
      )}
      <Text
        x={boron.x}
        y={735}
        size={type.label}
        weight={500}
        color={colors.ieText}
        opacity={note}
      >
        2p higher energy
      </Text>

      <Pitfall
        x={1124}
        y={350}
        size={28}
        wrong="Same-spin repulsion"
        correction="Ordinary Coulomb repulsion"
        opacity={pitfall}
        strike={strike}
        fix={Math.min(1, fix)}
      />
    </AbsoluteFill>
  );
}
