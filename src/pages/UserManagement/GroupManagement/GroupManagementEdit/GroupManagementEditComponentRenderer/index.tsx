import { useCallback, useState } from 'react';

import PhUserCirclePlus from '@iconify-icons/ph/user-circle-plus';
import { useTranslation } from 'react-i18next';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { Typography } from '@redesignUi/atoms';
import { Modal } from '@redesignUi/molecules/Modal';
import { API_USERS_GROUPS_UPDATE } from '@src/services/users';

import {
  GroupManagementEditRenderComponentsProps,
  GroupParams,
  GroupOnClickParams,
  GroupUpdate,
} from '../../types';
import { GroupManagementEditForm } from './GroupManagementEditForm';
import { GroupManagementAddNewMember } from '../components/GroupManagementAddNewMember';

const PAGE_SIZE = 5;
// const PAGE = 1;

const buildFormData = (data: GroupUpdate) => {
  const formData = new FormData();
  formData.append('name', data.name);
  if (data.image === '' || data.image instanceof Blob) {
    formData.append('image', data?.image);
  }
  data.users.forEach((user) => formData.append('users', user.id));
  data.admins.forEach((admin) => formData.append('admins', admin.id));
  return formData;
};

export function GroupManagementEditRenderComponents(
  props: GroupManagementEditRenderComponentsProps
) {
  const { updateGroup, setUpdateGroup, group } = props;

  const { id } = useParams();
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filterQuery, setFilterQuery] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { isDirty },
  } = useForm<GroupParams>({
    mode: 'onChange',
    defaultValues: {
      image: updateGroup?.image || '',
      name: updateGroup?.name || '',
    },
  });

  const handleClickAction = useCallback(
    (action: GroupOnClickParams['action'], row: GroupOnClickParams['row']) => {
      const alternateAction: 'users' | 'admins' =
        action === 'users' ? 'admins' : 'users';
      const key = row.value as 'users' | 'admins';

      if (!updateGroup || updateGroup[alternateAction].length === 1) return;

      if (action === 'delete') {
        const filteredMembers = updateGroup[key].filter(
          (item) => item.id !== row.id
        );
        setUpdateGroup((prev) => ({ ...prev, [key]: filteredMembers }));
      } else if (!updateGroup[action].some((m) => m.id === row.id)) {
        const updatedMembers = updateGroup[alternateAction].filter(
          (m) => m.id !== row.id
        );
        setUpdateGroup((prev: GroupParams) => ({
          ...prev,
          [alternateAction]: updatedMembers,
          [action]: [row, ...prev[action]],
        }));
      }
    },
    [setUpdateGroup, updateGroup]
  );

  const onSubmit: SubmitHandler<GroupParams> = (listData) => {
    setUpdateGroup((prev) => ({ ...prev, ...listData }));
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenEditModal(false);
  };

  const handleUpdateGroup = async (updatedGroup: any) => {
    const newGroupData = buildFormData(updatedGroup);

    setLoading(true);
    await API_USERS_GROUPS_UPDATE(newGroupData, id as string)
      .then(() => {
        toast.success(t('global.successfullyAdded'));
        handleCloseModal();
        setOpenModal(false);
      })
      .catch((err) => {
        toast.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleAddNewMember = (list: any) => {
    setUpdateGroup((prev) => {
      return {
        ...prev,
        users: [...updateGroup.users, ...list.users],
        admins: [...updateGroup.admins, ...list.admins],
      };
    });
    handleCloseModal();
  };

  return (
    <div>
      <Typography variant="body2B" color="black" className="mb-5">
        {t('groupManagement.editGroup')}
      </Typography>
      <GroupManagementEditForm
        updateGroup={updateGroup}
        setFilterQuery={setFilterQuery}
        filterQuery={filterQuery}
        setCurrentPage={setCurrentPage}
        handleClickAction={handleClickAction}
        isLoading={false}
        currentPage={currentPage}
        allGroupData={group}
        control={control}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        isDirty={isDirty}
        setOpenEditModal={setOpenEditModal}
        pageSize={PAGE_SIZE}
      />
      <Modal
        size="lg"
        type="content"
        icon={PhUserCirclePlus}
        open={openEditModal}
        title={t('groupManagement.addMember')}
        descriptionInfo={t('groupManagement.addMemberTitle')}
        setOpen={setOpenEditModal}
        content={
          <GroupManagementAddNewMember
            handleCloseModal={handleCloseModal}
            onClick={handleAddNewMember}
          />
        }
      />
      <Modal
        open={openModal}
        setOpen={setOpenModal}
        size="responsive"
        type="success"
        title={t('global.sureAboutThis')}
        buttonOne={{
          loading,
          label: t('global.save'),
          onClick: () => handleUpdateGroup(updateGroup),
        }}
        buttonTow={{
          label: t('global.cancel'),
          onClick: () => setOpenModal(false),
          color: 'tertiary',
        }}
      />
    </div>
  );
}
