import { useState } from 'react';
import { LoadingSpinner } from '@ui/molecules/Loading';

import { Modal } from '@ui/molecules/Modal';

import useSWR from 'swr';
import { E_USERS_GROUPS } from '@src/services/users/endpoint';
import { http } from '@src/services/http';
import { IResponseData } from '@src/types/services';
import { GroupModal } from './GroupModal';
import { GroupCardEdit } from './GroupCardEdit';
import { GroupCardAdd } from './GroupCardAdd';
import { TGroupList, TGroupModal } from './type';

export function GroupManagement() {
  const [openGroupModal, setOpenGroupModal] = useState<TGroupModal>({
    open: false,
  });

  const { data, isLoading, mutate } = useSWR<IResponseData<TGroupList[]>>(
    E_USERS_GROUPS,
    http.fetcherSWR
  );

  const groupData = data?.data ?? [];

  const handleOnClickAddCard = (): any => {
    setOpenGroupModal({ open: true });
  };

  const handleOnClickEditCard = (groupList: any): any => {
    setOpenGroupModal({ open: true, groupList });
  };

  const handleToggleModal = () => {
    setOpenGroupModal({ open: !openGroupModal.open });
  };

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <>
      <div className="flex flex-wrap gap-5 my-4">
        {groupData.map((item) => (
          <GroupCardEdit
            key={item.id}
            name={item.name}
            image={item?.image}
            onClickActions={() => handleOnClickEditCard(item)}
          />
        ))}

        <GroupCardAdd onClickActions={handleOnClickAddCard} />
      </div>
      <Modal
        open={openGroupModal.open}
        type="none"
        setOpen={handleToggleModal}
        content={
          <GroupModal
            mutate={mutate}
            handleClose={handleToggleModal}
            groupList={openGroupModal.groupList}
          />
        }
      />
    </>
  );
}
