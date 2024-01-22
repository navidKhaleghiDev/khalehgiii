import { IconButton } from '@ui/atoms/BaseButton';
import plusIcon from '@iconify-icons/ph/plus';
import React, { useCallback, useState } from 'react';
import useSWR from 'swr';
import { IResponsePagination } from '@src/types/services';
import { IFileType } from '@src/services/config/types';
import { http } from '@src/services/http';
import { E_WHITE_LIST_FILES } from '@src/services/config/endpoint';
import { LoadingSpinner } from '@ui/molecules/Loading';
import Pagination from '@ui/molecules/Pagination';
import { Modal } from '@ui/molecules/Modal';
import { API_DELETE_FILE_TYPE } from '@src/services/config';
import { toast } from 'react-toastify';
import debounce from 'lodash/debounce';
import ToolTip from '@ui/atoms/Tooltip';
import { SearchInput } from '@ui/atoms/Inputs/SearchInput';
import { createAPIEndpoint } from '@src/helper/utils';
import { useTranslation } from 'react-i18next';
import { BaseTable } from '@ui/atoms/BaseTable';
import { dlpConfigHeaderItem } from '@src/constants/tableHeaders/dlpConfigHeaderItem';
import { OnClickActionsType } from '@ui/atoms/BaseTable/types';
import { UpdateFileTypeModal } from './UpdateFileTypeModal';

const PAGE_SIZE = 3;
const PAGE = 1;

export function DlpConfig() {
  const [currentPage, setCurrentPage] = useState<number>(PAGE);
  const [filterQuery, setFilterQuery] = useState<string>('');
  const [activeFileType, setActiveFileType] = useState<Partial<IFileType>>();
  const [deleteModal, setDeleteModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [loadingButtonModal, setLoadingButtonModal] = useState(false);
  const { t } = useTranslation();

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

  if (isLoading) {
    return <LoadingSpinner />;
  }

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

  return (
    <div className="w-full p-4">
      <div className="flex justify-between items-center">
        <SearchInput
          name="search-dlp-config"
          value={filterQuery}
          onChange={handleFilterChange}
          className="w-1/4"
        />
        <ToolTip tooltip="اضافه کردن تایپ جدید" position="right">
          <IconButton
            icon={plusIcon}
            color="teal"
            size="lg"
            onClick={handleCreateNewType}
          />
        </ToolTip>
      </div>
      <BaseTable
        loading={isLoading}
        headers={dlpConfigHeaderItem}
        bodyList={listWhiteList}
        onClick={handleOnClickActions}
      />
      {!!countPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(countPage / PAGE_SIZE)}
          onPageChange={handlePageChange}
        />
      )}
      <Modal
        open={deleteModal}
        setOpen={setDeleteModal}
        type="error"
        title="از انجام این کار مطمئن هستید؟"
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
