import { useState } from 'react'; // Import useState hook
import { Controller } from 'react-hook-form';
import { baseCheckBoxStyles } from '../styles';
import { Typography } from '../../Typography';
import { BaseCustomCheckBoxProps } from './types';

export function BaseCustomCheckBox(props: BaseCustomCheckBoxProps<any>) {
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
    disabled,
    data,
  } = props;

  const [isChecked, setIsChecked] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => {
        const handleChange = (e: { target: HTMLInputElement }) => {
          const { checked } = e.target;
          setIsChecked(checked);
          if (checked) {
            field.onChange([...(field.value || []), data]);
          } else {
            field.onChange(
              field.value.filter((item: { id: string }) => item.id !== data.id)
            );
          }
        };

        return (
          <>
            <div className={`flex items-center ${className}`}>
              <input
                id={id}
                type="checkbox"
                name={field.name}
                checked={isChecked}
                onChange={handleChange}
                className={baseCheckBoxStyles({
                  intent: error?.message ? 'error' : intent,
                  className: 'pl-8',
                  size,
                })}
                disabled={disabled}
              />
              <label
                htmlFor={id}
                className="mr-2 text-neutral-900 dark:text-neutral-300"
              >
                {label}
              </label>
            </div>
            {!hiddenError && (
              <Typography color="red" variant="caption" className="h-6">
                {error?.message ?? ''}
              </Typography>
            )}
          </>
        );
      }}
    />
  );
}
