import { Icon } from '@iconify/react';

import { avatarStyles, iconAvatarStyles } from './styles';
import { IAvatar } from './types';

export function Avatar({
  className,
  icon,
  intent,
  iconClassName,
  size,
}: IAvatar) {
  return (
    <div className={avatarStyles({ intent, className, size })}>
      <Icon
        icon={icon}
        className={iconAvatarStyles({ intent, className: iconClassName, size })}
      />
    </div>
  );
}
