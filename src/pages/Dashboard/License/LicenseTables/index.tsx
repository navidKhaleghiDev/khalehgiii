import { E_USERS_LICENSES } from '@src/services/users/endpoint';
import { BaseTable } from '@ui/atoms/BaseTable';
import useSWR from 'swr';
import { http, HTTP_ANALYSES } from '@src/services/http';
import { useUserPermission } from '@src/helper/hooks/usePermission';
import { checkPermissionHeaderItem } from '@ui/atoms/BaseTable/components/utils/CheckPermissionHeaderItem';
import { E_ANALYZE_SCANNER } from '@src/services/analyze/endpoint';
import { licenseHeaderItem } from './licenseTableHeaderItem';

export function LicenseTables() {
  const userPermissions = useUserPermission();

  const { data: listData, isLoading } = useSWR(
    E_ANALYZE_SCANNER,
    HTTP_ANALYSES.fetcherSWR
  );
  const listWhiteList = listData?.data ?? {};

  const { data, isLoading: loading } = useSWR(
    E_USERS_LICENSES,
    http.fetcherSWR
  );

  const listDaas = data?.data ?? [];

  return (
    <div className="p-5">
      <BaseTable
        loading={loading || isLoading}
        headers={checkPermissionHeaderItem(userPermissions, licenseHeaderItem)}
        bodyList={[{ ...listDaas, ...listWhiteList }]}
      />
    </div>
  );
}
