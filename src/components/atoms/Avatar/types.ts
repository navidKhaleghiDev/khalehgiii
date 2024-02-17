import { VariantProps } from 'class-variance-authority';

import { IconType } from '@src/types/global';
import { avatarStyles } from './styles';

export interface IAvatar extends VariantProps<typeof avatarStyles> {
  className?: string;
  iconClassName?: string;

  icon: IconType;
}
