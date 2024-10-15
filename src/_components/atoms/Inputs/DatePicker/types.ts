import { Control, FieldValues, Path, PathValue } from 'react-hook-form';
import { DateObject, Value } from 'react-multi-date-picker';

type TTimeDuration = {
  weekly: boolean;
  montly: boolean;
};

export type TOnClickDate = (
  date: DateObject | [DateObject, DateObject]
) => void;

export interface MultiDatePickerProps {
  id: string;
  name: string;
  className?: string;
  minDate?: string | number | DateObject | Date;
  maxDate?: string | number | DateObject | Date;
  format?: string;
  value?: Value[];
  fullWidth?: boolean;
  disabled?: boolean;
  timeDuration?: TTimeDuration;
  size?: 'sm' | 'md';
  onChange: (
    date: DateObject[] | undefined,
    options?: {
      validatedValue?: string | string[];
      input?: HTMLElement;
      isTyping?: boolean;
    }
  ) => false | void;
}

export interface MultiDatePickerControllerProps<T extends FieldValues>
  extends Omit<MultiDatePickerProps, 'onChange' | 'value'> {
  control: Control<T>;
  name: Path<T>;
  defaultValue?: PathValue<T, Path<T>>;
}
