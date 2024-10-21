import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form';

import { FileInput, FileInputProps } from '..';

interface FileInputControllerProps<T extends FieldValues>
  extends Omit<FileInputProps, 'onChange'> {
  control: Control<T>;
  name: FieldPath<T>;
  rules?: RegisterOptions<T>;
}

export function FileInputController<T extends FieldValues>(
  props: FileInputControllerProps<T>
) {
  const { control, name, id, disabled, className, rules } = props;

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      disabled={disabled}
      render={({ field: { onChange } }) => (
        <FileInput
          id={id}
          name={name}
          onChange={onChange}
          disabled={disabled}
          className={className}
        />
      )}
    />
  );
}
