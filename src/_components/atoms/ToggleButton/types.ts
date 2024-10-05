import { VariantProps } from 'class-variance-authority';
import { toggleStyles } from './styles';

export interface ButtonOption {
  id: string | number;
  label: string;
  active?: boolean;
}

export interface ToggleButtonProps extends VariantProps<typeof toggleStyles> {
  buttonOptions: ButtonOption[];
  onChange: (selected: ButtonOption) => void;
  className?: string;
}
