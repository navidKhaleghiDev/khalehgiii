import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import useSWR from 'swr';

import { IResponsePagination } from '@src/types/services';
import { HTTP_ANALYSES } from '@src/services/http';
import { Modal } from '@redesignUi/molecules/Modal';
import { createAPIEndpoint } from '@src/helper/utils';
import { E_ANALYZE_MIME_TYPE } from '@src/services/analyze/endpoint';
import { API_ANALYZE_MIME_TYPE_DELETE } from '@src/services/analyze';
import { IMimeType } from '@src/services/analyze/types';
import { OnClickActionsType } from '@ui/atoms/BaseTable/types';
import { BaseTable } from '@redesignUi/molecules/BaseTable';
import { FilterTableList } from '@redesignUi/Templates/FilterTableLIst';
import PhUploadSimple from '@iconify-icons/ph/upload-simple';
import { useWindowDimensions } from '@src/helper/hooks/useWindowDimensions';
import { useUserPermission } from '@src/helper/hooks/usePermission';
import { checkPermissionHeaderItem } from '@redesignUi/molecules/BaseTable/components/utils/CheckPermissionHeaderItem';

import { extensionListHeaderItem } from '../constants/extensionListHeaderItem';
import { UploadFileModal } from '../UploadMimeType';

const PAGE_SIZE = 8;
const PAGE = 1;

export function ExtensionList() {
  const [currentPage, setCurrentPage] = useState<number>(PAGE);
  const [filterQuery, setFilterQuery] = useState<string>('');
  const [activeAdmin, setActiveAdmin] = useState<Partial<IMimeType>>();
  const [deleteModal, setDeleteModal] = useState(false);
  const { width } = useWindowDimensions();
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [loadingButtonModal, setLoadingButtonModal] = useState(false);

  const { t } = useTranslation();
  const userPermissions = useUserPermission();

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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handelSearchQuery = useCallback((value: string) => {
    setCurrentPage(PAGE);
    setFilterQuery(value);
  }, []);
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

  const listWhiteList = data?.data?.results ?? [];
  const countPage = data?.data?.count || 0;

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
    allItems: countPage,
    itemsPer: listWhiteList.length,
  };

  return (
    <>
      <div className="mb-[1.875rem]">
        <FilterTableList
          handelSearchQuery={handelSearchQuery}
          searchPlaceholder={t('systemManagement.search')}
          searchQuery={filterQuery}
          buttonLabel={t('systemManagement.newFormat')}
          onClickButton={() => setOpenUpdateModal(true)}
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
        isMobile={width <= 765}
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
      <Modal
        open={openUpdateModal}
        setOpen={setOpenUpdateModal}
        type="content"
        icon={PhUploadSimple}
        title={t('systemManagement.uploadFile')}
        descriptionInfo={t('systemManagement.uploadFileText')}
        content={<UploadFileModal handleClose={handleCloseUpdateModal} />}
        classContainer="w-[21.875rem] md:w-[39.68rem]"
      />
    </>
  );
}
