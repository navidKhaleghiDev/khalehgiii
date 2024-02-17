import { VariantProps } from 'class-variance-authority';

import { notificationStyles } from './styles';

export interface INotification extends VariantProps<typeof notificationStyles> {
  className?: string;
  title: string;
}
