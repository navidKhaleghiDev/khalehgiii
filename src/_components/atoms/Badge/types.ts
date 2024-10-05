import { VariantProps } from 'class-variance-authority';

import { badgeStyle } from './styles';

export interface BadgeProps extends VariantProps<typeof badgeStyle> {
  content?: number;
  className?: string;
  disabled?: boolean;
}
