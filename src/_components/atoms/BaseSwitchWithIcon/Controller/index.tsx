import { Controller, FieldValues } from 'react-hook-form';

import { BaseSwitchWithIconControllerProps } from '@redesignUi/atoms/BaseSwitch/types';

import { BaseSwitchWithIcon } from '..';

/**

 * @component
 *
 * @param {Object} props  The properties for the BaseSwitchWithIcon component.
 * @param {string} props.name  The name of the switch input, used as its identifier.
 * @param {Object} props.control  react-hook-form control object for controlled forms.
 * @param {Object} [props.rules]  Validation rules used with react-hook-form.
 * @param {boolean} [props.defaultValue] Default value (used with react-hook-form).
 * @param {IconifyIcon} props.rightIcon  The icon to display when in light mode.
 * @param {IconifyIcon} props.leftIcon  The icon to display when in dark mode.
 *
 * @returns {JSX.Element} The BaseSwitchWithIcon component.
 */

export function BaseSwitchWithIconController<T extends FieldValues>(
  props: BaseSwitchWithIconControllerProps<T>
): JSX.Element {
  const { control, name, rules, defaultValue, rightIcon, leftIcon } = props;

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field }) => (
        <BaseSwitchWithIcon
          id={field.name}
          name={field.name}
          onChange={(checked: boolean) => {
            field.onChange(checked);
          }}
          checked={field.value}
          rightIcon={rightIcon}
          leftIcon={leftIcon}
        />
      )}
    />
  );
}
