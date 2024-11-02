import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';

import CaretLeft from '@iconify-icons/ph/caret-left';
import { Card, Typography } from '@redesignUi/atoms';
import { BaseButton } from '@redesignUi/atoms/BaseButton';
import { IResponsePagination } from '@src/types/services';
import { IDaAs } from '@src/services/users/types';
import { createAPIEndpoint } from '@src/helper/utils';
import { E_USERS_DAAS } from '@src/services/users/endpoint';
import { http } from '@src/services/http';
import { LoadingPage } from '@redesignUi/molecules/Loading';
import { checkPermission } from '@src/helper/hooks/usePermission';
import { EPermissionDaas, PermissionsCodeName } from '@src/types/permissions';

import UserInfo from './UserInfo';

const PAGE_SIZE = 8;
const PAGE = 1;

export function DashboardOnlineUsersList({
  permissions,
}: {
  permissions: PermissionsCodeName[];
}) {
  const [currentPage] = useState<number>(PAGE);
  const [filterQuery] = useState<string>('');
  const { t } = useTranslation();
  const endpoint = createAPIEndpoint({
    endPoint: E_USERS_DAAS,
    pageSize: PAGE_SIZE,
    currentPage,
    filterQuery,
  });
  const { data, isLoading } = useSWR<IResponsePagination<IDaAs>>(
    endpoint,
    http.fetcherSWR
  );
  const listDaas = data?.data?.results.filter((user) => user.is_running) ?? [];

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
            <Typography color="neutral" variant="body5">
              sep.npd-co.com
            </Typography>
          </div>
          <div className="col-span-6 justify-self-end">
            <BaseButton
              label={t('global.domain')}
              endIcon={CaretLeft}
              size="sm"
              type="neutral"
            />
          </div>
        </div>
        <div className="col-span-12">
          {listDaas?.map((user) => (
            <UserInfo
              fullName={user?.email}
              email={user?.email}
              key={user.id}
            />
          ))}
        </div>
      </Card>
    )
  );
}
