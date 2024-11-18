import { useTranslation } from 'react-i18next';
import useSWR from 'swr';

import { Card, Typography } from '@redesignUi/atoms';
import { IResponsePagination } from '@src/types/services';
import { IDaAs } from '@src/services/users/types';
import { E_USERS_DAAS } from '@src/services/users/endpoint';
import { http } from '@src/services/http';
import { LoadingPage } from '@redesignUi/molecules/Loading';
import { checkPermission } from '@src/helper/hooks/usePermission';
import { EPermissionDaas, PermissionsCodeName } from '@src/types/permissions';
import { NoResult } from '@redesignUi/molecules/NoResult';

import { UserInfo } from './UserInfo';

export function DashboardOnlineUsersList({
  permissions,
}: {
  permissions: PermissionsCodeName[];
}) {
  const { t } = useTranslation();

  const { data, isLoading, error } = useSWR<IResponsePagination<IDaAs>>(
    E_USERS_DAAS,
    http.fetcherSWR
  );
  const listDaas =
    data?.data?.results.filter((user) => user.is_running).slice(0, 8) ?? [];

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    checkPermission(permissions, EPermissionDaas.VIEW) && (
      <Card
        rounded="xxl"
        shadow="base"
        className=" w-full basis-full flex-grow p-5"
      >
        <div className="col-span-12 grid grid-cols-12 pb-9">
          <div className="col-span-6">
            <Typography color="black" variant="body4B">
              {t('dashboard.onlineUsers')}
            </Typography>
          </div>
          <div className="col-span-6 justify-self-end">
            {/* The functionality dose not work cause we do not have service */}
            {/* <BaseButton
              label={t('global.domain')}
              endIcon={caretLeft}
              size="sm"
              type="neutral"
              disabled
            /> */}
          </div>
        </div>
        <div className="col-span-12">
          {listDaas.length > 0 && !error ? (
            listDaas?.map((user) => (
              <UserInfo
                fullName={user?.email}
                email={user?.email}
                key={user.id}
              />
            ))
          ) : (
            <NoResult />
          )}
        </div>
      </Card>
    )
  );
}
