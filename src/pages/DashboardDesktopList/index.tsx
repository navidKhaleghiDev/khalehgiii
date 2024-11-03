import { useTranslation } from 'react-i18next';
import useSWR from 'swr';

import Lock from '@iconify-icons/ph/lock-laminated';
import Wifi from '@iconify-icons/ph/wifi-high-duotone';
import { IResponsePagination } from '@src/types/services';
import { IDaAs } from '@src/services/users/types';
import { E_USERS_DAAS } from '@src/services/users/endpoint';
import { http } from '@src/services/http';
import { Typography } from '@redesignUi/atoms';
import { UsersInfoCard } from '@redesignUi/molecules/Cards/UsersInfoCard';

import { DaAsList } from './DaAsList';

export function DashboardDesktopListPage() {
  const { t } = useTranslation();
  const { data: userData } = useSWR<IResponsePagination<IDaAs>>(
    E_USERS_DAAS,
    http.fetcherSWR
  );
  const onlineUsers = userData?.data?.online_users ?? 0;
  const lockedUsersCount =
    userData?.data?.results?.filter((user) => user.is_lock).length ?? 0;

  return (
    <div className="flex flex-col sm:gap-[1.87rem] gap-5">
      <Typography variant="body2" color="black" className="font-semibold">
        {t('userList.usersList')}
      </Typography>
      <div className="flex items-center sm:self-auto self-center gap-[1.87rem] lg:w-[45.62rem] sm:w-[33.75rem] w-full lg:mb-[5.62rem] mb-2.5">
        <UsersInfoCard
          icon={Wifi}
          title={t('userList.onlineUsers')}
          count={onlineUsers}
          className="whitespace-nowrap"
        />
        <UsersInfoCard
          icon={Lock}
          title={t('userList.blockedUsers')}
          count={lockedUsersCount}
          iconColor="yellow"
        />
      </div>
      <DaAsList />
    </div>
  );
}
