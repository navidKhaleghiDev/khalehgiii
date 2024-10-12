import { memo } from 'react';
import DatePicker from 'react-multi-date-picker';

import 'react-multi-date-picker/styles/colors/teal.css';
import persian from 'react-date-object/calendars/persian';
import gregorian from 'react-date-object/calendars/gregorian';

import gregorian_en from 'react-date-object/locales/gregorian_en';
import persian_fa from 'react-date-object/locales/persian_fa';
import { Controller } from 'react-hook-form';
import { Typography } from '@redesignUi/atoms/Typography';

import { useLanguage } from '@context/settings/languageContext';
import xIcon from '@iconify-icons/ph/x';
import calendarIcon from '@iconify-icons/ph/calendar';
import { BaseButton } from '@redesignUi/atoms/BaseButton';
import { IconInput } from '@ui/atoms/Inputs/IconInput';
import { useTranslation } from 'react-i18next';
import { IconButtonInput } from '@ui/atoms/Inputs/IconButtonInput';
import { baseInputStyles } from '../../styles';
import { DatePickerProps } from '../types';

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
  timeDuration,
  format = 'YYYY/MM/DD',
  submitButton = false,
  onChange,
}: DatePickerProps) {
  const { t } = useTranslation();
  const containerClass = `${fullWidth ? 'w-full' : 'w-36'} ${className || ''}`;
  const inputClass = baseInputStyles({
    intent,
    className: `${fullWidth ? 'w-full' : 'w-36'} h-10 ${className || ''}`,
    fullWidth,
  });
  const { lang } = useLanguage();
  const local = lang === 'fa' ? persian_fa : gregorian_en;
  const calendar = lang === 'fa' ? persian : gregorian;

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => {
        if (field.value && onChange) {
          onChange(field.value);
        }
        return (
          <div className={containerClass}>
            {label && (
              <label htmlFor={id} className="block mb-1">
                <Typography color="teal" variant="body5">
                  {label}
                </Typography>
              </label>
            )}
            <div className="relative">
              {field.value ? (
                <IconButtonInput
                  icon={xIcon}
                  intent={intent}
                  onClick={() => {
                    field.onChange(undefined);
                  }}
                />
              ) : (
                <IconInput icon={calendarIcon} intent={intent} />
              )}
              <DatePicker
                // onlyYearPicker={timeDuration?.year}
                onlyMonthPicker={timeDuration?.montly}
                weekPicker={timeDuration?.weekly}
                onChange={field.onChange}
                value={field.value}
                format={format}
                calendar={calendar}
                range
                locale={local}
                placeholder={placeholder}
                calendarPosition="bottom-right"
                className="teal"
                containerClassName={containerClass}
                inputClass={inputClass}
                minDate={minDate}
                maxDate={maxDate}
              >
                {submitButton && (
                  <div className="p-4">
                    <BaseButton
                      disabled={!field.value || !field.value[1]}
                      className="flex mx-auto "
                      type="neutral"
                      submit
                      label={t('global.send')}
                    />
                  </div>
                )}
              </DatePicker>
            </div>
            {!hiddenError && (
              <Typography color="red" variant="body5" className="h-6">
                {error?.message ?? ''}
              </Typography>
            )}
          </div>
        );
      }}
    />
  );
});
