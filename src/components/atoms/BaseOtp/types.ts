import { VariantProps } from 'class-variance-authority';
import {
  Control,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form';
import { baseOtpStyles } from './styles';

export interface TBaseInputProps<T extends FieldValues>
  extends VariantProps<typeof baseOtpStyles> {
  name: FieldPath<T>;
  control: Control<T>;
  valueLength: number;
  rules?: RegisterOptions<T>;
  className?: string;
  fullWidth?: boolean;
  pureError?: string;
}

export type THandleChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  index: number,
  field: { value: string; onChange: (value: string) => void }
) => void;
export type THandleKeyDown = (
  e: React.KeyboardEvent<HTMLInputElement>,
  index: number
) => void;
