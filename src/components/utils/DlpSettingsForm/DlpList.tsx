/* eslint-disable no-else-return */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { IconButton } from '@ui/atoms/BaseButton';
import plusIcon from '@iconify-icons/ph/plus';
import minusIcon from '@iconify-icons/ph/minus';
import { BaseInput, Typography } from '@ui/atoms';
import { useState } from 'react';
import { BaseChip } from '@ui/atoms/BaseChip';
import { IDaAs } from '@src/services/users/types';
import { regexPattern } from '@ui/atoms/Inputs';
import {
  EPermissionWhiteListFiles,
  PermissionsCodeName,
} from '@src/types/permissions';
import { checkPermission } from '@src/helper/hooks/usePermission';

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
  const [displayInput, setDisplayInput] = useState(false);
  const [error, setError] = useState<string>();
  const [value, setValue] = useState<string>();

  const hasAddPermission = checkPermission(
    userPermissions,
    EPermissionWhiteListFiles.ADD
  );

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
        return;
      } else {
        error && setError(undefined);
      }

      if (!valueList.includes(mValue) && mValue !== '') {
        onChange(name, [...valueList, mValue]);
        setValue('');
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
      {hasAddPermission && (
        <div className="flex w-full justify-between items-center">
          <IconButton
            icon={displayInput ? minusIcon : plusIcon}
            onClick={() => setDisplayInput((prev) => !prev)}
            color="teal"
          />
          <Typography className="mb-1">{label}</Typography>
        </div>
      )}

      {displayInput && (
        <BaseInput
          pureValue={value}
          pureOnChange={handleOnChange}
          name={name}
          id={name}
          pureError={error}
          // rules={{
          //   pattern: regexPattern.wordStartedWithPointAndEn,
          // }}
          onKeyDown={handleKeyPress}
          placeholder=".text"
          ltrLabel
          fullWidth
        />
      )}
      {Array.isArray(valueList) && (
        <div
          className="flex justify-start gap-1 flex-wrap mt-2 overflow-auto h-20"
          dir="ltr"
        >
          {valueList.map((labelItem, i) => (
            <BaseChip
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              label={labelItem}
              onClick={
                hasDeletePermission ? () => remove(labelItem) : undefined
              }
            />
          ))}
        </div>
      )}
    </>
  );
}
