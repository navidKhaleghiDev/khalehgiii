import { useTranslation } from 'react-i18next';

import { regexPattern } from '@redesignUi/atoms/Inputs';
import { checkPermission } from '@src/helper/hooks/usePermission';
import { EPermissionDaas } from '@src/types/permissions';
import { Card, Typography } from '@redesignUi/atoms';
import { BaseCheckBoxController } from '@redesignUi/atoms/Inputs/BaseCheckBox/Controller';
import { BaseRadioButtonController } from '@redesignUi/atoms/Inputs/BaseRadioButton/Controller';
import { BaseInputNumberController } from '@redesignUi/atoms/Inputs/BaseInputNumber/Controller';
import { useLanguage } from '@context/settings/languageContext';
import { Divider } from '@redesignUi/atoms/Divider';
import PhDownloadSimple from '@iconify-icons/ph/download-simple';
import PhUploadSimple from '@iconify-icons/ph/upload-simple';
import PhTimer from '@iconify-icons/ph/timer';
import { ChromeSvg } from '@redesignUi/atoms/Svgs/ChromeSvg';
import { FirefoxSvg } from '@redesignUi/atoms/Svgs/FirefoxSvg';

import { PropsType } from '../../type';
import { TitleSection } from '../../component/TitleSection';

export function DaasSettingForm({
  control,
  userPermissions,
  isActive,
}: PropsType) {
  const { t } = useTranslation();
  const { lang } = useLanguage();
  const direction = lang === 'fa' ? 'rtl' : 'ltr';

  const hasChangePermission = checkPermission(
    userPermissions,
    EPermissionDaas.CHANGE
  );

  const inputStyle = 'flex col-span-6 lg:col-span-4 h-16';
  const cardStyles =
    'flex items-center w-40 sm:w-full h-10 shrink-0 pr-[0.62rem] ltr:pl-[0.62rem] col-span-6 md:col-span-3 lg:col-span-2';

  return (
    <div className="grid col-span-6">
      <div className="mb-[2.87rem]">
        <Typography
          color="black"
          variant="body2B"
          className="w-full col-span-12 dark:text-white"
        >
          {t('setting.daas')}
        </Typography>
      </div>
      <div className="w-full h-full flex flex-col">
        <div className="mb-1">
          <TitleSection label={t('table.downloadAndUploadPrivilege')} />
        </div>

        <div className="w-full grid mt-5">
          <div className="flex col-span-6 lg:col-span-4 gap-[9.18rem] mb-5">
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
        <div className="mb-5">
          <TitleSection label={t('table.timeLimitDuration')} />
        </div>

        <div className="w-full mb-5">
          <div className="gap-5 grid-flow-row-dense grid grid-cols-12">
            <Card
              className={`${cardStyles} ${
                isActive === 'DAILY' ? 'border border-teal-500' : ''
              }`}
              color="white"
            >
              <BaseRadioButtonController
                control={control}
                id="daily"
                name="time_limit_duration"
                value="DAILY"
                label={t('table.daily')}
              />
            </Card>
            <Card
              className={`${cardStyles} ${
                isActive === 'WEEKLY' ? 'border border-teal-500' : ''
              }`}
              color="white"
            >
              <BaseRadioButtonController
                control={control}
                id="weekly"
                name="time_limit_duration"
                value="WEEKLY"
                label={t('table.weekly')}
              />
            </Card>
            <Card
              className={`${cardStyles} ${
                isActive === 'MONTHLY' ? 'border border-teal-500' : ''
              }`}
              color="white"
            >
              <BaseRadioButtonController
                control={control}
                id="monthly"
                name="time_limit_duration"
                value="MONTHLY"
                label={t('table.monthly')}
              />
            </Card>
            <Card
              className={`${cardStyles} ${
                isActive === 'PERMANENTLY' ? 'border border-teal-500' : ''
              }`}
              color="white"
            >
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
              placeholder={t('global.selectHour')}
              icon={PhTimer}
              dir={direction}
              rules={{
                required: regexPattern.required,
              }}
              fullWidth
            />
          </div>
        </div>
        <Divider />
        <div>
          <TitleSection label={t('setting.resourceLimitations')} />
        </div>
        <div className="grid w-full grid-cols-12 gap-[1.87rem] mt-3 mb-5">
          <div className="w-full grid grid-flow-col gap-2 whitespace-nowrap">
            <BaseCheckBoxController
              control={control}
              id=""
              name=""
              label={t('setting.chrome')}
            />
            <ChromeSvg />
          </div>
        </div>
        <div className="grid w-full grid-cols-12 gap-[1.87rem] mb-3">
          <div className={inputStyle}>
            <BaseInputNumberController
              id=""
              name=""
              control={control}
              label={t('setting.memory')}
              disabled={!hasChangePermission}
              placeholder="0"
              icon={PhDownloadSimple}
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
              id=""
              name=""
              control={control}
              label={t('setting.cpu')}
              disabled={!hasChangePermission}
              placeholder={t('setting.core')}
              icon={PhDownloadSimple}
              dir={direction}
              max={500}
              rules={{
                required: regexPattern.required,
              }}
              fullWidth
            />
          </div>
        </div>
        <div className="grid w-full grid-cols-12 gap-[1.87rem] mt-3 mb-5">
          <div className="w-full grid grid-flow-col gap-2 whitespace-nowrap">
            <BaseCheckBoxController
              control={control}
              id=""
              name=""
              label={t('setting.fireFox')}
            />
            <FirefoxSvg />
          </div>
        </div>
        <div className="grid w-full grid-cols-12 gap-[1.87rem]">
          <div className={inputStyle}>
            <BaseInputNumberController
              id=""
              name=""
              control={control}
              label={t('setting.memory')}
              disabled={!hasChangePermission}
              placeholder="0"
              icon={PhDownloadSimple}
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
              id=""
              name=""
              control={control}
              label={t('setting.cpu')}
              disabled={!hasChangePermission}
              placeholder={t('setting.core')}
              icon={PhDownloadSimple}
              dir={direction}
              max={500}
              rules={{
                required: regexPattern.required,
              }}
              fullWidth
            />
          </div>
        </div>
      </div>
    </div>
  );
}
