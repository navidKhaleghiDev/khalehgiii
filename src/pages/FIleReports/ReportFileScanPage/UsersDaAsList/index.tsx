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
import PhFolder from '@iconify-icons/ph/folder';
import { OnClickActionsType } from '@ui/atoms/BaseTable/types';
import { ScannedFileList } from '@src/pages/FIleReports/ReportFileScanPage/ScanFIleList';
import { FilterTableList } from '@redesignUi/Templates/FilterTableLIst';
import { useUserPermission } from '@src/helper/hooks/usePermission';
import { useWindowDimensions } from '@src/helper/hooks/useWindowDimensions';
import { checkPermissionHeaderItem } from '@redesignUi/molecules/BaseTable/components/utils/CheckPermissionHeaderItem';

import { monitoringHeaderItem } from '../constants/constants';

const PAGE_SIZE = 8;
const PAGE = 1;

export function UsersDaAsList() {
  const [currentPage, setCurrentPage] = useState<number>(PAGE);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [userEmail, setUserEmail] = useState<IDaAs['email']>('');
  const [open, setOpen] = useState(false);

  const userPermissions = useUserPermission();
  const { width } = useWindowDimensions();
  const { t } = useTranslation();

  // Daas users info & scan numbers
  const endpoint = createAPIEndpoint({
    endPoint: E_USERS_DAAS,
    pageSize: PAGE_SIZE,
    filterQuery: searchQuery,
    currentPage,
  });
  const { data, isLoading, error } = useSWR<IResponsePagination<IDaAs>>(
    endpoint,
    http.fetcherSWR
  );

  const handelClickRow: OnClickActionsType<IDaAs> = (action, daAs) => {
    if (action === 'button' && daAs?.email) {
      setUserEmail(daAs?.email);
      setOpen(true);
    }
  };
  const handelSearchQuery = useCallback((searchValue: string) => {
    setCurrentPage(PAGE);
    setSearchQuery(searchValue);
  }, []);

  const listDaAs = data?.data.results ?? [];
  const listDaAsCount = data?.data.count ?? 0;
  const paginationProps = {
    countPage: listDaAsCount,
    currentPage,
    totalPages: Math.ceil(listDaAsCount / PAGE_SIZE),
    onPageChange: (page: number) => setCurrentPage(page),
    paginationLabel: t('header.admin'),
    allItems: listDaAsCount,
    itemsPer: listDaAs.length,
  };

  return (
    <>
      <FilterTableList
        searchQuery={searchQuery}
        handelSearchQuery={handelSearchQuery}
        searchPlaceholder={t('fileScan.adminSearch')}
        handelGroupeFilter={() => console.log('this functionary is disables')}
      />
      <div className="mt-[1.875rem]">
        {!error ? (
          <BaseTable
            loading={isLoading}
            body={listDaAs}
            header={checkPermissionHeaderItem(
              userPermissions,
              monitoringHeaderItem
            )}
            onClick={handelClickRow}
            pagination={paginationProps}
            isMobile={width <= 770}
          />
        ) : (
          // Handel error with error component
          <p className="flex items-center justify-center">{error}</p>
        )}
      </div>
      <Modal
        open={open}
        setOpen={setOpen}
        type="content"
        icon={PhFolder}
        title={t('fileScan.recordedActivities')}
        classContainer="w-[20.875rem] sm:w-[39.68rem]"
        content={<ScannedFileList userEmail={userEmail} />}
        descriptionInfo={t('fileScan.userRecordedActivities')}
      />
    </>
  );
}
