import { useTranslation } from 'react-i18next';

import { regexPattern } from '@ui/atoms/Inputs';
import { Divider } from '@ui/atoms/Divider';
import { checkPermission } from '@src/helper/hooks/usePermission';
import { EPermissionDaas } from '@src/types/permissions';
import { Card, Typography } from '@redesignUi/atoms';
import { TitleSection } from '@redesignUi/atoms/TitleSection';
import { BaseCheckBoxController } from '@redesignUi/atoms/Inputs/BaseCheckBox/Controller';
import { BaseRadioButtonController } from '@redesignUi/atoms/Inputs/BaseRadioButton/Controller';
import { BaseInputNumberController } from '@redesignUi/atoms/Inputs/BaseInputNumber/Controller';
import PhDownloadSimple from '@iconify-icons/ph/download-simple';
import PhUploadSimple from '@iconify-icons/ph/upload-simple';
import PhTimer from '@iconify-icons/ph/timer';
import { useLanguage } from '@context/settings/languageContext';

import { PropsType } from '../../type';

export function DaasSettingForm({ control, userPermissions }: PropsType) {
  const { t } = useTranslation();
  const { lang } = useLanguage();
  const direction = lang === 'fa' ? 'rtl' : 'ltr';

  const hasChangePermission = checkPermission(
    userPermissions,
    EPermissionDaas.CHANGE
  );

  const inputStyle = 'col-span-6 lg:col-span-4 h-16';
  const cardStyles =
    'flex items-center w-40 sm:w-full h-10 shrink-0 pr-[0.62rem] ltr:pl-[0.62rem] col-span-6 md:col-span-3 lg:col-span-2';

  return (
    <div className="grid col-span-6">
      <div className="mb-[5.87rem]">
        <TitleSection label="Daas" />
      </div>
      <div className="w-full h-full flex flex-col">
        <Typography className="mb-1" color="black" variant="body4B">
          {t('table.downloadAndUploadPrivilege')}
        </Typography>

        <div className="w-full grid mt-5">
          <div className="flex col-span-6 lg:col-span-4 gap-[9.18rem] mb-7">
            <BaseCheckBoxController
              control={control}
              id="can_download_file"
              name="can_download_file"
              label={t('table.downloadPrivilege')}
            />
            <BaseCheckBoxController
              control={control}
              id="can_upload_file"
              name="can_upload_file"
              label={t('table.uploadPrivilege')}
            />
          </div>
        </div>

        <Divider />

        <Typography className="mb-5 mt-7" color="black" variant="body4B">
          {t('table.timeLimitDuration')}
        </Typography>
        <div className="w-full mb-7">
          <div className="gap-5 grid-flow-row-dense grid grid-cols-12">
            <Card className={cardStyles} color="white">
              <BaseRadioButtonController
                control={control}
                id="temporary"
                name="time_limit_duration"
                value="TEMPORARY"
                label={t('table.temporary')}
              />
            </Card>
            <Card className={cardStyles} color="white">
              <BaseRadioButtonController
                control={control}
                id="daily"
                name="time_limit_duration"
                value="DAILY"
                label={t('table.daily')}
              />
            </Card>
            <Card className={cardStyles} color="white">
              <BaseRadioButtonController
                control={control}
                id="weekly"
                name="time_limit_duration"
                value="WEEKLY"
                label={t('table.weekly')}
              />
            </Card>
            <Card className={cardStyles} color="white">
              <BaseRadioButtonController
                control={control}
                id="monthly"
                name="time_limit_duration"
                value="MONTHLY"
                label={t('table.monthly')}
              />
            </Card>
            <Card className={cardStyles} color="white">
              <BaseRadioButtonController
                control={control}
                id="permanently"
                name="time_limit_duration"
                value="PERMANENTLY"
                label={t('table.permanently')}
                className="col--6 lg:col-span-4"
              />
            </Card>
          </div>
        </div>
        <Divider />

        <Typography className="mb-1 mt-7" color="black" variant="body4B">
          {t('table.accessSetting')}
        </Typography>
        <div className="grid w-full grid-cols-12 gap-[1.87rem] mt-5">
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
                pattern: regexPattern.numbers,
              }}
              fullWidth
            />
          </div>
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
                pattern: regexPattern.numbers,
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
              placeholder={t('global.selectHour')}
              icon={PhTimer}
              dir={direction}
              rules={{
                required: regexPattern.required,
                pattern: regexPattern.numbers,
              }}
              fullWidth
            />
          </div>
        </div>
      </div>
    </div>
  );
}
