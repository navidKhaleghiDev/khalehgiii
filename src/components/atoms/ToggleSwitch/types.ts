import {
  Control,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form';

export interface IToggleSwitch<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  rules?: RegisterOptions<T>;
  defaultValue?: string;
  className?: string;
  leftButton: {
    icon: string;
    label: string;
  };
  rightButton: {
    icon: string;
    label: string;
  };
}
