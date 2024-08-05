// import {
//   checkPermission,
//   useUserPermission,
// } from '@src/helper/hooks/usePermission';
// import {
//   EPermissionDaas,
//   EPermissionMalwareConfig,
// } from '@src/types/permissions';
// import { dateAndNumber, dayLabel } from '@src/helper/utils/dateUtils';
// import { Typography } from '@ui/atoms';

export function HeadOnlineAssistant() {
  // const userPermissions = useUserPermission();

  // const viewDaasPermission = checkPermission(
  //   userPermissions,
  //   EPermissionDaas.VIEW
  // );

  // const viewMalwarePermission = checkPermission(
  //   userPermissions,
  //   EPermissionMalwareConfig.VIEW
  // );

  return (
    <div className="w-52 text-sm shadow-md rounded-lg h-7 px-2 flex items-center bg-white dark:inset-0 dark:bg-cover dark:bg-blur dark:bg-opacity-20 gap-2">
      <span className="font-bold  truncate">هومن رادمهر</span>
      <span className="mr-auto truncate">زمان استفاده از دسکتاپ</span>
      <span>12:12</span>
    </div>
  );
}
