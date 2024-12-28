import { VariantProps } from 'class-variance-authority';
import { baseDropDownStyles } from './styles';

export interface OptionSelectParams {
  id?: string;
  value?: string;
  label: string;
}

export interface DropdownProps extends VariantProps<typeof baseDropDownStyles> {
  options: OptionSelectParams[];
  fullWidth?: boolean;
  containerClassName?: string;
  label?: string;
  hiddenError?: boolean;
  icon?: any;
  onSelect?: any;
}

export type StateType = {
  activeOption: OptionSelectParams | null;
  openOptions: boolean;
};
