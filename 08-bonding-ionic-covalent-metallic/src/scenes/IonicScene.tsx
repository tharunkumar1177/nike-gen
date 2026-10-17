import { spring, useVideoConfig } from "remotion";
import { easeInOut, fadeIn, lerp, pop, progress } from "../components/anim";
import { Chip, PitfallTag, Title } from "../components/Labels";
import { Atom, Electron, Ion } from "../components/Particles";
import { useSceneFrame } from "../components/SceneFrame";
import { Text } from "../components/Text";
import { cue } from "../cues";
import { colors } from "../theme";

const SCENE = "ionic-lattice";

const ROW_Y = 450;
const NA = { x: 300, r: 60 };
const CL = { x: 500, r: 50 };
const ARC = { from: [240, ROW_Y], control: [395, 320], to: [550, ROW_Y] };
const LATTICE = { cx: 1520, cy: ROW_Y, n: 5, pitch: 56, cation: 16, anion: 24 };

function quadratic(t: number, a: number, c: number, b: number) {
  return (1 - t) ** 2 * a + 2 * (1 - t) * t * c + t ** 2 * b;
}

export function IonicScene() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();

  const intro = cue(SCENE, "Ionic bonds usually form");
  const transfer = cue(SCENE, "through electron transfer");
  const cost = cue(SCENE, "Removing an electron from sodium");
  const release = cue(SCENE, "adding it to chlorine");
  const force = cue(SCENE, "real driving force");
  const lattice = cue(SCENE, "massive lattice");
  const huge = cue(SCENE, "releasing huge amounts");
  const formula = cue(SCENE, "Sodium chloride is an extended");
  const molecule = cue(SCENE, "not a discrete molecule");

  const chip = (start: number) => {
    const t = pop(frame, fps, start);
    return { opacity: Math.min(1, t * 1.5), dy: (1 - t) * 20 };
  };
  const tag = (start: number, drift: number) => {
    const t = fadeIn(frame, start);
    return { opacity: t, shift: (1 - t) * drift };
  };

  const atomsIn = fadeIn(frame, intro);
  const hop = progress(frame, transfer, transfer + 60, easeInOut);
  const electronX = quadratic(hop, ARC.from[0]!, ARC.control[0]!, ARC.to[0]!);
  const electronY = quadratic(hop, ARC.from[1]!, ARC.control[1]!, ARC.to[1]!);
  const costTag = tag(cost, 10);
  const releaseTag = tag(release, -10);

  const ionsIn = fadeIn(frame, force);
  const pull = spring({
    frame: frame - force,
    fps,
    config: { damping: 16, stiffness: 80 },
  });
  const dash = progress(frame, force + 20, force + 40);

  const strike = progress(frame, molecule + 15, molecule + 35);
  const pitfall = pop(frame, fps, molecule);
  const panels = fadeIn(frame, 0);

  return (
    <>
      <Title title="Ionic: Electron Transfer" color={colors.ionicText} />
      {[180, 740, 1300].map((x, i) => (
        <Text
          key={x}
          x={x}
          y={300}
          size={48}
          weight={700}
          color={colors.muted}
          opacity={panels}
        >
          {i + 1}
        </Text>
      ))}
      {[720, 1280].map((x) => (
        <div
          key={x}
          style={{
            position: "absolute",
            left: x - 1,
            top: 320,
            width: 2,
            height: 280,
            backgroundColor: "#E5E7EB",
            opacity: panels,
          }}
        />
      ))}

      <Atom x={NA.x} y={ROW_Y} r={NA.r} symbol="Na" opacity={atomsIn} />
      <Atom
        x={CL.x}
        y={ROW_Y}
        r={CL.r}
        symbol="Cl"
        symbolSize={40}
        opacity={atomsIn}
      />
      <Electron x={electronX} y={electronY} opacity={atomsIn} />
      <Text
        x={NA.x}
        y={330 + costTag.shift}
        size={28}
        weight={700}
        color={colors.text}
        opacity={costTag.opacity}
      >
        +496 kJ/mol
      </Text>
      <Text
        x={NA.x}
        y={362 + costTag.shift}
        size={28}
        weight={500}
        color={colors.muted}
        opacity={costTag.opacity}
      >
        Ionization
      </Text>
      <Text
        x={CL.x}
        y={545 + releaseTag.shift}
        size={28}
        weight={700}
        color={colors.text}
        opacity={releaseTag.opacity}
      >
        −349 kJ/mol
      </Text>
      <Text
        x={CL.x}
        y={577 + releaseTag.shift}
        size={28}
        weight={500}
        color={colors.muted}
        opacity={releaseTag.opacity}
      >
        Electron affinity
      </Text>
      <Chip x={400} y={720} {...chip(transfer)}>
        Electron transfer
      </Chip>

      <Ion
        x={lerp(800, 880, pull)}
        y={ROW_Y}
        r={40}
        symbol="Na"
        charge="+"
        symbolSize={32}
        opacity={ionsIn}
      />
      <Ion
        x={lerp(1120, 1040, pull)}
        y={ROW_Y}
        r={70}
        symbol="Cl"
        charge="−"
        opacity={ionsIn}
      />
      <svg
        width={1920}
        height={1080}
        style={{ position: "absolute", left: 0, top: 0 }}
      >
        {dash > 0 ? (
          <line
            x1={922}
            y1={ROW_Y}
            x2={lerp(922, 968, dash)}
            y2={ROW_Y}
            stroke={colors.text}
            strokeWidth={4}
            strokeDasharray="8 6"
          />
        ) : null}
      </svg>
      <Chip x={960} y={720} {...chip(force + 20)}>
        Electrostatic attraction
      </Chip>

      {Array.from({ length: LATTICE.n * LATTICE.n }, (_, k) => {
        const i = k % LATTICE.n;
        const j = Math.floor(k / LATTICE.n);
        const mid = (LATTICE.n - 1) / 2;
        const ring = Math.max(Math.abs(i - mid), Math.abs(j - mid));
        const grow = pop(frame, fps, lattice + ring * 10);
        if (grow <= 0.01) return null;
        const cation = (i + j) % 2 === 0;
        return (
          <Atom
            key={k}
            x={LATTICE.cx + (i - mid) * LATTICE.pitch}
            y={LATTICE.cy + (j - mid) * LATTICE.pitch}
            r={cation ? LATTICE.cation : LATTICE.anion}
            fill={cation ? colors.cation : colors.anion}
            stroke={cation ? colors.cationText : colors.anionText}
            scale={grow}
          />
        );
      })}
      <Chip x={1520} y={640} size={28} {...chip(huge)}>
        Lattice releases far more energy
      </Chip>
      <Chip x={1520} y={720} size={28} {...chip(formula)}>
        Formula unit: NaCl
      </Chip>
      <PitfallTag
        x={1520}
        center
        y={830}
        strike={strike}
        opacity={Math.min(1, pitfall * 1.5)}
        dy={(1 - pitfall) * -30}
      >
        NaCl molecule
      </PitfallTag>
    </>
  );
}
