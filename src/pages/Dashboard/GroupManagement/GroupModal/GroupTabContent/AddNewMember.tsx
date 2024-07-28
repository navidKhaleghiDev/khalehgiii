import { BaseButton } from '@ui/atoms/BaseButton';
import { useTranslation } from 'react-i18next';
import { Control, useFormContext } from 'react-hook-form';
import { AddCardList } from '@src/pages/Dashboard/GroupManagement/GroupModal/components/AddCardList';
import { IDaAs, TGroup } from '@src/services/users/types';

import { IResponsePagination } from '@src/types/services';
import useSWR from 'swr';
import { http } from '@src/services/http';
import { createAPIEndpoint } from '@src/helper/utils';
import { E_USERS_DAAS } from '@src/services/users/endpoint';
import { LoadingSpinner } from '@ui/molecules/Loading';
import { TUserList } from '@src/pages/Dashboard/GroupManagement/type';

function removeDuplicateObjectsWithId<
  TBaseList extends { id: string },
  TList extends { id: string }[]
>(baseList: TBaseList[], ...lists: TList[]): TBaseList[] {
  return baseList.filter(
    (item) => !lists.some((list) => list.some((item2) => item.id === item2.id))
  );
}

type AddNewMemberProps = {
  control: Control<any>;
  isUpdatingGroupMember: boolean;
  onCancel: () => void;
  onClickMainButton: () => void;
  group?: TGroup;
  isAdmins?: boolean;
  activeTab?: number;
};
const PAGE_SIZE = 8;

export function AddNewMember({
  control,
  isUpdatingGroupMember,
  onCancel,
  onClickMainButton,
  isAdmins,
  group,
  activeTab,
}: AddNewMemberProps) {
  const name = isAdmins ? 'admins' : 'users';
  const { t } = useTranslation();
  const { watch, setValue } = useFormContext();

  const endpoint = createAPIEndpoint({
    endPoint: E_USERS_DAAS,
    pageSize: PAGE_SIZE,
    currentPage: 1,
    filterQuery: '',
  });

  const { data, isLoading } = useSWR<IResponsePagination<IDaAs>>(
    endpoint,
    http.fetcherSWR
  );
  const listDaas: IDaAs[] = data?.data?.results ?? [];

  const filteredListCreate =
    activeTab === 1
      ? removeDuplicateObjectsWithId(
          listDaas,
          watch('admins') ? watch('admins') : []
        )
      : listDaas;
  const filteredList =
    group && isUpdatingGroupMember
      ? removeDuplicateObjectsWithId<IDaAs, TUserList>(
          listDaas,
          isAdmins ? group?.admins ?? [] : group?.users ?? []
        )
      : filteredListCreate;

  const handleCheckboxChange = (item: IDaAs, isChecked: boolean) => {
    const currentItems = watch(name) || [];
    if (isChecked) {
      setValue(name, [...currentItems, item]);
    } else {
      setValue(
        name,
        currentItems.filter((i: { id: string }) => i.id !== item.id)
      );
    }
  };

  return (
    <div className="flex flex-col items-center ">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="w-full space-y-4 h-72 overflow-auto">
          {filteredList.map((item: IDaAs) => (
            <AddCardList
              key={item.id}
              id={item.id}
              label={'email' in item ? item.email : ''}
              onChangeCheckBox={(e) => {
                handleCheckboxChange(item, e.target.checked);
              }}
              name={name}
              control={control}
            />
          ))}
        </div>
      )}

      <div className="w-full flex justify-between">
        {isUpdatingGroupMember && (
          <BaseButton
            label={t('global.cancel')}
            size="md"
            onClick={onCancel}
            type="secondary"
            className="mt-4"
            endIcon="pha:x"
            disabled={isLoading}
          />
        )}
        <BaseButton
          label={
            isUpdatingGroupMember || activeTab === 1
              ? t('global.confirm')
              : t('groupManagement.next')
          }
          size="md"
          onClick={onClickMainButton}
          className="mt-4"
          disabled={isLoading}
        />
      </div>
    </div>
  );
}
