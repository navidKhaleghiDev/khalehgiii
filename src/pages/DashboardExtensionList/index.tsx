import { ContainerDashboard } from '@ui/Templates/ContainerDashboard';
import { BackButton } from '@ui/atoms/BackButton';

import { ExtensionList } from './ExtensionList';

export function DashboardExtensionListPage() {
  return (
    <ContainerDashboard>
      <BackButton withLabel className="absolute bottom-20 left-24" />
      <ExtensionList />
    </ContainerDashboard>
  );
}
