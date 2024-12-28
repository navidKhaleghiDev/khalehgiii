import { VariantProps } from 'class-variance-authority';
import {
  Control,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form';
import { baseDropDownStyles } from './styles';
import { BaseInputProps } from '../Inputs/BaseInput/types';

export interface OptionSelect {
  id: string | number;
  value?: string | number;
  label: string;
}

export type ValueOnChange = (value: { [key: string]: any }) => void;

export type BaseDropdownProps = Omit<
  BaseInputProps,
  | 'type'
  | 'value'
  | 'startIcon'
  | 'endIcon'
  | 'hiddenError'
  | 'autoComplete'
  | 'helpText'
  | 'onChange'
  | 'id'
> &
  VariantProps<typeof baseDropDownStyles> & {
    options: OptionSelect[];
    loading?: boolean;
    multiple?: boolean;
    onChange: (value: OptionSelect | OptionSelect[] | null) => void;
    placeHolder?: string;
  };

export interface BaseDropdownControllerProps<T extends FieldValues>
  extends Omit<BaseDropdownProps, 'onChange'> {
  control: Control<T>;
  name: FieldPath<T>;
  rules?: RegisterOptions<T>;
}

export type StateType = {
  activeOption: OptionSelect | OptionSelect[] | null;
  openOptions: boolean;
};
