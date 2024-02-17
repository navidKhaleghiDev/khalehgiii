import { ContainerDashboard } from '@ui/Templates/ContainerDashboard';

import { BackButton } from '@ui/atoms/BackButton';
import { UbaAsList } from './UbaAsList';

export function UbaPage() {
  return (
    <ContainerDashboard>
      <BackButton withLabel className="absolute bottom-20 left-24" />
      <UbaAsList />
    </ContainerDashboard>
  );
}
