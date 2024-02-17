/* eslint-disable jsx-a11y/label-has-associated-control */
import { Typography } from '@ui/atoms/Typography';

import { IBaseSwitch } from './types';

export function BaseSwitchOnClick({
  label,
  ltrLabel,
  defaultValue,
  pureOnChange,
  pureValue,
  defaultChecked,
  pureError,
  disabled = false,
}: IBaseSwitch) {
  return (
    <div dir="ltr">
      {label && (
        <label className={`block mb-1 ${ltrLabel && 'text-left uppercase'}`}>
          <Typography color="teal" size="h5">
            {label}
          </Typography>
        </label>
      )}
      <label
        className={`select-none items-center autoSaverSwitch relative inline-flex ${
          disabled ? 'cursor-not-allowed' : 'cursor-pointer'
        }`}
      >
        <input
          disabled={disabled}
          type="checkbox"
          className="sr-only"
          checked={pureValue}
          onChange={pureOnChange}
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
        <Typography color="red" size="caption" className="h-6">
          {pureError}
        </Typography>
      )}
    </div>
  );
}
