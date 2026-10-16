import type { ReactNode } from "react";
import { lerp, progress } from "../components/anim";
import { useSceneFrame } from "../components/SceneFrame";
import { Text } from "../components/Text";
import { colors, type } from "../theme";

const LINES: ReactNode[] = [
  "Orbitals are probability density standing waves, not paths.",
  <>
    <i>n</i>, <i>l</i>, <i>m</i>
    <sub>
      <i>l</i>
    </sub>{" "}
    determine size, shape, and orientation.
  </>,
  "Phase signs matter for overlap, not charge.",
  "Nodes are surfaces of zero probability, not barriers.",
];

export function ClosingCard() {
  const frame = useSceneFrame();
  const title = progress(frame, 0, 30);
  return (
    <>
      <div
        style={{
          position: "absolute",
          left: 200,
          top: 150,
          width: 1520,
          height: 760,
          borderRadius: 32,
          border: `3px solid ${colors.grid}`,
          opacity: title,
        }}
      />
      <Text x={960} y={240} size={type.title} weight={700} opacity={title}>
        Key Takeaways
      </Text>
      {LINES.map((line, i) => {
        const t = progress(frame, 60 + 30 * i, 90 + 30 * i);
        return (
          <Text
            key={i}
            x={960}
            y={420 + 120 * i}
            size={type.body}
            opacity={t}
            dy={lerp(20, 0, t)}
          >
            {line}
          </Text>
        );
      })}
    </>
  );
}
