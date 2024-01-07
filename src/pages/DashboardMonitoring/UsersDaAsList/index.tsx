import { useCallback, useState } from 'react';
import { IDaAs } from '@src/services/users/types';
import useSWR from 'swr';
import { http } from '@src/services/http';
import { IResponsePagination } from '@src/types/services';
import { E_USERS_DAAS } from '@src/services/users/endpoint';
import Pagination from '@ui/molecules/Pagination';
import { createAPIEndpoint } from '@src/helper/utils';
import { debounce } from 'lodash';
import { SearchInput } from '@ui/atoms/Inputs/SearchInput';
import { useTranslation } from 'react-i18next';
import { BaseTable } from '@ui/atoms/BaseTable';
import { monitoringHeaderItem } from '@src/constants/tableHeaders/monitoringHeaderItem';
import { useNavigate } from 'react-router-dom';

const PAGE_SIZE = 8;
const PAGE = 1;

export function UsersDaAsList() {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const [currentPage, setCurrentPage] = useState<number>(PAGE);
	const [filterQuery, setFilterQuery] = useState<string>('');

	const userHandler = (url: any, list: any) => {
		return navigate(`${url}/${list.email}`);
	};

	const endpoint = createAPIEndpoint({
		endPoint: E_USERS_DAAS,
		pageSize: PAGE_SIZE,
		currentPage,
		filterQuery,
	});
	const { data, isLoading } = useSWR<IResponsePagination<IDaAs>>(endpoint, http.fetcherSWR);

	const debouncedSetFilterQuery = useCallback(
		debounce((query: string) => {
			setCurrentPage(PAGE);
			setFilterQuery(query);
		}, 1000),
		[]
	);

	const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		debouncedSetFilterQuery(event.target.value);
	};

	const listDaas = data?.data?.results ?? [];
	const countPage = data?.data?.count || 0;

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	return (
		<div className="w-full p-4">
			<div className="flex items-center justify-between">
				<SearchInput
					name="search-users-daas-list"
					value={filterQuery}
					onChange={handleFilterChange}
					className="w-1/4"
				/>
			</div>
			<BaseTable body={listDaas} header={monitoringHeaderItem()} onClick={userHandler} />
			{!!countPage && (
				<Pagination
					currentPage={currentPage}
					totalPages={Math.ceil(countPage / PAGE_SIZE)}
					onPageChange={handlePageChange}
				/>
			)}
		</div>
	);
}
