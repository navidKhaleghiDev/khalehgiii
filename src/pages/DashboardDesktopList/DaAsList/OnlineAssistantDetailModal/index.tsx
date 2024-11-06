import { useTranslation } from 'react-i18next';
import { IDaAs } from '@src/services/users/types';
import { Divider } from '@redesignUi/atoms/Divider';

import OnlineAssistanceDetail from './OnlineAssistanceDetail';

type TOnlineAssistanceDetailModalProps = {
  daas: IDaAs;
};

export function OnlineAssistanceDetailModal({
  daas,
}: TOnlineAssistanceDetailModalProps) {
  const { t } = useTranslation();

  const { member_of: members, admin_group_of: admins } = daas;

  return (
    <div className="w-full h-96 overflow-auto ">
      <OnlineAssistanceDetail
        title={t('userList.groupAdmin')}
        description={t('userList.assistanceAdminTitle')}
        data={admins}
      />
      {admins.length !== 0 && members.length > 0 && <Divider />}

      <OnlineAssistanceDetail
        title={t('userList.groupMember')}
        description={t('userList.assistanceMemberTitle')}
        data={members}
      />
    </div>
  );
}
