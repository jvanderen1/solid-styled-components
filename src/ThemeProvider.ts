import { createComponent } from "solid-js";
import { ThemeContext } from "./ThemeContext";

import type { Props } from "./types";

export function ThemeProvider(props: Props) {
  return createComponent(ThemeContext.Provider, {
    value: props.theme,
    get children() {
      return props.children;
    }
  });
}
