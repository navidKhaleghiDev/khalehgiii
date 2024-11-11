import { Controller, FieldValues } from 'react-hook-form';

import { MultiDatePickerControllerProps } from '../types';
import { MultiDatePicker } from '../index';

/**
 * @param {Path<T>} props.name - The name of the field being controlled. This connects the `MultiDatePicker` to the form state.
 * @param {string} props.id - The id for the `MultiDatePicker` input field.
 * @param {boolean} [props.fullWidth=false] - Whether the `MultiDatePicker` should span the full width of the container.
 * @param {PathValue<T, Path<T>>} [props.defaultValue] - The default value for the date picker.
 * @param {string} [props.className] - Additional CSS classes for styling the date picker.
 * @param {string | Date} [props.maxDate] - The maximum selectable date.
 * @param {string | Date} [props.minDate] - The minimum selectable date.
 * @param {TimeDuration} [props.timeDuration] - The duration or interval for selecting time, if applicable.
 * @param {boolean} [props.disabled=false] - Whether the date picker is disabled or not.
 * @param {string} [props.calenderPosition=bottom-right] - Specifiers the calender position
 * @param {string} [props.format='YYYY/MM/DD'] - The format in which the date should be displayed.
 * @param {Control<T>} props.control - The control object from `react-hook-form`, used to manage the form's state.
 *
 * @returns {JSX.Element} A `MultiDatePicker` component controlled by `react-hook-form`.
 */

export function MultiDatePickerController<T extends FieldValues>(
  props: MultiDatePickerControllerProps<T>
): JSX.Element {
  const {
    control,
    name,
    id,
    fullWidth = false,
    defaultValue,
    className,
    maxDate,
    calendarPosition,
    minDate,
    timeDuration,
    disabled,
    format = 'YYYY/MM/DD',
  } = props;

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
          calendarPosition={calendarPosition}
          value={field.value}
        />
      )}
    />
  );
}
