import { ComponentProps, PropsWithChildren } from 'react';
import { VariantProps } from 'class-variance-authority';

import { typographyStyles } from './styles';
import { BaseIcon } from '../BaseIcon';

export interface ITypography
  extends VariantProps<typeof typographyStyles>,
    PropsWithChildren {
  type?:
    | 'p'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'caption'
    | 'span'
    | 'div';
  className?: string;
}

type BaseIconProps = ComponentProps<typeof BaseIcon>;
export interface ITypographyIcon extends Omit<ITypography, 'children'> {
  text: string;
  iconColor?: BaseIconProps['color'];
  iconSize?: BaseIconProps['size'];
  startIcon?: string;
  endIcon?: string;
}
