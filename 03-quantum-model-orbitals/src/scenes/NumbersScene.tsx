import type { ReactNode } from "react";
import { useVideoConfig } from "remotion";
import { lerp, pop } from "../components/anim";
import { useSceneFrame } from "../components/SceneFrame";
import { Text } from "../components/Text";
import { colors, type } from "../theme";

const COLUMNS = [300, 500, 800, 1200];
const HEADERS = ["Symbol", "Name", "Determines", "Values"];

type Row = { y: number; start: number; cells: ReactNode[] };

const ROWS: Row[] = [
  {
    y: 400,
    start: 120,
    cells: [<i key="n">n</i>, "Principal", "Size and energy", "1, 2, 3, …"],
  },
  {
    y: 520,
    start: 225,
    cells: [
      <i key="l">l</i>,
      "Angular",
      "Shape",
      <>
        0 (<i>s</i>), 1 (<i>p</i>), 2 (<i>d</i>), 3 (<i>f</i>)
      </>,
    ],
  },
  {
    y: 640,
    start: 500,
    cells: [
      <span key="ml">
        <i>m</i>
        <sub>
          <i>l</i>
        </sub>
      </span>,
      "Magnetic",
      "Orientation",
      "1, 3, 5, 7 orbitals",
    ],
  },
];

export function NumbersScene() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();
  const title = pop(frame, fps, 30);
  const headers = pop(frame, fps, 120);
  const spin = pop(frame, fps, 720);

  return (
    <>
      <Text
        x={960}
        y={150}
        size={type.title}
        weight={700}
        opacity={title}
        dy={(1 - title) * 30}
      >
        Quantum Numbers
      </Text>
      {HEADERS.map((header, i) => (
        <Text
          key={header}
          x={COLUMNS[i] ?? 0}
          y={300}
          size={type.label}
          weight={500}
          color={colors.axis}
          anchor="start"
          opacity={headers}
        >
          {header}
        </Text>
      ))}
      <div
        style={{
          position: "absolute",
          left: 300,
          top: 334,
          width: 1460,
          height: 2,
          background: colors.grid,
          opacity: headers,
        }}
      />
      {ROWS.map((row) => {
        const t = pop(frame, fps, row.start);
        return row.cells.map((cell, i) => (
          <Text
            key={`${row.y}-${i}`}
            x={COLUMNS[i] ?? 0}
            y={row.y}
            size={type.body}
            weight={i === 0 ? 700 : 400}
            anchor="start"
            opacity={t}
            dy={lerp(24, 0, t)}
          >
            {cell}
          </Text>
        ));
      })}
      <div
        style={{
          position: "absolute",
          left: 360,
          top: 790,
          width: 1200,
          height: 120,
          borderRadius: 20,
          background: colors.grid,
          opacity: spin,
          transform: `scale(${lerp(0.94, 1, spin)})`,
        }}
      />
      <Text x={960} y={850} size={40} opacity={spin}>
        <i>m</i>
        <sub>s</sub> (spin, ±½): a separate property, not part of the orbital
      </Text>
    </>
  );
}
