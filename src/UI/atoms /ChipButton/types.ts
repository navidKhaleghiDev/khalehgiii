import { VariantProps } from 'class-variance-authority';
import { chipButtonStyles } from './styles';
import { BaseIconProps } from '../BaseIcon';

export interface ChipButtonProps extends VariantProps<typeof chipButtonStyles> {
  label: string;
  icon?: BaseIconProps['icon'];
  onClick?: () => void;
  dir?: 'rtl' | 'ltr';
  className?: string;
  disabled?: boolean;
}
