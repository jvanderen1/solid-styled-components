import { createComponent } from "solid-js";
import { ThemeContext } from "./ThemeContext";

export function ThemeProvider(props) {
  return createComponent(ThemeContext.Provider, {
    value: props.theme,
    get children() {
      return props.children;
    }
  });
}
