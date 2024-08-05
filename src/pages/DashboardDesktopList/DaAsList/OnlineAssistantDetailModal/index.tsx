import { IDaAs } from '@src/services/users/types';
import { Typography } from '@ui/atoms';
import { useTranslation } from 'react-i18next';

type TOnlineAssistanceDetailModalProps = {
  daas: IDaAs;
};

export function OnlineAssistanceDetailModal({
  daas,
}: TOnlineAssistanceDetailModalProps) {
  const { t } = useTranslation();

  const { member_of: members, admin_group_of: admins } = daas;

  return (
    <div className="w-full h-full grid grid-cols-2 gap-8 p-4" dir="rtl">
      <div className="admin-section">
        <Typography variant="body4" className="section-title">
          {t('onlineAssistance.admins')}
        </Typography>
        <div className="group-list">
          {Array.isArray(admins) &&
            admins.map((adminGroup) => (
              <div
                className="group-item bg-yellow-400 p-2 my-2 rounded"
                key={adminGroup}
              >
                {Object.keys(adminGroup)}
              </div>
            ))}
        </div>
      </div>
      <div className="member-section">
        <Typography variant="body4" className="section-title">
          {t('onlineAssistance.members')}
        </Typography>
        <div className="group-list">
          {Array.isArray(members) &&
            members.map((memberGroup) => (
              <div
                className="group-item bg-red-500 p-2 my-2 rounded"
                key={memberGroup}
              >
                {Object.keys(memberGroup)}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
