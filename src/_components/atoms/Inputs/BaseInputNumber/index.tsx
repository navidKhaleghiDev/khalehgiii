import { useState, useEffect } from 'react';
import PhPlus from '@iconify-icons/ph/plus';
import PhMinus from '@iconify-icons/ph/minus';

import { IconButton } from '@redesignUi/atoms/BaseButton';
import { Typography } from '@redesignUi/atoms/Typography';
import { BaseIcon } from '@redesignUi/atoms/BaseIcon';

import {
  BaseIconInputNumberStyles,
  baseInputNumberStyles,
  iconBaseInputNumberButtonStyles,
} from './styles';
import { BaseInputNumberProps } from './types';

export function BaseInputNumber(props: BaseInputNumberProps): JSX.Element {
  const {
    name,
    id,
    dir = 'rtl',
    size,
    placeholder,
    className,
    defaultValue = 0,
    value: externalValue, // Added this prop to sync with Controller
    label,
    error,
    min = 0,
    max = 100,
    onChange,
    disabled,
    fullWidth,
    icon,
  } = props;
  const rtl = dir === 'rtl';
  const [value, setValue] = useState<number>(defaultValue);
  useEffect(() => {
    if (externalValue !== undefined && externalValue !== value) {
      setValue(externalValue as number);
    }
  }, [externalValue, value]);

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
          className={`mb-[0.13rem] ${rtl ? 'text-right' : 'text-left'}`}
        >
          <Typography
            variant="body6"
            className={`${
              error && !disabled
                ? 'text-red-500 dark:text-red-500'
                : 'text-gray-200'
            }  ${
              disabled
                ? 'text-gray-300 dark:text-gray-500'
                : 'text-gray-500 dark:text-white'
            }`}
          >
            {label}
          </Typography>
        </label>
      )}
      <div className="flex items-center w-full">
        <div dir={dir} className={`flex relative ${fullWidth ? 'w-full' : ''}`}>
          <input
            name={name}
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
            defaultValue={defaultValue}
            max={max}
          />
          {icon ? (
            <BaseIcon
              className={BaseIconInputNumberStyles({
                dir,
                intent: error || isOutOfRange ? 'error' : 'default',
              })}
              icon={icon}
            />
          ) : null}
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
