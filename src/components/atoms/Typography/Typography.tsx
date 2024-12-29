/* eslint-disable react/jsx-props-no-spreading */
import { VariantProps } from 'class-variance-authority';

import { BaseTypography, BaseTypographyProps } from '@src/UI/atoms /Typography';

import { typographyStyles } from './styles';

type TypographyProps = BaseTypographyProps<
  VariantProps<typeof typographyStyles>
>;

export function Typography({
  color,
  variant,
  children,
  className,
  type = 'p',
}: TypographyProps) {
  const extended = { color, variant };
  return (
    <BaseTypography
      style={typographyStyles}
      className={className}
      type={type}
      {...extended}
    >
      {children}
    </BaseTypography>
  );
}
