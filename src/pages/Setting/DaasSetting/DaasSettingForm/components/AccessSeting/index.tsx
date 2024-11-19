import { t } from 'i18next';

import { useLanguage } from '@context/settings/languageContext';
import { BaseInputNumberController } from '@redesignUi/atoms/Inputs/BaseInputNumber/Controller';
import { regexPattern } from '@redesignUi/atoms/Inputs';

import { TitleSection } from '@redesignUi/atoms/TitleSection';
import { checkPermission } from '@src/helper/hooks/usePermission';
import { PropsType } from '@src/pages/Setting/type';
import { EPermissionDaas } from '@src/types/permissions';
import PhDownloadSimple from '@iconify-icons/ph/download-simple';
import PhUploadSimple from '@iconify-icons/ph/upload-simple';
import PhTimer from '@iconify-icons/ph/timer';

export function AccessSeting({ control, userPermissions }: PropsType) {
  const inputStyle = 'flex col-span-6 lg:col-span-4 h-16';
  const { lang } = useLanguage();
  const direction = lang === 'fa' ? 'rtl' : 'ltr';

  const hasChangePermission = checkPermission(
    userPermissions,
    EPermissionDaas.CHANGE
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
            placeholder="50"
            icon={PhUploadSimple}
            dir={direction}
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
            placeholder="500"
            icon={PhDownloadSimple}
            dir={direction}
            max={500}
            rules={{
              required: regexPattern.required,
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
            disabled={!hasChangePermission}
            placeholder={t('global.hour')}
            icon={PhTimer}
            dir={direction}
            rules={{
              required: regexPattern.required,
            }}
            fullWidth
          />
        </div>
      </div>
    </>
  );
}
