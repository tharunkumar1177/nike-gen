import type { ReactNode } from "react";

type Props = {
  /** Mass number, written top-left. */
  a: ReactNode;
  /** Atomic number (or charge for particles), written bottom-left. */
  z: ReactNode;
  children: ReactNode;
  color?: string;
  /** Colour of the A and Z numbers, for highlighting the bookkeeping. */
  numberColor?: string;
};

/** Nuclide symbol in A-over-Z notation, sized relative to the surrounding text. */
export function Nuclide({ a, z, children, color, numberColor }: Props) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        verticalAlign: "middle",
        color,
      }}
    >
      <span
        style={{
          display: "inline-flex",
          flexDirection: "column",
          alignItems: "flex-end",
          fontSize: "0.55em",
          lineHeight: 1.05,
          marginRight: "0.12em",
          color: numberColor,
        }}
      >
        <span>{a}</span>
        <span>{z}</span>
      </span>
      <span>{children}</span>
    </span>
  );
}
