import { useState, memo } from 'react';

import { BaseInput } from '../BaseInput';
import { useTranslation } from 'react-i18next';

interface SearchInputProps {
	value: string;
	name: string;
	className?: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInputComponent = ({ onChange, value, name, className }: SearchInputProps) => {
	const [searchValue, setSearchValue] = useState(value);
	const { t } = useTranslation();

	const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(event.target.value);
		onChange(event);
	};

	return (
		<div className={className}>
			<BaseInput
				size="sm"
				name={name}
				placeholder={t('table.search')}
				id={name}
				pureOnChange={handleFilterChange}
				pureValue={searchValue}
				fullWidth
			/>
		</div>
	);
};
export const SearchInput = memo(SearchInputComponent);
