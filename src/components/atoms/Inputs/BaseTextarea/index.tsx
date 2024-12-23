import { Typography } from '@ui/atoms/Typography';

import { baseInputTextAreaStyles, baseTextareaStyles } from './styles';
import { BaseTextareaProps } from './types';
import { baseInputWarperStyles } from '../BaseInput/styles';

/**
 * BaseTextarea component that integrates with react-hook-form.
 *
 * @param {string} props.name - The name of the field in the form.
 * @param {string} props.id - The id for the textarea element.
 * @param {string} [props.placeholder] - The placeholder text for the textarea.
 * @param {string} [props.className] - Additional class names for styling the textarea.
 * @param {boolean} [props.fullWidth] - Whether the textarea should take the full width of its container.
 * @param {'sm' | 'md' | 'lg'} [props.size] - The size of the textarea.
 * @param {(event: React.ChangeEvent<HTMLTextAreaElement>) => void} [props.onChange]
 * @param {string} [props.value] - The value assign for the component
 * @param {string} [props.helpText]
 * @param {string} [props.error]
 * @param {rtl | ltr} [props.dir=rtl]
 *
 *
 * @returns {JSX.Element} The rendered textarea component.
 */

export function BaseTextarea(props: BaseTextareaProps): JSX.Element {
  const {
    name,
    id,
    placeholder,
    className,
    fullWidth,
    size,
    onChange,
    value,
    error,
    label,
    helpText,
    disabled,
    hiddenError,
    dir = 'rtl',
  } = props;
  const rtl = dir === 'rtl';

  return (
    <div
      className={baseInputWarperStyles({
        size,
        fullWidth,
        className: 'flex flex-col',
      })}
    >
      {label && (
        <label
          htmlFor={id}
          className={`mb-[0.13rem] ${rtl ? 'text-right' : 'text-left'}`}
        >
          <Typography
            variant="body6"
            className={`${
              error && !disabled
                ? 'text-red-500 dark:text-red-500'
                : 'text-gray-200'
            }  ${
              disabled
                ? 'text-gray-300 dark:text-gray-500'
                : 'text-gray-500 dark:text-white'
            }`}
          >
            {label}
          </Typography>
        </label>
      )}
      <textarea
        id={id}
        disabled={disabled}
        dir="auto"
        name={name}
        value={value}
        onChange={onChange}
        className={baseTextareaStyles({
          error: !!error,
          className,
          fullWidth,
          size,
        })}
        placeholder={placeholder}
      />
      <span
        className={baseInputTextAreaStyles({
          size,
          fullWidth,
          disabled,
        })}
      >
        {helpText && <Typography variant="body6">{helpText}</Typography>}
        {!disabled && !hiddenError && (
          <Typography
            color="red"
            variant="body6"
            className={`text-left ${rtl && 'text-right'} min-h-5`}
          >
            {error ?? ''}
          </Typography>
        )}
      </span>
    </div>
  );
}
