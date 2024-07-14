import { useState } from 'react';
import { LoadingSpinner } from '@ui/molecules/Loading';

// import { useTranslation } from 'react-i18next';
import { Modal } from '@ui/molecules/Modal';

import { GroupCardEdit } from './GroupCardEdit';
import { GroupCardAdd } from './GroupCardAdd';
import { GroupModal } from './GroupModal';

type TModal = {
  open: boolean;
  groupId?: string;
};
export function GroupManagement() {
  // { user }: { user: IUser | null }
  // const { t } = useTranslation();
  // const [loadingButton, setLoadingButton] = useState(false);
  const [loading] = useState(true);
  const [openGroupModal, setOpenGroupModal] = useState<TModal>({
    open: false,
  });
  // const [isAdd, setIsAdd] = useState(false);

  // const [loadingButtonModal, setLoadingButtonModal] = useState(false);
  // const [malwereData, setMalwereData] = useState({ action: '', data: '' });

  // const {
  //   data: listData,
  //   isLoading,
  //   mutate,
  // } = useSWR('/analyze/scanners_config/', HTTP_ANALYSES.fetcherSWR);

  const groups = [
    {
      id: '1',
      title: 'Developer',
      img: '',
      listCount: 5,
    },
    {
      id: '2',
      title: 'Media',
      img: '',
      listCount: 7,
    },
    {
      id: '3',
      title: 'It',
      img: '',
      listCount: 10,
    },
    {
      id: '4',
      title: 'Finance',
      img: '',
      listCount: 9,
    },
  ];

  const handleOnClickAddCard = (): any => {
    setOpenGroupModal({ open: true });
  };

  const handleOnClickEditCard = (groupId: string): any => {
    // having api call  by id to get the group data

    setOpenGroupModal({ open: true, groupId });
  };

  const handleToggleModal = () => {
    setOpenGroupModal({ open: !openGroupModal.open });
  };

  return !loading ? (
    <LoadingSpinner />
  ) : (
    <>
      <div className="flex flex-wrap gap-5 my-4">
        {groups.map((item) => (
          <GroupCardEdit
            key={item.id}
            title={item.title}
            img={item.img}
            listCount={item.listCount}
            onClickActions={() => handleOnClickEditCard(item.id)}
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
