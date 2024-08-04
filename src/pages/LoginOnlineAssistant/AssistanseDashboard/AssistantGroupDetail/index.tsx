import { useState, useEffect, useCallback } from 'react';
import { BaseButton, Typography } from '@ui/atoms';
import { Circle } from '@ui/atoms/BaseTable/components/tableIcons/Circle';
import { useTranslation } from 'react-i18next';
import {
  API_ONLINE_ASSISTANSE,
  API_USERS_GROUPS_GET,
} from '@src/services/users';
import { toast } from 'react-toastify';
import { LoadingSpinner } from '@ui/molecules/Loading';
import { TGroup } from '@src/services/users/types';

type TAssistanseGroupDetailProps = {
  id: string;
};

export function AssistantGroupDetail({ id }: TAssistanseGroupDetailProps) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [memberList, setMemberList] = useState<TGroup['users']>([]);

  const isValid = memberList && !loading && id;

  const handleGetGroupMembers = useCallback(async () => {
    setLoading(true);
    await API_USERS_GROUPS_GET(id)
      .then((data) => {
        const usersData = data.data?.users;
        setMemberList(usersData);
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleGoToUsersDesktop = async (memberId: string) => {
    if (!memberId) return;
    const object = {
      id: memberId,
    };
    setLoading(true);
    await API_ONLINE_ASSISTANSE(object)
      .then((data) => {})
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (id) {
      handleGetGroupMembers();
    }
  }, [handleGetGroupMembers, id]);

  return (
    <div className="grid w-full grid-cols-12 gap-6 mb-4">
      {isValid ? (
        memberList.map((member) => (
          <div
            key={member.id}
            className="bg-neutral-100 rounded-lg p-2 h-12 col-span-10 md:col-span-6 xl:col-span-4 flex"
          >
            <div className="flex  gap-4 items-center mx-2">
              <BaseButton
                label={t('onlineAssistant.enterDesktop')}
                onClick={() => handleGoToUsersDesktop(member.id)}
              />
              <Circle id className="bg-red-500" />
            </div>
            <Typography variant="body2" color="neutral" className="mr-auto">
              {member?.email}
            </Typography>
          </div>
        ))
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
}
