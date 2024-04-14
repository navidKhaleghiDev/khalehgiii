import shieldWarningIcon from '@iconify-icons/ph/shield-warning';
import shieldCheckIcon from '@iconify-icons/ph/shield-check';

import { BaseIcon } from '../BaseIcon';
import { Card } from '../Card';
import { Typography } from '../Typography';
import { notificationStyles } from './styles';
import { INotification } from './types';

export function NotificationCard({
  className,
  outline,
  size,
  title,
  type,
}: INotification) {
  return (
    <Card
      className={notificationStyles({ size, type, outline, className })}
      border
    >
      <div className="flex items-center">
        <BaseIcon
          icon={type === 'error' ? shieldWarningIcon : shieldCheckIcon}
          className="ml-5"
        />
        <Typography variant="body3" weight="medium">
          {title}
        </Typography>
      </div>
    </Card>
  );
}
