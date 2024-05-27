import { IDaAs } from '@src/services/users/types';
import { useTranslation } from 'react-i18next';
import { DlpList } from './DlpList';

type PropsType = {
  handleSetDlpValues: (name: keyof IDaAs, values: string[]) => void;
  dlpDownloadList: any;
  dlpUploadList: any;
};

export function DlpSettingsForm({
  handleSetDlpValues,
  dlpDownloadList,
  dlpUploadList,
}: PropsType) {
  const { t } = useTranslation();
  return (
    <>
      <div className="px-2 col-span-3">
        <DlpList
          name="allowed_files_type_for_download"
          valueList={dlpDownloadList}
          onChange={handleSetDlpValues}
          label={t('table.trustedDownloadFormat')}
        />
      </div>
      <div className="px-2 col-span-3">
        <DlpList
          name="allowed_files_type_for_upload"
          valueList={dlpUploadList}
          onChange={handleSetDlpValues}
          label={t('table.trustedUploadFormat')}
        />
      </div>
    </>
  );
}
