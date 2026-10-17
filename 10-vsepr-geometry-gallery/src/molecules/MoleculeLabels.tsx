import { colors, FONT } from "../theme";
import {
  ARC_RADIUS,
  arcPoints,
  BOND_LENGTH,
  CENTRAL_RADIUS,
  elementTextColor,
  ligandOf,
  ligandRadius,
  resolveDir,
  type MoleculeSpec,
} from "./spec";
import { projectPoint } from "./view";

/** Atom symbols below this on-screen radius are unreadable and omitted. */
const MIN_LABEL_RADIUS_PX = 14;

type Ball = { x: number; y: number; depth: number; r: number };

function occluded(ball: Ball, others: Ball[]) {
  return others.some(
    (other) =>
      other !== ball &&
      other.depth > ball.depth &&
      Math.hypot(other.x - ball.x, other.y - ball.y) < other.r * 0.85,
  );
}

function AtomSymbols({ spec }: { spec: MoleculeSpec }) {
  const opacity = (spec.opacity ?? 1) * (spec.labelOpacity ?? 1);
  const pxPerUnit = spec.size / 2;
  if (opacity <= 0 || CENTRAL_RADIUS * pxPerUnit < MIN_LABEL_RADIUS_PX) {
    return null;
  }
  const centre = projectPoint(spec, [0, 0, 0]);
  const central = {
    ...centre,
    r: CENTRAL_RADIUS * pxPerUnit,
    symbol: spec.central,
    alpha: 1,
  };
  const ligands = spec.domains
    .map((domain, slot) => {
      const symbol = ligandOf(spec, slot);
      const p = projectPoint(spec, [
        domain.dir[0] * BOND_LENGTH,
        domain.dir[1] * BOND_LENGTH,
        domain.dir[2] * BOND_LENGTH,
      ]);
      return {
        ...p,
        r: ligandRadius(symbol) * pxPerUnit,
        symbol,
        alpha: domain.atom,
      };
    })
    .filter((ball) => ball.alpha > 0);
  const balls = [central, ...ligands];
  return (
    <>
      {balls
        .filter((ball) => ball.r >= MIN_LABEL_RADIUS_PX * 0.8)
        .filter((ball) => !occluded(ball, balls))
        .map((ball, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: ball.x,
              top: ball.y,
              transform: "translate(-50%, -50%)",
              fontFamily: FONT,
              fontWeight: 700,
              fontSize: Math.round(ball.r * (ball.symbol.length > 1 ? 0.8 : 1)),
              lineHeight: 1,
              color:
                ball === central ? "#FFFFFF" : elementTextColor(ball.symbol),
              opacity: opacity * ball.alpha,
              whiteSpace: "nowrap",
            }}
          >
            {ball.symbol}
          </div>
        ))}
    </>
  );
}

function ArcLabels({ spec }: { spec: MoleculeSpec }) {
  const opacity = spec.opacity ?? 1;
  return (
    <>
      {(spec.arcs ?? []).map((arc, i) => {
        const progress = arc.progress ?? 1;
        if (!arc.label || progress < 1 || opacity <= 0) {
          return null;
        }
        const radius = arc.radius ?? ARC_RADIUS;
        const { mid } = arcPoints(
          resolveDir(spec, arc.a),
          resolveDir(spec, arc.b),
          radius,
          1,
          arc.via,
        );
        const labelAt = radius + 0.2;
        const p = projectPoint(spec, [
          mid[0] * labelAt,
          mid[1] * labelAt,
          mid[2] * labelAt,
        ]);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: p.x,
              top: p.y,
              transform: "translate(-50%, -50%)",
              fontFamily: FONT,
              fontWeight: 500,
              fontSize: 32,
              lineHeight: 1,
              color: arc.color ?? colors.angle,
              opacity: opacity * (arc.opacity ?? 1),
              padding: "4px 8px",
              borderRadius: 8,
              background: "rgba(255, 255, 255, 0.85)",
              whiteSpace: "nowrap",
            }}
          >
            {arc.label}
          </div>
        );
      })}
    </>
  );
}

/** Element symbols on atoms and angle labels, drawn above the 3D stage. */
export function MoleculeLabels({ specs }: { specs: MoleculeSpec[] }) {
  return (
    <>
      {specs.map((spec) => (
        <div key={spec.id}>
          <AtomSymbols spec={spec} />
          <ArcLabels spec={spec} />
        </div>
      ))}
    </>
  );
}
