/** Worked example: N₂O₄ ⇌ 2 NO₂, 0.050 mol N₂O₄ in 1.0 L, [NO₂]eq = 0.016 M. */
export const INITIAL_N2O4 = 0.05;
export const EQ_NO2 = 0.016;
export const CHANGE = EQ_NO2 / 2;
export const EQ_N2O4 = INITIAL_N2O4 - CHANGE;
export const KC = EQ_NO2 ** 2 / EQ_N2O4;

/** N₂O₄ added to the equilibrium mixture in the Le Chatelier scene, in M. */
export const ADDED_N2O4 = 0.05;
const STRESSED_N2O4 = EQ_N2O4 + ADDED_N2O4;

/** Extent y of the shift right after the addition: (b + 2y)² = Kc (a − y). */
const SHIFT = (() => {
  const a = STRESSED_N2O4;
  const b = EQ_NO2;
  const linear = 4 * b + KC;
  const constant = b * b - KC * a;
  return (-linear + Math.sqrt(linear * linear - 16 * constant)) / 8;
})();

export const NEW_N2O4 = STRESSED_N2O4 - SHIFT;
export const NEW_NO2 = EQ_NO2 + 2 * SHIFT;

/** Fraction of the way to equilibrium at normalised time `t`, starting at `t0`. */
function approach(t: number, t0: number, tau: number) {
  return 1 - Math.exp(-(t - t0) / tau);
}

const RISE = 0.12;

/** Pure N₂O₄ settling to equilibrium. */
export const fromStart = {
  n2o4: (t: number) => INITIAL_N2O4 - CHANGE * approach(t, 0, RISE),
  no2: (t: number) => 2 * CHANGE * approach(t, 0, RISE),
};

/** Normalised time at which N₂O₄ is added in the Le Chatelier scene. */
export const STRESS_AT = 0.3;

/** Equilibrium mixture, then N₂O₄ added at `STRESS_AT` and a new equilibrium. */
export const afterStress = {
  n2o4: (t: number) => STRESSED_N2O4 - SHIFT * approach(t, STRESS_AT, 0.1),
  no2: (t: number) => EQ_NO2 + 2 * SHIFT * approach(t, STRESS_AT, 0.1),
};
