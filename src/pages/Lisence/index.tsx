import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';

import { http } from '@src/services/http';
import { E_USERS_LICENSES } from '@src/services/users/endpoint';
import { BaseTable } from '@redesignUi/molecules/BaseTable';
import { useWindowDimensions } from '@src/helper/hooks/useWindowDimensions';
import { createAPIEndpoint } from '@src/helper/utils';
import { IResponsePagination } from '@src/types/services';
import { Typography } from '@redesignUi/atoms';

import { LicenseFileType } from './type';
import { LisenceHeaderItem } from './constant/LisenceHeaderItem';

const PAGE_SIZE = 10;
const PAGE = 1;
export function License() {
  const [currentPage, setCurrentPage] = useState<number>(PAGE);
  const { t } = useTranslation();
  const dimensions = useWindowDimensions();

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
  const listLicense = data?.data.results ?? [];
  const countPage = data?.data.count || 0;

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
    <div>
      <div className="mb-[2.87rem]">
        <Typography
          color="black"
          variant="body2B"
          className="w-full col-span-12 dark:text-white"
        >
          {t('table.license')}
        </Typography>
      </div>

      <BaseTable
        body={listLicense as LicenseFileType[]}
        header={LisenceHeaderItem}
        loading={isLoading}
        pagination={paginationProps}
        isMobile={dimensions.width <= 770}
      />
    </div>
  );
}
