/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller } from 'react-hook-form';

import { baseCheckBoxStyles } from '../styles';
import { Typography } from '../../Typography';
import { BaseCheckBoxProps } from './types';

export function BaseCheckBox(props: BaseCheckBoxProps<any>) {
  const {
    control,
    name,
    id,
    rules,
    defaultValue,
    intent,
    size,
    hiddenError,
    label,
    className,
  } = props;
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => (
        <>
          <div className={`flex items-center ${className}`}>
            <input
              id={id}
              type="checkbox"
              name={field.name}
              value={field.value ?? ''}
              onChange={field.onChange}
              className={baseCheckBoxStyles({
                intent: error?.message ? 'error' : intent,
                className: 'pl-8',
                size,
              })}
            />
            <label
              htmlFor={id}
              className="mr-2 text-neutral-900 dark:text-neutral-300"
            >
              {label}
            </label>
          </div>
          {!hiddenError && (
            <Typography color="red" size="caption" className="h-6">
              {error?.message ?? ''}
            </Typography>
          )}
        </>
      )}
    />
  );
}
