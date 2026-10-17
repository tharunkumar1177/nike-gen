import type { ReactNode } from "react";
import { AbsoluteFill, interpolate, useVideoConfig } from "remotion";
import { KW } from "../acidbase";
import { dropped, easeInOut, fadeIn, popped, progress } from "../components/anim";
import { Chip, type Species } from "../components/Chip";
import { useSceneFrame } from "../components/SceneFrame";
import { EqArrow, F, Sub, Sup, Text } from "../components/Text";
import { cue } from "../cues";
import { colors, HEADING_Y, SAFE, type } from "../theme";

const CONCEPT_AT = cue("bronsted-lowry-ph", "A Bronsted Lowry acid donates");
const WATER_AT = cue("bronsted-lowry-ph", "In water, it forms");
const PH_AT = cue("bronsted-lowry-ph", "We measure this with p H");
const KW_AT = cue("bronsted-lowry-ph", "the product of H three O plus");

const ROW_Y = 450;
const RADIUS = 70;
const TRANSFER = 30;
const PRODUCTS_AT = WATER_AT + 20 + TRANSFER;

function Minus() {
  return <Sup>−</Sup>;
}

type Term = {
  x: number;
  species: Species;
  label: ReactNode;
  role: string;
  roleColor: string;
  product: boolean;
};

const TERMS: Term[] = [
  {
    x: 420,
    species: "acid",
    label: "HA",
    role: "acid",
    roleColor: colors.acidText,
    product: false,
  },
  {
    x: 700,
    species: "water",
    label: <F>H2O</F>,
    role: "base",
    roleColor: colors.muted,
    product: false,
  },
  {
    x: 1220,
    species: "hydronium",
    label: (
      <>
        <F>H3O</F>
        <Sup>+</Sup>
      </>
    ),
    role: "conjugate acid",
    roleColor: colors.hydroniumText,
    product: true,
  },
  {
    x: 1500,
    species: "base",
    label: (
      <>
        A<Minus />
      </>
    ),
    role: "conjugate base",
    roleColor: colors.baseText,
    product: true,
  },
];

const exponent = Math.round(Math.log10(KW));

export function BronstedScene() {
  const frame = useSceneFrame();
  const { fps } = useVideoConfig();
  const reactants = fadeIn(frame, WATER_AT);
  const products = fadeIn(frame, PRODUCTS_AT);
  const move = progress(frame, WATER_AT + 20, WATER_AT + 20 + TRANSFER, easeInOut);
  const protonOpacity = interpolate(
    frame,
    [WATER_AT + 15, WATER_AT + 20, PRODUCTS_AT, PRODUCTS_AT + 10],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const [acid, water] = TERMS;
  return (
    <AbsoluteFill>
      <Text
        x={SAFE}
        y={HEADING_Y}
        size={type.subtitle}
        weight={700}
        {...popped(frame, fps, 0)}
      >
        Brønsted–Lowry Acids and Bases
      </Text>
      <Text x={SAFE} y={260} size={type.body} {...dropped(frame, CONCEPT_AT)}>
        Acids donate H<Sup>+</Sup>. Bases accept H<Sup>+</Sup>.
      </Text>
      {TERMS.map((term) => {
        const shown = term.product ? products : reactants;
        return (
          <div key={term.role}>
            <Chip
              species={term.species}
              x={term.x}
              y={ROW_Y}
              radius={RADIUS}
              opacity={shown}
            >
              {term.label}
            </Chip>
            <Text
              x={term.x}
              y={ROW_Y + RADIUS + 40}
              size={28}
              weight={500}
              color={term.roleColor}
              anchor="middle"
              opacity={shown}
            >
              {term.role}
            </Text>
          </div>
        );
      })}
      <Text x={560} y={ROW_Y} size={type.body} anchor="middle" opacity={reactants}>
        +
      </Text>
      <Text
        x={960}
        y={ROW_Y}
        size={type.subtitle}
        anchor="middle"
        opacity={reactants}
      >
        <EqArrow />
      </Text>
      <Text x={1360} y={ROW_Y} size={type.body} anchor="middle" opacity={products}>
        +
      </Text>
      {acid && water ? (
        <Chip
          species="hydronium"
          x={acid.x + (water.x - acid.x) * move}
          y={ROW_Y - RADIUS - 30}
          radius={28}
          opacity={protonOpacity}
        >
          H<Sup>+</Sup>
        </Chip>
      ) : null}
      <Text
        x={960}
        y={700}
        size={type.body}
        weight={700}
        anchor="middle"
        {...dropped(frame, PH_AT)}
      >
        pH = −log[<F>H3O</F>
        <Sup>+</Sup>]
      </Text>
      <Text
        x={960}
        y={800}
        size={type.body}
        weight={700}
        anchor="middle"
        {...dropped(frame, KW_AT)}
      >
        K<Sub>w</Sub> = [<F>H3O</F>
        <Sup>+</Sup>][OH<Minus />] = 1.0 × 10<Sup>{`−${Math.abs(exponent)}`}</Sup>{" "}
        <span style={{ fontWeight: 400, color: colors.muted, fontSize: type.label }}>
          at 25 °C
        </span>
      </Text>
    </AbsoluteFill>
  );
}
