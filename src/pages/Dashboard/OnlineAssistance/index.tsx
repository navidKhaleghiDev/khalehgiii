import { ContainerDashboard } from '@ui/Templates/ContainerDashboard';
import { BackButton } from '@ui/atoms/BackButton';

import { OnlineAssistanceList } from './OnlineAssistanceList';

export function OnlineAssistance() {
  return (
    <ContainerDashboard>
      <BackButton withLabel className="absolute bottom-20 left-24" />
      <OnlineAssistanceList />
    </ContainerDashboard>
  );
}
