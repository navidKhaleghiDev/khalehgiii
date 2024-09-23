import { useState, useEffect, useCallback } from 'react';
import { BaseButton, Typography } from '@ui/atoms';
import { Circle } from '@ui/atoms/BaseTable/components/tableIcons/Circle';
import { useTranslation } from 'react-i18next';
import {
  API_ONLINE_ASSISTANCE,
  API_USERS_GROUPS_GET,
} from '@src/services/users';
import { toast } from 'react-toastify';
import { LoadingSpinner } from '@ui/molecules/Loading';
import { TGroup } from '@src/services/users/types';
import ToolTip from '@ui/atoms/Tooltip';
import { useUserContext } from '@context/user/userContext';
import { useNavigate } from 'react-router-dom';
import { ROUTES_PATH } from '@src/routes/routesConstants';

type TAssistanceGroupDetailProps = {
  id: string;
  groupName: string;
};

export function AssistanceGroupDetail({
  id,
  groupName,
}: TAssistanceGroupDetailProps) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [memberList, setMemberList] = useState<TGroup['users']>([]);
  const { user, setUser } = useUserContext();
  const navigate = useNavigate();

  const isValidData = memberList && !loading && id;

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

  const handleGoToUsersDesktop = async (memberId: string, email: string) => {
    if (!memberId) return;
    const object = {
      id: memberId,
      group: groupName,
    };
    setLoading(true);

    await API_ONLINE_ASSISTANCE(object)
      .then((data) => {
        if (user) {
          setUser({
            ...user,
            online_assistance: {
              user_http_address: data?.data?.http || '',
              user_https_address: data?.data?.https || '',
              user: email,
              group_name: object.group,
            },
          });
        }
        navigate(ROUTES_PATH.dashboard);
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  // const isOnlineAssistance = user?.daas_configs?.has_online_assistance;

  useEffect(() => {
    if (id) {
      handleGetGroupMembers();
    }
  }, [handleGetGroupMembers, id]);

  return (
    <div className="grid w-full grid-cols-12 gap-6 mb-4">
      {isValidData ? (
        memberList.map((member) => {
          const onlineUser = member.is_running;
          const isOnlineAssistance = member.has_online_assistance;
          return (
            <div
              key={member.id}
              className="bg-neutral-100 rounded-lg p-2 h-12 col-span-10 md:col-span-6 xl:col-span-4 flex"
            >
              <div className="flex  gap-4 items-center mx-2">
                <ToolTip
                  tooltip={
                    onlineUser && isOnlineAssistance
                      ? t('onlineAssistance.enterDesktop')
                      : t('global.dontHaveAccess')
                  }
                >
                  <BaseButton
                    disabled={!onlineUser || !isOnlineAssistance}
                    label={t('onlineAssistance.enterDesktop')}
                    onClick={() =>
                      handleGoToUsersDesktop(member.id, member?.email)
                    }
                  />
                </ToolTip>
                <ToolTip
                  tooltip={
                    onlineUser
                      ? t('onlineAssistance.onlineUser')
                      : t('onlineAssistance.offlineUser')
                  }
                >
                  <Circle id={onlineUser as boolean} />
                </ToolTip>
              </div>
              <Typography variant="body2" color="neutral" className="mr-auto">
                {member?.email}
              </Typography>
            </div>
          );
        })
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
}
