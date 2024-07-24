import { BaseButton } from '@ui/atoms/BaseButton';
import { Typography } from '@ui/atoms';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SearchInput } from '@ui/atoms/Inputs/SearchInput';
import { debounce } from 'lodash';
import { Circle } from '@ui/atoms/BaseTable/components/tableIcons/Circle';
import { Control, useFormContext } from 'react-hook-form';
import { BaseCustomCheckBox } from '@ui/atoms/Inputs/BaseCustomCheckBox';
import { IDaAs } from '@src/services/users/types';
import { EditCardList } from '../components/EditCardList';
import { TGroupList, TGroupListUpdate } from '../../type';

type TAdminsListProps = {
  admins: TGroupList;
  control: Control<any>;
  isAddNew: boolean;
  setIsAddNew: React.Dispatch<React.SetStateAction<boolean>>;
  listDaas: IDaAs[];
  handleChangeTab: () => void;
  updateGroup: (updatedList: TGroupList) => void;
};
type GroupsType = IDaAs[] | TGroupList;

let updatedGroupList: TGroupListUpdate;

function isTGroupList(groups: GroupsType): groups is TGroupList {
  return (groups as TGroupList).id !== undefined;
}

export function AdminsList({
  admins,
  control,
  isAddNew,
  setIsAddNew,
  listDaas,
  handleChangeTab,
  updateGroup,
}: TAdminsListProps) {
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
    const mergedAdmins = [...admins.admins, ...watch('admins')];

    updatedGroupList = {
      users: admins.users.map((item) => item.id) as any,
      admins: mergedAdmins.map((item) => item.id),
      name: admins.name,
    };
    updateGroup(updatedGroupList as any);
  };

  const handleRemoveItem = (id: string) => {
    if (isTGroupList(admins)) {
      const updatedAdmins = admins.admins.filter((item) => item.id !== id);
      updatedGroupList = {
        users: admins.users.map((item) => item.id) as any,
        admins: updatedAdmins.map((item) => item.id) as any,
        name: admins.name,
      };
      updateGroup(updatedGroupList as any);
    }
  };

  const adminList = isAddNew
    ? listDaas.filter(
        (item) =>
          isTGroupList(admins) &&
          !admins.admins.some((admin) => item.id === admin.id)
      )
    : [];

  const list = isAddNew ? adminList : admins;

  return (
    <div>
      <SearchInput
        name=""
        value={filterQuery}
        onChange={handleFilterChange}
        className="w-full"
      />
      {isTGroupList(admins) && !isAddNew ? (
        <div className="flex flex-col items-center">
          <div className="w-full space-y-4 h-72 overflow-auto">
            {admins.admins.map((item) => (
              <EditCardList
                onClick={() => handleRemoveItem(item.id)}
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
        <div className="flex flex-col items-center ">
          <div className="w-full space-y-4 h-72 overflow-auto">
            {Array.isArray(list) &&
              list.map((item: IDaAs | TGroupList) => (
                <div
                  key={'id' in item ? item.id : 'key'}
                  className="bg-neutral-100 rounded-lg p-2 flex items-center mx-2"
                >
                  {'id' in item && (
                    <BaseCustomCheckBox
                      defaultValue={watch('admins')}
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
                size="md"
                onClick={() => setIsAddNew(false)}
                type="secondary"
                className="mt-4"
                endIcon="pha:x"
              />
            )}
            <BaseButton
              label={isAddNew ? t('global.confirm') : t('groupManagement.next')}
              size="md"
              onClick={!isAddNew ? handleChangeTab : handleUpdateGroupData}
              className="mt-4"
            />
          </div>
        </div>
      )}
    </div>
  );
}
