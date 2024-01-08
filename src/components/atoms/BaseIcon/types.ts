import { VariantProps } from 'class-variance-authority';

import { baseIconStyles } from './styles';
import { IconType } from '@src/types/global';

export interface IBaseIcon extends VariantProps<typeof baseIconStyles> {
  className?: string;
  icon?: IconType;
}
