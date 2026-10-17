import type { ReactNode } from "react";
import { colors, type, VIDEO } from "../theme";
import { Text } from "./Text";

/** Plot area inside the 760×560 chart frame at (1040, 320). */
export const PLOT = {
  left: 1112,
  right: 1780,
  top: 340,
  bottom: 820,
} as const;

const CENTER_X = (PLOT.left + PLOT.right) / 2;
const TICK = 24;

export function categoryX(index: number, count: number) {
  const step = (PLOT.right - PLOT.left) / count;
  return PLOT.left + step * (index + 0.5);
}

export type Scale = { min: number; max: number };

export function valueY(value: number, { min, max }: Scale) {
  const share = (value - min) / (max - min);
  return PLOT.bottom - share * (PLOT.bottom - PLOT.top);
}

type Props = {
  title: ReactNode;
  yLabel: ReactNode;
  scale: Scale;
  ticks: readonly number[];
  categories: readonly string[];
  opacity: number;
};

export function ChartFrame({
  title,
  yLabel,
  scale,
  ticks,
  categories,
  opacity,
}: Props) {
  if (opacity <= 0) return null;
  const zero = valueY(0, scale);
  return (
    <div style={{ position: "absolute", inset: 0, opacity }}>
      <svg
        width={VIDEO.width}
        height={VIDEO.height}
        style={{ position: "absolute", left: 0, top: 0 }}
      >
        {ticks.map((tick) => (
          <line
            key={tick}
            x1={PLOT.left}
            y1={valueY(tick, scale)}
            x2={PLOT.right}
            y2={valueY(tick, scale)}
            stroke={colors.tile}
            strokeWidth={2}
          />
        ))}
        <line
          x1={PLOT.left}
          y1={PLOT.top}
          x2={PLOT.left}
          y2={PLOT.bottom}
          stroke={colors.axis}
          strokeWidth={4}
        />
        <line
          x1={PLOT.left}
          y1={zero}
          x2={PLOT.right}
          y2={zero}
          stroke={colors.axis}
          strokeWidth={4}
        />
      </svg>
      {ticks.map((tick) => (
        <Text
          key={tick}
          x={PLOT.left - 14}
          y={valueY(tick, scale)}
          size={TICK}
          color={colors.axis}
          anchor="end"
        >
          {tick}
        </Text>
      ))}
      {categories.map((category, index) => (
        <Text
          key={category}
          x={categoryX(index, categories.length)}
          y={PLOT.bottom + 30}
          size={TICK}
          weight={500}
        >
          {category}
        </Text>
      ))}
      <Text x={CENTER_X} y={PLOT.bottom + 85} size={type.label} weight={500}>
        Element
      </Text>
      <Text
        x={996}
        y={(PLOT.top + PLOT.bottom) / 2}
        size={type.label}
        weight={500}
        rotate={-90}
      >
        {yLabel}
      </Text>
      <Text x={CENTER_X} y={250} size={type.label} weight={500}>
        {title}
      </Text>
    </div>
  );
}
