import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, pop, progress } from "../components/anim";
import { SvgLabel } from "../components/Boxes";
import { AngleArc, Atom } from "../components/Molecule";
import { HybridOrbital, POrbital } from "../components/Orbitals";
import { Stage, Subtitle, Title } from "../components/Panels";
import { cue } from "../cues";
import { colors } from "../theme";

const SCENE = "sp2-sp-pi-bonds";

const BEATS = {
  ethene: cue(SCENE, "like ethene"),
  sp2: cue(SCENE, "yields three S P two hybrids"),
  angle120: cue(SCENE, "at one hundred twenty degrees"),
  ethyne: cue(SCENE, "For two domains"),
  sp: cue(SCENE, "two linear S P hybrids"),
  p: cue(SCENE, "Leftover unhybridised p orbitals"),
  pi: cue(SCENE, "form pi bonds by overlapping side by side"),
};

const Y = 560;
const HYBRID_LOBE = 140;
const P_LOBE = 128;
const SKEW_LOBE = 90;
const SKEW_ANGLE = 60;
const ETHENE = { left: { x: 440, y: Y }, right: { x: 640, y: Y } };
const ETHYNE = { left: { x: 1280, y: Y }, right: { x: 1480, y: Y } };

const at = (from: { x: number; y: number }, angle: number, distance = 160) => ({
  x: from.x + distance * Math.cos((angle * Math.PI) / 180),
  y: from.y + distance * Math.sin((angle * Math.PI) / 180),
});

const ETHENE_SP2 = [
  { c: ETHENE.left, angles: [0, 120, 240] },
  { c: ETHENE.right, angles: [180, 60, -60] },
];
const ETHENE_H = [
  at(ETHENE.left, 120),
  at(ETHENE.left, 240),
  at(ETHENE.right, 60),
  at(ETHENE.right, -60),
];
const ETHYNE_SP = [
  { c: ETHYNE.left, angles: [0, 180] },
  { c: ETHYNE.right, angles: [180, 0] },
];
const ETHYNE_H = [at(ETHYNE.left, 180), at(ETHYNE.right, 0)];

const scaleAbout = (x: number, y: number, s: number) =>
  `translate(${x} ${y}) scale(${s}) translate(${-x} ${-y})`;

/** Side-by-side π overlap band between two parallel lobes at `y`. */
function PiBand({
  x1,
  x2,
  y,
  height = 64,
  opacity,
}: {
  x1: number;
  x2: number;
  y: number;
  height?: number;
  opacity: number;
}) {
  if (opacity <= 0) return null;
  return (
    <rect
      x={x1 - 30}
      y={y - height / 2}
      width={x2 - x1 + 60}
      height={height}
      rx={height / 2}
      fill={colors.pi}
      fillOpacity={0.4}
      stroke={colors.piText}
      strokeWidth={3}
      strokeDasharray="10 8"
      opacity={opacity}
    />
  );
}

/** σ overlap along the internuclear axis. */
function SigmaOverlap({
  x1,
  x2,
  y,
  opacity,
}: {
  x1: number;
  x2: number;
  y: number;
  opacity: number;
}) {
  if (opacity <= 0) return null;
  return (
    <ellipse
      cx={(x1 + x2) / 2}
      cy={y}
      rx={(x2 - x1) / 2 - 30}
      ry={30}
      fill={colors.sigma}
      fillOpacity={0.85}
      stroke={colors.sigmaText}
      strokeWidth={3}
      opacity={opacity}
    />
  );
}

export function PiBondScene() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const etheneAtoms = pop(frame, fps, BEATS.ethene);
  const sp2 = pop(frame, fps, BEATS.sp2);
  const sp2Label = fadeIn(frame, BEATS.sp2);
  const angle120 = progress(frame, BEATS.angle120, BEATS.angle120 + 15);
  const ethyneAtoms = pop(frame, fps, BEATS.ethyne);
  const sp = pop(frame, fps, BEATS.sp);
  const spLabel = fadeIn(frame, BEATS.sp);
  const p = pop(frame, fps, BEATS.p);
  const pi = fadeIn(frame, BEATS.pi);

  const piY = (lobe: number, angle: number) =>
    Y + (lobe / 2) * Math.sin((angle * Math.PI) / 180);

  return (
    <AbsoluteFill>
      <Title>sp² and sp Hybrids</Title>
      <Subtitle>π bonds from unhybridised p orbitals</Subtitle>
      <Stage>
        {/* Ethyne second p set: tilted to suggest the perpendicular plane. */}
        <g opacity={Math.min(1, p) * 0.75}>
          {[ETHYNE.left, ETHYNE.right].map((c, i) => (
            <g key={i} transform={scaleAbout(c.x, c.y, p)}>
              <POrbital {...c} angle={SKEW_ANGLE} length={SKEW_LOBE} />
            </g>
          ))}
        </g>
        <PiBand
          x1={ETHYNE.left.x + (SKEW_LOBE / 2) * Math.cos(Math.PI / 3)}
          x2={ETHYNE.right.x + (SKEW_LOBE / 2) * Math.cos(Math.PI / 3)}
          y={piY(SKEW_LOBE, SKEW_ANGLE)}
          height={40}
          opacity={pi * 0.75}
        />
        <PiBand
          x1={ETHYNE.left.x - (SKEW_LOBE / 2) * Math.cos(Math.PI / 3)}
          x2={ETHYNE.right.x - (SKEW_LOBE / 2) * Math.cos(Math.PI / 3)}
          y={piY(SKEW_LOBE, SKEW_ANGLE + 180)}
          height={40}
          opacity={pi * 0.75}
        />

        {ETHENE_SP2.map(({ c, angles }) =>
          angles.map((angle) => (
            <g key={`${c.x}-${angle}`} transform={scaleAbout(c.x, c.y, sp2)}>
              <HybridOrbital
                {...c}
                angle={angle}
                length={HYBRID_LOBE}
                opacity={Math.min(1, sp2)}
              />
            </g>
          )),
        )}
        {ETHYNE_SP.map(({ c, angles }) =>
          angles.map((angle) => (
            <g key={`${c.x}-${angle}`} transform={scaleAbout(c.x, c.y, sp)}>
              <HybridOrbital
                {...c}
                angle={angle}
                length={HYBRID_LOBE}
                opacity={Math.min(1, sp)}
              />
            </g>
          )),
        )}
        <SigmaOverlap
          x1={ETHENE.left.x}
          x2={ETHENE.right.x}
          y={Y}
          opacity={sp2Label}
        />
        <SigmaOverlap
          x1={ETHYNE.left.x}
          x2={ETHYNE.right.x}
          y={Y}
          opacity={spLabel}
        />

        {[ETHENE.left, ETHENE.right, ETHYNE.left, ETHYNE.right].map((c, i) => (
          <g
            key={i}
            transform={scaleAbout(c.x, c.y, p)}
            opacity={Math.min(1, p)}
          >
            <POrbital {...c} angle={90} length={P_LOBE} />
          </g>
        ))}
        {[ETHENE, ETHYNE].map((pair, i) => (
          <g key={i}>
            <PiBand
              x1={pair.left.x}
              x2={pair.right.x}
              y={Y - P_LOBE / 2 - 8}
              opacity={pi}
            />
            <PiBand
              x1={pair.left.x}
              x2={pair.right.x}
              y={Y + P_LOBE / 2 + 8}
              opacity={pi}
            />
          </g>
        ))}

        <AngleArc
          at={ETHENE.left}
          from={120}
          to={240}
          radius={60}
          label="120°"
          labelRadius={110}
          progress={angle120}
        />
        <AngleArc
          at={ETHYNE.left}
          from={180}
          to={360}
          radius={60}
          label="180°"
          labelRadius={175}
          progress={progress(frame, BEATS.sp, BEATS.sp + 20)}
        />

        <g opacity={Math.min(1, etheneAtoms)}>
          {[ETHENE.left, ETHENE.right].map((c, i) => (
            <g key={i} transform={scaleAbout(c.x, c.y, etheneAtoms)}>
              <Atom {...c}>C</Atom>
            </g>
          ))}
          {ETHENE_H.map((h, i) => (
            <g key={i} transform={scaleAbout(h.x, h.y, etheneAtoms)}>
              <Atom {...h}>H</Atom>
            </g>
          ))}
        </g>
        <g opacity={Math.min(1, ethyneAtoms)}>
          {[ETHYNE.left, ETHYNE.right].map((c, i) => (
            <g key={i} transform={scaleAbout(c.x, c.y, ethyneAtoms)}>
              <Atom {...c}>C</Atom>
            </g>
          ))}
          {ETHYNE_H.map((h, i) => (
            <g key={i} transform={scaleAbout(h.x, h.y, ethyneAtoms)}>
              <Atom {...h}>H</Atom>
            </g>
          ))}
        </g>

        <SvgLabel
          x={540}
          y={860}
          size={40}
          color={colors.hybridText}
          opacity={sp2Label}
        >
          Ethene · sp² (33% s)
        </SvgLabel>
        <SvgLabel
          x={1380}
          y={860}
          size={40}
          color={colors.hybridText}
          opacity={spLabel}
        >
          Ethyne · sp (50% s)
        </SvgLabel>
        <SvgLabel
          x={120}
          y={940}
          anchor="start"
          color={colors.sigmaText}
          opacity={pi}
        >
          σ: end-to-end
        </SvgLabel>
        <SvgLabel
          x={500}
          y={940}
          anchor="start"
          color={colors.piText}
          opacity={pi}
        >
          π: side-by-side
        </SvgLabel>
      </Stage>
    </AbsoluteFill>
  );
}
