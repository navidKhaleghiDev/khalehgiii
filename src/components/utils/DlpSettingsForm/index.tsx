import { useTranslation } from 'react-i18next';

import { DaAsParams } from '@src/services/users/types';
import {
  PermissionWhiteListFiles,
  PermissionsCodeName,
} from '@src/types/permissions';
import { checkPermission } from '@src/helper/hooks/usePermission';
import { Typography } from '@redesignUi/atoms';

import { DlpList } from './DlpList';

type PropsType = {
  handleSetDlpValues: (
    name: keyof DaAsParams,
    values: { [key: string]: number }
  ) => void;
  dlpDownloadList: any;
  dlpUploadList: any;
  userPermissions: PermissionsCodeName[];
};

export function DlpSettingsForm({
  handleSetDlpValues,
  dlpDownloadList,
  dlpUploadList,
  userPermissions,
}: PropsType) {
  const { t } = useTranslation();
  const hasViewPermission = checkPermission(
    userPermissions,
    PermissionWhiteListFiles.VIEW
  );
  return (
    hasViewPermission && (
      <div className="w-full col-span-6 grid grid-cols-2 gap-5 pt-4 mt-4 border-t border-t-gray-300">
        <Typography
          className="col-span-2 text-start"
          variant="body6"
          color="neutralDark"
        >
          {t('userList.formInstruction')}
        </Typography>
        <div className="col-span-2">
          <DlpList
            name="allowed_files_type_for_download"
            valueList={dlpDownloadList}
            onChange={handleSetDlpValues}
            label={t('table.trustedDownloadFormat')}
            userPermissions={userPermissions}
          />
        </div>
        <div className="sm:col-span-2 col-span-2">
          <DlpList
            name="allowed_files_type_for_upload"
            valueList={dlpUploadList}
            onChange={handleSetDlpValues}
            label={t('table.trustedUploadFormat')}
            userPermissions={userPermissions}
          />
        </div>
      </div>
    )
  );
}
