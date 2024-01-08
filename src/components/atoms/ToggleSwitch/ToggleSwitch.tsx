import { IToggleSwitch } from './types';
import { BaseIcon } from '../BaseIcon';
import { Controller } from 'react-hook-form';

export function ToggleSwitch({
  leftButton,
  rightButton,
  name,
  control,
  rules,
  defaultValue,
}: IToggleSwitch<any>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field: { value, ...field } }) => {
        return (
          <label className="themeSwitcherTwo shadow-card relative inline-flex cursor-pointer select-none items-center justify-center rounded-md bg-[#f4f7ff] p-1">
            <input
              type="checkbox"
              className="sr-only"
              value={value}
              {...field}
            />
            <span
              className={`flex items-center space-x-[6px] rounded py-1 px-[18px] text-sm font-medium ${
                !value ? 'text-white bg-teal-600' : 'text-body-color'
              }`}
            >
              <BaseIcon
                icon={rightButton.icon}
                className="ml-[6px] fill-current"
              />
              {rightButton.label}
            </span>
            <span
              className={`flex items-center space-x-[6px] rounded py-1 px-[18px] text-sm font-medium ${
                value ? 'text-white bg-teal-600' : 'text-body-color'
              }`}
            >
              <BaseIcon
                icon={leftButton.icon}
                className="ml-[6px] fill-current"
              />
              {leftButton.label}
            </span>
          </label>
        );
      }}
    />
  );
}
