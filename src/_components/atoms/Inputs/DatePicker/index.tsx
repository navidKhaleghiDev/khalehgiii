import { useState, useRef } from 'react';
import DatePicker, { DatePickerRef } from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import gregorian from 'react-date-object/calendars/gregorian';
import gregorian_en from 'react-date-object/locales/gregorian_en';
import persian_fa from 'react-date-object/locales/persian_fa';

import phCaretDown from '@iconify-icons/ph/caret-down';
import phCaretLeft from '@iconify-icons/ph/caret-left';
import { useLanguage } from '@context/settings/languageContext';
import { useTheme } from '@context/settings/themeContext';
import { BaseButton } from '@redesignUi/atoms/BaseButton';

import { MultiDatePickerProps } from './types';
import './style.css';

export function MultiDatePicker({
  name,
  id,
  fullWidth = false,
  className,
  maxDate,
  size,
  minDate,
  value: initialValue,
  disabled,
  timeDuration,
  format = 'YYYY/MM/DD',
  onChange,
}: MultiDatePickerProps) {
  const [openDate, setOpenData] = useState(false);
  const [value, setValue] = useState(initialValue);
  const datePickerRef = useRef<DatePickerRef>(null);

  const { theme } = useTheme();
  const { lang } = useLanguage();
  const farsi = lang === 'fa';
  const darkMode = theme === 'dark';

  const clearDate = () => {
    setValue(undefined);
    onChange(undefined);
  };

  const handleSubmit = () => {
    if (datePickerRef.current) {
      datePickerRef.current.closeCalendar();
    }
  };

  return (
    <div className={`${fullWidth ? 'w-full' : 'w-80'} ${className || ''}`}>
      <DatePicker
        ref={datePickerRef}
        onlyMonthPicker={timeDuration?.montly}
        weekPicker={timeDuration?.weekly}
        id={id}
        onChange={(val) => {
          setValue(val);
          onChange(val);
        }}
        weekDays={farsi ? ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'] : undefined}
        className={darkMode ? 'custom-calendar-dark' : 'custom-calendar'}
        arrow={false}
        value={value}
        name={name}
        disabled={disabled}
        onOpen={() => setOpenData(true)}
        onClose={() => setOpenData(false)}
        format={format}
        render={(_, openCalendar) => (
          <BaseButton
            label={size === 'md' ? 'انتخاب تاریخ' : 'تاریخ'}
            onClick={openCalendar}
            endIcon={openDate ? phCaretDown : phCaretLeft}
            type="neutral"
            size={size}
            disabled={disabled}
            className={
              openDate
                ? '!bg-gray-200 hover:bg-gray-200 dark:!bg-gray-800 '
                : ''
            }
          />
        )}
        calendar={farsi ? persian : gregorian}
        range
        locale={farsi ? persian_fa : gregorian_en}
        calendarPosition="bottom-right"
        containerClassName={`${fullWidth ? 'w-full' : 'w-36'} ${
          className || ''
        }`}
        minDate={minDate}
        maxDate={maxDate}
      >
        <div className="flex items-center justify-center gap-5">
          <BaseButton
            label="لغو"
            size="sm"
            type="neutral"
            onClick={clearDate}
          />
          <BaseButton label="تایید " size="sm" onClick={handleSubmit} />
        </div>
      </DatePicker>
    </div>
  );
}
