import { createElement, PropsWithChildren } from 'react';

import { CVA } from '../type';

export type BaseTypographyProps<T extends Record<string, any>> =
  PropsWithChildren<
    {
      type?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'div';
      className?: string;
      style: CVA<T>;
    } & {
      [key in keyof T]: T[key];
    }
  >;

export function BaseTypography<T extends Record<string, any>>({
  children,
  className,
  type = 'p',
  style,
  ...rest
}: BaseTypographyProps<T>) {
  return createElement(
    type,
    {
      className: style({
        className,
        ...rest,
      }),
    },
    children
  );
}
