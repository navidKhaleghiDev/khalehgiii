import { Control } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import downloadSimple from '@iconify-icons/ph/download-simple';
import uploadSimple from '@iconify-icons/ph/upload-simple';
import timer from '@iconify-icons/ph/timer';
import { BaseInputNumberController } from '@ui/atoms/Inputs/BaseInputNumber/Controller';
import { useLanguage } from '@context/settings/languageContext';
import { TimeLimitDuration } from '@src/services/users/types';
import { regexPattern } from '@ui/atoms/Inputs';

import { UserAccessModalCard } from '../DaAsCard/UserAccessModalCard';

export function MaxSizeAccess({
  control,
  usageInMinute,
  timeOfUse,
}: {
  control: Control<any>;
  usageInMinute: number | string;
  timeOfUse: TimeLimitDuration;
}) {
  const { t } = useTranslation();
  const { dir } = useLanguage();

  const maxTimeLimitValues: { [key in TimeLimitDuration]?: number } = {
    DAILY: 24,
    MONTHLY: 744,
    WEEKLY: 168,
    PERMANENTLY: 2000,
  };

  const minTimeLimitValue =
    usageInMinute && typeof usageInMinute === 'number'
      ? Math.ceil(usageInMinute / 60)
      : 0;

  const setMaxTimeLimitValue = () => maxTimeLimitValues[timeOfUse] || 0;

  return (
    <UserAccessModalCard className="grid grid-cols-2 gap-5">
      <BaseInputNumberController
        control={control}
        name="max_transmission_upload_size"
        id="max_transmission_upload_size"
        icon={uploadSimple}
        label={t('table.maxUploadSize')}
        className="sm:col-span-1 col-span-2"
        dir={dir === 'rtl' ? 'rtl' : 'ltr'}
        min={0}
        max={3000}
      />
      <BaseInputNumberController
        control={control}
        name="max_transmission_download_size"
        id="max_transmission_download_size"
        icon={downloadSimple}
        label={t('table.maxDownloadSize')}
        className="sm:col-span-1 col-span-2"
        dir={dir === 'rtl' ? 'rtl' : 'ltr'}
        min={0}
        max={3000}
      />
      <BaseInputNumberController
        control={control}
        name="time_limit_value_in_hour"
        id="time_limit_value_in_hour"
        icon={timer}
        label={t('table.timeLimitValueInHour')}
        className="sm:col-span-1 col-span-2"
        dir={dir === 'rtl' ? 'rtl' : 'ltr'}
        disabled={timeOfUse === 'PERMANENTLY'}
        rules={{
          max: {
            value: setMaxTimeLimitValue(),
            message: t('userList.timeExceededError'),
          },
          min: {
            value: minTimeLimitValue,
            message: t('userList.timeLessThanUserUsage'),
          },
          required: regexPattern.required,
        }}
      />
    </UserAccessModalCard>
  );
}
