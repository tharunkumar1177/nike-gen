import { useVideoConfig } from "remotion";
import { fadeWindow, lerp, pop, progress } from "../components/anim";
import { DensityMap } from "../components/DensityMap";
import { DotCloud } from "../components/DotCloud";
import { useSceneFrame } from "../components/SceneFrame";
import { Text } from "../components/Text";
import { orbitalSurface } from "../orbitals/isosurface";
import { colors, type } from "../theme";
import { Orbital3D } from "../three/Orbital3D";
import { Stage3D } from "../three/Stage3D";

const CX = 960;
const CY = 540;
/** Screen px per a₀, shared by the dot cloud, density map, and boundary surface. */
const PX_PER_A0 = 70;
const ORBIT_RADIUS = 300;

export function OrbitsScene() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();

  const title = fadeWindow(frame, 0, 30, 90, 120);
  const bohr = fadeWindow(frame, 100, 130, 180, 220);
  const electronAngle = frame * 0.09;
  const cloud = fadeWindow(frame, 170, 230, 470, 530);
  const psiLabel = Math.min(pop(frame, fps, 160), 1 - progress(frame, 285, 315));
  const densityLabel = progress(frame, 285, 315);
  const map = fadeWindow(frame, 470, 530, 610, 670);
  const surface = progress(frame, 610, 670);
  const boundaryLabel = pop(frame, fps, 610);
  const boundarySize = 2 * orbitalSurface("1s").radius * PX_PER_A0;

  return (
    <>
      <Text x={CX} y={CY} size={type.title} weight={700} opacity={title}>
        Quantum Model: Orbitals, Shapes &amp; Nodes
      </Text>
      {bohr > 0 ? (
        <svg
          width={1920}
          height={1080}
          style={{ position: "absolute", left: 0, top: 0, opacity: bohr }}
        >
          <circle
            cx={CX}
            cy={CY}
            r={ORBIT_RADIUS}
            fill="none"
            stroke={colors.text}
            strokeWidth={4}
          />
          <circle cx={CX} cy={CY} r={18} fill={colors.text} />
          <circle
            cx={CX + ORBIT_RADIUS * Math.cos(electronAngle)}
            cy={CY + ORBIT_RADIUS * Math.sin(electronAngle)}
            r={14}
            fill={colors.positive}
          />
        </svg>
      ) : null}
      {cloud > 0 ? (
        <DotCloud
          cx={CX}
          cy={CY}
          radius={5 * PX_PER_A0}
          count={3000}
          color={colors.positive}
          reveal={progress(frame, 170, 290)}
          opacity={cloud}
        />
      ) : null}
      {map > 0 ? (
        <DensityMap
          orbital="1s"
          cx={CX}
          cy={CY}
          size={10 * PX_PER_A0}
          halfWidth={5}
          plane="xy"
          circular
          opacity={map}
        />
      ) : null}
      {surface > 0 ? (
        <Stage3D>
          <Orbital3D
            orbital="1s"
            cx={CX}
            cy={CY}
            size={boundarySize}
            rotY={lerp(0, 45, progress(frame, 610, 1050, (t) => t))}
            opacity={0.9 * surface}
          />
        </Stage3D>
      ) : null}
      <Text
        x={CX}
        y={150}
        size={type.subtitle}
        opacity={psiLabel}
        dy={(1 - psiLabel) * 20}
      >
        Wavefunction <i>ψ</i>
      </Text>
      <Text x={CX} y={150} size={type.subtitle} opacity={densityLabel}>
        <i>ψ</i>²: Probability Density
      </Text>
      <Text
        x={CX}
        y={900}
        size={type.body}
        opacity={boundaryLabel}
        scale={lerp(0.9, 1, boundaryLabel)}
      >
        90% Boundary Surface
      </Text>
    </>
  );
}
