import { useCallback, useState } from 'react';
import { OnlineAssistanceModel } from '@src/services/users/types';
import useSWR from 'swr';
import { http } from '@src/services/http';
import { IResponsePagination } from '@src/types/services';
import { E_USERS_ONLINE_ASSISTANCE } from '@src/services/users/endpoint';
import { createAPIEndpoint } from '@src/helper/utils';
import { debounce } from 'lodash';
import { BaseTable } from '@ui/atoms/BaseTable';
import { TSearchBar } from '@ui/atoms/BaseTable/components/BaseTableSearchBar/types';
import { useUserPermission } from '@src/helper/hooks/usePermission';
import { checkPermissionHeaderItem } from '@ui/atoms/BaseTable/components/utils/CheckPermissionHeaderItem';
import { onlineAssistanceHeaderItem } from '@src/pages/Dashboard/OnlineAssistance/constants';
import { OnClickActionsType } from '@ui/atoms/BaseTable/types';
import { Modal } from '@ui/molecules/Modal';
import { API_KNOWLEDGE_MANAGEMENT } from '@src/services/users';
import { LoadingWrapper } from '@ui/molecules/Loading/LoadingWrapper';
import { IconButton } from '@ui/atoms/BaseButton';
import { toast } from 'react-toastify';
import { NoResult } from '@ui/molecules/NoResult';

const PAGE_SIZE = 8;
const PAGE = 1;

export function OnlineAssistanceList() {
  const [currentPage, setCurrentPage] = useState<number>(PAGE);
  const [filterQuery, setFilterQuery] = useState<string>('');
  const [openModal, setOpenModal] = useState(false);
  const [videoFile, setVideoFile] = useState<{
    loading?: boolean;
    file?: any;
  } | null>(null);

  const userPermissions = useUserPermission();

  const handleOnClickRow: OnClickActionsType<OnlineAssistanceModel> = async (
    action,
    row
  ) => {
    if (action === 'button') {
      setOpenModal(true);
      setVideoFile({ loading: true });

      await API_KNOWLEDGE_MANAGEMENT(row?.id as string)
        .then((res) => {
          const blob = new Blob([res.data], { type: 'video/mp4' });
          const videoURL = URL.createObjectURL(blob);
          setVideoFile({ loading: false, file: videoURL });
        })
        .catch((err) => {
          setOpenModal(false);
          toast.error(
            err.message ?? 'error on get video of knowledge management'
          );
        });
    }
  };

  const endpoint = createAPIEndpoint({
    endPoint: E_USERS_ONLINE_ASSISTANCE,
    pageSize: PAGE_SIZE,
    currentPage,
    filterQuery,
  });

  const { data, isLoading } = useSWR<
    IResponsePagination<OnlineAssistanceModel>
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

  const listDaas = data?.data?.results ?? [];
  const countPage = data?.data?.count || 0;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginationProps = {
    countPage,
    currentPage,
    totalPages: Math.ceil(countPage / PAGE_SIZE),
    onPageChange: handlePageChange,
  };

  const searchBarProps: TSearchBar = {
    name: 'search-users-daas-list',
    value: filterQuery,
    handleSearchInput: handleFilterChange,
  };

  return (
    <div className={`w-full p-4  ${isLoading ? 'loading' : ''}`}>
      <BaseTable
        loading={isLoading}
        bodyList={listDaas}
        headers={checkPermissionHeaderItem(
          userPermissions,
          onlineAssistanceHeaderItem
        )}
        onClick={handleOnClickRow}
        pagination={paginationProps}
        searchBar={searchBarProps}
      />
      <Modal
        open={openModal}
        setOpen={setOpenModal}
        content={
          <LoadingWrapper isLoading={videoFile?.loading}>
            <div className="w-full">
              <IconButton
                icon="ph:x"
                className="flex self-end"
                size="xl"
                onClick={() => setOpenModal(false)}
              />
              {videoFile?.file ? (
                <video width="750" height="500" controls>
                  <track kind="captions" />
                  <source src={videoFile.file} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <NoResult />
              )}
            </div>
          </LoadingWrapper>
        }
        type="none"
      />
    </div>
  );
}
