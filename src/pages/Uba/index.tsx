import { ContainerDashboard } from '@ui/Templates/ContainerDashboard';

import { UbaAsList } from './UbaAsList';
import { BackButton } from '@ui/atoms/BackButton';

export function UbaPage() {
  return (
    <ContainerDashboard>
      <BackButton withLabel className="absolute bottom-20 left-24" />
      <UbaAsList />
    </ContainerDashboard>
  );
}
