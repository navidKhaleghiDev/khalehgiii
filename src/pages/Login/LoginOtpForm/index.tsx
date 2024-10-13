import { Dispatch, SetStateAction } from 'react';

import { useTranslation } from 'react-i18next';
import { Control, FieldValues } from 'react-hook-form';

import { BackButton } from '@redesignUi/atoms/BackButton';
import { Typography } from '@redesignUi/atoms';
import { BaseOtp } from '@redesignUi/atoms/Inputs/BaseOtp';

import { LoginFieldValues } from '../types';

interface LoginOtpProps<T extends FieldValues> {
  control: Control<T>;
  error: string | null;
  setIsOtpActive: Dispatch<SetStateAction<boolean>>;
}

export default function LogInOtpForm({
  control,
  setIsOtpActive,
  error,
}: LoginOtpProps<LoginFieldValues>) {
  const { t } = useTranslation();

  return (
    <div>
      <div className="absolute top-[1.87rem] rtl:right-[4.37rem] ltr:left-[4.37rem]">
        <BackButton onClick={() => setIsOtpActive(false)} />
      </div>

      <div className="flex flex-col gap-1 p-5 mb-[5.12rem]">
        <Typography
          color="black"
          variant="body1B"
          className="text-center leading-8"
        >
          {t('login.otpCode')}
        </Typography>
        <Typography
          color="neutral"
          variant="body3"
          className="text-center leading-7"
        >
          {t('login.otp')}
        </Typography>
      </div>

      {error && (
        <Typography color="red" variant="body3" className="mb-2 text-center ">
          {error}
        </Typography>
      )}
      <BaseOtp
        name="totp"
        valueLength={6}
        control={control}
        size="md"
        className="mb-[12.8rem]"
      />
    </div>
  );
}
