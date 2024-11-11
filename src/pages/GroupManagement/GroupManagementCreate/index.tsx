import { useState } from 'react';

import { Card, Typography, Avatar } from '@redesignUi/atoms';
import { SearchInput } from '@redesignUi/atoms/Inputs/SearchInput';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import userIcon from '@iconify-icons/ph/user';

import { BaseCheckBox } from '@redesignUi/atoms/Inputs/BaseCheckBox';
import { http } from '@src/services/http';
import useSWR from 'swr';
import { IResponsePagination } from '@src/types/services';
import { IDaAs } from '@src/services/users/types';
import { E_USERS_DAAS } from '@src/services/users/endpoint';
import { createAPIEndpoint } from '@src/helper/utils';
import { BaseCheckBoxController } from '@redesignUi/atoms/Inputs/BaseCheckBox/Controller';
import { GroupManagementDropDown } from '../components/GroupManagementDropDown';
import { dropdownOptions } from '../GroupManagementEdit/constants/groupManagementHeaderItem';

const PAGE_SIZE = 10;
const PAGE = 1;
export function GroupManagementCreate() {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState<number>(PAGE);
  const [filterQuery, setFilterQuery] = useState<string>('');
  const [selectedData, setSelectedData] = useState([]);

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

  const listDaas = data?.data?.results ?? [];
  const countPage = data?.data?.count || 0;

  const { control, handleSubmit } = useForm({
    mode: 'onChange',
    defaultValues: {},
  });

  const onSubmit = () => {};

  const handleOnChange = (type, list) => {
    if (type === 'drop') {
      console.log(setSelectedData((prev) => [...prev, list.value]));
    } else console.log(setSelectedData((prev) => [...prev, list]));
  };
  console.log(selectedData);
  return (
    <div className="w-full">
      <Card color="white" shadow="sm" border rounded="lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-between border-b border-gray-200 my-6 w-full">
            <div className="flex flex-col  justify-between gap-2 w-full ">
              <SearchInput
                fullWidth
                className="w-1/2 ml-4 sm:w-[255px]"
                onChange={(e) => setFilterQuery(e)}
                value={filterQuery}
                id="search"
                name="search"
                placeholder={t('groupManagement.searchGroup')}
              />
              {listDaas.map((item) => (
                <div
                  key={item.id}
                  className=" w-full h-12 px-2.5 bg-white rounded-lg border border-gray-100 justify-between items-center inline-flex"
                >
                  <div className="flex items-center gap-2 ">
                    <Avatar icon={userIcon} />
                    <Typography className="text-gray-600 text-xs">
                      {item.email}
                    </Typography>
                  </div>
                  <GroupManagementDropDown
                    onClick={(e: any) => handleOnChange('drop', e)}
                    options={dropdownOptions}
                    defaultValue={{
                      id: item.id,
                      label: t('groupManagement.users'),
                      value: 'users',
                    }}
                  />
                  <BaseCheckBox
                    id={item.id}
                    name={item.email}
                    checked={selectedData?.some((v) => v.id === item.id)}
                    onChange={() => handleOnChange('check', item)}
                  />
                </div>
              ))}
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
}
