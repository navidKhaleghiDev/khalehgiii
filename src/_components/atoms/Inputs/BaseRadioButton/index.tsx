import { Typography } from '@ui/atoms/Typography';

import { BaseRadioButtonProps } from './types';
import { inputRadioButtonStyles, labelRadioButtonStyles } from './styles';

/**
 * BaseRadioButton Component (Atomic Design - Atom)
 *
 * A customizable radio button component with optional error handling, dynamic direction, and label support.
 *
 * @component
 *
 * @param {Object} props - The props for the BaseRadioButton component.
 * @param {string} props.name - The name attribute for the radio input.
 * @param {string} props.id - The unique ID for the radio input.
 * @param {string} [props.label] - The text label to display next to the radio button.
 * @param {string} [props.className] - Additional custom className for styling the component.
 * @param {Function} props.onChange - Callback function to handle changes to the radio button's checked state.
 * @param {string | number} props.value - The value of the radio button.
 * @param {boolean} [props.checked] - Whether the radio button is checked or not.
 * @param {'ltr' | 'rtl'} [props.dir='rtl'] - The direction of the layout (left-to-right or right-to-left).
 * @param {'sm' | 'md' | 'responsive'} [props.size] - Determining the size of the radio button in three modes, which are both manually selected between sm and md, and responsive, which changes automatically according to the size of the device.
 * @param {boolean} [props.disabled] - The radio button is disabled input or not.
 *
 * @returns {JSX.Element} Returns the rendered BaseRadioButton component.
 */

export function BaseRadioButton(props: BaseRadioButtonProps): JSX.Element {
  const {
    name,
    id,
    label,
    className,
    onChange,
    value,
    checked,
    size,
    disabled,
    hiddenError,
    error,
  } = props;

  return (
    <div className={`inline-flex flex-col ${className}`}>
      <div className="inline-flex items-center relative gap-2 text-xs leading-4 font-normal flex-row ltr:flex-row-reverse">
        <input
          id={id}
          type="radio"
          checked={checked}
          name={name}
          value={value}
          onChange={onChange}
          className={inputRadioButtonStyles({ size })}
          disabled={disabled}
        />
        {label && (
          <label className={labelRadioButtonStyles()} htmlFor={id}>
            {label}
          </label>
        )}
      </div>
      {!hiddenError && error && (
        <Typography
          color="red"
          variant="body6"
          className="rtl:text-right ltr:text-left min-h-10"
        >
          {error}
        </Typography>
      )}
    </div>
  );
}
