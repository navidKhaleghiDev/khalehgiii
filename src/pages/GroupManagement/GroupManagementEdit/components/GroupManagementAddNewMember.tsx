import { useState, useRef } from 'react';
import { BaseButton, Card } from '@redesignUi/atoms';
import { SearchInput } from '@redesignUi/atoms/Inputs/SearchInput';
import { useTranslation } from 'react-i18next';

import { http } from '@src/services/http';
import useSWR from 'swr';
import { IResponsePagination } from '@src/types/services';
import { IDaAs } from '@src/services/users/types';
import { E_USERS_DAAS } from '@src/services/users/endpoint';
import { createAPIEndpoint } from '@src/helper/utils';

import { GroupManagementAddNewMemberProps } from '../../types';
import { GroupManagementUsersList } from '../../components/GroupManagementUsersList';

const PAGE_SIZE = 10;
const PAGE = 1;

export function GroupManagementAddNewMember(
  props: GroupManagementAddNewMemberProps
) {
  const { handleCloseModal, onClick } = props;
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState<number>(PAGE);
  const [filterQuery, setFilterQuery] = useState<string>('');
  const [selectedData, setSelectedData] = useState({ users: [], admins: [] });

  const keyRef = useRef('users');

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

  const list = data?.data?.results ?? [];
  const countPage = data?.data?.count || 0;

  const listDaas = list.map((item) => {
    return { ...item, value: 'users' };
  });
  const buttonCondition =
    selectedData.users.length === 0 && selectedData.admins.length === 0;

  return (
    <div className="w-full">
      <div className=" h-[26.25rem] overflow-auto mt-4 pe-4">
        <Card
          shadow="sm"
          border
          rounded="xl"
          className="border-gray-200 py-4 dark:border-gray-500 !bg-transparent"
        >
          <div className="flex flex-col justify-between gap-2">
            <SearchInput
              fullWidth
              className="w-1/2 mx-5 sm:w-[255px] -mb-3"
              onChange={(e) => setFilterQuery(e)}
              value={filterQuery}
              id="search"
              name="search"
              placeholder={t('groupManagement.searchGroup')}
            />
            <GroupManagementUsersList
              filterQuery={filterQuery}
              selectedData={selectedData}
              setSelectedData={setSelectedData}
              memberData={listDaas}
              countPage={countPage}
              currentPage={currentPage}
              pageSize={PAGE_SIZE}
              isLoading={isLoading}
              setCurrentPage={setCurrentPage}
              keyRef={keyRef}
            />
          </div>
        </Card>
      </div>
      <div className="flex justify-center my-5 gap-3">
        <BaseButton
          disabled={buttonCondition}
          onClick={() => (onClick ? onClick(selectedData) : undefined)}
          label={t('global.confirm')}
          loading={isLoading}
        />
        <BaseButton
          type="neutral"
          label={t('global.cancel')}
          onClick={handleCloseModal}
        />
      </div>
    </div>
  );
}
