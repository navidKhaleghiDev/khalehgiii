import Warning from '@iconify-icons/ph/warning';
import Check from '@iconify-icons/ph/check';
import Info from '@iconify-icons/ph/info';
import { BaseIcon } from '../BaseIcon';
import { Card } from '../Card';
import { Typography } from '../Typography';
import { notificationStyles } from './styles';
import { INotification } from './types';

/**
 * Notification Component
 *
 * This component renders a notification card with an icon and title.
 *
 * @component
 *
 * @param {Object} props - The props for the Notification component.
 * @param {string} [className] - Custom className for the notification card.
 * @param {boolean} [outline] - Determines if the card should have an outline.
 * @param {string} [size] - Size of the notification card (e.g., xs, sm, md, lg).
 * @param {string} title - Title text to be displayed in the notification.
 * @param {'error' | 'info' | 'warning' | 'success'} [type] - Type of notification (error, info, warning, success).
 *
 * @returns {JSX.Element} Returns the rendered notification component.
 */

export function Notification({ className, size, title, type }: INotification) {
  const SelectIconType = ({
    notificationType,
  }: {
    notificationType: INotification['type'];
  }) => {
    if (notificationType === 'success') {
      return Check;
    }
    if (notificationType === 'error') {
      return Warning;
    }
    return Info;
  };

  return (
    <Card
      className={notificationStyles({ size, type, className })}
      color={null}
      rounded="lg"
      border
    >
      <div className="flex items-center flex-row-reverse">
        {type && (
          <BaseIcon
            icon={SelectIconType({ notificationType: type })}
            className="mr-2.5"
            size="md"
          />
        )}
        <Typography variant="body4" weight="normal">
          {title}
        </Typography>
      </div>
    </Card>
  );
}
