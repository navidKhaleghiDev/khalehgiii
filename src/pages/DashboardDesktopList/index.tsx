import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';

import Lock from '@iconify-icons/ph/lock-laminated';
import Wifi from '@iconify-icons/ph/wifi-high-duotone';
import Users from '@iconify-icons/ph/user';

import { IResponsePagination } from '@src/types/services';
import { IDaAs } from '@src/services/users/types';
import { E_USERS_DAAS } from '@src/services/users/endpoint';
import { http } from '@src/services/http';
import { Typography } from '@redesignUi/atoms';
import { UsersInfoCard } from '@redesignUi/molecules/Cards/UsersInfoCard';

import { DaAsList } from './DaAsList';

export function DashboardDesktopListPage() {
  const [showLockedUsers, setShowLockedUsers] = useState<boolean>(false);
  const [showOnlineUsers, setShowOnlineUsers] = useState<boolean>(false);

  const { t } = useTranslation();
  const { data: userData } = useSWR<IResponsePagination<IDaAs>>(
    E_USERS_DAAS,
    http.fetcherSWR
  );

  const {
    online_users: onlineUsers = undefined,
    count: allUsers = undefined,
    results = [],
  } = userData?.data || {};

  const lockedUsersCount = results.filter((user) => user.is_lock).length;

  const resetFilters = () => {
    setShowOnlineUsers(false);
    setShowLockedUsers(false);
  };
  let typographyText = t('userList.usersList');
  if (showLockedUsers) typographyText = t('userList.blockedUsers');
  else if (showOnlineUsers) typographyText = t('userList.onlineUsers');

  return (
    <div className="flex flex-col sm:gap-[1.87rem] gap-5">
      <Typography variant="body2B" color="black">
        {typographyText}
      </Typography>
      <div className="flex items-center justify-center sm:self-auto self-center gap-[1.87rem] w-full lg:mb-[6.25rem] mb-2.5">
        <UsersInfoCard
          onClick={resetFilters}
          icon={Users}
          title={t('groupManagement.users')}
          count={allUsers}
          className="whitespace-nowrap"
          iconColor="neutral"
        />
        <UsersInfoCard
          onClick={() => {
            resetFilters();
            setShowOnlineUsers(true);
          }}
          icon={Wifi}
          title={t('userList.onlineUsers')}
          count={onlineUsers}
          className="whitespace-nowrap"
        />
        <UsersInfoCard
          onClick={() => {
            resetFilters();
            setShowLockedUsers(true);
          }}
          icon={Lock}
          title={t('userList.blockedUsers')}
          count={lockedUsersCount}
          iconColor="yellow"
        />
      </div>
      <DaAsList
        showLockedUsers={showLockedUsers}
        showOnlineUsers={showOnlineUsers}
      />
    </div>
  );
}
