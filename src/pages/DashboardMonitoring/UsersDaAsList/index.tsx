import { useCallback, useState } from 'react';
import { LoadingSpinner } from '@ui/molecules/Loading';
import { NoResult } from '@ui/molecules/NoResult';
import { UserDaAsCard } from './UserDaAsCard';
import { ETimeLimitDuration } from '@src/services/users/types';
import { IDaAs } from '@src/services/users/types';
import useSWR from 'swr';
import { http } from '@src/services/http';
import { IResponsePagination } from '@src/types/services';
import { E_USERS_DAAS } from '@src/services/users/endpoint';
import Pagination from '@ui/molecules/Pagination';
import { IHeaderDaasCard } from '@src/pages/DashboardDesktopList/DaAsList/types';
import { createAPIEndpoint } from '@src/helper/utils';
import { debounce } from 'lodash';
import { SearchInput } from '@ui/atoms/Inputs/SearchInput';
import { useTranslation } from 'react-i18next';

const PAGE_SIZE = 8;
const PAGE = 1;

export function UsersDaAsList() {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState<number>(PAGE);
  const [filterQuery, setFilterQuery] = useState<string>('');

  const headerItem: IHeaderDaasCard = {
    id: t('table.observeUserBehavior'),
    email: t('table.userName'),
    http_port: 'پورت http',
    https_port: 'پورت https',
    created_at: t('table.dateOfCreated'),
    daas_configs: {
      time_limit_duration: ETimeLimitDuration.DAILY,
      time_limit_value_in_hour: '',
      can_download_file: '',
      clipboard_down: '',
      clipboard_up: '',
      webcam_privilege: '',
      microphone_privilege: '',
      max_transmission_download_size: '',
      max_transmission_upload_size: '',
      can_upload_file: 'تنظیمات دسترسی',
      is_globally_config: '',
    },
    forbidden_upload_files: '',
    forbidden_download_files: '',
    last_uptime: t('table.numberOfScans'),
    is_running: t('table.userStatus'),
    usage_in_minute: 'زمان استفاده شده',
    extra_allowed_download_files: '',
    extra_allowed_upload_files: '',
    allowed_files_type_for_download: '',
    allowed_files_type_for_upload: '',
    daas_version: 'نسخه دسکتاپ',
    is_lock: 'دسکتاپ',
  };

  const endpoint = createAPIEndpoint({
    endPoint: E_USERS_DAAS,
    pageSize: PAGE_SIZE,
    currentPage,
    filterQuery,
  });
  const { data, isLoading } = useSWR<IResponsePagination<IDaAs>>(
    endpoint,
    http.fetcherSWR
  );

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
      <UserDaAsCard daas={headerItem} isHeader />
      {isLoading ? (
        <LoadingSpinner />
      ) : listDaas.length > 0 ? (
        listDaas.map((item) => <UserDaAsCard key={item.id} daas={item} />)
      ) : (
        <NoResult />
      )}
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
