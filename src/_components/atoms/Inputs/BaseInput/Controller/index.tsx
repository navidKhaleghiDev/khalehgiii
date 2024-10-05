import { Controller, FieldValues } from 'react-hook-form';

import { BaseInputControllerProps } from '../types';
import { BaseInput } from '..';
/**
 * BaseInput component that integrates with react-hook-form.
 * It provides a customizable input field with validation and error handling.
 *
 * @template T - The type of the form values.
 * @param {BaseInputProps<T>} props - The properties for the input component.
 * @param {object} props.control - The control object from react-hook-form.
 * @param {string} props.name - The name of the field in the form.
 * @param {string} props.id - The id for the input element.
 * @param {string} [props.placeholder] - The placeholder text for the input.
 * @param {object} [props.rules] - The validation rules for the input.
 * @param {string} [props.className] - Additional class names for styling the input.
 * @param {boolean} [props.fullWidth] - Whether the input should take the full width of its container.
 * @param {any} [props.defaultValue] - The default value for the input.
 * @param {React.ReactNode} [props.startIcon] - Icon to display at the start of the input.
 * @param {React.ReactNode} [props.endIcon] - Icon to display at the end of the input.
 * @param {'default' | 'error'} [props.intent] - The intent state of the input, determining its styling.
 * @param {'sm' | 'md' | 'lg'} [props.size] - The size of the input.
 * @param {string} [props.type] - The type of the input.
 * @param {string} [props.label] - The label to display above the input.
 * @param {boolean} [props.hiddenError] - Whether to hide the error message.
 * @param {function} [props.pureOnChange] - Change handler for uncontrolled component.
 * @param {any} [props.pureValue] - Value for uncontrolled component.
 * @param {function} [props.onClickIcon] - Click handler for the icon button input.
 * @param {string} [props.pureError] - Error message for uncontrolled component.
 * @param {number} [props.min] - Minimum value for the input.
 * @param {number} [props.max] - Maximum value for the input.
 * @param {boolean} [props.ltrLabel] - Whether the label should be left-to-right.
 * @param {string} [props.iconButtonIcon] - Icon for the icon button input.
 *
 * @returns {JSX.Element} The rendered input component.
 */
export function BaseInputController<T extends FieldValues>(
  props: BaseInputControllerProps<T>
): JSX.Element {
  const {
    control,
    name,
    id,
    placeholder,
    rules,
    className,
    startIcon,
    helpText,
    endIcon,
    fullWidth,
    size,
    type,
    label,
    dir,
    disabled,
    hiddenError,
    onClickIcon,
  } = props;
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <BaseInput
          id={id}
          name={name}
          onChange={field.onChange}
          value={field.value ?? ''}
          className={className}
          disabled={disabled}
          endIcon={endIcon}
          size={size}
          error={error?.message}
          fullWidth={fullWidth}
          helpText={helpText}
          hiddenError={hiddenError}
          label={label}
          onClickIcon={onClickIcon}
          placeholder={placeholder}
          startIcon={startIcon}
          dir={dir}
          type={type}
        />
      )}
    />
  );
}
