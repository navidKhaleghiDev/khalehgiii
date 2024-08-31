import { useState, useEffect, useRef, useCallback } from 'react';
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
  currentPage: number;
  filterQuery: any;
  setCurrentPage: (number: number) => void;
  pageSize: number;
};

export function AddNewMember({
  control,
  isUpdatingGroupMember,
  onCancel,
  onClickMainButton,
  isAdmins,
  group,
  activeTab,
  currentPage,
  filterQuery,
  setCurrentPage,
  pageSize,
}: AddNewMemberProps) {
  const name = isAdmins ? 'admins' : 'users';
  const { t } = useTranslation();
  const { watch, setValue } = useFormContext();

  const [loadedData, setLoadedData] = useState<IDaAs[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  const endpoint = createAPIEndpoint({
    endPoint: E_USERS_DAAS,
    pageSize,
    currentPage,
    filterQuery,
  });

  const { data, isLoading } = useSWR<IResponsePagination<IDaAs>>(
    endpoint,
    http.fetcherSWR
  );

  const countPage = data?.data?.count || 0;

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

  // IntersectionObserver for infinite scroll
  const observer = useRef<IntersectionObserver | null>(null);
  const lastItemRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading || isFetching) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && currentPage * pageSize < countPage) {
          setIsFetching(true);
          setCurrentPage(currentPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, isFetching, currentPage, pageSize, countPage, setCurrentPage]
  );

  const filteredListCreate =
    activeTab === 1
      ? removeDuplicateObjectsWithId(
          loadedData,
          watch('admins') ? watch('admins') : []
        )
      : loadedData;
  const filteredList =
    group && isUpdatingGroupMember
      ? removeDuplicateObjectsWithId<IDaAs, TUserList>(
          loadedData,
          isAdmins ? group?.admins ?? [] : group?.users ?? []
        )
      : filteredListCreate;

  useEffect(() => {
    setLoadedData([]);
    setCurrentPage(1);
  }, [filterQuery, setCurrentPage]);

  useEffect(() => {
    if (data && data.data.results.length > 0) {
      setLoadedData((prevData) => {
        const existingIds = new Set(prevData.map((item) => item.id));
        const newItems = data.data.results.filter(
          (item) => !existingIds.has(item.id)
        );
        return [...prevData, ...newItems];
      });
    }
  }, [data]);

  useEffect(() => {
    if (!isLoading) {
      setIsFetching(false);
    }
  }, [isLoading]);

  return (
    <div className="flex flex-col items-center">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="w-full space-y-4 h-72 overflow-auto">
          {filteredList.map((item: IDaAs, index) => (
            <div
              ref={index === filteredList.length - 1 ? lastItemRef : undefined}
              key={item.id}
            >
              <AddCardList
                id={item.id}
                label={'email' in item ? item.email : ''}
                onChangeCheckBox={(e) => {
                  handleCheckboxChange(item, e.target.checked);
                }}
                name={name}
                control={control}
              />
            </div>
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
