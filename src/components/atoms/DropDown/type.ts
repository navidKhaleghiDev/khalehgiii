import { VariantProps } from 'class-variance-authority';
import {
  Control,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form';
import { baseDropDownStyles } from './styles';

export interface OptionSelect {
  id?: string;
  value?: string;
  label: string;
}

export interface DropdownProps<T extends FieldValues>
  extends VariantProps<typeof baseDropDownStyles> {
  id: string;
  control?: Control<T>;
  name: FieldPath<T>;
  rules?: RegisterOptions<T>;
  options: OptionSelect[];
  fullWidth?: boolean;
  placeHolder: string;
  className?: string;
  containerClassName?: string;
  defaultValue?: any;
  label?: string;
  hiddenError?: boolean;
  disabled?: boolean;
}

export type StateType = {
  activeOption: OptionSelect | null;
  openOptions: boolean;
};
