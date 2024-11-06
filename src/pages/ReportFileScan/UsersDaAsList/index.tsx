import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';

import { IDaAs } from '@src/services/users/types';
import { http } from '@src/services/http';
import { IResponsePagination } from '@src/types/services';
import { E_USERS_DAAS } from '@src/services/users/endpoint';
import { createAPIEndpoint } from '@src/helper/utils';
import { Modal } from '@redesignUi/molecules/Modal';
import { BaseTable } from '@redesignUi/molecules/BaseTable';
import PhPlayDuotone from '@iconify-icons/ph/play-duotone';
import { BaseIcon, Typography } from '@redesignUi/atoms';
import { MultiDatePicker } from '@redesignUi/atoms/Inputs/DatePicker';
import { ScannedFileList } from '@src/pages/ScannedFileListPage/ScannedFileList';
import FilterTableList from '@redesignUi/Templates/FilterTableLIst';
import { useUserPermission } from '@src/helper/hooks/usePermission';
import { checkPermissionHeaderItem } from '@redesignUi/molecules/BaseTable/components/utils/CheckPermissionHeaderItem';
import { monitoringHeaderItem } from '@src/pages/ReportFileScan/constants/constants';

const PAGE_SIZE = 8;
const PAGE = 1;

export function UsersDaAsList() {
  const [currentPage, setCurrentPage] = useState<number>(PAGE);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [modelId, setModelId] = useState('');
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const userPermissions = useUserPermission();

  const userHandler = (list: any) => {
    setOpen(true);
    setModelId(list.email);
  };

  const endpoint = createAPIEndpoint({
    endPoint: E_USERS_DAAS,
    pageSize: PAGE_SIZE,
    currentPage,
    filterQuery: searchQuery,
  });

  const { data, isLoading } = useSWR<IResponsePagination<IDaAs>>(
    endpoint,
    http.fetcherSWR
  );

  const handelSearchQuery = useCallback((searchValue: string) => {
    setCurrentPage(PAGE);
    setSearchQuery(searchValue);
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const listDaAs = data?.data.results ?? [];
  const listDaAsCount = data?.data.count ?? 0;

  const paginationProps = {
    countPage: listDaAsCount,
    currentPage,
    totalPages: Math.ceil(listDaAsCount / PAGE_SIZE),
    onPageChange: handlePageChange,
    paginationLabel: t('header.admin'),
    allItems: listDaAsCount,
    itemsPer: listDaAs.length,
  };

<<<<<<< HEAD
  console.log(data);
=======
  const searchBarProps: TSearchBar = {
    name: 'search-users-daas-list',
    value: filterQuery,
    handleSearchInput: handleFilterChange,
  };
>>>>>>> 31f5618495b646e524a0ad7cf6c6774ca1abc6e5

  return (
    <div className="mt-[7.625rem]">
      <FilterTableList
        searchQuery={searchQuery}
        handelSearchQuery={handelSearchQuery}
        searchPlaceholder={t('fileScan.adminSearch')}
        domainFilter
        handelGroupeFilter={() => console.log('this functionary is disables')}
      />
      <div className="mt-[1.875rem]">
        <BaseTable
          loading={isLoading}
          body={listDaAs}
          header={checkPermissionHeaderItem(
            userPermissions,
            monitoringHeaderItem
          )}
          onClick={userHandler}
          pagination={paginationProps}
        />
      </div>

      {/* <Modal
          open={open}
          setOpen={setOpen}
          type="content"
          className="dark:bg-gray-700"
          content={
            <div className=" w-[20.875rem] sm:w-[39.68rem]">
              <div className="flex items-center gap-5">
                <BaseIcon icon={PhPlayDuotone} size="lg" color="neutral" />
                <div className="text-right">
                  <Typography variant="body3B" color="neutralDark">
                    {t('fileScan.recordedActivities')}
                  </Typography>
                  <Typography variant="body6" color="neutralLight">
                    {t('fileScan.userRecordedActivities')}
                  </Typography>
                </div>
              </div>
              <MultiDatePicker
                id="daasDatePicker"
                name="daasDatePicker"
                className="text-right mt-9 mb-5"
                onChange={() => console.log('datePicker change')}
              />
              <ScannedFileList id={modelId} />
            </div>
          }
        /> */}
    </div>
  );
}
