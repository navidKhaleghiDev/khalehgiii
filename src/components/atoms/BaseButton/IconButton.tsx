/* eslint-disable jsx-a11y/control-has-associated-label */
import { iconButtonStyles } from './styles';
import { IIconButton } from './types';
import { BaseIcon } from '../BaseIcon';

export function IconButton({
  onClick,
  className,
  classNameIcon,
  icon,
  size,
  color,
  type,
  disabled,
}: IIconButton) {
  return (
    <button
      type={type === 'submit' ? 'submit' : 'button'}
      onClick={onClick}
      className={iconButtonStyles({
        color,
        size,
        className,
      })}
      disabled={disabled}
    >
      <BaseIcon icon={icon} size={size} className={classNameIcon} />
    </button>
  );
}
