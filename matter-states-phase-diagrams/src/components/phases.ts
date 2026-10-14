import { crossingAtY, type Curve } from "./geometry";
import type { Point } from "./particles";

/** Plot box shared by every phase diagram, in 1920×1080 diagram space. */
export const PLOT = { left: 300, top: 200, right: 1620, bottom: 880 } as const;

export type Substance = {
  triple: Point;
  critical: Point;
  atmY: number;
  solidGas: Curve;
  solidLiquid: Curve;
  liquidGas: Curve;
  regions: {
    solid: string;
    liquid: string;
    gas: string;
    supercritical: string;
  };
  labels: { solid: Point; liquid: Point; gas: Point };
};

const waterTriple = { x: 696, y: 676 };
const waterCritical = { x: 1356, y: 336 };

/** Schematic water diagram: solid–liquid line leans left (negative slope). */
export const WATER: Substance = {
  triple: waterTriple,
  critical: waterCritical,
  atmY: 540,
  solidGas: {
    kind: "quad",
    from: { x: 300, y: 846 },
    control: { x: 500, y: 800 },
    to: waterTriple,
  },
  solidLiquid: { kind: "line", from: waterTriple, to: { x: 564, y: 200 } },
  liquidGas: {
    kind: "cubic",
    from: waterTriple,
    c1: { x: 900, y: 676 },
    c2: { x: 1200, y: 500 },
    to: waterCritical,
  },
  regions: {
    solid: "M 300 846 Q 500 800 696 676 L 564 200 L 300 200 Z",
    liquid: "M 564 200 L 696 676 C 900 676 1200 500 1356 336 L 1356 200 Z",
    gas: "M 300 880 L 1620 880 L 1620 336 L 1356 336 C 1200 500 900 676 696 676 Q 500 800 300 846 Z",
    supercritical: "M 1356 336 L 1620 336 L 1620 200 L 1356 200 Z",
  },
  labels: {
    solid: { x: 450, y: 450 },
    liquid: { x: 900, y: 350 },
    gas: { x: 1100, y: 700 },
  },
};

const co2Triple = { x: 900, y: 608 };
const co2Critical = { x: 1380, y: 268 };

/** Schematic carbon dioxide diagram: positive solid–liquid slope, triple point above 1 atm. */
export const CO2: Substance = {
  triple: co2Triple,
  critical: co2Critical,
  atmY: 744,
  solidGas: {
    kind: "quad",
    from: { x: 300, y: 812 },
    control: { x: 600, y: 710 },
    to: co2Triple,
  },
  solidLiquid: { kind: "line", from: co2Triple, to: { x: 1140, y: 200 } },
  liquidGas: {
    kind: "quad",
    from: co2Triple,
    control: { x: 1140, y: 608 },
    to: co2Critical,
  },
  regions: {
    solid: "M 300 812 Q 600 710 900 608 L 1140 200 L 300 200 Z",
    liquid: "M 900 608 L 1140 200 L 1380 200 L 1380 268 Q 1140 608 900 608 Z",
    gas: "M 300 880 L 1620 880 L 1620 268 L 1380 268 Q 1140 608 900 608 Q 600 710 300 812 Z",
    supercritical: "M 1380 268 L 1620 268 L 1620 200 L 1380 200 Z",
  },
  labels: {
    solid: { x: 420, y: 330 },
    liquid: { x: 1200, y: 330 },
    gas: { x: 1150, y: 800 },
  },
};

export function normalPoints(substance: Substance) {
  return {
    melting: crossingAtY(substance.solidLiquid, substance.atmY),
    boiling: crossingAtY(substance.liquidGas, substance.atmY),
    sublimation: crossingAtY(substance.solidGas, substance.atmY),
  };
}
