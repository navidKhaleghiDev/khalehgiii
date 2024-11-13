import React from 'react';
import { VariantProps } from 'class-variance-authority';
import {
  Control,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form';
import { IconType } from '@src/types/global';

import { baseInputNumberStyles } from './styles';
import { BaseInputProps } from '../BaseInput/types';

export interface BaseInputNumberControllerProps<T extends FieldValues>
  extends Omit<BaseInputNumberProps, 'onChange'> {
  control: Control<T>;
  name: FieldPath<T>;
  rules?: RegisterOptions<T>;
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
    defaultValue?: number | undefined;
    ref?: React.Ref<HTMLInputElement>;
  };
