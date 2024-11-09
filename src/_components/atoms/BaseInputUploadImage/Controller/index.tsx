import {
  Controller,
  Control,
  FieldValues,
  FieldPath,
  RegisterOptions,
} from 'react-hook-form';
import { BaseInputUploadImage } from '..';

interface BaseInputUploadImageControllerProps<
  TFieldValues extends FieldValues
> {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  rules?: RegisterOptions<TFieldValues>;
  disabled?: boolean;
}

export function BaseInputUploadImageController<
  TFieldValues extends FieldValues
>(props: BaseInputUploadImageControllerProps<TFieldValues>) {
  const { name, control, rules, disabled } = props;

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, name: userName, value } }) => (
        <BaseInputUploadImage
          name={userName}
          disabled={disabled}
          onClick={(e: File) => onChange(e)}
          defaultValue={value}
        />
      )}
    />
  );
}
