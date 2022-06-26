import type { DefaultTheme } from "goober";

export type ShouldForwardProp = (props: string[]) => string[];

export interface SetupConfiguration {
  getForwardProps?: ShouldForwardProp;
}

export interface Props {
  theme?: DefaultTheme;
  as?: string;
  class?: any;
  children?: any;
}
