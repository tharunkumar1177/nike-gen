import { AbsoluteFill, useVideoConfig } from "remotion";
import { fadeIn, lerp, popped, progress } from "../components/anim";
import { Beaker } from "../components/Beaker";
import { Chip } from "../components/Chip";
import { Pitfall } from "../components/Pitfall";
import { useSceneFrame } from "../components/SceneFrame";
import { Arrow, F, Frac, Sub, Sup, Text } from "../components/Text";
import { cue } from "../cues";
import { colors, HEADING_Y, SAFE, type } from "../theme";

const BUFFER_AT = cue("buffer-mechanism", "A buffer contains");
const OH_AT = cue("buffer-mechanism", "the acid neutralizes added O H minus");
const H_AT = cue("buffer-mechanism", "the base neutralizes added H plus");
const PITFALL_AT = cue(
  "buffer-mechanism",
  "does not hold p H perfectly constant",
);
const HH_AT = cue("buffer-mechanism", "The Henderson Hasselbalch equation");

const BEAKER = { x: 160, y: 270, width: 300, height: 330 } as const;
const EQ_X = 600;

function Minus() {
  return <Sup>−</Sup>;
}

const PARTICLES = Array.from({ length: 6 }, (_, i) => ({
  species: i % 2 === 0 ? ("acid" as const) : ("base" as const),
  x: BEAKER.x + 70 + (i % 3) * 80,
  y: BEAKER.y + 170 + Math.floor(i / 3) * 80,
}));

function slid(frame: number, start: number) {
  const t = progress(frame, start, start + 20);
  return { opacity: t, x: lerp(EQ_X + 50, EQ_X, t) };
}

const HA = <span style={{ color: colors.acidText }}>HA</span>;
const A = (
  <span style={{ color: colors.baseText }}>
    A<Minus />
  </span>
);

export function BufferMechanismScene() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();
  const buffer = fadeIn(frame, BUFFER_AT);
  const oh = slid(frame, OH_AT);
  const h = slid(frame, H_AT);
  const pitfall = popped(frame, fps, PITFALL_AT);
  return (
    <AbsoluteFill>
      <Text
        x={SAFE}
        y={HEADING_Y}
        size={type.subtitle}
        weight={700}
        {...popped(frame, fps, 0)}
      >
        How a Buffer Works
      </Text>
      <Beaker
        x={BEAKER.x}
        y={BEAKER.y}
        width={BEAKER.width}
        height={BEAKER.height}
        opacity={buffer}
      >
        {PARTICLES.map((p, i) => (
          <Chip key={i} species={p.species} x={p.x} y={p.y} radius={32}>
            {p.species === "acid" ? "HA" : A}
          </Chip>
        ))}
      </Beaker>
      <Text
        x={BEAKER.x + BEAKER.width / 2}
        y={BEAKER.y - 30}
        size={28}
        weight={500}
        color={colors.muted}
        anchor="middle"
        opacity={buffer}
      >
        weak acid + conjugate base
      </Text>
      <Text x={oh.x} y={340} size={type.body} weight={700} opacity={oh.opacity}>
        <span style={{ color: colors.hydroxide }}>
          OH
          <Minus />
        </span>{" "}
        + {HA}
        <Arrow />
        {A} + <F>H2O</F>
      </Text>
      <Text x={h.x} y={470} size={type.body} weight={700} opacity={h.opacity}>
        <span style={{ color: colors.hydroniumText }}>
          H<Sup>+</Sup>
        </span>{" "}
        + {A}
        <Arrow />
        {HA}
      </Text>
      <Pitfall
        top={660}
        width={1200}
        opacity={pitfall.opacity}
        scale={pitfall.scale}
      >
        a buffer resists pH change; it does not hold pH constant.
      </Pitfall>
      <Text
        x={SAFE}
        y={860}
        size={type.body}
        weight={700}
        opacity={fadeIn(frame, HH_AT)}
      >
        pH = pK<Sub>a</Sub> + log
        <Frac num={<>[{A}]</>} den={<>[{HA}]</>} />
      </Text>
    </AbsoluteFill>
  );
}
