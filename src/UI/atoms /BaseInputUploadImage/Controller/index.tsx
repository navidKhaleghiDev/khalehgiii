import {
  Controller,
  Control,
  FieldValues,
  FieldPath,
  RegisterOptions,
} from 'react-hook-form';
import { BaseInputUploadImage } from '..';

/**
 * Base Input Upload Image Controller Component.
 *
 * This component integrates `react-hook-form`'s `Controller` with the `BaseInputUploadImage`
 * component, allowing for controlled input handling with validation and form state management.
 *
 * @template TFieldValues
 * @param {BaseInputUploadImageControllerProps<TFieldValues>} props - The props for the component.
 * @param {FieldPath<TFieldValues>} props.name - The name of the field in the form.
 * @param {Control<TFieldValues>} props.control - The control object from `react-hook-form`.
 * @param {RegisterOptions<TFieldValues>} [props.rules] - Validation rules for the field.
 * @param {boolean} [props.disabled=false] - Whether the input is disabled.
 *
 * @returns {JSX.Element} - The rendered input upload image controller component.
 */

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
