import { Controller } from 'react-hook-form'; // or import useForm

import { BaseInputNumber } from '..';
import { BaseInputNumberControllerProps } from '../types';

/**
 * BaseInputNumber is a custom input component that allows users to increment and decrement
 * a numerical value within a specified range using buttons. It also supports RTL and LTR
 * directionality and can display a label and an optional error message.
 *
 * @template T - The type of the input's value.
 *
 * @param {Object} props - The props for the BaseInputNumber component.
 * @param {string} props.id - The ID of the input element.
 * @param {'rtl' | 'ltr'} [props.dir='rtl'] - Direction of the input ('rtl' for right-to-left or 'ltr' for left-to-right).
 * @param {string} [props.placeholder] - Placeholder text for the input.
 * @param {string} [props.className] - Additional CSS classes for styling the component.
 * @param {boolean} [props.fullWidth=false] - Whether the input should take up the full width of its container.
 * @param {string} [props.size] - The size of the input.
 * @param {string} [props.label] - The label displayed above the input field.
 * @param {number} [props.min=0] - The minimum value for the input.
 * @param {number} [props.max=100] - The maximum value for the input.
 *
 * @returns {JSX.Element} A number input component with increment/decrement buttons and optional label and error handling.
 */
// rest of the imports...

export function BaseInputNumberController(
  props: BaseInputNumberControllerProps<any>
): JSX.Element {
  const {
    id,
    dir,
    placeholder,
    className,
    intent,
    label,
    min = 0,
    max = 10000000,
    control,
    fullWidth,
    disabled,
    size,
    name,
    rules,
    icon,
  } = props;
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({
        fieldState: { error },
        field: { onChange, name: userName, value },
      }) => {
        return (
          <BaseInputNumber
            dir={dir}
            name={userName}
            placeholder={placeholder}
            className={className}
            intent={intent}
            label={label}
            min={min}
            max={max}
            error={error?.message}
            fullWidth={fullWidth}
            size={size}
            disabled={disabled}
            onChange={(e) => onChange(e)}
            defaultValue={value}
            id={id}
            icon={icon}
          />
        );
      }}
    />
  );
}
