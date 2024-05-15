import { BaseButton } from '@ui/atoms/BaseButton';
import { useNavigate } from 'react-router-dom';
import { BaseInput, regexPattern } from '@ui/atoms/Inputs';
import { Typography } from '@ui/atoms/Typography';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ROUTES_PATH } from '@src/routes/routesConstants';
import { API_USERS_LOGIN, API_USERS_PROFILE } from '@src/services/users';
import { PasswordInput } from '@ui/atoms/Inputs/PasswordInput';
import { toast } from 'react-toastify';
import { STORAGE_KEY_REFRESH_TOKEN, http } from '@src/services/http';
import { useUserContext } from '@context/user/userContext';
import userIcon from '@iconify-icons/ph/user';
import signInBoldIcon from '@iconify-icons/ph/sign-in-bold';

import { useTranslation } from 'react-i18next';
import { useLanguage } from '@context/settings/languageContext';
import { DropDownWithIcon } from '@ui/atoms/DropDownWithIcon';
import languageIcon from '@iconify-icons/ph/globe-thin';
import { languageOptions } from '@src/constants/optios';
import { ILoginFieldValues } from '../types';

export function LoginForm({ setIsOtpActive }: any) {
  const [error, setError] = useState<string | null>(null);
  const [loadingButton, setLoadingButton] = useState(false);
  const { changeLanguage } = useLanguage();

  const { setUser } = useUserContext();
  const { t } = useTranslation();

  const navigate = useNavigate();
  const { control, handleSubmit } = useForm<ILoginFieldValues>({
    mode: 'onChange',
  });

  const handelGetProfile = async () => {
    await API_USERS_PROFILE()
      .then(({ data }) => {
        if (data.exceeded_usage) {
          navigate(ROUTES_PATH.unauthorized);
          return;
        }
        setUser(data);
        toast.success(t('global.successfullyLogedIn'));
        navigate(ROUTES_PATH.dashboard);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoadingButton(false);
      });
  };

  const handelSubmitForm = async ({ email, password }: ILoginFieldValues) => {
    setLoadingButton(true);
    await API_USERS_LOGIN({ email, password })
      .then(({ data }) => {
        localStorage.setItem(STORAGE_KEY_REFRESH_TOKEN, data.refresh_token);
        http.setAuthHeader(data.access_token, data.refresh_token);
        handelGetProfile();
        setIsOtpActive(true);
      })
      .catch((err) => {
        setError(err);
        setLoadingButton(false);
      });
  };

  return (
    <form
      onSubmit={handleSubmit(handelSubmitForm)}
      className="flex flex-col items-center w-full  "
    >
      <div className="absolute top-[1rem] right-[1rem] ">
        <DropDownWithIcon
          icon={languageIcon}
          size="xs"
          onSelect={(v: string) => changeLanguage(v)}
          options={languageOptions}
        />
      </div>
      <Typography color="neutral" variant="h5" className="mb-5">
        {t('login.loginTitle')}
      </Typography>

      {error && (
        <Typography color="red" variant="body3" className="mb-2">
          {error}
        </Typography>
      )}
      <div className="w-full flex flex-col items-center justify-end">
        <BaseInput
          fullWidth
          control={control}
          placeholder={t('global.userName')}
          rules={{
            required: regexPattern.required,
          }}
          id="email"
          name="email"
          size="lg"
          endIcon={userIcon}
        />
        <PasswordInput
          name="password"
          control={control}
          placeholder={t('global.password')}
        />
        <BaseButton
          label={t('login.confirm')}
          endIcon={signInBoldIcon}
          className="mt-8"
          loading={loadingButton}
          size="md"
          submit
          fullWidth
        />
      </div>
    </form>
  );
}
