import { AbsoluteFill, interpolate, useVideoConfig } from "remotion";
import {
  dropped,
  easeInOut,
  fadeIn,
  lerp,
  popped,
  progress,
} from "../components/anim";
import { Canvas, polyline } from "../components/Draw";
import { Pitfall } from "../components/Pitfall";
import { useSceneFrame } from "../components/SceneFrame";
import { Ea, Sup, Text } from "../components/Text";
import { cue } from "../cues";
import { colors, FONT, type } from "../theme";

const SCENE = "collision-theory";
const AT = {
  collide: cue(SCENE, "molecules must physically collide"),
  barrier: cue(SCENE, "activation energy barrier, E a"),
  arrhenius: cue(SCENE, "The Arrhenius equation shows"),
  hotter: cue(SCENE, "Hotter does not just mean"),
  rule: cue(SCENE, "raising the temperature by ten degrees"),
};

const ATOM = 22;
const MOLECULE_Y = 450;
const BOUNCE_PERIOD = 120;

function Diatomic({
  x,
  y,
  angle,
  color,
  fill,
}: {
  x: number;
  y: number;
  angle: number;
  color: string;
  fill: string;
}) {
  const dx = ATOM * 0.9 * Math.cos(angle);
  const dy = ATOM * 0.9 * Math.sin(angle);
  return (
    <g stroke={color} strokeWidth={4} fill={fill}>
      <circle cx={x - dx} cy={y - dy} r={ATOM} />
      <circle cx={x + dx} cy={y + dy} r={ATOM} />
    </g>
  );
}

/** Left vignette: a slow, end-on approach that bounces apart, repeating. */
function Bounce({ frame }: { frame: number }) {
  const t = Math.max(0, frame - AT.collide - 20) % BOUNCE_PERIOD;
  const approach = interpolate(t, [0, 45, 90], [0, 1, 0], {
    extrapolateRight: "clamp",
    easing: easeInOut,
  });
  const gap = lerp(190, 52, approach);
  return (
    <>
      <Diatomic
        x={560 - gap}
        y={MOLECULE_Y}
        angle={Math.PI / 2}
        color={colors.reactant}
        fill={colors.reactantFill}
      />
      <Diatomic
        x={560 + gap}
        y={MOLECULE_Y}
        angle={0}
        color={colors.reactant}
        fill={colors.reactantFill}
      />
    </>
  );
}

/** Right vignette: an aligned, energetic collision that makes products. */
function Reacting({ frame }: { frame: number }) {
  const approach = progress(frame, AT.barrier - 30, AT.barrier, easeInOut);
  const depart = progress(frame, AT.barrier + 10, AT.barrier + 55);
  const changed = progress(frame, AT.barrier, AT.barrier + 20);
  const flash = interpolate(frame, [AT.barrier, AT.barrier + 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const color = changed < 0.5 ? colors.reactant : colors.product;
  const fill = changed < 0.5 ? colors.reactantFill : colors.productFill;
  if (depart <= 0) {
    const gap = lerp(200, 44, approach);
    return (
      <>
        <Diatomic
          x={1360 - gap}
          y={MOLECULE_Y}
          angle={0}
          color={color}
          fill={fill}
        />
        <Diatomic
          x={1360 + gap}
          y={MOLECULE_Y}
          angle={0}
          color={color}
          fill={fill}
        />
        {flash > 0 && flash < 1 ? (
          <circle
            cx={1360}
            cy={MOLECULE_Y}
            r={lerp(30, 110, flash)}
            fill="none"
            stroke={colors.energy}
            strokeWidth={5}
            opacity={1 - flash}
          />
        ) : null}
      </>
    );
  }
  return (
    <>
      <Diatomic
        x={lerp(1360, 1200, depart)}
        y={lerp(MOLECULE_Y, MOLECULE_Y - 40, depart)}
        angle={Math.PI / 2}
        color={colors.product}
        fill={colors.productFill}
      />
      <Diatomic
        x={lerp(1360, 1520, depart)}
        y={lerp(MOLECULE_Y, MOLECULE_Y + 40, depart)}
        angle={Math.PI / 2}
        color={colors.product}
        fill={colors.productFill}
      />
    </>
  );
}

const DIST = { left: 1080, right: 1700, top: 560, bottom: 790 } as const;
const E_MAX = 8;
const E_A = 5;
const energyX = (e: number) =>
  DIST.left + (e / E_MAX) * (DIST.right - DIST.left - 20);
const share = (e: number, kT: number) => (e / (kT * kT)) * Math.exp(-e / kT);
const shareY = (e: number, kT: number) => DIST.bottom - share(e, kT) * 560;
const energies = Array.from({ length: 81 }, (_, i) => (i / 80) * E_MAX);
const curve = (kT: number) =>
  polyline(energies.map((e) => [energyX(e), shareY(e, kT)] as const));
const tail = (kT: number) => {
  const beyond = energies.filter((e) => e >= E_A);
  return `${polyline([
    [energyX(E_A), DIST.bottom] as const,
    ...beyond.map((e) => [energyX(e), shareY(e, kT)] as const),
  ])} L${energyX(E_MAX)} ${DIST.bottom} Z`;
};
const COLD = 1;
const HOT = 1.6;

export function CollisionScene() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();
  const vignettes = fadeIn(frame, AT.collide);
  const label = popped(frame, fps, AT.barrier);
  const arrhenius = dropped(frame, AT.arrhenius);
  const symbols = fadeIn(frame, AT.arrhenius + 25);
  const distribution = fadeIn(frame, AT.hotter);
  const pitfall = dropped(frame, AT.hotter + 10);
  const rule = dropped(frame, AT.rule);
  return (
    <AbsoluteFill>
      <Text
        x={560}
        y={330}
        size={type.small}
        anchor="middle"
        opacity={vignettes}
      >
        too little energy or wrong orientation
      </Text>
      <Text
        x={1360}
        y={330}
        size={type.small}
        anchor="middle"
        opacity={vignettes}
      >
        enough energy and right orientation
      </Text>
      <Canvas opacity={vignettes}>
        <Bounce frame={frame} />
        <Reacting frame={frame} />
      </Canvas>
      <Text
        x={1360}
        y={384}
        size={type.body}
        weight={700}
        color={colors.energy}
        anchor="middle"
        opacity={label.opacity}
        scale={label.scale}
      >
        at least <Ea />
      </Text>
      <Text x={152} y={580} size={type.heading} {...arrhenius}>
        k = A e<Sup>−Ea/RT</Sup>
      </Text>
      <Text x={152} y={648} size={type.small} opacity={symbols}>
        <span style={{ color: colors.energy, fontWeight: 700 }}>
          <Ea />
        </span>{" "}
        activation energy &nbsp;&nbsp;
        <span style={{ color: colors.energy, fontWeight: 700 }}>T</span>{" "}
        temperature
      </Text>
      <Text x={152} y={690} size={type.small} opacity={symbols}>
        <b>R</b> = 8.314 J mol<Sup>−1</Sup> K<Sup>−1</Sup>
      </Text>
      <Canvas opacity={distribution}>
        <path d={tail(HOT)} fill={colors.energy} opacity={0.25} />
        <path d={tail(COLD)} fill={colors.reactant} opacity={0.3} />
        <path
          d={curve(COLD)}
          fill="none"
          stroke={colors.reactant}
          strokeWidth={4}
        />
        <path
          d={curve(HOT)}
          fill="none"
          stroke={colors.energy}
          strokeWidth={4}
        />
        <path
          d={`M${DIST.left} ${DIST.top} V${DIST.bottom} H${DIST.right}`}
          fill="none"
          stroke={colors.text}
          strokeWidth={3}
        />
        <path
          d={`M${energyX(E_A)} ${DIST.top + 10} V${DIST.bottom}`}
          stroke={colors.text}
          strokeWidth={3}
          strokeDasharray="10 8"
        />
      </Canvas>
      <div style={{ opacity: distribution, fontFamily: FONT }}>
        <Text x={energyX(E_A) + 12} y={DIST.top + 4} size={28} weight={700}>
          <Ea />
        </Text>
        <Text
          x={energyX(1) + 30}
          y={shareY(1, COLD) - 10}
          size={28}
          weight={500}
          color={colors.reactant}
        >
          colder
        </Text>
        <Text
          x={energyX(3)}
          y={shareY(3, HOT) - 34}
          size={28}
          weight={500}
          color={colors.energy}
        >
          hotter
        </Text>
        <Text x={DIST.right} y={DIST.bottom + 24} size={24} anchor="end">
          collision energy
        </Text>
      </div>
      <div
        style={{
          position: "absolute",
          left: 152,
          top: 736 + rule.dy,
          padding: "10px 24px",
          borderRadius: 14,
          background: colors.energyFill,
          fontFamily: FONT,
          fontSize: 40,
          fontWeight: 700,
          color: colors.energy,
          opacity: rule.opacity,
          whiteSpace: "nowrap",
        }}
      >
        +10 °C: many rates roughly double
      </div>
      <Pitfall
        top={840}
        left={152}
        width={1648}
        size={38}
        opacity={pitfall.opacity}
      >
        hotter is not just more collisions: a larger fraction has at least{" "}
        <Ea />.
      </Pitfall>
    </AbsoluteFill>
  );
}
