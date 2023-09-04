import { VariantProps } from 'class-variance-authority';

import { avatarStyles } from './styles';

export interface IAvatar extends VariantProps<typeof avatarStyles> {
  className?: string;
  iconClassName?: string;

  icon: string;
}
