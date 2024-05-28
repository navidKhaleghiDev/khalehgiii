import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import useSWR from 'swr';
import { IResponsePagination } from '@src/types/services';
import { HTTP_ANALYSES } from '@src/services/http';
import { Modal } from '@ui/molecules/Modal';
import { BaseTable } from '@ui/atoms/BaseTable';
import { createAPIEndpoint } from '@src/helper/utils';
import { extensionListHeaderItem } from '@src/constants/tableHeaders/extensionListHeaderItem';
import { debounce } from 'lodash';
import { E_ANALYZE_MIME_TYPE } from '@src/services/analyze/endpoint';
import { API_ANALYZE_MIME_TYPE_DELETE } from '@src/services/analyze';
import { IMimeType } from '@src/services/analyze/types';
import { OnClickActionsType } from '@ui/atoms/BaseTable/types';
import { EPermissionExtensions } from '@src/types/permissions';
import { TSearchBar } from '@ui/atoms/BaseTable/components/BaseTableSearchBar/types';
import { NoAccessCard } from '@ui/atoms/NotificationCard/NoAccessCard';
import {
  checkPermission,
  useUserPermission,
} from '@src/helper/hooks/usePermission';

import { CreateMimeTypeModal } from './CreateMimeTypeModal';

const PAGE_SIZE = 10;
const PAGE = 1;

export function ExtensionList() {
  const { t } = useTranslation();
  const userPermissions = useUserPermission();

  const viewTablePermission = checkPermission(
    userPermissions,
    EPermissionExtensions.VIEW
  );
  const addPermission = checkPermission(
    userPermissions,
    EPermissionExtensions.ADD
  );

  const [currentPage, setCurrentPage] = useState<number>(PAGE);
  const [filterQuery, setFilterQuery] = useState<string>('');
  const [activeAdmin, setActiveAdmin] = useState<Partial<IMimeType>>();
  const [deleteModal, setDeleteModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [loadingButtonModal, setLoadingButtonModal] = useState(false);

  const endpoint = createAPIEndpoint({
    endPoint: E_ANALYZE_MIME_TYPE,
    pageSize: PAGE_SIZE,
    currentPage,
    filterQuery,
  });

  const { data, isLoading, mutate } = useSWR<IResponsePagination<IMimeType>>(
    endpoint,
    HTTP_ANALYSES.fetcherSWR
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetFilterQuery = useCallback(
    debounce((query: string) => {
      setCurrentPage(PAGE);
      setFilterQuery(query);
    }, 1000),
    []
  );

  if (!viewTablePermission) return <NoAccessCard />;

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSetFilterQuery(event.target.value);
  };
  const listWhiteList = data?.data?.results ?? [];
  const countPage = data?.data?.count || 0;

  const handleOnDeleteFileType = async () => {
    if (!activeAdmin) return;
    setLoadingButtonModal(true);

    await API_ANALYZE_MIME_TYPE_DELETE(activeAdmin?.id as number)
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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCloseUpdateModal = (isMutate?: boolean) => {
    if (isMutate) {
      mutate();
    }
    setOpenUpdateModal(false);
  };

  const handleOnClickActions: OnClickActionsType<IMimeType> | undefined = (
    action,
    fileType
  ) => {
    setActiveAdmin(fileType as IMimeType);
    if (action === 'delete') {
      setDeleteModal(true);
      return;
    }

    if (action === 'edit') {
      setOpenUpdateModal(true);
    }
  };

  const handleCreateAdmin = () => {
    if (activeAdmin) setActiveAdmin(undefined);
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
    componentProps: addPermission
      ? {
          type: 'actionAdd',
          permission: EPermissionExtensions.ADD,
          label: 'global.addNewFile',
          onClick: handleCreateAdmin,
        }
      : undefined,
  };

  return (
    <div className={`w-full p-4  ${isLoading ? 'loading' : ''}`}>
      <BaseTable
        loading={isLoading}
        headers={extensionListHeaderItem}
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
        content={<CreateMimeTypeModal handleClose={handleCloseUpdateModal} />}
      />
    </div>
  );
}
