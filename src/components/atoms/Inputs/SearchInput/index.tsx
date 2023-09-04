import { useDebounce } from '@src/helper/hooks/useDebounce';
import { useEffect, useState } from 'react';

import { BaseInput } from '../BaseInput';

interface SearchInputProps {
  value: string;
  name: string;

  onChange: (value: string) => void;
}

export function SearchInput({ value, onChange, name }: SearchInputProps) {
  const [searchValue, setSearchValue] = useState(value);
  const debouncedSearchValue = useDebounce(searchValue, 500);

  useEffect(() => {
    onChange(debouncedSearchValue);
  }, [debouncedSearchValue, onChange]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <div>
      <BaseInput
        size="sm"
        name={name}
        placeholder="جستجو کنید"
        id={name}
        pureOnChange={handleSearchChange}
        pureValue={searchValue}
        fullWidth
      />
    </div>
  );
}
