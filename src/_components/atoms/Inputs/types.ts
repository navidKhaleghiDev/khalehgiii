import { VariantProps } from 'class-variance-authority';
import { MouseEventHandler } from 'react';
import {
  Control,
  FieldPath,
  FieldValues,
  RegisterOptions,
  UseFormSetError,
} from 'react-hook-form';
import { IconifyIcon } from '@iconify/react';
import { DateObject } from 'react-multi-date-picker';

import { baseSelectStyles } from './styles';
import { BaseInputControllerProps } from './BaseInput/types';
import { baseInputStyles } from './BaseInput/styles';
import { OptionSelectProps } from './BaseSelect/OptionSelect';

export interface BaseInputNumberProps<T extends FieldValues>
  extends VariantProps<typeof baseInputStyles> {
  id: string;
  control?: Control<T>;
  name: FieldPath<T>;
  rules?: RegisterOptions<T>;
  setError?: UseFormSetError<T>;
  defaultValue?: number;
  label?: string;
  placeholder?: string;
  className?: string;
  hiddenError?: boolean;
  onClickIcon?: () => void;
  iconButtonIcon?: string | IconifyIcon;
  pureOnChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  pureValue?: string;
  pureError?: string;
  dir?: 'rtl' | 'ltr';

  // inputProps?: InputHTMLAttributes<HTMLInputElement>;
  min?: number;
  max?: number;
}

export interface BaseSelectProps<T extends FieldValues>
  extends VariantProps<typeof baseSelectStyles> {
  selectOptions: OptionSelectProps[];
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
  placeholder?: string;
  className?: string;
  startIcon?: string;
  endIcon?: string;
  hiddenError?: boolean;
  onClickIcon?: () => void;
  iconButtonIcon?: string;
  pureValue?: string;
  pureError?: string;
  ltrLabel?: boolean;
  ref: React.LegacyRef<HTMLSelectElement>;
  disabled?: boolean;
  min?: string | number;
  max?: string | number;
  onClickSelect?: (event: MouseEventHandler<HTMLSelectElement>) => void;
  pureOnChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export interface DatePickerProps extends BaseInputControllerProps<any> {
  minDate?: string | number | DateObject | Date;
  maxDate?: string | number | DateObject | Date;
  showTimePicker?: boolean;
  ltrPlaceHolder: boolean;
  format?: string;
}

export type ColorIndent = 'default' | 'error' | undefined | null;
