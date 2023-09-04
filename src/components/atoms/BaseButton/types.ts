import { VariantProps } from 'class-variance-authority';

import { baseButtonStyles, iconButtonStyles } from './styles';

export type BaseButtonStyleProps = VariantProps<typeof baseButtonStyles>;
export interface IBaseButton extends BaseButtonStyleProps {
  onClick?: () => void;
  label: string;
  disabled?: boolean;
  submit?: boolean;
  className?: string;
  startIcon?: string;
  endIcon?: string;
  loading?: boolean;
}

export interface IIconButton extends VariantProps<typeof iconButtonStyles> {
  onClick?: () => void;
  icon: string;
  className?: string;
  classNameIcon?: string;
  type?: 'submit' | 'button';
}
