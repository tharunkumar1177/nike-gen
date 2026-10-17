import type { ReactNode } from "react";
import { AbsoluteFill } from "remotion";
import { ELEMENTS, type Element } from "../elements";
import { blockColors, colors, FONT, type } from "../theme";
import { lerp } from "./anim";
import { Text } from "./Text";

export const CELL = 56;
export const PITCH = 60;
export const ORIGIN = { x: 422, y: 380 } as const;
export const F_ORIGIN = { x: 602, y: 820 } as const;
const MARKER = { x: 540, top: 680, bottom: 796 } as const;
const F_ROW_WIDTH = 13 * PITCH + CELL;

/** Scenes 5–6: scale about the H cell, then shift left to free x 1200–1800. */
export const SHIFT = { scale: 0.85, dx: -200 } as const;

/** Converts a text baseline to the centre y that `Text` expects. */
export const baseline = (y: number, size: number) => y - size * 0.35;

export type CellLook = {
  /** Empty outline visibility, 0–1. */
  show?: number;
  /** Progress from empty outline to block colour, 0–1. */
  color?: number;
  /** 1 dims the cell to 30% opacity. */
  dim?: number;
  /** 4 px stroke in the block text colour, 0–1. */
  highlight?: number;
  scale?: number;
  /** Superscript electron count in the cell's top-right corner. */
  badge?: { text: string; color: string; opacity: number };
};

export type Rect = { x: number; y: number };

/** Top-left of a cell in unshifted table coordinates (f rows at rest). */
export function cellAt(el: Element): Rect {
  if (el.group !== null) {
    return {
      x: ORIGIN.x + (el.group - 1) * PITCH,
      y: ORIGIN.y + (el.period - 1) * PITCH,
    };
  }
  return {
    x: F_ORIGIN.x + (el.fColumn ?? 0) * PITCH,
    y: F_ORIGIN.y + (el.period - 6) * PITCH,
  };
}

type Props = {
  look: (el: Element) => CellLook;
  periodLabels?: number;
  groupLabels?: number;
  /** "Period (n)" and "Group" beside the labels; they sit off-screen once shifted. */
  axisTitles?: number;
  /** 0: f rows collapsed at the group 3 marker; 1: at rest below the table. */
  fSlide?: number;
  /** Marker and dotted guides. */
  guides?: number;
  /** Scenes 5–6 transform progress. */
  shift?: number;
  /** Overlays drawn in table coordinates, moved with the table. */
  children?: ReactNode;
};

export function PeriodicTable({
  look,
  periodLabels = 0,
  groupLabels = 0,
  axisTitles = 0,
  fSlide = 1,
  guides = 0,
  shift = 0,
  children,
}: Props) {
  const scale = lerp(1, SHIFT.scale, shift);
  const fLeft = lerp(MARKER.x, F_ORIGIN.x, fSlide);
  const fTop = lerp(MARKER.top, F_ORIGIN.y, fSlide);
  const main = ELEMENTS.filter((el) => el.group !== null);
  const fRows = ELEMENTS.filter((el) => el.group === null);
  return (
    <AbsoluteFill
      style={{
        transformOrigin: `${ORIGIN.x}px ${ORIGIN.y}px`,
        transform: `translateX(${SHIFT.dx * shift}px) scale(${scale})`,
      }}
    >
      {Array.from({ length: 7 }, (_, i) => (
        <Text
          key={`period-${i}`}
          x={380}
          y={ORIGIN.y + i * PITCH + CELL / 2}
          size={type.label}
          weight={500}
          color={colors.axis}
          anchor="end"
          opacity={periodLabels}
        >
          {i + 1}
        </Text>
      ))}
      {Array.from({ length: 18 }, (_, i) => (
        <Text
          key={`group-${i}`}
          x={ORIGIN.x + i * PITCH + CELL / 2}
          y={baseline(350, type.label)}
          size={type.label}
          weight={500}
          color={colors.axis}
          opacity={groupLabels}
        >
          {i + 1}
        </Text>
      ))}
      {axisTitles > 0 ? (
        <>
          <Text
            x={340}
            y={ORIGIN.y + 3 * PITCH + CELL / 2}
            size={type.label}
            weight={500}
            color={colors.axis}
            anchor="end"
            opacity={periodLabels * axisTitles}
          >
            Period (n)
          </Text>
          <Text
            x={410}
            y={baseline(350, type.label)}
            size={type.label}
            weight={500}
            color={colors.axis}
            anchor="end"
            opacity={groupLabels * axisTitles}
          >
            Group
          </Text>
        </>
      ) : null}
      {guides > 0 ? (
        <svg
          width={1920}
          height={1080}
          style={{ position: "absolute", left: 0, top: 0, opacity: guides }}
        >
          <line
            x1={MARKER.x}
            y1={MARKER.top}
            x2={MARKER.x}
            y2={MARKER.bottom}
            stroke={colors.axis}
            strokeWidth={4}
          />
          <path
            d={`M${MARKER.x} ${MARKER.bottom} V${F_ORIGIN.y + PITCH + CELL / 2} M${MARKER.x} ${F_ORIGIN.y + CELL / 2} H${F_ORIGIN.x - 6} M${MARKER.x} ${F_ORIGIN.y + PITCH + CELL / 2} H${F_ORIGIN.x - 6}`}
            stroke={colors.axis}
            strokeWidth={2}
            strokeDasharray="6 6"
            fill="none"
          />
        </svg>
      ) : null}
      {main.map((el) => {
        const { x, y } = cellAt(el);
        return <Cell key={el.symbol} el={el} x={x} y={y} look={look(el)} />;
      })}
      <div
        style={{
          position: "absolute",
          left: fLeft,
          top: fTop,
          width: F_ROW_WIDTH,
          height: PITCH + CELL,
          transformOrigin: "left center",
          transform: `scaleX(${fSlide})`,
        }}
      >
        {fRows.map((el) => (
          <Cell
            key={el.symbol}
            el={el}
            x={(el.fColumn ?? 0) * PITCH}
            y={(el.period - 6) * PITCH}
            look={look(el)}
          />
        ))}
      </div>
      {children}
    </AbsoluteFill>
  );
}

function Cell({
  el,
  x,
  y,
  look,
}: {
  el: Element;
  x: number;
  y: number;
  look: CellLook;
}) {
  const {
    show = 0,
    color = 0,
    dim = 0,
    highlight = 0,
    scale = 1,
    badge,
  } = look;
  const visible = Math.max(show, color);
  if (visible <= 0) return null;
  const palette = blockColors[el.block];
  const layer = {
    position: "absolute",
    inset: 0,
    borderRadius: 4,
    boxSizing: "border-box",
  } as const;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: CELL,
        height: CELL,
        opacity: visible * (1 - 0.7 * dim),
        transform: scale === 1 ? undefined : `scale(${scale})`,
      }}
    >
      <div
        style={{
          ...layer,
          background: colors.background,
          border: `3px solid ${colors.axis}`,
          opacity: 1 - color,
        }}
      />
      <div style={{ ...layer, background: palette.fill, opacity: color }} />
      {highlight > 0 ? (
        <div
          style={{
            ...layer,
            border: `4px solid ${palette.text}`,
            opacity: highlight,
          }}
        />
      ) : null}
      {color > 0 ? (
        <div
          style={{
            ...layer,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: FONT,
            fontSize: 24,
            fontWeight: 500,
            color: palette.text,
            opacity: color,
          }}
        >
          {el.symbol}
        </div>
      ) : null}
      {badge && badge.opacity > 0 ? (
        <div
          style={{
            position: "absolute",
            top: 5,
            right: 7,
            fontFamily: FONT,
            fontSize: 18,
            fontWeight: 700,
            lineHeight: 1,
            color: badge.color,
            opacity: badge.opacity,
          }}
        >
          {badge.text}
        </div>
      ) : null}
    </div>
  );
}
