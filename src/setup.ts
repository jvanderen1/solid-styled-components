import { setup as gooberSetup } from "goober";
import { setupConfiguration } from "./configuration";

import type { ShouldForwardProp } from "./types";

export function setup(
  prefixer?: (key: string, val: any) => string,
  shouldForwardProp?: ShouldForwardProp
) {
  gooberSetup(null, prefixer);

  if (shouldForwardProp) {
    setupConfiguration.getForwardProps = shouldForwardProp;
  }
}
