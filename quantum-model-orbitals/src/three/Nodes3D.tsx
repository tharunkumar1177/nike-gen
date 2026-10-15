import { useMemo } from "react";
import {
  BufferAttribute,
  BufferGeometry,
  DoubleSide,
  LatheGeometry,
  Vector2,
} from "three";
import { colors } from "../theme";

const NODE_OPACITY = 0.4;
const GRID_LINES = 8;

type PlaneProps = {
  plane: "xy" | "xz" | "yz";
  /** Half-width in unit-sphere coordinates. */
  extent?: number;
  /** 0–1 multiplier on the nodal-surface opacity. */
  opacity?: number;
};

const PLANE_ROTATION = {
  xy: [0, 0, 0],
  xz: [Math.PI / 2, 0, 0],
  yz: [0, Math.PI / 2, 0],
} as const;

function gridGeometry(extent: number) {
  const points: number[] = [];
  for (let i = 0; i <= GRID_LINES; i += 1) {
    const t = -extent + (2 * extent * i) / GRID_LINES;
    points.push(t, -extent, 0, t, extent, 0, -extent, t, 0, extent, t, 0);
  }
  const geometry = new BufferGeometry();
  geometry.setAttribute(
    "position",
    new BufferAttribute(new Float32Array(points), 3),
  );
  return geometry;
}

export function NodalPlane3D({
  plane,
  extent = 1.15,
  opacity = 1,
}: PlaneProps) {
  const grid = useMemo(() => gridGeometry(extent), [extent]);
  if (opacity <= 0) {
    return null;
  }
  return (
    <group rotation={[...PLANE_ROTATION[plane]]}>
      <mesh renderOrder={2}>
        <planeGeometry args={[2 * extent, 2 * extent]} />
        <meshBasicMaterial
          color={colors.node}
          transparent
          opacity={NODE_OPACITY * opacity}
          side={DoubleSide}
          depthWrite={false}
        />
      </mesh>
      <lineSegments geometry={grid} renderOrder={3}>
        <lineBasicMaterial
          color="#FFFFFF"
          transparent
          opacity={0.8 * opacity}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

type ConeProps = {
  /** Half-angle from the +z axis in degrees; the cone is mirrored through the nucleus. */
  angleDeg: number;
  /** Slant length in unit-sphere coordinates. */
  length?: number;
  opacity?: number;
};

export function NodalCone3D({ angleDeg, length = 1.1, opacity = 1 }: ConeProps) {
  const geometry = useMemo(() => {
    const theta = (angleDeg * Math.PI) / 180;
    const rim = new Vector2(length * Math.sin(theta), length * Math.cos(theta));
    // Lathe revolves about local y; the group below turns that onto chemistry z.
    return new LatheGeometry(
      [new Vector2(rim.x, -rim.y), new Vector2(0, 0), rim],
      64,
    );
  }, [angleDeg, length]);
  const rings = useMemo(() => {
    const theta = (angleDeg * Math.PI) / 180;
    const points: number[] = [];
    const segments = 64;
    for (const fraction of [0.5, 1]) {
      const r = fraction * length * Math.sin(theta);
      const h = fraction * length * Math.cos(theta);
      for (const side of [1, -1]) {
        for (let i = 0; i < segments; i += 1) {
          const a = (2 * Math.PI * i) / segments;
          const b = (2 * Math.PI * (i + 1)) / segments;
          points.push(
            r * Math.cos(a),
            side * h,
            r * Math.sin(a),
            r * Math.cos(b),
            side * h,
            r * Math.sin(b),
          );
        }
      }
    }
    const lines = new BufferGeometry();
    lines.setAttribute(
      "position",
      new BufferAttribute(new Float32Array(points), 3),
    );
    return lines;
  }, [angleDeg, length]);
  if (opacity <= 0) {
    return null;
  }
  return (
    <group rotation={[Math.PI / 2, 0, 0]}>
      <mesh geometry={geometry} renderOrder={2}>
        <meshBasicMaterial
          color={colors.node}
          transparent
          opacity={NODE_OPACITY * opacity}
          side={DoubleSide}
          depthWrite={false}
        />
      </mesh>
      <lineSegments geometry={rings} renderOrder={3}>
        <lineBasicMaterial
          color="#FFFFFF"
          transparent
          opacity={0.8 * opacity}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

type AxesProps = {
  /** Half-length in unit-sphere coordinates. */
  length?: number;
  opacity?: number;
};

const AXIS_ROTATION = {
  x: [0, 0, -Math.PI / 2],
  y: [0, 0, 0],
  z: [Math.PI / 2, 0, 0],
} as const;

export function Axes3D({ length = 1.3, opacity = 1 }: AxesProps) {
  if (opacity <= 0) {
    return null;
  }
  return (
    <>
      {(["x", "y", "z"] as const).map((axis) => (
        <mesh key={axis} rotation={[...AXIS_ROTATION[axis]]} renderOrder={1}>
          <cylinderGeometry args={[0.006, 0.006, 2 * length, 8]} />
          <meshBasicMaterial
            color={colors.axis}
            transparent
            opacity={opacity}
          />
        </mesh>
      ))}
    </>
  );
}

/** Unit-sphere coordinates of each axis tip, for projecting HTML labels. */
export function axisTip(axis: "x" | "y" | "z", length = 1.3) {
  return {
    x: [length, 0, 0],
    y: [0, length, 0],
    z: [0, 0, length],
  }[axis] as [number, number, number];
}
