import { useState, useMemo, useCallback } from 'react';
import { Avatar, BaseButton } from '@ui/atoms';
import userIcon from '@iconify-icons/ph/user';
import {
  API_USERS_LOGIN,
  API_USERS_LOGIN_OTP,
  API_USERS_PROFILE,
} from '@src/services/users';
import { ROUTES_PATH } from '@src/routes/routesConstants';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useUserContext } from '@context/user/userContext';
import { STORAGE_KEY_REFRESH_TOKEN, http } from '@src/services/http';
import signInBoldIcon from '@iconify-icons/ph/sign-in-bold';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { BaseOtp } from '@ui/atoms/BaseOtp';
import LogInOtpForm from '../LoginOtpForm';
import { LoginForm } from '../LoginForm';
import { ILoginFieldValues } from '../types';

export function LoginSteps() {
  const { setUser } = useUserContext();
  const [isOtpActive, setIsOtpActive] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingButton, setLoadingButton] = useState(false);

  const { t } = useTranslation();

  const navigate = useNavigate();

  const { control, handleSubmit, getValues } = useForm<ILoginFieldValues>({
    mode: 'onChange',
    defaultValues: {},
  });

  const handelGetProfile = useCallback(async () => {
    await API_USERS_PROFILE()
      .then(({ data }) => {
        if (data.exceeded_usage) {
          navigate(ROUTES_PATH.unauthorized);
          return;
        }
        setUser(data);
        toast.success(t('global.successfullyLogedIn'));
        navigate(ROUTES_PATH.dashboard);
        setIsOtpActive(true);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoadingButton(false);
      });
  }, [navigate, setUser, t]);

  const handleSubmitForm = useCallback(
    async ({ email, password, totp }: ILoginFieldValues) => {
      setLoadingButton(true);

      try {
        const response = isOtpActive
          ? await API_USERS_LOGIN_OTP({ email, password, totp })
          : await API_USERS_LOGIN({ email, password });

        const { data } = response;

        if (data.info === 'ready to get totp to verify') {
          setIsOtpActive(true);
        } else {
          localStorage.setItem(STORAGE_KEY_REFRESH_TOKEN, data.refresh_token);
          http.setAuthHeader(data.access_token, data.refresh_token);
          handelGetProfile();
        }
      } catch (err) {
        setError(err.message || 'An unknown error occurred');
      } finally {
        setLoadingButton(false);
      }
    },
    [handelGetProfile, isOtpActive]
  );

  return (
    <div className="flex flex-col items-center w-full mt-auto">
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        className="flex flex-col items-center w-full  "
      >
        <div className="absolute top-[-6rem]">
          <Avatar icon={userIcon} intent="grey" size="lg" />
        </div>
        {isOtpActive ? (
          <BaseOtp name="totp" valueLength={6} control={control} size="md" />
        ) : (
          <LoginForm control={control} error={error} />
        )}

        <BaseButton
          label={t('login.confirm')}
          endIcon={signInBoldIcon}
          className="mt-8"
          loading={loadingButton}
          size="md"
          submit
          fullWidth
        />
      </form>
    </div>
  );
}
