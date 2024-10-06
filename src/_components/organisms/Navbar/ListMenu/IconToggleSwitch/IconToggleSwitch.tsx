import { useState } from 'react';

import sunRisingTwotoneLoop from '@iconify-icons/line-md/sun-rising-twotone-loop';
import moonTwotoneAltLoop from '@iconify-icons/line-md/moon-twotone-alt-loop';
import { BaseIcon } from '@redesignUi/atoms';

interface ThemeSwitcherProps {
  checked?: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  id: string;
  name: string;
}

export function IconToggleSwitch(props: ThemeSwitcherProps): JSX.Element {
  const { id, name, checked, onChange, disabled = false } = props;
  const [internalChecked, setInternalChecked] = useState(false);

  const isChecked = checked !== undefined ? checked : internalChecked;

  const handleToggle = () => {
    if (disabled) return;

    if (onChange) {
      onChange(!isChecked);
    } else {
      setInternalChecked(!isChecked);
    }
  };

  return (
    <div className="flex items-center">
      <label
        htmlFor={id}
        className={`relative inline-flex ${
          disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
        }`}
        aria-label="none"
      >
        <input
          id={id}
          name={name}
          type="checkbox"
          className="sr-only peer"
          onChange={handleToggle}
          checked={isChecked}
          disabled={disabled}
        />
        <div
          className={`relative rounded-full w-10 h-6
          } translate duration-200 
          ${isChecked ? 'bg-gray-600' : 'bg-gray-100'}`}
        >
          <span
            className={`absolute top-1 left-1 transition-transform duration-200
            ${isChecked ? 'translate-x-4' : 'translate-x-0'}`}
          >
            {isChecked ? (
              <BaseIcon icon={moonTwotoneAltLoop} className="text-gray-200" />
            ) : (
              <BaseIcon icon={sunRisingTwotoneLoop} className="text-gray-500" />
            )}
          </span>
        </div>
      </label>
    </div>
  );
}
