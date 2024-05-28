/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { Typography } from '@ui/atoms/Typography';
import { IBaseSwitchWithState } from './types';

export function BaseSwitchWithState({
  label,
  name,
  ltrLabel,
  pureOnChange,
  pureValue,
  defaultChecked,
  pureError,
  disabled = false,
}: IBaseSwitchWithState<any>) {
  const [checked, setChecked] = useState(pureValue);

  useEffect(() => {
    if (pureValue !== undefined) {
      setChecked(pureValue);
    }
  }, [pureValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = e.target.checked;
    setChecked(newChecked);
    if (pureOnChange) pureOnChange(newChecked);
  };

  return (
    <div dir="ltr">
      {label && (
        <label
          htmlFor={`${name}_input`}
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
        className={`autoSaverSwitch relative inline-flex cursor-pointer select-none items-center ${
          disabled ? 'cursor-not-allowed' : ''
        }`}
      >
        <input
          id={`${name}_input`}
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          defaultChecked={defaultChecked}
        />
        <span
          className={`slider mr-3 flex h-[26px] w-[50px] items-center rounded-full p-1 duration-200 ${
            checked ? 'bg-teal-600' : 'bg-[#CCCCCE]'
          }`}
        >
          <span
            className={`dot h-[18px] w-[18px] rounded-full bg-white duration-200 ${
              checked ? 'translate-x-6' : ''
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
