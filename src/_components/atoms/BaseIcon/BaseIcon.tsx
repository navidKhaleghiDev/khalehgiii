import { Icon } from '@iconify/react';

import { baseIconStyles } from './styles';
import { BaseIconProps } from './types';

/**
 * BaseIcon Component
 *
 * This component renders an icon from Iconify library.
 *
 * @component
 * @param {BaseIconProps} props - The props for the BaseIcon component, including:
 *   @param {colorsList} props.color - Determine the color of the icon.
 *   @param {'default' | 'xs' | 'sm' | 'md' | 'lg'} props.size - Determine the size of the icon.
 *   @param {'primary' | 'default'} props.hoverColor - Determine the hover color of the icon.
 *   @param {string} [props.className] - Set custom className.
 *   @param {string} [props.icon="fa:home"] - Set icon name from iconify library.
 *
 * @returns {JSX.Element} The returned base icon component.
 */

export function BaseIcon(props: BaseIconProps): JSX.Element {
  const { color, size, hoverColor, className, icon } = props;
  return (
    <Icon
      className={baseIconStyles({ size, color, hoverColor, className })}
      icon={icon}
    />
  );
}
