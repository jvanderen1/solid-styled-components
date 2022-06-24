import { useContext } from "solid-js";
import { ThemeContext } from "./ThemeContext";

export function useTheme() {
  return useContext(ThemeContext);
}
