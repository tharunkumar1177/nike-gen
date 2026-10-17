import { Colored, type Example } from "./ExampleScene";

export const PHOSPHORUS: Example = {
  scene: "example-phosphorus",
  title: "Example: Phosphorus",
  target: "P",
  core: "Ne",
  sCells: ["Na", "Mg"],
  nextCells: ["Al", "Si", "P"],
  nextBlock: "p",
  steps: [
    "1. Locate: period 3, group 15, p-block",
    "2. Core: [Ne]",
    <>
      3. s subshell: <Colored block="s">3s²</Colored>
    </>,
    <>
      4. p subshell: <Colored block="p">3p³</Colored>
    </>,
  ],
  result: [
    { text: "[Ne]", block: "core" },
    { text: "3s²", block: "s" },
    { text: "3p³", block: "p" },
  ],
  cues: {
    locate: "Phosphorus is period three",
    core: "neon",
    sPath: "Cross the period three s block",
    sStep: "giving three s two",
    nextPath: "Count three spots into the p block",
    nextStep: "ending at three p three",
    result: "neon core",
  },
  shiftIn: true,
};

export const VANADIUM: Example = {
  scene: "example-vanadium",
  title: "Example: Vanadium",
  target: "V",
  core: "Ar",
  sCells: ["K", "Ca"],
  nextCells: ["Sc", "Ti", "V"],
  nextBlock: "d",
  steps: [
    "1. Locate: period 4, group 5, d-block",
    "2. Core: [Ar]",
    <>
      3. s subshell: <Colored block="s">4s²</Colored>
    </>,
    <>
      4. d subshell: <Colored block="d">3d³</Colored>
    </>,
  ],
  result: [
    { text: "[Ar]", block: "core" },
    { text: "4s²", block: "s" },
    { text: "3d³", block: "d" },
  ],
  swap: "argon core",
  cues: {
    locate: "Let's try vanadium",
    core: "argon",
    sPath: "Cross the four s block",
    sStep: "giving four s two",
    nextPath: "Count three spots into the three d block",
    nextStep: "ending at three d three",
    result: "Following written order",
  },
  shiftIn: false,
};
