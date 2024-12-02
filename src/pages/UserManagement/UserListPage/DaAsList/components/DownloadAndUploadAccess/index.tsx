import { Control } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Typography } from '@redesignUi/atoms';
import { BaseSwitchController } from '@redesignUi/atoms/BaseSwitch/Controller';

export function DownloadAndUploadAccess({
  control,
}: {
  control: Control<any>;
}) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col w-full col-span-6">
      <div className="flex flex-row w-full justify-between pb-1.5 mb-1.5 border-b border-b-gray-100">
        <div className="rtl:text-right ltr:text-left">
          <Typography variant="body5B" color="neutralDark" className="pb-1">
            {t('global.download')}
          </Typography>
          <Typography variant="body6" color="neutral">
            {t(
              'userList.byActivitingThisSectionyouAllowTheUserToDownloadFiles'
            )}
          </Typography>
        </div>
        <div>
          <BaseSwitchController
            id="can_download_file"
            control={control}
            name="can_download_file"
          />
        </div>
      </div>
      <div className="flex flex-row w-full justify-between">
        <div className="rtl:text-right ltr:text-left">
          <Typography variant="body5B" color="neutralDark" className="pb-1">
            {t('global.upload')}
          </Typography>
          <Typography variant="body6" color="neutral">
            {t('userList.byActivitingThisSectionYouAllowTheUserToUploadFiles')}
          </Typography>
        </div>
        <div>
          <BaseSwitchController
            id="can_upload_file"
            control={control}
            name="can_upload_file"
          />
        </div>
      </div>
    </div>
  );
}
