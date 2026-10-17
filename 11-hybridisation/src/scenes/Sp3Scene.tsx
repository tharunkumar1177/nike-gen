import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { easeInOut, fadeIn, lerp, pop, progress } from "../components/anim";
import { EnergyAxis, Harpoon, OrbitalBox, SvgLabel } from "../components/Boxes";
import {
  HybridOrbital,
  Nucleus,
  POrbital,
  SOrbital,
} from "../components/Orbitals";
import { Stage, Subtitle, Title } from "../components/Panels";
import { cue } from "../cues";
import { colors } from "../theme";
import { P_BOXES, S_BOX } from "./ProblemScene";

const SCENE = "sp3-model";

const BEATS = {
  orbitals: cue(SCENE, "Geometry is known first"),
  mix: cue(SCENE, "mathematically mix"),
  promote: cue(SCENE, "electron being promoted first"),
  bookkeeping: cue(SCENE, "just bookkeeping"),
  hybrids: cue(SCENE, "forms four equivalent S P three hybrids"),
  character: cue(SCENE, "twenty five percent s character"),
};

const ROW_Y = 600;
const HYBRID_CENTRE = { x: 1150, y: 600 };
const LOBES = [
  { angle: -90, length: 160, opacity: 1 },
  { angle: 29, length: 160, opacity: 1 },
  { angle: 151, length: 176, opacity: 1 },
  { angle: -135, length: 130, opacity: 0.7 },
];
const DRAW_ORDER = [3, 0, 1, 2];

export function Sp3Scene() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const orbitals = fadeIn(frame, BEATS.orbitals);
  const pulse = interpolate(
    frame,
    [BEATS.mix, BEATS.mix + 10, BEATS.mix + 20],
    [1, 1.1, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const promote = progress(frame, BEATS.promote, BEATS.promote + 30, easeInOut);
  const tag = fadeIn(frame, BEATS.bookkeeping);
  const merge = progress(frame, BEATS.hybrids, BEATS.hybrids + 30, easeInOut);
  const grow = pop(frame, fps, BEATS.hybrids);
  const character = fadeIn(frame, BEATS.character);

  const sBoxY = lerp(S_BOX.y, ROW_Y, merge);
  const pBoxY = lerp(P_BOXES[0]!.y, ROW_Y, merge);
  const third = P_BOXES[2]!;
  const moverX = lerp(S_BOX.x + 14, third.x, promote);
  const moverY = lerp(S_BOX.y, third.y, promote) + (pBoxY - P_BOXES[0]!.y);
  const sUpX = lerp(S_BOX.x - 14, S_BOX.x, promote);
  const scaleAbout = (x: number, y: number, s: number) =>
    `translate(${x} ${y}) scale(${s}) translate(${-x} ${-y})`;

  return (
    <AbsoluteFill>
      <Title>The sp³ Model</Title>
      <Subtitle>Promote-then-mix bookkeeping</Subtitle>
      <Stage>
        <EnergyAxis x={200} top={420} bottom={800} />
        <OrbitalBox x={S_BOX.x} y={sBoxY} stroke={colors.sText} />
        <OrbitalBox
          x={S_BOX.x}
          y={sBoxY}
          stroke={colors.hybridText}
          opacity={merge}
        />
        <SvgLabel
          x={S_BOX.x}
          y={S_BOX.y + 70}
          color={colors.sText}
          opacity={1 - merge}
        >
          2s
        </SvgLabel>
        {P_BOXES.map((box, i) => (
          <g key={i}>
            <OrbitalBox x={box.x} y={pBoxY} stroke={colors.pText} />
            <OrbitalBox
              x={box.x}
              y={pBoxY}
              stroke={colors.hybridText}
              opacity={merge}
            />
          </g>
        ))}
        <SvgLabel
          x={P_BOXES[1]!.x}
          y={P_BOXES[1]!.y + 70}
          color={colors.pText}
          opacity={1 - merge}
        >
          2p
        </SvgLabel>
        <SvgLabel
          x={435}
          y={ROW_Y + 70}
          color={colors.hybridText}
          opacity={merge}
        >
          four sp³
        </SvgLabel>
        <Harpoon x={sUpX} y={sBoxY} up />
        {P_BOXES.slice(0, 2).map((box, i) => (
          <Harpoon key={i} x={box.x} y={pBoxY} up />
        ))}
        <Harpoon x={moverX} y={moverY} up={promote >= 0.5} />
        <SvgLabel x={390} y={850} color={colors.cautionText} opacity={tag}>
          Promotion is formal bookkeeping, not physical.
        </SvgLabel>

        <g opacity={orbitals * (1 - merge)}>
          <g transform={scaleAbout(1000, 600, pulse)}>
            <SOrbital x={1000} y={600} radius={80} />
          </g>
          <SvgLabel x={1150} y={600} size={48} weight={700}>
            +
          </SvgLabel>
          <g transform={scaleAbout(1320, 600, pulse)}>
            <POrbital x={1320} y={600} angle={35} length={110} />
            <POrbital x={1320} y={600} angle={0} />
            <POrbital x={1320} y={600} angle={90} />
            <Nucleus x={1320} y={600} />
          </g>
        </g>
        <g
          opacity={merge}
          transform={scaleAbout(HYBRID_CENTRE.x, HYBRID_CENTRE.y, grow)}
        >
          {DRAW_ORDER.map((i) => {
            const lobe = LOBES[i]!;
            return (
              <HybridOrbital
                key={i}
                {...HYBRID_CENTRE}
                angle={lobe.angle}
                length={lobe.length}
                opacity={lobe.opacity}
              />
            );
          })}
          <Nucleus {...HYBRID_CENTRE} />
        </g>
        <SvgLabel
          x={1150}
          y={850}
          color={colors.hybridText}
          opacity={character}
        >
          sp³ (25% s character)
        </SvgLabel>
      </Stage>
    </AbsoluteFill>
  );
}
