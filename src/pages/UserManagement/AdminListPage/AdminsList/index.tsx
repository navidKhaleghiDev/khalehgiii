import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import useSWR from 'swr';

import { IResponsePagination } from '@src/types/services';
import { http } from '@src/services/http';
import PhUserCirclePlus from '@iconify-icons/ph/user-circle-plus';
import PhPencilSimple from '@iconify-icons/ph/pencil-simple';
import { E_USERS } from '@src/services/users/endpoint';
import { IUser } from '@src/services/users/types';
import { createAPIEndpoint } from '@src/helper/utils';
import { API_USERS_DELETE } from '@src/services/users';
import { useUserPermission } from '@src/helper/hooks/usePermission';
import { Modal } from '@redesignUi/molecules/Modal';
import { checkPermissionHeaderItem } from '@redesignUi/molecules/BaseTable/components/utils/CheckPermissionHeaderItem';
import { OnClickActionsType } from '@redesignUi/molecules/BaseTable/types';
import { BaseTable } from '@redesignUi/molecules/BaseTable';
import { FilterTableList } from '@redesignUi/Templates/FilterTableLIst';
import { useWindowDimensions } from '@src/helper/hooks/useWindowDimensions';

import { UpdateAdminModal } from './UpdateAdminModal';
import { adminListHeaderItem } from './constants/ adminListHeaderItem';

const PAGE_SIZE = 6;
const PAGE = 1;

export function AdminsList() {
  const { t } = useTranslation();
  const windowsDimensions = useWindowDimensions();
  const [currentPage, setCurrentPage] = useState<number>(PAGE);
  const [filterQuery, setFilterQuery] = useState<string>('');
  const [activeAdmin, setActiveAdmin] = useState<Partial<IUser>>();
  const [deleteModal, setDeleteModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [loadingButtonModal, setLoadingButtonModal] = useState(false);
  const userPermissions = useUserPermission();

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

  const listWhiteList = data?.data?.results ?? [];
  const countPage = data?.data?.count || 0;
  const AllItems = data?.data?.count ?? 0;

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

  const handleOnClickActions: OnClickActionsType<IUser> | undefined = (
    action,
    fileType
  ) => {
    setActiveAdmin(fileType as IUser);

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
    allItems: AllItems,
    itemsPer: PAGE_SIZE,
    paginationLabel: t('header.admin'),
    totalPages: Math.ceil(countPage / PAGE_SIZE),
    onPageChange: handlePageChange,
  };

  return (
    <div className="w-full gap-[1.87rem] flex flex-col">
      <FilterTableList
        buttonLabel={t('adminList.newAdmin')}
        onClickButton={handleCreateAdmin}
        searchQuery={filterQuery}
        searchPlaceholder={t('adminList.adminSearch')}
        handelSearchQuery={setFilterQuery}
      />

      <BaseTable
        pagination={paginationProps}
        header={checkPermissionHeaderItem(userPermissions, adminListHeaderItem)}
        loading={isLoading}
        body={listWhiteList}
        onClick={handleOnClickActions}
        isMobile={windowsDimensions.width <= 768}
      />
      <Modal
        size="md"
        open={deleteModal}
        setOpen={setDeleteModal}
        type="error"
        title={t('global.remove')}
        description={t('global.sureAboutDeleteUser')}
        buttonOne={{
          label: t('table.delete'),
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
        size="lg"
        type="content"
        icon={activeAdmin ? PhPencilSimple : PhUserCirclePlus}
        open={openUpdateModal}
        title={
          activeAdmin
            ? t('adminList.editInformation')
            : t('adminList.createNewAdmin')
        }
        descriptionInfo={
          activeAdmin
            ? t('adminList.editInformationText')
            : t('adminList.createNewAdminText')
        }
        shouldCloseOnOutsideClick={false}
        setOpen={setOpenUpdateModal}
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