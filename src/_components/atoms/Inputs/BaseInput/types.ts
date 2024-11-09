import { HTMLInputAutoCompleteAttribute } from 'react';
import { VariantProps } from 'class-variance-authority';
import {
  Control,
  FieldPath,
  FieldValues,
  RegisterOptions,
  UseFormSetError,
} from 'react-hook-form';

import { BaseIconProps } from '@redesignUi/atoms/BaseIcon';

import { baseInputStyles } from './styles';

export interface BaseInputProps
  extends Omit<VariantProps<typeof baseInputStyles>, 'error'> {
  id: string;
  name: string;
  value: string | number | readonly string[];
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
  startIcon?: BaseIconProps['icon'];
  endIcon?: BaseIconProps['icon'];
  hiddenError?: boolean;
  autoComplete?: HTMLInputAutoCompleteAttribute;
  helpText?: string;
  onClickIcon?: () => void;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  error?: string;
  disabled?: boolean;
  dir?: 'rtl' | 'ltr';
}
export interface BaseInputControllerProps<T extends FieldValues>
  extends Omit<BaseInputProps, 'onChange' | 'value' | 'error'> {
  control: Control<T>;
  name: FieldPath<T>;
  rules?: RegisterOptions<T>;
  setError?: UseFormSetError<T>;
}
