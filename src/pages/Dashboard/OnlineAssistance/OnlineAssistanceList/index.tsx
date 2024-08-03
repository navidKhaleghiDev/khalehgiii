import { useCallback, useState } from 'react';
import { IDaAs, OnlineAssistanceModel } from '@src/services/users/types';
import useSWR from 'swr';
import { http } from '@src/services/http';
import { IResponsePagination } from '@src/types/services';
import {
  E_ONLINE_ASSISTANCE,
  E_USERS_DAAS,
} from '@src/services/users/endpoint';
import { createAPIEndpoint } from '@src/helper/utils';
import { debounce } from 'lodash';
import { BaseTable } from '@ui/atoms/BaseTable';
import { monitoringHeaderItem } from '@src/constants/tableHeaders/monitoringHeaderItem';
import { useNavigate } from 'react-router-dom';
import { TSearchBar } from '@ui/atoms/BaseTable/components/BaseTableSearchBar/types';
import { useUserPermission } from '@src/helper/hooks/usePermission';
import { checkPermissionHeaderItem } from '@ui/atoms/BaseTable/components/utils/CheckPermissionHeaderItem';
import { onlineAssistanceListDataMock } from '@src/pages/Dashboard/OnlineAssistance/OnlineAssistanceList/dataMock';
import { onlineAssistanceHeaderItem } from '@src/pages/Dashboard/OnlineAssistance/constants';
import {
  ActionOnClickActionsType,
  OnClickActionsType,
  TIdItem,
} from '@ui/atoms/BaseTable/types';
import { StringifyProperties } from '@src/types/global';
import { Modal } from '@ui/molecules/Modal';

const PAGE_SIZE = 8;
const PAGE = 1;

export function OnlineAssistanceList() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<number>(PAGE);
  const [filterQuery, setFilterQuery] = useState<string>('');
  const [openModal, setOpenModal] = useState(false);
  const [videoFile, setVideoFile] = useState<string | null>(null);

  const userPermissions = useUserPermission();

  const userHandler: OnClickActionsType<OnlineAssistanceModel> = (
    action,
    typeFile
  ) => {
    console.log({ action, typeFile });
  };

  const endpoint = createAPIEndpoint({
    endPoint: E_ONLINE_ASSISTANCE,
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

  const listDaas = onlineAssistanceListDataMock ?? [];
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
        onClick={userHandler}
        pagination={paginationProps}
        searchBar={searchBarProps}
      />
      <Modal
        open={openModal}
        setOpen={setOpenModal}
        content={
          <div>
            {videoFile && (
              <video width="750" height="500" controls>
                <track kind="captions" />
                <source src={videoFile} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        }
        type="none"
      />
    </div>
  );
}
