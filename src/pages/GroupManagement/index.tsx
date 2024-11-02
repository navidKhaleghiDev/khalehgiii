import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { LoadingSpinner } from '@ui/molecules/Loading';
// import { Modal } from '@ui/molecules/Modal';
import useSWR from 'swr';
import { E_USERS_GROUPS } from '@src/services/users/endpoint';
import { http } from '@src/services/http';
import { TGroup } from '@src/services/users/types';
import { IResponseData } from '@src/types/services';

import { GroupCard } from '@redesignUi/molecules/Cards/GroupCard';
import { Pagination } from '@redesignUi/molecules/Pagination';
import { createAPIEndpoint } from '@src/helper/utils';
import FilterTableList from '@redesignUi/Templates/FilterTableLIst';
import { UsersInfoCard } from '@redesignUi/molecules/Cards/UsersInfoCard';
import UsersThree from '@iconify-icons/ph/users-three';
import userIcon from '@iconify-icons/ph/user';
import WifiHigh from '@iconify-icons/ph/wifi-high';
// import { GroupModal } from '../Dashboard/GroupManagement/GroupModal';

const PAGE_SIZE = 10;
const PAGE = 1;

export function GroupManagement() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [openModal, setOpenModal] = useState(false);
  const [groupSelected, setGroupSelected] = useState<TGroup | undefined>();
  const [currentPage, setCurrentPage] = useState<number>(PAGE);
  const [filterQuery, setFilterQuery] = useState<string>('');
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

  const groupData = data?.data ?? [];
  const countPage = 0;

  const handleOnClickEditCard = (group: TGroup) => {
    setOpenModal(true);
    setGroupSelected(group);
  };

  // const handleToggleModal = () => {
  //   setOpenModal(!openModal);
  // };
  // const handleCloseModal = () => {
  //   setOpenModal(false);
  //   setGroupSelected(undefined);
  // };

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <div className="flex flex-col gap-6 mt-20">
      <div className="flex gap-4 mb-20">
        <UsersInfoCard
          iconColor="neutral"
          icon={UsersThree}
          title={t('groupManagement.group')}
        />
        <UsersInfoCard
          iconColor="blue"
          icon={userIcon}
          title={t('groupManagement.users')}
        />
        <UsersInfoCard
          icon={WifiHigh}
          title={t('groupManagement.onlineUsers')}
        />
      </div>
      <FilterTableList
        buttonLabel={t('groupManagement.newGroup')}
        domainFilter
        searchQuery={filterQuery}
        sortFilter
        handelSearchQuery={(v) => setFilterQuery(v)}
      />
      <GroupCard
        onClick={(item: TGroup) => navigate(`${item.id}`)}
        groupData={groupData}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(countPage / PAGE_SIZE)}
        onPageChange={(page) => setCurrentPage(page)}
      />
      {/* <Modal
        open={openModal}
        type="none"
        setOpen={handleToggleModal}
        content={
          <GroupModal
            setGroupSelected={setGroupSelected}
            mutate={mutate}
            handleClose={handleCloseModal}
            group={groupSelected}
            loadingGroup={isLoading}
          />
        }
      /> */}
    </div>
  );
}
