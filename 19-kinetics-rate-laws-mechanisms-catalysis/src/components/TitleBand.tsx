import type { ReactNode } from "react";
import { BAND, colors, FONT, type } from "../theme";

const PADDING = type.title / 5;
const TITLE_LINE = type.title * 1.2;
const SUBTITLE_SIZE = 40;
const SUBTITLE_LINE = SUBTITLE_SIZE * 1.2;

/** y of the bottom rule; the band grows by one subtitle line when there is one. */
export function bandBottom(hasSubtitle: boolean) {
  return hasSubtitle ? BAND.bottom + SUBTITLE_LINE : BAND.bottom;
}

/** First y available to scene content below the band. */
export function contentTop(hasSubtitle: boolean) {
  return bandBottom(hasSubtitle) + (BAND.content - BAND.bottom);
}

type Props = {
  title: string;
  subtitle?: ReactNode;
};

/** Scene title between two horizontal rules, per `wireframe.svg`. */
export function TitleBand({ title, subtitle }: Props) {
  const bottom = bandBottom(subtitle !== undefined);
  const rule = (y: number) => (
    <div
      style={{
        position: "absolute",
        left: BAND.left,
        top: y - BAND.rule / 2,
        width: BAND.right - BAND.left,
        height: BAND.rule,
        background: colors.text,
      }}
    />
  );
  return (
    <>
      {rule(BAND.top)}
      <div
        style={{
          position: "absolute",
          left: BAND.left + BAND.inset,
          top: BAND.top + PADDING,
          fontFamily: FONT,
          color: colors.text,
          whiteSpace: "nowrap",
        }}
      >
        <div
          style={{
            fontSize: type.title,
            fontWeight: 700,
            lineHeight: `${TITLE_LINE}px`,
          }}
        >
          {title}
        </div>
        {subtitle === undefined ? null : (
          <div
            style={{
              fontSize: SUBTITLE_SIZE,
              fontWeight: 500,
              lineHeight: `${SUBTITLE_LINE}px`,
              color: colors.muted,
            }}
          >
            {subtitle}
          </div>
        )}
      </div>
      {rule(bottom)}
    </>
  );
}
