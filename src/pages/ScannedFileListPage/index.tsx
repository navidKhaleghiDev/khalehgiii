import { ContainerDashboard } from '@ui/Templates/ContainerDashboard';

import { BackButton } from '@ui/atoms/BackButton';
import { ScannedFileList } from './ScannedFileList';

export function ScannedFileListPage() {
  return (
    <ContainerDashboard>
      <BackButton withLabel className="absolute bottom-20 left-24" />
      <ScannedFileList />
    </ContainerDashboard>
  );
}
