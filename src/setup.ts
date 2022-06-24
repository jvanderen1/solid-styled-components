import { setup as gooberSetup } from "goober";
import { setupConfiguration } from "./configuration";

import type { ShouldForwardProp } from "./types";

// TODO: Should be provided by `goober`
type GooberPrefixer = (key: string, val: any) => string;

export function setup(prefixer?: GooberPrefixer, shouldForwardProp?: ShouldForwardProp) {
  gooberSetup(null, prefixer);
  if (shouldForwardProp) {
    setupConfiguration.getForwardProps = shouldForwardProp;
  }
}
