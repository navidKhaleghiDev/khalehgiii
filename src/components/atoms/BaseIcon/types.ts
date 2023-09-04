import { VariantProps } from 'class-variance-authority';

import { baseIconStyles } from './styles';

export interface IBaseIcon extends VariantProps<typeof baseIconStyles> {
  className?: string;
  icon?: string;
}
