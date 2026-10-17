import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { easeOut, fadeIn, lerp, pop, progress } from "../components/anim";
import {
  EnergyAxis,
  OrbitalBox,
  SpinArrow,
  SvgLabel,
} from "../components/Boxes";
import { AngleArc, Atom, Bond, Dash, Wedge } from "../components/Molecule";
import { Stage, Subtitle, Title } from "../components/Panels";
import { Sub } from "../components/Script";
import { Text } from "../components/Text";
import { cue } from "../cues";
import { colors, type } from "../theme";

const SCENE = "problem-methane";

const BEATS = {
  boxes: cue(SCENE, "carbon's ground state"),
  sElectrons: cue(SCENE, "two electrons in two s"),
  pElectrons: cue(SCENE, "and two in two p"),
  methane: cue(SCENE, "Yet in methane"),
  bonds: cue(SCENE, "four identical single bonds"),
  angle: cue(SCENE, "exactly one hundred nine point five degrees"),
  concept: cue(SCENE, "mathematical bookkeeping model"),
};

const C = { x: 1300, y: 600 };
const H = {
  up: { x: 1300, y: 400 },
  right: { x: 1480, y: 700 },
  wedge: { x: 1120, y: 700 },
  dash: { x: 1150, y: 450 },
};
const UP_ANGLE = -90;
const RIGHT_ANGLE =
  (Math.atan2(H.right.y - C.y, H.right.x - C.x) * 180) / Math.PI;

export const S_BOX = { x: 300, y: 700 };
export const P_BOXES = [390, 480, 570].map((x) => ({ x, y: 500 }));

/** Carbon 2s/2p boxes shared with the next scene. */
export function GroundState({
  boxes,
  sElectrons,
  pElectrons,
}: {
  boxes: number;
  sElectrons: number;
  pElectrons: number;
}) {
  const drop = (shown: number) => lerp(20, 0, shown);
  return (
    <g>
      <EnergyAxis x={200} top={420} bottom={800} opacity={boxes} />
      <OrbitalBox {...S_BOX} stroke={colors.sText} opacity={boxes} />
      <SvgLabel
        x={S_BOX.x}
        y={S_BOX.y + 70}
        color={colors.sText}
        opacity={boxes}
      >
        2s
      </SvgLabel>
      {P_BOXES.map((box, i) => (
        <OrbitalBox key={i} {...box} stroke={colors.pText} opacity={boxes} />
      ))}
      <SvgLabel
        x={P_BOXES[1]!.x}
        y={P_BOXES[1]!.y + 70}
        color={colors.pText}
        opacity={boxes}
      >
        2p
      </SvgLabel>
      <SpinArrow
        x={S_BOX.x - 14}
        y={S_BOX.y + drop(sElectrons)}
        up
        opacity={sElectrons}
      />
      <SpinArrow
        x={S_BOX.x + 14}
        y={S_BOX.y + drop(sElectrons)}
        up={false}
        opacity={sElectrons}
      />
      {P_BOXES.slice(0, 2).map((box, i) => (
        <SpinArrow
          key={i}
          x={box.x}
          y={box.y + drop(pElectrons)}
          up
          opacity={pElectrons}
        />
      ))}
    </g>
  );
}

export function ProblemScene() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const intro = progress(frame, 0, 30);
  const boxes = progress(frame, BEATS.boxes, BEATS.boxes + 15);
  const sElectrons = progress(frame, BEATS.sElectrons, BEATS.sElectrons + 15);
  const pElectrons = progress(frame, BEATS.pElectrons, BEATS.pElectrons + 15);
  const grow = pop(frame, fps, BEATS.methane);
  const pulse = interpolate(
    frame,
    [BEATS.bonds, BEATS.bonds + 10, BEATS.bonds + 20],
    [6, 10, 6],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const arc = progress(frame, BEATS.angle, BEATS.angle + 20, easeOut);
  const concept = fadeIn(frame, BEATS.concept);

  return (
    <AbsoluteFill>
      <Title opacity={intro}>Methane: The Problem</Title>
      <Subtitle opacity={intro}>C: 2s² 2p² vs four identical bonds</Subtitle>
      <Stage>
        <GroundState
          boxes={boxes}
          sElectrons={sElectrons}
          pElectrons={pElectrons}
        />
        <SvgLabel x={390} y={850} opacity={pElectrons}>
          C: 2s² 2p²
        </SvgLabel>
        <g
          opacity={Math.min(1, grow)}
          transform={`translate(${C.x} ${C.y}) scale(${grow}) translate(${-C.x} ${-C.y})`}
        >
          <Bond a={C} b={H.up} width={pulse} />
          <Bond a={C} b={H.right} width={pulse} />
          <Wedge a={C} b={H.wedge} />
          <Dash a={C} b={H.dash} />
          <AngleArc
            at={C}
            from={UP_ANGLE}
            to={RIGHT_ANGLE}
            radius={100}
            label="109.5°"
            labelRadius={150}
            progress={arc}
          />
          <Atom {...C}>C</Atom>
          {Object.values(H).map((h, i) => (
            <Atom key={i} {...h}>
              H
            </Atom>
          ))}
        </g>
      </Stage>
      <Text
        x={C.x}
        y={830}
        size={type.label}
        weight={500}
        opacity={Math.min(1, grow)}
      >
        CH<Sub>4</Sub>
      </Text>
      <Text
        x={960}
        y={940}
        size={40}
        opacity={concept}
        color={colors.hybridText}
        weight={500}
      >
        Hybridisation mathematically combines atomic orbitals to match observed
        geometry.
      </Text>
    </AbsoluteFill>
  );
}
