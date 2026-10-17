import { AbsoluteFill } from "remotion";
import { progress } from "../components/anim";
import { Card } from "../components/Card";
import { useSceneFrame } from "../components/SceneFrame";
import { Formula, MoLabel } from "../components/Script";
import { cue } from "../cues";
import { colors, SCENES } from "../theme";

const SCENE = "key-takeaways";
const LENGTH = SCENES[SCENE].to - SCENES[SCENE].from;

function Check() {
  return (
    <svg width={36} height={36} viewBox="0 0 36 36">
      <path
        d="M6 18 L14 26 L30 10"
        fill="none"
        stroke={colors.pi}
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const PI = <MoLabel letter="π" shell="2p" />;
const SIGMA = <MoLabel letter="σ" shell="2p" />;
const O2 = <Formula base="O" sub="2" />;
const B2 = <Formula base="B" sub="2" />;

const ITEMS = [
  {
    text: "n AOs make n MOs: bonding (in phase) and antibonding (node).",
    at: cue(SCENE, "n atomic orbitals"),
  },
  {
    text: "Bond order = (bonding − antibonding) / 2; higher means stronger and shorter.",
    at: cue(SCENE, "bond order predicts"),
  },
  {
    text: (
      <>
        The 2s–2p gap decides whether {PI} or {SIGMA} fills first.
      </>
    ),
    at: cue(SCENE, "the two s two p gap"),
  },
  {
    text: (
      <>
        MO theory explains the paramagnetism of {O2} and {B2}.
      </>
    ),
    at: cue(SCENE, "molecular orbital theory explains"),
  },
  {
    text: "Aufbau, Pauli and Hund's rule fill MOs just like AOs.",
    at: cue(SCENE, "and standard rules"),
  },
];

export function TakeawaysScene() {
  const frame = useSceneFrame();
  return (
    <AbsoluteFill style={{ opacity: 1 - progress(frame, LENGTH - 30, LENGTH) }}>
      <Card
        box={{ left: 120, top: 150, width: 1680, height: 780 }}
        border={colors.box}
        title="Key Takeaways"
        bulletIcon={<Check />}
        items={ITEMS}
      />
    </AbsoluteFill>
  );
}
