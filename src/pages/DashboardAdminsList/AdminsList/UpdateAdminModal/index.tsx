import { useForm } from 'react-hook-form';
import { useState } from 'react';
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
import PencilSimple from '@iconify-icons/ph/pencil-simple';
import EnvelopeSimple from '@iconify-icons/ph/envelope-simple';
import User from '@iconify-icons/ph/user';
import { BaseInputController } from '@redesignUi/atoms/Inputs/BaseInput/Controller';
import { PasswordInputController } from '@redesignUi/atoms/Inputs/PasswordInput/Controller';
import { BaseButton, Typography } from '@redesignUi/atoms';
import BaseQrCode from '@redesignUi/atoms/BaseQrCode';
import { BaseRadioButtonController } from '@redesignUi/atoms/Inputs/BaseRadioButton/Controller';

import { BaseSwitchController } from '@redesignUi/atoms/BaseSwitch/Controller';

import { regexPattern } from '@redesignUi/atoms/Inputs';

import { BaseDropdown } from '@redesignUi/atoms/BaseDropdown';
import { useLanguage } from '@context/settings/languageContext';

import { PermissionOptions } from '../PermissionOptions';

export interface UserProps extends Omit<IUser, 'is_meta_admin'> {
  is_meta_admin?: string | boolean;
}
type PropsType = {
  handleClose: (isUpdated?: boolean) => void;
  admin?: Partial<IUser>;
};

const option = [
  { id: '1', label: 'sep.npd/co.com' },
  { id: '2', label: 'sep.npd/co.com' },
  { id: '3', label: 'sep.npd/co.com' },
  { id: '4', label: 'sep.npd/co.com' },
  { id: '5', label: 'sep.npd/co.com' },
];

export function UpdateAdminModal({ handleClose, admin }: PropsType) {
  const { t } = useTranslation();
  const { lang } = useLanguage();
  const [showConfirm, setShowConfirm] = useState(false);
  const [loadingButtonModal, setLoadingButtonModal] = useState(false);
  const [selectedSwitches, setSelectedSwitches] = useState(
    admin?.user_permissions || []
  );

  const { data: permissionData, isLoading } = useSWR<
    IResponseData<IUserPermissions[]>
  >(E_USERS_PERMISSION, http.fetcherSWR);

  const role = admin?.is_meta_admin ? 'true' : 'false';

  const { control, handleSubmit, watch } = useForm<UserProps>({
    mode: 'onChange',
    defaultValues: {
      id: admin?.id,
      email: admin?.email,
      username: admin?.username ?? '',
      first_name: admin?.first_name ?? '',
      last_name: admin?.last_name ?? '',
      totp_enable: admin?.totp_enable,
      is_meta_admin: admin?.id ? role : '',
    },
  });
  const isMetaAdmin = watch('is_meta_admin');

  const permissions = permissionData?.data || [];
  const getSelectedIds = selectedSwitches.map((item) => item.id);
  const handleOnSubmit = async (data: UserProps) => {
    const updatedData = {
      user_permissions_ids: getSelectedIds,

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
    <form className="w-full" onSubmit={handleSubmit(handleOnSubmit)}>
      <BaseTabs>
        <BaseTab label={t('global.userInfo')}>
          <div className="p-5 h-[486px] overflow-y-scroll">
            <div className="border-gray-300 border-b-[0.06rem]">
              <div className="sm:flex-row flex flex-col sm:justify-between items-start  gap-5">
                <BaseInputController
                  dir={lang === 'fa' ? 'rtl' : 'ltr'}
                  fullWidth
                  control={control}
                  name="first_name"
                  id="first_name"
                  label={t('global.name')}
                  placeholder={t('global.name')}
                  rules={{
                    pattern: regexPattern.englishLetter,
                    required: regexPattern.required,
                  }}
                  startIcon={!admin?.id ? User : PencilSimple}
                />
                <BaseInputController
                  dir={lang === 'fa' ? 'rtl' : 'ltr'}
                  fullWidth
                  control={control}
                  name="last_name"
                  id="last_name"
                  placeholder={t('global.lastName')}
                  label={t('global.lastName')}
                  rules={{
                    pattern: regexPattern.englishLetter,
                    required: regexPattern.required,
                  }}
                  startIcon={!admin?.id ? User : PencilSimple}
                />
              </div>
              <div className="sm:flex-row flex flex-col sm:justify-between items-start w-full gap-5">
                <BaseInputController
                  dir={lang === 'fa' ? 'rtl' : 'ltr'}
                  fullWidth
                  control={control}
                  name="username"
                  id="username"
                  label={t('global.userName')}
                  rules={{
                    pattern: regexPattern.englishLetter,
                    required: regexPattern.required,
                  }}
                  startIcon={!admin?.id ? User : PencilSimple}
                />
                <BaseInputController
                  dir={lang === 'fa' ? 'rtl' : 'ltr'}
                  fullWidth
                  control={control}
                  name="email"
                  id="email"
                  label={t('global.email')}
                  placeholder="email@email.com"
                  rules={{
                    pattern: regexPattern.email,
                    required: regexPattern.required,
                  }}
                  startIcon={!admin?.id ? EnvelopeSimple : PencilSimple}
                />
              </div>
              {!admin?.id && (
                <div className="grid sm:grid-cols-2 sm:gap-5">
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
                    fullWidth
                    dir={lang === 'fa' ? 'rtl' : 'ltr'}
                  />
                </div>
              )}
            </div>

            <div className="flex flex-col justify-center items-center w-full ">
              <div className="w-full flex-col justify-center">
                <div className="flex flex-col justify-between sm:gap-5 gap-2.5 sm:py-5 py-4 border-gray-300 border-b-[0.06rem]">
                  <div className="flex flex-col gap-1">
                    <Typography
                      variant="body5B"
                      color="neutralDark"
                      className="leading-5 text-right ltr:text-left"
                    >
                      نوع کاربری
                    </Typography>
                    <Typography
                      variant="body6"
                      className="text-right ltr:text-left hidden sm:block"
                      color="neutral"
                    >
                      {t('title.systemAdminDescription2')}
                    </Typography>
                  </div>
                  <div className="flex sm:gap-2.5 gap-10">
                    <BaseRadioButtonController
                      className={`sm:w-40 sm:p-[0.62rem] flex flex-row-reverse sm:rounded-lg dark:bg-gray-600 sm:shadow ${
                        isMetaAdmin === 'false'
                          ? 'sm:border sm:border-teal-500'
                          : ''
                      }`}
                      id="false"
                      name="is_meta_admin"
                      value="false"
                      control={control}
                      label="ادمین"
                    />

                    <BaseRadioButtonController
                      className={`sm:w-40 sm:p-2.5 flex flex-row-reverse sm:rounded-lg dark:bg-gray-600 sm:shadow ${
                        isMetaAdmin === 'true'
                          ? 'sm:border sm:border-teal-500'
                          : ''
                      }`}
                      id="true"
                      name="is_meta_admin"
                      value="true"
                      control={control}
                      label="سوپرادمین"
                    />
                  </div>
                </div>

                <div className="flex flex-col justify-between gap-5 py-5 border-gray-300 border-b-[0.06rem]">
                  <div className="flex flex-col gap-1">
                    <Typography
                      variant="body5B"
                      color="neutralDark"
                      className="leading-5 text-right ltr:text-left"
                    >
                      {t('fileScan.choseDomain')}
                    </Typography>
                    <div className="flex items-end gap-2.5 mt-5">
                      <BaseDropdown
                        name="domain"
                        options={option}
                        placeHolder={t('fileScan.choseDomain')}
                        onChange={() =>
                          console.log(
                            'This dropDown functionality is not ready'
                          )
                        }
                        label="دامنه"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex sm:flex-col flex-row justify-between items-start gap-1 sm:mt-2.5 mt-4">
                  <div className="w-full flex sm:flex-row flex-col sm:justify-between justify-start gap-2.5 items-start ">
                    <Typography
                      variant="body5B"
                      color="neutralDark"
                      className="text-right ltr:text-left"
                    >
                      {`${t('global.activateOtp')}:`}
                    </Typography>
                    <BaseSwitchController
                      control={control}
                      name="totp_enable"
                      id="totp_enable"
                      size="md"
                    />
                  </div>
                  <Typography
                    variant="body6"
                    className="text-right ltr:text-left hidden sm:block"
                    color="neutral"
                  >
                    {t('title.systemAdminDescription2')}
                  </Typography>
                  <div className="bg-gray-100 dark:bg-gray-600 w-[7.62rem] sm:w-full sm:py-1 p-5 rounded-lg flex justify-center">
                    <BaseQrCode
                      email={admin?.email}
                      defaultValue={admin?.totp_secret}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
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
          <div className="flex gap-2.5">
            <BaseButton
              label={t('dashboard.saveSettings')}
              className="sm:w-[190px] w-[95px]"
              loading={loadingButtonModal}
              onClick={() => setShowConfirm(true)}
            />
            <BaseButton
              label={t('global.cancel')}
              type="neutral"
              className="sm:w-[190px] w-[95px]"
              onClick={() => handleClose(false)}
            />
          </div>
        )}
      </div>
    </form>
  );
}
