import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import useSWR from 'swr';

import { IResponsePagination } from '@src/types/services';
import { HTTP_ANALYSES } from '@src/services/http';
import { Modal } from '@redesignUi/molecules/Modal';
// import { BaseTable } from '@ui/atoms/BaseTable';
import { createAPIEndpoint } from '@src/helper/utils';
import { extensionListHeaderItem } from '@src/pages/DashboardExtensionList/ExtensionList/constants/extensionListHeaderItem';
import { E_ANALYZE_MIME_TYPE } from '@src/services/analyze/endpoint';
import { API_ANALYZE_MIME_TYPE_DELETE } from '@src/services/analyze';
import { IMimeType } from '@src/services/analyze/types';
import { OnClickActionsType } from '@ui/atoms/BaseTable/types';
import { EPermissionExtensions } from '@src/types/permissions';
// import { TSearchBar } from '@ui/atoms/BaseTable/components/BaseTableSearchBar/types';
import { SearchInput } from '@redesignUi/atoms/Inputs/SearchInput';
import { NoAccessCard } from '@ui/atoms/NotificationCard/NoAccessCard';
import { BaseTable } from '@redesignUi/molecules/BaseTable';
import { BaseButton, Typography } from '@redesignUi/atoms';
import PhPlus from '@iconify-icons/ph/plus-bold';
import PhUploadSimple from '@iconify-icons/ph/upload-simple';
import {
  checkPermission,
  useUserPermission,
} from '@src/helper/hooks/usePermission';
import { checkPermissionHeaderItem } from '@ui/atoms/BaseTable/components/utils/CheckPermissionHeaderItem';
import { ModalInfo } from '@redesignUi/molecules/ModalInfo';

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
  // const addPermission = checkPermission(
  //   userPermissions,
  //   EPermissionExtensions.ADD
  // );

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

  if (!viewTablePermission) return <NoAccessCard />;

  const handleFilterChange = (value: string) => {
    setCurrentPage(PAGE);
    setFilterQuery(value);
    console.log(value);
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

  const paginationProps = {
    countPage,
    currentPage,
    totalPages: Math.ceil(countPage / PAGE_SIZE),
    onPageChange: handlePageChange,
    paginationLabel: t('global.format'),
    allItems: 20,
    itemsPer: PAGE_SIZE,
  };

  return (
    <div className={`w-full ${isLoading ? 'loading' : ''}`}>
      <Typography variant="body2B" color="neutralDark" className="mb-[6.25rem]">
        {t('systemManagement.formatList')}
      </Typography>
      <div className="flex items-center justify-between mb-[1.875rem]">
        <SearchInput
          id="searchFormat"
          name="searchFormat"
          size="lg"
          placeholder={t('systemManagement.search')}
          onChange={handleFilterChange}
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
        body={listWhiteList}
        header={checkPermissionHeaderItem(
          userPermissions,
          extensionListHeaderItem
        )}
        loading={isLoading}
        pagination={paginationProps}
        onClick={handleOnClickActions}
      />
      <Modal
        open={deleteModal}
        setOpen={setDeleteModal}
        type="error"
        size="responsive"
        title={t('systemManagement.deleteFormat')}
        description={t('systemManagement.deleteFormatText')}
        buttonOne={{
          label: t('systemManagement.deleteFormat'),
          onClick: handleOnDeleteFileType,
          loading: loadingButtonModal,
          color: 'red',
        }}
        buttonTow={{
          label: t('global.cancel'),
          onClick: () => setDeleteModal(false),
          color: 'tertiary',
        }}
      />
      <ModalInfo
        open={openUpdateModal}
        setOpen={setOpenUpdateModal}
        icon={PhUploadSimple}
        title={t('systemManagement.uploadFile')}
        description={t('systemManagement.uploadFileText')}
        content={<CreateMimeTypeModal handleClose={handleCloseUpdateModal} />}
      />
    </div>
  );
}
