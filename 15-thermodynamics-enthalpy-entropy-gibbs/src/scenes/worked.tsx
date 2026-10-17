import { Arrow, F, Text } from "../components/Text";
import { type } from "../theme";

export const LEFT_X = 200;

/** N₂(g) + 3 H₂(g) → 2 NH₃(g) header shared by the worked-example scenes. */
export function AmmoniaHeader({ opacity = 1 }: { opacity?: number }) {
  return (
    <Text
      x={960}
      y={200}
      size={type.subtitle}
      weight={700}
      anchor="middle"
      opacity={opacity}
    >
      <F>N2</F>(g) + 3 <F>H2</F>(g)
      <Arrow />2 <F>NH3</F>(g)
    </Text>
  );
}
