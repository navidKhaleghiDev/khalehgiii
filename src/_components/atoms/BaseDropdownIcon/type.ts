import { VariantProps } from 'class-variance-authority';
import { baseDropDownStyles } from './styles';

export interface IOptionSelect {
  id?: string;
  value?: string;
  label: string;
}

export interface DropdownProps extends VariantProps<typeof baseDropDownStyles> {
  options: IOptionSelect[];
  fullWidth?: boolean;
  containerClassName?: string;
  // defaultValue?: any;
  label?: string;
  hiddenError?: boolean;
  icon?: any;
  onSelect?: any;
}

export type StateType = {
  activeOption: IOptionSelect | null;
  openOptions: boolean;
};
