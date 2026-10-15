import type { ReactNode } from "react";
import { useVideoConfig } from "remotion";
import { lerp, pop, progress } from "../components/anim";
import { useSceneFrame } from "../components/SceneFrame";
import { Text } from "../components/Text";
import type { OrbitalId } from "../orbitals/wavefunctions";
import { colors, type } from "../theme";
import { Orbital3D } from "../three/Orbital3D";
import { Stage3D } from "../three/Stage3D";

const n = <i>n</i>;
const l = <i>l</i>;

const RULES: { cx: number; start: number; text: ReactNode }[] = [
  { cx: 480, start: 60, text: <>Total = {n}−1</> },
  { cx: 960, start: 150, text: <>Angular = {l}</> },
  {
    cx: 1440,
    start: 240,
    text: (
      <>
        Radial = {n}−{l}−1
      </>
    ),
  },
];

const COLUMNS = [300, 560, 760, 1060, 1360, 1660];
const HEADERS: ReactNode[] = [
  "Orbital",
  n,
  l,
  <>
    Radial = {n}−{l}−1
  </>,
  <>Angular = {l}</>,
  <>Total = {n}−1</>,
];

const ROWS: { thumb: OrbitalId; y: number; start: number; cells: string[] }[] =
  [
    { thumb: "2s", y: 540, start: 400, cells: ["2s", "2", "0", "1", "0", "1"] },
    {
      thumb: "3pz",
      y: 660,
      start: 550,
      cells: ["3p", "3", "1", "1", "1", "2"],
    },
    {
      thumb: "3dxy",
      y: 780,
      start: 700,
      cells: ["3d", "3", "2", "0", "2", "2"],
    },
    {
      thumb: "4fxyz",
      y: 900,
      start: 850,
      cells: ["4f", "4", "3", "0", "3", "3"],
    },
  ];

export function NodesScene() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();
  const headers = progress(frame, 350, 380);

  return (
    <>
      {RULES.map((rule) => {
        const t = pop(frame, fps, rule.start);
        return (
          <Text
            key={rule.cx}
            x={rule.cx}
            y={200}
            size={type.body}
            weight={500}
            opacity={t}
            dy={lerp(20, 0, t)}
          >
            {rule.text}
          </Text>
        );
      })}
      {HEADERS.map((header, i) => (
        <Text
          key={i}
          x={COLUMNS[i] ?? 0}
          y={400}
          size={type.label}
          weight={500}
          color={colors.axis}
          opacity={headers}
        >
          {header}
        </Text>
      ))}
      <div
        style={{
          position: "absolute",
          left: 140,
          top: 450,
          width: 1640,
          height: 2,
          background: colors.grid,
          opacity: headers,
        }}
      />
      <Stage3D>
        {ROWS.map((row) => {
          const t = Math.min(1, pop(frame, fps, row.start));
          return (
            <Orbital3D
              key={row.thumb}
              orbital={row.thumb}
              cx={180}
              cy={row.y}
              size={80 * t}
              rotZ={0.3 * Math.max(0, frame)}
              opacity={t}
            />
          );
        })}
      </Stage3D>
      {ROWS.map((row) => {
        const t = pop(frame, fps, row.start);
        return row.cells.map((cell, i) => (
          <Text
            key={`${row.y}-${i}`}
            x={COLUMNS[i] ?? 0}
            y={row.y}
            size={type.body}
            weight={i === 0 ? 700 : 400}
            opacity={t}
            dy={lerp(20, 0, t)}
          >
            {i === 0 ? (
              <>
                {cell[0]}
                <i>{cell[1]}</i>
              </>
            ) : (
              cell
            )}
          </Text>
        ));
      })}
    </>
  );
}
