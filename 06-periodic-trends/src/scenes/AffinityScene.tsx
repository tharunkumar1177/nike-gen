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
import { categoryX, ChartFrame, PLOT, valueY } from "../components/Chart";
import { AffinityBadge, Title } from "../components/Panels";
import { Sup } from "../components/Script";
import { Text } from "../components/Text";
import { AcrossArrow, columnX, MAP, TrendMap } from "../components/TrendMap";
import { cue } from "../cues";
import { element, GROUP_17_BELOW, PERIOD_2, valuesOf } from "../data";
import { colors, FONT, VIDEO } from "../theme";

const SCENE = "electron-affinity";

const START = cue(SCENE, "Electron affinity is the energy change");
const IUPAC = cue(SCENE, "By I U P A C convention");
const HALOGENS = cue(SCENE, "Affinity generally rises toward the halogens");
const UNBOUND = cue(SCENE, "However, nitrogen, beryllium, and neon");
const PAIR = cue(SCENE, "because the added electron must pair");
const SHELL = cue(SCENE, "or enter a higher subshell or shell");
const FLUORINE = cue(SCENE, "Fluorine releases less energy than chlorine");
const SMALL = cue(SCENE, "because its small size");

const EA = valuesOf([...PERIOD_2, ...GROUP_17_BELOW], "ea");
const SCALE = { min: -100, max: 400 };
const TICKS = [0, 100, 200, 300, 400];
const ZERO = valueY(0, SCALE);
const BAR_W = 40;
const STUB_H = 20;
const HATCH = "ea-unbound-hatch";

const formatAffinity = (value: number) => value.toFixed(1);

const BARS = PERIOD_2.map((symbol, index) => ({
  symbol,
  x: categoryX(index, PERIOD_2.length),
  ea: element(symbol).ea,
}));

const REASONS = [
  { symbol: "Be", text: "Higher subshell", at: SHELL },
  { symbol: "N", text: "Must pair", at: PAIR },
  { symbol: "Ne", text: "Higher shell", at: SHELL + 15 },
] as const;

function barX(symbol: string) {
  const bar = BARS.find((entry) => entry.symbol === symbol);
  if (!bar) {
    throw new Error(`${symbol} is not on the chart.`);
  }
  return bar.x;
}

export function AffinityScene() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const map = progress(frame, START, START + 30);
  const reveal = {
    ...stagger(frame, START + 10, PERIOD_2),
    ...stagger(frame, HALOGENS, GROUP_17_BELOW),
  };
  const badge = frame < IUPAC ? 1 : lerp(1.05, 1, pop(frame, fps, IUPAC));
  const across = progress(frame, HALOGENS, HALOGENS + 40, easeInOut);
  const chart = fadeIn(frame, HALOGENS);
  const grow = progress(frame, HALOGENS + 10, HALOGENS + 70, easeOutQuart);
  const stubs = progress(frame, UNBOUND, UNBOUND + 20);
  const ring = progress(frame, FLUORINE, FLUORINE + 15);
  const callout = pop(frame, fps, SMALL);
  return (
    <AbsoluteFill>
      <Title>Electron Affinity</Title>
      <AffinityBadge opacity={1} scale={badge} />
      <TrendMap
        color={colors.ea}
        values={EA}
        format={formatAffinity}
        reveal={reveal}
        legend="EA (kJ/mol)"
        opacity={map}
        emphasis={{ F: ring, Cl: ring }}
      />
      <AcrossArrow
        progress={across}
        color={colors.ea}
        labelColor={colors.eaText}
        label="Generally rises"
        to={columnX(6) + MAP.cell}
      />

      <ChartFrame
        title="Period 2 Electron Affinity"
        yLabel="EA (kJ/mol)"
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
        <defs>
          <pattern
            id={HATCH}
            width={8}
            height={8}
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <line x1={0} y1={0} x2={0} y2={8} stroke={colors.axis} />
          </pattern>
        </defs>
        {BARS.map(({ symbol, x, ea }) => {
          if (typeof ea === "number") {
            const height = (ZERO - valueY(ea, SCALE)) * grow;
            return (
              <rect
                key={symbol}
                x={x - BAR_W / 2}
                y={ZERO - height}
                width={BAR_W}
                height={height}
                fill={colors.ea}
                opacity={chart}
              />
            );
          }
          return (
            <rect
              key={symbol}
              x={x - BAR_W / 2}
              y={ZERO}
              width={BAR_W}
              height={STUB_H * stubs}
              fill={`url(#${HATCH})`}
              stroke={colors.axis}
              strokeWidth={2}
              opacity={stubs}
            />
          );
        })}
      </svg>
      {BARS.map(({ symbol, x, ea }) => {
        if (typeof ea === "number") {
          return (
            <Text
              key={symbol}
              x={x}
              y={valueY(ea, SCALE) - 18}
              size={24}
              weight={500}
              color={colors.eaText}
              opacity={progress(frame, HALOGENS + 50, HALOGENS + 70)}
            >
              {formatAffinity(ea)}
            </Text>
          );
        }
        return (
          <Text
            key={symbol}
            x={x}
            y={ZERO + STUB_H + 18}
            size={24}
            weight={500}
            color={colors.axis}
            opacity={stubs}
          >
            &lt; 0
          </Text>
        );
      })}
      {REASONS.map(({ symbol, text, at }) => {
        const last = symbol === "Ne";
        return (
          <Text
            key={symbol}
            x={last ? PLOT.right + 10 : barX(symbol)}
            y={ZERO + STUB_H + 52}
            size={24}
            weight={500}
            color={colors.eaText}
            anchor={last ? "end" : "middle"}
            opacity={Math.min(1, pop(frame, fps, at))}
          >
            {text}
          </Text>
        );
      })}

      <div
        style={{
          position: "absolute",
          left: 1124,
          top: 420,
          padding: "12px 20px",
          border: `3px solid ${colors.ea}`,
          borderRadius: 12,
          background: colors.background,
          fontFamily: FONT,
          fontSize: 26,
          lineHeight: 1.2,
          color: colors.text,
          whiteSpace: "nowrap",
          opacity: Math.min(1, callout),
          transform: `translateY(${(1 - Math.min(1, callout)) * 20}px)`,
        }}
      >
        <div style={{ fontWeight: 700 }}>
          F &lt; Cl: 328.2 &lt; 348.6 kJ/mol
        </div>
        <div>
          small size, strong e<Sup>−</Sup>–e<Sup>−</Sup> repulsion
        </div>
      </div>
    </AbsoluteFill>
  );
}
