import { interpolate } from "remotion";
import { Arrow } from "../components/Callouts";
import { fadeWindow, progress } from "../components/anim";
import { DensityMap } from "../components/DensityMap";
import { RadialPlot } from "../components/RadialPlot";
import { useSceneFrame } from "../components/SceneFrame";
import { Text } from "../components/Text";
import type { OrbitalId } from "../orbitals/wavefunctions";
import { colors, FONT, type } from "../theme";
import { Orbital3D } from "../three/Orbital3D";
import { Stage3D } from "../three/Stage3D";

const PANEL_Y = 345;
const PANEL_SIZE = 340;
const LABEL_Y = 140;

type Panel = {
  orbital: OrbitalId;
  cx: number;
  halfWidth: number;
  start: number;
  /** Radial node radii in a₀ with the frame each ring pulses. */
  nodes: { r: number; pulse: number }[];
};

const PANELS: Panel[] = [
  { orbital: "1s", cx: 450, halfWidth: 5, start: 110, nodes: [] },
  {
    orbital: "2s",
    cx: 960,
    halfWidth: 10,
    start: 280,
    nodes: [{ r: 2, pulse: 970 }],
  },
  {
    orbital: "3s",
    cx: 1470,
    halfWidth: 15,
    start: 340,
    nodes: [
      { r: (9 - 3 * Math.sqrt(3)) / 2, pulse: 1100 },
      { r: (9 + 3 * Math.sqrt(3)) / 2, pulse: 1100 },
    ],
  },
];

const CURVES = {
  "1s": { n: 1, color: colors.positive },
  "2s": { n: 2, color: colors.text },
  "3s": { n: 3, color: colors.axis },
} as const;

function pulseAt(frame: number, start: number) {
  return interpolate(frame, [start, start + 15, start + 30], [0, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
}

export function SOrbitalsScene() {
  const frame = useSceneFrame();
  const sphere = fadeWindow(frame, 30, 60, 110, 140);
  const callout = fadeWindow(frame, 580, 610, 710, 740);
  const plot = progress(frame, 750, 780);
  const draw = progress(frame, 780, 880);

  return (
    <>
      {sphere > 0 ? (
        <Stage3D>
          <Orbital3D
            orbital="1s"
            cx={450}
            cy={PANEL_Y}
            size={PANEL_SIZE}
            rotY={45}
            opacity={sphere}
          />
        </Stage3D>
      ) : null}
      {PANELS.map((panel) => {
        const shown = progress(frame, panel.start, panel.start + 30);
        if (shown <= 0) {
          return null;
        }
        const pxPerA0 = PANEL_SIZE / 2 / panel.halfWidth;
        return (
          <div key={panel.orbital} style={{ opacity: shown }}>
            <DensityMap
              orbital={panel.orbital}
              cx={panel.cx}
              cy={PANEL_Y}
              size={PANEL_SIZE}
              halfWidth={panel.halfWidth}
              plane="xy"
            />
            <svg
              width={1920}
              height={1080}
              style={{ position: "absolute", left: 0, top: 0 }}
            >
              {panel.nodes.map((node) => {
                const pulse = pulseAt(frame, node.pulse);
                return (
                  <circle
                    key={node.r}
                    cx={panel.cx}
                    cy={PANEL_Y}
                    r={node.r * pxPerA0}
                    fill="none"
                    stroke={pulse > 0.5 ? "#FFFFFF" : colors.node}
                    strokeWidth={2.5 + 3 * pulse}
                    strokeDasharray="8 6"
                  />
                );
              })}
            </svg>
            <Text
              x={panel.cx}
              y={LABEL_Y}
              size={type.body}
              weight={500}
              italic={false}
            >
              {panel.orbital}
            </Text>
          </div>
        );
      })}
      {callout > 0 ? (
        <>
          <Arrow
            from={[960, 560]}
            to={[960, PANEL_Y + 2 * (PANEL_SIZE / 2 / 10) + 4]}
            color={colors.negative}
            progress={progress(frame, 580, 610)}
          />
          <div
            style={{
              position: "absolute",
              left: 960,
              top: 590,
              transform: "translate(-50%, -50%)",
              padding: "6px 22px",
              borderRadius: 24,
              background: colors.negative,
              fontFamily: FONT,
              fontSize: type.label,
              fontWeight: 500,
              color: colors.text,
              whiteSpace: "nowrap",
              opacity: callout,
            }}
          >
            Node: zero probability, not a barrier
          </div>
        </>
      ) : null}
      {plot > 0 ? (
        <RadialPlot
          x={360}
          y={630}
          w={1200}
          h={240}
          rMax={20}
          tickStep={5}
          opacity={plot}
          xLabel="Distance r (a₀)"
          yLabel="r²R²"
          legend={(["1s", "2s", "3s"] as const).map((label) => ({
            label,
            color: CURVES[label].color,
          }))}
          curves={(["1s", "2s", "3s"] as const).map((label) => ({
            n: CURVES[label].n,
            l: 0,
            color: CURVES[label].color,
            progress: draw,
          }))}
          markers={[
            {
              r: 2,
              label: "2 a₀",
              color: CURVES["2s"].color,
              opacity: progress(frame, 970, 1000),
              labelLift: 262,
              side: "right",
              pulse: pulseAt(frame, 970),
            },
            {
              r: (9 - 3 * Math.sqrt(3)) / 2,
              label: "1.90 a₀",
              color: CURVES["3s"].color,
              opacity: progress(frame, 1100, 1130),
              labelLift: 262,
              side: "left",
              pulse: pulseAt(frame, 1100),
            },
            {
              r: (9 + 3 * Math.sqrt(3)) / 2,
              label: "7.10 a₀",
              color: CURVES["3s"].color,
              opacity: progress(frame, 1100, 1130),
              labelLift: 200,
              side: "right",
              pulse: pulseAt(frame, 1100),
            },
          ]}
        />
      ) : null}
    </>
  );
}
