import { AbsoluteFill, useVideoConfig } from "remotion";
import { lerp, pop, progress } from "../components/anim";
import { useSceneFrame } from "../components/SceneFrame";
import { Text } from "../components/Text";
import { colors, type } from "../theme";

type Branch = {
  name: string;
  detail: string;
  x: number;
  line: [number, number];
  node: number;
  sub: [number, number];
};

const BRANCHES: Branch[] = [
  {
    name: "Pure Substances",
    detail: "Constant composition",
    x: 500,
    line: [150, 180],
    node: 180,
    sub: [230, 260],
  },
  {
    name: "Mixtures",
    detail: "Physical combinations",
    x: 1420,
    line: [280, 310],
    node: 310,
    sub: [380, 410],
  },
];

export function IntroScene() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();
  const title = progress(frame, 0, 30);
  const matter = pop(frame, fps, 40);

  return (
    <AbsoluteFill>
      <Text
        x={960}
        y={lerp(220, 180, title)}
        size={type.title}
        weight={700}
        opacity={title}
      >
        Matter, States &amp; Phase Diagrams
      </Text>
      <Text
        x={960}
        y={360}
        size={type.subtitle}
        weight={500}
        opacity={Math.min(1, matter)}
        scale={lerp(0.8, 1, matter)}
      >
        Matter
      </Text>
      <Text
        x={960}
        y={440}
        size={type.body}
        opacity={progress(frame, 90, 120)}
      >
        Anything with mass that occupies space.
      </Text>
      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        {BRANCHES.map((branch) => {
          const drawn = progress(frame, branch.line[0], branch.line[1]);
          const length = Math.hypot(branch.x - 960, 100);
          return (
            <line
              key={branch.name}
              x1={960}
              y1={480}
              x2={branch.x}
              y2={580}
              stroke={colors.axis}
              strokeWidth={4}
              strokeLinecap="round"
              strokeDasharray={length}
              strokeDashoffset={length * (1 - drawn)}
              opacity={drawn > 0 ? 1 : 0}
            />
          );
        })}
      </svg>
      {BRANCHES.map((branch) => {
        const node = pop(frame, fps, branch.node);
        return (
          <AbsoluteFill key={branch.name}>
            <Text
              x={branch.x}
              y={640}
              size={type.subtitle}
              weight={500}
              opacity={Math.min(1, node)}
              scale={lerp(0.8, 1, node)}
            >
              {branch.name}
            </Text>
            <Text
              x={branch.x}
              y={720}
              size={type.body}
              opacity={progress(frame, branch.sub[0], branch.sub[1])}
            >
              {branch.detail}
            </Text>
          </AbsoluteFill>
        );
      })}
    </AbsoluteFill>
  );
}
