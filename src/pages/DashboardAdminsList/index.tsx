import { ContainerDashboard } from '@ui/Templates/ContainerDashboard';
import { BackButton } from '@ui/atoms/BackButton';

import { AdminsList } from './AdminsList';

export function DashboardAdminsListPage() {
  return (
    <ContainerDashboard>
      <BackButton withLabel className="absolute bottom-20 left-24" />
      <AdminsList />
    </ContainerDashboard>
  );
}
