import { SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';

import { E_USERS_GROUPS } from '@src/services/users/endpoint';
import { http } from '@src/services/http';
import { TGroup } from '@src/services/users/types';
import { IResponseData } from '@src/types/services';
import { GroupCard } from '@redesignUi/molecules/Cards/GroupCard';
import { Pagination } from '@redesignUi/molecules/Pagination';
import { createAPIEndpoint } from '@src/helper/utils';
import { UsersInfoCard } from '@redesignUi/molecules/Cards/UsersInfoCard';
import { LoadingSpinner } from '@redesignUi/molecules/Loading';
import UsersThree from '@iconify-icons/ph/users-three';
import PhUserCirclePlus from '@iconify-icons/ph/user-circle-plus';
import { Typography } from '@redesignUi/atoms';
import { API_DELETE_GROUP } from '@src/services/users';
import { FilterTableList } from '@redesignUi/Templates/FilterTableLIst';
import { toast } from 'react-toastify';
import { Modal } from '@redesignUi/molecules/Modal';

import { GroupManagementCreate } from './GroupManagementCreate';

const PAGE_SIZE = 10;
const PAGE = 1;

export function GroupManagement() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState<number>(PAGE);
  const [filterQuery, setFilterQuery] = useState<string>('');
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [groupIdToDelete, setGroupIdToDelete] = useState<string | null>(null);
  const endpoint = createAPIEndpoint({
    endPoint: E_USERS_GROUPS,
    pageSize: PAGE_SIZE,
    currentPage,
    filterQuery,
  });

  const { data, isLoading, mutate } = useSWR<IResponseData<TGroup[]>>(
    endpoint,
    http.fetcherSWR
  );

  const updateGroup = async () => {
    if (!groupIdToDelete) return;

    setLoading(true);
    await API_DELETE_GROUP(groupIdToDelete)
      .then(() => {
        toast.success(t('global.successfullyRemoved'));
        mutate();
      })
      .catch((err) => {
        toast.error(err);
      })
      .finally(() => {
        setLoading(false);
        setOpenDeleteModal(false);
        setGroupIdToDelete(null);
      });
  };

  const handleRemoveGroup = (id: string) => {
    setGroupIdToDelete(id);
    setOpenDeleteModal(true);
  };

  const groupData = data?.data ?? [];
  const groupCount = data?.data.length;
  const countPage = 0;
  const handleCloseModal = () => {
    mutate();
    setOpenModal(false);
  };

  return (
    <div className="flex flex-col gap-6 ">
      {isLoading || loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="flex flex-col sm:gap-[1.87rem] gap-5">
            <Typography variant="body2B" color="black">
              {t('groupManagement.groupLists')}
            </Typography>
            <div className="gap-[1.87rem] lg:w-[21.875rem] sm:w-[15.938rem] w-40 lg:mb-[5.62rem] mb-2.5">
              <UsersInfoCard
                iconColor="neutral"
                icon={UsersThree}
                title={t('groupManagement.group')}
                count={groupCount}
              />
              {/* <UsersInfoCard
                iconColor="blue"
                icon={userIcon}
                title={t('groupManagement.users')}
                className="whitespace-nowrap"
              /> */}
            </div>
            <FilterTableList
              onClickButton={() => setOpenModal(true)}
              buttonLabel={t('groupManagement.newGroup')}
              searchPlaceholder={t('groupManagement.searchGroup')}
              searchQuery={filterQuery}
              handelSearchQuery={(v: SetStateAction<string>) =>
                setFilterQuery(v)
              }
            />
          </div>
          <GroupCard
            onClick={(item: TGroup) => navigate(`${item.id}`)}
            groupData={groupData}
            handleRemoveGroup={handleRemoveGroup}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(countPage / PAGE_SIZE)}
            onPageChange={(page) => setCurrentPage(page)}
          />
          <Modal
            size="lg"
            type="content"
            icon={PhUserCirclePlus}
            open={openModal}
            title={t('groupManagement.createGroup')}
            descriptionInfo={t('groupManagement.createTitle')}
            setOpen={setOpenModal}
            content={
              <GroupManagementCreate handleCloseModal={handleCloseModal} />
            }
          />
          <Modal
            open={openDeleteModal}
            setOpen={setOpenDeleteModal}
            type="error"
            title={t('global.sureAboutThis')}
            buttonOne={{
              label: t('global.yes'),
              onClick: updateGroup,
              loading,
            }}
            buttonTow={{
              label: t('global.no'),
              onClick: () => {
                setOpenDeleteModal(false);
                setGroupIdToDelete(null);
              },
              color: 'red',
            }}
          />
        </>
      )}
    </div>
  );
}
