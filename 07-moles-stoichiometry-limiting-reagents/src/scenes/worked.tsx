import { ConversionMap, type MapArrow } from "../components/ConversionMap";
import { F, Text } from "../components/Text";
import { colors, type } from "../theme";

export const LEFT_X = 160;
export const RIGHT_X = 1000;
export const EQUATION_Y = 180;
export const MASS_Y = 400;
export const MOLES_Y = 500;
export const CHECK_Y = 650;
export const BADGE_Y = 750;

export type Reveal = { opacity?: number; dy?: number; scale?: number };

const SPECIES_TEXT = {
  H2: colors.h2Text,
  O2: colors.o2Text,
  H2O: colors.h2oText,
} as const;

type AmountProps = { n: string; of: keyof typeof SPECIES_TEXT };

/** Bold quantity coloured by species, e.g. 0.9921 mol H₂. */
export function Amount({ n, of }: AmountProps) {
  return (
    <b style={{ color: SPECIES_TEXT[of] }}>
      {n} <F>{of}</F>
    </b>
  );
}

function alpha(amount: number) {
  const byte = Math.round(Math.max(0, Math.min(1, amount)) * 255);
  return byte.toString(16).padStart(2, "0");
}

type GivenProps = {
  h2Mass?: Reveal;
  o2Mass?: Reveal;
  h2Moles?: Reveal;
  o2Moles?: Reveal;
  /** 0→1 opacity of the ring drawn around the O₂ mass. */
  ring?: number;
};

/** Given masses and their conversion to moles, shared by the worked-example scenes. */
export function GivenRows({
  h2Mass = {},
  o2Mass = {},
  h2Moles = {},
  o2Moles = {},
  ring = 0,
}: GivenProps) {
  return (
    <>
      <Text
        x={LEFT_X}
        y={MASS_Y}
        size={type.subtitle}
        weight={700}
        color={colors.h2Text}
        {...h2Mass}
      >
        2.00 g <F>H2</F>
      </Text>
      <Text
        x={RIGHT_X}
        y={MASS_Y}
        size={type.subtitle}
        weight={700}
        color={colors.o2Text}
        {...o2Mass}
      >
        <span
          style={{
            borderRadius: 12,
            outline: `4px solid ${colors.limiting}${alpha(ring)}`,
            outlineOffset: 10,
          }}
        >
          10.0 g <F>O2</F>
        </span>
      </Text>
      <Text x={LEFT_X} y={MOLES_Y} size={type.body} {...h2Moles}>
        ÷ 2.016 g/mol = <Amount n="0.9921 mol" of="H2" />
      </Text>
      <Text x={RIGHT_X} y={MOLES_Y} size={type.body} {...o2Moles}>
        ÷ 31.998 g/mol = <Amount n="0.3125 mol" of="O2" />
      </Text>
    </>
  );
}

type InsetProps = {
  opacity: number;
  highlight?: { arrow: MapArrow; color: string; textColor: string };
};

/** Half-size conversion map at the bottom of the frame. */
export function MapInset({ opacity, highlight }: InsetProps) {
  return (
    <ConversionMap
      x={960}
      y={880}
      scale={0.5}
      opacity={opacity}
      nodes={[1, 1, 1]}
      arrows={[1, 1, 1, 1]}
      highlight={highlight}
    />
  );
}
