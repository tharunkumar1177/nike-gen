import type { Point } from "./particles";

export type Curve =
  | { kind: "line"; from: Point; to: Point }
  | { kind: "quad"; from: Point; control: Point; to: Point }
  | { kind: "cubic"; from: Point; c1: Point; c2: Point; to: Point };

export function curvePath(curve: Curve): string {
  const { from, to } = curve;
  switch (curve.kind) {
    case "line":
      return `M ${from.x} ${from.y} L ${to.x} ${to.y}`;
    case "quad":
      return `M ${from.x} ${from.y} Q ${curve.control.x} ${curve.control.y} ${to.x} ${to.y}`;
    case "cubic":
      return `M ${from.x} ${from.y} C ${curve.c1.x} ${curve.c1.y} ${curve.c2.x} ${curve.c2.y} ${to.x} ${to.y}`;
  }
}

export function pointOn(curve: Curve, t: number): Point {
  const u = 1 - t;
  switch (curve.kind) {
    case "line":
      return {
        x: u * curve.from.x + t * curve.to.x,
        y: u * curve.from.y + t * curve.to.y,
      };
    case "quad":
      return {
        x: u * u * curve.from.x + 2 * u * t * curve.control.x + t * t * curve.to.x,
        y: u * u * curve.from.y + 2 * u * t * curve.control.y + t * t * curve.to.y,
      };
    case "cubic":
      return {
        x:
          u * u * u * curve.from.x +
          3 * u * u * t * curve.c1.x +
          3 * u * t * t * curve.c2.x +
          t * t * t * curve.to.x,
        y:
          u * u * u * curve.from.y +
          3 * u * u * t * curve.c1.y +
          3 * u * t * t * curve.c2.y +
          t * t * t * curve.to.y,
      };
  }
}

/** Point where a curve that is monotonic in y crosses the horizontal line `y`. */
export function crossingAtY(curve: Curve, y: number): Point {
  let low = 0;
  let high = 1;
  const rising = pointOn(curve, 1).y < pointOn(curve, 0).y;
  for (let i = 0; i < 40; i += 1) {
    const mid = (low + high) / 2;
    const above = pointOn(curve, mid).y < y;
    if (above === rising) high = mid;
    else low = mid;
  }
  return pointOn(curve, (low + high) / 2);
}
