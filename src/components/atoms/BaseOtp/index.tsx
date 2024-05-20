import { Controller } from 'react-hook-form';
import { Typography } from '../Typography';
import { baseOtpStyles } from './styles';

let errorMessage: string;

type TBaseInputProps = {
  name: string;
  control: any;
  valueLength: number;
  rules?: any;
  className?: string;
  intent?: any;
  size?: any;
  fullWidth?: boolean;
  pureError?: any;
};

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
}: TBaseInputProps) {
  const handleChange = (e: any, index: any, field: any) => {
    const val = e.target.value;
    if (/[^0-9]/.test(val)) return;

    const currentOtp = field.value || '';
    const newOtp = currentOtp.split('');
    newOtp[index] = val;
    const updatedOtp = newOtp.join('');
    field.onChange(updatedOtp);

    if (val && index < valueLength - 1) {
      e.target.nextElementSibling.focus();
    }
  };

  const handleKeyDown = (e: any, index: number) => {
    if (e.key === 'Backspace' && !e.target.value && index > 0) {
      e.target?.previousElementSibling.focus();
    }
  };

  return (
    <div dir="ltr">
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState: { error } }) => {
          const otpValue = field.value || '';
          if (error?.message) {
            errorMessage = error?.message;
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
      <Typography color="red" variant="caption" className="h-6">
        {(pureError || errorMessage) ?? ''}
      </Typography>
    </div>
  );
}
