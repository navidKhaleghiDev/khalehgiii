import { Icon } from '@iconify/react';

import { avatarStyles, iconAvatarStyles } from './styles';
import { AvatarProps } from './types';
import { Badge } from '../Badge';

export function Avatar({
  className,
  icon,
  iconClassName,
  size,
  isActive,
}: AvatarProps) {
  return (
    <div className="relative">
      {isActive && <Badge color="teal" size={size} />}
      <div
        className={avatarStyles({
          className,
          size,
        })}
      >
        <Icon
          icon={icon}
          className={iconAvatarStyles({
            className: iconClassName,
            size,
          })}
        />
      </div>
    </div>
  );
}
