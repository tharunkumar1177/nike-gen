import { AbsoluteFill } from "remotion";
import { progress } from "../components/anim";
import type { StateKind } from "../components/particles";
import { useSceneFrame } from "../components/SceneFrame";
import { Text } from "../components/Text";
import { Viewport } from "../components/Viewport";
import { type } from "../theme";

type Column = {
  kind: StateKind;
  label: string;
  x: number;
  labelIn: [number, number];
  particles: [number, number];
};

const COLUMNS: Column[] = [
  {
    kind: "solid",
    label: "Solid",
    x: 400,
    labelIn: [90, 120],
    particles: [140, 190],
  },
  {
    kind: "liquid",
    label: "Liquid",
    x: 960,
    labelIn: [280, 310],
    particles: [330, 380],
  },
  {
    kind: "gas",
    label: "Gas",
    x: 1520,
    labelIn: [430, 460],
    particles: [480, 520],
  },
];

export function StatesScene() {
  const frame = useSceneFrame();
  return (
    <AbsoluteFill>
      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        {COLUMNS.map((column) => (
          <Viewport
            key={column.kind}
            kind={column.kind}
            cx={column.x}
            cy={460}
            frame={frame}
            enter={30}
            particles={column.particles}
          />
        ))}
      </svg>
      {COLUMNS.map((column) => (
        <Text
          key={column.kind}
          x={column.x}
          y={720}
          size={type.subtitle}
          weight={500}
          opacity={progress(frame, column.labelIn[0], column.labelIn[1])}
        >
          {column.label}
        </Text>
      ))}
    </AbsoluteFill>
  );
}
