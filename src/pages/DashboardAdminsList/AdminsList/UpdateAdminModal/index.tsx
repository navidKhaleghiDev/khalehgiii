import { useState } from 'react';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import { BaseButton, Typography } from '@redesignUi/atoms';
import { BaseTab, BaseTabs } from '@redesignUi/atoms/BaseTabs/BaseTabs';
import { IUser } from '@src/services/users/types';
import { useLanguage } from '@context/settings/languageContext';
import { API_CREATE_USER, API_UPDATE_USER } from '@src/services/users';
import { IResponseData } from '@src/types/services';
import { E_USERS_PERMISSION } from '@src/services/users/endpoint';
import { UserPermissionsProps } from '@src/types/permissions';
import { http } from '@src/services/http';

import { PermissionOptions } from '../PermissionOptions';
import { UserInfoTab } from './UserInfoTab';
import { UpdateAdminModalProps, UserProps } from './types';

export function UpdateAdminModal({
  handleClose,
  admin,
}: UpdateAdminModalProps) {
  const { t } = useTranslation();
  const { lang } = useLanguage();
  const [showConfirm, setShowConfirm] = useState(false);
  const [loadingButtonModal, setLoadingButtonModal] = useState(false);
  const [selectedPermissions, setSelectedPermissions] = useState(
    admin?.user_permissions || []
  );
  const [secret, setSecret] = useState<undefined | string>(undefined);

  const role = admin?.is_meta_admin ? 'true' : 'false';
  const dir = lang === 'fa' ? 'rtl' : 'ltr';
  const { data: permissionData, isLoading } = useSWR<
    IResponseData<UserPermissionsProps[]>
  >(E_USERS_PERMISSION, http.fetcherSWR);

  const { control, handleSubmit, watch, formState } = useForm<UserProps>({
    mode: 'onChange',
    defaultValues: {
      id: admin?.id,
      email: admin?.email,
      first_name: admin?.first_name ?? '',
      last_name: admin?.last_name ?? '',
      totp_enable: admin?.totp_enable,
      is_meta_admin: admin?.id ? role : 'false',
    },
  });

  const isMetaAdmin = watch('is_meta_admin');

  const permissions = permissionData?.data || [];
  const getSelectedIds = selectedPermissions.map((item) => item.id);
  const handleOnSubmit = async (data: UserProps) => {
    const updatedData = {
      user_permissions_ids: getSelectedIds,
      totp_secret: secret,
      ...data,
    };

    setLoadingButtonModal(true);

    if (data.id) {
      await API_UPDATE_USER(updatedData as IUser, data?.id as number)
        .then(() => {
          toast.success(t('global.sucessfulyUpdated'));
          handleClose(true);
        })
        .catch((err) => {
          toast.error(err);
          setShowConfirm(false);
        })
        .finally(() => {
          setLoadingButtonModal(false);
        });
      return;
    }

    await API_CREATE_USER(updatedData as IUser)
      .then(() => {
        toast.success(t('global.successfullyAdded'));
        handleClose(true);
      })
      .catch((err) => {
        toast.error(err);
        setShowConfirm(false);
      })
      .finally(() => {
        setLoadingButtonModal(false);
      });
  };

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)} className="w-full">
      <BaseTabs>
        <BaseTab label={t('adminList.adminInfo')}>
          <UserInfoTab
            control={control}
            dir={dir}
            admin={admin}
            isMetaAdmin={isMetaAdmin}
            secret={secret}
            setSecret={setSecret}
          />
        </BaseTab>
        <BaseTab label={t('global.accessList')}>
          <PermissionOptions
            loading={isLoading}
            permissions={permissions}
            selectedPermissions={selectedPermissions}
            setSelectedPermissions={setSelectedPermissions}
          />
        </BaseTab>
      </BaseTabs>

      <div className="flex justify-center mt-4">
        {showConfirm ? (
          <div className="flex items-center">
            <Typography color="black">{t('global.areYouSure')}</Typography>
            <BaseButton
              label={t('global.yes')}
              size="sm"
              submit
              className="mx-2"
              loading={loadingButtonModal}
            />
            <BaseButton
              label={t('global.no')}
              size="sm"
              type="neutral"
              className="mx-2"
              onClick={() => setShowConfirm(false)}
            />
          </div>
        ) : (
          <div className="flex gap-2.5">
            <BaseButton
              label={t('global.save')}
              className="sm:w-[11.87rem] w-[5.93rem] whitespace-nowrap p-2"
              loading={loadingButtonModal}
              onClick={() => setShowConfirm(true)}
              disabled={!formState.isDirty}
            />
            <BaseButton
              label={t('global.cancel')}
              type="neutral"
              className="sm:w-[11.87rem] w-[5.93rem]"
              onClick={() => handleClose(false)}
            />
          </div>
        )}
      </div>
    </form>
  );
}
