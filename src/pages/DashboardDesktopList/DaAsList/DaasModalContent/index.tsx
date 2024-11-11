import { Control } from 'react-hook-form';

import { ETimeLimitDuration, IDaAs } from '@src/services/users/types';
import { PermissionsCodeName } from '@src/types/permissions';
import { DlpSettingsForm } from '@ui/utils/DlpSettingsForm';
import { ExtendTwoType } from '@src/types/global';
import { IDaasConfig } from '@src/services/config/types';

import { DownloadAndUploadAccess } from '../components/DownloadAndUploadAccess';
import { TimeOfUseAccess } from '../components/TimeOfUseAccess';
import { MaxSizeAccess } from '../components/MaxSizeAccess';
import { ItemsAccess } from '../components/ItemsAccess';

type PropsType = {
  control: Control<ExtendTwoType<IDaAs, IDaasConfig>>;
  isRecording?: boolean;
  isMetaConfig?: boolean;
  userPermissions: PermissionsCodeName[];
  handleSetDlpValues: (name: keyof IDaAs, values: string[]) => void;
  dlpDownloadList: string[];
  dlpUploadList: string[];
  timeOfUse: ETimeLimitDuration;
};

export function DaasModalContent({
  control,
  isRecording,
  userPermissions,
  isMetaConfig,
  handleSetDlpValues,
  dlpDownloadList,
  dlpUploadList,
  timeOfUse,
}: PropsType) {
  return (
    <div className="max-h-[35.375rem] overflow-y-auto overflow-x-hidden col-span-6 grid grid-cols-6 rtl:pl-5 rtl:pr-3 ltr:pr-5 ltr:pl-3">
      <DownloadAndUploadAccess control={control} />

      <TimeOfUseAccess control={control} />

      <MaxSizeAccess control={control} timeOfUse={timeOfUse} />

      <DlpSettingsForm
        handleSetDlpValues={handleSetDlpValues}
        dlpDownloadList={dlpDownloadList}
        dlpUploadList={dlpUploadList}
        userPermissions={userPermissions}
      />

      <ItemsAccess
        control={control}
        isMetaConfig={isMetaConfig}
        isRecording={isRecording}
      />
    </div>
  );
}
