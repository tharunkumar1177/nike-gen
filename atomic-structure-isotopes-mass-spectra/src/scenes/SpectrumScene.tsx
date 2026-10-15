import { AbsoluteFill, useVideoConfig } from "remotion";
import { fadeIn, lerp, pop, progress } from "../components/anim";
import { useSceneFrame } from "../components/SceneFrame";
import { Text } from "../components/Text";
import { colors, type, VIDEO } from "../theme";

const PLOT = { left: 300, right: 1600, top: 200, bottom: 800 } as const;
const X_MIN = 34;
const X_MAX = 38;
const BAR_WIDTH = 80;
const TICK = 12;

const xScale = (mz: number) =>
  PLOT.left + ((mz - X_MIN) / (X_MAX - X_MIN)) * (PLOT.right - PLOT.left);
const yScale = (percent: number) =>
  PLOT.bottom - (percent / 100) * (PLOT.bottom - PLOT.top);

const X_TICKS = [34, 35, 36, 37, 38];
const Y_TICKS = [0, 25, 50, 75, 100];

const T = {
  axes: [0, 60],
  yTicks: [60, 90],
  yTitle: 80,
  xTicks: [120, 150],
  xTitle: 180,
} as const;

type Peak = {
  mz: number;
  percent: number;
  mass: string;
  abundance: string;
  fill: string;
  text: string;
  grow: number;
};

const PEAKS: Peak[] = [
  {
    mz: 34.97,
    percent: 75.76,
    mass: "34.97 u",
    abundance: "75.76 %",
    fill: colors.cl35,
    text: colors.cl35Text,
    grow: 330,
  },
  {
    mz: 36.97,
    percent: 24.24,
    mass: "36.97 u",
    abundance: "24.24 %",
    fill: colors.cl37,
    text: colors.cl37Text,
    grow: 480,
  },
];

/** Gap between the bar top and the mass label centre. */
const MASS_GAP = 34;
const LABEL_STEP = 42;

export function SpectrumScene() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();
  const axes = progress(frame, T.axes[0], T.axes[1]);
  const yTicks = progress(frame, T.yTicks[0], T.yTicks[1]);
  const xTicks = progress(frame, T.xTicks[0], T.xTicks[1]);

  return (
    <AbsoluteFill>
      <svg
        width={VIDEO.width}
        height={VIDEO.height}
        style={{ position: "absolute" }}
      >
        {PEAKS.map((peak) => {
          const grown = progress(frame, peak.grow, peak.grow + 60);
          if (grown <= 0) return null;
          const top = lerp(PLOT.bottom, yScale(peak.percent), grown);
          return (
            <rect
              key={peak.mass}
              x={xScale(peak.mz) - BAR_WIDTH / 2}
              y={top}
              width={BAR_WIDTH}
              height={PLOT.bottom - top}
              fill={peak.fill}
              stroke={peak.text}
              strokeWidth={2}
            />
          );
        })}
        <g stroke={colors.axis} strokeWidth={4} strokeLinecap="round">
          {axes > 0 ? (
            <>
              <line
                x1={PLOT.left}
                y1={PLOT.bottom}
                x2={lerp(PLOT.left, PLOT.right, axes)}
                y2={PLOT.bottom}
              />
              <line
                x1={PLOT.left}
                y1={PLOT.bottom}
                x2={PLOT.left}
                y2={lerp(PLOT.bottom, PLOT.top, axes)}
              />
            </>
          ) : null}
          {Y_TICKS.map((tick) => (
            <line
              key={`y${tick}`}
              x1={PLOT.left - TICK}
              y1={yScale(tick)}
              x2={PLOT.left}
              y2={yScale(tick)}
              opacity={yTicks}
            />
          ))}
          {X_TICKS.map((tick) => (
            <line
              key={`x${tick}`}
              x1={xScale(tick)}
              y1={PLOT.bottom}
              x2={xScale(tick)}
              y2={PLOT.bottom + TICK}
              opacity={xTicks}
            />
          ))}
        </g>
      </svg>
      {Y_TICKS.map((tick) => (
        <Text
          key={tick}
          x={260}
          y={yScale(tick)}
          size={type.label}
          weight={500}
          color={colors.axis}
          anchor="end"
          opacity={yTicks}
        >
          {tick}
        </Text>
      ))}
      {X_TICKS.map((tick) => (
        <Text
          key={tick}
          x={xScale(tick)}
          y={850}
          size={type.label}
          weight={500}
          color={colors.axis}
          opacity={xTicks}
        >
          {tick}
        </Text>
      ))}
      <Text
        x={150}
        y={500}
        size={type.body}
        rotate={-90}
        opacity={fadeIn(frame, T.yTitle)}
      >
        Relative Abundance (%)
      </Text>
      <Text x={950} y={920} size={type.body} opacity={fadeIn(frame, T.xTitle)}>
        m/z (Isotopic Mass for z = +1)
      </Text>
      {PEAKS.map((peak) => {
        const shown = pop(frame, fps, peak.grow + 60);
        const massY = yScale(peak.percent) - MASS_GAP;
        return (
          <AbsoluteFill key={peak.mass}>
            <Text
              x={xScale(peak.mz)}
              y={massY - LABEL_STEP}
              size={type.label}
              weight={500}
              color={peak.text}
              opacity={Math.min(1, shown)}
              scale={shown}
            >
              {peak.abundance}
            </Text>
            <Text
              x={xScale(peak.mz)}
              y={massY}
              size={type.label}
              weight={500}
              color={peak.text}
              opacity={Math.min(1, shown)}
              scale={shown}
            >
              {peak.mass}
            </Text>
          </AbsoluteFill>
        );
      })}
    </AbsoluteFill>
  );
}
