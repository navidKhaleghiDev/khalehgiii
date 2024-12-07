import { Icon } from '@iconify/react';

import { baseIconStyles } from './styles';
import { BaseIconProps } from './types';

export function BaseIcon({
  color,
  size,
  hoverColor,
  className,
  icon = 'fa:home',
}: BaseIconProps) {
  return (
    <Icon
      className={baseIconStyles({ size, color, hoverColor, className })}
      icon={icon}
    />
  );
}
