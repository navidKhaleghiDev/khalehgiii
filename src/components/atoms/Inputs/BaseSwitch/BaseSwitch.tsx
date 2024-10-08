/* eslint-disable jsx-a11y/label-has-associated-control */
import { Controller } from 'react-hook-form';
import { Typography } from '@ui/atoms/Typography';

import { IBaseSwitch } from './types';

export function BaseSwitch({
  label,
  name,
  control,
  rules,
  ltrLabel,
  defaultValue,
  pureOnChange,
  pureValue,
  defaultChecked,
  pureError,
  disabled = false,
}: IBaseSwitch<any>) {
  return control ? (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue || false}
      render={({ field }) => {
        return (
          <div dir="ltr">
            {label && (
              <label
                htmlFor={name}
                className={`block mb-1 ${
                  ltrLabel ? 'text-left uppercase' : 'text-right'
                }`}
              >
                <Typography color="teal" variant="h5">
                  {label}
                </Typography>
              </label>
            )}
            <label
              htmlFor={`${name}_input`}
              className="autoSaverSwitch relative inline-flex cursor-pointer select-none items-center"
            >
              <input
                id={`${name}_input`}
                type="checkbox"
                className="sr-only"
                checked={field.value}
                onChange={(e) => {
                  field.onChange(e.target.checked);
                  if (pureOnChange) pureOnChange(e.target.checked);
                }}
              />
              <span
                className={`slider mr-3 flex h-[26px] w-[50px] items-center rounded-full p-1 duration-200 ${
                  field.value ? 'bg-teal-600' : 'bg-[#CCCCCE]'
                }`}
              >
                <span
                  className={`dot h-[18px] w-[18px] rounded-full bg-white duration-200 ${
                    field.value ? 'translate-x-6' : ''
                  }`}
                />
              </span>
            </label>
          </div>
        );
      }}
    />
  ) : (
    <div dir="ltr">
      {label && (
        <label
          htmlFor={name}
          className={`block mb-1 ${ltrLabel && 'text-left uppercase'}`}
        >
          <Typography color="teal" variant="h5">
            {label}
          </Typography>
        </label>
      )}
      <label
        htmlFor={name}
        className={`select-none items-center autoSaverSwitch relative inline-flex ${
          disabled ? 'cursor-not-allowed' : 'cursor-pointer'
        }`}
      >
        <input
          disabled={disabled}
          type="checkbox"
          className="sr-only"
          checked={pureValue}
          defaultValue={defaultValue}
          defaultChecked={defaultChecked}
        />
        <span
          className={`slider mr-3 flex h-[26px] w-[50px] items-center rounded-full p-1 duration-200 ${
            pureValue ? 'bg-teal-600' : 'bg-[#CCCCCE]'
          }`}
        >
          <span
            className={`dot h-[18px] w-[18px] rounded-full bg-white duration-200 ${
              pureValue ? 'translate-x-6' : ''
            }`}
          />
        </span>
      </label>
      {pureError && (
        <Typography color="red" variant="caption" className="h-6">
          {pureError}
        </Typography>
      )}
    </div>
  );
}
