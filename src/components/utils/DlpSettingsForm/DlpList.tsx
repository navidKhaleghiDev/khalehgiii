import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { DaAsParams } from '@src/services/users/types';
import {
  PermissionWhiteListFiles,
  PermissionsCodeName,
} from '@src/types/permissions';
import { checkPermission } from '@src/helper/hooks/usePermission';
import { BaseInput, regexPattern } from '@redesignUi/atoms/Inputs';
import X from '@iconify-icons/ph/x';
import { useLanguage } from '@context/settings/languageContext';
import { BaseInputNumber } from '@redesignUi/atoms/Inputs/BaseInputNumber';
import { ChipButtonUserAccessModal } from '@src/pages/UserManagement/UserListPage/DaAsList/components/ChipButtonUserAccessModal';

type PropsType = {
  name: keyof DaAsParams;
  valueList: { [key: string]: number };
  label: string;
  userPermissions: PermissionsCodeName[];
  onChange: (
    name: PropsType['name'],
    values: { [key: string]: number }
  ) => void;
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
  const [value, setValue] = useState<string>('');
  const [contentValue, setContentValue] = useState<number>();

  const hasDeletePermission = checkPermission(
    userPermissions,
    PermissionWhiteListFiles.DELETE
  );

  const handleKeyFirstPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === 'Enter') {
      event.preventDefault();

      if (!contentValue) {
        setError(
          t('userList.enterTheAllowedVolumeForThisFormatInTheOppositeField')
        );
      }

      const numberInput = document.getElementById(
        name === 'allowed_files_type_for_download'
          ? 'allowed_volume_dl'
          : 'allowed_volume_up'
      );
      if (numberInput) {
        numberInput.focus();
      }
    }
  };

  const handleKeySecondPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const cValue = (event.target as HTMLInputElement)?.value;

      if (valueList[cValue] !== undefined) {
        const updatedValueList = {
          ...valueList,
          [cValue]: valueList[cValue] + 1,
        };
        onChange(name, updatedValueList);
      } else if (value !== '') {
        const updatedValueList = { ...valueList, [value]: Number(cValue) };
        onChange(name, updatedValueList);
      }
    }
  };

  const remove = (mValue: string) => {
    const { [mValue]: deleted, ...newValueList } = valueList;
    onChange(name, newValueList);
  };
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const values = event.target.value;
    const regex = regexPattern.wordStartedWithPointAndEn;
    if (!regex.value.test(values)) {
      setError(t(regex.message));
    } else if (error) setError(undefined);
    setValue(values);
  };
  return (
    <div className="flex flex-col">
      <div className="flex sm:flex-row flex-col sm:gap-5 gap-2.5 items-baseline">
        <div className="sm:basis-1/2 basis-full w-full">
          <BaseInput
            value={value ?? ''}
            onChange={handleOnChange}
            name={name}
            id={name}
            error={error}
            onKeyDown={handleKeyFirstPress}
            placeholder=".text"
            label={label}
            dir={dir === 'rtl' ? 'rtl' : 'ltr'}
          />
        </div>
        <BaseInputNumber
          id={`${
            name === 'allowed_files_type_for_download'
              ? 'allowed_volume_dl'
              : 'allowed_volume_up'
          }`}
          name="allowed_volume"
          label={t('userList.allowedVolume')}
          max={500}
          onChange={(Value) => setContentValue(Value)}
          fullWidth
          onKeyDown={handleKeySecondPress}
        />
      </div>
      <div className="flex justify-start gap-1 flex-wrap mt-2 basis-full">
        {Object.entries(valueList).map(([key, val]) => (
          <ChipButtonUserAccessModal
            label={`${key}:${val}`}
            color="neutral"
            key={key}
            onClick={hasDeletePermission ? () => remove(key) : undefined}
            icon={X}
          />
        ))}
      </div>
    </div>
  );
}
