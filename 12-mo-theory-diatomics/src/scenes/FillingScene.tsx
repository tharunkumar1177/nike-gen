import { AbsoluteFill } from "remotion";
import { dropIn, fadeIn, progress } from "../components/anim";
import { Electron } from "../components/Diagram";
import { electronX, Ladder, type Mo } from "../components/Ladder";
import { useSceneFrame } from "../components/SceneFrame";
import { Formula } from "../components/Script";
import { Text } from "../components/Text";
import { cue } from "../cues";
import { colors, SAFE, type } from "../theme";

const SCENE = "filling-o2-b2";

const RULES = cue(SCENE, "aufbau pauli and hunds rule");
const FILL_O2 = cue(SCENE, "filling oxygen");
const SINGLY = cue(SCENE, "go singly into");
const O2_PARA = cue(SCENE, "explaining its paramagnetism");
const BORON = cue(SCENE, "for boron");
const HIGHEST = cue(SCENE, "its highest two electrons");
const B2_PARA = cue(SCENE, "making boron paramagnetic");

const MID = 960;
const LADDER = { left: 360, mid: MID, right: 1560, ao: { s: 800, p: 380 } };
const LABEL_X = 1100;
const PARA_X = 1220;

const SIGMA_2S: Mo = { letter: "σ", shell: "2s", y: 880 };
const SIGMA_STAR_2S: Mo = { letter: "σ", star: true, shell: "2s", y: 720 };
const PI_STAR_2P: Mo = { letter: "π", star: true, shell: "2p", y: 300 };
const SIGMA_STAR_2P: Mo = { letter: "σ", star: true, shell: "2p", y: 200 };

const O2_SIGMA_2P: Mo = { letter: "σ", shell: "2p", y: 560 };
const O2_PI_2P: Mo = { letter: "π", shell: "2p", y: 460 };
const B2_PI_2P: Mo = { letter: "π", shell: "2p", y: 560 };
const B2_SIGMA_2P: Mo = { letter: "σ", shell: "2p", y: 460 };

const O2_MOS = [
  SIGMA_2S,
  SIGMA_STAR_2S,
  O2_SIGMA_2P,
  O2_PI_2P,
  PI_STAR_2P,
  SIGMA_STAR_2P,
] as const;
const B2_MOS = [
  SIGMA_2S,
  SIGMA_STAR_2S,
  B2_PI_2P,
  B2_SIGMA_2P,
  PI_STAR_2P,
  SIGMA_STAR_2P,
] as const;

type Fill = {
  mo: Mo;
  line: number;
  dir: "up" | "down";
  at: number;
  unpaired?: boolean;
};

/** Valence electrons of O₂ in Aufbau order, with Hund's rule in π2p and π*2p. */
const O2_FILL: readonly Fill[] = [
  { mo: SIGMA_2S, line: 0, dir: "up", at: FILL_O2 },
  { mo: SIGMA_2S, line: 0, dir: "down", at: FILL_O2 + 8 },
  { mo: SIGMA_STAR_2S, line: 0, dir: "up", at: FILL_O2 + 16 },
  { mo: SIGMA_STAR_2S, line: 0, dir: "down", at: FILL_O2 + 24 },
  { mo: O2_SIGMA_2P, line: 0, dir: "up", at: FILL_O2 + 32 },
  { mo: O2_SIGMA_2P, line: 0, dir: "down", at: FILL_O2 + 40 },
  { mo: O2_PI_2P, line: 0, dir: "up", at: FILL_O2 + 48 },
  { mo: O2_PI_2P, line: 1, dir: "up", at: FILL_O2 + 56 },
  { mo: O2_PI_2P, line: 0, dir: "down", at: FILL_O2 + 64 },
  { mo: O2_PI_2P, line: 1, dir: "down", at: FILL_O2 + 72 },
  { mo: PI_STAR_2P, line: 0, dir: "up", at: SINGLY + 10, unpaired: true },
  { mo: PI_STAR_2P, line: 1, dir: "up", at: SINGLY + 30, unpaired: true },
];

/** Valence electrons of B₂: π2p lies below σ2p, so its last two stay single. */
const B2_FILL: readonly Fill[] = [
  { mo: SIGMA_2S, line: 0, dir: "up", at: BORON + 40 },
  { mo: SIGMA_2S, line: 0, dir: "down", at: BORON + 48 },
  { mo: SIGMA_STAR_2S, line: 0, dir: "up", at: BORON + 56 },
  { mo: SIGMA_STAR_2S, line: 0, dir: "down", at: BORON + 64 },
  { mo: B2_PI_2P, line: 0, dir: "up", at: HIGHEST + 10, unpaired: true },
  { mo: B2_PI_2P, line: 1, dir: "up", at: HIGHEST + 30, unpaired: true },
];

function Electrons({ fill, frame }: { fill: readonly Fill[]; frame: number }) {
  return (
    <>
      {fill.map(({ mo, line, dir, at, unpaired }) => (
        <Electron
          key={`${mo.letter}${mo.star ? "*" : ""}${mo.shell}-${line}-${dir}`}
          x={electronX(MID, mo, line, dir)}
          y={mo.y}
          dir={dir}
          shown={dropIn(frame, at)}
          color={unpaired ? colors.unpaired : colors.axis}
        />
      ))}
    </>
  );
}

export function FillingScene() {
  const frame = useSceneFrame();
  const o2 = fadeIn(frame, RULES) - progress(frame, BORON, BORON + 30);
  const b2 = progress(frame, BORON, BORON + 30);
  return (
    <AbsoluteFill>
      <Ladder {...LADDER} mos={O2_MOS} shown={o2} labelX={LABEL_X}>
        <Electrons fill={O2_FILL} frame={frame} />
      </Ladder>
      <Ladder {...LADDER} mos={B2_MOS} shown={b2} labelX={LABEL_X}>
        <Electrons fill={B2_FILL} frame={frame} />
      </Ladder>
      <Text
        x={SAFE}
        y={120}
        size={type.title}
        weight={700}
        anchor="start"
        opacity={o2}
      >
        <Formula base="O" sub="2" />
      </Text>
      <Text
        x={SAFE}
        y={120}
        size={type.title}
        weight={700}
        anchor="start"
        opacity={b2}
      >
        <Formula base="B" sub="2" />
      </Text>
      <Text
        x={SAFE}
        y={220}
        size={type.label}
        weight={500}
        color={colors.axis}
        anchor="start"
        opacity={fadeIn(frame, RULES)}
      >
        Aufbau · Pauli · Hund
      </Text>
      <Text
        x={PARA_X}
        y={PI_STAR_2P.y}
        size={type.label}
        weight={700}
        color={colors.unpaired}
        anchor="start"
        opacity={Math.min(o2, fadeIn(frame, O2_PARA))}
      >
        Paramagnetic
      </Text>
      <Text
        x={PARA_X}
        y={B2_PI_2P.y}
        size={type.label}
        weight={700}
        color={colors.unpaired}
        anchor="start"
        opacity={Math.min(b2, fadeIn(frame, B2_PARA))}
      >
        Paramagnetic
      </Text>
    </AbsoluteFill>
  );
}
