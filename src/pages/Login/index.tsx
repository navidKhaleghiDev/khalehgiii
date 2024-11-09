import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import PhTranslate from '@iconify-icons/ph/translate';
import { BaseButton } from '@redesignUi/atoms';
import { BaseDropdownIcon } from '@redesignUi/atoms/BaseDropdownIcon';
import { BackButton } from '@redesignUi/atoms/BackButton';

import {
  API_USERS_LOGIN,
  API_USERS_LOGIN_OTP,
  API_USERS_PROFILE,
} from '@src/services/users';
import { withNoAuth } from '@src/helper/hoc/withNoAuth';
import { languageOptions } from '@src/constants/optios';
import { ROUTES_PATH } from '@src/routes/routesConstants';
import { STORAGE_KEY_REFRESH_TOKEN, http } from '@src/services/http';
import { useLanguage } from '@context/settings/languageContext';
import { useUserContext } from '@context/user/userContext';

import { LoginFieldValues } from './types';
import LogInOtpForm from './LoginOtpForm';
import { LoginForm } from './LoginForm';

export function LoginPageCp() {
  const { setUser } = useUserContext();
  const navigate = useNavigate();
  const { changeLanguage, lang } = useLanguage();
  const { t } = useTranslation();

  const [error, setError] = useState<string | null>(null);
  const [isOtpActive, setIsOtpActive] = useState<boolean>(false);
  const [loadingButton, setLoadingButton] = useState(false);

  const { control, handleSubmit } = useForm<LoginFieldValues>({
    mode: 'onChange',
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
    <div className="font-kalameh flex flex-row-reverse  h-screen w-full relative bg-teal-500">
      <div className="lg:w-[52%] w-full h-full content-center absolute top-0 ltr:left-0 rtl:right-0 z-40 lg:rtl:rounded-l-3xl lg:ltr:rounded-r-3xl bg-gray-50">
        <div className="flex flex-col items-center w-full mt-auto">
          <div className="absolute top-[1.87rem] rtl:right-5 ltr:left-5">
            <div className="flex gap-[0.62rem]">
              {isOtpActive && (
                <BackButton
                  onClick={() => setIsOtpActive(false)}
                  dir={lang === 'fa' ? 'rtl' : 'ltr'}
                />
              )}
              <BaseDropdownIcon
                icon={PhTranslate}
                size="sm"
                onSelect={(v: string) => changeLanguage(v)}
                options={languageOptions}
              />
            </div>
          </div>
          <form
            onSubmit={handleSubmit(handleSubmitForm)}
            className="flex flex-col items-center w-[21.8rem]"
          >
            {isOtpActive ? (
              <LogInOtpForm control={control} error={error} />
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
      </div>
      {isOtpActive ? (
        <div className="h-full lg:w-1/2 flex justify-center items-center">
          <img
            src="images/login/otpLogin.webp"
            alt="LoginOnlineAssistance"
            className="lg:block hidden object-fill"
          />
        </div>
      ) : (
        <div className="h-full w-1/2 absolute top-0 ltr:right-0 rtl:left-0">
          <img
            src="images/login/Login.webp"
            alt="login"
            className="w-full h-full lg:block hidden object-cover"
          />
        </div>
      )}
    </div>
  );
}

const LoginPage = withNoAuth(LoginPageCp);
export { LoginPage };
