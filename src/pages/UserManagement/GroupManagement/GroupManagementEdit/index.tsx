import { LoadingSpinner } from '@ui/molecules/Loading';
import { useEffect, useState } from 'react';
import { USERS_GROUPS_GET } from '@src/services/users/endpoint';
import { http } from '@src/services/http';
import useSWR from 'swr';
import { ResponseData } from '@src/types/services';
import { useParams } from 'react-router-dom';
import { BackButton } from '@redesignUi/atoms/BackButton';
import { GroupParams } from '../types';
import { GroupManagementEditRenderComponents } from './GroupManagementEditComponentRenderer';

export function GroupManagementEdit() {
  const { id } = useParams();

  const [updateGroup, setUpdateGroup] = useState<GroupParams>({
    id: '',
    users: [],
    admins: [],
    name: '',
    created_at: '',
    updated_at: '',
    image: '',
    online_users: 0,
  });
  const { data, isLoading, mutate } = useSWR<ResponseData<GroupParams>>(
    id ? USERS_GROUPS_GET(id) : null,
    http.fetcherSWR
  );

  const group = data?.data;

  useEffect(() => {
    if (group) {
      setUpdateGroup(group);
    }
  }, [group]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const editCondition =
    updateGroup.users.length >= 1 || updateGroup.admins.length >= 1;

  return (
    <div>
      <div className="flex justify-end">
        <BackButton />
      </div>
      {!isLoading && group && editCondition && (
        <GroupManagementEditRenderComponents
          group={group}
          mutate={mutate}
          updateGroup={updateGroup}
          setUpdateGroup={setUpdateGroup}
        />
      )}
    </div>
  );
}
