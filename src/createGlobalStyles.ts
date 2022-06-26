import { makeStyled } from "./makeStyled";

import type { CSSAttribute } from "goober";
import type { Props } from "./types";

export function createGlobalStyles(
  tag: CSSAttribute | TemplateStringsArray | string,
  ...props: Array<string | number>
) {
  const fn = makeStyled.call({ g: 1 }, "div").apply(null, [tag, ...props]);
  return (props: Props) => {
    fn(props);
    return null;
  };
}
