import { useTranslation } from 'react-i18next';
import { Control, FieldValues } from 'react-hook-form';

import userIcon from '@iconify-icons/ph/user';
import { regexPattern } from '@ui/atoms/Inputs';
import { Typography } from '@ui/atoms/Typography';
import { BaseInputController } from '@ui/atoms/Inputs/BaseInput/Controller';
import { useLanguage } from '@context/settings/languageContext';
import { PasswordInputController } from '@ui/atoms/Inputs/PasswordInput/Controller';
import { Avatar } from '@ui/atoms';

import { LoginFieldValues } from '../types';

interface LoginFormProps<T extends FieldValues> {
  control: Control<T>;
  error: string | null;
}

export function LoginForm({
  control,
  error,
}: LoginFormProps<LoginFieldValues>) {
  const { t } = useTranslation();
  const { dir } = useLanguage();
  const rtl = dir === 'rtl';

  return (
    <>
      <div>
        <Avatar icon={userIcon} size="lg" className="mb-[0.81rem]" />
      </div>
      <Typography color="neutral" variant="body3" className="mb-[4.75rem]">
        {t('login.loginTitle')}
      </Typography>

      {error && (
        <Typography color="red" variant="body3" className="mb-2 text-center ">
          {error}
        </Typography>
      )}
      <div className="w-full flex flex-col items-center justify-end mb-[6.68rem]">
        <BaseInputController
          label={t('global.userName')}
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
          dir={rtl ? 'rtl' : 'ltr'}
        />
        <PasswordInputController
          label={t('global.password')}
          fullWidth
          name="password"
          control={control}
          placeholder={t('global.password')}
          id="password"
          dir={rtl ? 'rtl' : 'ltr'}
          iconDir="rtl"
        />
      </div>
    </>
  );
}
