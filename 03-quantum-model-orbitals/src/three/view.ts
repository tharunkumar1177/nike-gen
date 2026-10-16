import { Euler, MathUtils, Matrix4, Vector3 } from "three";
import { VIDEO } from "../theme";

/** Default chemistry view: z up, x toward the viewer's lower left, y right. */
export const ELEVATION_DEG = 20;
export const AZIMUTH_DEG = -30;

export type Placement = {
  /** Screen centre in px. */
  cx: number;
  cy: number;
  /** On-screen diameter in px of the orbital's bounding sphere. */
  size: number;
  /** Rotations about the orbital's own x, y, z axes, in degrees. */
  rotX?: number;
  rotY?: number;
  rotZ?: number;
};

// Chemistry axes to camera-facing world axes: x → +Z (toward viewer), y → +X, z → +Y.
// prettier-ignore
const CHEM_TO_WORLD = new Matrix4().set(
  0, 1, 0, 0,
  0, 0, 1, 0,
  1, 0, 0, 0,
  0, 0, 0, 1,
);

/**
 * Maps the unit sphere in chemistry coordinates onto the orthographic stage,
 * where one world unit is one screen pixel and the origin is the frame centre.
 */
export function placementMatrix({
  cx,
  cy,
  size,
  rotX = 0,
  rotY = 0,
  rotZ = 0,
}: Placement) {
  const rad = MathUtils.degToRad;
  const own = new Matrix4().makeRotationFromEuler(
    new Euler(rad(rotX), rad(rotY), rad(rotZ), "XYZ"),
  );
  const azimuth = new Matrix4().makeRotationY(rad(AZIMUTH_DEG));
  const elevation = new Matrix4().makeRotationX(rad(ELEVATION_DEG));
  const scale = new Matrix4().makeScale(size / 2, size / 2, size / 2);
  const translate = new Matrix4().makeTranslation(
    cx - VIDEO.width / 2,
    VIDEO.height / 2 - cy,
    0,
  );
  return translate
    .multiply(scale)
    .multiply(elevation)
    .multiply(azimuth)
    .multiply(CHEM_TO_WORLD)
    .multiply(own);
}

/** Screen position in px of a point given in the orbital's unit-sphere coordinates. */
export function projectPoint(
  placement: Placement,
  point: readonly [number, number, number],
) {
  const world = new Vector3(...point).applyMatrix4(placementMatrix(placement));
  return { x: world.x + VIDEO.width / 2, y: VIDEO.height / 2 - world.y };
}
