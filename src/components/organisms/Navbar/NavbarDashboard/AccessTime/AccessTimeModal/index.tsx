import { TimeLimitDuration, DaAsParams } from '@src/services/users/types';

// import {
//   tomorrow,
//   getNextSaturday,
//   firstDayOfNextMonth,
// } from '@src/helper/utils/dateUtils';
// import { TimeLimitDurationLabelDetails } from '@src/constants/accessTime';
import { formatDuration } from '@src/helper/utils/timeUtils';
import { useTranslation } from 'react-i18next';
import { AccessTimeModalCard } from './AccessTimeModalCard';
import { AccessDlpModalCard } from './AccessDlpModalCard';
import { FormatModalCard } from './FormatModalcard';

// Use the `displayText` variable where needed

type PropsType = {
  // timeLimitDuration: ETimeLimitDuration;
  // timeLimitValueInHour: number;
  // usageInMinute: number;
  daas?: DaAsParams;
};

export function AccessTimeModal({ daas }: PropsType) {
  // const localizationDate = lang === 'fa' ? 'fa-IR' : 'en-US';

  const { t } = useTranslation();
  const timeLimitDuration: TimeLimitDuration =
    daas?.daas_configs?.time_limit_duration ?? TimeLimitDuration.DAILY;

  const timeLimitValueInHour =
    daas?.daas_configs?.time_limit_value_in_hour ?? 0;

  const usageInMinute: number = (daas?.usage_in_minute as number) ?? 0;

  const timeLimitValueInMinute = Math.floor(timeLimitValueInHour) * 60;
  const remainingTime = timeLimitValueInMinute - Math.floor(usageInMinute);

  let timeLeft;

  if (timeLimitDuration === TimeLimitDuration.PERMANENTLY) {
    timeLeft = t('global.unlimited');
  } else if (remainingTime < 0) {
    timeLeft = t('global.hasBeenFinished');
  } else {
    timeLeft = formatDuration(remainingTime);
  }

  // function getExtensionTime(label: ETimeLimitDuration): string {
  //   switch (label) {
  //     case ETimeLimitDuration.DAILY:
  //       return tomorrow.toLocaleDateString(localizationDate);

  //     case ETimeLimitDuration.WEEKLY:
  //       return getNextSaturday().toLocaleDateString(localizationDate);

  //     case ETimeLimitDuration.MONTHLY:
  //       return firstDayOfNextMonth.toLocaleDateString(localizationDate);

  //     case ETimeLimitDuration.PERMANENTLY:
  //       return t('global.doesNot');

  //     default:
  //       return '';
  //   }
  // }

  return (
    <div>
      <div className="flex items-center gap-8">
        <AccessTimeModalCard
          label={t('table.usedTime')}
          value={
            usageInMinute ? formatDuration(Math.floor(usageInMinute)) : '-'
          }
        />
        <AccessTimeModalCard label={t('table.leftTime')} value={timeLeft} />
      </div>
      <div className="w-full max-h-[600px] overflow-y-auto ">
        <div className="flex flex-col gap-2 mt-4 pe-5">
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
            label={t('table.AccessConference')}
            isAccess={daas?.chatroom_privileged}
          />
          <AccessDlpModalCard
            label={t('global.onlineAssistance')}
            isAccess={daas?.daas_configs.has_online_assistance}
          />
          <AccessDlpModalCard
            label={t('global.evidenceGathering')}
            isAccess={daas?.daas_configs?.has_evidence_gathering}
          />
          <AccessDlpModalCard
            label={t('global.clipboardAccess')}
            isAccess={daas?.daas_configs?.has_clipboard_access}
          />
          <AccessDlpModalCard
            label={t('global.clipboardLog')}
            isAccess={daas?.daas_configs?.has_clipboard_log_access}
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
        <div className="flex gap-8 mt-4 pe-5">
          <FormatModalCard
            label={t('global.allowedTypeForDownload')}
            formatList={daas?.allowed_files_type_for_download ?? {}}
          />
          <FormatModalCard
            label={t('global.allowedTypeForUpload')}
            formatList={daas?.allowed_files_type_for_upload ?? {}}
          />
        </div>
      </div>
    </div>
  );
}
