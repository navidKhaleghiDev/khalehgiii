import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import {
  API_ONLINE_ASSISTANCE,
  API_USERS_GROUPS_GET,
} from '@src/services/users';
import { GroupParams } from '@src/services/users/types';
import User from '@iconify-icons/ph/user';
import Monitor from '@iconify-icons/ph/monitor';
import { useUserContext } from '@context/user/userContext';
import { ROUTES_PATH } from '@src/routes/routesConstants';
import { ToolTip } from '@redesignUi/atoms/Tooltip';
import { Avatar, Typography } from '@redesignUi/atoms';
import { IconButton } from '@redesignUi/atoms/BaseButton';
import { LoadingSpinner } from '@redesignUi/molecules/Loading';
import { useLanguage } from '@context/settings/languageContext';

type AssistanceGroupDetailProps = {
  id: string;
  groupName: string;
};

export function AssistanceGroupDetail({
  id,
  groupName,
}: AssistanceGroupDetailProps) {
  const { t } = useTranslation();
  const { lang } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [memberList, setMemberList] = useState<GroupParams['users']>([]);
  const { user, setUser } = useUserContext();
  const navigate = useNavigate();

  const isValidData = memberList && !loading && id;
  const dir = lang === 'fa' ? 'right' : 'left';

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
        navigate(ROUTES_PATH.home);
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
    <div className="flex flex-col w-full gap-2.5 max-h-[42.5rem] p-5 overflow-y-auto">
      {isValidData ? (
        memberList.map((member) => {
          const onlineUser = member.is_running;
          const isOnlineAssistance = member.has_online_assistance;
          return (
            <div
              key={member.id}
              className="bg-white w-full border border-gray-100 rounded-lg p-5 h-12 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <Avatar icon={User} isActive={onlineUser} size="table" />
                <Typography variant="body5" color="neutral" className="">
                  {member?.email}
                </Typography>
              </div>
              <ToolTip
                position={dir}
                tooltip={
                  onlineUser && isOnlineAssistance
                    ? t('onlineAssistance.enterDesktop')
                    : t('global.dontHaveAccess')
                }
              >
                <IconButton
                  icon={Monitor}
                  color="neutralNoBg"
                  size="sm"
                  disabled={!onlineUser || !isOnlineAssistance}
                  onClick={() =>
                    handleGoToUsersDesktop(member.id, member?.email)
                  }
                />
              </ToolTip>
            </div>
          );
        })
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
}
