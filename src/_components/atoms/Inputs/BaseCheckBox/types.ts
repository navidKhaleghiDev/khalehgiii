import { ChangeEvent } from 'react';
import { VariantProps } from 'class-variance-authority';
import {
  Control,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form';

import { baseCheckBoxStyles } from './styles';

export interface BaseCheckBoxProps
  extends Omit<VariantProps<typeof baseCheckBoxStyles>, 'error'> {
  id: string;
  name: string;
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  className?: string;
  error?: string;
  value?: string | number | readonly string[];
  showError?: boolean;
  disabled?: boolean;
}

export interface BaseCheckBoxControllerProps<T extends FieldValues>
  extends Omit<BaseCheckBoxProps, 'onChange' | 'checked' | 'error' | 'value'> {
  name: FieldPath<T>;
  control: Control<T>;
  rules?: RegisterOptions<T>;
}
