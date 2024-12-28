import { Card } from '@ui/atoms';
import {
  PermissionFileScan,
  PermissionUba,
  PermissionsCodeName,
} from '@src/types/permissions';
import { checkPermission } from '@src/helper/hooks/usePermission';

import { DashboardProgressChart } from '../DashboardProgressChart';
import { DashboardActiveLicense } from '../DashboardActiveLicense';

export function DashboardCharts({
  permissions,
}: {
  permissions: PermissionsCodeName[];
}) {
  return (
    <div className="xl:col-span-8 col-span-12 order-4">
      <Card rounded="xxl" shadow="base" className="p-5">
        {checkPermission(permissions, [
          PermissionFileScan.VIEW,
          PermissionUba.VIEW,
        ]) ? (
          <DashboardProgressChart />
        ) : null}
        <div>
          <DashboardActiveLicense />
        </div>
      </Card>
    </div>
  );
}
