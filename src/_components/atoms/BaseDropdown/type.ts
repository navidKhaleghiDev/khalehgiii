import { VariantProps } from 'class-variance-authority';
import {
  Control,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form';
import { baseDropDownStyles } from './styles';

export interface OptionSelect {
  id: string | number;
  value?: string | number;
  label: string;
}

export type ValueOnChange = (value: { [key: string]: any }) => void;

export interface BaseDropdownCommonProps
  extends VariantProps<typeof baseDropDownStyles> {
  options: OptionSelect[];
  placeHolder: string;
  label?: string;
  loading?: boolean;
  multiple?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  dir?: 'rtl' | 'ltr';
}

export interface BaseDropdownProps extends BaseDropdownCommonProps {
  name: string;
  error?: string;
  onChange: (value: OptionSelect | OptionSelect[] | null) => void;
}

export interface BaseDropdownControllerProps<T extends FieldValues>
  extends BaseDropdownCommonProps {
  control: Control<T>;
  name: FieldPath<T>;
  rules?: RegisterOptions<T>;
}

export type StateType = {
  activeOption: OptionSelect | OptionSelect[] | null;
  openOptions: boolean;
};
