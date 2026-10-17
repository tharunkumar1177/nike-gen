import type { ReactNode } from "react";

/** Superscript that keeps the line box steady (the font subset lacks ⁰-⁹). */
export function Sup({ children }: { children: ReactNode }) {
  return (
    <span style={{ fontSize: "0.6em", verticalAlign: "0.7em", lineHeight: 0 }}>
      {children}
    </span>
  );
}

export function Sub({ children }: { children: ReactNode }) {
  return (
    <span
      style={{ fontSize: "0.6em", verticalAlign: "-0.25em", lineHeight: 0 }}
    >
      {children}
    </span>
  );
}

export function Zeff() {
  return (
    <>
      Z<Sub>eff</Sub>
    </>
  );
}
