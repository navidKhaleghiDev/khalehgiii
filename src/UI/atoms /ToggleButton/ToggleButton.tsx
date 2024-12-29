/* eslint-disable jsx-a11y/no-autofocus */
import { BaseToggleButtonProps, ButtonOption } from './types';

/**
 * ToggleButton component renders a group of buttons that allow for single selection.
 * It accepts an array of button options and triggers an onChange callback when a button is selected.
 *
 * @component
 *
 * @param {Object} props - The properties for the ToggleButton component.
 * @param {Array<ButtonOption>} props.buttonLabels - An array of button options to display.
 * @param {(selected: ButtonOption) => void} props.onChange - Callback function triggered when a button is selected.
 *    It receives the currently selected button option(s) as an argument.
 * @param {'sm' | 'md' | 'responsive'} props.size - Defines the size of the switch.
 * @param {string} props.className - className for optional style
 * @param {string} props.classNameButton - className for optional style at button
 * @returns {JSX.Element} The ToggleButton component.
 */

export function BaseToggleButton<T extends Record<string, unknown>>(
  props: BaseToggleButtonProps<T>
): JSX.Element {
  const {
    buttonOptions,
    onChange,
    className,
    classNameButton,
    disabled,
    style,
    buttonStyle,
    ...rest
  } = props;

  return (
    <div className="flex w-full justify-end">
      <div
        className={style({
          ...rest,
          className,
        })}
      >
        {buttonOptions.map((item: ButtonOption) => (
          <button
            type="button"
            autoFocus={item.active}
            key={item.id}
            disabled={disabled}
            onClick={() => onChange(item)}
            className={buttonStyle({
              ...rest,
              className: classNameButton,
            })}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
