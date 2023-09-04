import { Controller } from "react-hook-form";

import { Typography } from "../Typography";
import { IBaseSwitch } from "./types";

export function BaseSwitch({
  label,
  name,
  control,
  rules,
  ltrLabel,
  defaultValue,
}: IBaseSwitch<any>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field: { value, ...field } }) => {
        return (
          <div dir="ltr">
            {label && (
              <label
                htmlFor={name}
                className={`block mb-1 ${ltrLabel && "text-left uppercase"}`}
              >
                <Typography color="teal" size="h5">
                  {label}
                </Typography>
              </label>
            )}
            <label className="autoSaverSwitch relative inline-flex cursor-pointer select-none items-center">
              <input
                type="checkbox"
                className="sr-only"
                value={value}
                {...field}
              />
              <span
                className={`slider mr-3 flex h-[26px] w-[50px] items-center rounded-full p-1 duration-200 ${
                  value ? "bg-teal-600" : "bg-[#CCCCCE]"
                }`}
              >
                <span
                  className={`dot h-[18px] w-[18px] rounded-full bg-white duration-200 ${
                    value ? "translate-x-6" : ""
                  }`}
                ></span>
              </span>
            </label>
          </div>
        );
      }}
    />
  );
}
