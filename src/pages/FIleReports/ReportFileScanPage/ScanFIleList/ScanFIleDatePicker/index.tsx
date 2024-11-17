import { MultiDatePicker } from '@redesignUi/atoms/Inputs/DatePicker';
import { MultiDatePickerProps } from '@redesignUi/atoms/Inputs/DatePicker/types';
import { useState } from 'react';
import DateObject from 'react-date-object';

export function ScanFileDatePicker() {
  const [dateRange, setRangeDate] = useState<DateObject[] | undefined>();

  const handleDatePickerFilter: MultiDatePickerProps['onChange'] = (date) => {
    setRangeDate(date);
    console.log(dateRange);
  };

  return (
    <div className="text-start my-5">
      <MultiDatePicker
        id="recordFilter"
        name="recordFilter"
        onChange={(date) => handleDatePickerFilter(date)}
      />
    </div>
  );
}
