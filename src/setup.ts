import { css, setup as gooberSetup } from "goober";

type GooberPrefixer = (key: string, val: any) => string;
type ShouldForwardProp = (props: string[]) => string[];

export function setup(prefixer?: GooberPrefixer, shouldForwardProp?: ShouldForwardProp) {
  gooberSetup(null, prefixer);
  if (shouldForwardProp) {
    getForwardProps = shouldForwardProp;
  }
}
