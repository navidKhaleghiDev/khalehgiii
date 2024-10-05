import { VariantProps } from 'class-variance-authority';
import { IconifyIcon } from '@iconify/react';

import { baseIconStyles } from './styles';

export interface BaseIconProps extends VariantProps<typeof baseIconStyles> {
  className?: string;
  icon: string | IconifyIcon;
}
