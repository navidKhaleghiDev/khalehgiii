import {
  Control,
  FieldPath,
  FieldValues,
  RegisterOptions,
  UseFormSetError,
  ValidationRule,
} from 'react-hook-form';

import { BaseInputProps } from '../BaseInput/types';

export type PasswordInputProps = Omit<
  BaseInputProps,
  'type' | 'startIcon' | 'endIcon'
>;
export interface PasswordInputControllerProps<T extends FieldValues>
  extends Omit<PasswordInputProps, 'onChange' | 'value' | 'error'> {
  name: FieldPath<T>;
  control: Control<T>;
  rules?: RegisterOptions<T>;
  setError?: UseFormSetError<T>;
  min?: ValidationRule<number>;
  max?: ValidationRule<number>;
}
