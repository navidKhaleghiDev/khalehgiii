import { VariantProps } from 'class-variance-authority';
import {
  Control,
  FieldPath,
  FieldValues,
  Path,
  PathValue,
  RegisterOptions,
} from 'react-hook-form';

import { baseSwitchStyles } from './styles';

export interface BaseSwitchProps extends VariantProps<typeof baseSwitchStyles> {
  id: string;
  name: string;
  checked?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  className?: string;
  error?: string;
  hiddenError?: boolean;
  disabled?: boolean;
  dir?: 'rtl' | 'ltr';
}

export interface BaseSwitchControllerProps<T extends FieldValues>
  extends Omit<BaseSwitchProps, 'onChange' | 'error' | 'checked'> {
  control: Control<T>;
  name: FieldPath<T>;
  rules?: RegisterOptions<T>;
  defaultValue?: PathValue<T, Path<T>>;
}
