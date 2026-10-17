import { colors, FONT } from "../theme";

export const ATOM_RADIUS = 60;
export const H_RADIUS = 40;
export const ELECTRON_RADIUS = 8;
export const PAIR_GAP = 20;

type AtomProps = {
  x: number;
  y: number;
  symbol?: string;
  r?: number;
  fill?: string;
  stroke?: string;
  textColor?: string;
  symbolSize?: number;
  opacity?: number;
  scale?: number;
};

export function Atom({
  x,
  y,
  symbol,
  r = ATOM_RADIUS,
  fill = colors.atomFill,
  stroke = colors.atomStroke,
  textColor = colors.text,
  symbolSize = 48,
  opacity = 1,
  scale = 1,
}: AtomProps) {
  if (opacity <= 0) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: x - r,
        top: y - r,
        width: r * 2,
        height: r * 2,
        borderRadius: "50%",
        boxSizing: "border-box",
        backgroundColor: fill,
        border: `4px solid ${stroke}`,
        opacity,
        transform: `scale(${scale})`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: FONT,
        fontSize: symbolSize,
        fontWeight: 500,
        color: textColor,
      }}
    >
      {symbol}
    </div>
  );
}

type IonProps = {
  x: number;
  y: number;
  symbol: string;
  charge: "+" | "−";
  r: number;
  opacity?: number;
  scale?: number;
  symbolSize?: number;
  showCharge?: boolean;
};

/** Cations are blue, anions red; the charge sits at 45° top-right of the disc. */
export function Ion({
  x,
  y,
  symbol,
  charge,
  r,
  opacity = 1,
  scale = 1,
  symbolSize = 40,
  showCharge = true,
}: IonProps) {
  if (opacity <= 0) return null;
  const cation = charge === "+";
  const fill = cation ? colors.cation : colors.anion;
  const offset = (r + 24) * Math.SQRT1_2 * scale;
  return (
    <>
      <Atom
        x={x}
        y={y}
        r={r}
        symbol={symbol}
        fill={fill}
        stroke={cation ? colors.cationText : colors.anionText}
        textColor="#FFFFFF"
        symbolSize={symbolSize}
        opacity={opacity}
        scale={scale}
      />
      {showCharge ? (
        <Charge
          x={x + offset}
          y={y - offset}
          color={cation ? colors.cationText : colors.anionText}
          opacity={opacity}
        >
          {charge}
        </Charge>
      ) : null}
    </>
  );
}

export function Charge({
  x,
  y,
  color,
  opacity = 1,
  children,
}: {
  x: number;
  y: number;
  color: string;
  opacity?: number;
  children: string;
}) {
  if (opacity <= 0) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: "translate(-50%, -50%)",
        fontFamily: FONT,
        fontSize: 32,
        fontWeight: 700,
        color,
        opacity,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </div>
  );
}

export function Electron({
  x,
  y,
  opacity = 1,
  r = ELECTRON_RADIUS,
}: {
  x: number;
  y: number;
  opacity?: number;
  r?: number;
}) {
  if (opacity <= 0) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: x - r,
        top: y - r,
        width: r * 2,
        height: r * 2,
        borderRadius: "50%",
        backgroundColor: colors.electron,
        boxShadow: `0 0 0 2px ${colors.electronText}`,
        opacity,
      }}
    />
  );
}

/** Two electrons side by side, centred on (x, y). */
export function SharedPair({
  x,
  y,
  opacity = 1,
}: {
  x: number;
  y: number;
  opacity?: number;
}) {
  return (
    <>
      <Electron x={x - PAIR_GAP / 2} y={y} opacity={opacity} />
      <Electron x={x + PAIR_GAP / 2} y={y} opacity={opacity} />
    </>
  );
}
