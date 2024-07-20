import { useState } from 'react';
import { LoadingSpinner } from '@ui/molecules/Loading';

import { Modal } from '@ui/molecules/Modal';

import useSWR from 'swr';
import { E_USERS_GROUPS } from '@src/services/users/endpoint';
import { http } from '@src/services/http';
import { IResponsePagination } from '@src/types/services';
import { IDaAs } from '@src/services/users/types';
import { GroupModal } from './GroupModal';
import { GroupCardEdit } from './GroupCardEdit';
import { GroupCardAdd } from './GroupCardAdd';

type TModal = {
  open: boolean;
  groupId?: string;
};
export function GroupManagement() {
  const [openGroupModal, setOpenGroupModal] = useState<TModal>({
    open: false,
  });

  const { data, isLoading } = useSWR<IResponsePagination<IDaAs>>(
    E_USERS_GROUPS,
    http.fetcherSWR
  );

  const groupData = data?.data ?? [];
  console.log(groupData);

  const handleOnClickAddCard = (): any => {
    setOpenGroupModal({ open: true });
  };

  const handleOnClickEditCard = (groupId: string): any => {
    console.log(groupId);
    setOpenGroupModal({ open: true, groupId });
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
            title={item.title}
            img={item.img}
            listCount={item.listCount}
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
            handleClose={handleToggleModal}
            groupId={openGroupModal.groupId}
          />
        }
      />
    </>
  );
}
