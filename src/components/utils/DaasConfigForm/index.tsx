import { Control } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { timeLimitDurationOptions } from '@src/pages/DashboardDesktopList/DaAsList/components/DaAsCard/SetAccessTime';
import { EPermissionDaas, PermissionsCodeName } from '@src/types/permissions';
import { checkPermission } from '@src/helper/hooks/usePermission';
import { Typography } from '@redesignUi/atoms';
import { BaseSwitchController } from '@redesignUi/atoms/BaseSwitch/Controller';
import { Dropdown } from '@ui/atoms/DropDown';
import { regexPattern } from '@redesignUi/atoms/Inputs';
import { BaseInputController } from '@redesignUi/atoms/Inputs/BaseInput/Controller';

type PropsType = {
  control: Control<any>;
  isRecording?: boolean;
  isMetaConfig?: boolean;
  userPermissions: PermissionsCodeName[];
};

export function DaasConfigForm({
  control,
  isRecording,
  userPermissions,
  isMetaConfig,
}: PropsType) {
  const { t } = useTranslation();

  const hasChangePermission = checkPermission(
    userPermissions,
    EPermissionDaas.CHANGE
  );

  return (
    <>
      <div className="flex justify-between items-center px-2 col-span-3">
        <Typography className="mb-1">{t('table.downloadPrivilege')}</Typography>
        <BaseSwitchController
          id="can_download_file"
          control={control}
          name="can_download_file"
        />
      </div>

      <div className="flex justify-between items-center px-2 col-span-3">
        <Typography className="mb-1">{t('table.uploadPrivilege')}</Typography>
        <BaseSwitchController
          id="can_upload_file"
          control={control}
          name="can_upload_file"
        />
      </div>

      {!isMetaConfig && (
        <>
          <div className="flex justify-between items-center px-2 col-span-3">
            <Typography className="mb-1">
              {t('table.AccessConference')}
            </Typography>
            <BaseSwitchController
              id="chatroom_privileged"
              control={control}
              name="chatroom_privileged"
            />
          </div>

          <div className="flex justify-between items-center px-2 col-span-3">
            <Typography className="mb-1">
              {t('global.onlineAssistance')}
            </Typography>
            <BaseSwitchController
              id="has_online_assistance"
              control={control}
              name="has_online_assistance"
            />
          </div>
          <div className="flex justify-between items-center px-2 col-span-3">
            <Typography className="mb-1">
              {t('global.evidenceGathering')}
            </Typography>
            <BaseSwitchController
              id="has_evidence_gathering"
              control={control}
              name="has_evidence_gathering"
            />
          </div>
          <div className="flex justify-between items-center px-2 col-span-3">
            <Typography className="mb-1">
              {t('global.clipboardAccess')}
            </Typography>
            <BaseSwitchController
              id="has_clipboard_access"
              control={control}
              name="has_clipboard_access"
            />
          </div>
          <div className="flex justify-between items-center px-2 col-span-3">
            <Typography className="mb-1">{t('global.clipboardLog')}</Typography>
            <BaseSwitchController
              id="has_clipboard_log"
              control={control}
              name="has_clipboard_log"
            />
          </div>
        </>
      )}

      {isRecording && (
        <div className="flex justify-between items-center px-2 col-span-3">
          <Typography className="mb-1">
            {t('table.sessionRecording')}
          </Typography>
          <BaseSwitchController
            id="is_recording"
            control={control}
            name="is_recording"
          />
        </div>
      )}
      <div className="px-2 col-span-3 ">
        <Typography className="mb-1">{t('table.timeLimitDuration')}</Typography>
        <Dropdown
          control={control}
          id="time_limit_duration"
          name="time_limit_duration"
          options={timeLimitDurationOptions}
          placeHolder={t('global.select')}
          containerClassName="col-span-6 xl:col-span-3"
          rules={{
            required: regexPattern.required,
          }}
          disabled={!hasChangePermission}
          fullWidth
          hiddenError
        />
      </div>

      <div className="px-2 col-span-3 ">
        <Typography className="mb-1">
          {t('table.timeLimitValueInHour')}
        </Typography>
        <BaseInputController
          control={control}
          // size="xs"
          id="time_limit_value_in_hour"
          name="time_limit_value_in_hour"
          placeholder={t('global.selectHour')}
          className="col-span-6 lg:col-span-4"
          rules={{
            pattern: regexPattern.numbers,
          }}
          type="number"
          disabled={!hasChangePermission}
          fullWidth
          hiddenError
        />
      </div>
      <div className="px-2 col-span-3  ">
        <Typography className="mb-1">{t('table.maxDownloadSize')}</Typography>
        <BaseInputController
          control={control}
          name="max_transmission_download_size"
          id="max_transmission_download_size"
          type="number"
          disabled={!hasChangePermission}
          hiddenError
          fullWidth
        />
      </div>
      <div className="px-2 col-span-3 ">
        <Typography className="mb-1">{t('table.maxUploadSize')}</Typography>
        <BaseInputController
          control={control}
          name="max_transmission_upload_size"
          id="max_transmission_upload_size"
          type="number"
          disabled={!hasChangePermission}
          hiddenError
          fullWidth
        />
      </div>
    </>
  );
}
