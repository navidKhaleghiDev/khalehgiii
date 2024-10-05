import { Controller, FieldValues } from 'react-hook-form';

import { BaseSwitchControllerProps } from '../types';
import { BaseSwitch } from '..';

/**
 * BaseSwitch component renders a customizable toggle switch with optional labels and controlled states.
 * It supports integration with `react-hook-form` when the `control` prop is provided, and allows for custom onChange handling.
 *
 * @component
 *
 * @param {Object} props - The properties for the BaseSwitch component.
 * @param {'small' | 'medium' |'responsive' } props.size - Defines the size of the switch.
 * @param {string} [props.label] - Optional label displayed next to the switch.
 * @param {string} props.name - The name of the switch input, used as its identifier.
 * @param {Object} [props.control] - `react-hook-form` control object for controlled forms.
 * @param {Object} [props.rules] - Validation rules used with `react-hook-form`.
 * @param {string} [props.defaultValue] - Default value (used with `react-hook-form`).
 * @param {(checked: boolean) => void} [props.onChange] - Callback function to handle onChange events.
 * @param {boolean} [props.disabled=false] - If true, disables the switch and prevents user interaction.
 *
 * @returns {JSX.Element} The BaseSwitch component.
 */

export function BaseSwitchController<T extends FieldValues>(
  props: BaseSwitchControllerProps<T>
): JSX.Element {
  const {
    id,
    size,
    label,
    name,
    control,
    rules,
    defaultValue,
    disabled,
    dir = 'rtl',
  } = props;

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => {
        return (
          <BaseSwitch
            id={id}
            name={field.name}
            onChange={field.onChange}
            disabled={disabled}
            checked={Boolean(field.value)}
            error={error?.message}
            size={size}
            label={label}
            dir={dir}
          />
        );
      }}
    />
  );
}
