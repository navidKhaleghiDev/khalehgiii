import { Typography } from '@ui/atoms';
import { E_ANALYZE_SCAN_USER_PAGINATION } from '@src/services/analyze/endpoint';
import { ScannedFile } from '@src/services/analyze/types';
import { HTTP_ANALYSES } from '@src/services/http';
import { ResponsePagination } from '@src/types/services';
import useSWR from 'swr';

type UserScanCountProps = {
  email: string;
};

export function UserScanCount({ email }: UserScanCountProps) {
  const { data } = useSWR<ResponsePagination<ScannedFile>>(
    email ? E_ANALYZE_SCAN_USER_PAGINATION(email) : null,
    HTTP_ANALYSES.fetcherSWR
  );
  const count = data?.data?.count || '-';
  return <Typography variant="body3">{count}</Typography>;
}
