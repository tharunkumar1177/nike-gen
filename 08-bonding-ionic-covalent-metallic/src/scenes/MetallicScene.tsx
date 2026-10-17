import { spring, useVideoConfig } from "remotion";
import { fadeIn, pop, progress, seeded } from "../components/anim";
import { Chip, Title } from "../components/Labels";
import { Atom, Electron } from "../components/Particles";
import { useSceneFrame } from "../components/SceneFrame";
import { Text } from "../components/Text";
import { cue } from "../cues";
import { colors } from "../theme";

const SCENE = "metallic-sea";

const BOX = { left: 480, top: 290, width: 960, height: 440 };
const GRID = { cols: 6, rows: 4, x0: 610, y0: 345, dx: 140, dy: 110, r: 40 };
const SHEAR = 70;
const ELECTRONS = 36;
const WOBBLE = { x: 40, y: 25 };
const INSET = 10;
const CURRENT_SPEED = 5;
const RAMP = 30;

const electrons = Array.from({ length: ELECTRONS }, (_, i) => ({
  x: BOX.left + INSET + seeded(i + 1) * (BOX.width - 2 * INSET),
  y:
    BOX.top +
    WOBBLE.y +
    INSET +
    seeded(i + 101) * (BOX.height - 2 * (WOBBLE.y + INSET)),
  fx: 0.6 + seeded(i + 201) * 0.8,
  fy: 0.6 + seeded(i + 301) * 0.8,
  px: seeded(i + 401) * Math.PI * 2,
  py: seeded(i + 501) * Math.PI * 2,
}));

/** Rightward displacement after `frame` while the current ramps up over `RAMP` frames. */
function currentShift(frame: number, start: number) {
  const t = frame - start;
  if (t <= 0) return 0;
  if (t <= RAMP) return (CURRENT_SPEED * t * t) / (2 * RAMP);
  return (CURRENT_SPEED * RAMP) / 2 + CURRENT_SPEED * (t - RAMP);
}

function wrap(x: number) {
  const span = BOX.width - 2 * INSET;
  const min = BOX.left + INSET;
  return min + ((((x - min) % span) + span) % span);
}

export function MetallicScene() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();

  const cores = cue(SCENE, "lattice of positive ion cores");
  const sea = cue(SCENE, "sea of delocalized valence electrons");
  const move = cue(SCENE, "move freely");
  const bend = cue(SCENE, "can bend");
  const conduct = cue(SCENE, "conduct electricity");

  const chip = (start: number) => {
    const t = pop(frame, fps, start);
    return { opacity: Math.min(1, t * 1.5), dy: (1 - t) * 20 };
  };

  const box = pop(frame, fps, cores);
  const shear = spring({
    frame: frame - bend,
    fps,
    config: { mass: 1, damping: 16, stiffness: 80 },
  });
  const seaIn = fadeIn(frame, sea);
  const wobble = progress(frame, move, move + 30);
  const drifting = Math.max(0, frame - move);
  const current = currentShift(frame, conduct);
  const arrowIn = fadeIn(frame, conduct);
  const arrowPulse = progress(frame, conduct + 20, conduct + 50);
  const arrowScale = 1 + 0.08 * Math.sin(Math.PI * arrowPulse);

  return (
    <>
      <Title title="Metallic: Electron Sea" color={colors.metallicText} />
      {box > 0.01 ? (
        <div
          style={{
            position: "absolute",
            left: BOX.left,
            top: BOX.top,
            width: BOX.width,
            height: BOX.height,
            boxSizing: "border-box",
            border: `4px solid ${colors.metallic}`,
            borderRadius: 24,
            backgroundColor: "#FFF7ED",
            transform: `scale(${box})`,
          }}
        />
      ) : null}
      {Array.from({ length: GRID.cols * GRID.rows }, (_, k) => {
        const col = k % GRID.cols;
        const row = Math.floor(k / GRID.cols);
        const rowIn = fadeIn(frame, cores + 10 + row * 10);
        const offset = row < 2 ? SHEAR * shear : 0;
        return (
          <Atom
            key={k}
            x={GRID.x0 + col * GRID.dx + offset}
            y={GRID.y0 + row * GRID.dy}
            r={GRID.r}
            symbol="+"
            fill={colors.cation}
            stroke={colors.cationText}
            textColor="#FFFFFF"
            opacity={rowIn}
          />
        );
      })}
      {electrons.map((e, i) => {
        const x =
          e.x +
          wobble * WOBBLE.x * Math.sin((drifting / 45) * e.fx + e.px) +
          current;
        const y =
          e.y + wobble * WOBBLE.y * Math.sin((drifting / 38) * e.fy + e.py);
        return <Electron key={i} x={wrap(x)} y={y} opacity={seaIn} />;
      })}
      <Chip x={640} y={810} color={colors.cationText} {...chip(cores + 20)}>
        Positive ion cores
      </Chip>
      <Chip x={1240} y={810} color={colors.electronText} {...chip(sea)}>
        Delocalized valence electrons
      </Chip>
      {arrowIn > 0 ? (
        <svg
          width={1920}
          height={1080}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            opacity: arrowIn,
          }}
        >
          <g
            transform={`translate(940 905) scale(${arrowScale}) translate(-940 -905)`}
          >
            <line
              x1={760}
              y1={905}
              x2={1090}
              y2={905}
              stroke={colors.electron}
              strokeWidth={8}
              strokeLinecap="round"
            />
            <polygon
              points="1120,905 1086,885 1086,925"
              fill={colors.electron}
            />
          </g>
        </svg>
      ) : null}
      <Text
        x={1150}
        y={905}
        size={32}
        weight={700}
        anchor="start"
        color={colors.electronText}
        opacity={arrowIn}
      >
        Current
      </Text>
    </>
  );
}
