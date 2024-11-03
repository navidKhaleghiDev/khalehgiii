import { Controller, FieldValues } from 'react-hook-form';

import { FileInput } from '../index';
import { FileInputControllerProps } from '../types';

/**
 * `FileInputController` integrates the `FileInput` component with `react-hook-form`,
 * enabling controlled file input with validation.
 *
 * @template T - Extends FieldValues from `react-hook-form`, ensuring compatibility with form fields.
 * @param {FileInputControllerProps<T>} props - Properties for configuring the controller.
 * @param {Control<T>} props.control - The `react-hook-form` control object for managing form state.
 * @param {string} props.name - The name of the form field, used to register the field in the form.
 * @param {string} props.id - The unique id for the file input.
 * @param {boolean} [props.disabled] - If true, disables the file input.
 * @param {string} [props.className] - Additional CSS classes for styling the component.
 * @param {Object} [props.rules] - Validation rules as specified by `react-hook-form` (e.g., required, maxFiles).
 *
 * @returns {JSX.Element} A controlled file input component, integrated with `react-hook-form` for validation and state management.
 */

export function FileInputController<T extends FieldValues>(
  props: FileInputControllerProps<T>
): JSX.Element {
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
