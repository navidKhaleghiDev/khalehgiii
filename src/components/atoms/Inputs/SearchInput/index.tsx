import { useDebounce } from "@src/helper/hooks/useDebounce";
import { useEffect, useState } from "react";

import { BaseInput } from "../BaseInput";

interface SearchInputProps {
  value: string;
  name: string;
  className?: string;
  onChange: (value: string) => void;
}

export function SearchInput({
  value,
  onChange,
  name,
  className,
}: SearchInputProps) {
  const [searchValue, setSearchValue] = useState(value);
  // const inputRef = useRef<HTMLInputElement | null>(null);

  const debouncedSearchValue = useDebounce(searchValue, 500);

  useEffect(() => {
    onChange(debouncedSearchValue);
    // if (inputRef.current) {
    //   inputRef.current.focus();
    // }
  }, [debouncedSearchValue, onChange]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className={className}>
      <BaseInput
        size="sm"
        name={name}
        placeholder="جستجو کنید"
        id={name}
        pureOnChange={handleSearchChange}
        pureValue={searchValue}
        // ref={inputRef}
        fullWidth
      />
    </div>
  );
}
