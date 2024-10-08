import { VariantProps } from 'class-variance-authority';

import { IconType } from '@src/types/global';
import { baseIconStyles } from './styles';

export interface IBaseIcon extends VariantProps<typeof baseIconStyles> {
  className?: string;
  icon?: IconType;
}
