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
      <div className="lg:col-span-5 md:col-span-6 col-span-12 md:order-2 order-3">
        <DashboardAdminLogs permissions={userPermissions ?? []} />
      </div>
      <div className="lg:col-span-4 md:col-span-3 col-span-6 md:order-3 order-2">
        <DashboardCards />
      </div>
      <div className="xl:col-span-8 col-span-12 order-4">
        <DashboardCharts permissions={userPermissions ?? []} />
      </div>
      {width > 1279 ? (
        <div className="xl:col-span-4 flex order-5 max-h-[36.375rem]">
          <DashboardOnlineUsersList permissions={userPermissions ?? []} />
        </div>
      ) : null}
    </div>
  );
}
