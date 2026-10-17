import type { ReactNode } from "react";
import { useVideoConfig } from "remotion";
import { fadeIn, pop, progress } from "../components/anim";
import { Chip, PitfallTag, Title } from "../components/Labels";
import { Text } from "../components/Text";
import { cue } from "../cues";
import { useSceneFrame } from "../components/SceneFrame";
import { colors } from "../theme";

const SCENE = "pitfalls-exceptions";

const sub = (text: string) => <sub style={{ fontSize: "0.65em" }}>{text}</sub>;

const CARDS: {
  x: number;
  formula: ReactNode;
  count: string;
  tag: string;
  phrase: string;
}[] = [
  {
    x: 330,
    formula: "H",
    count: "2 e⁻",
    tag: "Duet",
    phrase: "Hydrogen is full",
  },
  {
    x: 750,
    formula: <>BF{sub("3")}</>,
    count: "B has 6 e⁻",
    tag: "Electron deficient",
    phrase: "B F three is electron deficient",
  },
  {
    x: 1170,
    formula: "NO",
    count: "11 valence e⁻",
    tag: "Odd electron",
    phrase: "N O has an odd number",
  },
  {
    x: 1590,
    formula: <>SF{sub("6")}</>,
    count: "12 e⁻ around S",
    tag: "Expanded octet",
    phrase: "S F six has an expanded octet",
  },
];

const CARD = { width: 360, height: 280, y: 480 };

export function PitfallsScene() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();

  const intro = cue(SCENE, "Remember these common pitfalls");
  const exceptions = cue(SCENE, "The octet rule has exceptions");
  const real = cue(SCENE, "formal charge is not a real electrical charge");
  const bookkeeping = cue(SCENE, "it is just hypothetical bookkeeping");

  const boxes = fadeIn(frame, exceptions);
  const tag = pop(frame, fps, real);
  const strike = progress(frame, real + 15, bookkeeping);
  const chip = pop(frame, fps, bookkeeping);

  return (
    <>
      <Title title="Common Pitfalls" opacity={fadeIn(frame, intro)} />
      <Text
        x={960}
        y={295}
        size={32}
        weight={500}
        color={colors.muted}
        opacity={boxes}
      >
        The octet rule has exceptions
      </Text>

      {CARDS.map((card) => {
        const t = pop(frame, fps, cue(SCENE, card.phrase));
        const content = Math.min(1, t * 1.5);
        const top = CARD.y - CARD.height / 2;
        return (
          <div key={card.tag}>
            <div
              style={{
                position: "absolute",
                left: card.x - CARD.width / 2,
                top,
                width: CARD.width,
                height: CARD.height,
                boxSizing: "border-box",
                borderRadius: 24,
                backgroundColor: colors.panel,
                border: `4px solid ${colors.panelBorder}`,
                opacity: boxes,
              }}
            />
            <Text
              x={card.x}
              y={top + 70}
              size={64}
              weight={700}
              opacity={content}
              scale={0.8 + 0.2 * t}
            >
              {card.formula}
            </Text>
            <Text
              x={card.x}
              y={top + 150}
              size={40}
              color={colors.lonePair}
              weight={500}
              opacity={content}
            >
              {card.count}
            </Text>
            <Chip
              x={card.x}
              y={top + 226}
              size={28}
              opacity={content}
              dy={(1 - t) * 12}
            >
              {card.tag}
            </Chip>
          </div>
        );
      })}

      <PitfallTag
        x={960}
        center
        y={780}
        strike={strike}
        opacity={Math.min(1, tag * 1.5)}
        dy={(1 - tag) * 20}
      >
        Formal charge is a real charge
      </PitfallTag>
      <Chip
        x={960}
        y={890}
        opacity={Math.min(1, chip * 1.5)}
        dy={(1 - chip) * 20}
      >
        Hypothetical bookkeeping: assumes equal sharing
      </Chip>
    </>
  );
}
