import { BaseIcon } from '@ui/atoms/BaseIcon';

import { IconType } from '@src/types/global';
import { ColorIndent } from '../types';
import { iconBaseInputStyles } from '../styles';

type PropsType = {
  intent: ColorIndent;
  icon: IconType;
};

export function IconInput({ icon, intent }: PropsType) {
  return (
    <div
      className={iconBaseInputStyles({
        intent,
        className: 'pointer-events-none',
      })}
    >
      <BaseIcon icon={icon} className="mx-1" size="xs" />
    </div>
  );
}
