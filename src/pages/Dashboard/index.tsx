import { useUserPermission } from '@src/helper/hooks/usePermission';
import { useWindowDimensions } from '@src/helper/hooks/useWindowDimensions';

import { DashboardCards } from './components/DashboardCards';
import { DashboardAdminLogs } from './components/DashboardAdminLogs';
import { DashboardOnlineUsersList } from './components/DashboardOnlineUsersList';
import { DashboardAdminInfo } from './components/DashboardAdminInfo';
import { DashboardCharts } from './components/DashboardCharts';

export function DashboardPage() {
  const userPermissions = useUserPermission();
  const { width } = useWindowDimensions();

  return (
    <div className="grid grid-flow-row grid-cols-12 gap-x-[1.875rem] gap-y-5 p-[0.125rem]">
      <DashboardAdminInfo permissions={userPermissions ?? []} />

      <DashboardAdminLogs permissions={userPermissions ?? []} />

      <DashboardCards />

      <DashboardCharts permissions={userPermissions ?? []} />

      {width > 1279 ? (
        <DashboardOnlineUsersList permissions={userPermissions ?? []} />
      ) : null}
    </div>
  );
}
