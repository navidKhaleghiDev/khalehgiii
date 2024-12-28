import { VariantProps } from 'class-variance-authority';
import {
  Control,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form';

import { baseTextareaStyles } from './styles';

export interface BaseTextareaProps
  extends Omit<VariantProps<typeof baseTextareaStyles>, 'error'> {
  id: string;
  name: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  placeholder?: string;
  helpText?: string;
  value: string | number | readonly string[];
  dir?: 'rtl' | 'ltr';
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
  hiddenError?: boolean;
}

export interface BaseTextareaControllerProps<T extends FieldValues>
  extends Omit<BaseTextareaProps, 'error' | 'value' | 'onChange'> {
  control: Control<T>;
  name: FieldPath<T>;
  rules?: RegisterOptions<T>;
}
