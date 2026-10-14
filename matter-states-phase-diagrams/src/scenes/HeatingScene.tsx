import { AbsoluteFill, Easing, spring, useVideoConfig } from "remotion";
import { lerp, progress } from "../components/anim";
import { useSceneFrame } from "../components/SceneFrame";
import { Text } from "../components/Text";
import { colors, FONT } from "../theme";

const BOX = { left: 240, right: 1680, top: 240, bottom: 840 };
const HEAT = [0, 100] as const;
const TEMP = [-50, 150] as const;

const toX = (heat: number) =>
  lerp(BOX.left, BOX.right, (heat - HEAT[0]) / (HEAT[1] - HEAT[0]));
const toY = (temp: number) =>
  lerp(BOX.bottom, BOX.top, (temp - TEMP[0]) / (TEMP[1] - TEMP[0]));

/** Schematic water heating curve as [heat, °C]; the vaporization plateau is longer than melting. */
const VERTICES: [number, number][] = [
  [0, -50],
  [10, 0],
  [25, 0],
  [50, 100],
  [90, 100],
  [100, 150],
];

const POINTS = VERTICES.map(([heat, temp]) => ({ x: toX(heat), y: toY(temp) }));

const PLATEAUS = [
  { from: 1, to: 2, start: 234, temp: 0, label: "Solid + Liquid", labelAt: { x: 492, y: 650 } },
  { from: 3, to: 4, start: 270, temp: 100, label: "Liquid + Gas", labelAt: { x: 1248, y: 350 } },
];

const STATE_LABELS = [
  { text: "Solid", at: { x: 270, y: 750 } },
  { text: "Liquid", at: { x: 740, y: 530 } },
  { text: "Gas", at: { x: 1545, y: 300 } },
];

function polylineLength() {
  let total = 0;
  for (let i = 1; i < POINTS.length; i += 1) {
    total += Math.hypot(
      POINTS[i]!.x - POINTS[i - 1]!.x,
      POINTS[i]!.y - POINTS[i - 1]!.y,
    );
  }
  return total;
}

const CURVE_LENGTH = polylineLength();

export function HeatingScene() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();
  const frameIn = progress(frame, 0, 30);
  const drawn = progress(frame, 30, 126, Easing.linear);
  const statesIn = progress(frame, 126, 156);

  return (
    <AbsoluteFill>
      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <g opacity={frameIn} stroke={colors.axis} strokeWidth={4} strokeLinecap="round">
          <line x1={BOX.left} y1={BOX.bottom} x2={BOX.right} y2={BOX.bottom} />
          <line x1={BOX.left} y1={BOX.bottom} x2={BOX.left} y2={BOX.top} />
        </g>
        {PLATEAUS.map((plateau) => {
          const a = POINTS[plateau.from]!;
          const b = POINTS[plateau.to]!;
          const shown = progress(frame, plateau.start, plateau.start + 20);
          const tick = spring({
            frame: frame - plateau.start,
            fps,
            config: { damping: 12, stiffness: 90 },
          });
          return (
            <g key={plateau.label}>
              <line
                x1={a.x}
                y1={a.y}
                x2={lerp(a.x, b.x, shown)}
                y2={b.y}
                stroke={colors.endothermic}
                strokeOpacity={0.4}
                strokeWidth={16}
                strokeLinecap="round"
                opacity={shown > 0 ? 1 : 0}
              />
              <g opacity={Math.min(1, tick)}>
                <line
                  x1={BOX.left - 10}
                  y1={toY(plateau.temp)}
                  x2={BOX.left}
                  y2={toY(plateau.temp)}
                  stroke={colors.axis}
                  strokeWidth={4}
                />
                <text
                  x={222}
                  y={toY(plateau.temp)}
                  textAnchor="end"
                  dominantBaseline="central"
                  fontFamily={FONT}
                  fontSize={32}
                  fontWeight={500}
                  fill={colors.text}
                  transform={`translate(${222 * (1 - tick)} ${toY(plateau.temp) * (1 - tick)}) scale(${tick})`}
                >
                  {plateau.temp}
                </text>
              </g>
            </g>
          );
        })}
        <polyline
          points={POINTS.map((p) => `${p.x},${p.y}`).join(" ")}
          fill="none"
          stroke={colors.accent}
          strokeWidth={8}
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeDasharray={CURVE_LENGTH}
          strokeDashoffset={CURVE_LENGTH * (1 - drawn)}
          opacity={drawn > 0 ? 1 : 0}
        />
      </svg>
      <Text x={960} y={920} size={32} weight={500} opacity={frameIn}>
        Heat Added
      </Text>
      <div
        style={{
          position: "absolute",
          left: 140,
          top: 540,
          transform: "translate(-50%, -50%) rotate(-90deg)",
          fontFamily: FONT,
          fontSize: 32,
          fontWeight: 500,
          color: colors.text,
          whiteSpace: "nowrap",
          opacity: frameIn,
        }}
      >
        Temperature (°C)
      </div>
      {STATE_LABELS.map((label) => (
        <Text key={label.text} x={label.at.x} y={label.at.y} size={32} weight={500} opacity={statesIn}>
          {label.text}
        </Text>
      ))}
      {PLATEAUS.map((plateau) => (
        <Text
          key={plateau.label}
          x={plateau.labelAt.x}
          y={plateau.labelAt.y}
          size={32}
          weight={500}
          opacity={progress(frame, plateau.start, plateau.start + 30)}
        >
          {plateau.label}
        </Text>
      ))}
    </AbsoluteFill>
  );
}
