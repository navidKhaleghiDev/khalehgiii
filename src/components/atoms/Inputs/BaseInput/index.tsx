/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller } from "react-hook-form";

import { BaseInputProps } from "../types";
import { baseInputStyles } from "../styles";
import { Typography } from "../../Typography";
import { IconInput } from "../IconInput";
import { IconButtonInput } from "../IconButtonInput";

export function BaseInput(props: BaseInputProps<any>) {
  const {
    control,
    name,
    id,
    placeholder,
    rules,
    className,
    fullWidth,
    defaultValue,
    startIcon,
    endIcon,
    intent,
    size,
    type,
    label,
    hiddenError,
    pureOnChange,
    pureValue,
    onClickIcon,
    pureError,
    ltrLabel,
    iconButtonIcon = "fa-home",
  } = props;
  return control ? (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => (
        <div className={`${className} ${fullWidth && "w-full"}`}>
          {label && (
            <label
              htmlFor={id}
              className={`block mb-1 ${ltrLabel && "text-left uppercase"}`}
            >
              <Typography color="teal" size="h5">
                {label}
              </Typography>
            </label>
          )}

          <div className="relative">
            {startIcon && <IconInput icon={startIcon} intent={intent} />}
            <input
              id={id}
              type={type}
              dir="auto"
              name={field.name}
              value={type !== "file" ? field.value ?? "" : undefined}
              onChange={(e) => {
                if (type !== "file") {
                  field.onChange(e);
                } else {
                  field.onChange(e.target.files);
                }
              }}
              className={baseInputStyles({
                intent: error?.message ? "error" : intent,
                className: `${(endIcon || onClickIcon) && "pl-8"} ${
                  startIcon && "pr-8"
                } `,
                ltrPlaceHolder: ltrLabel,
                fullWidth,
                size,
              })}
              placeholder={placeholder}
            />

            {onClickIcon && (
              <IconButtonInput
                icon={iconButtonIcon}
                intent={intent}
                onClick={onClickIcon}
              />
            )}
            {endIcon && <IconInput icon={endIcon} intent={intent} />}
          </div>
          {!hiddenError && (
            <Typography color="red" size="caption" className="h-6">
              {error?.message ?? ""}
            </Typography>
          )}
        </div>
      )}
    />
  ) : (
    <div className="w-full flex flex-col">
      <input
        id={id}
        type={type}
        dir="auto"
        name={name}
        value={pureValue}
        onChange={pureOnChange}
        className={baseInputStyles({
          intent: pureError ? "error" : intent,
          className: `${(endIcon || onClickIcon) && "pl-8"} ${
            startIcon && "pr-8"
          } `,
          fullWidth,
          size,
        })}
        placeholder={placeholder}
      />
      {pureError && (
        <Typography color="red" size="caption" className="h-6">
          {pureError}
        </Typography>
      )}
    </div>
  );
}
