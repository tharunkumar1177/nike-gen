/** Acetic acid at 25 °C (OpenStax Appendix H). */
export const KA = 1.8e-5;
export const KW = 1.0e-14;
export const PKA = -Math.log10(KA);

const pH = (h: number) => -Math.log10(h);

/** Worked example 1: 0.100 M acetic acid, small-x approximation. */
export const WEAK = (() => {
  const c = 0.1;
  const x = Math.sqrt(KA * c);
  return { c, x, percent: (x / c) * 100, pH: pH(x) };
})();

/** Worked example 2: 1.00 L buffer, 0.100 mol HA + 0.100 mol A⁻, then 0.010 mol HCl. */
export const BUFFER = (() => {
  const ha = 0.1;
  const a = 0.1;
  const added = 0.01;
  const before = PKA + Math.log10(a / ha);
  const after = PKA + Math.log10((a - added) / (ha + added));
  const water = pH(added);
  return {
    ha,
    a,
    added,
    haAfter: ha + added,
    aAfter: a - added,
    before,
    after,
    water,
  };
})();

/** Worked example 3: 25.00 mL of 0.100 M acetic acid titrated with 0.100 M NaOH. */
export const TITRATION = {
  acidMl: 25,
  acidM: 0.1,
  baseM: 0.1,
  maxMl: 35,
} as const;

export const EQUIVALENCE_ML =
  (TITRATION.acidMl * TITRATION.acidM) / TITRATION.baseM;
export const HALF_ML = EQUIVALENCE_ML / 2;

/** pH at the equivalence point by A⁻ hydrolysis, as in the brief. */
export const EQUIVALENCE_PH = (() => {
  const moles = (TITRATION.acidMl * TITRATION.acidM) / 1000;
  const conc = moles / ((TITRATION.acidMl + EQUIVALENCE_ML) / 1000);
  const oh = Math.sqrt((KW / KA) * conc);
  return 14 + Math.log10(oh);
})();

function totals(ml: number) {
  const total = TITRATION.acidMl + ml;
  return {
    acid: (TITRATION.acidM * TITRATION.acidMl) / total,
    base: (TITRATION.baseM * ml) / total,
  };
}

/** Solves the charge balance [H⁺] + [Na⁺] = [A⁻] + [OH⁻] for [H⁺] by bisection on pH. */
function solve(balance: (h: number) => number) {
  let low = 0;
  let high = 14;
  for (let i = 0; i < 60; i += 1) {
    const mid = (low + high) / 2;
    if (balance(10 ** -mid) > 0) {
      low = mid;
    } else {
      high = mid;
    }
  }
  return (low + high) / 2;
}

/** Exact pH of the acetic acid titration after `ml` of NaOH. */
export function weakCurve(ml: number) {
  const { acid, base } = totals(ml);
  return solve((h) => h + base - (acid * KA) / (KA + h) - KW / h);
}

/** Exact pH of the same titration with 0.100 M HCl instead of acetic acid. */
export function strongCurve(ml: number) {
  const { acid, base } = totals(ml);
  return solve((h) => h + base - acid - KW / h);
}

/** Fraction of the original acid present as A⁻ after `ml` of NaOH. */
export function baseFraction(ml: number) {
  return Math.min(1, Math.max(0, ml / EQUIVALENCE_ML));
}

/** Indicator transition ranges (OpenStax 14.7, Fig. 14.19). */
export const PHENOLPHTHALEIN = { from: 8.3, to: 10.0 } as const;
export const METHYL_RED = { from: 3.2, to: 5.0 } as const;
