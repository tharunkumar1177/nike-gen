import { colors, FONT } from "../theme";
import { lerp } from "./anim";

type ArrowProps = {
  from: [number, number];
  to: [number, number];
  color: string;
  /** 0–1 share of the shaft drawn. */
  progress: number;
  width?: number;
};

/** Straight SVG arrow that draws from `from` toward `to`. */
export function Arrow({ from, to, color, progress, width = 5 }: ArrowProps) {
  if (progress <= 0) {
    return null;
  }
  const tipX = lerp(from[0], to[0], progress);
  const tipY = lerp(from[1], to[1], progress);
  const angle = Math.atan2(to[1] - from[1], to[0] - from[0]);
  const head = 18;
  const left = angle + Math.PI - 0.45;
  const right = angle + Math.PI + 0.45;
  return (
    <svg
      width={1920}
      height={1080}
      style={{ position: "absolute", left: 0, top: 0 }}
    >
      <line
        x1={from[0]}
        y1={from[1]}
        x2={tipX}
        y2={tipY}
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
      />
      <polygon
        points={`${tipX},${tipY} ${tipX + head * Math.cos(left)},${tipY + head * Math.sin(left)} ${tipX + head * Math.cos(right)},${tipY + head * Math.sin(right)}`}
        fill={color}
      />
    </svg>
  );
}

/** Top-left key for the two phase colours. */
export function PhaseLegend({
  opacity,
  emphasis = 1,
}: {
  opacity: number;
  emphasis?: number;
}) {
  if (opacity <= 0) {
    return null;
  }
  const swatch = (color: string) => (
    <span
      style={{
        display: "inline-block",
        width: 28,
        height: 28,
        borderRadius: 14,
        background: color,
        marginRight: 10,
        verticalAlign: "-4px",
      }}
    />
  );
  return (
    <div
      style={{
        position: "absolute",
        left: 140,
        top: 132,
        fontFamily: FONT,
        color: colors.text,
        opacity,
      }}
    >
      <div style={{ fontSize: 32, fontWeight: 500 }}>
        {swatch(colors.positive)}+ phase
        <span style={{ display: "inline-block", width: 36 }} />
        {swatch(colors.negative)}− phase
      </div>
      <div
        style={{
          marginTop: 10,
          fontSize: 28,
          fontWeight: 400,
          color: colors.axis,
          transform: `scale(${emphasis})`,
          transformOrigin: "left center",
        }}
      >
        Sign = wave amplitude (not charge)
      </div>
    </div>
  );
}
