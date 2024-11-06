import { http } from '@src/services/http';
import useSWR from 'swr';
import { E_USERS_LICENSES } from '@src/services/users/endpoint';
import { BaseTable } from '@redesignUi/molecules/BaseTable';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useWindowDimensions } from '@src/helper/hooks/useWindowDimensions';
import { createAPIEndpoint } from '@src/helper/utils';
import { IResponsePagination } from '@src/types/services';
import { useUserPermission } from '@src/helper/hooks/usePermission';
import { checkPermissionHeaderItem } from '@redesignUi/molecules/BaseTable/components/utils/CheckPermissionHeaderItem';

import { LicenseFileType } from './type';
import { LisenceHeaderItem } from './constant/LisenceHeaderItem';

const PAGE_SIZE = 8;
const PAGE = 1;
export function License() {
  const [currentPage, setCurrentPage] = useState<number>(PAGE);
  const { t } = useTranslation();
  const dimensions = useWindowDimensions();
  const userPermissions = useUserPermission();

  const endpoint = createAPIEndpoint({
    endPoint: E_USERS_LICENSES,
    pageSize: PAGE_SIZE,
    currentPage,
  });

  const { data, isLoading } = useSWR<IResponsePagination<LicenseFileType>>(
    endpoint,
    http.fetcherSWR
  );
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };
  const listLicense = data?.data?.results ?? [];
  const countPage = data?.data?.count || 0;
  const paginationProps = {
    countPage,
    currentPage,
    allItems: 10,
    itemsPer: PAGE_SIZE,
    paginationLabel: t('table.file'),
    totalPages: Math.ceil(countPage / PAGE_SIZE),

    onPageChange: handlePageChange,
  };

  return (
    <div className="p-5">
      {/* {!isLoading ? (
        <LicenseTables fileType={listLicense as LicenseFileType[]} />
      ) : (
        <LoadingSpinner />
      )} */}
      <BaseTable
        body={listLicense}
        header={checkPermissionHeaderItem(userPermissions, LisenceHeaderItem)}
        loading={isLoading}
        pagination={paginationProps}
        isMobile={dimensions.width <= 770}
      />
    </div>
  );
}
