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
import userGearIcon from '@iconify-icons/ph/user-gear';
import timerIcon from '@iconify-icons/ph/timer';
// import useWebSocket from 'react-use-websocket';

import { OnlineAssistantCard } from '@ui/organisms/Navbar/NavbarDashboard/HeadOnlineAssistant/OnlineAssistantCard';

export function HeadOnlineAssistantUser() {
  // const userPermissions = useUserPermission();

  // const viewDaasPermission = checkPermission(
  //   userPermissions,
  //   EPermissionDaas.VIEW
  // );

  // const viewMalwarePermission = checkPermission(
  //   userPermissions,
  //   EPermissionMalwareConfig.VIEW
  // );

  // const { lastMessage, readyState } = useWebSocket(
  //   socketData.url,
  //   {},
  //   socketData.isOpen
  // );

  return (
    <div className="w-52 text-sm shadow-md rounded-lg h-7 px-2 flex items-center bg-white dark:inset-0 dark:bg-cover dark:bg-blur dark:bg-opacity-20 gap-2">
      <OnlineAssistantCard
        icon={userGearIcon}
        title="ادمین"
        description="محمد جواد عیوضی"
      />
      <OnlineAssistantCard
        icon={timerIcon}
        title="زمان"
        description="زمان استفاده از دسکتاپ"
      />
    </div>
  );
}
