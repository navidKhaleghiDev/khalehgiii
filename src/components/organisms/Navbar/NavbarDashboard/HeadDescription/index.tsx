import {
  checkPermission,
  useUserPermission,
} from '@src/helper/hooks/usePermission';
import {
  EPermissionDaas,
  EPermissionMalwareConfig,
} from '@src/types/permissions';
import { dateAndNumber, dayLabel } from '@src/helper/utils/dateUtils';
import { Typography } from '@ui/atoms';

import { UserAnalyzeInfo } from './UserAnalyzeInfo';
import { UserDaasInfo } from './UserDaasInfo';

export function HeadDescription() {
  const userPermissions = useUserPermission();

  const viewDaasPermission = checkPermission(
    userPermissions,
    EPermissionDaas.ADD
  );

  const viewMalwarePermission = checkPermission(
    userPermissions,
    EPermissionMalwareConfig.VIEW
  );
  return (
    <div className=" shadow-md rounded-lg h-7 px-2 flex justify-center items-center bg-white dark:inset-0 dark:bg-cover dark:bg-blur dark:bg-opacity-20 ">
      <Typography color="teal" className=" px-2 ">
        {`${dayLabel()}  ${dateAndNumber()}  `}
      </Typography>
      {viewMalwarePermission ? <UserAnalyzeInfo /> : null}
      {viewDaasPermission ? <UserDaasInfo /> : null}
    </div>
  );
}
