import X from '@iconify-icons/ph/x';

import { Typography } from '@redesignUi/atoms';
import { chipButtonStyles } from './styles';
import { BaseIcon } from '../BaseIcon';
import { ChipButtonProps } from './types';

/**
 * Props for the ChipButton component.
 *
 * @typedef {Object} ChipButtonProps
 * @property {string} label - The text label to display inside the button.
 * @property {IBaseIcon['icon']} [icon] - Optional icon to display within the button.
 * @property {() => void} [onClick] - Optional click handler function for the button.
 * @property {IBaseIcon['color']} color - The color of the button and icon.
 * @property {'rtl' | 'ltr'} [dir='rtl'] - The text direction, defaults to 'rtl'.
 * @property {string} [className] - Optional additional class names for custom styling.
 * @property {boolean} [disabled=false] - If true, the button will be disabled.
 */

/**
 * A ChipButton component that displays a label with optional icons and styles.
 *
 * @param {ChipButtonProps} props - The properties passed to the ChipButton component.
 * @returns {JSX.Element} The rendered ChipButton component.
 */

export function ChipButton({
  label,
  color,
  onClick,
  icon,
  className,
  disabled,
  dir = 'rtl',
}: ChipButtonProps) {
  return (
    <button
      dir={dir}
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={chipButtonStyles({ className, color })}
    >
      {icon && <BaseIcon color={color} icon={icon} />}
      <Typography className="w-[80%] truncate">{label}</Typography>
      {onClick && <BaseIcon icon={X} color={color} />}
    </button>
  );
}
