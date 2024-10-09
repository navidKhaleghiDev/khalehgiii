import { useState } from 'react';
import PhPlus from '@iconify-icons/ph/plus';
import PhMinus from '@iconify-icons/ph/minus';
import PhUserLight from '@iconify-icons/ph/user-light';

import { IconButton } from '@redesignUi/atoms/BaseButton';
import { Typography } from '@redesignUi/atoms/Typography';
import { BaseIcon } from '@redesignUi/atoms/BaseIcon';
import { BaseInput } from '@redesignUi/atoms/inputs/BaseInput';

import {
  BaseIconInputNumberStyles,
  baseInputNumberStyles,
  iconBaseInputNumberButtonStyles,
} from './styles';
import { BaseInputNumberProps } from './types';

/**
 * BaseInputNumber is a custom input component that allows users to increment and decrement
 * a numerical value within a specified range using buttons. It also supports RTL and LTR
 * directionality and can display a label and an optional error message.
 *
 * @template T - The type of the input's value.
 *
 * @param {Object} props - The props for the BaseInputNumber component.
 * @param {string} props.id - The ID of the input element.
 * @param {'rtl' | 'ltr'} [props.dir='rtl'] - Direction of the input ('rtl' for right-to-left or 'ltr' for left-to-right).
 * @param {string} [props.placeholder] - Placeholder text for the input.
 * @param {string} [props.className] - Additional CSS classes for styling the component.
 * @param {boolean} [props.fullWidth=false] - Whether the input should take up the full width of its container.
 * @param {number} [props.defaultValue=0] - The initial value of the input.
 * @param {string} [props.intent] - The visual intent (e.g., 'primary', 'neutral', 'error') of the input.
 * @param {string} [props.size] - The size of the input.
 * @param {string} [props.label] - The label displayed above the input field.
 * @param {string} [props.error] - The error message to display.
 * @param {number} [props.min=0] - The minimum value for the input.
 * @param {number} [props.max=100] - The maximum value for the input.
 *
 * @returns {JSX.Element} A number input component with increment/decrement buttons and optional label and error handling.

 */
export function BaseInputNumber(props: BaseInputNumberProps): JSX.Element {
  const {
    id,
    dir = 'rtl',
    size,
    placeholder,
    className,
    defaultValue = 0,
    label,
    error,
    min = 0,
    max = 100,
    onChange,
    disabled,
    fullWidth,
  } = props;

  const rtl = dir === 'rtl';
  const [value, setValue] = useState<number>(defaultValue);

  const isOutOfRange = value > max || value < min;

  const handleValueChange = (type: 'increment' | 'decrement') => {
    const newValue =
      type === 'increment'
        ? Math.min(value + 1, max)
        : Math.max(value - 1, min);
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div dir={dir} className={`w-full ${className ?? ''}`}>
      {label && (
        <label
          htmlFor={id}
          className={`block mb-1 h-8 ${
            rtl ? 'text-left uppercase' : 'text-right'
          }`}
        >
          <Typography color="neutralDark" variant="body4">
            {label}
          </Typography>
        </label>
      )}
      <div className="flex items-center w-full">
        <div dir={dir} className={`flex relative${fullWidth ? 'w-full' : ''}`}>
          <input
            id={id}
            type="number"
            value={value === 0 ? '' : value}
            onChange={(e) => {
              const newValue = Number(e.target.value);
              setValue(newValue);
              onChange(newValue);
            }}
            className={baseInputNumberStyles({
              intent: error || isOutOfRange ? 'error' : 'default',
              size,
              className,
              dir,
              disabled,
              fullWidth,
            })}
            disabled={disabled}
            placeholder={placeholder}
            min={min}
            max={max}
          />
          <BaseIcon
            className={BaseIconInputNumberStyles({
              dir,
              intent: error || isOutOfRange ? 'error' : 'default',
            })}
            icon={PhUserLight}
          />
        </div>
        <IconButton
          disabled={disabled}
          icon={PhPlus}
          color="neutral"
          onClick={() => handleValueChange('increment')}
          className={iconBaseInputNumberButtonStyles({
            [dir]: 'right',
            size,
            disabled,
          })}
        />
        <IconButton
          disabled={disabled}
          icon={PhMinus}
          onClick={() => handleValueChange('decrement')}
          color="neutral"
          className={iconBaseInputNumberButtonStyles({
            [dir]: 'left',
            size,
            disabled,
          })}
        />
      </div>
      {isOutOfRange ||
        (error && (
          <Typography color="red" variant="body6" className="min-h-5">
            {error}
          </Typography>
        ))}
    </div>
  );
}
