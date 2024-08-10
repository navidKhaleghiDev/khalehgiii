import { useUserContext } from '@context/user/userContext';

import { AdminPanel } from './AdminPanel';
import { UserPanel } from './UserPanel';

export function DashboardPage() {
  const { user } = useUserContext();

  return user && (!user?.is_superuser || user?.online_assistance?.user) ? (
    <UserPanel user={user} />
  ) : (
    <AdminPanel userExist={!!user} />
  );
}
