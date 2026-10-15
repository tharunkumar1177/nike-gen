import { AbsoluteFill, useVideoConfig } from "remotion";
import { fadeIn, lerp, pop, progress } from "../components/anim";
import { useSceneFrame } from "../components/SceneFrame";
import { Text } from "../components/Text";
import { colors, SAFE, type, VIDEO } from "../theme";

const CX = 960;
const CY = 540;
const ATOM_R = 400;
const DOT_R = 2;
const NUCLEUS_R = 220;
const ZOOM = NUCLEUS_R / DOT_R;
const NUCLEON_R = 40;
const ORBIT_R = 340;
const ELECTRON_R = 10;
const ORBIT_FRAMES = 240;

const T = {
  title: 0,
  titleOut: 80,
  atom: 90,
  zoom: [110, 170],
  nucleusLabel: 180,
  protons: 310,
  neutrons: 470,
  electrons: 580,
} as const;

type Nucleon = { x: number; y: number; proton: boolean };

/** Three inner nucleons at r 48 and nine outer at r 130; protons and neutrons alternate. */
const NUCLEONS: Nucleon[] = [
  ...[90, 210, 330].map((deg) => ({ deg, r: 48 })),
  ...Array.from({ length: 9 }, (_, i) => ({ deg: 10 + i * 40, r: 130 })),
].map(({ deg, r }, i) => ({
  x: CX + r * Math.cos((deg * Math.PI) / 180),
  y: CY - r * Math.sin((deg * Math.PI) / 180),
  proton: i % 2 === 0,
}));

export function ParticlesScene() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();

  const titleIn = progress(frame, T.title, T.title + 30);
  const titleOut = 1 - progress(frame, T.titleOut, T.titleOut + 20);
  const atom = fadeIn(frame, T.atom);
  const zoomT = progress(frame, T.zoom[0], T.zoom[1]);
  const scale = Math.pow(ZOOM, zoomT);
  const outlineR = ATOM_R * scale;
  const nucleusR = DOT_R * scale;
  const electrons = fadeIn(frame, T.electrons);

  return (
    <AbsoluteFill>
      <Text
        x={CX}
        y={lerp(500, 460, titleIn)}
        size={type.title}
        weight={700}
        opacity={Math.min(titleIn, titleOut)}
      >
        Atomic Structure
      </Text>
      <Text
        x={CX}
        y={lerp(620, 590, titleIn)}
        size={type.subtitle}
        weight={500}
        color={colors.axis}
        opacity={Math.min(titleIn, titleOut)}
      >
        Nucleus, Isotopes &amp; Mass Spectra
      </Text>
      <svg
        width={VIDEO.width}
        height={VIDEO.height}
        style={{ position: "absolute" }}
      >
        {outlineR < VIDEO.width * 2 ? (
          <circle
            cx={CX}
            cy={CY}
            r={outlineR}
            fill="none"
            stroke={colors.axis}
            strokeWidth={4}
            strokeDasharray="16 12"
            opacity={atom * (1 - zoomT)}
          />
        ) : null}
        <circle
          cx={CX}
          cy={CY}
          r={nucleusR}
          fill={colors.axis}
          opacity={atom * (1 - zoomT)}
        />
        <circle
          cx={CX}
          cy={CY}
          r={nucleusR}
          fill={colors.grid}
          stroke={colors.axis}
          strokeWidth={4}
          strokeDasharray="16 12"
          opacity={atom * zoomT}
        />
        {NUCLEONS.map((n, i) => {
          const start = n.proton ? T.protons : T.neutrons;
          const s = pop(frame, fps, start + Math.floor(i / 2) * 3);
          if (s <= 0) return null;
          return (
            <circle
              key={i}
              cx={n.x}
              cy={n.y}
              r={NUCLEON_R * s}
              fill={n.proton ? colors.proton : colors.neutron}
              stroke={colors.background}
              strokeWidth={3}
            />
          );
        })}
        {electrons > 0
          ? [0, 1, 2, 3].map((i) => {
              const angle =
                ((frame - T.electrons) / ORBIT_FRAMES) * 2 * Math.PI +
                (i * Math.PI) / 2 +
                Math.PI / 4;
              return (
                <circle
                  key={i}
                  cx={CX + ORBIT_R * Math.cos(angle)}
                  cy={CY + ORBIT_R * Math.sin(angle)}
                  r={ELECTRON_R}
                  fill={colors.electron}
                  opacity={electrons}
                />
              );
            })
          : null}
      </svg>
      <Text
        x={CX}
        y={lerp(980, 930, pop(frame, fps, T.nucleusLabel))}
        size={type.body}
        opacity={fadeIn(frame, T.nucleusLabel)}
      >
        Nucleus ≈ 100,000× smaller
      </Text>
      <Text
        x={VIDEO.width - SAFE}
        y={VIDEO.height - SAFE - 20}
        size={type.label}
        weight={500}
        color={colors.axis}
        anchor="end"
        opacity={fadeIn(frame, T.nucleusLabel)}
      >
        Not to scale
      </Text>
      <Text
        x={330}
        y={CY}
        size={type.body}
        weight={500}
        color={colors.protonText}
        opacity={fadeIn(frame, T.protons + 20)}
      >
        Proton: +1, ≈ 1 u
      </Text>
      <Text
        x={1590}
        y={CY}
        size={type.body}
        weight={500}
        color={colors.neutron}
        opacity={fadeIn(frame, T.neutrons + 20)}
      >
        Neutron: 0, ≈ 1 u
      </Text>
      <Text
        x={CX}
        y={150}
        size={type.body}
        weight={500}
        color={colors.electronText}
        opacity={electrons}
      >
        Electron: −1, ≈ 0 u
      </Text>
    </AbsoluteFill>
  );
}
