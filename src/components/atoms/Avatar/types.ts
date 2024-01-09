import { VariantProps } from 'class-variance-authority';

import { avatarStyles } from './styles';
import { IconType } from '@src/types/global';

export interface IAvatar extends VariantProps<typeof avatarStyles> {
  className?: string;
  iconClassName?: string;

  icon: IconType;
}
