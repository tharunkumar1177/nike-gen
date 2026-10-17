const SUBSCRIPTS = "₀₁₂₃₄₅₆₇₈₉";

/**
 * Renders Unicode subscript digits (CO₂, AX₂E₂) as styled digits, because
 * the loaded Roboto subset has no subscript glyphs.
 */
export function Chem({ children }: { children: string }) {
  const parts: { text: string; sub: boolean }[] = [];
  for (const char of children) {
    const digit = SUBSCRIPTS.indexOf(char);
    const sub = digit >= 0;
    const text = sub ? String(digit) : char;
    const last = parts[parts.length - 1];
    if (last && last.sub === sub) {
      last.text += text;
    } else {
      parts.push({ text, sub });
    }
  }
  return (
    <>
      {parts.map((part, i) =>
        part.sub ? (
          <span
            key={i}
            style={{
              fontSize: "0.62em",
              verticalAlign: "-0.28em",
              lineHeight: 0,
            }}
          >
            {part.text}
          </span>
        ) : (
          <span key={i}>{part.text}</span>
        ),
      )}
    </>
  );
}
