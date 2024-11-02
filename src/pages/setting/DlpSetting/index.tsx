import { useCallback, useState } from 'react';
import useSWR from 'swr';
import { IResponsePagination } from '@src/types/services';
import { IFileType } from '@src/services/config/types';
import { http } from '@src/services/http';
import { E_WHITE_LIST_FILES } from '@src/services/config/endpoint';
import { API_DELETE_FILE_TYPE } from '@src/services/config';
import { toast } from 'react-toastify';
import { createAPIEndpoint } from '@src/helper/utils';
import { useTranslation } from 'react-i18next';
import { dlpConfigHeaderItem } from '@src/pages/Dashboard/DlpConfig/constants/dlpConfigHeaderItem';
import { OnClickActionsType } from '@ui/atoms/BaseTable/types';
import { checkPermissionHeaderItem } from '@ui/atoms/BaseTable/components/utils/CheckPermissionHeaderItem';
import { useUserPermission } from '@src/helper/hooks/usePermission';
import { UpdateFileTypeModal } from '@src/pages/Dashboard/DlpConfig/UpdateFileTypeModal';
import { BaseTable } from '@redesignUi/molecules/BaseTable';
import { useWindowDimensions } from '@src/helper/hooks/useWindowDimensions';
import FilterTableList from '@redesignUi/Templates/FilterTableLIst';
import { Modal } from '@redesignUi/molecules/Modal';

const PAGE_SIZE = 3;
const PAGE = 1;

export function DlpSetting() {
  const [currentPage, setCurrentPage] = useState<number>(PAGE);
  const [filterQuery, setFilterQuery] = useState<string>('');
  const [activeFileType, setActiveFileType] = useState<Partial<IFileType>>();
  const [deleteModal, setDeleteModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [loadingButtonModal, setLoadingButtonModal] = useState(false);
  const { t } = useTranslation();
  const userPermissions = useUserPermission();
  const dimensions = useWindowDimensions();

  const endpoint = createAPIEndpoint({
    endPoint: E_WHITE_LIST_FILES,
    pageSize: PAGE_SIZE,
    currentPage,
    filterQuery,
  });
  const { data, error, isLoading, mutate } = useSWR<
    IResponsePagination<IFileType>
  >(endpoint, http.fetcherSWR);

  const handelSearchQuery = useCallback((searchValue: string) => {
    setCurrentPage(PAGE);
    setFilterQuery(searchValue);
  }, []);

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
    allItems: 10,
    itemsPer: PAGE_SIZE,
    paginationLabel: t('header.user'),
    totalPages: Math.ceil(countPage / PAGE_SIZE),

    onPageChange: handlePageChange,
  };

  return (
    <div className={`w-full p-4  ${isLoading ? 'loading' : ''}`}>
      <FilterTableList
        handelSearchQuery={handelSearchQuery}
        searchQuery={filterQuery}
        searchPlaceholder={t('fileScan.adminSearch')}
        onClickButton={handleCreateNewType}
        buttonLabel={t('table.addNewFile')}
      />
      <BaseTable
        loading={isLoading}
        header={checkPermissionHeaderItem(userPermissions, dlpConfigHeaderItem)}
        body={listWhiteList}
        pagination={paginationProps}
        onClick={handleOnClickActions}
        isMobile={dimensions.width <= 770}
      />

      <Modal
        size="responsive"
        open={deleteModal}
        setOpen={setDeleteModal}
        type="error"
        title={t('global.deleteFile')}
        description={t('global.sureAboutThis')}
        buttonOne={{
          label: t('global.deleteFile'),
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
        size="responsive"
        open={openUpdateModal}
        setOpen={setOpenUpdateModal}
        type="content"
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
