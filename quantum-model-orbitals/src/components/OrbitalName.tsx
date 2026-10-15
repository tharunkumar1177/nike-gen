import type { OrbitalId } from "../orbitals/wavefunctions";

const NAMES: Record<OrbitalId, [shell: string, sub: string]> = {
  "1s": ["1s", ""],
  "2s": ["2s", ""],
  "3s": ["3s", ""],
  "2px": ["2p", "x"],
  "2py": ["2p", "y"],
  "2pz": ["2p", "z"],
  "3pz": ["3p", "z"],
  "3dxy": ["3d", "xy"],
  "3dxz": ["3d", "xz"],
  "3dyz": ["3d", "yz"],
  "3dx2y2": ["3d", "x²−y²"],
  "3dz2": ["3d", "z²"],
  "4fz3": ["4f", "z³"],
  "4fxz2": ["4f", "xz²"],
  "4fyz2": ["4f", "yz²"],
  "4fxyz": ["4f", "xyz"],
  "4fzx2y2": ["4f", "z(x²−y²)"],
  "4fxx23y2": ["4f", "x(x²−3y²)"],
  "4fy3x2y2": ["4f", "y(3x²−y²)"],
};

/** Orbital label with its subscript, e.g. d with subscript x²−y². */
export function OrbitalName({
  orbital,
  showShell = false,
}: {
  orbital: OrbitalId;
  /** Include the principal quantum number (2p rather than p). */
  showShell?: boolean;
}) {
  const [shell, sub] = NAMES[orbital];
  const letter = showShell ? shell : shell.slice(1);
  return (
    <span>
      <span style={{ fontStyle: "italic" }}>{letter}</span>
      {sub ? (
        <sub style={{ fontSize: "0.62em", verticalAlign: "-0.28em" }}>
          {sub}
        </sub>
      ) : null}
    </span>
  );
}
