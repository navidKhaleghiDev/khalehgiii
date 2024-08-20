import { IDaAs } from '@src/services/users/types';
import { useTranslation } from 'react-i18next';
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
    <div className="w-full  grid grid-cols-2 gap-8 p-4 h-96 overflow-auto ">
      <OnlineAssistanceDetail
        title={t('onlineAssistance.admins')}
        data={admins}
      />
      <OnlineAssistanceDetail
        title={t('onlineAssistance.members')}
        data={members}
      />
    </div>
  );
}
