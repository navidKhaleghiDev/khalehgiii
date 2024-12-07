import { useState } from 'react';
import { LoadingSpinner } from '@ui/molecules/Loading';
import { Modal } from '@ui/molecules/Modal';
import useSWR from 'swr';
import { E_USERS_GROUPS } from '@src/services/users/endpoint';
import { http } from '@src/services/http';
import { GroupParams } from '@src/services/users/types';
import { ResponseData } from '@src/types/services';
import { PermissionGroupManagement } from '@src/types/permissions';
import {
  checkPermission,
  useUserPermission,
} from '@src/helper/hooks/usePermission';

import { GroupModal } from './GroupModal';
import { GroupCardEdit } from './GroupCardEdit';
import { GroupCardAdd } from './GroupCardAdd';

export function GroupManagement() {
  const [openModal, setOpenModal] = useState(false);
  const [groupSelected, setGroupSelected] = useState<GroupParams | undefined>();

  const userPermissions = useUserPermission();

  const { data, isLoading, mutate } = useSWR<ResponseData<GroupParams[]>>(
    E_USERS_GROUPS,
    http.fetcherSWR
  );
  const GroupManagementAdd = checkPermission(
    userPermissions,
    PermissionGroupManagement.ADD
  );

  const groupData = data?.data ?? [];

  const handleOnClickAddCard = (): any => {
    setOpenModal(true);
  };

  const handleOnClickEditCard = (group: GroupParams) => {
    setOpenModal(true);
    setGroupSelected(group);
  };

  const handleToggleModal = () => {
    setOpenModal(!openModal);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
    setGroupSelected(undefined);
  };

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <>
      <div className="flex flex-wrap gap-5 my-4">
        {groupData.map((item) => (
          <GroupCardEdit
            setGroupSelected={setGroupSelected}
            mutate={mutate}
            key={item.id}
            id={item.id}
            name={item.name}
            image={item?.image}
            onClickActions={() => handleOnClickEditCard(item)}
          />
        ))}

        {GroupManagementAdd ? (
          <GroupCardAdd onClickActions={handleOnClickAddCard} />
        ) : null}
      </div>
      <Modal
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
      />
    </>
  );
}
