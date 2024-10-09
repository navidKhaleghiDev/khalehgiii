import { useTranslation } from 'react-i18next';
import { Control, FieldValues } from 'react-hook-form';

import userIcon from '@iconify-icons/ph/user';
import { regexPattern } from '@redesignUi/atoms/Inputs';
import { Typography } from '@redesignUi/atoms/Typography';
import { BaseInputController } from '@redesignUi/atoms/Inputs/BaseInput/Controller';
import { PasswordInputController } from '@redesignUi/atoms/Inputs/PasswordInput/Controller';

import { ILoginFieldValues } from '../types';

interface LoginFormProps<T extends FieldValues> {
  control: Control<T>;
  error: string | null;
}

export function LoginForm({
  control,
  error,
}: LoginFormProps<ILoginFieldValues>) {
  const { t } = useTranslation();

  return (
    <>
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
        />
        <PasswordInputController
          label={t('global.password')}
          fullWidth
          name="password"
          control={control}
          placeholder={t('global.password')}
          id="password"
        />
      </div>
    </>
  );
}
