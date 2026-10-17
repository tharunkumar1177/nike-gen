import type { ReactNode } from "react";
import { AbsoluteFill } from "remotion";
import { fadeIn, lerp } from "../components/anim";
import { useSceneFrame } from "../components/SceneFrame";
import { Ea } from "../components/Text";
import { BAND, colors, FONT } from "../theme";

const TAKEAWAYS: { text: ReactNode; at: number }[] = [
  {
    text: "Orders are found by experiment, not read from coefficients.",
    at: 20,
  },
  {
    text: "An intermediate is made then consumed; a catalyst is put in first and given back last.",
    at: 45,
  },
  {
    text: (
      <>
        Hotter means a larger fraction of collisions have at least <Ea />, not
        just more collisions.
      </>
    ),
    at: 70,
  },
  {
    text: (
      <>
        Catalysts offer a lower-
        <Ea /> path; they do not change ΔH or the equilibrium position.
      </>
    ),
    at: 95,
  },
];

export function ClosingCard() {
  const frame = useSceneFrame();
  return (
    <AbsoluteFill>
      <ul
        style={{
          position: "absolute",
          left: BAND.left + BAND.inset,
          top: BAND.content + 40,
          width: BAND.right - BAND.left - BAND.inset,
          margin: 0,
          paddingLeft: 48,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          gap: 40,
          fontFamily: FONT,
          color: colors.text,
        }}
      >
        {TAKEAWAYS.map(({ text, at }) => {
          const shown = fadeIn(frame, at);
          return (
            <li
              key={at}
              style={{
                fontSize: 44,
                lineHeight: 1.3,
                opacity: shown,
                transform: `translateY(${lerp(20, 0, shown)}px)`,
              }}
            >
              {text}
            </li>
          );
        })}
      </ul>
    </AbsoluteFill>
  );
}
