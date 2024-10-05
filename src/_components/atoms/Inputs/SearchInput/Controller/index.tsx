import { Controller, FieldValues } from 'react-hook-form';

import { SearchInput } from '..';
import { SearchInputControllerProps } from '../types';

/**
 * SearchInputController is a wrapper around the SearchInput component that integrates with
 * react-hook-form for form control and validation.
 *
 *
 * @param {SearchInputControllerProps<T>} props - The properties for the search input controller.
 * @param {FieldPath<T>} props.name - The name of the field, used to register the input in the form.
 * @param {Control<T>} props.control - The control object from react-hook-form used to manage form state.
 * @param {RegisterOptions<T>} [props.rules] - Validation rules for the input, used by react-hook-form.
 * @param {string} [props.label] - The label for the search input.
 * @param {string} [props.placeholder] - The placeholder text for the search input.
 * @param {boolean} [props.fullWidth] - If true, the search input will take the full width of its container.
 * @param {string} [props.className] - Additional CSS classes for styling the search input.
 * @param {sm | md | lg} [props.size] - The size of the search input (e.g., small, medium, large).
 * @param {boolean} [props.disabled] - Whether the search input is disabled.
 * @param {boolean} [props.hiddenError] - If true, the error message will be hidden from the user interface.
 * @param {string} [props.id] - The id for the search input element.
 * @param {string} [props.helpText] - Optional help text that is displayed under the input field.
 * @param {string} [props.dir='rtl'] - The text direction, either 'rtl' (right-to-left) or 'ltr' (left-to-right).
 *
 * @returns {JSX.Element} The rendered SearchInput component wrapped with react-hook-form's Controller for form integration.
 */

export function SearchInputController<T extends FieldValues>(
  props: SearchInputControllerProps<T>
): JSX.Element {
  const {
    name,
    label,
    placeholder,
    fullWidth,
    className,
    size,
    disabled,
    id,
    rules,
    control,
    helpText,
    dir = 'rtl',
  } = props;

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      disabled={disabled}
      render={({ field, fieldState: { error } }) => (
        <SearchInput
          id={id}
          name={name}
          value={field.value ?? ''}
          dir={dir}
          onChange={field.onChange}
          className={className}
          error={error?.message}
          disabled={disabled}
          fullWidth={fullWidth}
          helpText={helpText}
          placeholder={placeholder}
          size={size}
          label={label}
        />
      )}
    />
  );
}
