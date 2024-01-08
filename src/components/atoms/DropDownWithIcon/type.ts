import { VariantProps } from "class-variance-authority";
import {
  FieldPath,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";
import { baseDropDownStyles } from "./styles";

export interface IOptionSelect {
  id?: string;
  value?: string;
  label: string;
}

export interface DropdownProps<T extends FieldValues>
  extends VariantProps<typeof baseDropDownStyles> {
  id: string;
  name: FieldPath<T>;
  rules?: RegisterOptions<T>;
  options: IOptionSelect[];
  fullWidth?: boolean;
  placeHolder: string;
  containerClassName?: string;
  defaultValue?: any;
  label?: string;
  hiddenError?: boolean;
  icon?:any;
  onSelect?:any;
}

export type StateType = {
  activeOption: IOptionSelect | null;
  openOptions: boolean;
};
