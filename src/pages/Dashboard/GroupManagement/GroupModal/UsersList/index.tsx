import { BaseButton } from '@ui/atoms/BaseButton';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { debounce } from 'lodash';
import { SearchInput } from '@ui/atoms/Inputs/SearchInput';
import { IDaAs, TGroup } from '@src/services/users/types';
import { AddCardList } from '@src/pages/Dashboard/GroupManagement/GroupModal/components/AddCardList';
import { Control, useFormContext } from 'react-hook-form';
import {
  GroupsType,
  TUsersListProps,
} from '@src/pages/Dashboard/GroupManagement/GroupModal/types';
import { EditCardList } from '../components/EditCardList';
import { TUserList } from '../../type';

function isTGroupList(groups: GroupsType): groups is TGroup {
  return (groups as TGroup).id !== undefined;
}

export function UsersList({
  users,
  control,
  isAddNew,
  setIsAddNew,
  listDaas,
  loading,
  updateGroup,
}: TUsersListProps) {
  const { t } = useTranslation();
  const { watch } = useFormContext();
  const [filterQuery, setFilterQuery] = useState<string>('');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetFilterQuery = useCallback(
    debounce((query: string) => {
      setFilterQuery(query);
    }, 1000),
    []
  );

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSetFilterQuery(event.target.value);
  };

  const handleUpdateGroupData = () => {
    const mergedUsers = [...users.users, ...watch('users')];

    updateGroup({
      users: mergedUsers.map((item) => item.id),
      admins: users.admins.map((item: any) => item.id),
      name: users.name,
    } as any);
  };

  const handleRemoveItem = (id: string) => {
    if (isTGroupList(users)) {
      const updatedusers = users.users.filter((item) => item.id !== id);

      updateGroup({
        users: updatedusers.map((item) => item.id) as any,
        admins: users.admins.map((item) => item.id) as any,
        name: users.name,
      } as any);
    }
  };

  const usersList = isAddNew
    ? listDaas.filter(
        (item) =>
          isTGroupList(users) &&
          !users.users.some((user) => item.id === user.id)
      )
    : [];

  const usersUpdate = users as unknown as TUserList;

  const filterSelectedAdmins =
    watch('admins') !== undefined
      ? usersUpdate.filter(
          (item) => !watch('admins').some((admin: any) => item.id === admin.id)
        )
      : (users as TGroup);

  const list = isAddNew ? usersList : filterSelectedAdmins;

  const updatedList = watch('admins') ? filterSelectedAdmins : list;

  return (
    <div className={`${loading ? 'loading' : ''}`}>
      <SearchInput
        name=""
        value={filterQuery}
        onChange={handleFilterChange}
        className="w-full"
      />
      {isTGroupList(users) && !isAddNew ? (
        <div className="flex flex-col items-center">
          <div className="w-full space-y-4 h-72 overflow-auto">
            {users.users.map((item) => (
              <EditCardList
                onClick={handleRemoveItem}
                item={item}
                key={item.id}
              />
            ))}
          </div>
          <BaseButton
            label={t('groupManagement.newAdmin')}
            submit
            size="md"
            onClick={() => setIsAddNew(true)}
            className="mt-4"
            endIcon="ph:plus"
          />
        </div>
      ) : (
        <div className="flex flex-col items-center  w-full">
          <div className="w-full space-y-4 h-72 overflow-auto">
            {Array.isArray(updatedList) &&
              updatedList.map((item: any) => (
                <AddCardList
                  key={item.id}
                  id={`checkbox-${item.id}`}
                  label={'email' in item ? item.email : ''}
                  // selectedValue={watch('admins')}
                  name="users"
                  data={item}
                  control={control}
                />
                // <div
                //   key={'id' in item ? item.id : 'key'}
                //   className="bg-neutral-100 rounded-lg p-2 flex items-center mx-2"
                // >
                //   {'id' in item && (
                //     <BaseCustomCheckBox
                //       key={item.id}
                //       name="users"
                //       data={item}
                //       label={'email' in item ? item.email : ''}
                //       id={`checkbox-${item.id}`}
                //       control={control}
                //     />
                //   )}
                //   <label
                //     className="mx-1"
                //     htmlFor={`checkbox-${'id' in item ? item.id : 'key'}`}
                //   >
                //     <Typography variant="body2" color="neutral">
                //       {'name' in item ? item.name : ''}
                //     </Typography>
                //   </label>
                //   <Circle id className="mr-auto" />
                // </div>
              ))}
          </div>

          <div className="w-full flex justify-between">
            {isAddNew && (
              <BaseButton
                label={t('global.cancel')}
                submit
                size="md"
                onClick={() => setIsAddNew(false)}
                type="secondary"
                className="mt-4"
                endIcon="pha:x"
              />
            )}

            {!users.id ? (
              <BaseButton
                label="ثبت"
                size="md"
                loading={loading}
                className="mt-4"
                submit
              />
            ) : (
              <BaseButton
                label="ثبت"
                size="md"
                loading={loading}
                onClick={handleUpdateGroupData}
                className="mt-4"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
