import { useState, useEffect } from 'react'; // Import useState and useEffect hooks
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

  useEffect(() => {
    if (defaultValue && Array.isArray(defaultValue)) {
      const isDataChecked = defaultValue.some((item) => item.id === data.id);
      setIsChecked(isDataChecked);
    }
  }, [defaultValue, data.id]);

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

          let updatedValue = [...(field.value || [])];

          if (checked) {
            if (
              !updatedValue.some((item: { id: string }) => item.id === data.id)
            ) {
              updatedValue.push(data);
            }
          } else {
            updatedValue = updatedValue.filter(
              (item: { id: string }) => item.id !== data.id
            );
          }

          field.onChange(updatedValue);
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
