import { IconButton } from '@ui/atoms/BaseButton';
import plusIcon from '@iconify-icons/ph/plus';
import { useCallback, useState } from 'react';
import useSWR from 'swr';
import { IResponsePagination } from '@src/types/services';
import { HTTP_ANALYSES } from '@src/services/http';
import { LoadingSpinner } from '@ui/molecules/Loading';
import { StringifyProperties } from '@src/types/global';
import Pagination from '@ui/molecules/Pagination';
import { Modal } from '@ui/molecules/Modal';
import { toast } from 'react-toastify';
import { BaseTable } from '@ui/atoms/BaseTable';
import ToolTip from '@ui/atoms/Tooltip';
import { SearchInput } from '@ui/atoms/Inputs/SearchInput';
import { createAPIEndpoint } from '@src/helper/utils';
import { extensionListHeaderItem } from '@src/constants/tableHeaders/extensionListHeaderItem';
import { debounce } from 'lodash';
import { E_ANALYZE_MIME_TYPE } from '@src/services/analyze/endpoint';
import { API_ANALYZE_MIME_TYPE_DELETE } from '@src/services/analyze';
import { IMimeType } from '@src/services/analyze/types';
import { CreateMimeTypeModal } from './CreateMimeTypeModal';
import { ActionOnClickActionsType } from './MimeTypeCard/types';

const PAGE_SIZE = 10;
const PAGE = 1;

// const headerItem: StringifyProperties<IMimeType> = {
//   id: '',
//   extension_list: 'پسوند فایل',
//   mimetype_list: 'رشته فایل',
//   created_at: 'تاریخ ایجاد',
//   updated_at: '',
//   file: '',
// };

export function ExtensionList() {
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

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSetFilterQuery(event.target.value);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const listWhiteList = data?.data?.results ?? [];
  const countPage = data?.data?.count || 0;

  const handleOnDeleteFileType = async () => {
    if (!activeAdmin) return;
    setLoadingButtonModal(true);

    await API_ANALYZE_MIME_TYPE_DELETE(activeAdmin?.id as number)
      .then(() => {
        mutate();
        toast.success('با موفقیت حذف شد');
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

  function handleOnClickActions(
    action: ActionOnClickActionsType,
    fileType?: StringifyProperties<IMimeType> | IMimeType
  ): any {
    setActiveAdmin(fileType as IMimeType);

    if (action === 'delete') {
      setDeleteModal(true);
      return;
    }

    if (action === 'edit') {
      setOpenUpdateModal(true);
    }

    // if (daas !== undefined && typeof daas !== "string") {
    //   setActionOnClick(action);
    //   setActiveDaas(daas);
    //   setDeleteModal(true);
    // }
  }

  const handleCreateAdmin = () => {
    if (activeAdmin) setActiveAdmin(undefined);
    setOpenUpdateModal(true);
  };
  return (
    <div className="w-full p-4">
      <div className="flex justify-between items-center">
        <SearchInput
          name="search-extension"
          value={filterQuery}
          onChange={handleFilterChange}
          className="w-1/4"
        />
        <ToolTip tooltip="اضافه کردن رشته فایل جدید" position="right">
          <IconButton
            icon={plusIcon}
            color="teal"
            size="lg"
            onClick={handleCreateAdmin}
          />
        </ToolTip>
      </div>
      <BaseTable
        loading={isLoading}
        header={extensionListHeaderItem()}
        body={listWhiteList}
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
          label: 'بله',
          onClick: handleOnDeleteFileType,
          loading: loadingButtonModal,
        }}
        buttonTow={{
          label: 'خیر',
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
