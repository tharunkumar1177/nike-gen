import { AbsoluteFill } from "remotion";
import { Arrow } from "../components/Arrow";
import { progress } from "../components/anim";
import type { Point, StateKind } from "../components/particles";
import { useSceneFrame } from "../components/SceneFrame";
import { Text } from "../components/Text";
import { Viewport } from "../components/Viewport";
import { colors, FONT, SCENES } from "../theme";

const VIEWPORT_SCALE = 0.6;
const LABEL_OFFSET = 30;
const DRAW_FRAMES = 20;

const VIEWPORTS: { kind: StateKind; label: string; at: Point; labelAt: Point }[] =
  [
    { kind: "gas", label: "Gas", at: { x: 960, y: 240 }, labelAt: { x: 1130, y: 240 } },
    { kind: "solid", label: "Solid", at: { x: 660, y: 760 }, labelAt: { x: 660, y: 920 } },
    { kind: "liquid", label: "Liquid", at: { x: 1260, y: 760 }, labelAt: { x: 1260, y: 920 } },
  ];

type Change = {
  label: string;
  from: Point;
  to: Point;
  endothermic: boolean;
  start: number;
};

const CHANGES: Change[] = [
  { label: "Melting", from: { x: 780, y: 730 }, to: { x: 1140, y: 730 }, endothermic: true, start: 150 },
  { label: "Vaporization", from: { x: 1226, y: 641 }, to: { x: 1046, y: 329 }, endothermic: true, start: 162 },
  { label: "Sublimation", from: { x: 694, y: 641 }, to: { x: 874, y: 329 }, endothermic: true, start: 186 },
  { label: "Freezing", from: { x: 1140, y: 790 }, to: { x: 780, y: 790 }, endothermic: false, start: 282 },
  { label: "Condensation", from: { x: 994, y: 359 }, to: { x: 1174, y: 671 }, endothermic: false, start: 294 },
  { label: "Deposition", from: { x: 926, y: 359 }, to: { x: 746, y: 671 }, endothermic: false, start: 318 },
];

const PARTNER: Record<string, string> = {
  Melting: "Freezing",
  Freezing: "Melting",
  Vaporization: "Condensation",
  Condensation: "Vaporization",
  Sublimation: "Deposition",
  Deposition: "Sublimation",
};

function midpoint(change: Change): Point {
  return {
    x: (change.from.x + change.to.x) / 2,
    y: (change.from.y + change.to.y) / 2,
  };
}

/** Label sits beside its arrow, rotated along it, on the side away from the opposite process. */
function labelPlacement(change: Change) {
  const mid = midpoint(change);
  const partner = CHANGES.find((other) => other.label === PARTNER[change.label]);
  const other = partner ? midpoint(partner) : mid;
  const dx = change.to.x - change.from.x;
  const dy = change.to.y - change.from.y;
  const length = Math.hypot(dx, dy);
  let nx = -dy / length;
  let ny = dx / length;
  if (nx * (other.x - mid.x) + ny * (other.y - mid.y) > 0) {
    nx = -nx;
    ny = -ny;
  }
  let angle = (Math.atan2(dy, dx) * 180) / Math.PI;
  if (angle > 90) angle -= 180;
  if (angle <= -90) angle += 180;
  return {
    x: mid.x + nx * LABEL_OFFSET,
    y: mid.y + ny * LABEL_OFFSET,
    angle,
  };
}

export function ChangesScene() {
  const frame = useSceneFrame();
  const shown = progress(frame, 0, 30);
  const simFrame = frame + (SCENES.changes.from - SCENES.states.from);

  return (
    <AbsoluteFill>
      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <g opacity={shown}>
          {VIEWPORTS.map((viewport) => (
            <Viewport
              key={viewport.kind}
              kind={viewport.kind}
              cx={viewport.at.x}
              cy={viewport.at.y}
              frame={simFrame}
              enter={-1000}
              particles={[-1000, -990]}
              scale={VIEWPORT_SCALE}
            />
          ))}
        </g>
        {CHANGES.map((change) => {
          const drawn = progress(frame, change.start, change.start + DRAW_FRAMES);
          const color = change.endothermic ? colors.endothermic : colors.exothermic;
          const place = labelPlacement(change);
          return (
            <g key={change.label}>
              <Arrow from={change.from} to={change.to} color={color} drawn={drawn} />
              <text
                x={place.x}
                y={place.y}
                transform={`rotate(${place.angle} ${place.x} ${place.y})`}
                textAnchor="middle"
                dominantBaseline="central"
                fontFamily={FONT}
                fontSize={32}
                fontWeight={500}
                fill={color}
                opacity={drawn}
              >
                {change.label}
              </text>
            </g>
          );
        })}
      </svg>
      {VIEWPORTS.map((viewport) => (
        <Text
          key={viewport.kind}
          x={viewport.labelAt.x}
          y={viewport.labelAt.y}
          size={32}
          weight={500}
          anchor={viewport.kind === "gas" ? "start" : "middle"}
          opacity={shown}
        >
          {viewport.label}
        </Text>
      ))}
      <Legend opacity={progress(frame, 150, 180)} />
    </AbsoluteFill>
  );
}

function Legend({ opacity }: { opacity: number }) {
  const rows = [
    { text: "Endothermic (heat absorbed)", color: colors.endothermic },
    { text: "Exothermic (heat released)", color: colors.exothermic },
  ];
  return (
    <div
      style={{
        position: "absolute",
        left: 120,
        top: 120,
        display: "flex",
        flexDirection: "column",
        gap: 16,
        fontFamily: FONT,
        fontSize: 32,
        fontWeight: 500,
        opacity,
      }}
    >
      {rows.map((row) => (
        <div key={row.text} style={{ display: "flex", alignItems: "center", gap: 16, color: row.color }}>
          <div style={{ width: 40, height: 8, borderRadius: 4, background: row.color }} />
          {row.text}
        </div>
      ))}
    </div>
  );
}
