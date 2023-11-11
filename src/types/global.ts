import { IconifyIcon } from "@iconify/react";

export type IconType = string | IconifyIcon;

export type StringifyProperties<T> = {
  [K in keyof T]: string;
};
