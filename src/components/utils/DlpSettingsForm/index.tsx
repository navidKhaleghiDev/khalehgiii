import { IDaAs } from '@src/services/users/types';
import { useTranslation } from 'react-i18next';
import {
  EPermissionWhiteListFiles,
  PermissionsCodeName,
} from '@src/types/permissions';
import { checkPermission } from '@src/helper/hooks/usePermission';

import { DlpList } from './DlpList';

type PropsType = {
  handleSetDlpValues: (name: keyof IDaAs, values: string[]) => void;
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
    EPermissionWhiteListFiles.VIEW
  );
  return (
    hasViewPermission && (
      <>
        <div className="px-2 col-span-3">
          <DlpList
            name="allowed_files_type_for_download"
            valueList={dlpDownloadList}
            onChange={handleSetDlpValues}
            label={t('table.trustedDownloadFormat')}
            userPermissions={userPermissions}
          />
        </div>
        <div className="px-2 col-span-3">
          <DlpList
            name="allowed_files_type_for_upload"
            valueList={dlpUploadList}
            onChange={handleSetDlpValues}
            label={t('table.trustedUploadFormat')}
            userPermissions={userPermissions}
          />
        </div>
      </>
    )
  );
}
