import { AbsoluteFill, useVideoConfig } from "remotion";
import { fadeIn, pop, progress } from "../components/anim";
import { Nucleus, packNucleons } from "../components/Nucleus";
import { useSceneFrame } from "../components/SceneFrame";
import { SceneTitle } from "../components/SceneTitle";
import { StabilityChart } from "../components/StabilityChart";
import { Text } from "../components/Text";
import { cue } from "../cues";
import { colors, FONT } from "../theme";

const CENTRE = { x: 450, y: 540 } as const;
const RADIUS = 30;
const NUCLEONS = packNucleons(12, 60);

const LINKS = NUCLEONS.flatMap((a, i) =>
  NUCLEONS.slice(i + 1)
    .filter((b) => Math.hypot(a.dx - b.dx, a.dy - b.dy) < 64)
    .map((b) => ({ a, b })),
);

const OUTER_PROTONS = NUCLEONS.filter(
  ({ dx, dy, proton }) => proton && Math.hypot(dx, dy) > 40,
);

const CUES = {
  nucleus: cue(
    "nuclear-stability",
    "A nucleus packs positively charged protons",
  ),
  strong: cue("nuclear-stability", "The strong nuclear force holds them"),
  band: cue("nuclear-stability", "Stable nuclei lie in a narrow band"),
  heavy: cue("nuclear-stability", "more than eighty three protons"),
};

export function StabilityScene() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();
  const nucleus = pop(frame, fps, CUES.nucleus);
  const repulsion =
    fadeIn(frame, CUES.nucleus + 15) * (1 - fadeIn(frame, CUES.strong));
  const strong = fadeIn(frame, CUES.strong);
  const axes = fadeIn(frame, CUES.band);
  const band = progress(frame, CUES.band + 10, CUES.band + 40);
  const heavy = fadeIn(frame, CUES.heavy);
  const jitter = 6 * repulsion * Math.sin(frame / 3);
  return (
    <AbsoluteFill>
      <SceneTitle>Why Nuclei Break Apart</SceneTitle>
      <svg
        width={1920}
        height={1080}
        style={{ position: "absolute", left: 0, top: 0 }}
      >
        <defs>
          <marker
            id="repel-head"
            viewBox="0 0 10 10"
            refX={8}
            refY={5}
            markerWidth={4}
            markerHeight={4}
            orient="auto"
          >
            <path d="M0 0 L10 5 L0 10 Z" fill={colors.protonText} />
          </marker>
        </defs>
        <g
          opacity={strong}
          transform={`translate(${CENTRE.x} ${CENTRE.y})`}
          stroke={colors.neutron}
          strokeOpacity={0.55}
          strokeWidth={12}
          strokeLinecap="round"
        >
          {LINKS.map(({ a, b }, i) => (
            <line key={i} x1={a.dx} y1={a.dy} x2={b.dx} y2={b.dy} />
          ))}
        </g>
        <Nucleus
          x={CENTRE.x}
          y={CENTRE.y}
          radius={RADIUS}
          nucleons={NUCLEONS}
          opacity={Math.min(1, nucleus * 2)}
          scale={0.8 + 0.2 * nucleus}
        />
        <g
          opacity={repulsion}
          transform={`translate(${CENTRE.x} ${CENTRE.y})`}
          stroke={colors.protonText}
          strokeWidth={5}
          markerEnd="url(#repel-head)"
        >
          {OUTER_PROTONS.map(({ dx, dy }, i) => {
            const d = Math.hypot(dx, dy);
            const ux = dx / d;
            const uy = dy / d;
            const start = d + RADIUS + 6;
            const end = start + 50 + jitter;
            return (
              <line
                key={i}
                x1={ux * start}
                y1={uy * start}
                x2={ux * end}
                y2={uy * end}
              />
            );
          })}
        </g>
      </svg>
      <Text
        x={CENTRE.x}
        y={770}
        size={34}
        weight={700}
        anchor="middle"
        color={colors.protonText}
        opacity={repulsion}
      >
        Protons repel each other
      </Text>
      <Text
        x={CENTRE.x}
        y={770}
        size={34}
        weight={700}
        anchor="middle"
        color={colors.neutronText}
        opacity={strong}
      >
        Strong force holds nucleons
      </Text>
      <Legend opacity={fadeIn(frame, CUES.nucleus + 15)} />
      <StabilityChart axes={axes} band={band} heavy={heavy} />
      <div
        style={{
          position: "absolute",
          left: 120,
          top: 862,
          width: 640,
          fontFamily: FONT,
          fontSize: 32,
          lineHeight: 1.3,
          color: colors.text,
          opacity: fadeIn(frame, CUES.heavy + 20),
        }}
      >
        <b>Unstable nuclei</b> decay, changing until they reach the band of
        stability.
      </div>
    </AbsoluteFill>
  );
}

function Legend({ opacity }: { opacity: number }) {
  const item = (fill: string, label: string) => (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
      <span
        style={{
          width: 26,
          height: 26,
          borderRadius: "50%",
          background: fill,
        }}
      />
      {label}
    </span>
  );
  if (opacity <= 0) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: CENTRE.x,
        top: 820,
        transform: "translate(-50%, -50%)",
        display: "flex",
        gap: 40,
        fontFamily: FONT,
        fontSize: 28,
        color: colors.muted,
        opacity,
      }}
    >
      {item(colors.proton, "proton")}
      {item(colors.neutron, "neutron")}
    </div>
  );
}
