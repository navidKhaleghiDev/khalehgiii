import { VariantProps } from 'class-variance-authority';

import { baseButtonStyles, iconButtonStyles } from './styles';
import { IconType } from '@src/types/global';

export type BaseButtonStyleProps = VariantProps<typeof baseButtonStyles>;
export interface IBaseButton extends BaseButtonStyleProps {
  onClick?: () => void;
  label: string;
  disabled?: boolean;
  submit?: boolean;
  className?: string;
  startIcon?: IconType;
  endIcon?: IconType;
  loading?: boolean;
}

export interface IIconButton extends VariantProps<typeof iconButtonStyles> {
  onClick?: () => void;
  icon: IconType;
  className?: string;
  classNameIcon?: string;
  type?: 'submit' | 'button';
  disabled?: boolean;
}
