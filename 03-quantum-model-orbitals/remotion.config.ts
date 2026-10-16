import { Config } from "@remotion/cli/config";

// CI runners have no GPU; SwiftShader through ANGLE is the software WebGL path.
Config.setChromiumOpenGlRenderer("swangle");
