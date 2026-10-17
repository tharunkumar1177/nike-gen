import type { ReactNode } from "react";
import { colors } from "../theme";

type Props = {
  cx: number;
  top: number;
  bottom: number;
  width: number;
  /** y of the liquid surface. */
  liquid: number;
  children?: ReactNode;
};

/** Open beaker with a lip; `children` render inside the liquid, behind the glass. */
export function Beaker({ cx, top, bottom, width, liquid, children }: Props) {
  const left = cx - width / 2;
  const right = cx + width / 2;
  return (
    <g>
      <rect
        x={left + 4}
        y={liquid}
        width={width - 8}
        height={bottom - liquid - 4}
        fill={colors.solvent}
        fillOpacity={0.6}
      />
      {children}
      <line
        x1={left + 4}
        x2={right - 4}
        y1={liquid}
        y2={liquid}
        stroke={colors.solventText}
        strokeWidth={3}
      />
      <path
        d={`M${left - 14} ${top} H${left} V${bottom} H${right} V${top} H${right + 14}`}
        fill="none"
        stroke={colors.solventText}
        strokeWidth={5}
        strokeLinejoin="round"
      />
    </g>
  );
}
