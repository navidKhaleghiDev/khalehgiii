import { VariantProps } from 'class-variance-authority';
import {
  Control,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form';
import { baseOtpStyles } from './styles';

export interface BaseInputProps<T extends FieldValues>
  extends VariantProps<typeof baseOtpStyles> {
  name: FieldPath<T>;
  control: Control<T>;
  valueLength: number;
  rules?: RegisterOptions<T>;
  className?: string;
  fullWidth?: boolean;
  pureError?: string;
}

export type HandleChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  index: number,
  field: { value: string; onChange: (value: string) => void }
) => void;
export type HandleKeyDown = (
  e: React.KeyboardEvent<HTMLInputElement>,
  index: number
) => void;
