import { useState, memo } from "react";

import { BaseInput } from "../BaseInput";

interface SearchInputProps {
  value: string;
  name: string;
  className?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInputComponent = ({
  onChange,
  value,
  name,
  className,
}: SearchInputProps) => {
  const [searchValue, setSearchValue] = useState(value);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    onChange(event);
  };

  return (
    <div className={className}>
      <BaseInput
        size="sm"
        name={name}
        placeholder="جستجو کنید"
        id={name}
        pureOnChange={handleFilterChange}
        pureValue={searchValue}
        fullWidth
      />
    </div>
  );
};
export const SearchInput = memo(SearchInputComponent);
