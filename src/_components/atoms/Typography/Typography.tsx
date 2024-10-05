import { createElement } from 'react';

import { typographyStyles } from './styles';
import { ITypography } from './types';

export function Typography({
  color,
  variant,
  children,
  className,
  type = 'p',
  weight,
}: ITypography) {
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
