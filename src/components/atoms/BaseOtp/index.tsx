import { useState } from 'react';
import { Controller } from 'react-hook-form';
import { Typography } from '../Typography';
import { baseOtpStyles } from './styles';
import { TBaseInputProps, THandleChange, THandleKeyDown } from './types';
import { regexPattern } from '../Inputs';

export function BaseOtp({
  name,
  control,
  rules,
  valueLength = 4,
  className,
  intent,
  size,
  fullWidth,
  pureError,
}: TBaseInputProps<any>) {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const handleChange: THandleChange = (e, index, field) => {
    const val = e.target.value;
    // if (/[^0-9]/.test(val)) return;

    const currentOtp = field.value || '';
    const newOtp = currentOtp.split('');
    newOtp[index] = val;
    const updatedOtp = newOtp.join('');
    field.onChange(updatedOtp);

    if (val && index < valueLength - 1) {
      const nextElement = e.target
        .nextElementSibling as HTMLInputElement | null;
      if (nextElement) {
        nextElement.focus();
      }
    }
  };

  const handleKeyDown: THandleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !e.currentTarget.value && index > 0) {
      const previousElement = e.currentTarget
        .previousElementSibling as HTMLInputElement | null;
      if (previousElement) {
        previousElement.focus();
      }
    }
  };

  return (
    <div dir="ltr">
      <Controller
        name={name}
        control={control}
        rules={{
          required: regexPattern.required,
          ...rules,
          pattern: regexPattern.numbers,
        }}
        render={({ field, fieldState: { error } }) => {
          const otpValue = field.value || '';
          if (error?.message) {
            setErrorMessage(error?.message);
          } else {
            setErrorMessage('');
          }
          return (
            <div style={{ display: 'flex', gap: '10px' }}>
              {Array.from({ length: valueLength }).map((_, index) => (
                <input
                  key={index as number}
                  type="text"
                  className={baseOtpStyles({
                    intent: error?.message || pureError ? 'error' : intent,
                    className,
                    fullWidth,
                    size,
                  })}
                  maxLength={1}
                  value={otpValue[index] || ''}
                  onChange={(e) => handleChange(e, index, field)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              ))}
            </div>
          );
        }}
      />
      <Typography
        color="red"
        variant="caption"
        className="h-6 mt-2 text-center "
      >
        {(pureError || errorMessage) ?? ''}
      </Typography>
    </div>
  );
}
