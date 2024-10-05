import { BaseIcon } from '@ui/atoms/BaseIcon';
import { Typography } from '@ui/atoms/Typography';
import checkBold from '@iconify-icons/ph/check-bold';

import { baseCheckBoxStyles } from './styles';
import { BaseCheckBoxProps } from './types';
/**
 * BaseCheckBox component.
 *
 * @param {string} props.name
 * @param {string} props.id
 * @param {string} [props.label] - The label to display next to the checkbox.
 * @param {string} [props.className]
 * @param {boolean} [props.checked] - To handel the input  with state.
 * @param {string} [props.error]
 * @param {boolean} [props.showError] - makes our error visible
 * @param {boolean} [props.disabled]
 * @param {function} [props.onChange] - Change handler for checking it.
 * @param {'sm' | 'md' | "responsive"} [props.size = "md"]
 *
 * @returns {JSX.Element} The rendered checkbox component.
 */

export function BaseCheckBox(props: BaseCheckBoxProps): JSX.Element {
  const {
    name,
    id,
    label,
    className,
    checked,
    error,
    showError,
    disabled,
    value,
    onChange,
    size = 'md',
  } = props;

  // BaseIcon has been modified in other branch so i had to add this condition to size of icon also consider the responsive mode
  return (
    <div>
      <div className={`flex gap-2 items-center ${className ?? ''}`}>
        <div className="inline-flex items-center relative">
          <input
            id={id}
            type="checkbox"
            name={name}
            disabled={disabled}
            checked={checked}
            onChange={onChange}
            value={value}
            className={baseCheckBoxStyles({
              error: Boolean(error),
              size,
            })}
          />
          <span className="absolute hidden peer-checked:block text-gray-100 dark:peer-disabled:hidden dark:peer-checked:text-gray-100 dark:text-gray-500 peer-disabled:opacity-50 transition-opacity pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
            <BaseIcon icon={checkBold} size={size === 'md' ? 'sm' : 'xs'} />
          </span>
        </div>
        {label && (
          <label htmlFor={id}>
            <Typography
              color="neutralDark"
              variant="body6"
              className={`${
                disabled && 'opacity-50'
              } leading-4 dark:text-white ${
                error && 'text-red-500 dark:text-red-500'
              } `}
            >
              {label}
            </Typography>
          </label>
        )}
      </div>
      {showError && (
        <Typography
          color="red"
          variant="body6"
          className="text-left rtl:text-right min-h-10"
        >
          {error ?? ''}
        </Typography>
      )}
    </div>
  );
}
