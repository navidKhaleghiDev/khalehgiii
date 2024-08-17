import usersThreeLight from '@iconify-icons/ph/users-three-light';
import userIcon from '@iconify-icons/ph/user';
import signOutBoldIcon from '@iconify-icons/ph/sign-out-bold';
import { UserOnlineAssistance } from '@src/services/users/types';
import { OnlineAssistantCard } from '@ui/organisms/Navbar/NavbarDashboard/HeadOnlineAssistant/OnlineAssistantCard';
import { IconButton } from '@ui/atoms/BaseButton';
import { http, STORAGE_KEY_REFRESH_TOKEN } from '@src/services/http';

import useSWR from 'swr';
import { E_USERS_KEEPALIVE } from '@src/services/users/endpoint';
import { API_USERS_LOGOUT_ONLINE_ASSISTANCE } from '@src/services/users';
import { useUserContext } from '@context/user/userContext';

type Props = {
  onlineAssistance: UserOnlineAssistance;
};
export function HeadOnlineAssistantAdmin({ onlineAssistance }: Props) {
  const { user, setUser } = useUserContext();

  useSWR(E_USERS_KEEPALIVE, http.fetcherSWR, {
    refreshInterval: 60000,
  });

  const refresh = localStorage.getItem(STORAGE_KEY_REFRESH_TOKEN);

  async function logoutFunction() {
    const data = {
      refresh_token: refresh || '',
    };

    await API_USERS_LOGOUT_ONLINE_ASSISTANCE(data);
  }

  const logout = () => {
    logoutFunction();
    setUser({ ...user, online_assistance: null });
  };

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
        onClick={logout}
        icon={signOutBoldIcon}
        size="md"
        color="red"
        type="button"
        className="rounded-full"
      />
    </div>
  );
}
