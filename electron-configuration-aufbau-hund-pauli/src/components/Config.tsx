import type { ReactNode } from "react";
import { colors } from "../theme";

type Kind = "s" | "p" | "d";

const KIND_COLOR: Record<Kind, string> = {
  s: colors.sText,
  p: colors.pText,
  d: colors.dText,
};

export function Sup({ children }: { children: ReactNode }) {
  return (
    <sup style={{ fontSize: "60%", verticalAlign: "0.45em", lineHeight: 0 }}>
      {children}
    </sup>
  );
}

/** A subshell term such as 3d⁶, coloured by subshell type. */
export function Term({
  name,
  count,
}: {
  name: `${number}${Kind}`;
  count: number;
}) {
  const kind = name.slice(-1) as Kind;
  return (
    <span style={{ color: KIND_COLOR[kind] }}>
      {name}
      <Sup>{count}</Sup>
    </span>
  );
}
