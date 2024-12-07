import { BaseButton } from '@ui/atoms/BaseButton';
import { useTranslation } from 'react-i18next';

import { GroupParams, UpdateGroupPayload } from '@src/services/users/types';
import { useFormContext } from 'react-hook-form';
import { EditCardList } from '../components/EditCardList';

type EditGroupMembersProps = {
  group?: GroupParams;
  isAdmins?: boolean;
  activeTab?: number;
  onUpdateGroup: (updatedGroup: UpdateGroupPayload) => void;
  onClickAddNewAdmin: () => void;
  permissions: boolean;
};

export function EditGroupMembers({
  group,
  onUpdateGroup,
  isAdmins,
  onClickAddNewAdmin,
  activeTab,
  permissions,
}: EditGroupMembersProps) {
  const { watch } = useFormContext();
  const { t } = useTranslation();

  const list = isAdmins ? group?.admins ?? [] : group?.users ?? [];

  const updateGroupMembers = (updatedList: { id: string; email: string }[]) => {
    return {
      users: isAdmins ? group?.users || [] : updatedList,
      admins: isAdmins ? updatedList : group?.admins || [],
      name: watch('name') === group?.name ? group?.name : watch('name'),
    };
  };

  const handleRemoveItem = (id: string) => {
    if (!group) return;
    const updatedList = list.filter((item) => item.id !== id);
    const updatedGroup = updateGroupMembers(updatedList);

    onUpdateGroup(updatedGroup);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full space-y-4 h-72 overflow-auto">
        {list?.map((item) => (
          <EditCardList
            permissions={permissions}
            onClick={() => handleRemoveItem(item.id)}
            item={item}
            key={item.id}
            disabled={isAdmins && list.length <= 1}
          />
        ))}
      </div>
      {permissions ? (
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
      ) : null}
    </div>
  );
}
