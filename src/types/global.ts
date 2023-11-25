import { IconifyIcon } from "@iconify/react";

export type IconType = string | IconifyIcon;

export type StringifyProperties<T> = {
  [K in keyof T]: string;
};

// export type StringifyProperties<T> = {
//   [K in keyof T]: T[K] extends Record<string, any>
//     ? StringifyProperties<T[K]>
//     : string;
// };

export type StringifyExcept<T, K extends keyof T> = {
  [P in keyof T]: P extends K ? T[P] : StringifyProperties<T[P]>;
};

export type ExtendTwoType<T, U> = T & U;
