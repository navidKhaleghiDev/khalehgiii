/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { IDaAs } from '@src/services/users/types';
import {
  EPermissionWhiteListFiles,
  PermissionsCodeName,
} from '@src/types/permissions';
import { checkPermission } from '@src/helper/hooks/usePermission';
import { BaseInput, regexPattern } from '@redesignUi/atoms/Inputs';
import { ChipButtonUserAccessModal } from '@src/pages/DashboardDesktopList/DaAsList/components/ChipButtonUserAccessModal';
import X from '@iconify-icons/ph/x';
import { useLanguage } from '@context/settings/languageContext';

type PropsType = {
  name: keyof IDaAs;
  valueList: string[];
  label: string;
  userPermissions: PermissionsCodeName[];
  onChange: (name: PropsType['name'], values: string[]) => void;
};

export function DlpList({
  name,
  valueList,
  onChange,
  label,
  userPermissions,
}: PropsType) {
  const { t } = useTranslation();
  const { dir } = useLanguage();
  const [error, setError] = useState<string>();
  const [value, setValue] = useState<string>();

  const hasDeletePermission = checkPermission(
    userPermissions,
    EPermissionWhiteListFiles.DELETE
  );

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const mValue = (event.target as HTMLInputElement)?.value;

      const regex = regexPattern.wordStartedWithPointAndEn;
      if (!regex.value.test(mValue)) {
        setError(regex.message);
      } else {
        error && setError(undefined);
      }

      if (!valueList.includes(mValue) && mValue !== '') {
        onChange(name, [...valueList, mValue]);
        setValue('');
      }

      if (valueList.includes(mValue)) {
        setError(t('userList.theFormatIsRepetitive'));
      }
    }
  };

  const remove = (mValue: string) => {
    const newArray = valueList.filter((item) => item !== mValue);
    onChange(name, newArray);
  };
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const values = event.target.value;
    const regex = regexPattern.wordStartedWithPointAndEn;
    if (!regex.value.test(values)) {
      setError(regex.message);
    } else if (error) setError(undefined);
    setValue(values);
  };
  return (
    <>
      <BaseInput
        value={value ?? ''}
        onChange={handleOnChange}
        name={name}
        id={name}
        error={error}
        onKeyDown={handleKeyPress}
        placeholder=".text"
        label={label}
        size="md"
        dir={dir === 'rtl' ? 'rtl' : 'ltr'}
      />
      {Array.isArray(valueList) && (
        <div className="flex justify-start gap-1 flex-wrap mt-2 overflow-auto max-h-20">
          {valueList.map((labelItem) => (
            <ChipButtonUserAccessModal
              label={labelItem}
              color="neutral"
              key={labelItem}
              onClick={
                hasDeletePermission ? () => remove(labelItem) : undefined
              }
              icon={X}
            />
          ))}
        </div>
      )}
    </>
  );
}
