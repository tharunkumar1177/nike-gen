import type { ReactNode } from "react";
import { ELEMENTS, type Affinity } from "../data";
import { colors, type } from "../theme";
import { Arrow } from "./Arrow";
import { Text } from "./Text";

/** Main-group periodic table: groups 1-2 and 13-18, d-block gap unlabeled. */
export const MAP = {
  left: 180,
  top: 320,
  cell: 80,
  gap: 8,
  blockGap: 88,
  columns: 8,
  periods: 7,
} as const;

const PITCH = MAP.cell + MAP.gap;
const BORDER = 2;
const INNER = MAP.cell - 2 * BORDER;

export function columnX(column: number) {
  const skip = column >= 2 ? MAP.blockGap - MAP.gap : 0;
  return MAP.left + column * PITCH + skip;
}

export function periodY(period: number) {
  return MAP.top + (period - 1) * PITCH;
}

export const MAP_RIGHT = columnX(MAP.columns - 1) + MAP.cell;
export const MAP_BOTTOM = periodY(MAP.periods) + MAP.cell;

const ACROSS_Y = MAP.top - 32;
const DOWN_X = MAP.left - 14;
const DOWN_TOP = periodY(2);

/** Period 1 has only groups 1 and 18. */
const CELLS: { period: number; column: number }[] = [];
for (let period = 1; period <= MAP.periods; period += 1) {
  for (let column = 0; column < MAP.columns; column += 1) {
    if (period > 1 || column === 0 || column === MAP.columns - 1) {
      CELLS.push({ period, column });
    }
  }
}

function elementAt(period: number, column: number) {
  return ELEMENTS.find((e) => e.period === period && e.column === column);
}

function isNumber(value: unknown): value is number {
  return typeof value === "number";
}

function cellLabel(
  value: Affinity | undefined,
  format: (value: number) => string,
) {
  if (isNumber(value)) return format(value);
  if (value === "unbound") return "< 0";
  return null;
}

type Lookup<T> = Readonly<Partial<Record<string, T>>>;

type Props = {
  color: string;
  values: Lookup<Affinity>;
  format: (value: number) => string;
  /** 0→1 fill progress per element symbol. */
  reveal: Lookup<number>;
  legend: ReactNode;
  opacity: number;
  /** 0→1 highlight ring per element symbol. */
  emphasis?: Lookup<number>;
};

export function TrendMap({
  color,
  values,
  format,
  reveal,
  legend,
  opacity,
  emphasis = {},
}: Props) {
  if (opacity <= 0) return null;
  const numbers = Object.values(values).filter(isNumber);
  const min = Math.min(...numbers);
  const span = Math.max(...numbers) - min || 1;
  return (
    <div style={{ position: "absolute", inset: 0, opacity }}>
      <Text
        x={(columnX(0) + MAP.cell + columnX(MAP.columns - 1)) / 2}
        y={MAP.top + MAP.cell / 2}
        size={type.label}
        weight={500}
        color={colors.axis}
      >
        {legend}
      </Text>
      {CELLS.map(({ period, column }) => {
        const data = elementAt(period, column);
        const symbol = data?.symbol ?? "";
        const value = values[symbol];
        const shown = reveal[symbol] ?? 0;
        const ring = emphasis[symbol] ?? 0;
        const scale = isNumber(value) ? (value - min) / span : 0;
        const level = isNumber(value) ? 0.2 + 0.8 * scale : 0;
        const label = cellLabel(value, format);
        return (
          <div
            key={`${period}-${column}`}
            style={{
              position: "absolute",
              left: columnX(column),
              top: periodY(period),
              width: MAP.cell,
              height: MAP.cell,
              boxSizing: "border-box",
              border: `${BORDER}px solid ${colors.tile}`,
              borderRadius: 6,
              background: colors.background,
              boxShadow: ring > 0 ? `0 0 0 ${6 * ring}px ${color}` : "none",
              transform: `scale(${1 + 0.08 * ring})`,
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: 4,
                background: color,
                opacity: level * shown,
              }}
            />
            {data ? (
              <Text x={INNER / 2} y={30 - BORDER} size={24} weight={500}>
                {symbol}
              </Text>
            ) : null}
            {label ? (
              <Text x={INNER / 2} y={60 - BORDER} size={16} opacity={shown}>
                {label}
              </Text>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

type ArrowProps = {
  progress: number;
  color: string;
  labelColor: string;
  label: ReactNode;
};

const labelOpacity = (progress: number) => Math.max(0, (progress - 0.6) / 0.4);

/** Left-to-right trend arrow above the map, labelled at its tip. */
export function AcrossArrow({
  progress,
  color,
  labelColor,
  label,
  to = MAP_RIGHT,
}: ArrowProps & { to?: number }) {
  return (
    <>
      <Arrow
        x1={MAP.left}
        y1={ACROSS_Y}
        x2={to}
        y2={ACROSS_Y}
        color={color}
        progress={progress}
      />
      <Text
        x={to + 20}
        y={ACROSS_Y}
        size={type.label}
        weight={500}
        color={labelColor}
        anchor="start"
        opacity={labelOpacity(progress)}
      >
        {label}
      </Text>
    </>
  );
}

/** Top-to-bottom trend arrow beside group 1, from period 2 down. */
export function DownArrow({ progress, color, labelColor, label }: ArrowProps) {
  return (
    <>
      <Arrow
        x1={DOWN_X}
        y1={DOWN_TOP}
        x2={DOWN_X}
        y2={MAP_BOTTOM}
        color={color}
        progress={progress}
      />
      <Text
        x={DOWN_X - 30}
        y={(DOWN_TOP + MAP_BOTTOM) / 2}
        size={type.label}
        weight={500}
        color={labelColor}
        rotate={-90}
        opacity={labelOpacity(progress)}
      >
        {label}
      </Text>
    </>
  );
}
