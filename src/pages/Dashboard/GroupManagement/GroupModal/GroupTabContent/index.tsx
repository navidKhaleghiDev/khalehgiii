/* eslint-disable no-nested-ternary */
import { useCallback, useState } from 'react';
import { SearchInput } from '@ui/atoms/Inputs/SearchInput';
import { debounce } from 'lodash';
import { Control } from 'react-hook-form';
import { IDaAs, TGroup, UpdateGroupPayload } from '@src/services/users/types';
import { AddNewMember } from '@src/pages/Dashboard/GroupManagement/GroupModal/GroupTabContent/AddNewMember';
import { IResponsePagination } from '@src/types/services';
import useSWR from 'swr';
import { http } from '@src/services/http';
import { createAPIEndpoint } from '@src/helper/utils';
import { LoadingSpinner } from '@ui/molecules/Loading';

import { E_USERS_DAAS } from '@src/services/users/endpoint';
import { EditGroupMembers } from '@src/pages/Dashboard/GroupManagement/GroupModal/GroupTabContent/EditGroupMembers';

export type GroupTabContentProps = {
  group?: TGroup;
  isAdmins?: boolean;
  loading?: boolean;
  control: Control<any>;
  onAddNewMember: any;
  onUpdateGroup: (updatedList: UpdateGroupPayload) => void;
};

export function GroupTabContent({
  group,
  control,
  onUpdateGroup,
  isAdmins,
  loading,
  onAddNewMember,
}: GroupTabContentProps) {
  // const { t } = useTranslation();
  // const { watch } = useFormContext();
  const [isUpdatingGroupMember, setIsUpdatingGroupMember] = useState(false);
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

  const toggleAddNewMember = () => {
    setIsUpdatingGroupMember(!isUpdatingGroupMember);
  };
  return (
    <div>
      <SearchInput
        name=""
        value={filterQuery}
        onChange={handleFilterChange}
        className="w-full"
      />
      {loading ? (
        <LoadingSpinner />
      ) : group && !isUpdatingGroupMember ? (
        <EditGroupMembers
          group={group}
          onUpdateGroup={onUpdateGroup}
          onClickAddNewAdmin={toggleAddNewMember}
          isAdmins={isAdmins}
        />
      ) : (
        <AddNewMember
          control={control}
          isUpdatingGroupMember={isUpdatingGroupMember}
          onCancel={toggleAddNewMember}
          onClickMainButton={onAddNewMember}
          name={isAdmins ? 'admins' : 'users'}
        />
      )}
    </div>
  );
}
