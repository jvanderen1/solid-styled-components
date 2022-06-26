import { spread, ssr, ssrSpread, isServer } from "solid-js/web";
import { mergeProps, splitProps, untrack } from "solid-js";
import { css } from "goober";
import { setupConfiguration } from "./configuration";
import { useTheme } from "./useTheme";

import type { Props } from "./types";
import type { CSSAttribute } from "goober";

function assertIsString(val: any): asserts val is string {
  if (typeof val !== "string") {
    throw new Error("Not a string!");
  }
}

function assertHasOnlyClassOrChildren(val: any[]): asserts val is ("class" | "children")[] {
  const possibleValues = new Set(["class", "children"]);
  for (const x of val) {
    if (!possibleValues.has(x)) {
      throw new Error(`${x} is not a valid prop to omit!`);
    }
  }
}

export function makeStyled(tag: string | symbol | Function) {
  // @ts-ignore
  const _ctx = this || {};

  return (
    gooberTag: CSSAttribute | TemplateStringsArray | string,
    ...gooberProps: Array<string | number>
  ) => {
    const Styled = (props: Props) => {
      const theme = useTheme();
      const withTheme = mergeProps(props, { theme });
      const clone = mergeProps(withTheme, {
        class: (() => {
          const pClass = withTheme.class;
          const append = "class" in withTheme && /^go[0-9]+/.test(pClass);
          // Call `css` with the append flag and pass the props
          const className = css.apply({ target: _ctx.target, o: append, p: withTheme, g: _ctx.g }, [
            gooberTag,
            ...gooberProps
          ]);
          return [pClass, className].filter(Boolean).join(" ");
        })()
      });
      const [local, newProps] = splitProps(clone, ["as", "theme"]);
      const htmlProps = (() => {
        if (!setupConfiguration.getForwardProps) {
          return newProps;
        }

        const propsToOmit = setupConfiguration.getForwardProps(Object.keys(newProps));
        assertHasOnlyClassOrChildren(propsToOmit);
        return splitProps(newProps, propsToOmit)[0];
      })();
      const createTag = local.as || tag;

      if (typeof createTag === "function") {
        return createTag(htmlProps);
      }

      assertIsString(createTag);

      if (isServer) {
        const [local, others] = splitProps(htmlProps, ["children"]);
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

    Styled.class = (props: Props) => {
      return untrack(() =>
        css.apply({ target: _ctx.target, p: props, g: _ctx.g }, [gooberTag, ...gooberProps])
      );
    };

    return Styled;
  };
}
