import { VariantProps } from 'class-variance-authority';
import { HTMLInputTypeAttribute } from 'react';
import {
  Control,
  FieldPath,
  FieldValues,
  RegisterOptions,
  UseFormSetError,
} from 'react-hook-form';
import { DateObject } from 'react-multi-date-picker';
import { IconType } from '@src/types/global';
import { baseInputStyles } from './styles';

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
export interface SearchInputProps extends VariantProps<typeof baseInputStyles> {
  name: string;
  id: string;
  label?: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
}

export interface DatePickerProps extends BaseInputProps<any> {
  minDate?: string | number | DateObject | Date;
  maxDate?: string | number | DateObject | Date;
  showTimePicker?: boolean;
  format?: string;
  timeDuration?: TTimeDuration;
  submitButton?: boolean;
  onChange?: TOnClickDate;
}

type TTimeDuration = {
  weekly: boolean;
  montly: boolean;
};

export type ColorIndent = 'default' | 'error' | undefined | null;
