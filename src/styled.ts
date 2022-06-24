import { makeStyled } from "./makeStyled";

export const styled = new Proxy(makeStyled, {
  get(target, tag) {
    return target(tag);
  }
});
