import { Controller, FieldValues } from 'react-hook-form';

import { BaseCheckBox } from '@ui/atoms/Inputs/BaseCheckBox';

import { BaseCheckBoxControllerProps } from '../types';

/**
 * BaseCheckBoxController component.
 *
 * @param {string} props.id - The id for the checkbox input.
 * @param {FieldPath<T>} props.name - The name of the field in the form.
 * @param {control<T>} props.control - The control object .
 * @param {RegisterOptions<T>} [props.rules] - The validation rules for the checkbox.
 * @param {string} [props.label] - The label to display next to the checkbox.
 * @param {boolean} [props.hiddenError] - Makes our error visible
 * @param {boolean} [props.disabled]
 * @param {string} [props.className] - Additional class names for styling the checkbox.
 * @param {'sm' | 'md' | "responsive" } [props.size="md"] - The size of the checkbox.
 *
 * @returns {JSX.Element} The rendered checkbox component.
 */

export function BaseCheckBoxController<T extends FieldValues>(
  props: BaseCheckBoxControllerProps<T>
): JSX.Element {
  const {
    id,
    name,
    control,
    rules,
    disabled,
    label,
    showError,
    className,
    size = 'md',
  } = props;
  return (
    <Controller
      name={name}
      control={control}
      disabled={disabled}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <BaseCheckBox
          id={id}
          name={name}
          onChange={field.onChange}
          label={label}
          checked={Boolean(field.value)}
          error={error?.message}
          value={field.value}
          size={size}
          showError={showError}
          className={className}
          disabled={disabled}
        />
      )}
    />
  );
}
