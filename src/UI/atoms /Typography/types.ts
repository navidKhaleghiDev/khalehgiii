import { ComponentProps, PropsWithChildren } from 'react';
import { VariantProps } from 'class-variance-authority';
import { IconType } from '@src/types/global';

import { typographyStyles } from './styles';
import { BaseIcon } from '../BaseIcon';

export interface TypographyProps
  extends VariantProps<typeof typographyStyles>,
    PropsWithChildren {
  type?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'div';
  className?: string;
}

type BaseIconProps = ComponentProps<typeof BaseIcon>;
export interface TypographyIconProps extends Omit<TypographyProps, 'children'> {
  text: string;
  iconColor?: BaseIconProps['color'];
  iconSize?: BaseIconProps['size'];
  startIcon?: string | IconType;
  endIcon?: string;
}
