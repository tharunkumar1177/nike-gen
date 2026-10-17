import { spring, useVideoConfig } from "remotion";
import { fadeIn, pop, progress } from "../components/anim";
import { Chip, Title } from "../components/Labels";
import { Atom, Electron } from "../components/Particles";
import { useSceneFrame } from "../components/SceneFrame";
import { Text } from "../components/Text";
import { cue } from "../cues";
import { colors, FONT } from "../theme";

const SCENE = "properties-pitfalls";

const COLS = 6;
const ROWS = 4;
const PITCH = 56;
const NACL = { cx: 480, cy: 400 };
const CU = { cx: 1440, cy: 400 };
const SPLIT = 15;

const CRACK = [
  [480, 270],
  [470, 320],
  [492, 370],
  [468, 420],
  [490, 470],
  [480, 530],
];

const gridX = (cx: number, col: number) => cx + (col - (COLS - 1) / 2) * PITCH;
const gridY = (cy: number, row: number) => cy + (row - (ROWS - 1) / 2) * PITCH;

export function PropertiesScene() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();

  const intro = cue(SCENE, "Bonding determines bulk properties");
  const brittle = cue(SCENE, "is brittle");
  const molten = cue(SCENE, "conducts only when molten");
  const malleable = cue(SCENE, "is malleable");
  const solid = cue(SCENE, "conducts as a solid");
  const pitfall = cue(SCENE, "A common pitfall");
  const hf = cue(SCENE, "Hydrogen fluoride has");

  const chip = (start: number) => {
    const t = pop(frame, fps, start);
    return { opacity: Math.min(1, t * 1.5), dy: (1 - t) * 20 };
  };

  const latticeIn = fadeIn(frame, intro);
  const crack = progress(frame, brittle, brittle + 10);
  const split = spring({
    frame: frame - brittle - 10,
    fps,
    config: { damping: 18, stiffness: 120 },
  });
  const slide = spring({
    frame: frame - malleable,
    fps,
    config: { damping: 16, stiffness: 80 },
  });
  const boxIn = fadeIn(frame, pitfall);
  const exampleIn = fadeIn(frame, hf);
  const emphasis = progress(frame, hf + 20, hf + 50);
  const emphasisScale = 1 + 0.06 * Math.sin(Math.PI * emphasis);

  const cells = Array.from({ length: COLS * ROWS }, (_, k) => ({
    col: k % COLS,
    row: Math.floor(k / COLS),
    key: k,
  }));

  return (
    <>
      <Title title="Properties & Exceptions" />

      <Text
        x={220}
        y={NACL.cy}
        size={40}
        weight={700}
        color={colors.ionicText}
        opacity={latticeIn}
      >
        NaCl
      </Text>
      {cells.map(({ col, row, key }) => {
        const cation = (col + row) % 2 === 0;
        const side = col < COLS / 2 ? -1 : 1;
        return (
          <Atom
            key={key}
            x={gridX(NACL.cx, col) + side * SPLIT * split}
            y={gridY(NACL.cy, row)}
            r={cation ? 16 : 24}
            fill={cation ? colors.cation : colors.anion}
            stroke={cation ? colors.cationText : colors.anionText}
            opacity={latticeIn}
          />
        );
      })}
      <svg
        width={1920}
        height={1080}
        style={{ position: "absolute", left: 0, top: 0 }}
      >
        {crack > 0 ? (
          <polyline
            points={CRACK.map(([x, y]) => `${x},${y}`).join(" ")}
            fill="none"
            stroke={colors.text}
            strokeWidth={4}
            strokeLinejoin="round"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1 - crack}
          />
        ) : null}
      </svg>
      <Chip x={NACL.cx} y={600} color={colors.ionicText} {...chip(brittle)}>
        Brittle
      </Chip>
      <Chip x={NACL.cx} y={680} {...chip(molten)}>
        mp 801 °C
      </Chip>
      <Chip x={NACL.cx} y={760} {...chip(molten + 10)}>
        Conducts when molten or dissolved
      </Chip>

      <Text
        x={1180}
        y={CU.cy}
        size={40}
        weight={700}
        color={colors.metallicText}
        opacity={latticeIn}
      >
        Cu
      </Text>
      <div
        style={{
          position: "absolute",
          left: 1260,
          top: 270,
          width: 420,
          height: 260,
          boxSizing: "border-box",
          border: `4px solid ${colors.metallic}`,
          borderRadius: 20,
          backgroundColor: "#FFF7ED",
          opacity: latticeIn,
        }}
      />
      {cells.map(({ col, row, key }) => {
        const shift = row < 2 ? PITCH * slide : 0;
        return (
          <Atom
            key={key}
            x={gridX(CU.cx, col) + shift}
            y={gridY(CU.cy, row)}
            r={20}
            symbol="+"
            symbolSize={24}
            fill={colors.cation}
            stroke={colors.cationText}
            textColor="#FFFFFF"
            opacity={latticeIn}
          />
        );
      })}
      {cells
        .filter(({ col, row }) => col < COLS - 1 && row < ROWS - 1)
        .map(({ col, row, key }) => (
          <Electron
            key={key}
            x={gridX(CU.cx, col) + PITCH / 2}
            y={gridY(CU.cy, row) + PITCH / 2}
            r={6}
            opacity={latticeIn}
          />
        ))}
      <Chip x={CU.cx} y={600} color={colors.metallicText} {...chip(malleable)}>
        Malleable
      </Chip>
      <Chip x={CU.cx} y={680} {...chip(solid)}>
        mp 1084.62 °C
      </Chip>
      <Chip x={CU.cx} y={760} {...chip(solid + 10)}>
        Conducts as a solid
      </Chip>

      {boxIn > 0 ? (
        <div
          style={{
            position: "absolute",
            left: 260,
            top: 830,
            width: 1400,
            height: 126,
            boxSizing: "border-box",
            border: `4px solid ${colors.pitfallBorder}`,
            borderRadius: 16,
            backgroundColor: colors.pitfallFill,
            opacity: boxIn,
            fontFamily: FONT,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <div
            style={{ fontSize: 32, fontWeight: 700, color: colors.pitfallText }}
          >
            Pitfall: ΔEN cutoffs are a guide, not a law
          </div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 400,
              color: colors.text,
              opacity: exampleIn,
            }}
          >
            H–F: ΔEN <Emphasis scale={emphasisScale}>1.9</Emphasis>, yet a{" "}
            <Emphasis scale={emphasisScale}>polar covalent</Emphasis> molecule
          </div>
        </div>
      ) : null}
    </>
  );
}

function Emphasis({ scale, children }: { scale: number; children: string }) {
  return (
    <span
      style={{
        display: "inline-block",
        fontWeight: 700,
        transform: `scale(${scale})`,
      }}
    >
      {children}
    </span>
  );
}
