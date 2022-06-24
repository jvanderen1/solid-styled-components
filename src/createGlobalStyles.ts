import { makeStyled } from "./makeStyled";

export function createGlobalStyles() {
  const fn = makeStyled.call({ g: 1 }, "div").apply(null, arguments);
  return props => {
    fn(props);
    return null;
  };
}
