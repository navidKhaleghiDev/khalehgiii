import usersThreeLight from '@iconify-icons/ph/users-three-light';
import userIcon from '@iconify-icons/ph/user';
import signOutBoldIcon from '@iconify-icons/ph/sign-out-bold';
import { UserOnlineAssistance } from '@src/services/users/types';
import { OnlineAssistantCard } from '@ui/organisms/Navbar/NavbarDashboard/HeadOnlineAssistant/OnlineAssistantCard';
import { IconButton } from '@ui/atoms/BaseButton';
import { http } from '@src/services/http';

import useSWR from 'swr';
import { E_USERS_KEEPALIVE } from '@src/services/users/endpoint';

type Props = {
  onlineAssistance: UserOnlineAssistance;
  logout: () => void;
};
export function HeadOnlineAssistantAdmin({ onlineAssistance, logout }: Props) {
  useSWR(E_USERS_KEEPALIVE, http.fetcherSWR, {
    refreshInterval: 60000,
  });

  return (
    <div className="w-96 flex justify-between shadow-md rounded-lg h-7 px-4 items-center bg-white dark:inset-0 dark:bg-cover dark:bg-blur dark:bg-opacity-20 gap-2">
      <OnlineAssistantCard
        icon={userIcon}
        title="کاربر"
        description={onlineAssistance.user}
      />
      <OnlineAssistantCard
        icon={usersThreeLight}
        title="گروه"
        description={onlineAssistance.group_name}
      />
      <IconButton
        icon={signOutBoldIcon}
        onClick={logout}
        size="md"
        color="red"
        type="button"
        className="rounded-full"
      />
    </div>
  );
}
