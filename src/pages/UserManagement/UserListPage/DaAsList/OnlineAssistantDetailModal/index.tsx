import { useTranslation } from 'react-i18next';

import { DaAsParams } from '@src/services/users/types';
import { Divider } from '@ui/atoms/Divider';
import { NoResult } from '@ui/molecules/NoResult';

import OnlineAssistanceDetail from './OnlineAssistanceDetail';

type OnlineAssistanceDetailModalProps = {
  daas: DaAsParams;
};

export function OnlineAssistanceDetailModal({
  daas,
}: OnlineAssistanceDetailModalProps) {
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
    <div className="w-full">
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
