import { useUserContext } from '@context/user/userContext';

import { AdminPanel } from './AdminPanel';

export function DashboardPage() {
  const { user } = useUserContext();

  return <AdminPanel userExist={!!user} />;
}
