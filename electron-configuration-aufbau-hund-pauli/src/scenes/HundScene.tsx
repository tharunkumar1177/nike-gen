import { AbsoluteFill } from "remotion";
import { dropIn, progress } from "../components/anim";
import { BOX, down, OrbitalRow, up, type Spin } from "../components/Orbital";
import { useSceneFrame } from "../components/SceneFrame";
import { Text } from "../components/Text";
import { cue } from "../cues";
import { colors, type } from "../theme";

const SCENE = "hunds-rule";

const CARBON = cue(SCENE, "for carbon");
const PAIRING = cue(SCENE, "before pairing");
const VIOLATION = cue(SCENE, "putting two electrons");
const HIGHER = cue(SCENE, "higher energy");

type Electron = { box: 0 | 1 | 2; dir: "up" | "down"; at: number };

type Row = {
  element: string;
  y: number;
  at: number;
  electrons: Electron[];
  violation?: boolean;
};

const ROWS: Row[] = [
  {
    element: "Carbon",
    y: 300,
    at: CARBON,
    electrons: [
      { box: 0, dir: "up", at: CARBON + 10 },
      { box: 1, dir: "up", at: CARBON + 20 },
    ],
  },
  {
    element: "Carbon",
    y: 460,
    at: VIOLATION,
    violation: true,
    electrons: [
      { box: 0, dir: "up", at: VIOLATION + 8 },
      { box: 0, dir: "down", at: VIOLATION + 20 },
    ],
  },
  {
    element: "Nitrogen",
    y: 620,
    at: CARBON + 30,
    electrons: [
      { box: 0, dir: "up", at: CARBON + 40 },
      { box: 1, dir: "up", at: CARBON + 50 },
      { box: 2, dir: "up", at: CARBON + 60 },
    ],
  },
  {
    element: "Oxygen",
    y: 780,
    at: CARBON + 62,
    electrons: [
      { box: 0, dir: "up", at: CARBON + 70 },
      { box: 1, dir: "up", at: CARBON + 80 },
      { box: 2, dir: "up", at: CARBON + 90 },
      { box: 0, dir: "down", at: PAIRING },
    ],
  },
];

const BOXES_LEFT = 840;

function boxSpins(frame: number, electrons: Electron[]) {
  const boxes: Spin[][] = [[], [], []];
  for (const { box, dir, at } of electrons) {
    const shown = dropIn(frame, at);
    boxes[box]?.push(dir === "up" ? up(shown) : down(shown));
  }
  return boxes;
}

export function HundScene() {
  const frame = useSceneFrame();
  return (
    <AbsoluteFill>
      {ROWS.map(({ element, y, at, electrons, violation }) => {
        const shown = progress(frame, at, at + 15);
        return (
          <div key={y}>
            <Text
              x={740}
              y={y}
              size={type.body}
              color={violation ? colors.higherText : colors.text}
              anchor="end"
              opacity={shown}
            >
              {element}
            </Text>
            <Text
              x={770}
              y={y}
              size={type.label}
              weight={500}
              color={colors.pText}
              anchor="start"
              opacity={shown}
            >
              2p
            </Text>
            <OrbitalRow
              x={BOXES_LEFT}
              y={y - BOX / 2}
              stroke={colors.pText}
              opacity={shown}
              spins={boxSpins(frame, electrons)}
            />
          </div>
        );
      })}
      <Text
        x={BOXES_LEFT + 3 * BOX + 30}
        y={460}
        size={type.label}
        weight={500}
        color={colors.higherText}
        anchor="start"
        opacity={progress(frame, HIGHER, HIGHER + 15)}
      >
        Higher energy
      </Text>
    </AbsoluteFill>
  );
}
