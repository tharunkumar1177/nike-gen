import { Euler, MathUtils, Matrix4, Quaternion, Vector3 } from "three";
import { VIDEO } from "../theme";
import type { Vec3 } from "./geometry";

/** Default tilt toward the viewer, in degrees. */
export const ELEVATION_DEG = 15;

/** Rotation as a quaternion [x, y, z, w]. */
export type Pose = readonly [number, number, number, number];

export type Placement = {
  /** Screen centre in px. */
  cx: number;
  cy: number;
  /** On-screen diameter in px of the sphere through the domain tips. */
  size: number;
  /** Molecule-frame rotation (y up, x right, z toward the viewer). */
  pose: Pose;
};

const toPose = (q: Quaternion): Pose => [q.x, q.y, q.z, q.w];

/** Rotations about the molecule's x, y, z axes in degrees (y spin, then x tilt). */
export function eulerPose(rotX = ELEVATION_DEG, rotY = 0, rotZ = 0): Pose {
  const rad = MathUtils.degToRad;
  return toPose(
    new Quaternion().setFromEuler(
      new Euler(rad(rotX), rad(rotY), rad(rotZ), "XYZ"),
    ),
  );
}

/**
 * Pose that lays the plane of domains `a` and `b` flat on the screen with
 * their bisector pointing along `toward` (screen axes, y up). For 180° pairs
 * `via` picks the plane.
 */
export function facePose(
  a: Vec3,
  b: Vec3,
  toward: Vec3 = [0, -1, 0],
  via?: Vec3,
): Pose {
  const ua = new Vector3(...a).normalize();
  const ub = new Vector3(...b).normalize();
  const normal = new Vector3().crossVectors(ua, via ? new Vector3(...via) : ub);
  if (normal.lengthSq() < 1e-9) {
    normal.crossVectors(ua, new Vector3(0, 0, 1));
  }
  normal.normalize();
  let bisector = ua.clone().add(ub);
  if (bisector.lengthSq() < 1e-9) {
    bisector = new Vector3().crossVectors(normal, ua);
  }
  bisector.normalize();
  const source = new Matrix4().makeBasis(
    bisector,
    new Vector3().crossVectors(normal, bisector),
    normal,
  );
  const d = new Vector3(...toward).normalize();
  const z = new Vector3(0, 0, 1);
  const target = new Matrix4().makeBasis(
    d,
    new Vector3().crossVectors(z, d),
    z,
  );
  const rotation = target.multiply(source.transpose());
  return toPose(new Quaternion().setFromRotationMatrix(rotation));
}

export function blendPose(from: Pose, to: Pose, t: number): Pose {
  return toPose(
    new Quaternion(...from).slerp(
      new Quaternion(...to),
      Math.min(1, Math.max(0, t)),
    ),
  );
}

/**
 * Molecule frame (unit sphere) to the orthographic stage, where one world
 * unit is one screen pixel.
 */
export function placementMatrix({ cx, cy, size, pose }: Placement) {
  const rotation = new Matrix4().makeRotationFromQuaternion(
    new Quaternion(...pose),
  );
  const scale = new Matrix4().makeScale(size / 2, size / 2, size / 2);
  const translate = new Matrix4().makeTranslation(
    cx - VIDEO.width / 2,
    VIDEO.height / 2 - cy,
    0,
  );
  return translate.multiply(scale).multiply(rotation);
}

/** Screen position in px and depth (toward the viewer) of a molecule-frame point. */
export function projectPoint(placement: Placement, point: Vec3) {
  const world = new Vector3(...point).applyMatrix4(placementMatrix(placement));
  return {
    x: world.x + VIDEO.width / 2,
    y: VIDEO.height / 2 - world.y,
    depth: world.z,
  };
}
