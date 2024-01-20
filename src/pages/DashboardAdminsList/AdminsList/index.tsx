/* eslint-disable react/jsx-no-bind */
import { IconButton } from '@ui/atoms/BaseButton';
import plusIcon from '@iconify-icons/ph/plus';
import { useCallback, useState } from 'react';
import useSWR from 'swr';
import { IResponsePagination } from '@src/types/services';
import { http } from '@src/services/http';
import { LoadingSpinner } from '@ui/molecules/Loading';
import { StringifyProperties } from '@src/types/global';
import Pagination from '@ui/molecules/Pagination';
import { Modal } from '@ui/molecules/Modal';
import { toast } from 'react-toastify';
import ToolTip from '@ui/atoms/Tooltip';
import { SearchInput } from '@ui/atoms/Inputs/SearchInput';
import { E_USERS } from '@src/services/users/endpoint';
import { IUser } from '@src/services/users/types';
import { createAPIEndpoint } from '@src/helper/utils';
import { debounce } from 'lodash';
import { API_USERS_DELETE } from '@src/services/users';
import { useTranslation } from 'react-i18next';
import { BaseTable } from '@ui/atoms/BaseTable';
import { adminListHeaderItem } from '@src/constants/tableHeaders/ adminListHeaderItem';
import { UpdateAdminModal } from './UpdateAdminModal';
import { ActionOnClickActionsType } from './UserAdminCard/types';

const PAGE_SIZE = 10;
const PAGE = 1;

export function AdminsList() {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState<number>(PAGE);
  const [filterQuery, setFilterQuery] = useState<string>('');
  const [activeAdmin, setActiveAdmin] = useState<Partial<IUser>>();
  const [deleteModal, setDeleteModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [loadingButtonModal, setLoadingButtonModal] = useState(false);

  const endpoint = createAPIEndpoint({
    endPoint: E_USERS,
    pageSize: PAGE_SIZE,
    currentPage,
    filterQuery,
  });

  const { data, isLoading, mutate } = useSWR<IResponsePagination<IUser>>(
    endpoint,
    http.fetcherSWR
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

    await API_USERS_DELETE(activeAdmin?.id as number)
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

  function handleOnClickActions(
    action: ActionOnClickActionsType,
    fileType?: StringifyProperties<IUser> | IUser
  ): any {
    setActiveAdmin(fileType as IUser);

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
          name="search-admin-list"
          value={filterQuery}
          onChange={handleFilterChange}
          className="w-1/4"
        />
        <ToolTip tooltip={t('table.addNewAdmin')} position="right">
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
        bodyList={listWhiteList}
        headers={adminListHeaderItem}
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
          <UpdateAdminModal
            handleClose={handleCloseUpdateModal}
            admin={activeAdmin}
          />
        }
      />
    </div>
  );
}
