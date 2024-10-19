import { BaseIcon } from '@ui/atoms';

import { BaseSwitchWithIconProps } from '../BaseSwitch/types';

/**
 * switch component that toggles between a startIcon and moon endIcon.
 *
 * @param {BaseSwitchWithIconProps} props - Props for the component.
 * @param {string} props.id - The id of the input element.
 * @param {string} props.name - The name attribute for the input element.
 * @param {boolean} [props.disabled=false] - If true, the switch is disabled.
 * @param {boolean} [props.checked] - Indicates if the switch is checked (dark mode enabled).
 * @param {(checked: boolean) => void} [props.onChange] - Callback function triggered when the switch state changes.
 * @param {IconifyIcon} props.rightIcon - The icon to display when in light mode.
 * @param {IconifyIcon} props.leftIcon - The icon to display when in dark mode.
 * @returns {JSX.Element} The BaseSwitchWithIcon component.
 *
 */

export function BaseSwitchWithIcon(
  props: BaseSwitchWithIconProps
): JSX.Element {
  const {
    id,
    name,
    onChange,
    disabled = false,
    checked,
    rightIcon,
    leftIcon,
  } = props;

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
          className="sr-only"
          onChange={onChange}
          checked={checked}
          disabled={disabled}
        />
        <div
          className={`relative rounded-full w-10 h-6 translate duration-200 
          ${checked ? 'bg-gray-800' : 'bg-gray-200'}`}
        >
          <span
            className={`absolute top-1 left-1 transition-transform duration-200
            ${checked ? 'translate-x-4' : 'translate-x-0'}`}
          >
            {checked ? (
              <BaseIcon
                icon={leftIcon}
                className="text-gray-200 bg-gray-600 rounded-full"
              />
            ) : (
              <BaseIcon
                icon={rightIcon}
                className="text-gray-500 bg-white rounded-full"
              />
            )}
          </span>
        </div>
      </label>
    </div>
  );
}
