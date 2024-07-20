import { useState } from 'react'; // Import useState hook
import { Controller } from 'react-hook-form';
import { baseCheckBoxStyles } from '../styles';
import { Typography } from '../../Typography';
import { BaseCheckBoxProps } from './types';

export function BaseCustomCheckBox(props: BaseCheckBoxProps<any>) {
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
    data, // Assuming data is passed as a prop
  } = props;

  // State to manage checked status of the checkbox
  const [isChecked, setIsChecked] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field }) => {
        // Handler to toggle checkbox
        const handleChange = (e) => {
          const checked = e.target.checked;
          setIsChecked(checked);
          if (checked) {
            // Add data to the form state array
            field.onChange([...(field.value || []), data]);
          } else {
            // Remove data from the form state array
            field.onChange(field.value.filter((item) => item.id !== data.id));
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
                  intent: field.error ? 'error' : intent,
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
                {field.error?.message ?? ''}
              </Typography>
            )}
          </>
        );
      }}
    />
  );
}
