import { useTranslation } from 'react-i18next';

import { Typography } from '@ui/atoms';
import { BaseCheckBoxController } from '@ui/atoms/Inputs/BaseCheckBox/Controller';
import { Divider } from '@ui/atoms/Divider';

import { AccessSeting } from './components/AccessSeting';
import { ResourceLimitation } from './components/ResourceLimitation';
import { TimeLimitation } from './components/TimeLimitation';
import { PropsType } from '../../type';
import { TitleSection } from '../../component/TitleSection';

export function DaasSettingForm({
  control,
  userPermissions,
  timeOfUse,
}: PropsType) {
  const { t } = useTranslation();

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

        <TimeLimitation control={control} userPermissions={userPermissions} />
        <Divider />

        <AccessSeting
          control={control}
          userPermissions={userPermissions}
          timeOfUse={timeOfUse}
        />
        <Divider />
        <ResourceLimitation
          control={control}
          userPermissions={userPermissions}
        />
      </div>
    </div>
  );
}
