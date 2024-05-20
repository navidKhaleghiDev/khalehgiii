import { BaseInput, regexPattern } from '@ui/atoms/Inputs';
import { Typography } from '@ui/atoms/Typography';
import { PasswordInput } from '@ui/atoms/Inputs/PasswordInput';
import userIcon from '@iconify-icons/ph/user';

import { useTranslation } from 'react-i18next';
import { useLanguage } from '@context/settings/languageContext';
import { DropDownWithIcon } from '@ui/atoms/DropDownWithIcon';
import languageIcon from '@iconify-icons/ph/globe-thin';
import { languageOptions } from '@src/constants/optios';

export function LoginForm({ control, error }: any) {
  const { changeLanguage } = useLanguage();

  const { t } = useTranslation();

  return (
    <>
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
      </div>
    </>
  );
}
