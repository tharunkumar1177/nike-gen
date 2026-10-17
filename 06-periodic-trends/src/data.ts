/**
 * Values from PLAN.md#Values: covalent radius in pm (Cordero 2008), IE₁ in
 * kJ/mol (NIST ASD), electron affinity in kJ/mol as energy released
 * (Andersen 1999), Pauling electronegativity (Allred 1961).
 */
export type Affinity = number | "unbound";

export type ElementData = {
  symbol: string;
  period: number;
  /** Main-group column: 0-1 for groups 1-2, 2-7 for groups 13-18. */
  column: number;
  radius?: number;
  ie?: number;
  ea?: Affinity;
};

export const ELEMENTS: readonly ElementData[] = [
  { symbol: "Li", period: 2, column: 0, radius: 128, ie: 520, ea: 59.6 },
  { symbol: "Be", period: 2, column: 1, radius: 96, ie: 900, ea: "unbound" },
  { symbol: "B", period: 2, column: 2, radius: 84, ie: 801, ea: 27 },
  { symbol: "C", period: 2, column: 3, radius: 76, ie: 1086, ea: 121.8 },
  { symbol: "N", period: 2, column: 4, radius: 71, ie: 1402, ea: "unbound" },
  { symbol: "O", period: 2, column: 5, radius: 66, ie: 1314, ea: 141 },
  { symbol: "F", period: 2, column: 6, radius: 57, ie: 1681, ea: 328.2 },
  { symbol: "Ne", period: 2, column: 7, radius: 58, ie: 2081, ea: "unbound" },
  { symbol: "Na", period: 3, column: 0, radius: 166, ie: 496 },
  { symbol: "K", period: 4, column: 0, radius: 203, ie: 419 },
  { symbol: "Rb", period: 5, column: 0, radius: 220, ie: 403 },
  { symbol: "Cs", period: 6, column: 0, radius: 244, ie: 376 },
  { symbol: "Fr", period: 7, column: 0 },
  { symbol: "Cl", period: 3, column: 6, radius: 102, ea: 348.6 },
  { symbol: "Br", period: 4, column: 6, radius: 120, ea: 324.5 },
  { symbol: "I", period: 5, column: 6, radius: 139, ea: 295.2 },
];

export const ELECTRONEGATIVITY = {
  Li: 0.98,
  Be: 1.57,
  B: 2.04,
  C: 2.55,
  N: 3.04,
  O: 3.44,
  F: 3.98,
  Cl: 3.16,
  Br: 2.96,
  I: 2.66,
  Cs: 0.79,
  Fr: 0.7,
} as const;

export const PERIOD_2 = ["Li", "Be", "B", "C", "N", "O", "F", "Ne"] as const;
export const GROUP_1_BELOW = ["Na", "K", "Rb", "Cs"] as const;
export const GROUP_17_BELOW = ["Cl", "Br", "I"] as const;

export function element(symbol: string): ElementData {
  const found = ELEMENTS.find((entry) => entry.symbol === symbol);
  if (!found) {
    throw new Error(`No data for ${symbol}.`);
  }
  return found;
}

export function valuesOf(
  symbols: readonly string[],
  key: "radius" | "ie" | "ea",
): Partial<Record<string, Affinity>> {
  const entries = symbols.map((symbol) => [symbol, element(symbol)[key]]);
  return Object.fromEntries(entries);
}

/** Shannon 1976 effective ionic radii in pm, coordination number VI. */
export const IONS = [
  { symbol: "O", charge: "2−", protons: 8, radius: 140 },
  { symbol: "F", charge: "−", protons: 9, radius: 133 },
  { symbol: "Na", charge: "+", protons: 11, radius: 102 },
  { symbol: "Mg", charge: "2+", protons: 12, radius: 72 },
  { symbol: "Al", charge: "3+", protons: 13, radius: 53.5 },
] as const;
