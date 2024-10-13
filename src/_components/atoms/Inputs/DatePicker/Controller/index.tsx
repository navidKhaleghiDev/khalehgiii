import { useState } from 'react';
import DatePicker from 'react-multi-date-picker';
import { Controller } from 'react-hook-form';
import persian from 'react-date-object/calendars/persian';
import gregorian from 'react-date-object/calendars/gregorian';
import gregorian_en from 'react-date-object/locales/gregorian_en';
import persian_fa from 'react-date-object/locales/persian_fa';
import phCaretDown from '@iconify-icons/ph/caret-down';
import phCaretLeft from '@iconify-icons/ph/caret-left';

import { useLanguage } from '@context/settings/languageContext';
import { BaseButton } from '@redesignUi/atoms/BaseButton';

import { DatePickerPropsController } from '../types';
import '../style.css';

// Note:add i18 to the label of the component
// Note: check the logic of the line 69

export function MultiDatePickerController({
  control,
  name,
  id,
  placeholder,
  rules,
  fullWidth = false,
  defaultValue,
  className,
  maxDate,
  minDate,
  timeDuration,
  format = 'YYYY/MM/DD',
  onChange,
}: DatePickerPropsController) {
  const containerClass = `${fullWidth ? 'w-full' : 'w-36'} ${className || ''}`;
  const { lang } = useLanguage();
  const local = lang === 'fa' ? persian_fa : gregorian_en;
  const calendar = lang === 'fa' ? persian : gregorian;
  const [openDate, setOpenData] = useState(false);
  const weekDays = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field }) => {
        if (field.value && onChange) {
          onChange(field.value);
        }
        return (
          <div className={containerClass}>
            <DatePicker
              onlyMonthPicker={timeDuration?.montly}
              weekPicker={timeDuration?.weekly}
              id={id}
              onChange={field.onChange}
              weekDays={weekDays}
              className="custom-calendar"
              arrow={false}
              value={field.value}
              onOpen={() => setOpenData(!openDate)}
              format={format}
              render={(_, openCalendar) => (
                <BaseButton
                  label="انتخاب تاریخ"
                  onClick={openCalendar}
                  startIcon={openDate ? phCaretDown : phCaretLeft}
                  type="neutral"
                  className={
                    openDate ? 'bg-neutral-300 hover:bg-neutral-300' : ''
                  }
                />
              )}
              calendar={calendar}
              range
              locale={local}
              placeholder={placeholder}
              calendarPosition="bottom-right"
              containerClassName={containerClass}
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
      }}
    />
  );
}
