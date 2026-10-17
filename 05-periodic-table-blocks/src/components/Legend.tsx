import { blockColors, colors, FONT, type, type Block } from "../theme";

const ORDER: Block[] = ["s", "p", "d", "f"];

/** Block colour key at the top right; `shown` gives each chip's opacity. */
export function Legend({ shown }: { shown: Record<Block, number> }) {
  return (
    <>
      {ORDER.map((block, i) => (
        <div
          key={block}
          style={{
            position: "absolute",
            left: 1520,
            top: 160 + i * 40,
            height: 30,
            display: "flex",
            alignItems: "center",
            gap: 16,
            opacity: shown[block],
            fontFamily: FONT,
            fontSize: type.label,
            fontWeight: 500,
            color: colors.text,
          }}
        >
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: 4,
              background: blockColors[block].fill,
            }}
          />
          {block}-block
        </div>
      ))}
    </>
  );
}

export const FULL_LEGEND: Record<Block, number> = { s: 1, p: 1, d: 1, f: 1 };
