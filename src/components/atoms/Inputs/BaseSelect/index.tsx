/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller } from 'react-hook-form';
import caretCircleLeftIcon from '@iconify-icons/ph/caret-circle-left';

import { t } from 'i18next';
import { BaseInputProps } from '../types';
import { baseSelectStyles } from './styles';
import { Typography } from '../../Typography';
import { IOptionSelect, OptionSelect } from './OptionSelect';
import { IconInput } from '../IconInput';

export function BaseSelect(props: BaseInputProps<any>) {
  const {
    control,
    name,
    id,
    // placeholder,
    rules,
    className,
    fullWidth,
    defaultValue,
    startIcon,
    endIcon,
    intent,
    hiddenError,
  } = props;
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => (
        <div className={`${className} ${fullWidth && 'w-full'}`}>
          {/* {label && (
            <label
              htmlFor={id}
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              {label}
            </label>
          )} */}
          <div className="inline-block relative w-64">
            <select
              id={id}
              dir="auto"
              name={field.name}
              value={field.value}
              onChange={field.onChange}
              className={baseSelectStyles({
                intent: error?.message ? 'error' : intent,
                className: `${endIcon && 'pr-8'} ${startIcon && 'pl-8'}`,
                fullWidth,
              })}
              // {placeholder}
            >
              <OptionSelect option={{ label: t('global.select'), value: '' }} />
              {[
                { id: '1', label: 'گزینه', value: 'tow' },
                { id: '2', label: 'گزینه', value: 'tow' },
              ].map((option: IOptionSelect) => (
                <OptionSelect key={option.id} option={option} />
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2 text-gray-700">
              <IconInput icon={caretCircleLeftIcon} intent="default" />
            </div>
          </div>
          {!hiddenError && (
            <Typography color="red" size="caption" className="h-6">
              {error?.message ?? ''}
            </Typography>
          )}
        </div>
      )}
    />
  );
}
