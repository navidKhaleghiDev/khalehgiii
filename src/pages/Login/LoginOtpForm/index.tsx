import { useTranslation } from 'react-i18next';
import { Control, FieldValues } from 'react-hook-form';

import { Typography } from '@ui/atoms';
import { BaseOtp } from '@ui/atoms/Inputs/BaseOtp';

import { LoginFieldValues } from '../types';

interface LoginOtpProps<T extends FieldValues> {
  control: Control<T>;
  error: string | null;
}

export default function LogInOtpForm({
  control,
  error,
}: LoginOtpProps<LoginFieldValues>) {
  const { t } = useTranslation();

  return (
    <div>
      <div className="flex flex-col gap-1 p-5 mb-[5.12rem]">
        <Typography
          color="black"
          variant="body1B"
          className="text-center leading-9"
        >
          {t('login.otpCode')}
        </Typography>
        <Typography color="neutral" variant="body3" className="text-center">
          {t('login.otp')}
        </Typography>
      </div>

      {error && (
        <Typography color="red" variant="body3" className="mb-2 text-center ">
          {error}
        </Typography>
      )}
      <div className="mb-[12.8rem]">
        <BaseOtp name="totp" valueLength={6} control={control} size="md" />
      </div>
    </div>
  );
}
