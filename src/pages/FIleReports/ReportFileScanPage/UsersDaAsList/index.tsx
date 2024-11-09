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
import PhPlayDuotone from '@iconify-icons/ph/play';
import { OnClickActionsType } from '@ui/atoms/BaseTable/types';
import { ScannedFileList } from '@src/pages/ScannedFileListPage/ScannedFileList';
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
  const [modelId, setModelId] = useState('');
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const userPermissions = useUserPermission();
  const { width } = useWindowDimensions();

  const userHandler: OnClickActionsType<IDaAs> | undefined = (_, data) => {
    if (data?.email) {
      setOpen(true);
      setModelId(data?.email);
    }
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
          isMobile={width <= 770}
        />
      </div>
      <Modal
        open={open}
        setOpen={setOpen}
        type="content"
        classContainer="w-[20.875rem] sm:w-[39.68rem]"
        title={t('fileScan.recordedActivities')}
        descriptionInfo={t('fileScan.userRecordedActivities')}
        icon={PhPlayDuotone}
        content={<ScannedFileList id={modelId} />}
      />
    </div>
  );
}
