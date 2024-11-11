import { VariantProps } from 'class-variance-authority';

import { IconType } from '@src/types/global';

import { iconStyles } from './styles';

export interface UsersInfoCardProps extends VariantProps<typeof iconStyles> {
  icon: IconType;
  title: string;
  count?: number;
  className?: string;
  isLoading?: boolean;
}
