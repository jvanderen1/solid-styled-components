import { makeStyled } from "./makeStyled";

import type { CSSAttribute } from "./types";

export function createGlobalStyles(
  tag: CSSAttribute | TemplateStringsArray | string,
  ...props: Array<string | number | Function>
) {
  const fn = makeStyled.call({ g: 1 }, "div").apply(null, arguments);
  return (props: string[]) => {
    fn(props);
    return null;
  };
}
