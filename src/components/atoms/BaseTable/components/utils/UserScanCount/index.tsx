import { E_ANALYZE_SCAN_USER_PAGINATION } from '@src/services/analyze/endpoint';
import { IScannedFile } from '@src/services/analyze/types';
import { HTTP_ANALYSES } from '@src/services/http';
import { IResponsePagination } from '@src/types/services';
import { Typography } from '@ui/atoms';
import useSWR from 'swr';

type UserScanCountProps = {
  email: string;
};

export function UserScanCount({ email }: UserScanCountProps) {
  const { data } = useSWR<IResponsePagination<IScannedFile>>(
    email ? E_ANALYZE_SCAN_USER_PAGINATION(email) : null,
    HTTP_ANALYSES.fetcherSWR
  );
  const count = data?.data?.count || '-';
  return <Typography variant="body3">{count}</Typography>;
}
