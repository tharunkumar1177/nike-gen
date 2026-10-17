import { AbsoluteFill, useVideoConfig } from "remotion";
import { dropped, fadeIn, popped, progress } from "../components/anim";
import { ArrowLine, Stage } from "../components/Molecule";
import { useSceneFrame } from "../components/SceneFrame";
import { Text, Title } from "../components/Text";
import { cue } from "../cues";
import { colors, FONT, type } from "../theme";

const SCENE = "property-trends";
const TIGHT_AT = cue(SCENE, "more tightly");

const PANEL = { top: 400, height: 480, width: 380 } as const;
const ARROW = { low: 650, high: 520 } as const;

type Panel = { name: string; up: boolean; at: number; notes: string[] };

const PANELS: Panel[] = [
  {
    name: "Boiling point",
    up: true,
    at: cue(SCENE, "higher boiling point"),
    notes: [],
  },
  {
    name: "Viscosity",
    up: true,
    at: cue(SCENE, "higher viscosity"),
    notes: [],
  },
  {
    name: "Surface tension",
    up: true,
    at: cue(SCENE, "higher surface tension"),
    notes: ["water 71.99", "ethanol 21.97", "mN/m at 25 °C"],
  },
  {
    name: "Vapour pressure",
    up: false,
    at: cue(SCENE, "Fewer molecules can escape"),
    notes: [],
  },
];

const DOWN_AT = cue(SCENE, "vapour pressure is lower");
const centreX = (i: number) => 310 + i * 433;

export function TrendsScene() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill>
      <Title opacity={fadeIn(frame, 0)}>Property Trends</Title>
      <Text
        x={960}
        y={300}
        size={type.body}
        anchor="middle"
        color={colors.muted}
        {...dropped(frame, TIGHT_AT)}
      >
        Stronger IMFs hold molecules together more tightly
      </Text>
      {PANELS.map(({ name, at }, i) => (
        <div
          key={name}
          style={{
            position: "absolute",
            left: centreX(i) - PANEL.width / 2,
            top: PANEL.top,
            width: PANEL.width,
            height: PANEL.height,
            borderRadius: 24,
            background: colors.box,
            opacity: fadeIn(frame, at),
          }}
        />
      ))}
      <Stage>
        {PANELS.map(({ name, up, at }, i) => {
          const x = centreX(i);
          const start = up ? at + 10 : DOWN_AT;
          return (
            <ArrowLine
              key={name}
              from={{ x, y: up ? ARROW.low : ARROW.high }}
              to={{ x, y: up ? ARROW.high : ARROW.low }}
              color={up ? colors.dispersion : colors.deltaMinus}
              progress={progress(frame, start, start + 20)}
              width={12}
              head={36}
            />
          );
        })}
      </Stage>
      {PANELS.map(({ name, up, at, notes }, i) => {
        const x = centreX(i);
        const start = up ? at + 10 : DOWN_AT;
        return (
          <div key={name}>
            <Text
              x={x}
              y={455}
              size={40}
              weight={700}
              anchor="middle"
              opacity={fadeIn(frame, at)}
            >
              {name}
            </Text>
            <Text
              x={x}
              y={715}
              size={type.body}
              weight={700}
              anchor="middle"
              color={up ? colors.dispersionText : colors.deltaMinusText}
              {...popped(frame, fps, start + 15)}
            >
              {up ? "Higher" : "Lower"}
            </Text>
            {notes.map((note, j) => (
              <div
                key={note}
                style={{
                  position: "absolute",
                  left: x - PANEL.width / 2,
                  width: PANEL.width,
                  top: 760 + j * 38,
                  textAlign: "center",
                  fontFamily: FONT,
                  fontSize: 28,
                  color: colors.muted,
                  opacity: fadeIn(frame, start + 25 + j * 5),
                }}
              >
                {note}
              </div>
            ))}
          </div>
        );
      })}
    </AbsoluteFill>
  );
}
