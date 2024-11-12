import { Controller, FieldValues } from 'react-hook-form';

import { Typography } from '@redesignUi/atoms/Typography';

import { baseOtpStyles, otpTextStyles } from './styles';
import { BaseOtpProp, HandleChange, HandleKeyDown } from './types';
import { regexPattern } from '../utils/regexPattern';

/**
 * BaseOtp is a form component for OTP (One-Time Password) input handling.
 *
 * @param {string} props.name
 * @param {any} props.control - The control object provided by `react-hook-form` for managing form state.
 * @param {object} [props.rules] - Validation rules for the OTP input using `react-hook-form`.
 * @param {number} [props.valueLength=6] - The number of OTP input fields (defaults to 6).
 * @param {string} [props.className]
 * @param {string} [props.intent] - The visual intent of the component (style).
 * @param {string} [props.size] - The size of the OTP input fields.
 * @param {boolean} [props.fullWidth]
 * @param {string} [props.pureError] - A custom error message passed from the parent.
 * @param {string} [props.dir='ltr'] - The text direction, default is `ltr` (left-to-right).
 *
 * @returns {JSX.Element} - The BaseOtp component.
 */

export function BaseOtp<T extends FieldValues>(
  props: BaseOtpProp<T>
): JSX.Element {
  const {
    name,
    control,
    rules,
    valueLength = 6,
    className,
    intent,
    hiddenError,
    disabled,
    helpText,
    size = 'md',
    dir = 'ltr',
  } = props;
  const handleChange: HandleChange = (e, index, field) => {
    const val = e.target.value;

    const currentOtp = field.value || '';
    const newOtp = currentOtp.split('');
    newOtp[index] = val;
    const updatedOtp = newOtp.join('');
    field.onChange(updatedOtp);

    if (val && index < valueLength - 1) {
      const nextElement = e.target
        .nextElementSibling as HTMLInputElement | null;
      if (nextElement) {
        nextElement.focus();
      }
    }
  };

  const handleKeyDown: HandleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !e.currentTarget.value && index > 0) {
      const previousElement = e.currentTarget
        .previousElementSibling as HTMLInputElement | null;
      if (previousElement) {
        previousElement.focus();
      }
    }
  };

  return (
    <div dir={dir}>
      <Controller
        name={name}
        control={control}
        disabled={disabled}
        rules={{
          required: regexPattern.required,
          ...rules,
          pattern: regexPattern.numbers,
        }}
        render={({ field, fieldState: { error } }) => {
          const otpValue = field.value || '';
          return (
            <div className="flex-col">
              <div className="flex w-full gap-[0.17rem]">
                {Array.from({ length: valueLength }).map((_, index) => (
                  <input
                    dir={dir}
                    key={index as number}
                    type="text"
                    disabled={disabled}
                    className={baseOtpStyles({
                      intent: error?.message ? 'error' : intent,
                      className,
                      size,
                    })}
                    maxLength={1}
                    value={otpValue[index] || ''}
                    onChange={(e) => handleChange(e, index, field)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                  />
                ))}
              </div>
              {!disabled && !hiddenError && (
                <Typography
                  color="red"
                  variant="body6"
                  className={otpTextStyles({
                    size,
                  })}
                >
                  {error?.message ?? ''}
                </Typography>
              )}
              {helpText && (
                <Typography
                  variant="body6"
                  className={otpTextStyles({
                    intent: disabled ? 'disabled' : 'default',
                    size,
                  })}
                >
                  {helpText}
                </Typography>
              )}
            </div>
          );
        }}
      />
    </div>
  );
}
