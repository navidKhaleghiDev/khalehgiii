import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import moment from 'moment-jalaali';

import { useUserContext } from '@context/user/userContext';
import { Card, Typography } from '@redesignUi/atoms';
import { E_ANALYZE_SCAN_STATS } from '@src/services/analyze/endpoint';
import { ScanStats } from '@src/services/analyze/types';
import { HTTP_ANALYSES } from '@src/services/http';
import { SwrResponse } from '@src/types/services';
import { ServiceCard } from '@redesignUi/molecules/Cards/ServiceCard';
import { checkPermission } from '@src/helper/hooks/usePermission';
import {
  PermissionMalwareConfig,
  PermissionsCodeName,
} from '@src/types/permissions';

export function DashboardInfoCards({
  permissions,
}: {
  permissions: PermissionsCodeName[];
}) {
  const { data } = useSWR<SwrResponse<ScanStats>>(
    E_ANALYZE_SCAN_STATS,
    HTTP_ANALYSES.fetcherSWR
  );

  const { user } = useUserContext();
  const { t } = useTranslation();
  const viewMalwarePermission = checkPermission(
    permissions,
    PermissionMalwareConfig.VIEW
  );
  const remainingDays = data?.data?.info?.remaining_days || ' 0';

  const nowDate = moment().format('jYYYY/jMM/jDD');

  return (
    <div className="flex flex-col gap-5">
      <Card
        rounded="xxl"
        shadow="base"
        className="py-1.5 px-5 hidden xl:pb-[3.375rem] md:block xl:p-5"
      >
        {user?.first_name && user?.last_name ? (
          <Typography
            color="black"
            variant="body4B"
            className="xl:py-1 py-0 xl:text-base font-medium text-sm whitespace-nowrap overflow-hidden"
          >
            {user.first_name} {user.last_name}
          </Typography>
        ) : (
          <Typography
            color="black"
            variant="body4B"
            className="xl:py-1 py-0 xl:text-base font-medium text-sm whitespace-nowrap overflow-hidden"
          >
            {user?.email}
          </Typography>
        )}
        {user?.is_superuser && (
          <Typography
            color="neutralMiddle"
            variant="body5"
            className="xl:pb-1 pb-0 xl:text-sm text-xs"
          >
            {user.is_superuser ? t('header.admin') : t('header.user')}
          </Typography>
        )}
      </Card>
      {viewMalwarePermission && (
        <ServiceCard
          subValue={Number(remainingDays)}
          totalValue={365}
          title={t('dashboard.netsep')}
          date={nowDate}
          className="!w-full"
        />
      )}
    </div>
  );
}
