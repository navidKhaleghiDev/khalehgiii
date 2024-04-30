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

  const handleOnClickAddCard = (): any => {
    setOpenGroupModal({ open: true });
  };

  const handleOnClickEditCard = (groupId: string): any => {
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
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
          <GroupCardEdit
            key={item}
            title="Developer"
            // img="/not-found.jpg"
            listCount={2}
            onClickActions={() => handleOnClickEditCard('1')}
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
