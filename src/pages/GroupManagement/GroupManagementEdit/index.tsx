import { useCallback, useEffect, useMemo, useState } from 'react';
import PhUserCirclePlus from '@iconify-icons/ph/user-circle-plus';
import { useTranslation } from 'react-i18next';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { http } from '@src/services/http';
import { USERS_GROUPS_GET } from '@src/services/users/endpoint';
import { IResponseData } from '@src/types/services';
import useSWR from 'swr';
import { useParams } from 'react-router-dom';
import { Typography } from '@redesignUi/atoms';
import { TGroupUpdate } from '@src/pages/Dashboard/GroupManagement/GroupModal/types';
import { Modal } from '@redesignUi/molecules/Modal';
import { API_USERS_GROUPS_UPDATE } from '@src/services/users';
import { GroupManagementEditForm } from './GroupManagementEditForm';
import { TGroup, TGroupMembers } from '../types';
import { GroupManagementAddNewMember } from './components/GroupManagementAddNewMember';

const PAGE_SIZE = 5;
const PAGE = 1;
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
export function GroupManagementEdit() {
  const { id } = useParams();
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState<number>(PAGE);
  const [filterQuery, setFilterQuery] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [updateGroup, setUpdateGroup] = useState<TGroup>(() => ({
    id: undefined,
    users: [],
    admins: [],
    name: '',
    created_at: undefined,
    updated_at: undefined,
    image: undefined,
  }));

  const { data, isLoading, mutate } = useSWR<IResponseData<TGroup[]>>(
    id ? USERS_GROUPS_GET(id) : null,
    http.fetcherSWR
  );
  const group: TGroup = useMemo(
    () =>
      (data?.data as unknown as TGroup) ??
      ({
        users: [],
        admins: [],
        name: '',
        image: undefined,
      } as TGroup),
    [data]
  );
  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<TGroupUpdate>({
    mode: 'onChange',
    defaultValues: {
      image: group?.image || '',
      name: group?.name || '',
    },
  });
  useEffect(() => {
    if (group) {
      setUpdateGroup(group);
    }
  }, [group]);

  useEffect(() => {
    reset({
      name: updateGroup.name,
    });
  }, [reset, updateGroup]);

  const paginatedData = useCallback(
    (key: keyof TGroup) => {
      const fullData: TGroupMembers[] = Array.isArray(updateGroup[key])
        ? (updateGroup[key] as TGroupMembers[])
        : [];
      const updatedDataByLabel = fullData.map((g) => {
        return { ...g, value: key };
      });
      const allFilteredData = updatedDataByLabel.filter((item) =>
        item.email.toLowerCase().includes(filterQuery.toLowerCase())
      );
      const startIndex = (currentPage - 1) * PAGE_SIZE;
      const endIndex = startIndex + PAGE_SIZE;
      if (filterQuery) {
        return allFilteredData.length > PAGE_SIZE
          ? allFilteredData.slice(startIndex, endIndex)
          : allFilteredData;
      }
      return updatedDataByLabel.slice(startIndex, endIndex);
    },
    [updateGroup, filterQuery, currentPage]
  );

  const handleClickAction = useCallback(
    (action: 'users' | 'admins' | 'delete', row: TGroupMembers) => {
      const alternateAction: 'users' | 'admins' =
        action === 'users' ? 'admins' : 'users';

      const key = row.value as 'users' | 'admins';
      if (!updateGroup) return;

      if (updateGroup[alternateAction].length === 1) return;

      if (action === 'users' || action === 'admins') {
        const existsInAction = updateGroup[action].some((m) => m.id === row.id);
        if (existsInAction) return;

        const updatedMember = updateGroup[alternateAction].filter(
          (m) => m.id !== row.id
        );

        setUpdateGroup((prev) => ({
          ...prev,
          [alternateAction]: updatedMember,
          [action]: [row, ...prev[action]],
        }));
      } else if (action === 'delete') {
        if (updateGroup[key].length === 1) return;

        const updateAndRemovedData = updateGroup[key].filter(
          (item) => item.id !== row.id
        );

        setUpdateGroup((prev) => ({
          ...prev,
          [key]: updateAndRemovedData,
        }));
      }
    },
    [updateGroup]
  );

  const onSubmit: SubmitHandler<TGroupUpdate> = (listData) => {
    setUpdateGroup((prev) => {
      return { ...prev, ...listData };
    });
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    mutate();
    setOpenEditModal(false);
  };

  const handleUpdateGroup = async (updatedGroup: any) => {
    console.log(updatedGroup);
    if (!updatedGroup) return;
    setLoading(true);
    await API_USERS_GROUPS_UPDATE(buildFormData(updatedGroup), id as string)
      .then(() => {
        toast.success(t('global.successfullyAdded'));
        handleCloseModal();
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

  const handleAddNewMember = (list: any) => {
    setUpdateGroup((prev) => {
      const updatedGroup = {
        ...prev,
        users: [...(prev.users || []), ...(list.users || [])],
        admins: [...(prev.admins || []), ...(list.admins || [])],
      };

      handleUpdateGroup(updatedGroup);

      return updatedGroup;
    });
  };
  return (
    <div>
      <Typography variant="body2B" color="black" className="mb-5">
        {t('groupManagement.editGroup')}
      </Typography>
      <GroupManagementEditForm
        setFilterQuery={setFilterQuery}
        filterQuery={filterQuery}
        paginatedData={paginatedData}
        setCurrentPage={setCurrentPage}
        handleClickAction={handleClickAction}
        isLoading={isLoading}
        currentPage={currentPage}
        allGroupData={group}
        group={updateGroup}
        control={control}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        isDirty={isDirty}
        setOpenEditModal={setOpenEditModal}
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
