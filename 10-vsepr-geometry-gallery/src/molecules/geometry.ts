export type Vec3 = readonly [number, number, number];

/** One electron domain: a direction from the central atom and whether it holds an atom. */
export type Domain = {
  dir: Vec3;
  /** 1 = bonded atom, 0 = lone pair; fractional while morphing. */
  atom: number;
  /** Bond order drawn as parallel sticks; one domain regardless. */
  order: 1 | 2 | 3;
};

export type VseprClass =
  | "AX2"
  | "AX3"
  | "AX2E"
  | "AX4"
  | "AX3E"
  | "AX2E2"
  | "AX5"
  | "AX4E"
  | "AX3E2"
  | "AX2E3"
  | "AX6"
  | "AX5E"
  | "AX4E2";

type ClassInfo = {
  sn: 2 | 3 | 4 | 5 | 6;
  /** AXₘEₙ with subscripts, for display. */
  label: string;
  electron: string;
  molecular: string;
};

export const CLASS_INFO: Record<VseprClass, ClassInfo> = {
  AX2: { sn: 2, label: "AX₂", electron: "linear", molecular: "linear" },
  AX3: {
    sn: 3,
    label: "AX₃",
    electron: "trigonal planar",
    molecular: "trigonal planar",
  },
  AX2E: {
    sn: 3,
    label: "AX₂E",
    electron: "trigonal planar",
    molecular: "bent",
  },
  AX4: {
    sn: 4,
    label: "AX₄",
    electron: "tetrahedral",
    molecular: "tetrahedral",
  },
  AX3E: {
    sn: 4,
    label: "AX₃E",
    electron: "tetrahedral",
    molecular: "trigonal pyramidal",
  },
  AX2E2: {
    sn: 4,
    label: "AX₂E₂",
    electron: "tetrahedral",
    molecular: "bent",
  },
  AX5: {
    sn: 5,
    label: "AX₅",
    electron: "trigonal bipyramidal",
    molecular: "trigonal bipyramidal",
  },
  AX4E: {
    sn: 5,
    label: "AX₄E",
    electron: "trigonal bipyramidal",
    molecular: "seesaw",
  },
  AX3E2: {
    sn: 5,
    label: "AX₃E₂",
    electron: "trigonal bipyramidal",
    molecular: "T-shaped",
  },
  AX2E3: {
    sn: 5,
    label: "AX₂E₃",
    electron: "trigonal bipyramidal",
    molecular: "linear",
  },
  AX6: {
    sn: 6,
    label: "AX₆",
    electron: "octahedral",
    molecular: "octahedral",
  },
  AX5E: {
    sn: 6,
    label: "AX₅E",
    electron: "octahedral",
    molecular: "square pyramidal",
  },
  AX4E2: {
    sn: 6,
    label: "AX₄E₂",
    electron: "octahedral",
    molecular: "square planar",
  },
};

const RAD = Math.PI / 180;
const TETRAHEDRAL = Math.acos(-1 / 3) / RAD;

/** Unit vector in the xy plane, `deg` clockwise from +y. */
const inPlane = (deg: number): Vec3 => [
  Math.sin(deg * RAD),
  Math.cos(deg * RAD),
  0,
];

/** Unit vector in the xz plane, `deg` from +z toward +x. */
const equatorial = (deg: number): Vec3 => [
  Math.sin(deg * RAD),
  0,
  Math.cos(deg * RAD),
];

/** Three vectors about −y whose pairwise angle is `bondDeg`, the first toward +z. */
function pyramid(bondDeg: number): Vec3[] {
  const sin2 = (1 - Math.cos(bondDeg * RAD)) / 1.5;
  const s = Math.sqrt(sin2);
  const c = Math.sqrt(1 - sin2);
  return [0, 120, 240].map(
    (phi) => [s * Math.sin(phi * RAD), -c, s * Math.cos(phi * RAD)] as const,
  );
}

/** Two vectors in the xy plane about −y, `bondDeg` apart. */
const bentDown = (bondDeg: number): Vec3[] => [
  inPlane(180 - bondDeg / 2),
  inPlane(180 + bondDeg / 2),
];

/** Two vectors in the yz plane about +y, tetrahedral angle apart. */
const lonePairsUp = (): Vec3[] => [
  [0, Math.cos((TETRAHEDRAL / 2) * RAD), Math.sin((TETRAHEDRAL / 2) * RAD)],
  [0, Math.cos((TETRAHEDRAL / 2) * RAD), -Math.sin((TETRAHEDRAL / 2) * RAD)],
];

/**
 * Slot directions per class at the ideal angles and at the example's measured
 * angles (PLAN.md geometry table). Slot order is fixed per steric number:
 * SN 2 [−x, +x]; SN 3 [+y, lower right, lower left];
 * SN 4 [+y, then three below, first toward +z] (AX₂E₂ uses [lower right,
 * lower left, upper front, upper back]); SN 5 [+y, −y, eq +z, eq right, eq left];
 * SN 6 [+x, −x, +y, −y, +z, −z].
 */
const SLOTS: Record<
  VseprClass,
  { ideal: Vec3[]; measured: Vec3[]; lonePairs: number[] }
> = {
  AX2: {
    ideal: [inPlane(-90), inPlane(90)],
    measured: [inPlane(-90), inPlane(90)],
    lonePairs: [],
  },
  AX3: {
    ideal: [inPlane(0), inPlane(120), inPlane(240)],
    measured: [inPlane(0), inPlane(120), inPlane(240)],
    lonePairs: [],
  },
  AX2E: {
    ideal: [inPlane(0), ...bentDown(120)],
    measured: [inPlane(0), ...bentDown(119)],
    lonePairs: [0],
  },
  AX4: {
    ideal: [[0, 1, 0], ...pyramid(TETRAHEDRAL)],
    measured: [[0, 1, 0], ...pyramid(TETRAHEDRAL)],
    lonePairs: [],
  },
  AX3E: {
    ideal: [[0, 1, 0], ...pyramid(TETRAHEDRAL)],
    measured: [[0, 1, 0], ...pyramid(107)],
    lonePairs: [0],
  },
  AX2E2: {
    ideal: [...bentDown(TETRAHEDRAL), ...lonePairsUp()],
    measured: [...bentDown(104.5), ...lonePairsUp()],
    lonePairs: [2, 3],
  },
  AX5: {
    ideal: [
      [0, 1, 0],
      [0, -1, 0],
      equatorial(0),
      equatorial(120),
      equatorial(240),
    ],
    measured: [
      [0, 1, 0],
      [0, -1, 0],
      equatorial(0),
      equatorial(120),
      equatorial(240),
    ],
    lonePairs: [],
  },
  AX4E: {
    ideal: [
      [0, 1, 0],
      [0, -1, 0],
      equatorial(0),
      equatorial(120),
      equatorial(240),
    ],
    // Axial F–S–F 173.1°: each axial bond tilts 3.45° away from the lone pair.
    // Equatorial F–S–F 101.6°: each sits 50.8° from the −z direction.
    measured: [
      [0, Math.cos(3.45 * RAD), -Math.sin(3.45 * RAD)],
      [0, -Math.cos(3.45 * RAD), -Math.sin(3.45 * RAD)],
      equatorial(0),
      equatorial(180 - 50.8),
      equatorial(180 + 50.8),
    ],
    lonePairs: [2],
  },
  AX3E2: {
    ideal: [
      [0, 1, 0],
      [0, -1, 0],
      equatorial(0),
      equatorial(120),
      equatorial(240),
    ],
    // F(axial)–Cl–F(equatorial) 87.5°: axial bonds lean toward the +z fluorine.
    measured: [
      [0, Math.sin(87.5 * RAD), Math.cos(87.5 * RAD)],
      [0, -Math.sin(87.5 * RAD), Math.cos(87.5 * RAD)],
      equatorial(0),
      equatorial(120),
      equatorial(240),
    ],
    lonePairs: [3, 4],
  },
  AX2E3: {
    ideal: [
      [0, 1, 0],
      [0, -1, 0],
      equatorial(0),
      equatorial(120),
      equatorial(240),
    ],
    measured: [
      [0, 1, 0],
      [0, -1, 0],
      equatorial(0),
      equatorial(120),
      equatorial(240),
    ],
    lonePairs: [2, 3, 4],
  },
  AX6: {
    ideal: [
      [1, 0, 0],
      [-1, 0, 0],
      [0, 1, 0],
      [0, -1, 0],
      [0, 0, 1],
      [0, 0, -1],
    ],
    measured: [
      [1, 0, 0],
      [-1, 0, 0],
      [0, 1, 0],
      [0, -1, 0],
      [0, 0, 1],
      [0, 0, -1],
    ],
    lonePairs: [],
  },
  AX5E: {
    ideal: [
      [1, 0, 0],
      [-1, 0, 0],
      [0, 1, 0],
      [0, -1, 0],
      [0, 0, 1],
      [0, 0, -1],
    ],
    // F(apical)–Br–F(basal) 84.8°: basal bonds rise toward the apical fluorine.
    measured: [
      [Math.sin(84.8 * RAD), Math.cos(84.8 * RAD), 0],
      [-Math.sin(84.8 * RAD), Math.cos(84.8 * RAD), 0],
      [0, 1, 0],
      [0, -1, 0],
      [0, Math.cos(84.8 * RAD), Math.sin(84.8 * RAD)],
      [0, Math.cos(84.8 * RAD), -Math.sin(84.8 * RAD)],
    ],
    lonePairs: [3],
  },
  AX4E2: {
    ideal: [
      [1, 0, 0],
      [-1, 0, 0],
      [0, 1, 0],
      [0, -1, 0],
      [0, 0, 1],
      [0, 0, -1],
    ],
    measured: [
      [1, 0, 0],
      [-1, 0, 0],
      [0, 1, 0],
      [0, -1, 0],
      [0, 0, 1],
      [0, 0, -1],
    ],
    lonePairs: [2, 3],
  },
};

export function normalize(v: Vec3): Vec3 {
  const length = Math.hypot(v[0], v[1], v[2]) || 1;
  return [v[0] / length, v[1] / length, v[2] / length];
}

/**
 * Domains of a class; `squeeze` blends from ideal (0) to the example's
 * measured angles (1). `orders` sets bond orders by slot index.
 */
export function domainsFor(
  cls: VseprClass,
  squeeze = 0,
  orders: Partial<Record<number, 1 | 2 | 3>> = {},
): Domain[] {
  const slots = SLOTS[cls];
  return slots.ideal.map((ideal, i) => {
    const measured = slots.measured[i] ?? ideal;
    return {
      dir: normalize([
        ideal[0] + (measured[0] - ideal[0]) * squeeze,
        ideal[1] + (measured[1] - ideal[1]) * squeeze,
        ideal[2] + (measured[2] - ideal[2]) * squeeze,
      ]),
      atom: slots.lonePairs.includes(i) ? 0 : 1,
      order: orders[i] ?? 1,
    };
  });
}

/** Per-slot blend between two domain sets of equal length. */
export function morphDomains(
  from: Domain[],
  to: Domain[],
  t: number,
): Domain[] {
  if (from.length !== to.length) {
    throw new Error("Cannot morph domain sets of different sizes.");
  }
  return to.map((target, i) => {
    const source = from[i] ?? target;
    return {
      dir: normalize([
        source.dir[0] + (target.dir[0] - source.dir[0]) * t,
        source.dir[1] + (target.dir[1] - source.dir[1]) * t,
        source.dir[2] + (target.dir[2] - source.dir[2]) * t,
      ]),
      atom: source.atom + (target.atom - source.atom) * t,
      order: t < 0.5 ? source.order : target.order,
    };
  });
}

/** Edges of the electron-domain polyhedron, by slot index. */
export function frameEdges(count: number): [number, number][] {
  switch (count) {
    case 2:
      return [[0, 1]];
    case 3:
      return [
        [0, 1],
        [1, 2],
        [2, 0],
      ];
    case 4:
      return [
        [0, 1],
        [0, 2],
        [0, 3],
        [1, 2],
        [1, 3],
        [2, 3],
      ];
    case 5:
      return [
        [0, 2],
        [0, 3],
        [0, 4],
        [1, 2],
        [1, 3],
        [1, 4],
        [2, 3],
        [3, 4],
        [4, 2],
      ];
    case 6: {
      const edges: [number, number][] = [];
      for (let i = 0; i < 6; i += 1) {
        for (let j = i + 1; j < 6; j += 1) {
          if (Math.floor(i / 2) !== Math.floor(j / 2)) {
            edges.push([i, j]);
          }
        }
      }
      return edges;
    }
    default:
      throw new Error(`No domain polyhedron for ${count} domains.`);
  }
}
