import { BaseButton } from '@ui/atoms/BaseButton';
import { useTranslation } from 'react-i18next';

import { TGroup, UpdateGroupPayload } from '@src/services/users/types';
import { EditCardList } from '../components/EditCardList';

type EditGroupMembersProps = {
  group?: TGroup;
  isAdmins?: boolean;
  activeTab?: number;
  onUpdateGroup: (updatedGroup: UpdateGroupPayload) => void;
  onClickAddNewAdmin: () => void;
};

export function EditGroupMembers({
  group,
  onUpdateGroup,
  isAdmins,
  onClickAddNewAdmin,
  activeTab,
}: EditGroupMembersProps) {
  const { t } = useTranslation();

  const list = isAdmins ? group?.admins ?? [] : group?.users ?? [];

  const updateGroupMembers = (updatedList: { id: string; email: string }[]) => {
    return {
      users: isAdmins
        ? group?.users.map((item) => item.id) || []
        : updatedList.map((item) => item.id),
      admins: isAdmins
        ? updatedList.map((item) => item.id)
        : group?.admins.map((item) => item.id) || [],
      name: group?.name,
    };
  };

  const handleRemoveItem = (id: string) => {
    if (!group) return;
    const updatedList = list.filter((item) => item.id !== id);
    const updatedGroup = updateGroupMembers(updatedList);

    onUpdateGroup(updatedGroup as UpdateGroupPayload);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full space-y-4 h-72 overflow-auto">
        {list?.map((item) => (
          <EditCardList
            onClick={() => handleRemoveItem(item.id)}
            item={item}
            key={item.id}
          />
        ))}
      </div>
      <BaseButton
        label={
          activeTab === 0
            ? t('groupManagement.newAdmin')
            : t('groupManagement.newUser')
        }
        submit
        size="md"
        onClick={onClickAddNewAdmin}
        className="mt-4"
        endIcon="ph:plus"
      />
    </div>
  );
}
