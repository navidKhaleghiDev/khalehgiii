import { Icon } from '@iconify/react';

import { baseIconStyles } from './styles';
import { IBaseIcon } from './types';

export function BaseIcon({
  color,
  size,
  hoverColor,
  className,
  icon = 'fa:home',
}: IBaseIcon) {
  return (
    <Icon
      className={baseIconStyles({ size, color, hoverColor, className })}
      icon={icon}
    />
  );
}
