/* eslint-disable jsx-a11y/control-has-associated-label */
import { useCallback } from 'react';
import { iconButtonStyles } from './styles';
import { IIconButton } from './types';
import { BaseIcon } from '../BaseIcon';
import ToolTip from '../Tooltip';
import { TooltipPosition } from '../Tooltip/types';

export function IconButton({
  onClick,
  className,
  classNameIcon,
  icon,
  size,
  color,
  type,
  disabled,
  tooltip,
  tooltipPosition,
}: IIconButton) {
  const Component = useCallback(
    () => (
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
    ),
    [className, classNameIcon, color, disabled, icon, onClick, size, type]
  );

  return (
    <div>
      {tooltip ? (
        <ToolTip
          tooltip={tooltip}
          position={tooltipPosition as TooltipPosition}
        >
          <Component />
        </ToolTip>
      ) : (
        <Component />
      )}
    </div>
  );
}
