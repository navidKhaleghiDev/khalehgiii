import { CVA } from '../type';

export interface ButtonOption {
  id: string | number;
  label: string;
  value: string;
  active?: boolean;
}

export type BaseToggleButtonProps<T extends Record<string, any>> = {
  buttonOptions: ButtonOption[];
  onChange: (selected: ButtonOption) => void;
  className?: string;
  classNameButton?: string;
  disabled?: boolean;
  style: CVA<T>;
  buttonStyle: CVA<T>;
} & {
  [key in keyof T]: T[key];
};
