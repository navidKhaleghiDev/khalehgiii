import usersThreeLight from '@iconify-icons/ph/users-three-light';
import userIcon from '@iconify-icons/ph/user';
import signOutBoldIcon from '@iconify-icons/ph/sign-out-bold';
import { UserOnlineAssistance } from '@src/services/users/types';
import { http } from '@src/services/http';

import useSWR from 'swr';
import { E_USERS_KEEPALIVE } from '@src/services/users/endpoint';
import { useLogout } from '@src/helper/hooks/useLogout';
import { OnlineAssistantCard } from '@ui/organisms/Navbar/component/HeadOnlineAssistant/OnlineAssistantCard';
import { IconButton } from '@ui/atoms/BaseButton';

type Props = {
  onlineAssistance: UserOnlineAssistance;
};

export function HeadOnlineAssistantAdmin({ onlineAssistance }: Props) {
  const { logoutAssistance } = useLogout();

  useSWR(E_USERS_KEEPALIVE, http.fetcherSWR, {
    refreshInterval: 60000,
  });

  return (
    <div className=" flex justify-center items-center w-[350px] px-4 h-10 bg-gray-100 rounded-lg">
      <div className="flex justify-between w-full items-center h-7">
        <OnlineAssistantCard
          icon={userIcon}
          description={onlineAssistance.user}
        />
        <OnlineAssistantCard
          icon={usersThreeLight}
          description={onlineAssistance.group_name}
        />
        <IconButton
          onClick={logoutAssistance}
          icon={signOutBoldIcon}
          size="md"
          color="neutralNoBg"
          type="button"
          className="rounded-full"
        />
      </div>
    </div>
  );
}
