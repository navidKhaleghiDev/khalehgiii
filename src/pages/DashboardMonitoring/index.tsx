import { ContainerDashboard } from '@ui/Templates/ContainerDashboard';

import { UsersDaAsList } from './UsersDaAsList';
import { BackButton } from '@ui/atoms/BackButton';

export function DashboardMonitoring() {
  return (
    <ContainerDashboard>
      <BackButton withLabel className="absolute bottom-20 left-24" />
      <UsersDaAsList />
    </ContainerDashboard>
  );
}
