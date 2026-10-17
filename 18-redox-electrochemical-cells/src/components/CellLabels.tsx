import type { ReactNode } from "react";
import { CELL } from "./Cell";
import { Arrow, Electron, F, Ion, Text } from "./Text";
import { colors, FONT, type } from "../theme";

/** Species labels in the gaps between each beaker wall and its electrode. */
export function HalfCellLabels({
  left = 1,
  right = 1,
  she = 0,
}: {
  left?: number;
  right?: number;
  /** 0 labels the zinc half-cell, 1 the standard hydrogen electrode. */
  she?: number;
}) {
  const label = { size: type.label, weight: 500, anchor: "middle" } as const;
  return (
    <>
      <Text
        x={CELL.left.label}
        y={CELL.electrodeLabelY}
        {...label}
        opacity={left * (1 - she)}
      >
        Zn(s)
      </Text>
      <Text
        x={CELL.left.label}
        y={CELL.solutionLabelY}
        {...label}
        opacity={left * (1 - she)}
      >
        <Ion f="Zn" c="2+" />
        (aq)
      </Text>
      <Text
        x={CELL.left.label}
        y={CELL.electrodeLabelY}
        {...label}
        opacity={left * she}
      >
        Pt, <F>H2</F>(g)
      </Text>
      <Text
        x={CELL.left.label}
        y={CELL.solutionLabelY}
        {...label}
        opacity={left * she}
      >
        <Ion f="H" c="+" />
        (aq)
      </Text>
      <Text
        x={CELL.right.label}
        y={CELL.electrodeLabelY}
        {...label}
        opacity={right}
      >
        Cu(s)
      </Text>
      <Text
        x={CELL.right.label}
        y={CELL.solutionLabelY}
        {...label}
        opacity={right}
      >
        <Ion f="Cu" c="2+" />
        (aq)
      </Text>
    </>
  );
}

/** Concentration tags under the solution labels. */
export function Concentrations({
  left,
  right,
  opacity,
}: {
  left: ReactNode;
  right: ReactNode;
  opacity: number;
}) {
  const tag = {
    y: CELL.concentrationY,
    size: type.label,
    color: colors.muted,
    anchor: "middle",
    opacity,
  } as const;
  return (
    <>
      <Text x={CELL.left.label} {...tag}>
        {left}
      </Text>
      <Text x={CELL.right.label} {...tag}>
        {right}
      </Text>
    </>
  );
}

/** Anode and cathode titles under the electrodes; `electrolysis` swaps their sides and signs. */
export function ElectrodeTitles({
  anode,
  cathode,
  electrolysis = 0,
}: {
  anode: number;
  cathode: number;
  electrolysis?: number;
}) {
  const title = {
    y: CELL.titleY,
    size: type.body,
    weight: 700,
    anchor: "middle",
  } as const;
  return (
    <>
      <Text
        x={CELL.left.electrode}
        {...title}
        color={colors.oxidationText}
        opacity={anode * (1 - electrolysis)}
      >
        Anode (−)
      </Text>
      <Text
        x={CELL.right.electrode}
        {...title}
        color={colors.reductionText}
        opacity={cathode * (1 - electrolysis)}
      >
        Cathode (+)
      </Text>
      <Text
        x={CELL.left.electrode}
        {...title}
        color={colors.reductionText}
        opacity={cathode * electrolysis}
      >
        Cathode (−)
      </Text>
      <Text
        x={CELL.right.electrode}
        {...title}
        color={colors.oxidationText}
        opacity={anode * electrolysis}
      >
        Anode (+)
      </Text>
    </>
  );
}

function Dot({ color }: { color: string }) {
  return (
    <svg
      width="0.6em"
      height="0.6em"
      viewBox="0 0 12 12"
      style={{ verticalAlign: "middle", marginRight: "0.3em" }}
    >
      <circle cx={6} cy={6} r={6} fill={color} />
    </svg>
  );
}

/** Electron direction above the wire and the ion key between the bridge legs. */
export function FlowLegend({
  electrons,
  ions,
  direction = 1,
}: {
  electrons: number;
  ions: number;
  direction?: 1 | -1;
}) {
  const ionKey = {
    position: "absolute",
    left: CELL.meter.cx,
    transform: "translate(-50%, -50%)",
    fontFamily: FONT,
    fontSize: type.label,
    fontWeight: 500,
    lineHeight: 1.2,
    whiteSpace: "nowrap",
    opacity: ions,
  } as const;
  return (
    <>
      <Text
        x={CELL.meter.cx - CELL.meter.r - 24}
        y={CELL.wireY - 34}
        size={type.label}
        weight={700}
        color={colors.electronText}
        anchor="end"
        opacity={electrons}
      >
        <Electron />
        <Arrow left={direction < 0} />
      </Text>
      <div style={{ ...ionKey, top: 640, color: colors.cationText }}>
        <Dot color={colors.cation} />
        cation
      </div>
      <div style={{ ...ionKey, top: 690, color: colors.anionText }}>
        <Dot color={colors.anion} />
        anion
      </div>
    </>
  );
}
