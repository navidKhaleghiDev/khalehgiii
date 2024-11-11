import {
  Control,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form';
import { BaseInputProps } from '../BaseInput/types';

export interface SearchInputProps
  extends Omit<
    BaseInputProps,
    | 'type'
    | 'startIcon'
    | 'endIcon'
    | 'onChange'
    | 'autoComplete'
    | 'onClickIcon'
  > {
  onChange: (value: string) => void;
  value: string;
}

export interface SearchInputControllerProps<T extends FieldValues>
  extends Omit<SearchInputProps, 'onChange' | 'value' | 'error'> {
  name: FieldPath<T>;
  control: Control<T>;
  rules?: RegisterOptions<T>;
}
