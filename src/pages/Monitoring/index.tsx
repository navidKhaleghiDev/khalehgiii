import { ContainerDashboard } from '@ui/Templates/ContainerDashboard';

import { BackButton } from '@ui/atoms/BackButton';

export function MonitoringPage() {
  return (
    <ContainerDashboard>
      <BackButton withLabel className="absolute bottom-20 left-24" />
      <iframe
        width="100%"
        height="100%"
        src={import.meta.env.VITE_MONITORING_SRC}
        title="Monitoring"
      />
    </ContainerDashboard>
  );
}
