import { IconButton } from "@ui/atoms/BaseButton";
import plusIcon from "@iconify-icons/ph/plus";
import minusIcon from "@iconify-icons/ph/minus";
import { BaseInput, Typography } from "@ui/atoms";
import { useState } from "react";
import { BaseChip } from "@ui/atoms/BaseChip";
import { IDaAs } from "@src/services/users/types";

type PropsType = {
  name: keyof IDaAs;
  valueList: string[];
  label: string;
  onChange: (name: PropsType["name"], values: string[]) => void;
};

export function DlpList({ name, valueList, onChange, label }: PropsType) {
  const [displayInput, setDisplayInput] = useState(false);

  const [value, setValue] = useState<string>();
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const mValue = (event.target as HTMLInputElement)?.value;

      if (!valueList.includes(mValue) && mValue !== "") {
        onChange(name, [...valueList, mValue]);
        setValue("");
      }
    }
  };

  const remove = (value: string) => {
    let newArray = valueList.filter((item) => item !== value);
    onChange(name, newArray);
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

      {Array.isArray(valueList) && (
        <div className="flex justify-start gap-1 flex-wrap mb-2" dir="ltr">
          {valueList.map((label, i) => (
            <BaseChip key={i} label={label} onClick={() => remove(label)} />
          ))}
        </div>
      )}
      {displayInput && (
        <BaseInput
          pureValue={value}
          pureOnChange={(event) => setValue(event.target.value)}
          name={name}
          id={name}
          onKeyDown={handleKeyPress}
          placeholder=".text"
          ltrLabel
          fullWidth
        />
      )}
    </>
  );
}
