import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SubmitHandler, useForm } from 'react-hook-form';
import { http } from '@src/services/http';
import { USERS_GROUPS_GET } from '@src/services/users/endpoint';
import { IResponseData } from '@src/types/services';
import useSWR from 'swr';
import { useParams } from 'react-router-dom';
import { Typography } from '@redesignUi/atoms';
import { TGroupUpdate } from '@src/pages/Dashboard/GroupManagement/GroupModal/types';
import { Modal } from '@redesignUi/molecules/Modal';
import { API_USERS_GROUPS_UPDATE } from '@src/services/users';
import { toast } from 'react-toastify';
import { GroupManagementEditForm } from './GroupManagementEditForm';
import { DefaultValueForm, TGroup, TGroupMembers } from '../types';

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
  const [updateGroup, setUpdateGroup] = useState<TGroup[]>([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { data, isLoading, mutate } = useSWR<IResponseData<TGroup[]>>(
    id ? USERS_GROUPS_GET(id) : null,
    http.fetcherSWR
  );
  const group = useMemo(() => data?.data ?? [], [data]);
  const {
    control,
    handleSubmit,
    getValues,
    formState: { isDirty },
  } = useForm<DefaultValueForm>({
    mode: 'onChange',
    defaultValues: {
      image: updateGroup?.image,
      name: updateGroup?.name,
    },
  });
  useEffect(() => {
    if (group) setUpdateGroup(group);
  }, [group]);
  const paginatedData = useCallback(
    (key: keyof TGroup) => {
      const fullData: TGroupMembers[] = updateGroup[key] || [];
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
    (action, row) => {
      if (action === 'users' || action === 'admins') {
        const alternateAction = action === 'users' ? 'admins' : 'users';
        if (!updateGroup) return;
        const existsInAction = updateGroup[action].some((m) => m.id === row.id);
        if (existsInAction) return;
        const updatedMember = updateGroup[alternateAction].filter(
          (m) => m.id !== row.id
        );
        setUpdateGroup((prev) => {
          return {
            ...prev,
            [alternateAction]: updatedMember,
            [action]: [row, ...prev[action]],
          };
        });
      } else if (action === 'delete') {
        const key = row.value;
        const updateAndRemovedData = updateGroup[key].filter(
          (item) => item.id !== row.id
        );
        setUpdateGroup((prev) => {
          return { ...prev, [key]: updateAndRemovedData };
        });
      }
    },
    [updateGroup]
  );
  const handleUpdateGroup = async () => {
    if (!updateGroup) return;
    setLoading(true);
    await API_USERS_GROUPS_UPDATE(buildFormData(updateGroup), updateGroup?.id)
      .then(() => {
        toast.success(t('global.successfullyAdded'));
        mutate();

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
  const onSubmit: SubmitHandler<TGroupUpdate> = (listData) => {
    setUpdateGroup((prev) => {
      return { ...prev, name: listData.name, image: getValues('image') };
    });
    setOpenModal(true);
  };

  return (
    <div>
      <Typography variant="body2B" color="black" className="my-5">
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
      />
      <Modal
        open={openModal}
        setOpen={setOpenModal}
        type="noneIcon"
        title={t('global.sureAboutThis')}
        buttonOne={{
          loading,
          label: t('global.yes'),
          onClick: handleUpdateGroup,
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
