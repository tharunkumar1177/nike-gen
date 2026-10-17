import { AbsoluteFill, spring, useVideoConfig } from "remotion";
import { fadeIn, lerp, progress } from "../components/anim";
import { Arrow, Stage } from "../components/Diagram";
import { Ladder, type Mo } from "../components/Ladder";
import { useSceneFrame } from "../components/SceneFrame";
import { Formula } from "../components/Script";
import { Text } from "../components/Text";
import { cue } from "../cues";
import { colors, SAFE, type } from "../theme";

const SCENE = "sp-mixing";

const OXYGEN = cue(SCENE, "for oxygen and fluorine");
const BELOW = cue(SCENE, "means sigma two p lies below");
const BORON = cue(SCENE, "but for boron");
const INTERACT = cue(SCENE, "the sigma two s and sigma two p");
const PUSH = cue(SCENE, "pushing sigma two p above");

const LARGE_GAP: readonly Mo[] = [
  { letter: "σ", shell: "2s", y: 940 },
  { letter: "σ", star: true, shell: "2s", y: 780 },
  { letter: "σ", shell: "2p", y: 600 },
  { letter: "π", shell: "2p", y: 540 },
  { letter: "π", star: true, shell: "2p", y: 380 },
  { letter: "σ", star: true, shell: "2p", y: 300 },
];

/** σ2p sits at UNMIXED_Y before the interaction and MIXED_Y after it. */
const UNMIXED_Y = 620;
const MIXED_Y = 510;

function smallGap(sigmaY: number): readonly Mo[] {
  return [
    { letter: "σ", shell: "2s", y: 840 },
    { letter: "σ", star: true, shell: "2s", y: 690 },
    { letter: "π", shell: "2p", y: 580 },
    { letter: "σ", shell: "2p", y: sigmaY },
    { letter: "π", star: true, shell: "2p", y: 380 },
    { letter: "σ", star: true, shell: "2p", y: 300 },
  ];
}

/** Vertical double-headed arrow spanning the 2s–2p gap. */
function GapArrow({
  x,
  top,
  bottom,
}: {
  x: number;
  top: number;
  bottom: number;
}) {
  const midY = (top + bottom) / 2;
  return (
    <>
      <Arrow x1={x} y1={midY} x2={x} y2={top} />
      <Arrow x1={x} y1={midY} x2={x} y2={bottom} />
    </>
  );
}

/** Dashed σ2s–σ2p interaction curve with arrowheads at both ends. */
function Interaction({ shown, sigmaY }: { shown: number; sigmaY: number }) {
  const start = { x: 1410, y: 840 };
  const end = { x: 1410, y: sigmaY };
  const control = { x: 1190, y: (start.y + end.y) / 2 };
  const head = (tip: { x: number; y: number }) => {
    const angle = Math.atan2(tip.y - control.y, tip.x - control.x);
    const barb = (side: number) =>
      `${tip.x - 18 * Math.cos(angle + side)} ${tip.y - 18 * Math.sin(angle + side)}`;
    return `M ${barb(-0.5)} L ${tip.x} ${tip.y} L ${barb(0.5)}`;
  };
  if (shown <= 0) return null;
  return (
    <g
      opacity={shown}
      fill="none"
      stroke={colors.antibonding}
      strokeWidth={4}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d={`M ${start.x} ${start.y} Q ${control.x} ${control.y} ${end.x} ${end.y}`}
        strokeDasharray="12 10"
      />
      <path d={head(start)} />
      <path d={head(end)} />
    </g>
  );
}

export function MixingScene() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();
  const large = progress(frame, OXYGEN, OXYGEN + 40);
  const small = progress(frame, BORON, BORON + 40);
  const interact = progress(frame, INTERACT, INTERACT + 30);
  const push = spring({
    frame: frame - PUSH,
    fps,
    config: { mass: 1, damping: 14, stiffness: 120 },
  });
  const sigmaY = lerp(UNMIXED_Y, MIXED_Y, push);
  const highlight =
    progress(frame, BELOW, BELOW + 15) -
    progress(frame, BELOW + 75, BELOW + 90);

  return (
    <AbsoluteFill>
      <Ladder
        left={300}
        mid={600}
        right={900}
        ao={{ s: 860, p: 460 }}
        mos={LARGE_GAP}
        shown={large}
        labelX={700}
      />
      <Ladder
        left={1150}
        mid={1450}
        right={1750}
        ao={{ s: 760, p: 450 }}
        mos={smallGap(sigmaY)}
        shown={small}
        labelX={1550}
      />
      <Stage>
        <g opacity={large}>
          <GapArrow x={160} top={460} bottom={860} />
        </g>
        <g opacity={small}>
          <GapArrow x={1030} top={450} bottom={760} />
        </g>
        <Interaction shown={interact} sigmaY={sigmaY} />
        <rect
          x={515}
          y={505}
          width={300}
          height={130}
          rx={16}
          fill="none"
          stroke={colors.text}
          strokeWidth={3}
          opacity={highlight}
        />
      </Stage>

      <Text
        x={SAFE}
        y={110}
        size={type.title}
        weight={700}
        anchor="start"
        opacity={fadeIn(frame, 0)}
      >
        s–p Mixing &amp; Energy Order
      </Text>
      <Text x={600} y={215} size={type.body} opacity={large}>
        <Formula base="O" sub="2" />, <Formula base="F" sub="2" /> (large 2s–2p
        gap)
      </Text>
      <Text x={1450} y={215} size={type.body} opacity={small}>
        <Formula base="B" sub="2" />, <Formula base="C" sub="2" />,{" "}
        <Formula base="N" sub="2" /> (small 2s–2p gap)
      </Text>
      <Text
        x={1290}
        y={640}
        size={type.label}
        weight={500}
        color={colors.antibondingText}
        anchor="end"
        opacity={interact}
      >
        s–p interaction
      </Text>
    </AbsoluteFill>
  );
}
