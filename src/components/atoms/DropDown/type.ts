import {
  Control,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form';

export interface IOptionSelect {
  id?: string;
  value?: string;
  label: string;
}

export interface DropdownProps<T extends FieldValues> {
  id: string;
  control?: Control<T>;
  name: FieldPath<T>;
  rules?: RegisterOptions<T>;
  options: IOptionSelect[];
  fullWidth?: boolean;
  placeHolder: string;
  className?: string;
  defaultValue?: any;
}

export type StateType = {
  activeOption: IOptionSelect | null;
  openOptions: boolean;
};
