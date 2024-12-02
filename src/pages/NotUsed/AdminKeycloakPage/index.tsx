import { ContainerDashboard } from '@ui/Templates/ContainerDashboard';

export function AdminKeycloakPage() {
  //   onClick={() => {
  //   window.open(import.meta.env.VITE_KEY_CLOAK_ADMIN_PANEL, "_blank");
  // }}

  return (
    <ContainerDashboard>
      <iframe
        width="100%"
        height="100%"
        src="http://192.168.2.21:8080/"
        title="Desktop As Service"
      />
    </ContainerDashboard>
  );
}
