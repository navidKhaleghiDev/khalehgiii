import { ContainerDashboard } from '@ui/Templates/ContainerDashboard';
import { BackButton } from '@ui/atoms/BackButton';

import { KnowledgeManagementList } from './KnowledgeManagementList';

export function KnowledgeManagement() {
  return (
    <ContainerDashboard>
      <BackButton withLabel className="absolute bottom-20 left-24" />
      <KnowledgeManagementList />
    </ContainerDashboard>
  );
}
