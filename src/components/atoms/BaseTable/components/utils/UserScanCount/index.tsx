import useSWR from 'swr';

import { Typography } from '@redesignUi/atoms/Typography';
import { E_ANALYZE_SCAN_USER_PAGINATION } from '@src/services/analyze/endpoint';
import { ScannedFile } from '@src/services/analyze/types';
import { HTTP_ANALYSES } from '@src/services/http';
import { ResponsePagination } from '@src/types/services';

type UserScanCountProps = {
  email: string;
};

export function UserScanCount({ email }: UserScanCountProps) {
  const { data } = useSWR<ResponsePagination<ScannedFile>>(
    email ? E_ANALYZE_SCAN_USER_PAGINATION(email) : null,
    HTTP_ANALYSES.fetcherSWR
  );
  const count = data?.data?.count || '-';
  return (
    <Typography variant="body6" color="black">
      {count}
    </Typography>
  );
}
