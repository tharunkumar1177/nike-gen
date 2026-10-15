import { useMemo } from "react";
import { Img } from "remotion";
import { wavefunction, type OrbitalId } from "../orbitals/wavefunctions";
import { colors } from "../theme";

type Props = {
  orbital: OrbitalId;
  /** Centre in px. */
  cx: number;
  cy: number;
  /** Side length in px. */
  size: number;
  /** Half of the field of view, in a₀. */
  halfWidth: number;
  /** Cross-section plane through the nucleus; the first axis runs left→right. */
  plane?: "xz" | "xy" | "yz";
  /** Exponent applied to normalised ψ² so faint outer shells stay visible. */
  gamma?: number;
  circular?: boolean;
  opacity?: number;
  /** Scale about the centre, e.g. for spring-ins. */
  scale?: number;
};

const RESOLUTION = 400;

function hexToRgb(hex: string) {
  const value = Number.parseInt(hex.slice(1), 16);
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255] as const;
}

function renderMap(
  orbital: OrbitalId,
  halfWidth: number,
  plane: "xz" | "xy" | "yz",
  gamma: number,
) {
  const psi = wavefunction(orbital);
  const values = new Float64Array(RESOLUTION * RESOLUTION);
  let max = 0;
  for (let row = 0; row < RESOLUTION; row += 1) {
    const v = halfWidth - ((row + 0.5) * 2 * halfWidth) / RESOLUTION;
    for (let col = 0; col < RESOLUTION; col += 1) {
      const u = -halfWidth + ((col + 0.5) * 2 * halfWidth) / RESOLUTION;
      const value =
        plane === "xz" ? psi(u, 0, v) : plane === "xy" ? psi(u, v, 0) : psi(0, u, v);
      values[row * RESOLUTION + col] = value;
      max = Math.max(max, value * value);
    }
  }
  const canvas = document.createElement("canvas");
  canvas.width = RESOLUTION;
  canvas.height = RESOLUTION;
  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("2D canvas is unavailable.");
  }
  const image = context.createImageData(RESOLUTION, RESOLUTION);
  const positive = hexToRgb(colors.positive);
  const negative = hexToRgb(colors.negative);
  values.forEach((value, i) => {
    const t = max > 0 ? ((value * value) / max) ** gamma : 0;
    const tint = value >= 0 ? positive : negative;
    image.data[i * 4] = Math.round(255 + (tint[0] - 255) * t);
    image.data[i * 4 + 1] = Math.round(255 + (tint[1] - 255) * t);
    image.data[i * 4 + 2] = Math.round(255 + (tint[2] - 255) * t);
    image.data[i * 4 + 3] = 255;
  });
  context.putImageData(image, 0, 0);
  return canvas.toDataURL("image/png");
}

/** ψ² heat map of a cross-section through the nucleus; hue shows the sign of ψ. */
export function DensityMap({
  orbital,
  cx,
  cy,
  size,
  halfWidth,
  plane = "xz",
  gamma = 0.5,
  circular = false,
  opacity = 1,
  scale = 1,
}: Props) {
  const src = useMemo(
    () => renderMap(orbital, halfWidth, plane, gamma),
    [orbital, halfWidth, plane, gamma],
  );
  return (
    <Img
      src={src}
      style={{
        position: "absolute",
        left: cx - size / 2,
        top: cy - size / 2,
        width: size,
        height: size,
        borderRadius: circular ? "50%" : 0,
        opacity,
        transform: `scale(${scale})`,
        boxShadow: `0 0 0 2px ${colors.grid}`,
      }}
    />
  );
}
