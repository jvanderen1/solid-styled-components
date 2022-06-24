import { spread, ssr, ssrSpread, isServer } from "solid-js/web";
import { mergeProps, splitProps, useContext, untrack } from "solid-js";
import { css } from "goober";
import { ThemeContext } from "./ThemeContext";

export function makeStyled(tag: string | symbol) {
  let _ctx = this || {};
  return (...args) => {
    const Styled = props => {
      const theme = useContext(ThemeContext);
      const withTheme = mergeProps(props, { theme });
      const clone = mergeProps(withTheme, {
        get class() {
          const pClass = withTheme.class,
            append = "class" in withTheme && /^go[0-9]+/.test(pClass);
          // Call `css` with the append flag and pass the props
          let className = css.apply(
            { target: _ctx.target, o: append, p: withTheme, g: _ctx.g },
            args
          );
          return [pClass, className].filter(Boolean).join(" ");
        }
      });
      const [local, newProps] = splitProps(clone, ["as", "theme"]);
      const htmlProps = getForwardProps
        ? splitProps(newProps, getForwardProps(Object.keys(newProps)))[0]
        : newProps;
      const createTag = local.as || tag;

      if (typeof createTag === "function") {
        return createTag(htmlProps);
      }

      if (isServer) {
        const [local, others] = splitProps(htmlProps, ["children", "theme"]);
        return ssr(
          [`<${createTag} `, ">", `</${createTag}>`],
          ssrSpread(others),
          local.children || ""
        );
      }

      const el = document.createElement(createTag);
      spread(el, htmlProps);
      return el;
    };

    Styled.class = props => {
      return untrack(() => {
        return css.apply({ target: _ctx.target, p: props, g: _ctx.g }, args);
      });
    };

    return Styled;
  };
}
