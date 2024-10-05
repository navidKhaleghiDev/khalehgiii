import { Controller, FieldValues } from 'react-hook-form';

import { BaseTextareaControllerProps } from '../types';
import { BaseTextarea } from '..';

/**
 * BaseTextarea component that integrates with react-hook-form.
 * It provides a customizable textarea field with validation and error handling.
 *
 * @template T - The type of the form values.
 * @param {BaseTextareaProps<T>} props - The properties for the textarea component.
 * @param {object} props.control - The control object from react-hook-form.
 * @param {string} props.name - The name of the field in the form.
 * @param {string} props.id - The id for the textarea element.
 * @param {string} [props.placeholder] - The placeholder text for the textarea.
 * @param {object} [props.rules] - The validation rules for the textarea.
 * @param {string} [props.className] - Additional class names for styling the textarea.
 * @param {boolean} [props.fullWidth] - Whether the textarea should take the full width of its container.
 * @param {any} [props.defaultValue] - The default value for the textarea.
 * @param {'default' | 'error'} [props.intent] - The intent state of the textarea, determining its styling.
 * @param {'sm' | 'md' | 'lg'} [props.size] - The size of the textarea.
 * @param {boolean} [props.hiddenError] - Whether to hide the error message.
 *
 * @returns {JSX.Element} The rendered textarea component.
 */

export function BaseTextareaController<T extends FieldValues>(
  props: BaseTextareaControllerProps<T>
) {
  const {
    control,
    name,
    id,
    placeholder,
    rules,
    className,
    helpText,
    disabled,
    fullWidth,
    label,
    size,
    hiddenError,
    dir = 'rtl',
  } = props;
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <BaseTextarea
          id={id}
          name={name}
          onChange={field.onChange}
          value={field.value ?? ''}
          className={className}
          dir={dir}
          disabled={disabled}
          error={error?.message}
          fullWidth={fullWidth}
          helpText={helpText}
          hiddenError={hiddenError}
          label={label}
          placeholder={placeholder}
          size={size}
        />
      )}
    />
  );
}
