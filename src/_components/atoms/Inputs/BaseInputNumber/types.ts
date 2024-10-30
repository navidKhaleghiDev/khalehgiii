import { VariantProps } from 'class-variance-authority';
import {
  Control,
  FieldPath,
  FieldValues,
  Path,
  PathValue,
  RegisterOptions,
} from 'react-hook-form';
import { IconType } from '@src/types/global';

import { baseInputNumberStyles } from './styles';
import { BaseInputProps } from '../BaseInput/types';

export interface BaseInputNumberControllerProps<T extends FieldValues>
  extends Omit<BaseInputNumberProps, 'onChange' | 'defaultValue'> {
  control: Control<T>;
  name: FieldPath<T>;
  rules?: RegisterOptions<T>;
  defaultValue?: PathValue<T, Path<T>>;
}

export type BaseInputNumberProps = Omit<
  BaseInputProps,
  | 'type'
  | 'value'
  | 'startIcon'
  | 'endIcon'
  | 'hiddenError'
  | 'autoComplete'
  | 'helpText'
  | 'onChange'
> &
  VariantProps<typeof baseInputNumberStyles> & {
    min?: number;
    max?: number;
    onChange: (value: number) => void;
    value?: number;
    icon?: IconType;
  };
