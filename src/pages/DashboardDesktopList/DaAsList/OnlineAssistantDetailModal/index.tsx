import { useTranslation } from 'react-i18next';

import { IDaAs } from '@src/services/users/types';
import { Divider } from '@redesignUi/atoms/Divider';
import { NoResult } from '@redesignUi/molecules/NoResult';

import OnlineAssistanceDetail from './OnlineAssistanceDetail';

type TOnlineAssistanceDetailModalProps = {
  daas: IDaAs;
};

export function OnlineAssistanceDetailModal({
  daas,
}: TOnlineAssistanceDetailModalProps) {
  const { t } = useTranslation();

  const { member_of: members, admin_group_of: admins } = daas;

  if (admins.length === 0 && members.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <NoResult />
      </div>
    );
  }

  return (
    <div className="w-full h-96 overflow-auto">
      {admins.length !== 0 ? (
        <OnlineAssistanceDetail
          title={t('userList.groupAdmin')}
          description={t('userList.assistanceAdminTitle')}
          data={admins}
        />
      ) : null}

      {admins.length > 0 && members.length > 0 && <Divider />}
      {members.length !== 0 ? (
        <OnlineAssistanceDetail
          title={t('userList.groupMember')}
          description={t('userList.assistanceMemberTitle')}
          data={members}
        />
      ) : null}
    </div>
  );
}
