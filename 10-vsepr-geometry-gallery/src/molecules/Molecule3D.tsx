import { useEffect, useMemo } from "react";
import {
  CatmullRomCurve3,
  Color,
  LatheGeometry,
  Quaternion,
  TubeGeometry,
  Vector2,
  Vector3,
} from "three";
import { colors } from "../theme";
import { frameEdges, type Vec3 } from "./geometry";
import {
  ARC_RADIUS,
  arcPoints,
  BOND_LENGTH,
  CENTRAL_RADIUS,
  elementColor,
  LONE_PAIR_LENGTH,
  ligandOf,
  ligandRadius,
  resolveDir,
  type ArcSpec,
  type MoleculeSpec,
} from "./spec";
import { placementMatrix } from "./view";

const UP = new Vector3(0, 1, 0);
const BOND_RADIUS = 0.04;
const FRAME_RADIUS = 0.008;

function alongY(dir: Vec3) {
  return new Quaternion().setFromUnitVectors(UP, new Vector3(...dir));
}

function scaled(dir: Vec3, k: number): Vec3 {
  return [dir[0] * k, dir[1] * k, dir[2] * k];
}

function tint(base: string, amount: number, to: string) {
  return `#${new Color(base).lerp(new Color(to), amount).getHexString()}`;
}

/** Teardrop lobe along +y: narrow at the nucleus, rounded at the outer end. */
function useLobeGeometry() {
  const geometry = useMemo(() => {
    const points: Vector2[] = [];
    const steps = 28;
    for (let i = 0; i <= steps; i += 1) {
      const t = i / steps;
      const r = 0.2 * 2.598 * t * Math.sqrt(Math.max(0, 1 - t));
      points.push(new Vector2(r, t * LONE_PAIR_LENGTH));
    }
    return new LatheGeometry(points, 40);
  }, []);
  useEffect(() => () => geometry.dispose(), [geometry]);
  return geometry;
}

function Stick({
  from,
  to,
  radius,
  color,
  opacity,
}: {
  from: Vec3;
  to: Vec3;
  radius: number;
  color: string;
  opacity: number;
}) {
  const delta: Vec3 = [to[0] - from[0], to[1] - from[1], to[2] - from[2]];
  const length = Math.hypot(...delta);
  if (length < 1e-6 || opacity <= 0) {
    return null;
  }
  const dir = scaled(delta, 1 / length);
  return (
    <mesh
      position={[
        (from[0] + to[0]) / 2,
        (from[1] + to[1]) / 2,
        (from[2] + to[2]) / 2,
      ]}
      quaternion={alongY(dir)}
    >
      <cylinderGeometry args={[radius, radius, length, 20]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={opacity}
        roughness={0.5}
      />
    </mesh>
  );
}

/** Offsets of parallel sticks for a bond order, perpendicular to the bond. */
function bondOffsets(dir: Vec3, order: 1 | 2 | 3): Vec3[] {
  if (order === 1) {
    return [[0, 0, 0]];
  }
  const ref = Math.abs(dir[2]) < 0.9 ? new Vector3(0, 0, 1) : UP.clone();
  const side = new Vector3(...dir).cross(ref).normalize();
  const gap = order === 2 ? 0.055 : 0.07;
  const s: Vec3 = [side.x * gap, side.y * gap, side.z * gap];
  return order === 2
    ? [s, scaled(s, -1)]
    : [s, [0, 0, 0], scaled(s, -1)];
}

function Arc({ spec, arc }: { spec: MoleculeSpec; arc: ArcSpec }) {
  const a = resolveDir(spec, arc.a);
  const b = resolveDir(spec, arc.b);
  const progress = arc.progress ?? 1;
  const radius = arc.radius ?? ARC_RADIUS;
  const shape = JSON.stringify([a, b, radius, progress, arc.via ?? null]);
  const geometry = useMemo(() => {
    const [from, to, r, p, via] = JSON.parse(shape) as [
      Vec3,
      Vec3,
      number,
      number,
      Vec3 | null,
    ];
    const { points } = arcPoints(from, to, r, Math.max(p, 0.001), via ?? undefined);
    const curve = new CatmullRomCurve3(points.map((q) => new Vector3(...q)));
    return new TubeGeometry(curve, 48, 0.014, 10, false);
  }, [shape]);
  useEffect(() => () => geometry.dispose(), [geometry]);
  const opacity = (arc.opacity ?? 1) * (spec.opacity ?? 1);
  if (progress <= 0 || opacity <= 0) {
    return null;
  }
  return (
    <mesh geometry={geometry}>
      <meshBasicMaterial
        color={arc.color ?? colors.angle}
        transparent
        opacity={opacity}
      />
    </mesh>
  );
}

export function Molecule3D({ spec }: { spec: MoleculeSpec }) {
  const lobe = useLobeGeometry();
  const matrix = placementMatrix(spec);
  const opacity = spec.opacity ?? 1;
  const lonePairOpacity = spec.lonePairOpacity ?? 1;
  const frameOpacity = (spec.frameOpacity ?? 0) * opacity;
  const highlighted = new Set(spec.highlight ?? []);
  const highlightAmount = spec.highlightAmount ?? 0;
  const highlightColor = spec.highlightColor ?? colors.highlight;
  if (opacity <= 0) {
    return null;
  }
  return (
    <group matrix={matrix} matrixAutoUpdate={false}>
      <mesh>
        <sphereGeometry args={[CENTRAL_RADIUS, 40, 28]} />
        <meshStandardMaterial
          color={colors.central}
          transparent
          opacity={opacity}
          roughness={0.45}
        />
      </mesh>
      {spec.domains.map((domain, slot) => {
        const symbol = ligandOf(spec, slot);
        const radius = ligandRadius(symbol);
        const end = scaled(domain.dir, BOND_LENGTH);
        const glow = highlighted.has(slot) ? highlightAmount : 0;
        const atomOpacity = opacity * domain.atom;
        const pairOpacity = opacity * lonePairOpacity * (1 - domain.atom);
        return (
          <group key={slot}>
            {atomOpacity > 0
              ? bondOffsets(domain.dir, domain.order).map((offset, k) => (
                  <Stick
                    key={k}
                    from={offset}
                    to={[
                      end[0] + offset[0],
                      end[1] + offset[1],
                      end[2] + offset[2],
                    ]}
                    radius={domain.order === 1 ? BOND_RADIUS : BOND_RADIUS * 0.7}
                    color={tint(colors.bond, glow, highlightColor)}
                    opacity={atomOpacity}
                  />
                ))
              : null}
            {atomOpacity > 0 ? (
              <mesh position={end}>
                <sphereGeometry args={[radius, 36, 24]} />
                <meshStandardMaterial
                  color={tint(elementColor(symbol), glow, highlightColor)}
                  transparent
                  opacity={atomOpacity}
                  roughness={0.45}
                />
              </mesh>
            ) : null}
            {pairOpacity > 0 ? (
              <mesh
                geometry={lobe}
                quaternion={alongY(domain.dir)}
                scale={spec.lonePairScale ?? 1}
              >
                <meshStandardMaterial
                  color={tint(colors.lonePair, glow, highlightColor)}
                  transparent
                  opacity={0.6 * pairOpacity}
                  depthWrite={false}
                  roughness={0.6}
                />
              </mesh>
            ) : null}
          </group>
        );
      })}
      {frameOpacity > 0
        ? frameEdges(spec.domains.length).map(([i, j]) => {
            const a = spec.domains[i];
            const b = spec.domains[j];
            if (!a || !b) {
              return null;
            }
            return (
              <Stick
                key={`${i}-${j}`}
                from={scaled(a.dir, BOND_LENGTH)}
                to={scaled(b.dir, BOND_LENGTH)}
                radius={FRAME_RADIUS}
                color={colors.frame}
                opacity={frameOpacity}
              />
            );
          })
        : null}
      {(spec.arcs ?? []).map((arc, i) => (
        <Arc key={i} spec={spec} arc={arc} />
      ))}
    </group>
  );
}
