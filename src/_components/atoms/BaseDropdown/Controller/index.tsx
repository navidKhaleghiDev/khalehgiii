import { Controller, FieldValues } from 'react-hook-form';

import { BaseDropdown } from '..';
import { BaseDropdownControllerProps } from '../type';

/**
 * BaseDropdownController is a customizable dropdown component that integrates with react-hook-form.
 * It allows users to select one or multiple options from a provided list, with various styling 
 * and behavior options. The component handles loading states and error messages effectively.
 * 
 * @template T - The type of the field values being controlled by react-hook-form.
 * 
 * @param {Object} props - The component props.
 * @param {IOptionSelect[]} props.options - The array of options to be displayed in the dropdown.
 * @param {string} props.placeHolder - Placeholder text displayed when no option is selected.
 * @param {Object} [props.rules] - Validation rules to be applied (from react-hook-form).
 * @param {Control<T>} props.control - The control object from react-hook-form for managing form state.
 * @param {string} [props.size] - The size of the dropdown (e.g., 'sm', 'md', 'lg').
 * @param {boolean} [props.fullWidth] - Determines if the dropdown should take the full width of its container.
 * @param {string} props.name - The name of the field in react-hook-form.
 * @param {string} [props.label] - Label text for the dropdown.
 * @param {boolean} [props.loading] - Indicates if the component is in a loading state.
 * @param {boolean} [props.multiple] - If true, allows multiple selections from the dropdown.
 * @param {boolean} [props.disabled] - If true, disables the dropdown interaction.
 * @param {string} [props.dir] - Text direction, either 'ltr' (left-to-right) or 'rtl' (right-to-left).
 * 
 * @returns {JSX.Element} The rendered dropdown component.

 */

export function BaseDropdownController<T extends FieldValues>(
  props: BaseDropdownControllerProps<T>
): JSX.Element {
  const {
    options,
    placeHolder,
    rules,
    control,
    size,
    fullWidth,
    name,
    label,
    loading,
    multiple,
    disabled,
    dir = 'rtl',
  } = props;

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({
        field: { onChange, name: userName },
        fieldState: { error },
      }) => (
        <BaseDropdown
          size={size}
          multiple={multiple}
          loading={loading}
          label={label}
          fullWidth={fullWidth}
          disabled={disabled}
          dir={dir}
          name={userName}
          onChange={(e) => onChange(e)}
          options={options}
          error={error?.message}
          placeHolder={placeHolder}
        />
      )}
    />
  );
}
