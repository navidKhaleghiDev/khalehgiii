import { createElement } from 'react';

import { typographyStyles } from './styles';
import { TypographyProps } from './types';

export function Typography({
  color,
  variant,
  children,
  className,
  type = 'p',
  weight,
}: TypographyProps) {
  return createElement(
    type,
    {
      className: typographyStyles({
        color,
        weight,
        variant,
        className,
      }),
    },
    children
  );
}
