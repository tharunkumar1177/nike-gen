import { useId } from "react";
import { useVideoConfig } from "remotion";
import { pop } from "./anim";
import {
  PARTICLE_RADIUS,
  particlesAt,
  VIEWPORT_RADIUS,
  type StateKind,
} from "./particles";
import { colors } from "../theme";

const FILL: Record<StateKind, string> = {
  solid: colors.solid,
  liquid: colors.liquid,
  gas: colors.gas,
};

type Props = {
  kind: StateKind;
  cx: number;
  cy: number;
  /** Scene frame, used for both motion and entrance timing. */
  frame: number;
  /** Scene frame at which the circle springs in. */
  enter: number;
  /** Scene frames over which particles pop in, staggered by index. */
  particles: [number, number];
  scale?: number;
};

export function Viewport({
  kind,
  cx,
  cy,
  frame,
  enter,
  particles,
  scale = 1,
}: Props) {
  const { fps } = useVideoConfig();
  const clipId = useId();
  const shell = pop(frame, fps, enter);
  const points = particlesAt(kind, Math.max(0, frame));
  const [start, end] = particles;
  const stagger = Math.max(0, end - start - 15);

  return (
    <g
      transform={`translate(${cx} ${cy}) scale(${scale * (0.8 + 0.2 * shell)})`}
      opacity={Math.min(1, shell)}
    >
      <clipPath id={clipId}>
        <circle r={VIEWPORT_RADIUS - 2} />
      </clipPath>
      <circle
        r={VIEWPORT_RADIUS - 2}
        fill={colors.grid}
        stroke={colors.axis}
        strokeWidth={4}
      />
      <g clipPath={`url(#${clipId})`}>
        {points.map((p, i) => {
          const appear = pop(
            frame,
            fps,
            start + (stagger * i) / Math.max(1, points.length - 1),
          );
          return (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={PARTICLE_RADIUS * Math.max(0, appear)}
              fill={FILL[kind]}
            />
          );
        })}
      </g>
    </g>
  );
}
