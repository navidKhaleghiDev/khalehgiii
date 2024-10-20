import { useCallback, useState } from 'react';
import { debounce } from 'lodash';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import useSWR from 'swr';

import { IResponsePagination } from '@src/types/services';
import { HTTP_ANALYSES } from '@src/services/http';
import { Modal } from '@redesignUi/molecules/Modal';
import { BaseTable } from '@ui/atoms/BaseTable';
import { createAPIEndpoint } from '@src/helper/utils';
import { extensionListHeaderItem } from '@src/pages/DashboardExtensionList/ExtensionList/constants/extensionListHeaderItem';
import { E_ANALYZE_MIME_TYPE } from '@src/services/analyze/endpoint';
import { API_ANALYZE_MIME_TYPE_DELETE } from '@src/services/analyze';
import { IMimeType } from '@src/services/analyze/types';
import { OnClickActionsType } from '@ui/atoms/BaseTable/types';
import { EPermissionExtensions } from '@src/types/permissions';
import { TSearchBar } from '@ui/atoms/BaseTable/components/BaseTableSearchBar/types';
import { SearchInput } from '@redesignUi/atoms/Inputs/SearchInput';
import { NoAccessCard } from '@ui/atoms/NotificationCard/NoAccessCard';
import { BaseButton, Typography } from '@redesignUi/atoms';
import PhPlus from '@iconify-icons/ph/plus-bold';

import {
  checkPermission,
  useUserPermission,
} from '@src/helper/hooks/usePermission';
import { checkPermissionHeaderItem } from '@ui/atoms/BaseTable/components/utils/CheckPermissionHeaderItem';

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
    <div className={`w-full pt-10 px-5 ${isLoading ? 'loading' : ''}`}>
      <Typography variant="body2B" color="neutralDark" className="mb-[6.25rem]">
        {t('systemManagement.formatList')}
      </Typography>
      <div className="flex items-center justify-between mb-[1.875rem]">
        <SearchInput
          id="searchFormat"
          name="searchFormat"
          size="lg"
          placeholder={t('systemManagement.search')}
          onChange={() => console.log('you are searching')}
          value={filterQuery}
          className="top-3"
        />
        <BaseButton
          label={t('systemManagement.newFormat')}
          onClick={() => setOpenUpdateModal(true)}
          startIcon={PhPlus}
        />
      </div>
      <BaseTable
        loading={isLoading}
        headers={checkPermissionHeaderItem(
          userPermissions,
          extensionListHeaderItem
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
        size="md"
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
        type="content"
        size="md"
        content={<CreateMimeTypeModal handleClose={handleCloseUpdateModal} />}
      />
    </div>
  );
}
