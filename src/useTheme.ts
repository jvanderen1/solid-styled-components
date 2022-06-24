import { useContext } from "solid-js";
import { ThemeContext } from "./ThemeContext";

import type { DefaultTheme } from "goober";

export function useTheme() {
  return useContext(ThemeContext) as DefaultTheme;
}
