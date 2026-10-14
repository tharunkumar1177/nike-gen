import { createContext, useContext, type ReactNode } from "react";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  useCurrentFrame,
} from "remotion";
import { CROSSFADE, VIDEO } from "../theme";

const LeadContext = createContext(0);

/** Frame relative to the scene's nominal start; negative during the incoming crossfade. */
export function useSceneFrame() {
  return useCurrentFrame() - useContext(LeadContext);
}

type Props = {
  name: string;
  from: number;
  to: number;
  children: ReactNode;
};

export function SceneFrame({ name, from, to, children }: Props) {
  const half = CROSSFADE / 2;
  const lead = from === 0 ? 0 : half;
  const tail = to === VIDEO.durationInFrames ? 0 : half;
  const duration = to - from + lead + tail;
  return (
    <Sequence name={name} from={from - lead} durationInFrames={duration}>
      <LeadContext.Provider value={lead}>
        <Fade duration={duration} lead={lead} tail={tail}>
          {children}
        </Fade>
      </LeadContext.Provider>
    </Sequence>
  );
}

function Fade({
  duration,
  lead,
  tail,
  children,
}: {
  duration: number;
  lead: number;
  tail: number;
  children: ReactNode;
}) {
  const frame = useCurrentFrame();
  const fadeIn =
    lead === 0
      ? 1
      : interpolate(frame, [0, lead * 2], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
  const fadeOut =
    tail === 0
      ? 1
      : interpolate(frame, [duration - tail * 2, duration], [1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
  return (
    <AbsoluteFill style={{ opacity: Math.min(fadeIn, fadeOut) }}>
      {children}
    </AbsoluteFill>
  );
}
