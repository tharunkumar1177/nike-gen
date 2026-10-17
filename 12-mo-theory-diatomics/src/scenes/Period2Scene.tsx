import { AbsoluteFill, spring, useVideoConfig } from "remotion";
import { fadeIn, lerp, progress } from "../components/anim";
import { Arrow, ScaleAbout, Stage } from "../components/Diagram";
import { useSceneFrame } from "../components/SceneFrame";
import { MoLabel } from "../components/Script";
import { Text } from "../components/Text";
import { cue } from "../cues";
import { colors, SAFE, type } from "../theme";

const SCENE = "period-2-orbitals";

const HEAD_ON = cue(SCENE, "head-on p overlap");
const SIDE = cue(SCENE, "while side-by-side overlap");

/** Frames from a panel's start until its atomic orbitals begin to slide. */
const SLIDE = 40;
/** Frames from a panel's start until the slid orbitals merge. */
const MERGE = 80;

const ATOM_X = [400, 800] as const;
const MO_X = 1400;
const TOP_Y = 400;
const BOTTOM_Y = 800;

function Pz({ cx, cy, flip }: { cx: number; cy: number; flip: boolean }) {
  return (
    <>
      <ellipse
        cx={cx - 60}
        cy={cy}
        rx={60}
        ry={35}
        fill={flip ? colors.bonding : colors.antibonding}
      />
      <ellipse
        cx={cx + 60}
        cy={cy}
        rx={60}
        ry={35}
        fill={flip ? colors.antibonding : colors.bonding}
      />
    </>
  );
}

function Px({ cx, cy }: { cx: number; cy: number }) {
  return (
    <>
      <ellipse cx={cx} cy={cy - 60} rx={35} ry={60} fill={colors.bonding} />
      <ellipse cx={cx} cy={cy + 60} rx={35} ry={60} fill={colors.antibonding} />
    </>
  );
}

function SigmaMo() {
  return (
    <>
      {[-180, 180].map((dx) => (
        <circle
          key={dx}
          cx={MO_X + dx}
          cy={TOP_Y}
          r={30}
          fill={colors.antibonding}
        />
      ))}
      <ellipse cx={MO_X} cy={TOP_Y} rx={140} ry={60} fill={colors.bonding} />
    </>
  );
}

function PiMo() {
  return (
    <>
      <ellipse
        cx={MO_X}
        cy={BOTTOM_Y - 70}
        rx={150}
        ry={45}
        fill={colors.bonding}
      />
      <ellipse
        cx={MO_X}
        cy={BOTTOM_Y + 70}
        rx={150}
        ry={45}
        fill={colors.antibonding}
      />
      <line
        x1={MO_X - 200}
        x2={MO_X + 200}
        y1={BOTTOM_Y}
        y2={BOTTOM_Y}
        stroke={colors.axis}
        strokeWidth={4}
        strokeDasharray="10 8"
      />
    </>
  );
}

function usePanel(frame: number, start: number) {
  const { fps } = useVideoConfig();
  const slide = spring({
    frame: frame - start - SLIDE,
    fps,
    config: { mass: 1, damping: 14, stiffness: 120 },
  });
  const merge = progress(frame, start + MERGE, start + MERGE + 30);
  return { shown: fadeIn(frame, start), slide, merge };
}

export function Period2Scene() {
  const frame = useSceneFrame();
  const top = usePanel(frame, HEAD_ON);
  const bottom = usePanel(frame, SIDE);
  const copies = (panel: { slide: number; merge: number }) =>
    panel.slide > 0 ? 1 - panel.merge : 0;
  return (
    <AbsoluteFill>
      <Stage>
        <g opacity={top.shown}>
          <Pz cx={ATOM_X[0]} cy={TOP_Y} flip={false} />
          <Pz cx={ATOM_X[1]} cy={TOP_Y} flip />
          <Arrow x1={1060} y1={TOP_Y} x2={1140} y2={TOP_Y} />
        </g>
        <g opacity={copies(top)}>
          <Pz
            cx={lerp(ATOM_X[0], MO_X - 60, top.slide)}
            cy={TOP_Y}
            flip={false}
          />
          <Pz cx={lerp(ATOM_X[1], MO_X + 60, top.slide)} cy={TOP_Y} flip />
        </g>
        <ScaleAbout
          cx={MO_X}
          cy={TOP_Y}
          scale={lerp(0.6, 1, top.merge)}
          opacity={top.merge}
        >
          <SigmaMo />
        </ScaleAbout>

        <g opacity={bottom.shown}>
          <Px cx={ATOM_X[0]} cy={BOTTOM_Y} />
          <Px cx={ATOM_X[1]} cy={BOTTOM_Y} />
          <Arrow x1={1060} y1={BOTTOM_Y} x2={1140} y2={BOTTOM_Y} />
        </g>
        <g opacity={copies(bottom)}>
          <Px cx={lerp(ATOM_X[0], MO_X - 40, bottom.slide)} cy={BOTTOM_Y} />
          <Px cx={lerp(ATOM_X[1], MO_X + 40, bottom.slide)} cy={BOTTOM_Y} />
        </g>
        <ScaleAbout
          cx={MO_X}
          cy={BOTTOM_Y}
          scale={lerp(0.6, 1, bottom.merge)}
          opacity={bottom.merge}
        >
          <PiMo />
        </ScaleAbout>
      </Stage>

      <Text
        x={SAFE}
        y={150}
        size={type.title}
        weight={700}
        anchor="start"
        opacity={fadeIn(frame, 0)}
      >
        Period-2 Molecular Orbitals
      </Text>
      <Text
        x={SAFE}
        y={270}
        size={type.body}
        anchor="start"
        opacity={top.shown}
      >
        Head-on 2p overlap
      </Text>
      <Text x={600} y={TOP_Y} size={type.body} opacity={top.shown}>
        +
      </Text>
      <Text
        x={MO_X}
        y={520}
        size={type.label}
        weight={500}
        color={colors.sigmaText}
        opacity={top.merge}
      >
        <MoLabel letter="σ" shell="2p" />
      </Text>
      <Text
        x={SAFE}
        y={630}
        size={type.body}
        anchor="start"
        opacity={bottom.shown}
      >
        Side-by-side 2p overlap
      </Text>
      <Text x={600} y={BOTTOM_Y} size={type.body} opacity={bottom.shown}>
        +
      </Text>
      <Text
        x={MO_X}
        y={970}
        size={type.label}
        weight={500}
        color={colors.piText}
        opacity={bottom.merge}
      >
        Two degenerate <MoLabel letter="π" shell="2p" />
      </Text>
      <Text
        x={SAFE}
        y={980}
        size={type.label}
        weight={500}
        color={colors.axis}
        anchor="start"
        opacity={fadeIn(frame, 0)}
      >
        2s orbitals similarly form <MoLabel letter="σ" shell="2s" /> and{" "}
        <MoLabel letter="σ" star shell="2s" />
      </Text>
    </AbsoluteFill>
  );
}
