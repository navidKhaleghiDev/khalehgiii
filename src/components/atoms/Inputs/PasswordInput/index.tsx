import { BaseInput } from '@ui/atoms';
import { useState } from 'react';
import { BaseInputProps } from '../types';
import { regexPattern } from '../utils/regexPattern';

export function PasswordInput({
  name,
  control,
  label,
  placeholder,
}: Pick<BaseInputProps<any>, 'name' | 'control' | 'placeholder' | 'label'>) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <BaseInput
      name={name}
      size="md"
      id={name}
      label={label}
      control={control}
      placeholder={placeholder}
      type={showPassword ? 'text' : 'password'}
      onClickIcon={() => setShowPassword(!showPassword)}
      iconButtonIcon={showPassword ? 'ph:eye' : 'ph:eye-slash'}
      rules={{
        required: regexPattern.required,
        // pattern: regexPattern.password,
      }}
      fullWidth
    />
  );
}
