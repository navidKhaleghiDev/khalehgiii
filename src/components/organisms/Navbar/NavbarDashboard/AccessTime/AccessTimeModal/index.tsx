import { Typography } from '@ui/atoms/Typography/Typography';
import { Card } from '@ui/atoms';
import { IconButton } from '@ui/atoms/BaseButton';
import { ETimeLimitDuration, IDaAs } from '@src/services/users/types';
import xIcon from '@iconify-icons/ph/x';

import {
  tomorrow,
  getNextSaturday,
  firstDayOfNextMonth,
} from '@src/helper/utils/dateUtils';
import {
  TimeLimitDurationLabel,
  TimeLimitDurationLabelDetails,
} from '@src/constants/accessTime';
import { formatDuration } from '@src/helper/utils/timeUtils';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@context/settings/languageContext';
import { AccessTimeModalCard } from './AccessTimeModalCard';
import { AccessDlpModalCard } from './AccessDlpModalCard';

// Use the `displayText` variable where needed

type PropsType = {
  onClick: (value: boolean) => void;
  // timeLimitDuration: ETimeLimitDuration;
  // timeLimitValueInHour: number;
  // usageInMinute: number;
  daas?: IDaAs;
};

export function AccessTimeModal({ onClick, daas }: PropsType) {
  const { lang } = useLanguage();
  const localizationDate = lang === 'fa' ? 'fa-IR' : 'en-US';

  const { t } = useTranslation();
  const timeLimitDuration: ETimeLimitDuration =
    daas?.daas_configs?.time_limit_duration ?? ETimeLimitDuration.DAILY;

  const timeLimitValueInHour =
    daas?.daas_configs?.time_limit_value_in_hour ?? 0;

  const usageInMinute: number = (daas?.usage_in_minute as number) ?? 0;

  const timeLimitValueInMinute = Math.floor(timeLimitValueInHour) * 60;
  const remainingTime = timeLimitValueInMinute - Math.floor(usageInMinute);

  let timeLeft;

  if (timeLimitDuration === ETimeLimitDuration.PERMANENTLY) {
    timeLeft = '';
  } else if (remainingTime < 0) {
    timeLeft = t('global.hasBeenFinished');
  } else {
    timeLeft = formatDuration(remainingTime);
  }

  function getExtensionTime(label: ETimeLimitDuration): string {
    switch (label) {
      case ETimeLimitDuration.DAILY:
        return tomorrow.toLocaleDateString(localizationDate);

      case ETimeLimitDuration.WEEKLY:
        return getNextSaturday().toLocaleDateString(localizationDate);

      case ETimeLimitDuration.MONTHLY:
        return firstDayOfNextMonth.toLocaleDateString(localizationDate);

      case ETimeLimitDuration.PERMANENTLY:
        return t('global.doesNot');

      default:
        return '';
    }
  }

  return (
    <div className="w-full">
      <div className="flex w-full justify-end p-2">
        <IconButton
          icon={xIcon}
          color="tealNoBg"
          onClick={() => onClick(false)}
        />
      </div>
      <div className="px-16 pt-8 pb-16 w-full">
        <Card className="bg-teal-600 flex items-center justify-between h-10 text-white px-2">
          <Typography size="body3" color="white">
            {t('global.timeAccess')}
          </Typography>
          <div className="flex items-center justify-between w-1/2">
            <Typography size="body3" color="white">
              {TimeLimitDurationLabel[timeLimitDuration]}
            </Typography>
            |
            <Typography size="body3" color="white">
              {timeLimitValueInHour} {t('global.hour')}
            </Typography>
          </div>
        </Card>
        <div className="flex gap-2">
          <AccessTimeModalCard
            label={t('table.usedTime')}
            name={TimeLimitDurationLabelDetails[timeLimitDuration]}
            value={
              usageInMinute ? formatDuration(Math.floor(usageInMinute)) : '-'
            }
          />
          <AccessTimeModalCard
            label={t('table.leftTime')}
            name={TimeLimitDurationLabelDetails[timeLimitDuration]}
            value={timeLeft}
          />
          <AccessTimeModalCard
            label={t('table.extendTime')}
            name={getExtensionTime(timeLimitDuration)}
            value={
              timeLimitDuration !== ETimeLimitDuration.PERMANENTLY
                ? '00:01'
                : ''
            }
          />
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <AccessDlpModalCard
            label={t('table.desktopV')}
            value={daas?.daas_version}
          />
          <AccessDlpModalCard
            label={t('global.maximumUploadSize')}
            value={`${daas?.daas_configs?.max_transmission_upload_size} MB`}
            contentDirection="ltr"
          />
          <AccessDlpModalCard
            label={t('global.maximumDownloadSize')}
            value={`${daas?.daas_configs?.max_transmission_download_size} MB`}
            contentDirection="ltr"
          />
          <AccessDlpModalCard
            label={t('global.microphoneAccess')}
            isAccess={daas?.daas_configs?.microphone_privilege}
          />
          <AccessDlpModalCard
            label={t('global.webcamAccess')}
            isAccess={daas?.daas_configs?.webcam_privilege}
          />
          <AccessDlpModalCard
            label={t('global.uploadAccess')}
            isAccess={daas?.daas_configs?.can_upload_file}
          />
          <AccessDlpModalCard
            label={t('global.downloadAccess')}
            isAccess={daas?.daas_configs?.can_download_file}
          />
        </div>
        <div className="flex gap-2">
          <AccessTimeModalCard
            label={t('global.allowedTypeForUpload')}
            value={`${daas?.allowed_files_type_for_upload?.join(' ')}`}
            contentDirection="ltr"
          />
        </div>

        <div className="flex gap-2">
          <AccessTimeModalCard
            label={t('global.allowedTypeForDownload')}
            value={`${daas?.allowed_files_type_for_download?.join(' ')}`}
            contentDirection="ltr"
          />
        </div>
      </div>
    </div>
  );
}
