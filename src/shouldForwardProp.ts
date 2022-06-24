import type { ShouldForwardProp } from "./types";

export function shouldForwardProp(predicate: (x: string) => boolean): ShouldForwardProp {
  return (props: string[]) => props.filter(predicate);
}
