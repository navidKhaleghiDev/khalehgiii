import { ContainerDashboard } from '@ui/Templates/ContainerDashboard';
import { useUserContext } from '@context/user/userContext';
import { BackButton } from '@ui/atoms/BackButton';

import { NotificationCard } from '@ui/atoms';
import { useTranslation } from 'react-i18next';
import { AdminsList } from './AdminsList';

export function DashboardAdminsListPage() {
  const { user } = useUserContext();
  const { t } = useTranslation();

  return (
    <ContainerDashboard>
      <BackButton withLabel className="absolute bottom-20 left-24" />
      {user?.is_meta_admin ? (
        <AdminsList />
      ) : (
        <NotificationCard title={t('global.dontHaveAccess')} type="error" />
      )}
    </ContainerDashboard>
  );
}
