// import { useEffect, useState } from 'react';
import { Control } from 'react-hook-form';
// import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import { regexPattern } from '@ui/atoms/Inputs';
// import { IAddConfig } from '@src/services/config/types';
// import {
//   API_ADD_CONFIG,
//   API_ADD_UPDATE,
//   API_CONFIG_LIST,
// } from '@src/services/config';
import { Divider } from '@ui/atoms/Divider';
import { checkPermission } from '@src/helper/hooks/usePermission';
import { EPermissionDaas, PermissionsCodeName } from '@src/types/permissions';
import { Card, Typography } from '@redesignUi/atoms';
// import { BaseInputController } from '@redesignUi/atoms/Inputs/BaseInput/Controller';
// import { useLanguage } from '@context/settings/languageContext';
// import { LoadingSpinner } from '@redesignUi/molecules/Loading';

import { TitleSection } from '@redesignUi/atoms/TitleSection';
import { BaseCheckBoxController } from '@redesignUi/atoms/Inputs/BaseCheckBox/Controller';
import { BaseRadioButtonController } from '@redesignUi/atoms/Inputs/BaseRadioButton/Controller';
import { BaseInputNumberController } from '@redesignUi/atoms/Inputs/BaseInputNumber/Controller';
import PhDownloadSimple from '@iconify-icons/ph/download-simple';
import PhUploadSimple from '@iconify-icons/ph/upload-simple';
import PhTimer from '@iconify-icons/ph/timer';

type PropsType = {
  control: Control<any>;
  // isRecording?: boolean;
  // isMetaConfig?: boolean;
  userPermissions: PermissionsCodeName[];
};

export function DaasSettingForm({ control, userPermissions }: PropsType) {
  const { t } = useTranslation();
  const hasChangePermission = checkPermission(
    userPermissions,
    EPermissionDaas.CHANGE
  );

  return (
    <div className="col-span-6">
      <div className="mb-[5.87rem]">
        <TitleSection label="Daas" />
      </div>
      <div className="w-full h-full flex flex-col">
        <Typography className="mb-1" color="black" variant="body4B">
          {t('table.downloadAndUploadPrivilege')}
        </Typography>

        <div className="grid mt-5">
          <div className="flex col-span-6 lg:col-span-4 gap-[9.18rem]">
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

        <Typography className="mb-1" color="black" variant="body4B">
          {t('table.timeLimitDuration')}
        </Typography>
        <div className="grid w-full grid-cols-12">
          <div className="flex col-span-6 lg:col-span-4 gap-5">
            <Card
              className="flex items-center w-40 h-10 shrink-0 pr-[0.62rem]"
              color="white"
            >
              <BaseRadioButtonController
                control={control}
                id="time_limit_duration"
                name="time_limit_duration"
                value="TEMPORARY"
                label={t('table.temporary')}
              />
            </Card>
            <Card
              className="flex items-center w-40 h-10 shrink-0 pr-[0.62rem]"
              color="white"
            >
              <BaseRadioButtonController
                control={control}
                id="time_limit_duration"
                name="time_limit_duration"
                value="DAILY"
                label={t('table.daily')}
              />
            </Card>
            <Card
              className="flex items-center w-40 h-10 shrink-0 pr-[0.62rem]"
              color="white"
            >
              <BaseRadioButtonController
                control={control}
                id="time_limit_duration"
                name="time_limit_duration"
                value="WEEKLY"
                label={t('table.weekly')}
              />
            </Card>
            <Card
              className="flex items-center w-40 h-10 shrink-0 pr-[0.62rem]"
              color="white"
            >
              <BaseRadioButtonController
                control={control}
                id="time_limit_duration"
                name="time_limit_duration"
                value="MONTHLY"
                label={t('table.monthly')}
              />
            </Card>
            <Card
              className="flex items-center w-40 h-10 shrink-0 pr-[0.62rem]"
              color="white"
            >
              <BaseRadioButtonController
                control={control}
                id="time_limit_duration"
                name="time_limit_duration"
                value="PERMANENTLY"
                label={t('table.permanently')}
              />
            </Card>
          </div>
        </div>
        <Divider />

        <Typography className="mb-1" color="black" variant="body4B">
          {t('table.accessSetting')}
        </Typography>
        <div className="grid w-full grid-cols-12 gap-[1.87rem] mt-5">
          <div className="col-span-6 lg:col-span-4 w-40 md:w-64 lg:w-rem[21.87] h-16">
            <BaseInputNumberController
              id="max_transmission_download_size"
              name="max_transmission_download_size"
              control={control}
              label={t('table.maxDownloadSize')}
              disabled={!hasChangePermission}
              placeholder="50"
              icon={PhDownloadSimple}
              rules={{
                required: regexPattern.required,
                pattern: regexPattern.numbers,
              }}
            />
          </div>
          <div className="col-span-6 lg:col-span-4 w-40 md:w-64 lg:w-rem[21.87] h-16">
            <BaseInputNumberController
              id="max_transmission_upload_size"
              name="max_transmission_upload_size"
              control={control}
              label={t('table.maxUploadSize')}
              disabled={!hasChangePermission}
              placeholder="500"
              icon={PhUploadSimple}
              rules={{
                required: regexPattern.required,
                pattern: regexPattern.numbers,
              }}
            />
          </div>
          <div className="col-span-6 lg:col-span-4 w-40 md:w-64 lg:w-rem[21.87] h-16">
            <BaseInputNumberController
              id="time_limit_value_in_hour"
              name="time_limit_value_in_hour"
              control={control}
              label={t('table.timeLimitDuration')}
              disabled={!hasChangePermission}
              placeholder={t('global.selectHour')}
              icon={PhTimer}
              rules={{
                required: regexPattern.required,
                pattern: regexPattern.numbers,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
