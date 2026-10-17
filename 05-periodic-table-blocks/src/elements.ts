import type { Block } from "./theme";

export type Element = {
  symbol: string;
  period: number;
  /** IUPAC group 1–18; null for the f rows. */
  group: number | null;
  /** Column 0–13 within the f rows; null for the main table. */
  fColumn: number | null;
  block: Block;
};

const MAIN_ROWS: string[][] = [
  ["H", "He"],
  ["Li", "Be", "B", "C", "N", "O", "F", "Ne"],
  ["Na", "Mg", "Al", "Si", "P", "S", "Cl", "Ar"],
  "K Ca Sc Ti V Cr Mn Fe Co Ni Cu Zn Ga Ge As Se Br Kr".split(" "),
  "Rb Sr Y Zr Nb Mo Tc Ru Rh Pd Ag Cd In Sn Sb Te I Xe".split(" "),
  "Cs Ba Lu Hf Ta W Re Os Ir Pt Au Hg Tl Pb Bi Po At Rn".split(" "),
  "Fr Ra Lr Rf Db Sg Bh Hs Mt Ds Rg Cn Nh Fl Mc Lv Ts Og".split(" "),
];

/** Group 3 holds Lu and Lr, so the f rows are La–Yb and Ac–No (14 each). */
const F_ROWS: Record<number, string[]> = {
  6: "La Ce Pr Nd Pm Sm Eu Gd Tb Dy Ho Er Tm Yb".split(" "),
  7: "Ac Th Pa U Np Pu Am Cm Bk Cf Es Fm Md No".split(" "),
};

function groupsFor(count: number): number[] {
  if (count === 2) return [1, 18];
  if (count === 8) return [1, 2, 13, 14, 15, 16, 17, 18];
  return Array.from({ length: 18 }, (_, i) => i + 1);
}

function blockOf(symbol: string, group: number): Block {
  if (symbol === "He" || group <= 2) return "s";
  if (group >= 13) return "p";
  return "d";
}

export const ELEMENTS: Element[] = [
  ...MAIN_ROWS.flatMap((row, index) => {
    const groups = groupsFor(row.length);
    return row.map((symbol, i) => {
      const group = groups[i] ?? 0;
      return {
        symbol,
        period: index + 1,
        group,
        fColumn: null,
        block: blockOf(symbol, group),
      };
    });
  }),
  ...Object.entries(F_ROWS).flatMap(([period, row]) =>
    row.map((symbol, fColumn) => ({
      symbol,
      period: Number(period),
      group: null,
      fColumn,
      block: "f" as const,
    })),
  ),
];

export function element(symbol: string): Element {
  const found = ELEMENTS.find((entry) => entry.symbol === symbol);
  if (!found) {
    throw new Error(`Unknown element ${symbol}.`);
  }
  return found;
}
