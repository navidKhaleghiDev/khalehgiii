import { DateObject, Value } from 'react-multi-date-picker';
import { VariantProps } from 'class-variance-authority';
import {
  Control,
  FieldPath,
  FieldValues,
  RegisterOptions,
  UseFormSetError,
} from 'react-hook-form';
import { IconType } from '@src/types/global';
import { baseInputStyles } from '../styles';

type TTimeDuration = {
  weekly: boolean;
  montly: boolean;
};

export interface BaseInputProps<T extends FieldValues>
  extends VariantProps<typeof baseInputStyles> {
  id: string;
  control?: Control<T>;
  name: FieldPath<T>;
  rules?: RegisterOptions<T>;
  setError?: UseFormSetError<T>;
  defaultValue?: any;
  type?:
    | 'email'
    | 'number'
    | 'password'
    | 'search'
    | 'tel'
    | 'text'
    | 'url'
    | 'file'
    | 'date'
    | 'datetime-local'
    | 'time';
  label?: string;
  placeholder?: string | undefined;
  className?: string;
  classNameInput?: string;
  maxLength?: number;
  minLength?: number;
  ref?: React.LegacyRef<HTMLInputElement>;
  startIcon?: IconType;
  endIcon?: IconType;
  hiddenError?: boolean;
  onClickIcon?: () => void;
  iconButtonIcon?: IconType;
  pureOnChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  pureValue?: string;
  pureError?: string;
  ltrLabel?: boolean;
  autoComplete?: string;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  disabled?: boolean;
}

export type TOnClickDate = (
  date: DateObject | [DateObject, DateObject]
) => void;

export interface DatePickerPropsController extends BaseInputProps<any> {
  minDate?: string | number | DateObject | Date;
  maxDate?: string | number | DateObject | Date;
  showTimePicker?: boolean;
  format?: string;
  timeDuration?: TTimeDuration;
  submitButton?: boolean;
  onChange?: TOnClickDate;
}

export interface MultiDatePickerProps
  extends Omit<BaseInputProps<any>, 'onChange' | 'rules'> {
  minDate?: string | number | DateObject | Date;
  maxDate?: string | number | DateObject | Date;
  showTimePicker?: boolean;
  format?: string;
  timeDuration?: TTimeDuration;
  submitButton?: boolean;
  value?: Value[];
  disabled?: boolean;
  onChange?:
    | ((
        date: DateObject[],
        options: {
          validatedValue: string | string[];
          input: HTMLElement;
          isTyping: boolean;
        }
      ) => false | void)
    | undefined;
}
