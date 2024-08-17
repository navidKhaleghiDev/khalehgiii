import { ContainerDashboard } from '@ui/Templates/ContainerDashboard';
// import { useParams } from 'react-router-dom';

import { BackButton } from '@ui/atoms/BackButton';
import { SessionRecordingList } from './SessionRecordingList';

export function SessionRecording() {
  return (
    <ContainerDashboard>
      <BackButton withLabel className="absolute bottom-20 left-24" />
      <SessionRecordingList />
    </ContainerDashboard>
  );
}
