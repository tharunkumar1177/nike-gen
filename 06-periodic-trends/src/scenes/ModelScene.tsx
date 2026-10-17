import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { easeOutQuart, fadeIn, lerp, pop, progress } from "../components/anim";
import { Arrow } from "../components/Arrow";
import { Pitfall, Title } from "../components/Panels";
import { Zeff } from "../components/Script";
import { Text } from "../components/Text";
import { cue } from "../cues";
import { colors, type, VIDEO } from "../theme";

const SCENE = "model-zeff";

const ATOM = cue(SCENE, "Coulomb attraction");
const ACROSS = cue(SCENE, "Across a period");
const SLATER = cue(SCENE, "Following Slater's rules");
const WIN = cue(SCENE, "Protons win");
const TIGHTER = cue(SCENE, "held tighter");

const NUCLEUS = { x: 450, y: 600, r: 40 } as const;
const { x: CX, y: CY } = NUCLEUS;
const INNER_R = 120;
const VALENCE_FROM = 250;
const VALENCE_TO = 200;
const ELECTRON_R = 12;
const ANGLE = -Math.PI / 4;
const COLUMN_X = 1000;

function onRing(radius: number, angle: number) {
  return {
    x: NUCLEUS.x + Math.cos(angle) * radius,
    y: NUCLEUS.y + Math.sin(angle) * radius,
  };
}

const INNER_ELECTRONS = [onRing(INNER_R, 0), onRing(INNER_R, Math.PI)];

export function ModelScene() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const atom = pop(frame, fps, ATOM, { stiffness: 120, damping: 14 });
  const pull = progress(frame, ATOM + 10, ATOM + 40);
  const inner = fadeIn(frame, ACROSS);
  const proton = pop(frame, fps, ACROSS);
  const formula = pop(frame, fps, SLATER);
  const slater = fadeIn(frame, SLATER + 15);
  const pitfall = fadeIn(frame, WIN);
  const strike = progress(frame, WIN + 10, WIN + 30, easeOutQuart);
  const fix = fadeIn(frame, WIN + 30);
  const tighter = pop(frame, fps, TIGHTER, { stiffness: 100, damping: 12 });

  const valence = lerp(VALENCE_FROM, VALENCE_TO, tighter);
  const electron = onRing(valence, ANGLE);
  const tail = onRing(valence - 2 * ELECTRON_R, ANGLE);
  const tip = onRing(NUCLEUS.r + 16, ANGLE);
  const grow = `translate(${CX} ${CY}) scale(${atom}) translate(${-CX} ${-CY})`;

  return (
    <AbsoluteFill>
      <Title>
        Coulomb Attraction &amp; <Zeff />
      </Title>

      <svg
        width={VIDEO.width}
        height={VIDEO.height}
        style={{ position: "absolute", left: 0, top: 0 }}
      >
        <g transform={grow} opacity={Math.min(1, atom)}>
          <circle
            cx={NUCLEUS.x}
            cy={NUCLEUS.y}
            r={valence}
            fill="none"
            stroke={colors.axis}
            strokeOpacity={0.4}
            strokeWidth={4}
          />
          <circle
            cx={NUCLEUS.x}
            cy={NUCLEUS.y}
            r={NUCLEUS.r}
            fill={colors.ie}
          />
          <circle
            cx={electron.x}
            cy={electron.y}
            r={ELECTRON_R}
            fill={colors.axis}
          />
        </g>
        <g opacity={inner}>
          <circle
            cx={NUCLEUS.x}
            cy={NUCLEUS.y}
            r={INNER_R}
            fill="none"
            stroke={colors.axis}
            strokeOpacity={0.4}
            strokeWidth={4}
          />
          {INNER_ELECTRONS.map(({ x, y }) => (
            <circle key={x} cx={x} cy={y} r={ELECTRON_R} fill={colors.axis} />
          ))}
        </g>
      </svg>
      <Arrow
        x1={tail.x}
        y1={tail.y}
        x2={tip.x}
        y2={tip.y}
        color={colors.ie}
        progress={pull}
        width={6}
        head={20}
      />

      <Text
        x={electron.x + 28}
        y={electron.y - 30}
        size={type.label}
        weight={500}
        anchor="start"
        opacity={pull}
      >
        Valence electron
      </Text>
      <Text
        x={NUCLEUS.x}
        y={NUCLEUS.y - INNER_R - 25}
        size={type.label}
        weight={500}
        color={colors.axis}
        opacity={inner}
      >
        Shielding
      </Text>
      <Text
        x={NUCLEUS.x}
        y={NUCLEUS.y + 65}
        size={type.label}
        weight={700}
        color={colors.ieText}
        opacity={Math.min(1, proton)}
        scale={lerp(0.6, 1, proton)}
      >
        +1 proton
      </Text>

      <Text
        x={COLUMN_X}
        y={350}
        size={type.subtitle}
        weight={700}
        anchor="start"
        opacity={Math.min(1, formula)}
        scale={lerp(0.8, 1, formula)}
      >
        <Zeff /> = Z − S
      </Text>
      <Text
        x={COLUMN_X}
        y={450}
        size={type.body}
        anchor="start"
        opacity={slater}
      >
        Slater&apos;s rules: ~+0.65 per step
      </Text>
      <Pitfall
        x={COLUMN_X}
        y={600}
        size={40}
        wrong="Nuclear pull is shared out"
        correction={
          <>
            <Zeff /> rises across a period
          </>
        }
        opacity={pitfall}
        strike={strike}
        fix={fix}
      />
    </AbsoluteFill>
  );
}
