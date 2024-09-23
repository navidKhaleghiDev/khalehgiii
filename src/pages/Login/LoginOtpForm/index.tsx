import { BaseOtp } from '@ui/atoms/BaseOtp';
import { useTranslation } from 'react-i18next';
import { Typography } from '@ui/atoms/Typography/Typography';
import { BackButton } from '@ui/atoms/BackButton';

export default function LogInOtpForm({
  control,
  setIsOtpActive,
  error,
  name = 'totp',
}: any) {
  const { t } = useTranslation();

  return (
    <div>
      <BackButton
        className="absolute top-4  left-4"
        onClick={() => setIsOtpActive(false)}
      />
      <Typography color="neutral" variant="h5" className="mb-8 text-center ">
        {t('login.otp')}
      </Typography>

      {error && (
        <Typography color="red" variant="body3" className="mb-2 text-center ">
          {error}
        </Typography>
      )}
      <BaseOtp name={name} valueLength={6} control={control} size="md" />
    </div>
  );
}
