import { http } from '@src/services/http';
import useSWR from 'swr';
import { E_USERS_LICENSES } from '@src/services/users/endpoint';
import { LoadingSpinner } from '@ui/molecules/Loading';
import { LicenseTables } from '@src/pages/Dashboard/License/LicenseTables';
import { LicenseFileType } from '@src/pages/Dashboard/License/SettingMalwareCard/type';

export function LicensePage() {
  const { data, isLoading } = useSWR(E_USERS_LICENSES, http.fetcherSWR);

  const listLicense = data?.data ?? [];

  return (
    <div className="p-5">
      {!isLoading ? (
        <LicenseTables fileType={listLicense as LicenseFileType[]} />
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
}