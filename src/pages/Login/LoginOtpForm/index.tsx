import { useState } from 'react';
import { BaseButton } from '@ui/atoms/BaseButton/BaseButton';
import { BaseOtp } from '@ui/atoms/BaseOtp';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import signInBoldIcon from '@iconify-icons/ph/sign-in-bold';
import { Typography } from '@ui/atoms/Typography/Typography';
import { BackButton } from '@ui/atoms/BackButton';

export default function LogInOtpForm({ setIsOtpActive }: any) {
  const { t } = useTranslation();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState();
  const { handleSubmit, control, watch } = useForm({
    mode: 'onChange',
  });

  const onSubmit = (data: any) => {
    console.log('Submitted OTP:', data);
  };

  return (
    <div className="w-full h-60 ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center w-full "
      >
        <BackButton
          className="absolute top-4  left-4"
          onClick={() => setIsOtpActive(false)}
        />
        <Typography color="neutral" variant="h5" className="mb-8">
          {t('login.otp')}
        </Typography>

        {error && (
          <Typography color="red" variant="body3" className="mb-2">
            {error}
          </Typography>
        )}
        <BaseOtp name="otp" valueLength={4} control={control} size="md" />
        <BaseButton
          label={t('login.confirm')}
          endIcon={signInBoldIcon}
          className="mt-20"
          // loading={loadingButton}
          size="md"
          submit
          fullWidth
        />
      </form>
    </div>
  );
}
