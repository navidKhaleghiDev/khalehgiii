/* eslint-disable consistent-return */
import { BaseButton } from '@ui/atoms/BaseButton';
import { BaseInput, regexPattern } from '@ui/atoms/Inputs';
import { Typography } from '@ui/atoms/Typography';
import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

import { PasswordInput } from '@ui/atoms/Inputs/PasswordInput';
import { API_UPDATE_USER } from '@src/services/users';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

type ChangePasswordValues = {
  email: string;
  password: string;
  password_r: string;
};

export interface ILoginFieldValues extends FieldValues {
  email: string;
  password: string;
  remember_me?: boolean;
}

export function ChangePasswordForm({ user, logout }: any) {
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    watch,
    setError: setFormError,
    formState: { errors: errorsForm },
    trigger,
  } = useForm<ChangePasswordValues>({
    mode: 'onChange',
    defaultValues: {
      email: user.email,
    },
  });
  const [error, setError] = useState<string | null>(null);
  const [loadingButton, setLoadingButton] = useState(false);

  const handelSubmitForm = async ({ email, password }: ILoginFieldValues) => {
    if (!user) return true;
    setLoadingButton(true);

    await API_UPDATE_USER({ email, password }, `${user.id}`)
      .then(() => {
        toast.success(
          `${t('global.sucessfulyUpdated')} ${t('global.pleaseEnterAgain')}`
        );
        logout();
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoadingButton(false);
      });
  };

  return (
    <form
      onSubmit={handleSubmit(handelSubmitForm)}
      className="w-full flex flex-col items-center justify-end mt-auto p-16"
    >
      {error && (
        <Typography color="red" size="body3" className="mb-2">
          {error}
        </Typography>
      )}

      <div className="w-full flex flex-col items-center justify-end">
        <BaseInput
          fullWidth
          control={control}
          placeholder={t('global.email')}
          id="email"
          name="email"
          type="text"
          endIcon="ph:user"
          rules={{
            required: regexPattern.required,
          }}
        />
        <PasswordInput
          name="password"
          control={control}
          placeholder={t('global.newPassword')}
          rules={{
            validate: (value) => {
              if (error) setError(null);

              if (value === watch('password_r')) {
                if (errorsForm.password_r) {
                  trigger('password_r');
                }
                return true;
              }
              setFormError(
                'password_r',
                {
                  type: 'manual',
                  message: t('global.repeatNewPasswordNotSame'),
                },
                { shouldFocus: true }
              );
            },
          }}
        />
        <PasswordInput
          name="password_r"
          control={control}
          placeholder={t('global.repeatNewPassword')}
          rules={{
            validate: (value) =>
              value === watch('password') ||
              t('global.repeatNewPasswordNotSame'),
          }}
        />

        <BaseButton
          label="ثبت"
          className="mt-8"
          size="md"
          submit
          fullWidth
          loading={loadingButton}
        />
      </div>
    </form>
  );
}
