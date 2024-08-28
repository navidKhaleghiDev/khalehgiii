import usersThreeLight from '@iconify-icons/ph/users-three-light';
import userIcon from '@iconify-icons/ph/user';
import signOutBoldIcon from '@iconify-icons/ph/sign-out-bold';
import { IUser, UserOnlineAssistance } from '@src/services/users/types';
import { OnlineAssistantCard } from '@ui/organisms/Navbar/NavbarDashboard/HeadOnlineAssistant/OnlineAssistantCard';
import { IconButton } from '@ui/atoms/BaseButton';
import { http, STORAGE_KEY_REFRESH_TOKEN } from '@src/services/http';
import useSWR from 'swr';
import { E_USERS_KEEPALIVE } from '@src/services/users/endpoint';
import { API_USERS_LOGOUT_ONLINE_ASSISTANCE } from '@src/services/users';
import { useUserContext } from '@context/user/userContext';
import { useTranslation } from 'react-i18next';

type Props = {
  onlineAssistance: UserOnlineAssistance;
};

type IUserUpdate = Partial<IUser>;

export function HeadOnlineAssistantAdmin({ onlineAssistance }: Props) {
  const { user, setUser } = useUserContext();
  const { t } = useTranslation();

  useSWR(E_USERS_KEEPALIVE, http.fetcherSWR, {
    refreshInterval: 60000,
  });

  const refresh = localStorage.getItem(STORAGE_KEY_REFRESH_TOKEN);

  const logoutFunction = async () => {
    const data = {
      refresh_token: refresh || '',
    };
    await API_USERS_LOGOUT_ONLINE_ASSISTANCE(data);
  };

  const logout = () => {
    logoutFunction();
    const updatedUser: IUserUpdate = { ...user, online_assistance: null };
    setUser(updatedUser as IUser);
  };

  return (
    <div className="w-96 flex flex-col justify-between shadow-md rounded-lg h-7 px-4 items-center bg-white dark:inset-0 dark:bg-cover dark:bg-blur dark:bg-opacity-20 gap-2">
      <div className="flex justify-between w-full items-center  h-7">
        <OnlineAssistantCard
          icon={userIcon}
          title={t('global.user')}
          description={onlineAssistance.user}
        />
        <OnlineAssistantCard
          icon={usersThreeLight}
          title={t('global.group')}
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
    </div>
  );
}
