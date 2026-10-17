import type { ReactNode } from "react";
import { AbsoluteFill, interpolate, Sequence, useCurrentFrame } from "remotion";
import { CROSSFADE, timing, VIDEO, type SceneId } from "../theme";

const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

type Props = {
  id: SceneId;
  name: string;
  children: ReactNode;
};

/** Scene sequence; children read scene-relative frames via `useCurrentFrame`. */
export function SceneFrame({ id, name, children }: Props) {
  const { from, to } = timing(id);
  const duration = to - from;
  return (
    <Sequence name={name} from={from} durationInFrames={duration}>
      <Fade
        duration={duration}
        fadeIn={from > 0}
        fadeOut={to < VIDEO.durationInFrames}
      >
        {children}
      </Fade>
    </Sequence>
  );
}

function Fade({
  duration,
  fadeIn,
  fadeOut,
  children,
}: {
  duration: number;
  fadeIn: boolean;
  fadeOut: boolean;
  children: ReactNode;
}) {
  const frame = useCurrentFrame();
  const opacityIn = fadeIn
    ? interpolate(frame, [0, CROSSFADE], [0, 1], clamp)
    : 1;
  const opacityOut = fadeOut
    ? interpolate(frame, [duration - CROSSFADE, duration], [1, 0], clamp)
    : 1;
  return (
    <AbsoluteFill style={{ opacity: Math.min(opacityIn, opacityOut) }}>
      {children}
    </AbsoluteFill>
  );
}
