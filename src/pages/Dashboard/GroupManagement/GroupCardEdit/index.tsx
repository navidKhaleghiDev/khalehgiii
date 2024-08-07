import { BaseIcon, Typography } from '@ui/atoms';
import { IconButton } from '@ui/atoms/BaseButton'; // Ensure IconButton and its type are imported
import { CardButton } from '@ui/atoms/Card/CardButton';
import xIcon from '@iconify-icons/ph/x';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { API_DELETE_GROUP } from '@src/services/users';
import { Modal } from '@ui/molecules/Modal';

type GroupCardEditProps = {
  name: string;
  image: string | undefined;
  id?: string;
  onClickActions?: () => void;
  mutate: any;
};

export function GroupCardEdit({
  name,
  id,
  image,
  onClickActions,
  mutate,
}: GroupCardEditProps) {
  const { t } = useTranslation();
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const updateGroup = async () => {
    if (!id) return;
    setLoading(true);
    await API_DELETE_GROUP(id)
      .then(() => {
        toast.success(t('global.successfullyRemoved'));
        setOpenModal(false);
        mutate();
      })
      .catch((err) => {
        toast.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleRemoveGroup = (e: React.SyntheticEvent<EventTarget>) => {
    e.stopPropagation();
    setOpenModal(true);
  };

  return (
    <CardButton
      shadow="lg"
      rounded="xl"
      className="relative w-36 p-3 flex justify-center items-center hover:bg-neutral-100 transition-colors duration-400 group"
      onClick={!loading && !openModal ? onClickActions : undefined}
    >
      <IconButton
        className=" absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-200 p-1 rounded  z-30 "
        icon={xIcon}
        color="redNoBg"
        size="xl"
        onClick={handleRemoveGroup as any}
      />
      <div className="flex flex-col items-center">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-20 h-20 rounded-full flex justify-center items-center"
          />
        ) : (
          <div className="w-20 h-20 bg-neutral-100 rounded-full flex justify-center items-center group-hover:bg-neutral-200 transition-colors duration-400">
            <BaseIcon icon="ph:users-three" size="xl" color="neutral" />
          </div>
        )}

        <Typography variant="body2" className="mt-3">
          {name}
        </Typography>
      </div>
      <Modal
        open={openModal}
        setOpen={setOpenModal}
        type="error"
        title={t('global.sureAboutThis')}
        buttonOne={{
          label: t('global.yes'),
          onClick: updateGroup,
          loading,
        }}
        buttonTow={{
          label: t('global.no'),
          onClick: () => setOpenModal(false),
          color: 'red',
        }}
      />
    </CardButton>
  );
}
