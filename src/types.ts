// import { JSX } from "solid-js";
import { Properties as CSSProperties } from "csstype";

export interface DefaultTheme {}

export interface CSSAttribute extends CSSProperties {
  [key: string]: CSSAttribute | string | number | undefined;
}
// export type Tagged<T> = <P>(
//   args_0:
//     | string
//     | TemplateStringsArray
//     | CSSAttribute
//     | ((
//         props: P &
//           T & {
//             theme?: DefaultTheme;
//             as?: string | number | symbol | undefined;
//             class?: any;
//             children?: any;
//           }
//       ) => string | CSSAttribute),
//   ...args_1: (
//     | string
//     | number
//     | ((
//         props: P &
//           T & {
//             theme?: DefaultTheme;
//             as?: string | number | symbol | undefined;
//             class?: any;
//             children?: any;
//           }
//       ) => string | number | CSSAttribute | undefined)
//   )[]
// ) => ((props: P & T) => JSX.Element) & {
//   class: (props: P & T) => string;
// };

// export interface Styled {
//   <T extends keyof JSX.IntrinsicElements>(
//     tag: T | ((props: JSX.IntrinsicElements[T]) => JSX.Element)
//   ): Tagged<JSX.IntrinsicElements[T]>;
//   <T>(component: (props: T) => JSX.Element): Tagged<T>;
// }

// export type styledT = Styled & {
//     [Tag in keyof JSX.IntrinsicElements]: Tagged<JSX.IntrinsicElements[Tag]>;
//   };

export type ShouldForwardProp = (props: string[]) => string[];

export interface SetupConfiguration {
  getForwardProps?: ShouldForwardProp;
}
