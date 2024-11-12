import { Control } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Typography } from '@redesignUi/atoms';
import { BaseSwitchController } from '@redesignUi/atoms/BaseSwitch/Controller';

type ItemsAccessProps = {
  isRecording?: boolean;
  isMetaConfig?: boolean;
  control: Control<any>;
};
export function ItemsAccess(props: ItemsAccessProps) {
  const { isMetaConfig, isRecording, control } = props;
  const { t } = useTranslation();
  return (
    <div className="flex flex-col w-full col-span-6 pt-4 mt-4 border-t border-t-gray-300 gap-y-3">
      {isRecording && (
        <div className="flex justify-between">
          <div className="rtl:text-right ltr:text-left">
            <Typography variant="body5B" color="neutralDark">
              {t('userList.sessionRecording')}
            </Typography>
            <Typography variant="body6" color="neutral">
              {t('userList.thePossibilityOfRecordingtheDesktopByTheUser')}
            </Typography>
          </div>
          <div>
            <BaseSwitchController
              id="is_recording"
              control={control}
              name="is_recording"
            />
          </div>
        </div>
      )}
      {!isMetaConfig && (
        <>
          <div className="flex justify-between">
            <div className="rtl:text-right ltr:text-left">
              <Typography variant="body5B" color="neutralDark">
                {t('userList.clipboard')}
              </Typography>
              <Typography variant="body6" color="neutral">
                {t('userList.thePossibilityOfUsingTexts')}
              </Typography>
            </div>
            <div>
              <BaseSwitchController
                id="has_clipboard_access"
                control={control}
                name="has_clipboard_access"
              />
            </div>
          </div>
          <div className="flex justify-between">
            <div className="rtl:text-right ltr:text-left">
              <Typography variant="body5B" color="neutralDark">
                {t('userList.evidence')}
              </Typography>
              <Typography variant="body6" color="neutral">
                {t(
                  'userList.abilityToDownloadFilesUploadedOrDownloadedByTheUser'
                )}
              </Typography>
            </div>
            <div>
              <BaseSwitchController
                id="has_evidence_gathering"
                control={control}
                name="has_evidence_gathering"
              />
            </div>
          </div>
          <div className="flex justify-between">
            <div className="rtl:text-right ltr:text-left">
              <Typography variant="body5B" color="neutralDark">
                {t('userList.conference')}
              </Typography>
              <Typography variant="body6" color="neutral">
                {t('userList.accessToWebcamAndMicrophone')}
              </Typography>
            </div>
            <div>
              <BaseSwitchController
                id="chatroom_privileged"
                control={control}
                name="chatroom_privileged"
              />
            </div>
          </div>
          <div className="flex justify-between">
            <div className="rtl:text-right ltr:text-left">
              <Typography variant="body5B" color="neutralDark">
                {t('global.onlineAssistance')}
              </Typography>
              <Typography variant="body6" color="neutral">
                {t('userList.accessToTheUsersDesktopOnline')}
              </Typography>
            </div>
            <div>
              <BaseSwitchController
                id="has_online_assistance"
                control={control}
                name="has_online_assistance"
              />
            </div>
          </div>
          <div className="flex justify-between">
            <div className="rtl:text-right ltr:text-left">
              <Typography variant="body5B" color="neutralDark">
                {t('userList.clipboardLog')}
              </Typography>
              <Typography variant="body6" color="neutral">
                {t('userList.reportOfTextTransferredViaClipboard')}
              </Typography>
            </div>
            <div>
              <BaseSwitchController
                id="has_clipboard_log"
                control={control}
                name="has_clipboard_log"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
