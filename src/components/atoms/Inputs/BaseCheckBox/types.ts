import { VariantProps } from 'class-variance-authority';
import {
  Control,
  FieldPath,
  FieldValues,
  RegisterOptions,
  UseFormSetError,
} from 'react-hook-form';
import { baseCheckBoxStyles } from '../styles';

export interface BaseCheckBoxProps<T extends FieldValues>
  extends VariantProps<typeof baseCheckBoxStyles> {
  id: string;
  control?: Control<T>;
  name: FieldPath<T>;
  rules?: RegisterOptions<T>;
  setError?: UseFormSetError<T>;
  defaultValue?: string;
  label?: string;
  hiddenError?: boolean;
  className?: string;
}
