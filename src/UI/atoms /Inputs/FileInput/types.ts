import {
  Control,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form';

export interface FileInputProps {
  name: string;
  id: string;
  disabled?: boolean;
  className?: string;
  onChange: (files: File[] | null) => void;
}

export interface FileInputControllerProps<T extends FieldValues>
  extends Omit<FileInputProps, 'onChange'> {
  control: Control<T>;
  name: FieldPath<T>;
  rules?: RegisterOptions<T>;
}
