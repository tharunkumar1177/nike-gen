import { useVideoConfig } from "remotion";
import { fadeIn, pop } from "../components/anim";
import { Chip, Title } from "../components/Labels";
import {
  AtomSymbol,
  Bond,
  bondOrder,
  ChargeBadge,
  LonePairs,
  SIDE,
  Stage,
} from "../components/Lewis";
import { useSceneFrame } from "../components/SceneFrame";
import { Text } from "../components/Text";
import { cue } from "../cues";
import { colors, SAFE, type } from "../theme";

const SCENE = "formal-charge-co2";

const Y = 650;
const A = { o1: { x: 320, y: Y }, c: { x: 500, y: Y }, o2: { x: 680, y: Y } };
const B = {
  o1: { x: 1240, y: Y },
  c: { x: 1420, y: Y },
  o2: { x: 1600, y: Y },
};

export function FormalChargeScene() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();

  const intro = cue(SCENE, "When multiple structures are possible");
  const formula = cue(SCENE, "Formal charge is the valence electrons");
  const legend = cue(SCENE, "minus nonbonding electrons minus half");
  const first = cue(SCENE, "a structure with two double bonds");
  const zeros = cue(SCENE, "gives all atoms a formal charge of zero");
  const second = cue(SCENE, "A structure with a triple and single bond");
  const charges = cue(SCENE, "charges of plus one and minus one");
  const preferred = cue(SCENE, "all zero formal charges is preferred");

  const badge = (start: number) => {
    const t = pop(frame, fps, start);
    return { opacity: Math.min(1, t * 1.5), scale: t };
  };

  const structureA = fadeIn(frame, first);
  const structureB = fadeIn(frame, second);
  const highlight = fadeIn(frame, preferred);
  const chip = pop(frame, fps, preferred + 10);

  return (
    <>
      <Title title="Formal Charge" opacity={fadeIn(frame, intro)} />
      <Text
        x={SAFE}
        y={330}
        size={type.body}
        weight={700}
        anchor="start"
        opacity={fadeIn(frame, formula)}
      >
        FC = V − N − B/2
      </Text>
      <Text
        x={SAFE}
        y={395}
        size={type.label}
        anchor="start"
        color={colors.muted}
        opacity={fadeIn(frame, legend)}
      >
        V valence electrons · N nonbonding electrons · B bonding electrons
      </Text>

      {highlight > 0 ? (
        <div
          style={{
            position: "absolute",
            left: 200,
            top: 520,
            width: 600,
            height: 360,
            boxSizing: "border-box",
            borderRadius: 24,
            backgroundColor: colors.highlight,
            border: `4px solid ${colors.bond}`,
            opacity: highlight,
          }}
        />
      ) : null}

      <Stage opacity={structureA}>
        <AtomSymbol {...A.o1} symbol="O" />
        <AtomSymbol {...A.c} symbol="C" />
        <AtomSymbol {...A.o2} symbol="O" />
        <Bond from={A.o1} to={A.c} lines={bondOrder(2)} />
        <Bond from={A.c} to={A.o2} lines={bondOrder(2)} />
        <LonePairs atom={A.o1} angles={[SIDE.top, SIDE.bottom]} />
        <LonePairs atom={A.o2} angles={[SIDE.top, SIDE.bottom]} />
      </Stage>
      <Stage>
        <ChargeBadge atom={A.o1} value={0} {...badge(zeros)} />
        <ChargeBadge atom={A.c} value={0} {...badge(zeros + 6)} />
        <ChargeBadge atom={A.o2} value={0} {...badge(zeros + 12)} />
      </Stage>

      <Stage opacity={structureB}>
        <AtomSymbol {...B.o1} symbol="O" />
        <AtomSymbol {...B.c} symbol="C" />
        <AtomSymbol {...B.o2} symbol="O" />
        <Bond from={B.o1} to={B.c} lines={bondOrder(3)} />
        <Bond from={B.c} to={B.o2} lines={bondOrder(1)} />
        <LonePairs atom={B.o1} angles={[SIDE.left]} />
        <LonePairs atom={B.o2} angles={[SIDE.top, SIDE.right, SIDE.bottom]} />
      </Stage>
      <Stage>
        <ChargeBadge atom={B.o1} value={1} {...badge(charges)} />
        <ChargeBadge atom={B.c} value={0} {...badge(charges + 6)} />
        <ChargeBadge atom={B.o2} value={-1} {...badge(charges + 12)} />
      </Stage>

      <Text
        x={B.o2.x}
        y={790}
        size={type.label}
        color={colors.negative}
        opacity={fadeIn(frame, charges + 20)}
      >
        6 − 6 − 2/2 = −1
      </Text>
      <Text
        x={B.o1.x}
        y={790}
        size={type.label}
        color={colors.positive}
        opacity={fadeIn(frame, charges + 20)}
      >
        6 − 2 − 6/2 = +1
      </Text>

      <Chip
        x={A.c.x}
        y={820}
        color={colors.bond}
        opacity={Math.min(1, chip * 1.5)}
        dy={(1 - chip) * 20}
      >
        Preferred
      </Chip>
    </>
  );
}
