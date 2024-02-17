import { ContainerDashboard } from '@ui/Templates/ContainerDashboard';

import { BackButton } from '@ui/atoms/BackButton';
import { UsersDaAsList } from './UsersDaAsList';

export function DashboardMonitoring() {
  return (
    <ContainerDashboard>
      <BackButton withLabel className="absolute bottom-20 left-24" />
      <UsersDaAsList />
    </ContainerDashboard>
  );
}
