import { VariantProps } from 'class-variance-authority';

import { notificationStyles } from './styles';

export interface NotificationProps
  extends VariantProps<typeof notificationStyles> {
  className?: string;
  title: string;
}
