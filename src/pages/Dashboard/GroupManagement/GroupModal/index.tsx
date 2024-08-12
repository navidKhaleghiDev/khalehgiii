import { useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { IconButton } from '@ui/atoms/BaseButton';
import { Typography } from '@ui/atoms';
import { Modal } from '@ui/molecules/Modal';
import { EPermissionGroupManagement } from '@src/types/permissions';
import {
  API_USERS_GROUPS_CREATE,
  API_USERS_GROUPS_UPDATE,
} from '@src/services/users';
import { TGroup } from '@src/services/users/types';
import {
  GroupModalProps,
  TGroupUpdate,
} from '@src/pages/Dashboard/GroupManagement/GroupModal/types';
import {
  checkPermission,
  useUserPermission,
} from '@src/helper/hooks/usePermission';
import { GroupModalForm } from './GroupModalForm';

export function GroupModal({
  handleClose,
  group,
  mutate,
  loadingGroup,
  setGroupSelected,
}: GroupModalProps) {
  const { t } = useTranslation();
  const userPermissions = useUserPermission();

  const [loading, setLoading] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [updatedData, setUpdatedData] = useState<TGroupUpdate | undefined>(
    undefined
  );

  const GroupManagementChange = checkPermission(
    userPermissions,
    EPermissionGroupManagement.CHANGE
  );

  const buildFormData = (data: TGroupUpdate) => {
    const formData = new FormData();
    formData.append('name', data.name);
    if (data.image === '' || data.image instanceof Blob) {
      formData.append('image', data?.image);
    }
    data.users.forEach((user) => formData.append('users', user.id));
    data.admins.forEach((admin) => formData.append('admins', admin.id));
    return formData;
  };

  const createGroup = async (list: TGroup) => {
    setLoading(true);
    await API_USERS_GROUPS_CREATE(list)
      .then(() => {
        toast.success(t('global.successfullyAdded'));
        mutate();
      })
      .catch((err) => {
        toast.error(err);
      })
      .finally(() => {
        setLoading(false);
        handleClose();
      });
  };

  const updateGroup = async () => {
    if (!group?.id || !updatedData) return;
    setLoading(true);
    await API_USERS_GROUPS_UPDATE(buildFormData(updatedData), group?.id)
      .then(() => {
        toast.success(t('global.successfullyAdded'));
        mutate();
        handleClose();
        setGroupSelected(undefined);
        setOpenModal(false);
      })
      .catch((err) => {
        toast.error(err);
      })
      .finally(() => {
        setOpenModal(false);
        setLoading(false);
      });
  };

  return (
    <div className="p-5 w-full flex flex-col items-center">
      <div className="w-full">
        <IconButton
          icon="ph:x"
          className="flex self-end"
          size="xl"
          onClick={handleClose}
        />
      </div>
      <Typography className=" -mt-8" variant="h4" color="teal">
        {t(`groupManagement.${group ? 'editGroup' : 'createGroup'}`)}
      </Typography>
      <GroupModalForm
        loading={loading}
        permissions={GroupManagementChange}
        updatedData={updatedData}
        setUpdatedData={setUpdatedData}
        buildFormData={buildFormData}
        loadingGroup={loadingGroup}
        setOpenModal={setOpenModal}
        createGroup={createGroup}
        group={group}
      />
      <Modal
        open={openModal}
        setOpen={setOpenModal}
        type="error"
        title={t('global.sureAboutThis')}
        buttonOne={{
          label: t('global.yes'),
          onClick: updateGroup,
        }}
        buttonTow={{
          label: t('global.no'),
          onClick: () => setOpenModal(false),
          color: 'red',
        }}
      />
    </div>
  );
}
