import { useTranslation } from 'react-i18next';
import useSWR from 'swr';

import User from '@iconify-icons/ph/user';
import Wifi from '@iconify-icons/ph/wifi-high-duotone';
import { Typography } from '@redesignUi/atoms';
import { UsersInfoCard } from '@redesignUi/molecules/Cards/UsersInfoCard';
import { IUser } from '@src/services/users/types';
import { E_USERS } from '@src/services/users/endpoint';
import { http } from '@src/services/http';
import { IResponsePagination } from '@src/types/services';

import { AdminsList } from './AdminsList';

export function DashboardAdminsListPage() {
  const { t } = useTranslation();
  const { data: adminData } = useSWR<IResponsePagination<IUser>>(
    E_USERS,
    http.fetcherSWR
  );

  const onlineAdmins = adminData?.data?.online_users ?? 1;
  const totalAdmins = adminData?.data?.count ?? 0;

  return (
    <div className="flex flex-col sm:gap-[1.87rem] gap-5 mt-5">
      <Typography variant="body2B" color="black">
        {t('dashboard.adminLists')}
      </Typography>
      <div className="flex items-center sm:self-auto self-center gap-[1.87rem] lg:w-[45.62rem] sm:w-[33.75rem] w-full lg:mb-[5.62rem] mb-2.5">
        <UsersInfoCard
          icon={User}
          title={t('header.admin')}
          count={totalAdmins}
          iconColor="blue"
        />
        <UsersInfoCard
          icon={Wifi}
          title={t('global.onlineAdmin')}
          count={onlineAdmins}
          className="whitespace-nowrap"
        />
      </div>
      <AdminsList />
    </div>
  );
}
