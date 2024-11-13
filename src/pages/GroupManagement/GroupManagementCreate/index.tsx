import { useState, useRef } from 'react';
import { BaseButton, Card } from '@redesignUi/atoms';
import { SearchInput } from '@redesignUi/atoms/Inputs/SearchInput';
import { useTranslation } from 'react-i18next';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { http } from '@src/services/http';
import useSWR from 'swr';
import { IResponsePagination } from '@src/types/services';
import { IDaAs, TGroup } from '@src/services/users/types';
import { E_USERS_DAAS } from '@src/services/users/endpoint';
import { createAPIEndpoint } from '@src/helper/utils';
import { useLanguage } from '@context/settings/languageContext';
import { BaseInputController } from '@redesignUi/atoms/Inputs/BaseInput/Controller';
import { BaseInputUploadImageController } from '@redesignUi/atoms/BaseInputUploadImage/Controller';
import { API_USERS_GROUPS_CREATE } from '@src/services/users';

import { GroupManagementUsersList } from '../components/GroupManagementUsersList';
import {
  GroupManagementCreateProps,
  TGroupCreate,
  TGroupUpdate,
} from '../types';

const PAGE_SIZE = 10;
const PAGE = 1;

const buildFormData = (data: TGroupUpdate) => {
  const formData = new FormData();
  formData.append('name', data.name);
  if (data.image === '' || data.image instanceof Blob) {
    formData.append('image', data?.image);
  }
  data.users.forEach((user) => formData.append('users', user.id));
  data.admins.forEach((admin) => formData.append('admins', admin.id));
  return formData;
};

export function GroupManagementCreate(props: GroupManagementCreateProps) {
  const { handleCloseModal } = props;
  const { t } = useTranslation();
  const { lang } = useLanguage();

  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(PAGE);
  const [filterQuery, setFilterQuery] = useState<string>('');
  const [selectedData, setSelectedData] = useState({ users: [], admins: [] });

  const keyRef = useRef('users');

  const dir = lang === 'fa' ? 'rtl' : 'ltr';

  const endpoint = createAPIEndpoint({
    endPoint: E_USERS_DAAS,
    pageSize: PAGE_SIZE,
    currentPage,
    filterQuery,
  });

  const { data, isLoading, mutate } = useSWR<IResponsePagination<IDaAs>>(
    endpoint,
    http.fetcherSWR
  );

  const list = data?.data?.results ?? [];
  const countPage = data?.data?.count || 0;

  const listDaas = list.map((item) => {
    return { ...item, value: 'users' };
  });

  const { control, handleSubmit } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: '',
      image: '',
    },
  });

  const createGroup = async (listData: TGroup) => {
    setLoading(true);
    await API_USERS_GROUPS_CREATE(listData)
      .then(() => {
        toast.success(t('global.successfullyAdded'));
        mutate();
      })
      .catch((err) => {
        toast.error(err);
      })
      .finally(() => {
        setLoading(false);
        handleCloseModal();
      });
  };

  const onSubmit: SubmitHandler<TGroupCreate> = (listData) => {
    const updatedData = {
      ...listData,
      ...selectedData,
    };

    createGroup(buildFormData(updatedData) as any);
  };

  return (
    <div className="w-full">
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card
            shadow="sm"
            border
            rounded="xl"
            className="flex items-center px-2 border-gray-200 dark:border-gray-500 !bg-transparent"
          >
            <div className="flex justify-center items-center gap-4 p-1">
              <BaseInputUploadImageController name="image" control={control} />
              <BaseInputController
                fullWidth
                dir={dir}
                className=""
                id="name"
                name="name"
                control={control}
                label={t('groupManagement.groupName')}
                placeholder={t('groupManagement.development')}
              />
            </div>
          </Card>

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
          <div className="flex  justify-center my-5  gap-3   ">
            <BaseButton submit label={t('global.confirm')} loading={loading} />
            <BaseButton
              type="neutral"
              label={t('global.cancel')}
              onClick={handleCloseModal}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
