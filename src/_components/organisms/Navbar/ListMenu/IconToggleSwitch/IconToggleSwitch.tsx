import { useState } from 'react';

import { BaseIcon } from '@redesignUi/atoms';
import sunRisingTwotoneLoop from '@iconify-icons/line-md/sun-rising-twotone-loop';
import moonTwotoneAltLoop from '@iconify-icons/line-md/moon-twotone-alt-loop';
import { BaseSwitchWithIconProps } from '@redesignUi/atoms/BaseSwitch/types';

export function IconToggleSwitch(props: BaseSwitchWithIconProps): JSX.Element {
  const { id, name, onChange, disabled = false } = props;
  const [switchChecked, setSwitchChecked] = useState(false);

  const handleToggle = () => {
    if (disabled) return;

    const newCheckedState = !switchChecked;
    setSwitchChecked(newCheckedState);

    if (onChange) {
      onChange(newCheckedState);
    }
  };

  return (
    <div className="flex items-center">
      <label
        htmlFor={id}
        className={`relative inline-flex ${
          disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
        }`}
      >
        <input
          type="checkbox"
          id={id}
          name={name}
          className="sr-only peer"
          onChange={handleToggle}
          checked={switchChecked}
          disabled={disabled}
        />
        <div
          className={`relative rounded-full w-10 h-6 translate duration-200 
          ${switchChecked ? 'bg-gray-200' : 'bg-gray-800'}`}
        >
          <span
            className={`absolute top-1 left-1 transition-transform duration-200
            ${switchChecked ? 'translate-x-4' : 'translate-x-0'}`}
          >
            {switchChecked ? (
              <BaseIcon
                icon={sunRisingTwotoneLoop}
                className="text-gray-500 bg-white rounded-full"
              />
            ) : (
              <BaseIcon
                icon={moonTwotoneAltLoop}
                className="text-gray-200 bg-gray-600 rounded-full"
              />
            )}
          </span>
        </div>
      </label>
    </div>
  );
}
