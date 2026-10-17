import type { ReactNode } from "react";
import { colors, FONT, VIDEO } from "../theme";
import { Arrow, F } from "./Text";

type Props = {
  /** Centre y in px; the equation is centred horizontally. */
  y: number;
  size: number;
  /** Opacity of the usually implied "1" before O₂; omitted when not shown. */
  one?: number;
  /** Scale applied to each coefficient, for pulses. */
  pulses?: { h2?: number; o2?: number; h2o?: number };
  opacity?: number;
};

function Coefficient({
  scale = 1,
  opacity = 1,
  children,
}: {
  scale?: number;
  opacity?: number;
  children: ReactNode;
}) {
  return (
    <span
      style={{
        display: "inline-block",
        marginRight: "0.25em",
        transform: `scale(${scale})`,
        opacity,
      }}
    >
      {children}
    </span>
  );
}

/** 2 H₂ + O₂ → 2 H₂O, coloured by species. */
export function Equation({ y, size, one, pulses = {}, opacity = 1 }: Props) {
  if (opacity <= 0) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: y,
        width: VIDEO.width,
        transform: "translateY(-50%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: FONT,
        fontSize: size,
        fontWeight: 700,
        lineHeight: 1.2,
        color: colors.text,
        opacity,
        whiteSpace: "nowrap",
      }}
    >
      <span style={{ color: colors.h2Text }}>
        <Coefficient scale={pulses.h2}>2</Coefficient>
        <F>H2</F>
      </span>
      <span style={{ margin: "0 0.4em" }}>+</span>
      <span style={{ color: colors.o2Text }}>
        {one === undefined ? null : (
          <Coefficient scale={pulses.o2} opacity={one}>
            1
          </Coefficient>
        )}
        <F>O2</F>
      </span>
      <Arrow />
      <span style={{ color: colors.h2oText }}>
        <Coefficient scale={pulses.h2o}>2</Coefficient>
        <F>H2O</F>
      </span>
    </div>
  );
}
