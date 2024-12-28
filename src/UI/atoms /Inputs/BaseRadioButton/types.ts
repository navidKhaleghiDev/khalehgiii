import { VariantProps } from 'class-variance-authority';
import {
  Control,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form';

import { inputRadioButtonStyles } from './styles';

export interface BaseRadioButtonProps
  extends VariantProps<typeof inputRadioButtonStyles> {
  id: string;
  name: string;
  defaultValue?: string;
  label?: string;
  className?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string | number;
  checked?: boolean;
  disabled?: boolean;
  hiddenError?: boolean;
  error?: string;
}

export interface BaseRadioButtonControllerProps<T extends FieldValues>
  extends Omit<BaseRadioButtonProps, 'onChange' | 'checked' | 'error'> {
  name: FieldPath<T>;
  control: Control<T>;
  rules?: RegisterOptions<T>;
  onChange?: (event: string) => void;
}
