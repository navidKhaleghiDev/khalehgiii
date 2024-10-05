import { Typography } from '@ui/atoms/Typography';

import { BaseSwitchProps } from './types';
import { baseSwitchStyles } from './styles';

/**
 * BaseSwitch component renders a customizable toggle switch with optional labels and uncontrolled states.
 *
 * @component
 *
 * @param {Object} props - The properties for the BaseSwitch component.
 * @param {'small' | 'medium' | 'responsive'} props.size - Defines the size of the switch.
 * @param {string} [props.label] - Optional label displayed next to the switch.
 * @param {string} props.name - The name of the switch input, used as its identifier.
 * @param {boolean} [props.defaultValue] - Default value for the controlled state (used with `react-hook-form`).
 * @param {(checked: boolean) => void} [props.onClick] - Callback function to handle onChange events.
 * @param {string} [props.value] - External value
 * @param {boolean} [props.defaultChecked] - Default checked state for the uncontrolled switch.
 * @param {boolean} [props.disabled=false] - If true, disables the switch and prevents user interaction.
 *
 * @returns {JSX.Element} The BaseSwitch component.
 */

export function BaseSwitch(props: BaseSwitchProps): JSX.Element {
  const {
    id,
    size,
    label,
    name,
    onChange,
    checked,
    error,
    dir = 'rtl',
    disabled = false,
    hiddenError,
  } = props;

  return (
    <div className="flex">
      {label && (
        <label
          htmlFor={id}
          className={`inline-flex items-center cursor-pointer 
            ${dir === 'ltr' && 'text-left'}
            ${disabled && 'opacity-50'}`}
        >
          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            <Typography color="black" variant="body6" className="mx-2">
              {label}
            </Typography>
          </span>
        </label>
      )}
      <label
        htmlFor={id}
        className={`select-none items-center relative inline-flex `}
        aria-label="none"
      >
        <input
          id={id}
          name={name}
          type="checkbox"
          className="sr-only peer"
          onChange={onChange}
          disabled={disabled}
          checked={checked}
        />
        <div
          className={`${baseSwitchStyles({
            size,
          })} ${disabled && 'opacity-40'} 
          ${disabled ? 'cursor-not-allowed' : 'cursor-default'}`}
        />
      </label>
      {!hiddenError && (
        <Typography
          color="red"
          variant="body6"
          className={`${
            dir === 'ltr' ? 'text-left' : 'text-right'
          } min-h-6 mx-2`}
        >
          {error ?? ''}
        </Typography>
      )}
    </div>
  );
}
