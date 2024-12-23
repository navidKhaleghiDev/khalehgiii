import { t } from 'i18next';

import { BaseInputNumberController } from '@ui/atoms/Inputs/BaseInputNumber/Controller';
import { TitleSection } from '@ui/atoms/TitleSection';
import { checkPermission } from '@src/helper/hooks/usePermission';
import { PropsType } from '@src/pages/Setting/type';
import { PermissionDaas } from '@src/types/permissions';
import PhDownloadSimple from '@iconify-icons/ph/download-simple';
import PhUploadSimple from '@iconify-icons/ph/upload-simple';
import PhTimer from '@iconify-icons/ph/timer';
import { TimeLimitDuration } from '@src/services/users/types';
import { useLanguage } from '@context/settings/languageContext';
import { regexPattern } from '@ui/atoms/Inputs';

const inputStyle = 'flex col-span-6 lg:col-span-4 h-16';

export function AccessSeting({
  control,
  userPermissions,
  timeOfUse,
  usageInMinute,
}: PropsType) {
  const { dir } = useLanguage();
  const maxTimeLimitValues: { [key in TimeLimitDuration]?: number } = {
    DAILY: 24,
    WEEKLY: 168,
    MONTHLY: 744,
  };

  const minTimeLimitValue =
    usageInMinute && typeof usageInMinute === 'number'
      ? Math.ceil(usageInMinute / 60)
      : 0;
  const setMaxTimeLimitValue = () =>
    maxTimeLimitValues[timeOfUse as TimeLimitDuration] || 0;

  const hasChangePermission = checkPermission(
    userPermissions,
    PermissionDaas.CHANGE
  );

  return (
    <>
      <div>
        <TitleSection label={t('table.accessSetting')} />
      </div>
      <div className="grid w-full grid-cols-12 gap-[1.87rem] mt-5 mb-3">
        <div className={inputStyle}>
          <BaseInputNumberController
            id="max_transmission_upload_size"
            name="max_transmission_upload_size"
            control={control}
            label={t('table.maxUploadSize')}
            disabled={!hasChangePermission}
            placeholder={t('table.upload')}
            icon={PhUploadSimple}
            dir={dir}
            max={50}
            rules={{
              required: regexPattern.required,
            }}
            fullWidth
          />
        </div>
        <div className={inputStyle}>
          <BaseInputNumberController
            id="max_transmission_download_size"
            name="max_transmission_download_size"
            control={control}
            label={t('table.maxDownloadSize')}
            disabled={!hasChangePermission}
            placeholder={t('table.download')}
            icon={PhDownloadSimple}
            dir={dir}
            max={500}
            rules={{
              required: regexPattern.required,
              // validate: (value: number) => value !== 0 || t('error'),
            }}
            fullWidth
          />
        </div>

        <div className={inputStyle}>
          <BaseInputNumberController
            id="time_limit_value_in_hour"
            name="time_limit_value_in_hour"
            control={control}
            label={t('table.timeLimitDuration')}
            disabled={!hasChangePermission || timeOfUse === 'PERMANENTLY'}
            placeholder={t('global.hour')}
            icon={PhTimer}
            dir={dir}
            rules={{
              required: regexPattern.required,
              max: {
                value: setMaxTimeLimitValue(),
                message: t('userList.timeExceededError'),
              },
              min: {
                value: minTimeLimitValue,
                message: t('userList.timeLessThanUserUsage'),
              },
            }}
            fullWidth
          />
        </div>
      </div>
    </>
  );
}
