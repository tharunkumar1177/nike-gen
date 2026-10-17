import { interpolate } from "remotion";
import { PhaseLegend } from "../components/Callouts";
import { progress } from "../components/anim";
import { OrbitalName } from "../components/OrbitalName";
import { useSceneFrame } from "../components/SceneFrame";
import { Text } from "../components/Text";
import type { OrbitalId } from "../orbitals/wavefunctions";
import { colors } from "../theme";
import { Axes3D, axisTip, NodalPlane3D } from "../three/Nodes3D";
import { Orbital3D } from "../three/Orbital3D";
import { Stage3D } from "../three/Stage3D";
import { projectPoint } from "../three/view";

const SIZE = 350;
const CY = 500;
const LABEL_Y = 760;

const ORBITALS: {
  orbital: OrbitalId;
  cx: number;
  axis: "x" | "y" | "z";
  label: number;
}[] = [
  { orbital: "2px", cx: 420, axis: "x", label: 166 },
  { orbital: "2py", cx: 960, axis: "y", label: 181 },
  { orbital: "2pz", cx: 1500, axis: "z", label: 196 },
];

export function POrbitalsScene() {
  const frame = useSceneFrame();
  const shapes = progress(frame, 30, 60);
  const rotZ = 0.2 * Math.max(0, frame);
  const legend = progress(frame, 499, 529);
  const emphasis = interpolate(frame, [680, 695, 715], [1, 1.05, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const plane = progress(frame, 816, 846);

  return (
    <>
      <Stage3D>
        {ORBITALS.map((o) => (
          <Orbital3D
            key={o.orbital}
            orbital={o.orbital}
            cx={o.cx}
            cy={CY}
            size={SIZE}
            rotZ={rotZ}
            opacity={shapes}
          >
            <Axes3D opacity={progress(frame, o.label, o.label + 30)} />
            {o.orbital === "2pz" ? (
              <NodalPlane3D plane="xy" opacity={plane} />
            ) : null}
          </Orbital3D>
        ))}
      </Stage3D>
      {ORBITALS.map((o) => {
        const shown = progress(frame, o.label, o.label + 30);
        const tip = projectPoint(
          { cx: o.cx, cy: CY, size: SIZE, rotZ },
          axisTip(o.axis, 1.42),
        );
        return (
          <div key={o.orbital} style={{ opacity: shown }}>
            <Text x={o.cx} y={LABEL_Y} size={40} weight={500}>
              <OrbitalName orbital={o.orbital} />
            </Text>
            <Text
              x={tip.x}
              y={tip.y}
              size={26}
              weight={500}
              color={colors.axis}
              italic
            >
              {o.axis}
            </Text>
          </div>
        );
      })}
      <PhaseLegend opacity={legend} emphasis={emphasis} />
    </>
  );
}
