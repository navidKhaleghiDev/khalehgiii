import { ContainerDashboard } from '@ui/Templates/ContainerDashboard';

import { ScannedFileList } from './ScannedFileList';
import { BackButton } from '@ui/atoms/BackButton';

export function ScannedFileListPage() {
  return (
    <ContainerDashboard>
      <BackButton withLabel className="absolute bottom-20 left-24" />
      <ScannedFileList />
    </ContainerDashboard>
  );
}
