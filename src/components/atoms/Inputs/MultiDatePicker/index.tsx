/* eslint-disable import/no-duplicates */
/* eslint-disable import/no-extraneous-dependencies */
import { memo } from 'react';
import { DateObject } from 'react-multi-date-picker';
import xIcon from '@iconify-icons/ph/x';
import calendarIcon from '@iconify-icons/ph/calendar';
import persian from 'react-date-object/calendars/persian';
import gregorian from 'react-date-object/calendars/gregorian';
import persian_fa from 'react-date-object/locales/persian_fa';
import { Controller } from 'react-hook-form';
import { Typography } from '@ui/atoms/Typography';
import TimePicker from 'react-multi-date-picker/plugins/time_picker';
import DatePicker from 'react-multi-date-picker';
// import TimePicker from 'react-multi-date-picker/plugins/analog_time_picker';

import { DatePickerProps } from '../types';
import { baseInputStyles } from '../styles';
import { IconInput } from '../IconInput';
import { IconButtonInput } from '../IconButtonInput';

export function convertI2ToAD(
  i2Date?: DateObject | DateObject[] | undefined,
  format = 'YYYY-MM-DD hh:mm:ss'
): string | string[] | undefined {
  if (!i2Date) return undefined;

  const convertDate = (date: DateObject) =>
    new DateObject({
      date: date.toDate(),
      calendar: gregorian,
    }).format('YYYY-MM-DD');

  return Array.isArray(i2Date) ? i2Date.map(convertDate) : convertDate(i2Date);
}

export const MultiDatePicker = memo(function MultiDatePicker({
  control,
  name,
  id,
  placeholder,
  rules,
  fullWidth = false,
  defaultValue,
  intent,
  label,
  hiddenError,
  className,
  maxDate,
  minDate,
  showTimePicker = false,
  format = 'YYYY/MM/DD',
}: DatePickerProps) {
  const containerClass = `${fullWidth ? 'w-full' : 'w-36'} ${className || ''}`;
  const inputClass = baseInputStyles({
    intent,
    className: `${fullWidth ? 'w-full' : 'w-36'} h-10 ${className || ''}`,
    fullWidth,
    size: 'none',
  });

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <div className={containerClass}>
            {label && (
              <label htmlFor={id} className="block mb-1">
                <Typography color="teal" size="h5">
                  {label}
                </Typography>
              </label>
            )}
            <div className="relative">
              {value ? (
                <IconButtonInput
                  icon={xIcon}
                  intent={intent}
                  onClick={() => onChange(null)}
                />
              ) : (
                <IconInput icon={calendarIcon} intent={intent} />
              )}

              <DatePicker
                onFocusedDateChange={(newDate) =>
                  onChange(newDate?.isValid ? newDate : '')
                }
                value={value}
                format={format}
                calendar={persian}
                // multiple
                // range
                locale={persian_fa}
                placeholder={placeholder}
                calendarPosition="bottom-right"
                containerClassName={containerClass}
                inputClass={inputClass}
                minDate={minDate}
                maxDate={maxDate}
              />
            </div>
            {!hiddenError && (
              <Typography color="red" size="caption" className="h-6">
                {error?.message ?? ''}
              </Typography>
            )}
          </div>
        );
      }}
    />
  );
});
