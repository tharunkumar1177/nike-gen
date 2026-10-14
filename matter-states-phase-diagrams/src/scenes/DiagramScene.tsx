import type { ReactNode } from "react";
import { AbsoluteFill, Easing, useVideoConfig } from "remotion";
import { Arrow } from "../components/Arrow";
import { lerp, pop, progress } from "../components/anim";
import { PhaseDiagram } from "../components/PhaseDiagram";
import { CO2, normalPoints, PLOT, WATER } from "../components/phases";
import type { Point } from "../components/particles";
import { useSceneFrame } from "../components/SceneFrame";
import { Text } from "../components/Text";
import { colors, FONT, type } from "../theme";
import { ClosingCard } from "./ClosingCard";

/** Offsets within this scene, which runs from global frame 2910 to 5400. */
const TRIPLE_CRITICAL = 780;
const COMPARE = 1500;
const CARD = 2190;

const PANEL_SCALE = 0.56;
const WATER_OFFSET = { x: 127 - 180 * PANEL_SCALE, y: 340 - 200 * PANEL_SCALE };
const CO2_OFFSET = { x: 987 - 180 * PANEL_SCALE, y: WATER_OFFSET.y };

const WATER_POINTS = normalPoints(WATER);

type Transform = { scale: number; x: number; y: number };

const project = (p: Point, t: Transform): Point => ({
  x: p.x * t.scale + t.x,
  y: p.y * t.scale + t.y,
});

const CO2_TRANSFORM: Transform = { scale: PANEL_SCALE, ...CO2_OFFSET };

export function DiagramScene() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();
  const s6 = frame - TRIPLE_CRITICAL;
  const s7 = frame - COMPARE;

  const move = s7 >= 0 ? pop(s7, fps, 0) : 0;
  const water: Transform = {
    scale: lerp(1, PANEL_SCALE, move),
    x: lerp(0, WATER_OFFSET.x, move),
    y: lerp(0, WATER_OFFSET.y, move),
  };
  const anatomyLabels = 1 - progress(s7, 0, 20);

  return (
    <AbsoluteFill>
      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <g transform={`translate(${water.x} ${water.y}) scale(${water.scale})`}>
          <PhaseDiagram
            substance={WATER}
            scale={water.scale}
            progress={{
              axes: progress(frame, 0, 30, Easing.ease),
              boundaries: pop(frame, fps, 60),
              regions: progress(frame, 150, 180, Easing.ease),
              atm: pop(frame, fps, 420),
              supercriticalEdges: pop(s6, fps, 420),
              supercriticalFill: progress(s6, 450, 480, Easing.ease),
              slope: progress(s7, 40, 70),
            }}
          />
          <rect
            x={PLOT.left}
            y={WATER.triple.y}
            width={PLOT.right - PLOT.left}
            height={PLOT.bottom - WATER.triple.y}
            fill={colors.accent}
            opacity={0.15 * progress(s6, 570, 600) * anatomyLabels}
          />
          <Dot at={WATER_POINTS.melting} shown={pop(frame, fps, 510) * anatomyLabels} />
          <Dot at={WATER_POINTS.boiling} shown={pop(frame, fps, 510)} scale={water.scale} />
          <Dot at={WATER.triple} shown={pop(s6, fps, 60)} scale={water.scale} />
          <Dot at={WATER.critical} shown={pop(s6, fps, 240)} scale={water.scale} />
          <g opacity={anatomyLabels} fontFamily={FONT}>
            <RegionLabels opacity={pop(frame, fps, 180)} labels={WATER.labels} />
            <SvgLabel at={{ x: 320, y: WATER.atmY - 20 }} color={colors.axis} opacity={progress(frame, 420, 450)}>
              1 atm
            </SvgLabel>
            <SvgLabel at={{ x: 640, y: 510 }} anchor="end" color={colors.accent} opacity={progress(frame, 510, 540, Easing.ease)}>
              Normal melting point
            </SvgLabel>
            <SvgLabel
              at={{ x: WATER_POINTS.boiling.x + 20, y: 510 }}
              color={colors.accent}
              opacity={progress(frame, 510, 540, Easing.ease)}
            >
              Normal boiling point
            </SvgLabel>
            <SvgLabel at={{ x: 720, y: 726 }} color={colors.accent} opacity={progress(s6, 90, 120)}>
              Triple point
            </SvgLabel>
            <SvgLabel at={{ x: 1330, y: 310 }} anchor="end" color={colors.accent} opacity={progress(s6, 270, 300)}>
              Critical point
            </SvgLabel>
            <SvgLabel
              at={{ x: 1488, y: 268 }}
              anchor="middle"
              color={colors.axis}
              opacity={progress(s6, 480, 510)}
            >
              Supercritical fluid
            </SvgLabel>
            <SvgLabel
              at={{ x: 960, y: 780 }}
              anchor="middle"
              color={colors.accent}
              opacity={progress(s6, 600, 630)}
            >
              Below the triple-point pressure, no liquid can exist
            </SvgLabel>
          </g>
        </g>
        {s7 >= 0 ? <Co2Panel frame={s7} /> : null}
      </svg>
      {s7 >= 0 ? <CompareLabels frame={s7} /> : null}
      {frame >= CARD ? <ClosingCard frame={frame - CARD} /> : null}
    </AbsoluteFill>
  );
}

/** Dot with a 10 px on-screen radius regardless of the diagram's scale. */
function Dot({
  at,
  shown,
  scale = 1,
}: {
  at: Point;
  shown: number;
  scale?: number;
}) {
  if (shown <= 0) return null;
  return (
    <circle cx={at.x} cy={at.y} r={(10 * shown) / scale} fill={colors.accent} />
  );
}

function SvgLabel({
  at,
  anchor = "start",
  color,
  opacity,
  children,
}: {
  at: Point;
  anchor?: "start" | "middle" | "end";
  color: string;
  opacity: number;
  children: ReactNode;
}) {
  return (
    <text
      x={at.x}
      y={at.y}
      textAnchor={anchor}
      dominantBaseline="central"
      fontSize={32}
      fontWeight={500}
      fill={color}
      opacity={opacity}
    >
      {children}
    </text>
  );
}

function RegionLabels({
  labels,
  opacity,
}: {
  labels: { solid: Point; liquid: Point; gas: Point };
  opacity: number;
}) {
  const scale = lerp(0.8, 1, opacity);
  const entries = [
    { text: "Solid", at: labels.solid, color: colors.solid },
    { text: "Liquid", at: labels.liquid, color: colors.liquid },
    { text: "Gas", at: labels.gas, color: colors.gas },
  ];
  return (
    <g opacity={Math.min(1, opacity)}>
      {entries.map((entry) => (
        <text
          key={entry.text}
          x={entry.at.x}
          y={entry.at.y}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={48}
          fill={entry.color}
          transform={`translate(${entry.at.x * (1 - scale)} ${entry.at.y * (1 - scale)}) scale(${scale})`}
        >
          {entry.text}
        </text>
      ))}
    </g>
  );
}

function Co2Panel({ frame }: { frame: number }) {
  const { fps } = useVideoConfig();
  const t = CO2_TRANSFORM;
  const atm = progress(frame, 330, 360);
  const arrowFrom = project({ x: 420, y: CO2.atmY }, t);
  const arrowTo = project({ x: 780, y: CO2.atmY }, t);
  return (
    <>
      <g transform={`translate(${t.x} ${t.y}) scale(${t.scale})`}>
        <PhaseDiagram
          substance={CO2}
          scale={t.scale}
          progress={{
            axes: progress(frame, 150, 180, Easing.linear),
            boundaries: progress(frame, 180, 210, Easing.linear),
            regions: progress(frame, 180, 210),
            atm,
            supercriticalEdges: 0,
            supercriticalFill: 0,
            slope: progress(frame, 200, 230),
          }}
        />
        <Dot at={CO2.triple} shown={pop(frame, fps, 240)} scale={t.scale} />
        <Dot at={CO2.critical} shown={pop(frame, fps, 240)} scale={t.scale} />
      </g>
      <Arrow
        from={arrowFrom}
        to={arrowTo}
        color={colors.endothermic}
        drawn={progress(frame, 420, 450)}
        width={6}
        head={18}
      />
    </>
  );
}

function ScreenLabel({
  at,
  opacity,
  color = colors.text,
  anchor = "start",
  rise = 0,
  weight = 500,
  children,
}: {
  at: Point;
  opacity: number;
  color?: string;
  anchor?: "start" | "middle" | "end";
  rise?: number;
  weight?: 400 | 500 | 700;
  children: ReactNode;
}) {
  return (
    <Text
      x={at.x}
      y={at.y + rise * (1 - opacity)}
      size={32}
      weight={weight}
      color={color}
      anchor={anchor}
      opacity={opacity}
    >
      {children}
    </Text>
  );
}

function CompareLabels({ frame }: { frame: number }) {
  const water: Transform = { scale: PANEL_SCALE, ...WATER_OFFSET };
  const co2 = CO2_TRANSFORM;
  const waterIn = progress(frame, 20, 50);
  const co2Regions = progress(frame, 200, 230);
  const co2Points = progress(frame, 250, 280);
  const waterBoiling = project(WATER_POINTS.boiling, water);
  const waterCritical = project(WATER.critical, water);
  const co2Triple = project(CO2.triple, co2);
  const co2Critical = project(CO2.critical, co2);
  const sublimationMid = project({ x: 600, y: CO2.atmY }, co2);

  const regions = (
    labels: { solid: Point; liquid: Point; gas: Point },
    t: Transform,
    opacity: number,
  ) =>
    (
      [
        ["Solid", labels.solid, colors.solid],
        ["Liquid", labels.liquid, colors.liquid],
        ["Gas", labels.gas, colors.gas],
      ] as const
    ).map(([text, at, color]) => (
      <ScreenLabel key={text} at={project(at, t)} anchor="middle" color={color} opacity={opacity}>
        {text}
      </ScreenLabel>
    ));

  return (
    <AbsoluteFill>
      <Text x={510} y={270} size={type.body} weight={700} opacity={progress(frame, 15, 45)}>
        Water
      </Text>
      <Text x={1410} y={270} size={type.body} weight={700} opacity={progress(frame, 150, 180)}>
        Carbon dioxide (CO<sub>2</sub>)
      </Text>

      {regions(
        { solid: { x: 420, y: 700 }, liquid: { x: 850, y: 420 }, gas: { x: 900, y: 800 } },
        water,
        waterIn,
      )}
      <ScreenLabel at={project({ x: 320, y: WATER.atmY - 34 }, water)} color={colors.axis} opacity={waterIn}>
        1 atm
      </ScreenLabel>
      <ScreenLabel at={{ x: waterCritical.x + 20, y: waterCritical.y + 54 }} opacity={waterIn}>
        Critical point
        <br />
        374 °C, 218 atm
      </ScreenLabel>
      <ScreenLabel at={{ x: waterBoiling.x + 16, y: waterBoiling.y + 45 }} opacity={waterIn}>
        Normal boiling point
        <br />
        100 °C
      </ScreenLabel>
      <ScreenLabel
        at={{ x: 355, y: 440 }}
        anchor="end"
        color={colors.accent}
        rise={10}
        opacity={progress(frame, 45, 75)}
      >
        negative slope
      </ScreenLabel>

      {regions(CO2.labels, co2, co2Regions)}
      <ScreenLabel at={{ x: 1440, y: 454 }} anchor="end" color={colors.accent} rise={10} opacity={co2Regions}>
        positive slope
      </ScreenLabel>
      <ScreenLabel at={{ x: co2Triple.x + 15, y: co2Triple.y + 32 }} opacity={co2Points}>
        Triple point
        <br />
        −56.6 °C, 5.1 atm
      </ScreenLabel>
      <ScreenLabel at={{ x: co2Critical.x - 159, y: co2Critical.y + 52 }} opacity={co2Points}>
        Critical point
        <br />
        31 °C, 73 atm
      </ScreenLabel>
      <ScreenLabel
        at={project({ x: 320, y: CO2.atmY + 34 }, co2)}
        color={colors.axis}
        opacity={progress(frame, 330, 360)}
      >
        1 atm
      </ScreenLabel>
      <ScreenLabel
        at={{ x: sublimationMid.x, y: sublimationMid.y - 30 }}
        anchor="middle"
        color={colors.endothermic}
        weight={700}
        rise={10}
        opacity={progress(frame, 430, 460)}
      >
        Sublimation
      </ScreenLabel>
    </AbsoluteFill>
  );
}
