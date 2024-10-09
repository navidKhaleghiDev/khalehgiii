import { VariantProps } from 'class-variance-authority';
import {
  Control,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form';

import { baseInputNumberStyles } from './styles';

export interface BaseInputNumberControllerProps<T extends FieldValues>
  extends VariantProps<typeof baseInputNumberStyles> {
  id: string;
  control: Control<T>;
  name: FieldPath<T>;
  rules?: RegisterOptions<T>;
  label?: string;
  placeholder?: string;
  className?: string;
  dir?: 'rtl' | 'ltr';
  min?: number;
  max?: number;
  disabled?: boolean;
}

export interface BaseInputNumberProps
  extends VariantProps<typeof baseInputNumberStyles> {
  id: string;
  name: string;
  defaultValue?: number;
  label?: string;
  placeholder?: string;
  className?: string;
  error?: string;
  onChange: (value: number) => void;
  pureValue?: string;
  dir?: 'rtl' | 'ltr';
  disabled?: boolean;
  min?: number;
  max?: number;
}
