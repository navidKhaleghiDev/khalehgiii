import { BaseIcon } from '../BaseIcon';
import { Card } from '../Card';
import { Typography } from '../Typography';
import { notificationStyles } from './styles';
import { INotification } from './types';

export function Notification({
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
          icon={type === 'error' ? 'ph:shield-warning' : 'carbon:security'}
          className="ml-5"
        />
        <Typography size="body3" weight="medium">
          {title}
        </Typography>
      </div>
    </Card>
  );
}
