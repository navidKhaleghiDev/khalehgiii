import { useState, memo } from 'react';

import { useTranslation } from 'react-i18next';
import { useLanguage } from '@context/settings/languageContext';
import { BaseInput } from '../BaseInput';

interface SearchInputProps {
  value: string;
  name: string;
  className?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function SearchInputComponent({
  onChange,
  value,
  name,
  className,
}: SearchInputProps) {
  const [searchValue, setSearchValue] = useState(value);
  const { t } = useTranslation();
  const { lang } = useLanguage();
  const lableDirection = lang === 'en';

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    onChange(event);
  };

  return (
    <div className={className}>
      <BaseInput
        ltrLabel={lableDirection}
        size="sm"
        name={name}
        placeholder={t('table.search')}
        id={name}
        pureOnChange={handleFilterChange}
        pureValue={searchValue}
        autoComplete="off"
        fullWidth
      />
    </div>
  );
}
export const SearchInput = memo(SearchInputComponent);
