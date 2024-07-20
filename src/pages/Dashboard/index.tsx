import { useUserContext } from '@context/user/userContext';

import { AdminPanel } from './AdminPanel';
import { UserPanel } from './UserPanel';

export function DashboardPage() {
  const { user } = useUserContext();

  return user && !user?.is_superuser ? (
    <UserPanel user={user} />
  ) : (
    <AdminPanel userExist={!!user} />
  );
}
