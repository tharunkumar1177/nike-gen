import { AbsoluteFill, useVideoConfig } from "remotion";
import { fadeWindow, pop, progress, easeInOut } from "../components/anim";
import { Card, Line, Pill } from "../components/Panels";
import { useSceneFrame } from "../components/SceneFrame";
import { Text } from "../components/Text";
import { cue } from "../cues";
import { domainsFor, morphDomains, normalize } from "../molecules/geometry";
import { Molecules } from "../molecules/Molecules";
import type { MoleculeSpec } from "../molecules/spec";
import { spinPose } from "../molecules/gallery";
import { colors, FONT, type } from "../theme";

const S = "concept-hero" as const;

const FRAGMENTS = [
  { label: "Lone pair", order: 0, cue: "A lone pair" },
  { label: "Single bond", order: 1, cue: "single bond" },
  { label: "Double bond", order: 2, cue: "double bond" },
  { label: "Triple bond", order: 3, cue: "or triple bond" },
] as const;

/** "A" with one domain: a lone pair, or a bond of order 1–3 to "X". */
function DomainFragment({
  x,
  y,
  order,
  opacity,
}: {
  x: number;
  y: number;
  order: 0 | 1 | 2 | 3;
  opacity: number;
}) {
  const size = 72;
  const offsets = order === 1 ? [0] : order === 2 ? [-9, 9] : [-14, 0, 14];
  return (
    <svg
      width={320}
      height={160}
      style={{ position: "absolute", left: x - 160, top: y - 80, opacity }}
    >
      <text
        x={order === 0 ? 130 : 80}
        y={80}
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily={FONT}
        fontWeight={700}
        fontSize={size}
        fill={colors.central}
      >
        A
      </text>
      {order === 0 ? (
        <>
          <circle cx={190} cy={68} r={8} fill={colors.lonePairText} />
          <circle cx={190} cy={92} r={8} fill={colors.lonePairText} />
        </>
      ) : (
        <>
          {offsets.map((o) => (
            <line
              key={o}
              x1={118}
              y1={80 + o}
              x2={202}
              y2={80 + o}
              stroke={colors.text}
              strokeWidth={5}
              strokeLinecap="round"
            />
          ))}
          <text
            x={240}
            y={80}
            textAnchor="middle"
            dominantBaseline="central"
            fontFamily={FONT}
            fontWeight={700}
            fontSize={size}
            fill={colors.other}
          >
            X
          </text>
        </>
      )}
    </svg>
  );
}

export function ConceptScene() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();

  const start = cue(S, "An electron domain is");
  const spread = cue(S, "spread out to minimise repulsion");
  const counting = cue(S, "A lone pair");
  const steric = cue(S, "The steric number");
  const electron = cue(S, "This fixes the electron");
  const molecular = cue(S, "Molecular geometry describes");
  const space = cue(S, "Lone pairs occupy more space");
  const order1 = cue(S, "lone pair lone pair");
  const order2 = cue(S, "then lone pair bonding pair");
  const order3 = cue(S, "then bonding pair bonding pair");

  const heroIn = fadeWindow(frame, start - 30, start, counting - 15, counting);
  const spreadT = progress(frame, spread, spread + 30, easeInOut);
  const ideal = domainsFor("AX3E");
  const clumpAxis = normalize([-1, 0.35, 0.4]);
  const clumped = ideal.map((d) => ({
    ...d,
    dir: normalize([
      d.dir[0] * 0.3 + clumpAxis[0],
      d.dir[1] * 0.3 + clumpAxis[1],
      d.dir[2] * 0.3 + clumpAxis[2],
    ]),
  }));

  const leftIn = fadeWindow(frame, electron, electron + 20, space - 15, space);
  const rightIn = fadeWindow(frame, molecular, molecular + 20, space - 15, space);
  const waterIn = progress(frame, space, space + 20);
  const pulse = (t0: number) =>
    1 + 0.3 * progress(frame, t0, t0 + 20) * (1 - progress(frame, t0 + 40, t0 + 70));

  const specs: MoleculeSpec[] = [
    {
      id: "hero",
      domains: morphDomains(clumped, ideal, spreadT),
      central: "A",
      ligands: "X",
      cx: 960,
      cy: 580,
      size: 560,
      pose: spinPose(frame),
      opacity: heroIn,
      frameOpacity: spreadT,
      lonePairScale:
        1 + 0.3 * progress(frame, spread + 15, spread + 30, easeInOut),
    },
    {
      id: "electron",
      domains: domainsFor("AX3E", 1),
      central: "N",
      ligands: "H",
      cx: 500,
      cy: 600,
      size: 440,
      pose: spinPose(frame),
      opacity: leftIn,
      frameOpacity: 1,
    },
    {
      id: "molecular",
      domains: domainsFor("AX3E", 1),
      central: "N",
      ligands: "H",
      cx: 1420,
      cy: 600,
      size: 440,
      pose: spinPose(frame),
      opacity: rightIn,
      lonePairOpacity: 0,
    },
    {
      id: "water",
      domains: domainsFor("AX2E2", 1),
      central: "O",
      ligands: "H",
      cx: 520,
      cy: 560,
      size: 520,
      pose: spinPose(frame, -30),
      opacity: waterIn,
      lonePairScale: pulse(space + 15),
    },
  ];

  const titleIn = fadeWindow(frame, start - 30, start, counting - 15, counting);
  const fragOut = 1 - progress(frame, steric - 15, steric);
  const sterOn = fadeWindow(frame, steric, steric + 20, electron - 15, electron);
  const orderLine = (t: number) => progress(frame, t, t + 20);

  return (
    <AbsoluteFill>
      <Molecules specs={specs} />
      <Text x={960} y={170} size={type.subtitle} weight={500} opacity={titleIn}>
        Electron domains spread out to minimise repulsion
      </Text>

      {FRAGMENTS.map((f, i) => {
        const t = cue(S, f.cue);
        const x = 384 * (i + 1);
        const on = progress(frame, t, t + 15) * fragOut;
        return (
          <div key={f.label}>
            <Text x={x} y={330} size={type.body} weight={500} opacity={on}>
              {f.label}
            </Text>
            <DomainFragment x={x} y={520} order={f.order} opacity={on} />
            <Pill
              x={x}
              y={680}
              color={colors.angle}
              opacity={progress(frame, t + 10, t + 25) * fragOut}
              scale={0.8 + 0.2 * pop(frame, fps, t + 10)}
            >
              1 domain
            </Pill>
          </div>
        );
      })}

      <Card cx={960} cy={540} width={1400} opacity={sterOn} scale={0.9 + 0.1 * pop(frame, fps, steric)}>
        <Line size={type.subtitle} weight={700} color={colors.highlight}>
          Steric number = bonded atoms + lone pairs
        </Line>
      </Card>

      <Text x={500} y={210} size={type.body} weight={500} opacity={leftIn}>
        Electron-domain geometry
      </Text>
      <Text x={500} y={280} size={type.body} weight={700} color={colors.angle} opacity={leftIn}>
        tetrahedral
      </Text>
      <Text x={1420} y={210} size={type.body} weight={500} opacity={rightIn}>
        Molecular geometry
      </Text>
      <Text x={1420} y={280} size={type.body} weight={700} color={colors.angle} opacity={rightIn}>
        trigonal pyramidal
      </Text>

      <Text x={1300} y={300} size={type.subtitle} weight={700} opacity={waterIn}>
        Repulsion order
      </Text>
      <Text x={1300} y={450} size={type.body} weight={500} color={colors.pitfall} opacity={orderLine(order1)}>
        1. Lone pair – lone pair
      </Text>
      <Text x={1300} y={550} size={type.body} weight={500} color={colors.lonePairText} opacity={orderLine(order2)}>
        2. Lone pair – bonding pair
      </Text>
      <Text x={1300} y={650} size={type.body} weight={500} color={colors.muted} opacity={orderLine(order3)}>
        3. Bonding pair – bonding pair
      </Text>
    </AbsoluteFill>
  );
}
