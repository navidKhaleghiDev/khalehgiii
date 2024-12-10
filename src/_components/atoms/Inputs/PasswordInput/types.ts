import {
  Control,
  FieldPath,
  FieldValues,
  RegisterOptions,
  UseFormSetError,
  ValidationRule,
} from 'react-hook-form';

import { BaseInputProps } from '../BaseInput/types';

export interface PasswordInputProps
  extends Omit<BaseInputProps, 'type' | 'startIcon' | 'endIcon'> {
  iconDir?: 'rtl' | 'ltr';
}
export interface PasswordInputControllerProps<T extends FieldValues>
  extends Omit<PasswordInputProps, 'onChange' | 'value' | 'error'> {
  name: FieldPath<T>;
  control: Control<T>;
  rules?: RegisterOptions<T> | any;
  setError?: UseFormSetError<T>;
  min?: ValidationRule<number>;
  max?: ValidationRule<number>;
}
