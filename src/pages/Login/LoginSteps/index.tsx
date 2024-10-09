import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import userIcon from '@iconify-icons/ph/user';
import languageIcon from '@iconify-icons/ph/globe-thin';
import { Avatar, BaseButton } from '@redesignUi/atoms';
import { DropDownWithIcon } from '@ui/atoms/DropDownWithIcon';
import {
  API_USERS_LOGIN,
  API_USERS_LOGIN_OTP,
  API_USERS_PROFILE,
} from '@src/services/users';

import { languageOptions } from '@src/constants/optios';
import { ROUTES_PATH } from '@src/routes/routesConstants';
import { STORAGE_KEY_REFRESH_TOKEN, http } from '@src/services/http';
import { useLanguage } from '@context/settings/languageContext';
import { useUserContext } from '@context/user/userContext';

import { LoginFieldValues } from '../types';
import { LoginForm } from '../LoginForm';
import LogInOtpForm from '../LoginOtpForm';

export function LoginSteps() {
  const { setUser } = useUserContext();
  const navigate = useNavigate();
  const { changeLanguage } = useLanguage();
  const { t } = useTranslation();

  const [error, setError] = useState<string | null>(null);
  const [isOtpActive, setIsOtpActive] = useState<boolean>(false);
  const [loadingButton, setLoadingButton] = useState(false);

  const { control, handleSubmit } = useForm<LoginFieldValues>({
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
              navigate(ROUTES_PATH.dashboard);
            } else {
              navigate(ROUTES_PATH.loginAssistance);
            }
            return;
          }
        }

        toast.success(t('global.successfullyLogedIn'));
        navigate(ROUTES_PATH.dashboard);
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
    async ({ email, password, totp }: LoginFieldValues) => {
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
      <div className="absolute top-[1.87rem] rtl:right-5 ltr:left-5">
        <DropDownWithIcon
          icon={languageIcon}
          size="xs"
          onSelect={(v: string) => changeLanguage(v)}
          options={languageOptions}
        />
      </div>
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        className="flex flex-col items-center w-[21.8rem]"
      >
        <div>
          <Avatar icon={userIcon} size="lg" className="mb-[0.81rem]" />
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
          className="mt-8"
          loading={loadingButton}
          size="lg"
          type="teal"
          submit
        />
      </form>
    </div>
  );
}
