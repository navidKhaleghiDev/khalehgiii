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
    defaultValue,
    label,
    error,
    min = 0,
    max = 100,
    onChange,
    disabled,
    fullWidth,
    onKeyDown,
    icon,
  } = props;

  const rtl = dir === 'rtl';
  const [value, setValue] = useState<string | number>(defaultValue ?? 0);

  useEffect(() => {
    if (defaultValue !== undefined && defaultValue !== value) {
      setValue(defaultValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue]);

  const isOutOfRange =
    typeof value === 'number' && (value > max || value < min);

  const handleValueChange = (type: 'increment' | 'decrement') => {
    const currentValue =
      typeof value === 'number' ? value : parseFloat(value) || 0;
    const newValue =
      type === 'increment'
        ? Math.min(currentValue + 1, max)
        : Math.max(currentValue - 1, min);
    setValue(newValue);
    onChange?.(newValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    if (value === 0 && newValue !== '') {
      setValue(newValue);
    } else {
      setValue(newValue === '' ? '' : Number(newValue));
    }

    // eslint-disable-next-line no-restricted-globals
    if (newValue !== '' && !isNaN(Number(newValue))) {
      onChange?.(Number(newValue));
    }
  };

  console.log(value);

  return (
    <div dir={dir} className={`w-full ${className ?? ''}`}>
      {label && (
        <label
          htmlFor={id}
          className={`mb-[0.13rem] ${rtl ? 'text-right' : 'text-left'}`}
        >
          <Typography
            variant="body6"
            className={`mb-1 ${
              error && !disabled
                ? 'text-red-500 dark:text-red-500'
                : 'text-gray-200'
            } ${
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
            value={value}
            onChange={handleInputChange}
            onFocus={() => {
              if (value === 0) {
                setValue('');
              }
            }}
            onBlur={() => {
              if (value === '') {
                setValue(0);
                onChange?.(0);
              }
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
            onKeyDown={onKeyDown}
          />
          {icon && (
            <BaseIcon
              className={BaseIconInputNumberStyles({
                dir,
                intent: error || isOutOfRange ? 'error' : 'default',
              })}
              icon={icon}
            />
          )}
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
      {(isOutOfRange || error) && (
        <Typography color="red" variant="body6" className="min-h-5">
          {error}
        </Typography>
      )}
    </div>
  );
}
