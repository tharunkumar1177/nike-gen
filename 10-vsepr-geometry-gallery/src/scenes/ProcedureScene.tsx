import { AbsoluteFill } from "remotion";
import { easeInOut, fadeWindow, progress } from "../components/anim";
import { Lewis2D } from "../components/Lewis2D";
import { useSceneFrame } from "../components/SceneFrame";
import { Text } from "../components/Text";
import { cue } from "../cues";
import { domainsFor, morphDomains } from "../molecules/geometry";
import { Molecules } from "../molecules/Molecules";
import type { ArcSpec } from "../molecules/spec";
import { blendPose, eulerPose, facePose } from "../molecules/view";
import { spinPose } from "../molecules/gallery";
import { colors, FONT, type } from "../theme";

const S = "procedure-steps" as const;

const STEPS = [
  { text: "Draw the Lewis structure", cue: "First draw the Lewis" },
  { text: "Count domains → steric number", cue: "Second count electron" },
  { text: "Pick the electron geometry", cue: "Third pick the" },
  { text: "Place lone pairs with most room", cue: "Fourth place lone" },
  { text: "Name the molecular geometry", cue: "Fifth name the" },
  { text: "Expect smaller angles near lone pairs", cue: "Sixth expect angles" },
] as const;

const STEP_X = 880;
const STEP_Y0 = 300;
const STEP_DY = 100;

export function ProcedureScene() {
  const frame = useSceneFrame();
  const at = STEPS.map((s) => cue(S, s.cue));
  const [lewis, count, pick, place, name, expect] = at as [
    number,
    number,
    number,
    number,
    number,
    number,
  ];
  const title = cue(S, "follow six steps");

  const lewisIn = fadeWindow(frame, lewis, lewis + 20, pick - 15, pick);
  const countIn = fadeWindow(frame, count, count + 20, pick - 15, pick);
  const molIn = progress(frame, pick, pick + 20);
  const morph = progress(frame, place, place + 30, easeInOut);
  const squeeze = progress(frame, expect, expect + 30, easeInOut);
  const domains = morphDomains(
    domainsFor("AX5"),
    domainsFor("AX4E", squeeze),
    morph,
  );
  const measured = domainsFor("AX4E", 1);
  const downAxis = facePose(
    measured[3]?.dir ?? [1, 0, 0],
    measured[4]?.dir ?? [-1, 0, 0],
    [-1, 0, 0],
  );
  const pose = blendPose(
    blendPose(
      spinPose(frame, 40),
      eulerPose(0, 90),
      progress(frame, expect - 20, expect + 10, easeInOut),
    ),
    downAxis,
    progress(frame, expect + 70, expect + 100, easeInOut),
  );
  const arcs: ArcSpec[] = [
    {
      a: 0,
      b: 1,
      via: [0, 0, -1],
      label: "173.1°",
      progress: progress(frame, expect + 15, expect + 45),
      opacity: 1 - progress(frame, expect + 60, expect + 75),
      radius: 0.5,
    },
    {
      a: 3,
      b: 4,
      label: "101.6°",
      progress: progress(frame, expect + 100, expect + 130),
    },
  ];

  const caption = (() => {
    if (frame >= name) {
      return { text: "seesaw", color: colors.angle, t: name };
    }
    if (frame >= place) {
      return {
        text: "lone pair goes equatorial",
        color: colors.lonePairText,
        t: place,
      };
    }
    return { text: "trigonal bipyramidal", color: colors.text, t: pick };
  })();
  const captionIn = progress(frame, caption.t, caption.t + 15);

  return (
    <AbsoluteFill>
      <Molecules
        specs={[
          {
            id: "sf4",
            domains,
            central: "S",
            ligands: "F",
            cx: 450,
            cy: 480,
            size: 480,
            pose,
            opacity: molIn,
            frameOpacity: 1 - progress(frame, name, name + 20),
            arcs: arcs.filter(
              (arc) => (arc.progress ?? 0) > 0 && (arc.opacity ?? 1) > 0,
            ),
          },
        ]}
      />
      <Text
        x={960}
        y={150}
        size={type.subtitle}
        weight={700}
        opacity={progress(frame, title - 20, title)}
      >
        Predicting a shape in six steps
      </Text>
      <Lewis2D
        name="SF4"
        cx={450}
        cy={500}
        bond={150}
        fontSize={64}
        opacity={lewisIn}
      />
      <Text
        x={450}
        y={800}
        size={40}
        weight={500}
        color={colors.highlight}
        opacity={countIn}
      >
        4 bonds + 1 lone pair = SN 5
      </Text>
      <Text
        x={450}
        y={820}
        size={type.body}
        weight={700}
        color={caption.color}
        opacity={molIn * captionIn}
      >
        {caption.text}
      </Text>
      {STEPS.map((step, i) => {
        const t = at[i] ?? 0;
        const on = progress(frame, t, t + 20);
        const active =
          frame >= t &&
          (i === STEPS.length - 1 || frame < (at[i + 1] ?? Infinity));
        return (
          <div
            key={step.text}
            style={{
              position: "absolute",
              left: STEP_X,
              top: STEP_Y0 + i * STEP_DY,
              transform: `translate(${(1 - on) * 40}px, -50%)`,
              opacity: on,
              display: "flex",
              alignItems: "center",
              gap: 24,
              fontFamily: FONT,
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                background: active ? colors.highlight : colors.card,
                border: `2px solid ${active ? colors.highlight : colors.cardBorder}`,
                color: active ? "#FFFFFF" : colors.text,
                fontSize: type.label,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {i + 1}
            </div>
            <div
              style={{
                fontSize: 42,
                fontWeight: active ? 700 : 400,
                color: colors.text,
                whiteSpace: "nowrap",
              }}
            >
              {step.text}
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
}
