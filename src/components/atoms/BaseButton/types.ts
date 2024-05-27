import { VariantProps } from 'class-variance-authority';

import { IconType } from '@src/types/global';
import { baseButtonStyles, iconButtonStyles } from './styles';

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
  tooltip?: string;
  tooltipPosition?: string;
}
