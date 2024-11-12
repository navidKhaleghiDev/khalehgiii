import { Card } from '@redesignUi/atoms';
import {
  EPermissionFileScan,
  EPermissionUba,
  PermissionsCodeName,
} from '@src/types/permissions';
import { checkPermission } from '@src/helper/hooks/usePermission';

import { DashboardProgressChart } from '../DashboardProgressChart';
import { DashboardActiveLicense } from '../components/DashboardActiveLicense';

export function DashboardCharts({
  permissions,
}: {
  permissions: PermissionsCodeName[];
}) {
  return (
    <Card rounded="xxl" shadow="base" className="p-5">
      {checkPermission(permissions, [
        EPermissionFileScan.VIEW,
        EPermissionUba.VIEW,
      ]) ? (
        <DashboardProgressChart />
      ) : null}
      <div>
        <DashboardActiveLicense />
      </div>
    </Card>
  );
}
