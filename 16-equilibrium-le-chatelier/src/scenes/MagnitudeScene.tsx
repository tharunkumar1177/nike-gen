import { AbsoluteFill, useVideoConfig } from "remotion";
import { easeInOut, fadeIn, lerp, popped, progress } from "../components/anim";
import { useSceneFrame } from "../components/SceneFrame";
import { Much, Text } from "../components/Text";
import { cue } from "../cues";
import { colors, FONT, HEADING_Y, SAFE, type } from "../theme";

const BALANCE_AT = cue("magnitude-of-k", "magnitude of K");
const GREATER_AT = cue("magnitude-of-k", "much greater than one");
const LESS_AT = cue("magnitude-of-k", "much less than one");

const PIVOT = { x: 960, y: 500 } as const;
const ARM = 480;
const STRING = 150;
const PAN = 280;
const BLOCK = 56;
const TILT = 14;
const STACK = 4;

type PanProps = {
  side: -1 | 1;
  angle: number;
  /** Opacity of the blocks above the first. */
  extra: number;
  fill: string;
  stroke: string;
  label: string;
};

function Pan({ side, angle, extra, fill, stroke, label }: PanProps) {
  const radians = (angle * Math.PI) / 180;
  const hookX = PIVOT.x + side * ARM * Math.cos(radians);
  const hookY = PIVOT.y + side * ARM * Math.sin(radians);
  const panY = hookY + STRING;
  const left = hookX - PAN / 2;
  const right = hookX + PAN / 2;
  return (
    <g>
      <g stroke={colors.muted} strokeWidth={3}>
        <line x1={hookX} y1={hookY} x2={left} y2={panY} />
        <line x1={hookX} y1={hookY} x2={right} y2={panY} />
      </g>
      <path
        d={`M${left} ${panY} Q${hookX} ${panY + 60} ${right} ${panY}`}
        fill={colors.box}
        stroke={colors.muted}
        strokeWidth={4}
      />
      {Array.from({ length: STACK }, (_, i) => (
        <rect
          key={i}
          x={hookX - BLOCK / 2}
          y={panY - (i + 1) * (BLOCK + 6)}
          width={BLOCK}
          height={BLOCK}
          rx={8}
          fill={fill}
          stroke={stroke}
          strokeWidth={4}
          opacity={i === 0 ? 1 : extra}
        />
      ))}
      <text
        x={hookX}
        y={panY + 80}
        textAnchor="middle"
        fontFamily={FONT}
        fontSize={type.label}
        fontWeight={700}
        fill={stroke}
      >
        {label}
      </text>
    </g>
  );
}

export function MagnitudeScene() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();
  const toProducts = progress(frame, GREATER_AT, GREATER_AT + 40, easeInOut);
  const toReactants = progress(frame, LESS_AT, LESS_AT + 40, easeInOut);
  const angle = TILT * toProducts - 2 * TILT * toReactants;
  const greater = popped(frame, fps, GREATER_AT);
  const less = popped(frame, fps, LESS_AT);
  return (
    <AbsoluteFill>
      <Text
        x={SAFE}
        y={HEADING_Y}
        size={type.subtitle}
        weight={700}
        {...popped(frame, fps, 0)}
      >
        Magnitude of K
      </Text>
      <svg
        width="100%"
        height="100%"
        style={{ position: "absolute", opacity: fadeIn(frame, BALANCE_AT) }}
      >
        <path
          d={`M${PIVOT.x} ${PIVOT.y} L${PIVOT.x - 70} 900 H${PIVOT.x + 70} Z`}
          fill={colors.box}
          stroke={colors.muted}
          strokeWidth={4}
          strokeLinejoin="round"
        />
        <g transform={`rotate(${angle} ${PIVOT.x} ${PIVOT.y})`}>
          <line
            x1={PIVOT.x - ARM}
            y1={PIVOT.y}
            x2={PIVOT.x + ARM}
            y2={PIVOT.y}
            stroke={colors.text}
            strokeWidth={10}
            strokeLinecap="round"
          />
        </g>
        <circle cx={PIVOT.x} cy={PIVOT.y} r={14} fill={colors.text} />
        <Pan
          side={-1}
          angle={angle}
          extra={toReactants}
          fill={colors.n2o4}
          stroke={colors.n2o4Text}
          label="Reactants"
        />
        <Pan
          side={1}
          angle={angle}
          extra={toProducts * (1 - toReactants)}
          fill={colors.no2}
          stroke={colors.no2Text}
          label="Products"
        />
      </svg>
      <Text
        x={1460}
        y={290}
        size={type.body}
        weight={700}
        color={colors.kqText}
        anchor="middle"
        opacity={greater.opacity * lerp(1, 0.35, toReactants)}
        scale={greater.scale}
      >
        K<Much />1: products favoured
      </Text>
      <Text
        x={460}
        y={290}
        size={type.body}
        weight={700}
        color={colors.kqText}
        anchor="middle"
        opacity={less.opacity}
        scale={less.scale}
      >
        K<Much less />1: reactants favoured
      </Text>
    </AbsoluteFill>
  );
}
