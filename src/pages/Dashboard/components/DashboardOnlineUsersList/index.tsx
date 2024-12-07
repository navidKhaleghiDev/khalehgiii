import { useTranslation } from 'react-i18next';
import useSWR from 'swr';

import { Card, Typography } from '@redesignUi/atoms';
import { ResponsePagination } from '@src/types/services';
import { DaAsParams } from '@src/services/users/types';
import { E_USERS_DAAS } from '@src/services/users/endpoint';
import { http } from '@src/services/http';
import { LoadingPage } from '@redesignUi/molecules/Loading';
import { checkPermission } from '@src/helper/hooks/usePermission';
import { PermissionDaas, PermissionsCodeName } from '@src/types/permissions';
import { NoResultUsers } from '@redesignUi/molecules/NoResultUsers';

import { UserInfoAvatar } from './UserInfoAvatar';

export function DashboardOnlineUsersList({
  permissions,
}: {
  permissions: PermissionsCodeName[];
}) {
  const { t } = useTranslation();

  const { data, isLoading, error } = useSWR<ResponsePagination<DaAsParams>>(
    E_USERS_DAAS,
    http.fetcherSWR
  );
  const listDaas =
    data?.data?.results.filter((user) => user.is_running).slice(0, 8) ?? [];

  if (isLoading) {
    return <LoadingPage />;
  }

  return checkPermission(permissions, PermissionDaas.VIEW) ? (
    <Card
      rounded="xxl"
      shadow="base"
      className=" w-full basis-full flex-grow p-5"
    >
      <div className="col-span-12 grid grid-cols-12 pb-5">
        <div className="col-span-6">
          <Typography color="black" variant="body4B">
            {t('dashboard.onlineUsers')}
          </Typography>
        </div>
      </div>
      <div className="flex flex-col gap-5 col-span-12">
        {listDaas.length > 0 && !error ? (
          listDaas?.map((user) => (
            <UserInfoAvatar
              fullName={user?.email}
              email={user?.email}
              key={user.id}
            />
          ))
        ) : (
          <NoResultUsers />
        )}
      </div>
    </Card>
  ) : null;
}
