import { useState } from 'react';
import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import gregorian from 'react-date-object/calendars/gregorian';
import gregorian_en from 'react-date-object/locales/gregorian_en';
import persian_fa from 'react-date-object/locales/persian_fa';

import phCaretDown from '@iconify-icons/ph/caret-down';
import phCaretLeft from '@iconify-icons/ph/caret-left';
import { useLanguage } from '@context/settings/languageContext';
import { BaseButton } from '@redesignUi/atoms/BaseButton';

import { MultiDatePickerProps } from './types';
import './style.css';

// Note:add i18 to the label of the component
// Note: check the logic of the line 69

export function MultiDatePicker({
  name,
  id,
  placeholder,
  fullWidth = false,
  className,
  maxDate,
  minDate,
  value,
  disabled,
  timeDuration,
  format = 'YYYY/MM/DD',
  onChange,
}: MultiDatePickerProps) {
  const [openDate, setOpenData] = useState(false);
  const { lang } = useLanguage();
  const local = lang === 'fa' ? persian_fa : gregorian_en;
  const calendar = lang === 'fa' ? persian : gregorian;

  console.log(openDate);

  return (
    <div className={`${fullWidth ? 'w-full' : 'w-36'} ${className || ''}`}>
      <DatePicker
        onlyMonthPicker={timeDuration?.montly}
        weekPicker={timeDuration?.weekly}
        id={id}
        onChange={onChange}
        weekDays={['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج']}
        className="custom-calendar"
        arrow={false}
        value={value}
        name={name}
        disabled={disabled}
        onOpen={() => setOpenData(true)}
        onClose={() => setOpenData(false)}
        format={format}
        render={(_, openCalendar) => (
          <BaseButton
            label="انتخاب تاریخ"
            onClick={openCalendar}
            endIcon={openDate ? phCaretDown : phCaretLeft}
            type="neutral"
            className={openDate ? '!bg-neutral-200 hover:bg-neutral-200' : ''}
          />
        )}
        calendar={calendar}
        range
        locale={local}
        placeholder={placeholder}
        calendarPosition="bottom-right"
        containerClassName={`${fullWidth ? 'w-full' : 'w-36'} ${
          className || ''
        }`}
        minDate={minDate}
        maxDate={maxDate}
      >
        <div className="flex items-center justify-center gap-5">
          <BaseButton label="لغو" size="sm" type="neutral" />
          <BaseButton label="تایید " size="sm" />
        </div>
      </DatePicker>
    </div>
  );
}
