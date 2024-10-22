import { Controller, FieldValues } from 'react-hook-form';

import { FileInput } from '../index';
import { FileInputControllerProps } from '../types';

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
