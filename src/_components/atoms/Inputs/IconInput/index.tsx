import { VariantProps } from 'class-variance-authority';
import { IconType } from '@src/types/global';
import { BaseIcon } from '@ui/atoms/BaseIcon';

import { iconBaseInputStyles } from '../styles';
import { ColorIndent } from '../types';

interface IconInputProps extends VariantProps<typeof iconBaseInputStyles> {
  intent: ColorIndent;
  icon: IconType;
  dir?: 'rtl' | 'ltr';
  error?: string | undefined;
}

export function IconInput({
  icon,
  dir,
  error,
  intent = 'default',
}: IconInputProps) {
  return (
    <div
      className={iconBaseInputStyles({
        intent: error ? 'error' : intent,
        className: `${dir === 'rtl' && 'right-0'} pointer-events-none left-0`,
      })}
    >
      <BaseIcon icon={icon} size="sm" />
    </div>
  );
}
