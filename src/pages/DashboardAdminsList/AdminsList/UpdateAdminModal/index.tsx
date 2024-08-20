import { BaseButton } from '@ui/atoms/BaseButton';
import { BaseInput, Typography } from '@ui/atoms';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { BaseSwitch } from '@ui/atoms/Inputs/BaseSwitch';
import { regexPattern } from '@ui/atoms/Inputs';
import { toast } from 'react-toastify';
import { IUser } from '@src/services/users/types';
import { API_UPDATE_USER, API_CREATE_USER } from '@src/services/users';
import { PasswordInput } from '@ui/atoms/Inputs/PasswordInput';
import { useTranslation } from 'react-i18next';
import BaseQrCode from '@ui/atoms/BaseQrCode';
import { BaseTab, BaseTabs } from '@ui/atoms/BaseTabs';
import useSWR from 'swr';
import { E_USERS_PERMISSION } from '@src/services/users/endpoint';
import { http } from '@src/services/http';
import { PermissionOptions } from '../PermissionOptions';

type PropsType = {
  handleClose: (isUpdated?: boolean) => void;
  admin?: Partial<IUser>;
};

export function UpdateAdminModal({ handleClose, admin }: PropsType) {
  const { t } = useTranslation();
  const [showConfirm, setShowConfirm] = useState(false);
  const [loadingButtonModal, setLoadingButtonModal] = useState(false);
  const [selectedSwitches, setSelectedSwitches] = useState(
    admin?.user_permissions || []
  );

  const { data: permissionData, isLoading } = useSWR(
    E_USERS_PERMISSION,
    http.fetcherSWR
  );

  const { control, handleSubmit } = useForm<IUser>({
    mode: 'onChange',
    defaultValues: {
      id: admin?.id,
      email: admin?.email,
      username: admin?.username,
      first_name: admin?.first_name ?? '',
      last_name: admin?.last_name ?? '',
      is_meta_admin: admin?.is_meta_admin ?? false,
      totp_enable: admin?.totp_enable ?? false,
    },
  });

  const permissions = permissionData?.data || [];
  const getSelectedIds = selectedSwitches.map((item) => item.id);

  const handleOnSubmit = async (data: IUser) => {
    const updatedData = { user_permissions_ids: getSelectedIds, ...data };
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

    await API_CREATE_USER(updatedData)
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
    <form className="my-6 px-4" onSubmit={handleSubmit(handleOnSubmit)}>
      <BaseTabs>
        <BaseTab label={t('global.userInfo')}>
          <div className="px-2 col-span-6 flex justify-between items-start w-full gap-2">
            <BaseInput
              control={control}
              name="first_name"
              id="first_name"
              label={t('global.name')}
              placeholder={t('global.name')}
              fullWidth
              maxLength={60}
              rules={{
                pattern: regexPattern.farsiLetter,
                required: regexPattern.required,
              }}
            />
            <BaseInput
              control={control}
              name="last_name"
              id="last_name"
              placeholder={t('global.lastName')}
              label={t('global.lastName')}
              fullWidth
              maxLength={60}
              rules={{
                pattern: regexPattern.farsiLetter,
                required: regexPattern.required,
              }}
            />
          </div>
          <div className="px-2 col-span-3 flex justify-between items-start w-full gap-2">
            <BaseInput
              control={control}
              name="username"
              id="username"
              placeholder="username"
              label={t('global.userName')}
              fullWidth
              maxLength={60}
              rules={{
                pattern: regexPattern.enUsername,
                required: regexPattern.required,
              }}
            />
            {!admin?.id && (
              <PasswordInput
                label={t('global.password')}
                name="password"
                control={control}
                placeholder={t('global.repeatNewPassword')}
                rules={{
                  pattern: regexPattern.enCharAndNumber,
                  required: regexPattern.required,
                }}
              />
            )}
          </div>
          <div className="px-2 col-span-3 flex justify-between items-start w-full gap-2 flex-wrap">
            <BaseInput
              control={control}
              name="email"
              id="email"
              label={t('global.email')}
              placeholder="email@email.com"
              fullWidth
              maxLength={60}
              rules={{
                pattern: regexPattern.email,
                required: regexPattern.required,
              }}
            />
          </div>

          {admin?.id && (
            <div className="px-2 col-span-6 flex justify-center items-center w-full mb-4 border border-gray-500 rounded-md p-2  ">
              <div className="w-2/6  flex-col justify-center">
                <div className="w-6/6 flex justify-between items-center mt-2">
                  <Typography className="mb-1" type="h4" color="teal">
                    {`${t('global.metaAdmin')}:`}
                  </Typography>
                  <BaseSwitch control={control} name="is_meta_admin" />
                </div>
                <div className="w-6/6 flex justify-between items-center mt-2">
                  <Typography className="mb-1" type="h4" color="teal">
                    {`${t('global.activateOtp')}:`}
                  </Typography>
                  <BaseSwitch control={control} name="totp_enable" />
                </div>
              </div>
              <div className="w-3/6  flex justify-center">
                <BaseQrCode
                  email={admin?.email}
                  defaultValue={admin?.totp_secret}
                />
              </div>
            </div>
          )}
          <Typography
            className="px-2 col-span-6 flex justify-start"
            color="red"
          >
            {t('title.systemAdminDescription1')}
          </Typography>

          <Typography
            className="px-2 col-span-6 flex justify-start"
            color="red"
          >
            {t('title.systemAdminDescription2')}
          </Typography>
        </BaseTab>
        <BaseTab label={t('global.accessList')}>
          <PermissionOptions
            loading={isLoading}
            permissions={permissions}
            setSelectedSwitches={setSelectedSwitches}
            selectedSwitches={selectedSwitches as []}
          />
        </BaseTab>
      </BaseTabs>
      <div className="flex justify-center col-span-6 mt-4">
        {showConfirm && (
          <div className="flex justify-center items-center w-full">
            <Typography className="mx-2">{t('global.areYouSure')}</Typography>
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
              type="red"
              className="mx-2"
              onClick={() => setShowConfirm(false)}
            />
          </div>
        )}

        {!showConfirm && (
          <div className="flex gap-2">
            <BaseButton
              label={t('global.confirm')}
              size="md"
              onClick={() => setShowConfirm(true)}
            />
            <BaseButton
              label={t('global.cancel')}
              type="red"
              size="md"
              onClick={() => handleClose(true)}
            />
          </div>
        )}
      </div>
    </form>
  );
}
