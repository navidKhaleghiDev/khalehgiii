import { http } from '@src/services/http';
import useSWR from 'swr';
import { E_USERS_LICENSES } from '@src/services/users/endpoint';
import { LoadingSpinner } from '@ui/molecules/Loading';
import { LicenseTables } from './LicenseTables';

export function LicenseCp() {
  const { data, isLoading } = useSWR(E_USERS_LICENSES, http.fetcherSWR);

  const listDaas = data?.data ?? [];

  return (
    <div className="p-5">
      {!isLoading ? <LicenseTables fileType={listDaas} /> : <LoadingSpinner />}
    </div>
  );
}
