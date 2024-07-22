import { BaseButton } from '@ui/atoms/BaseButton';
import { Typography } from '@ui/atoms';
import { useCallback, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { debounce } from 'lodash';
import { BaseCustomCheckBox } from '@ui/atoms/Inputs/BaseCustomCheckBox';
import { Circle } from '@ui/atoms/BaseTable/components/tableIcons/Circle';
import { SearchInput } from '@ui/atoms/Inputs/SearchInput';
import { API_USERS_GROUPS_UPDATE } from '@src/services/users';
import { toast } from 'react-toastify';
import { IDaAs } from '@src/services/users/types';
import { Control } from 'react-hook-form';
import { EditCardList } from '../components/EditCardList';
import { TGroupList } from '../../type';

type TUsersListProps = {
  users: GroupsType;
  control: Control<any>;
  isAddNew: boolean;
  setIsAddNew: React.Dispatch<React.SetStateAction<boolean>>;
  listDaas: IDaAs[];
};
type GroupsType = IDaAs[] | TGroupList;

let updatedGroupList;
function isTGroupList(groups: GroupsType): groups is TGroupList {
  return (groups as TGroupList).id !== undefined;
}

export function UsersList({
  users,
  control,
  isAddNew,
  setIsAddNew,
  listDaas,
}: // watch,
TUsersListProps) {
  const { t } = useTranslation();
  const [filterQuery, setFilterQuery] = useState<string>('');

  // const [showConfirm, setShowConfirm] = useState(false);

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

  const updateGroup = async (data: TGroupList) => {
    await API_USERS_GROUPS_UPDATE(data)
      .then(() => {
        toast.success(t('global.successfullyAdded'));
      })
      .catch((err) => {
        toast.error(err);
      })
      .finally(() => {});
  };

  const handleRemoveItem = (id: string) => {
    if (isTGroupList(users)) {
      const updatedusers = users.users.filter((item) => item.id !== id);
      updatedGroupList = {
        ...users,
        users: updatedusers,
      };
      updateGroup(updatedGroupList);
    }
  };

  const adminList = isAddNew
    ? listDaas.filter(
        (item) =>
          isTGroupList(users) &&
          !users.users.some((user) => item.id === user.id)
      )
    : [];

  const list = isAddNew ? adminList : users;

  return (
    <div>
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
            {Array.isArray(list) &&
              list.map((item: IDaAs | TGroupList) => (
                <div
                  key={'id' in item ? item.id : 'key'}
                  className="bg-neutral-100 rounded-lg p-2 flex items-center mx-2"
                >
                  {'id' in item && (
                    <BaseCustomCheckBox
                      key={item.id}
                      name="admins"
                      data={item}
                      label={'email' in item ? item.email : ''}
                      id={`checkbox-${item.id}`}
                      control={control}
                    />
                  )}
                  <label
                    className="mx-1"
                    htmlFor={`checkbox-${'id' in item ? item.id : 'key'}`}
                  >
                    <Typography variant="body2" color="neutral">
                      {'name' in item ? item.name : ''}
                    </Typography>
                  </label>
                  <Circle id className="mr-auto" />
                </div>
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
            <BaseButton
              label="ثبت"
              submit
              size="md"
              // onClick={() => setShowConfirm(true)}
              className="mt-4"
            />
          </div>
        </div>
      )}
    </div>
  );
}
