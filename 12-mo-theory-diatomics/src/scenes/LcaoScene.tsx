import { AbsoluteFill, useVideoConfig } from "remotion";
import { dropIn, fadeIn, pop } from "../components/anim";
import { Arrow, Dashed, ScaleAbout, Stage } from "../components/Diagram";
import { BOX, OrbitalBox, type Spin } from "../components/Orbital";
import { useSceneFrame } from "../components/SceneFrame";
import { Formula, MoLabel, Sup } from "../components/Script";
import { Text } from "../components/Text";
import { cue } from "../cues";
import { colors, FONT, SAFE, type } from "../theme";

const SCENE = "lcao-bond-order";

const INTRO = cue(SCENE, "two atomic orbitals always");
const IN_PHASE = cue(SCENE, "combine in phase");
const OUT_PHASE = cue(SCENE, "and out of phase");
const FORMULA = cue(SCENE, "bond order is");
const H2 = cue(SCENE, "h two has");
const HE2_PLUS = cue(SCENE, "he two plus");
const HE2 = cue(SCENE, "he two has");

const LEFT_AO = { x: 200, y: 700 } as const;
const RIGHT_AO = { x: 800, y: 700 } as const;
const BONDING = { x: 500, y: 850 } as const;
const ANTIBONDING = { x: 500, y: 550 } as const;

const MATH_X = 1000;

const up = (shown: number, color?: string): Spin => ({
  dir: "up",
  shown,
  color,
});
const down = (shown: number): Spin => ({ dir: "down", shown });

function connectors(shown: number, mo: { y: number }) {
  const moMid = mo.y + BOX / 2;
  return (
    <>
      <Dashed
        x1={LEFT_AO.x + BOX}
        y1={LEFT_AO.y + BOX / 2}
        x2={BONDING.x}
        y2={moMid}
        shown={shown}
      />
      <Dashed
        x1={RIGHT_AO.x}
        y1={RIGHT_AO.y + BOX / 2}
        x2={BONDING.x + BOX}
        y2={moMid}
        shown={shown}
      />
    </>
  );
}

function Molecule({ frame }: { frame: number }) {
  if (frame < HE2_PLUS) return <Formula base="H" sub="2" />;
  if (frame < HE2) return <Formula base="He" sub="2" sup="+" />;
  return <Formula base="He" sub="2" />;
}

export function LcaoScene() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();
  const intro = fadeIn(frame, INTRO);
  const inPhase = pop(frame, fps, IN_PHASE);
  const outPhase = pop(frame, fps, OUT_PHASE);
  const bondingBox = fadeIn(frame, IN_PHASE);
  const antibondingBox = fadeIn(frame, OUT_PHASE);
  const loneAntibonding = frame < HE2 + 20;

  return (
    <AbsoluteFill>
      <Stage>
        <g opacity={intro}>
          <circle cx={320} cy={250} r={40} fill={colors.bonding} />
          <circle cx={420} cy={250} r={40} fill={colors.bonding} />
        </g>
        <Arrow x1={500} y1={200} x2={580} y2={200} shown={inPhase} />
        <ScaleAbout cx={700} cy={200} scale={inPhase}>
          <ellipse cx={700} cy={200} rx={80} ry={45} fill={colors.bonding} />
        </ScaleAbout>
        <Arrow x1={500} y1={320} x2={580} y2={320} shown={outPhase} />
        <ScaleAbout cx={700} cy={320} scale={outPhase}>
          <circle cx={640} cy={320} r={45} fill={colors.bonding} />
          <circle cx={760} cy={320} r={45} fill={colors.antibonding} />
          <line
            x1={700}
            x2={700}
            y1={250}
            y2={390}
            stroke={colors.axis}
            strokeWidth={4}
            strokeDasharray="10 8"
          />
        </ScaleAbout>
        {connectors(bondingBox, BONDING)}
        {connectors(antibondingBox, ANTIBONDING)}
      </Stage>

      <Text x={SAFE} y={250} size={type.body} anchor="start" opacity={intro}>
        1s + 1s
      </Text>
      <Text
        x={540}
        y={168}
        size={type.label}
        weight={500}
        color={colors.bondingText}
        opacity={inPhase}
      >
        In phase
      </Text>
      <Text
        x={830}
        y={200}
        size={type.label}
        weight={500}
        color={colors.sigmaText}
        anchor="start"
        opacity={inPhase}
      >
        <MoLabel letter="σ" shell="1s" />
      </Text>
      <Text
        x={540}
        y={288}
        size={type.label}
        weight={500}
        color={colors.antibondingText}
        opacity={outPhase}
      >
        Out of phase
      </Text>
      <Text
        x={830}
        y={320}
        size={type.label}
        weight={500}
        color={colors.sigmaText}
        anchor="start"
        opacity={outPhase}
      >
        <MoLabel letter="σ" star shell="1s" />
      </Text>

      <OrbitalBox
        {...LEFT_AO}
        stroke={colors.axis}
        opacity={intro}
        spins={[
          up(dropIn(frame, INTRO + 10)),
          down(dropIn(frame, HE2_PLUS + 10)),
        ]}
      />
      <OrbitalBox
        {...RIGHT_AO}
        stroke={colors.axis}
        opacity={intro}
        spins={[up(dropIn(frame, INTRO + 20)), down(dropIn(frame, HE2 + 10))]}
      />
      <OrbitalBox
        {...BONDING}
        stroke={colors.bondingText}
        opacity={bondingBox}
        spins={[
          up(dropIn(frame, IN_PHASE + 20)),
          down(dropIn(frame, IN_PHASE + 30)),
        ]}
      />
      <OrbitalBox
        {...ANTIBONDING}
        stroke={colors.antibondingText}
        opacity={antibondingBox}
        spins={[
          up(
            dropIn(frame, HE2_PLUS + 20),
            loneAntibonding ? colors.unpaired : undefined,
          ),
          down(dropIn(frame, HE2 + 20)),
        ]}
      />
      <Text
        x={LEFT_AO.x + BOX / 2}
        y={LEFT_AO.y + BOX + 36}
        size={type.label}
        weight={500}
        opacity={intro}
      >
        1s
      </Text>
      <Text
        x={RIGHT_AO.x + BOX / 2}
        y={RIGHT_AO.y + BOX + 36}
        size={type.label}
        weight={500}
        opacity={intro}
      >
        1s
      </Text>
      <Text
        x={BONDING.x + BOX / 2}
        y={BONDING.y + BOX + 36}
        size={type.label}
        weight={500}
        color={colors.sigmaText}
        opacity={bondingBox}
      >
        <MoLabel letter="σ" shell="1s" />
      </Text>
      <Text
        x={ANTIBONDING.x + BOX / 2}
        y={ANTIBONDING.y - 36}
        size={type.label}
        weight={500}
        color={colors.sigmaText}
        opacity={antibondingBox}
      >
        <MoLabel letter="σ" star shell="1s" />
      </Text>
      <Text
        x={RIGHT_AO.x + BOX / 2}
        y={600}
        size={type.subtitle}
        weight={700}
        opacity={intro}
      >
        <Molecule frame={frame} />
      </Text>

      <div
        style={{
          position: "absolute",
          left: MATH_X,
          top: 400,
          display: "flex",
          alignItems: "center",
          gap: 24,
          fontFamily: FONT,
          fontSize: type.body,
          color: colors.text,
          opacity: fadeIn(frame, FORMULA),
        }}
      >
        <span>BO =</span>
        <span
          style={{
            display: "inline-flex",
            flexDirection: "column",
            alignItems: "center",
            lineHeight: 1.2,
          }}
        >
          <span style={{ borderBottom: `4px solid ${colors.text}` }}>
            bonding e<Sup>−</Sup> − antibonding e<Sup>−</Sup>
          </span>
          <span>2</span>
        </span>
      </div>
      <Text
        x={MATH_X}
        y={630}
        size={type.body}
        anchor="start"
        opacity={fadeIn(frame, H2)}
      >
        <Formula base="H" sub="2" />: (2 − 0) / 2 = 1
      </Text>
      <Text
        x={MATH_X}
        y={730}
        size={type.body}
        anchor="start"
        opacity={fadeIn(frame, HE2_PLUS)}
      >
        <Formula base="He" sub="2" sup="+" />: (2 − 1) / 2 = 0.5
      </Text>
      <Text
        x={MATH_X}
        y={830}
        size={type.body}
        anchor="start"
        opacity={fadeIn(frame, HE2)}
      >
        <Formula base="He" sub="2" />: (2 − 2) / 2 = 0
      </Text>
      <Text
        x={MATH_X}
        y={895}
        size={type.label}
        weight={500}
        color={colors.antibondingText}
        anchor="start"
        opacity={fadeIn(frame, HE2 + 15)}
      >
        No stable bond predicted
      </Text>
    </AbsoluteFill>
  );
}
