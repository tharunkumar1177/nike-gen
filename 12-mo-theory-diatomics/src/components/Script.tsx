import type { ReactNode } from "react";

export function Sub({ children }: { children: ReactNode }) {
  return (
    <sub style={{ fontSize: "62%", verticalAlign: "-0.25em", lineHeight: 0 }}>
      {children}
    </sub>
  );
}

export function Sup({ children }: { children: ReactNode }) {
  return (
    <sup style={{ fontSize: "62%", verticalAlign: "0.5em", lineHeight: 0 }}>
      {children}
    </sup>
  );
}

/** A chemical formula such as O₂²⁻: element, subscript count, superscript charge. */
export function Formula({
  base,
  sub,
  sup,
}: {
  base: string;
  sub?: string;
  sup?: string;
}) {
  return (
    <span>
      {base}
      {sub ? <Sub>{sub}</Sub> : null}
      {sup ? <Sup>{sup}</Sup> : null}
    </span>
  );
}

/** A molecular orbital label such as σ*2p: Greek letter, optional star, subshell. */
export function MoLabel({
  letter,
  star = false,
  shell,
}: {
  letter: "σ" | "π";
  star?: boolean;
  shell: string;
}) {
  return (
    <span>
      {letter}
      {star ? <Sup>*</Sup> : null}
      {shell}
    </span>
  );
}
