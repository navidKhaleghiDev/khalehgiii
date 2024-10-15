import { Controller, FieldValues } from 'react-hook-form';

import { MultiDatePickerControllerProps } from '../types';
import { MultiDatePicker } from '..';

export function MultiDatePickerController<T extends FieldValues>({
  control,
  name,
  id,
  fullWidth = false,
  defaultValue,
  className,
  maxDate,
  minDate,
  timeDuration,
  size,
  disabled,
  format = 'YYYY/MM/DD',
}: MultiDatePickerControllerProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <MultiDatePicker
          id={id}
          name={name}
          onChange={field.onChange}
          className={className}
          disabled={disabled}
          timeDuration={timeDuration}
          format={format}
          fullWidth={fullWidth}
          maxDate={maxDate}
          minDate={minDate}
          size={size}
          value={field.value}
        />
      )}
    />
  );
}
