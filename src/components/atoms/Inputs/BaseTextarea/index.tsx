import { Controller } from 'react-hook-form';

import { baseTextareaStyles } from '../styles';
import { Typography } from '../../Typography';
import { BaseTextareaProps } from './types';

export function BaseTextarea(props: BaseTextareaProps<any>) {
  const {
    control,
    name,
    id,
    placeholder,
    rules,
    className,
    fullWidth,
    defaultValue,
    intent,
    size,
    hiddenError,
    label,
  } = props;
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => (
        <div className={`${className} ${fullWidth && 'w-full'}`}>
          {label && (
            <label htmlFor={id} className="block mb-1">
              <Typography color="teal" size="h5">
                {label}
              </Typography>
            </label>
          )}
          <textarea
            id={id}
            rows={5}
            cols={50}
            dir="auto"
            name={field.name}
            value={field.value ?? ''}
            onChange={field.onChange}
            className={baseTextareaStyles({
              intent: error?.message ? 'error' : intent,
              className: 'pl-8',
              fullWidth,
              size,
            })}
            placeholder={placeholder}
          />
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
