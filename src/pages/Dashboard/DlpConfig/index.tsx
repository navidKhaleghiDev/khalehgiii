import React, { useCallback, useState } from 'react';
import useSWR from 'swr';
import { IResponsePagination } from '@src/types/services';
import { IFileType } from '@src/services/config/types';
import { http } from '@src/services/http';
import { E_WHITE_LIST_FILES } from '@src/services/config/endpoint';
import { Modal } from '@ui/molecules/Modal';
import { API_DELETE_FILE_TYPE } from '@src/services/config';
import { toast } from 'react-toastify';
import debounce from 'lodash/debounce';
import { createAPIEndpoint } from '@src/helper/utils';
import { useTranslation } from 'react-i18next';
import { BaseTable } from '@ui/atoms/BaseTable';
import { dlpConfigHeaderItem } from '@src/constants/tableHeaders/dlpConfigHeaderItem';
import { OnClickActionsType } from '@ui/atoms/BaseTable/types';
import { EPermissionWhiteListFiles } from '@src/types/permissions';
import { withPermission } from '@src/helper/hoc/withPermission';
import { TSearchBar } from '@ui/atoms/BaseTable/components/BaseTableSearchBar/types';
import { checkPermissionHeaderItem } from '@ui/atoms/BaseTable/components/utils/CheckPermissionHeaderItem';
import { useUserPermission } from '@src/helper/hooks/usePermission';

import { UpdateFileTypeModal } from './UpdateFileTypeModal';

const PAGE_SIZE = 3;
const PAGE = 1;

export function DlpConfigCp() {
  const [currentPage, setCurrentPage] = useState<number>(PAGE);
  const [filterQuery, setFilterQuery] = useState<string>('');
  const [activeFileType, setActiveFileType] = useState<Partial<IFileType>>();
  const [deleteModal, setDeleteModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [loadingButtonModal, setLoadingButtonModal] = useState(false);
  const { t } = useTranslation();
  const userPermissions = useUserPermission();

  const endpoint = createAPIEndpoint({
    endPoint: E_WHITE_LIST_FILES,
    pageSize: PAGE_SIZE,
    currentPage,
    filterQuery,
  });
  const { data, error, isLoading, mutate } = useSWR<
    IResponsePagination<IFileType>
  >(endpoint, http.fetcherSWR);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetFilterQuery = useCallback(
    debounce((query: string) => {
      setCurrentPage(PAGE);
      setFilterQuery(query);
    }, 1000),
    []
  );

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSetFilterQuery(event.target.value);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  if (error) return <div>Failed to load data.</div>;

  const listWhiteList = data?.data?.results ?? [];
  const countPage = data?.data?.count || 0;

  const handleOnDeleteFileType = async () => {
    if (!activeFileType) return;
    setLoadingButtonModal(true);

    await API_DELETE_FILE_TYPE(activeFileType.id as number)
      .then(() => {
        mutate();
        toast.success(t('global.successfullyRemoved'));
        setDeleteModal(false);
      })
      .catch((err) => {
        toast.error(err);
      })
      .finally(() => {
        setLoadingButtonModal(false);
      });
  };

  const handleCloseUpdateModal = (isMutate?: boolean) => {
    if (isMutate) {
      mutate();
    }
    setOpenUpdateModal(false);
  };

  const handleOnClickActions: OnClickActionsType<IFileType> | undefined = (
    action,
    fileType
  ) => {
    setActiveFileType(fileType as IFileType);
    if (action === 'delete') {
      setDeleteModal(true);
      return;
    }
    if (action === 'edit') {
      setOpenUpdateModal(true);
    }
  };

  const handleCreateNewType = () => {
    if (activeFileType) setActiveFileType(undefined);
    setOpenUpdateModal(true);
  };
  const paginationProps = {
    countPage,
    currentPage,
    totalPages: Math.ceil(countPage / PAGE_SIZE),
    onPageChange: handlePageChange,
  };

  const searchBarProps: TSearchBar = {
    name: 'search-extension',
    value: filterQuery,
    handleSearchInput: handleFilterChange,
    componentProps: {
      type: 'actionAdd',
      label: 'table.addNewType',
      onClick: handleCreateNewType,
    },
  };
  return (
    <div className={`w-full p-4  ${isLoading ? 'loading' : ''}`}>
      <BaseTable
        loading={isLoading}
        headers={checkPermissionHeaderItem(
          userPermissions,
          dlpConfigHeaderItem
        )}
        bodyList={listWhiteList}
        onClick={handleOnClickActions}
        pagination={paginationProps}
        searchBar={searchBarProps}
      />

      <Modal
        open={deleteModal}
        setOpen={setDeleteModal}
        type="error"
        title={t('global.sureAboutThis')}
        buttonOne={{
          label: t('global.yes'),
          onClick: handleOnDeleteFileType,
          loading: loadingButtonModal,
        }}
        buttonTow={{
          label: t('global.no'),
          onClick: () => setDeleteModal(false),
          color: 'red',
        }}
      />
      <Modal
        open={openUpdateModal}
        setOpen={setOpenUpdateModal}
        type="success"
        content={
          <UpdateFileTypeModal
            handleClose={handleCloseUpdateModal}
            fileType={activeFileType}
          />
        }
      />
    </div>
  );
}

export const DlpConfig = withPermission(DlpConfigCp, [
  EPermissionWhiteListFiles.VIEW,
]);
