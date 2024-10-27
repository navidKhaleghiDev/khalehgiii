import { Controller, FieldValues } from 'react-hook-form';

import { PasswordInput } from '..';
import { PasswordInputControllerProps } from '../types';
import { regexPattern } from '../../utils/regexPattern';

/**
 * A controlled form component for password input, using `react-hook-form`'s Controller.
 *
 * @param {PasswordInputControllerProps<T>} props - Props to customize the behavior of the password input controller.
 *
 * @param {FieldPath<T>} props.name - The name of the field in the form, used to register it in `react-hook-form`.
 * @param {string} props.label - The label to display for the password input field.
 * @param {string} [props.placeholder] - The placeholder text for the input field.
 * @param {boolean} [props.fullWidth] - If `true`, the input will take the full width of its container.
 * @param {string} [props.className] - Additional CSS class to apply to the input field.
 * @param {string} [props.size] - The size of the input field (e.g., 'small', 'medium', 'large').
 * @param {boolean} [props.disabled] - If `true`, the input field will be disabled.
 * @param {boolean} [props.hiddenError] - If `true`, the error message will be hidden even if there is a validation error.
 * @param {RegisterOptions<T>} [props.rules] - Validation rules for the input field as per `react-hook-form`.
 * @param {string} [props.intent] - The intent or purpose of the input (e.g., 'success', 'warning', 'error').
 * @param {string} [props.id] - The ID for the input field.
 * @param {Control<T>} props.control - The control object from `react-hook-form` used to register the field.
 * @param {string} [props.helpText] - Additional help text to display under the input field.
 * @param {string} [props.dir] - The text direction for the input, can be 'ltr' or 'rtl'.
 * @param {ValidationRule<number>} [props.min] - The text direction for the input, can be 'ltr' or 'rtl'.
 * @param {ValidationRule<number>} [props.max] - The text direction for the input, can be 'ltr' or 'rtl'.
 *
 *
 * @returns {JSX.Element} A controlled password input field with form validation and error handling.
 */

export function PasswordInputController<T extends FieldValues>(
  props: PasswordInputControllerProps<T>
) {
  const {
    name,
    label,
    placeholder,
    fullWidth,
    className,
    size,
    disabled,
    hiddenError,
    intent,
    id,
    control,
    helpText,
    min,
    max,
    dir,
  } = props;

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: regexPattern.required,
        // pattern: regexPattern.password,
        minLength: min,
        maxLength: max,
      }}
      disabled={disabled}
      render={({ field, fieldState: { error } }) => (
        <PasswordInput
          id={id}
          name={name}
          value={field.value ?? ''}
          dir={dir}
          onChange={field.onChange}
          className={className}
          disabled={disabled}
          fullWidth={fullWidth}
          helpText={helpText}
          placeholder={placeholder}
          size={size}
          hiddenError={hiddenError}
          error={error?.message}
          intent={intent}
          label={label}
        />
      )}
    />
  );
}
