import { BaseButton } from '@ui/atoms/BaseButton';
import { useTranslation } from 'react-i18next';

import { TGroup, UpdateGroupPayload } from '@src/services/users/types';
import { EditCardList } from '../components/EditCardList';

type EditGroupMembersProps = {
  group: TGroup;
  isAdmins?: boolean;
  onUpdateGroup: (updatedGroup: UpdateGroupPayload) => void;
  onClickAddNewAdmin: () => void;
};

export function EditGroupMembers({
  group,
  onUpdateGroup,
  isAdmins,
  onClickAddNewAdmin,
}: EditGroupMembersProps) {
  const { t } = useTranslation();

  const handleRemoveItem = (id: string) => {
    const updatedAdmins = group.admins.filter((item) => item.id !== id);
    onUpdateGroup({
      users: group.users.map((item) => item.id),
      admins: updatedAdmins.map((item) => item.id),
      name: group.name,
    });
  };

  const list = isAdmins ? group.admins : group.users;
  return (
    <div className="flex flex-col items-center">
      <div className="w-full space-y-4 h-72 overflow-auto">
        {list.map((item) => (
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
        onClick={onClickAddNewAdmin}
        className="mt-4"
        endIcon="ph:plus"
      />
    </div>
  );
}
