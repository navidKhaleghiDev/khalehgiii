import { useState, useCallback, useEffect } from 'react';
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
import LogInOtpForm from '../LoginOtpForm';
import { LoginForm } from '../LoginForm';
import { ILoginFieldValues } from '../types';

export function LoginSteps() {
  const { setUser } = useUserContext();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [isOtpActive, setIsOtpActive] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingButton, setLoadingButton] = useState(false);

  const { control, handleSubmit } = useForm<ILoginFieldValues>({
    mode: 'onChange',
    defaultValues: {},
  });

  const handleGetProfile = useCallback(async () => {
    await API_USERS_PROFILE()
      .then(({ data }) => {
        if (data.exceeded_usage) {
          navigate(ROUTES_PATH.unauthorized);
          return;
        }
        setUser(data);
        if (!data.is_meta_admin) {
          if (
            Array.isArray(data.admin_group_of) &&
            data.admin_group_of.length !== 0
          ) {
            if (
              data.online_assistance &&
              Object.keys(data.online_assistance).length !== 0
            ) {
              navigate(ROUTES_PATH.home);
            } else {
              navigate(ROUTES_PATH.loginAssistance);
            }
            return;
          }
        }

        toast.success(t('global.successfullyLogedIn'));
        navigate(ROUTES_PATH.home);
        setIsOtpActive(true);
      })
      .catch((err) => {
        setUser(null);
        http.removeAuthHeader();
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
        const needOtp = data.info === 'ready to get totp to verify';
        if (needOtp) {
          setIsOtpActive(true);
        } else {
          localStorage.setItem(STORAGE_KEY_REFRESH_TOKEN, data.refresh_token);
          http.setAuthHeader(data.access_token, data.refresh_token);
          handleGetProfile();
        }
      } catch (err) {
        setError(err as string);
      } finally {
        setLoadingButton(false);
      }
    },
    [handleGetProfile, isOtpActive]
  );

  useEffect(() => {
    setError(null);
  }, [isOtpActive]);

  return (
    <div className="flex flex-col items-center w-full mt-auto">
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        className="flex flex-col items-center w-full"
      >
        <div className="absolute top-[-6rem]">
          <Avatar icon={userIcon} intent="grey" size="lg" />
        </div>
        {isOtpActive ? (
          <LogInOtpForm
            control={control}
            setIsOtpActive={setIsOtpActive}
            error={error}
          />
        ) : (
          <LoginForm control={control} error={error} />
        )}
        <BaseButton
          label={t('login.login')}
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
