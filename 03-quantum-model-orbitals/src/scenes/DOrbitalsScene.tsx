import { interpolate } from "remotion";
import { PhaseLegend } from "../components/Callouts";
import { progress } from "../components/anim";
import { OrbitalName } from "../components/OrbitalName";
import { useSceneFrame } from "../components/SceneFrame";
import { Text } from "../components/Text";
import type { OrbitalId } from "../orbitals/wavefunctions";
import { Axes3D, NodalCone3D, NodalPlane3D } from "../three/Nodes3D";
import { Orbital3D } from "../three/Orbital3D";
import { Stage3D } from "../three/Stage3D";

const SIZE = 280;
const CONE_DEG = (Math.acos(1 / Math.sqrt(3)) * 180) / Math.PI;

type Plane = { plane: "xy" | "xz" | "yz"; turnDeg?: number };

const ORBITALS: {
  orbital: OrbitalId;
  cx: number;
  cy: number;
  label: number;
  planes: Plane[];
}[] = [
  {
    orbital: "3dxy",
    cx: 380,
    cy: 380,
    label: 122,
    planes: [{ plane: "xz" }, { plane: "yz" }],
  },
  {
    orbital: "3dxz",
    cx: 960,
    cy: 380,
    label: 156,
    planes: [{ plane: "xy" }, { plane: "yz" }],
  },
  {
    orbital: "3dyz",
    cx: 1540,
    cy: 380,
    label: 190,
    planes: [{ plane: "xy" }, { plane: "xz" }],
  },
  {
    orbital: "3dx2y2",
    cx: 670,
    cy: 740,
    label: 224,
    // The nodal planes x = ±y are the xz plane turned 45° either way.
    planes: [
      { plane: "xz", turnDeg: 45 },
      { plane: "xz", turnDeg: -45 },
    ],
  },
  { orbital: "3dz2", cx: 1250, cy: 740, label: 316, planes: [] },
];

export function DOrbitalsScene() {
  const frame = useSceneFrame();
  const shapes = progress(frame, 30, 60);
  const rotZ = 0.2 * Math.max(0, frame);
  const torus = interpolate(frame, [476, 491, 511], [1, 1.1, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const planes = progress(frame, 613, 643);
  const cones = progress(frame, 682, 712);

  return (
    <>
      <Stage3D>
        {ORBITALS.map((o) => (
          <Orbital3D
            key={o.orbital}
            orbital={o.orbital}
            cx={o.cx}
            cy={o.cy}
            size={o.orbital === "3dz2" ? SIZE * torus : SIZE}
            rotZ={rotZ}
            opacity={shapes}
          >
            <Axes3D opacity={shapes} />
            {o.planes.map((p) => (
              <NodalPlane3D
                key={`${p.plane}${p.turnDeg ?? 0}`}
                plane={p.plane}
                turnDeg={p.turnDeg}
                opacity={planes}
              />
            ))}
            {o.orbital === "3dz2" ? (
              <NodalCone3D angleDeg={CONE_DEG} opacity={cones} />
            ) : null}
          </Orbital3D>
        ))}
      </Stage3D>
      {ORBITALS.map((o) => (
        <Text
          key={o.orbital}
          x={o.cx}
          y={o.cy + 180}
          size={40}
          weight={500}
          opacity={progress(frame, o.label, o.label + 30)}
        >
          <OrbitalName orbital={o.orbital} />
        </Text>
      ))}
      <Text
        x={1580}
        y={740}
        size={32}
        weight={500}
        opacity={cones}
        anchor="middle"
      >
        Nodal cones at 54.7°
      </Text>
      <PhaseLegend opacity={1} />
    </>
  );
}
