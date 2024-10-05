import { useState } from 'react';

import PhEye from '@iconify-icons/ph/eye';
import PhEyeSlash from '@iconify-icons/ph/eye-slash';

import { BaseInput } from '../BaseInput';
import { PasswordInputProps } from './types';

/**
 * PasswordInput component
 *
 * This component is an extended version of the BaseInput component,
 * specifically tailored for password input fields. It allows the user to toggle
 * the visibility of the password by showing or hiding it.
 *
 * @param {BaseInputProps} props - The properties passed to the PasswordInput component.
 * @param {string} props.name - The name attribute of the input field.
 * @param {string} [props.label] - The label displayed above the input field.
 * @param {string} [props.placeholder] - Placeholder text for the input field.
 * @param {boolean} [props.fullWidth] - If true, the input field will take the full width of its container.
 * @param {string} [props.className] - Additional class names for styling the input field.
 * @param {'sm' | 'md' | 'lg'} [props.size] - Size of the input field (small, medium, large).
 * @param {function} [props.onChange] - Function to handle changes to the input value.
 * @param {boolean} [props.disabled] - If true, the input field will be disabled.
 * @param {boolean} [props.hiddenError] - If true, error messages will be hidden.
 * @param {string} [props.error] - Error message for the input field.
 * @param {'default' | 'error'} [props.intent] - Input state (e.g., default or error) for styling.
 * @param {string} [props.helpText] - Helper text displayed below the input field.
 * @param {string} [props.value] - The current value of the input field.
 * @param {'rtl' | 'ltr'} [props.dir] - Direction of the input field for right-to-left or left-to-right text.
 *
 * @returns {JSX.Element} The rendered PasswordInput component.
 */

export function PasswordInput(props: PasswordInputProps) {
  const {
    id,
    name,
    onChange,
    value,
    className,
    disabled,
    error,
    fullWidth,
    helpText,
    hiddenError,
    label,
    placeholder,
    size,
    dir = 'rtl',
  } = props;

  const [showPassword, setShowPassword] = useState(false);
  const passIcon = showPassword ? PhEye : PhEyeSlash;
  const rtl = dir === 'rtl';

  return (
    <BaseInput
      name={name}
      size={size}
      id={id}
      onChange={onChange}
      value={value}
      dir={dir}
      helpText={helpText}
      hiddenError={hiddenError}
      error={error}
      disabled={disabled}
      endIcon={rtl ? passIcon : ''}
      label={label}
      placeholder={placeholder}
      type={showPassword ? 'text' : 'password'}
      onClickIcon={() => setShowPassword(!showPassword)}
      startIcon={!rtl ? passIcon : ''}
      fullWidth={fullWidth}
      className={className}
    />
  );
}
