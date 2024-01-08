import { ContainerDashboard } from '@ui/Templates/ContainerDashboard';
import { useUserContext } from '@context/user/userContext';
import { BackButton } from '@ui/atoms/BackButton';

import { AdminsList } from './AdminsList';
import { NotificationCard } from '@ui/atoms';

export function DashboardAdminsListPage() {
  const { user } = useUserContext();

  return (
    <ContainerDashboard>
      <BackButton withLabel className="absolute bottom-20 left-24" />
      {user?.is_meta_admin ? (
        <AdminsList />
      ) : (
        <NotificationCard title="شما به این بخش دسترسی ندارید." type="error" />
      )}
    </ContainerDashboard>
  );
}
