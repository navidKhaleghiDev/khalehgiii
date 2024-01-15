import { IconButton } from '@ui/atoms/BaseButton';
import plusIcon from '@iconify-icons/ph/plus';
import minusIcon from '@iconify-icons/ph/minus';
import { BaseInput, Typography } from '@ui/atoms';
import { useState } from 'react';
import { BaseChip } from '@ui/atoms/BaseChip';
import { IDaAs } from '@src/services/users/types';
import { regexPattern } from '@ui/atoms/Inputs';

type PropsType = {
  name: keyof IDaAs;
  valueList: string[];
  label: string;
  onChange: (name: PropsType['name'], values: string[]) => void;
};

export function DlpList({ name, valueList, onChange, label }: PropsType) {
  const [displayInput, setDisplayInput] = useState(false);
  const [error, setError] = useState<string>();

  const [value, setValue] = useState<string>();
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const mValue = (event.target as HTMLInputElement)?.value;

      const regex = regexPattern.wordStartedWithPointAndEn;
      if (!regex.value.test(mValue)) {
        setError(regex.message);
        return;
      }
      if (error) setError(undefined);

      if (!valueList.includes(mValue) && mValue !== '') {
        onChange(name, [...valueList, mValue]);
        setValue('');
      }
    }
  };

  const remove = (data: string) => {
    const newArray = valueList.filter((item) => item !== data);
    onChange(name, newArray);
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value: eventValue } = event.target;
    const regex = regexPattern.wordStartedWithPointAndEn;
    if (!regex.value.test(eventValue)) {
      setError(regex.message);
    } else if (error) setError(undefined);
    setValue(eventValue);
  };

  return (
    <>
      <div className="flex w-full justify-between items-center">
        <IconButton
          icon={displayInput ? minusIcon : plusIcon}
          onClick={() => setDisplayInput((prev) => !prev)}
          color="teal"
        />
        <Typography className="mb-1">{label}</Typography>
      </div>

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
          {valueList.map((l) => (
            <BaseChip key={l} label={l} onClick={() => remove(l)} />
          ))}
        </div>
      )}
    </>
  );
}
