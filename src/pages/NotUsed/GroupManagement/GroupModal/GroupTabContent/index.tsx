/* eslint-disable no-nested-ternary */
import { useCallback, useState } from 'react';
import { SearchInput } from '@ui/atoms/Inputs/SearchInput';
import { debounce } from 'lodash';
import { Control } from 'react-hook-form';
import { TGroup, UpdateGroupPayload } from '@src/services/users/types';
import { AddNewMember } from '@src/pages/NotUsed/GroupManagement/GroupModal/GroupTabContent/AddNewMember';
import { EditGroupMembers } from '@src/pages/NotUsed/GroupManagement/GroupModal/GroupTabContent/EditGroupMembers';
import { LoadingSpinner } from '@ui/molecules/Loading';

export type GroupTabContentProps = {
  group: TGroup | undefined;
  isAdmins?: boolean;
  loading?: boolean;
  control: Control<any>;
  onAddNewMember: any;
  activeTab: number;
  onUpdateGroup: (updatedList: UpdateGroupPayload) => void;
  isUpdatingGroupMember: boolean;
  setIsUpdatingGroupMember: (data: boolean) => void;
  permissions: boolean;
};

const PAGE_SIZE = 8;
const PAGE = 1;

export function GroupTabContent({
  group,
  control,
  onUpdateGroup,
  isAdmins,
  loading,
  onAddNewMember,
  activeTab,
  isUpdatingGroupMember,
  setIsUpdatingGroupMember,
  permissions,
}: GroupTabContentProps) {
  const [filterQuery, setFilterQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(PAGE);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetFilterQuery = useCallback(
    debounce((query: string) => {
      setCurrentPage(PAGE);
      setFilterQuery(query);
    }, 2000),
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
        name="search"
        value={filterQuery}
        onChange={handleFilterChange}
        className="w-full"
      />
      {loading ? (
        <LoadingSpinner />
      ) : !isUpdatingGroupMember && group ? (
        <EditGroupMembers
          permissions={permissions}
          activeTab={activeTab}
          group={group}
          onUpdateGroup={onUpdateGroup}
          onClickAddNewAdmin={toggleAddNewMember}
          isAdmins={isAdmins}
        />
      ) : (
        <AddNewMember
          pageSize={PAGE_SIZE}
          currentPage={currentPage}
          filterQuery={filterQuery}
          setCurrentPage={setCurrentPage}
          activeTab={activeTab}
          control={control}
          isUpdatingGroupMember={isUpdatingGroupMember}
          onCancel={toggleAddNewMember}
          onClickMainButton={() => onAddNewMember(isAdmins)}
          isAdmins={isAdmins}
          group={group}
        />
      )}
    </div>
  );
}
