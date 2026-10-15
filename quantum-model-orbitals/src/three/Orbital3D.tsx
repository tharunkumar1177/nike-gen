import { useMemo, type ReactNode } from "react";
import { BufferAttribute, BufferGeometry } from "three";
import { orbitalSurface, type SurfaceMesh } from "../orbitals/isosurface";
import type { OrbitalId } from "../orbitals/wavefunctions";
import { colors } from "../theme";
import { placementMatrix, type Placement } from "./view";

type Props = Placement & {
  orbital: OrbitalId;
  opacity?: number;
  /** Nodal surfaces and axes, in the orbital's unit-sphere coordinates. */
  children?: ReactNode;
};

function toGeometry(mesh: SurfaceMesh) {
  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new BufferAttribute(mesh.positions, 3));
  geometry.setAttribute("normal", new BufferAttribute(mesh.normals, 3));
  geometry.setIndex(new BufferAttribute(mesh.indices, 1));
  return geometry;
}

export function Orbital3D({
  orbital,
  cx,
  cy,
  size,
  rotX = 0,
  rotY = 0,
  rotZ = 0,
  opacity = 1,
  children,
}: Props) {
  const lobes = useMemo(() => {
    const surface = orbitalSurface(orbital);
    return {
      positive: toGeometry(surface.positive),
      negative: toGeometry(surface.negative),
    };
  }, [orbital]);
  const matrix = useMemo(
    () => placementMatrix({ cx, cy, size, rotX, rotY, rotZ }),
    [cx, cy, size, rotX, rotY, rotZ],
  );
  if (opacity <= 0 || size <= 0) {
    return null;
  }
  const fading = opacity < 1;
  return (
    <group matrix={matrix} matrixAutoUpdate={false}>
      {(
        [
          [lobes.positive, colors.positive],
          [lobes.negative, colors.negative],
        ] as const
      ).map(([geometry, color]) =>
        geometry.index && geometry.index.count > 0 ? (
          <mesh key={color} geometry={geometry} renderOrder={fading ? 1 : 0}>
            <meshPhongMaterial
              // Remount when switching between opaque and blended passes.
              key={fading ? "blend" : "opaque"}
              color={color}
              specular="#3A3A3A"
              shininess={36}
              transparent={fading}
              opacity={opacity}
              depthWrite={!fading}
            />
          </mesh>
        ) : null,
      )}
      {children}
    </group>
  );
}
