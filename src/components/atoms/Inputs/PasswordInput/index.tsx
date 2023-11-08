import { BaseInput } from "@ui/atoms";
import { useState } from "react";
import eyeIcon from "@iconify-icons/ph/eye";
import eyeSlashIcon from "@iconify-icons/ph/eye-slash";

import { BaseInputProps } from "../types";
import { regexPattern } from "../utils/regexPattern";

export function PasswordInput({
  name,
  control,
  label,
  placeholder,
  rules,
}: Pick<
  BaseInputProps<any>,
  "name" | "control" | "placeholder" | "label" | "rules"
>) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <BaseInput
      name={name}
      size="md"
      id={name}
      label={label}
      control={control}
      placeholder={placeholder}
      type={showPassword ? "text" : "password"}
      onClickIcon={() => setShowPassword(!showPassword)}
      iconButtonIcon={showPassword ? eyeIcon : eyeSlashIcon}
      rules={{
        required: regexPattern.required,
        ...rules,
        // pattern: regexPattern.password,
      }}
      fullWidth
    />
  );
}
