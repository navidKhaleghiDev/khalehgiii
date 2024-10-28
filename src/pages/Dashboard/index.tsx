import { ContainerDashboard } from '@ui/Templates/ContainerDashboard';
import { useUserPermission } from '@src/helper/hooks/usePermission';

import { DashboardCards } from './DashboardCards';
import { DashboardAdminLogs } from './DashboardAdminLogs';
import { DashboardOnlineUsersList } from './DashboardOnlineUsersList';
import { DashboardAdminInfo } from './components/DashboardAdminInfo';
import DashboardCharts from './DashboardCharts';

export function DashboardPage() {
  const userPermissions = useUserPermission();

  return (
    <ContainerDashboard>
      <div className="grid grid-flow-row grid-cols-12 gap-x-[1.875rem] gap-y-5 p-[0.125rem]">
        <DashboardAdminInfo />
        <div className="lg:col-span-5 md:col-span-6 col-span-12 md:order-2 order-3">
          <DashboardAdminLogs permissions={userPermissions ?? []} />
        </div>
        <div className="lg:col-span-4 md:col-span-3 col-span-6 md:order-3 order-2">
          <DashboardCards />
        </div>
        <div className="xl:col-span-8 col-span-12 order-4">
          <DashboardCharts permissions={userPermissions ?? []} />
        </div>
        <div className="xl:col-span-4 xl:block hidden order-5">
          <DashboardOnlineUsersList permissions={userPermissions ?? []} />
        </div>
      </div>
    </ContainerDashboard>
  );
}
