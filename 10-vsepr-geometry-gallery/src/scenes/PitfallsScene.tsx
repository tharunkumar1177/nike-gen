import { AbsoluteFill, useVideoConfig } from "remotion";
import { pop, progress } from "../components/anim";
import { Chem } from "../components/Chem";
import { Lewis2D, lewisAnchors } from "../components/Lewis2D";
import { Pill, Struck } from "../components/Panels";
import { useSceneFrame } from "../components/SceneFrame";
import { Text } from "../components/Text";
import { cue } from "../cues";
import { domainsFor } from "../molecules/geometry";
import { spinPose } from "../molecules/gallery";
import { Molecules } from "../molecules/Molecules";
import { colors, FONT, type } from "../theme";

const S = "pitfalls" as const;

const BOX = { left: 160, top: 130, width: 1600, height: 800 } as const;
const ROWS = [345, 560, 775] as const;
const TEXT_X = 230;
const CO2 = { cx: 1480, cy: ROWS[0] + 15, bond: 120, fontSize: 48 } as const;

function Cross({
  x,
  y,
  size,
  opacity,
}: {
  x: number;
  y: number;
  size: number;
  opacity: number;
}) {
  const h = size / 2;
  return (
    <svg
      width={size}
      height={size}
      style={{ position: "absolute", left: x - h, top: y - h, opacity }}
    >
      <path
        d={`M ${size * 0.15} ${size * 0.15} L ${size * 0.85} ${size * 0.85} M ${size * 0.85} ${size * 0.15} L ${size * 0.15} ${size * 0.85}`}
        stroke={colors.pitfall}
        strokeWidth={size * 0.09}
        strokeLinecap="round"
      />
    </svg>
  );
}

function Check({
  x,
  y,
  size,
  opacity,
}: {
  x: number;
  y: number;
  size: number;
  opacity: number;
}) {
  const h = size / 2;
  return (
    <svg
      width={size}
      height={size}
      style={{ position: "absolute", left: x - h, top: y - h, opacity }}
    >
      <path
        d={`M ${size * 0.15} ${size * 0.55} L ${size * 0.4} ${size * 0.8} L ${size * 0.85} ${size * 0.2}`}
        fill="none"
        stroke={colors.angle}
        strokeWidth={size * 0.12}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Row({
  y,
  opacity,
  title,
  detail,
}: {
  y: number;
  opacity: number;
  title: string;
  detail: string;
}) {
  return (
    <div
      style={{
        position: "absolute",
        left: TEXT_X,
        top: y,
        transform: `translate(${(1 - opacity) * 30}px, -50%)`,
        opacity,
        fontFamily: FONT,
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      <div style={{ fontSize: 44, fontWeight: 700, color: colors.text }}>
        {title}
      </div>
      <div style={{ fontSize: type.label, color: colors.muted }}>
        <Chem>{detail}</Chem>
      </div>
    </div>
  );
}

export function PitfallsScene() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();
  const box = cue(S, "Watch out for common pitfalls");
  const row1 = cue(S, "Do not count a double");
  const tags = cue(S, "C O two is steric");
  const row2 = cue(S, "Do not name the electron");
  const linearWord = cue(S, "predict H two O is linear");
  const row3 = cue(S, "Finally do not put");
  const looks = cue(S, "just because they look");

  const boxIn = progress(frame, box - 10, box + 10);
  const r1 = progress(frame, row1, row1 + 20);
  const r2 = progress(frame, row2, row2 + 20);
  const r3 = progress(frame, row3, row3 + 20);
  const anchors = lewisAnchors("CO2", CO2);

  const wrong = domainsFor("AX5").map((d, i) =>
    i === 0 ? { ...d, atom: 0 } : d,
  );

  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          ...BOX,
          boxSizing: "border-box",
          borderRadius: 24,
          background: colors.card,
          border: `2px solid ${colors.pitfall}`,
          borderTop: `14px solid ${colors.pitfall}`,
          opacity: boxIn,
          transform: `scale(${0.95 + 0.05 * pop(frame, fps, box - 10)})`,
        }}
      />
      <Text
        x={TEXT_X}
        y={200}
        anchor="start"
        size={type.subtitle}
        weight={700}
        color={colors.pitfall}
        opacity={boxIn}
      >
        Common pitfalls
      </Text>
      <Molecules
        specs={[
          {
            id: "water",
            domains: domainsFor("AX2E2", 1),
            central: "O",
            ligands: "H",
            cx: 1380,
            cy: ROWS[1],
            size: 200,
            pose: spinPose(frame, -30),
            opacity: r2,
          },
          {
            id: "axial",
            domains: wrong,
            central: "S",
            ligands: "F",
            cx: 1340,
            cy: ROWS[2],
            size: 180,
            pose: spinPose(frame, 30),
            opacity: r3,
          },
          {
            id: "equatorial",
            domains: domainsFor("AX4E", 1),
            central: "S",
            ligands: "F",
            cx: 1580,
            cy: ROWS[2],
            size: 180,
            pose: spinPose(frame, 30),
            opacity: r3,
          },
        ]}
      />

      <Row
        y={ROWS[0]}
        opacity={r1}
        title="A double or triple bond is one domain"
        detail="CO₂ has steric number 2, so it is linear"
      />
      <Lewis2D name="CO2" {...CO2} opacity={r1} />
      {anchors.bonds.map((p, i) => (
        <Pill
          key={i}
          x={p.x}
          y={p.y + (i === 0 ? -70 : 70)}
          color={colors.angle}
          size={28}
          opacity={progress(frame, tags + i * 10, tags + i * 10 + 15)}
          scale={0.8 + 0.2 * pop(frame, fps, tags + i * 10)}
        >
          1 domain
        </Pill>
      ))}

      <Row
        y={ROWS[1]}
        opacity={r2}
        title="Name the molecular geometry"
        detail="not the electron geometry, and never ignore lone pairs"
      />
      <div
        style={{
          position: "absolute",
          left: 1560,
          top: ROWS[1],
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: 6,
          fontFamily: FONT,
          fontSize: type.label,
          opacity: r2,
        }}
      >
        <div style={{ fontWeight: 700, color: colors.angle }}>bent</div>
        <div style={{ color: colors.muted }}>
          <Struck
            strike={progress(frame, row2 + 25, row2 + 40)}
            color={colors.pitfall}
          >
            tetrahedral
          </Struck>
        </div>
        <div style={{ color: colors.muted }}>
          <Struck
            strike={progress(frame, linearWord + 10, linearWord + 25)}
            color={colors.pitfall}
          >
            linear
          </Struck>
        </div>
      </div>

      <Row
        y={ROWS[2]}
        opacity={r3}
        title="SN 5 lone pairs go equatorial"
        detail="an axial lone pair meets three domains at 90°"
      />
      <Cross
        x={1340}
        y={ROWS[2]}
        size={190}
        opacity={0.85 * progress(frame, looks, looks + 15)}
      />
      <Check
        x={1660}
        y={ROWS[2] - 70}
        size={64}
        opacity={progress(frame, looks + 15, looks + 30)}
      />
    </AbsoluteFill>
  );
}
