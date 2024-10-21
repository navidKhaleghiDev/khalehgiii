import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';

import { FileInput, FileInputProps } from '..';

interface FileInputControllerProps<T extends FieldValues>
  extends FileInputProps {
  control: Control<T>;
  name: FieldPath<T>;
}

export function FileInputController<T extends FieldValues>(
  props: FileInputControllerProps<T>
) {
  const { control, name, id, disabled, className } = props;

  return (
    <Controller
      name={name}
      control={control}
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
