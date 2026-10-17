import { useVideoConfig } from "remotion";
import { pop, progress } from "../components/anim";
import { OrbitalName } from "../components/OrbitalName";
import { useSceneFrame } from "../components/SceneFrame";
import { Text } from "../components/Text";
import type { OrbitalId } from "../orbitals/wavefunctions";
import { colors, type } from "../theme";
import { NodalPlane3D } from "../three/Nodes3D";
import { Orbital3D } from "../three/Orbital3D";
import { Stage3D } from "../three/Stage3D";

const SIZE = 240;

const GRID: { orbital: OrbitalId; cx: number; cy: number }[] = [
  { orbital: "4fz3", cx: 360, cy: 400 },
  { orbital: "4fxz2", cx: 760, cy: 400 },
  { orbital: "4fyz2", cx: 1160, cy: 400 },
  { orbital: "4fxyz", cx: 1560, cy: 400 },
  { orbital: "4fzx2y2", cx: 560, cy: 760 },
  { orbital: "4fxx23y2", cx: 960, cy: 760 },
  { orbital: "4fy3x2y2", cx: 1360, cy: 760 },
];

export function FOrbitalsScene() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();
  const rotY = 0.2 * Math.max(0, frame);
  const caption = progress(frame, 0, 30);
  const planes = progress(frame, 358, 418);

  return (
    <>
      <Text x={960} y={160} size={type.subtitle} weight={500} opacity={caption}>
        Seven 4<i>f</i> orbitals,{" "}
        <span style={{ color: colors.axis }}>general set</span>
      </Text>
      <Stage3D>
        {GRID.map((g, i) => {
          const t = pop(frame, fps, 30 + 15 * i);
          return (
            <Orbital3D
              key={g.orbital}
              orbital={g.orbital}
              cx={g.cx}
              cy={g.cy}
              size={SIZE * Math.min(1, t)}
              rotY={rotY}
              opacity={Math.min(1, t)}
            >
              {g.orbital === "4fxyz"
                ? (["xy", "xz", "yz"] as const).map((plane) => (
                    <NodalPlane3D key={plane} plane={plane} opacity={planes} />
                  ))
                : null}
            </Orbital3D>
          );
        })}
      </Stage3D>
      {GRID.map((g, i) => (
        <Text
          key={g.orbital}
          x={g.cx}
          y={g.cy + 160}
          size={40}
          weight={500}
          opacity={progress(frame, 30 + 15 * i, 60 + 15 * i)}
        >
          <OrbitalName orbital={g.orbital} />
        </Text>
      ))}
    </>
  );
}
