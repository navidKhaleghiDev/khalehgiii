import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { regexPattern } from '@ui/atoms/Inputs';
import { toast } from 'react-toastify';
import { IUser } from '@src/services/users/types';
import { API_UPDATE_USER, API_CREATE_USER } from '@src/services/users';
import { useTranslation } from 'react-i18next';

import { BaseTab, BaseTabs } from '@redesignUi/atoms/BaseTabs';
import useSWR from 'swr';
import { E_USERS_PERMISSION } from '@src/services/users/endpoint';
import { IResponseData } from '@src/types/services';
import { IUserPermissions } from '@src/types/permissions';
import { http } from '@src/services/http';
import { BaseInputController } from '@redesignUi/atoms/Inputs/BaseInput/Controller';
import { PasswordInputController } from '@redesignUi/atoms/Inputs/PasswordInput/Controller';
import { BaseButton, Typography } from '@redesignUi/atoms';
import { BaseRadioButtonController } from '@redesignUi/atoms/Inputs/BaseRadioButton/Controller';

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

  // State to track whether the user is a super admin
  const [isMetaAdmin, setIsMetaAdmin] = useState(
    admin?.is_meta_admin ?? false // Initialize with current admin status
  );

  const { data: permissionData, isLoading } = useSWR<
    IResponseData<IUserPermissions[]>
  >(E_USERS_PERMISSION, http.fetcherSWR);

  const { control, handleSubmit } = useForm<IUser>({
    mode: 'onChange',
    defaultValues: {
      id: admin?.id,
      email: admin?.email,
      username: admin?.username,
      first_name: admin?.first_name ?? '',
      last_name: admin?.last_name ?? '',
      totp_enable: admin?.totp_enable ?? false,
    },
  });

  const permissions = permissionData?.data || [];
  const getSelectedIds = selectedSwitches.map((item) => item.id);

  const handleOnSubmit = async (data: IUser) => {
    const updatedData = {
      user_permissions_ids: getSelectedIds,
      is_meta_admin: isMetaAdmin, // Add the is_meta_admin field based on radio button state
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
          <div className="px-2 col-span-6 flex justify-between items-start w-full gap-2 ">
            <BaseInputController
              control={control}
              name="first_name"
              id="first_name"
              label={t('global.name')}
              placeholder={t('global.name')}
              rules={{
                pattern: regexPattern.englishLetter,
                required: regexPattern.required,
              }}
            />
            <BaseInputController
              control={control}
              name="last_name"
              id="last_name"
              placeholder={t('global.lastName')}
              label={t('global.lastName')}
              rules={{
                pattern: regexPattern.englishLetter,
                required: regexPattern.required,
              }}
            />
          </div>
          <div className=" grid grid-cols-2 gap-2 border-gray-300 border-b-[0.06rem]">
            <BaseInputController
              control={control}
              name="username"
              id="username"
              label={t('global.userName')}
              rules={{
                pattern: regexPattern.englishLetter,
                required: regexPattern.required,
              }}
            />
            <BaseInputController
              control={control}
              name="email"
              id="email"
              label={t('global.email')}
              placeholder="email@email.com"
              rules={{
                pattern: regexPattern.email,
                required: regexPattern.required,
              }}
            />

            {!admin?.id && (
              <PasswordInputController
                label={t('global.password')}
                name="password"
                control={control}
                placeholder={t('global.password')}
                rules={{
                  pattern: regexPattern.enCharAndNumber,
                  required: regexPattern.required,
                }}
                id="password"
              />
            )}
          </div>

          {admin?.id && (
            <div className="px-2 flex flex-col justify-center items-center w-full mb-4 rounded-md p-2">
              <div className="w-full flex-col justify-center">
                <div className="w-6/6 flex flex-col justify-between gap-5 mt-2">
                  <div className="flex flex-col gap-1">
                    <Typography
                      variant="body5B"
                      color="neutralDark"
                      className="leading-5 text-right"
                    >
                      نوع کاربری
                    </Typography>
                    <Typography
                      variant="body6"
                      className="text-right whitespace-nowrap"
                      color="neutral"
                    >
                      {t('title.systemAdminDescription2')}
                    </Typography>
                  </div>
                  <div className="flex gap-[0.62rem] border-gray-300 border-b-[0.06rem] pb-5">
                    <BaseRadioButtonController
                      className="w-40 p-[0.62rem] rounded-lg shadow"
                      id="radio3"
                      name="is_meta_admin"
                      value="false"
                      control={control}
                      onChange={() => setIsMetaAdmin(false)} // Admin selected, set is_meta_admin to false
                      label="ادمین"
                    />
                    <BaseRadioButtonController
                      className="w-40 p-[0.62rem] rounded-lg shadow"
                      id="radio4"
                      name="is_meta_admin"
                      value="true"
                      control={control}
                      onChange={() => setIsMetaAdmin(true)} // Super Admin selected, set is_meta_admin to true
                      label="سوپرادمین"
                    />
                  </div>
                </div>
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
          <>
            <BaseButton
              label={t('global.confirm')}
              size="sm"
              type="red"
              className="mx-2"
              loading={loadingButtonModal}
              onClick={() => setShowConfirm(true)}
            />
            <BaseButton
              label={t('global.close')}
              size="sm"
              type="red"
              className="mx-2"
              onClick={() => handleClose(false)}
            />
          </>
        )}
      </div>
    </form>
  );
}
