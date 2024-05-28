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
import { useUserContext } from '@context/user/userContext';
import { BaseSwitchWithState } from '@ui/atoms/Inputs/BaseSwitchWithState';

type PropsType = {
  handleClose: (isUpdated?: boolean) => void;
  admin?: Partial<IUser>;
};

export function UpdateAdminModal({ handleClose, admin }: PropsType) {
  const { user } = useUserContext();
  const { t } = useTranslation();
  const [showConfirm, setShowConfirm] = useState(false);
  const [loadingButtonModal, setLoadingButtonModal] = useState(false);
  const [selectedSwiches, setSelectedSwitches] = useState([]);

  const permissions = user?.user_permissions || [];

  const filterdPermissions = permissions.filter((item) =>
    permissionKeys.includes(item.codename)
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

  const handleSwitchChange = (item, isChecked) => {
    if (isChecked) {
      setSelectedSwitches((prev) => [...prev, item]);
    } else {
      setSelectedSwitches((prev) =>
        prev.filter((i) => i.codename !== item.codename)
      );
    }
  };

  console.log(selectedSwiches, 'SELECTED SWITCHES');

  const handleOnSubmit = async (data: IUser) => {
    setLoadingButtonModal(true);

    if (data.id) {
      await API_UPDATE_USER(data as IUser, data?.id as number)
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
    const updatedData = { user_permissions: selectedSwiches, ...data };

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
    <form
      className="w-full h-full grid grid-cols-6 p-5"
      onSubmit={handleSubmit(handleOnSubmit)}
    >
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
      <div className="px-2 col-span-6 flex justify-between items-start w-full gap-2">
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
      <div className="px-2 col-span-6 flex justify-between items-start w-full">
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
      {admin?.id ? (
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
      ) : (
        <div
          dir="ltr"
          className="px-2 col-span-6 flex justify-center items-center w-full mb-4 border border-gray-500 rounded-md p-2  h-auto flex-wrap "
        >
          {filterdPermissions &&
            filterdPermissions.map((item, index) => (
              <div key={item.id} className="w-2/6 flex-col justify-center ">
                <div className="w-6/6 flex justify-between items-center mt-2">
                  <Typography className="mb-1" type="h4" color="teal">
                    {item.name}
                  </Typography>
                  <BaseSwitchWithState
                    pureOnChange={(isChecked) =>
                      handleSwitchChange(item, isChecked)
                    }
                    pureValue={selectedSwiches.some(
                      (i) => i.codename === item.codename
                    )}
                    name={item.codename}
                  />
                </div>
              </div>
            ))}
        </div>
      )}
      <Typography className="px-2 col-span-6 flex justify-start" color="red">
        {t('title.systemAdminDescription1')}
      </Typography>

      <Typography className="px-2 col-span-6 flex justify-start" color="red">
        {t('title.systemAdminDescription2')}
      </Typography>
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
const permissionKeys = [
  'view_keycloak',
  'view_file_scan',
  'add_extensions',
  'delete_extensions',
  'view_extensions',
  'view_uba',
  'view_scan_reports',
  'view_internet_logs',
  'change_session_recording',
  'view_session_recording',
  'add_config',
  'change_config',
  'view_config',
  'change_daasmetaconfig',
  'delete_daasmetaconfig',
  'view_daasmetaconfig',
  'change_whitelistfiles',
  'delete_whitelistfiles',
  'view_whitelistfiles',
  'add_whitelistfiles',
  'change_daas',
  'delete_daas',
  'view_daas',
  'change_users',
  'delete_users',
  'view_users',
  'add_users',
  'change_malware',
  'view_malware',
  'add_malware',
];
