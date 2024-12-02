import { useTranslation } from 'react-i18next';

import PencilSimple from '@iconify-icons/ph/pencil-simple';
import EnvelopeSimple from '@iconify-icons/ph/envelope-simple';
import User from '@iconify-icons/ph/user';
import { regexPattern } from '@redesignUi/atoms/Inputs';
import { BaseInputController } from '@redesignUi/atoms/Inputs/BaseInput/Controller';
import { PasswordInputController } from '@redesignUi/atoms/Inputs/PasswordInput/Controller';
import { Typography } from '@redesignUi/atoms';
import { BaseRadioButtonController } from '@redesignUi/atoms/Inputs/BaseRadioButton/Controller';
// import { BaseDropdown } from '@redesignUi/atoms/BaseDropdown';
import { BaseSwitchController } from '@redesignUi/atoms/BaseSwitch/Controller';
import { BaseQrCode } from '@redesignUi/atoms/BaseQrCode';

// import { domainsMock } from './dataMock';
import { UserInfoTabProps } from './types';

const radioClass =
  'sm:w-40 sm:p-2.5 flex flex-row-reverse sm:rounded-lg dark:bg-gray-600 sm:shadow';

export function UserInfoTab({
  control,
  dir,
  admin,
  isMetaAdmin,
  secret,
  setSecret,
}: UserInfoTabProps) {
  const { t } = useTranslation();
  const iconName = !admin?.id ? User : PencilSimple;
  const iconEmail = !admin?.id ? EnvelopeSimple : PencilSimple;

  return (
    <div className="p-5 rtl:pr-0 ltr:pl-0 h-[30.37rem] overflow-y-scroll">
      <div className="border-gray-300 border-b-[0.06rem]">
        <div className="sm:flex-row flex flex-col sm:justify-between items-start sm:gap-5">
          <BaseInputController
            dir={dir}
            fullWidth
            control={control}
            name="first_name"
            id="first_name"
            label={t('global.name')}
            placeholder={t('global.name')}
            rules={{
              pattern: regexPattern.englishLetter,
              required: regexPattern.required,
            }}
            endIcon={dir === 'rtl' ? iconName : undefined}
            startIcon={dir === 'ltr' ? iconName : undefined}
          />
          <BaseInputController
            dir={dir}
            fullWidth
            control={control}
            name="last_name"
            id="last_name"
            placeholder={t('global.lastName')}
            label={t('global.lastName')}
            rules={{
              pattern: regexPattern.englishLetter,
              required: regexPattern.required,
            }}
            endIcon={dir === 'rtl' ? iconName : undefined}
            startIcon={dir === 'ltr' ? iconName : undefined}
          />
        </div>
        <div className="grid sm:grid-cols-2 sm:gap-5">
          <BaseInputController
            dir={dir}
            fullWidth
            control={control}
            name="email"
            id="email"
            label={t('global.email')}
            placeholder="email@email.com"
            rules={{
              pattern: regexPattern.email,
              required: regexPattern.required,
            }}
            endIcon={dir === 'rtl' ? iconEmail : undefined}
            startIcon={dir === 'ltr' ? iconEmail : undefined}
          />
          {!admin?.id ? (
            <PasswordInputController
              label={t('global.password')}
              name="password"
              control={control}
              placeholder={t('global.password')}
              id="password"
              fullWidth
              dir={dir}
              iconDir={dir}
            />
          ) : null}
        </div>
      </div>

      <div className="flex flex-col justify-center items-center w-full">
        <div className="w-full flex-col justify-center">
          <div className="flex flex-col justify-between sm:gap-5 gap-2.5 sm:py-5 py-4">
            <div className="flex flex-col gap-1">
              <Typography
                variant="body5B"
                color="neutralDark"
                className="text-right ltr:text-left"
              >
                {t('adminList.userType')}
              </Typography>
              <Typography
                variant="body6"
                className="text-right ltr:text-left hidden sm:block"
                color="neutral"
              >
                {t('adminList.systemAdminDescription')}
              </Typography>
            </div>
            <div className="flex sm:gap-2.5 gap-10">
              <BaseRadioButtonController
                className={`${radioClass} ${
                  isMetaAdmin === 'false' ? 'sm:border sm:border-teal-500' : ''
                }`}
                id="false"
                name="is_meta_admin"
                value="false"
                control={control}
                label={t('adminList.admin')}
              />

              <BaseRadioButtonController
                className={`${radioClass} ${
                  isMetaAdmin === 'true' ? 'sm:border sm:border-teal-500' : ''
                }`}
                id="true"
                name="is_meta_admin"
                value="true"
                control={control}
                label={t('adminList.metaAdmin')}
              />
            </div>
          </div>
          {admin?.id ? (
            <div className="flex sm:flex-col flex-row justify-between items-start gap-1 sm:mt-2.5 mt-4 pt-5 border-gray-300 border-t-[0.06rem]">
              <div className="w-full flex sm:flex-row flex-col sm:justify-between justify-start gap-2.5 items-start ">
                <Typography
                  variant="body5B"
                  color="neutralDark"
                  className="text-right ltr:text-left"
                >
                  {`${t('global.activateOtp')}`}
                </Typography>
                <BaseSwitchController
                  control={control}
                  name="totp_enable"
                  id="totp_enable"
                  size="md"
                />
              </div>
              <Typography
                variant="body6"
                className="text-right ltr:text-left hidden sm:block"
                color="neutral"
              >
                {t('adminList.systemAdminOtp')}
              </Typography>
              <div className="bg-gray-100 dark:bg-gray-600 w-[7.62rem] sm:w-full sm:mt-5 sm:py-1 p-5 rounded-lg flex justify-center">
                <BaseQrCode
                  email={admin?.email}
                  setSecret={setSecret}
                  secret={secret}
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
