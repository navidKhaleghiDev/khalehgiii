import { Controller } from 'react-hook-form';
import { BaseIcon } from '@ui/atoms/BaseIcon';
import { forwardRef } from 'react';
import PhCaretDownBold from '@iconify-icons/ph/caret-down-bold';

import { IBaseSelectProp } from '../types';
import { baseSelectStyles } from '../styles';
import { Typography } from '../../Typography';
import { IOptionSelect, OptionSelect } from './OptionSelect';

/**
 * BaseSelect component that integrates with react-hook-form.
 * It provides a customizable select (dropdown) field with validation and error handling.
 *
 * @template T - The type of the form values.
 * @param {BaseInputProps<T>} props - The properties for the select component.
 * @param {object} props.control - The control object from react-hook-form.
 * @param {string} props.name - The name of the field in the form.
 * @param {string} props.id - The id for the select element.
 * @param {object} [props.rules] - The validation rules for the select.
 * @param {string} [props.className] - Additional class names for styling the select.
 * @param {boolean} [props.fullWidth] - Whether the select should take the full width of its container.
 * @param {any} [props.defaultValue] - The default value for the select.
 * @param {React.ReactNode} [props.startIcon] - Icon to display at the start of the select.
 * @param {React.ReactNode} [props.endIcon] - Icon to display at the end of the select.
 * @param {'default' | 'error'} [props.intent] - The intent state of the select, determining its styling.
 * @param {'sm' | 'md' | 'lg'} [props.size] - The size of the select.
 * @param {boolean} [props.hiddenError] - Whether to hide the error message.
 * @param {boolean} [props.disable] - disables the base select .
 *
 *
 * @returns {JSX.Element} The rendered select component.
 */

// check error handling conditions in this component
export const BaseSelect = forwardRef<HTMLSelectElement, IBaseSelectProp<any>>(
  function BaseSelectItem(props, ref): JSX.Element {
    const {
      control,
      name,
      id,
      rules,
      className,
      selectOptions,
      fullWidth,
      defaultValue,
      startIcon,
      pureError,
      endIcon,
      pureValue,
      disabled,
      intent,
      pureOnChange,
      size,
      hiddenError,
    } = props;

    return control ? (
      <Controller
        name={name}
        control={control}
        rules={rules}
        defaultValue={defaultValue}
        render={({ field, fieldState: { error } }) => (
          <div className={`${className} ${fullWidth && 'w-full'}`}>
            {/* select label has been disabled that does not work now */}
            {/* {label && (
            <label
              htmlFor={id}
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              {label}
            </label>
          )} */}
            <select
              id={id}
              dir="auto"
              name={field.name}
              value={field.value}
              ref={ref}
              disabled={disabled}
              onChange={pureOnChange}
              className={baseSelectStyles({
                intent: error?.message ? 'error' : intent,
                className: `${endIcon && 'pr-8'} ${startIcon && 'pl-8'}`,
                fullWidth,
                size,
              })}
            >
              {selectOptions.map((option: IOptionSelect) => (
                <OptionSelect key={option.id} option={option} />
              ))}
            </select>
            {hiddenError && (
              <Typography variant="body6" className="h-6">
                {error?.message ?? ''}
              </Typography>
            )}
            <BaseIcon
              icon={PhCaretDownBold}
              className="absolute top-1/3 left-3 z-30"
            />
            {hiddenError && (
              <Typography variant="body6" className="h-6">
                {error?.message ?? ''}
              </Typography>
            )}
          </div>
        )}
      />
    ) : (
      <div
        className={`${className || ''} ${
          fullWidth ? 'w-full' : ''
        } relative flex items-center justify-center h-fit`}
      >
        {/* {label && (
            <label
              htmlFor={id}
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              {label}
            </label>
          )} */}
        <select
          id={id}
          dir="auto"
          name={name}
          ref={ref}
          value={pureValue}
          disabled={disabled}
          onChange={pureOnChange}
          className={baseSelectStyles({
            intent: pureError ? 'error' : intent,
            className: `${endIcon && 'pr-8'} ${startIcon && 'pl-8'}`,
            fullWidth,
            size,
          })}
        >
          {selectOptions.map((option: IOptionSelect) => (
            <OptionSelect key={option.id} option={option} />
          ))}
        </select>
        {hiddenError && (
          <Typography variant="body6" className="h-6">
            {pureError ?? ''}
          </Typography>
        )}
        {hiddenError && (
          <Typography variant="body6" className="h-6">
            {pureError ?? ''}
          </Typography>
        )}
      </div>
    );
  }
);
