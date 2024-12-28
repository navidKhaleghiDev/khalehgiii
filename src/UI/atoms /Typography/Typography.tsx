import { createElement } from 'react';

import { typographyStyles } from './styles';
import { TypographyProps } from './types';

export function Typography({
  color,
  variant,
  children,
  className,
  type = 'p',
}: TypographyProps) {
  return createElement(
    type,
    {
      className: typographyStyles({
        color,
        variant,
        className,
      }),
    },
    children
  );
}
