import { useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { IconButton } from '@ui/atoms/BaseButton';
import { Typography } from '@ui/atoms';
import { Modal } from '@ui/molecules/Modal';
import { PermissionGroupManagement } from '@src/types/permissions';
import {
  API_USERS_GROUPS_CREATE,
  API_USERS_GROUPS_UPDATE,
} from '@src/services/users';
import { GroupParams } from '@src/services/users/types';
import {
  GroupModalProps,
  GroupUpdateNU,
} from '@src/pages/NotUsed/GroupManagement/GroupModal/types';
import {
  checkPermission,
  useUserPermission,
} from '@src/helper/hooks/usePermission';
import { GroupModalForm } from './GroupModalForm';

/**
 * `GroupModal` component is used for creating or editing a user group. It includes a form
 * and handles the submission logic for both creating a new group and updating an existing one.
 *
 * @component
 * @param {GroupModalProps} props - The props for the component.
 *
 * @returns {JSX.Element} The rendered component.
 *
 * @example
 * return (
 *   <GroupModal
 *     handleClose={handleCloseFunction}
 *     group={groupData}
 *     mutate={mutateFunction}
 *     loadingGroup={false}
 *     setGroupSelected={setGroupSelectedFunction}
 *   />
 * );
 */
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
  const [updatedData, setUpdatedData] = useState<GroupUpdateNU | undefined>(
    undefined
  );

  const GroupManagementChange = checkPermission(
    userPermissions,
    PermissionGroupManagement.CHANGE
  );

  /**
   * Builds the `FormData` object from the provided group data, including the name, image, users, and admins.
   *
   * @param {GroupUpdateNU} data - The data to be included in the form.
   * @returns {FormData} The constructed `FormData` object.
   */
  const buildFormData = (data: GroupUpdateNU) => {
    const formData = new FormData();
    formData.append('name', data.name);
    if (data.image === '' || data.image instanceof Blob) {
      formData.append('image', data?.image);
    }
    data.users.forEach((user) => formData.append('users', user.id));
    data.admins.forEach((admin) => formData.append('admins', admin.id));
    return formData;
  };

  /**
   * Creates a new group by calling the relevant API and then triggers a re-fetch of the group data.
   *
   * @param {GroupParams} list - The group data to be created.
   */
  const createGroup = async (list: GroupParams) => {
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

  /**
   * Updates an existing group by calling the relevant API and then triggers a re-fetch of the group data.
   */
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
