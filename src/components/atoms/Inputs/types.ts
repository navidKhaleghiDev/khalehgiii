import { VariantProps } from 'class-variance-authority';
import { HTMLInputTypeAttribute } from 'react';
import {
  Control,
  FieldPath,
  FieldValues,
  RegisterOptions,
  UseFormSetError,
} from 'react-hook-form';
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
}

export interface SearchInputProps extends VariantProps<typeof baseInputStyles> {
  name: string;
  id: string;
  label?: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
}

export type ColorIndent = 'default' | 'error' | undefined | null;
