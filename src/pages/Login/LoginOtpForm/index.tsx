import { useTranslation } from 'react-i18next';

import { BackButton } from '@redesignUi/atoms/BackButton';
import { Typography } from '@redesignUi/atoms';
import { BaseOtp } from '@redesignUi/atoms/Inputs/BaseOtp';

export default function LogInOtpForm({
  control,
  setIsOtpActive,
  error,
  name = 'totp',
}: any) {
  const { t } = useTranslation();

  return (
    <div>
      <div className="absolute top-[1.87rem] rtl:right-20 ltr:left-20">
        <BackButton onClick={() => setIsOtpActive(false)} />
      </div>

      <Typography color="neutral" variant="body4" className="mb-8 text-center ">
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
