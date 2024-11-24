import { useTranslation } from 'react-i18next';

import { Card, Typography } from '@redesignUi/atoms';
import { BaseCheckBoxController } from '@redesignUi/atoms/Inputs/BaseCheckBox/Controller';
import { BaseRadioButtonController } from '@redesignUi/atoms/Inputs/BaseRadioButton/Controller';
import { Divider } from '@redesignUi/atoms/Divider';

import { AccessSeting } from './components/AccessSeting';
import { PropsType } from '../../type';
import { TitleSection } from '../../component/TitleSection';
import { ResourceLimitation } from './components/ResourceLimitation';

export function DaasSettingForm({
  control,
  userPermissions,
  isActive,
  timeOfUse,
}: PropsType) {
  const { t } = useTranslation();

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
