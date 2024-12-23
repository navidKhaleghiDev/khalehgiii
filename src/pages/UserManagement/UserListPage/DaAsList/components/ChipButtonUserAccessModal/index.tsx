import React from 'react';

import { IconType } from '@src/types/global';
import { BaseIcon } from '@ui/atoms';

import { chipButtonUserAccessModalStyles } from './styles';

type BaseButtonAttributes = React.ComponentPropsWithoutRef<'button'>;
interface ChipButtonUserAccessModalProps extends BaseButtonAttributes {
  label: string;
  icon?: IconType;
  color?: 'neutral' | 'teal' | 'yellow' | 'red' | 'blue' | 'purple';
}

export function ChipButtonUserAccessModal({
  label,
  color,
  onClick,
  icon,
  className,
  disabled,
}: ChipButtonUserAccessModalProps) {
  return (
    <button
      disabled={disabled}
      className={chipButtonUserAccessModalStyles({ color, className })}
      type="button"
      onClick={onClick}
    >
      {icon && <BaseIcon icon={icon} color="neutral" size="xs" />}
      {label}
    </button>
  );
}
