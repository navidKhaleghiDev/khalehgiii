import usersThreeLight from '@iconify-icons/ph/users-three-light';
import userIcon from '@iconify-icons/ph/user';
import signOutBoldIcon from '@iconify-icons/ph/sign-out-bold';
import { IUser, UserOnlineAssistance } from '@src/services/users/types';
import { OnlineAssistantCard } from '@ui/organisms/Navbar/NavbarDashboard/HeadOnlineAssistant/OnlineAssistantCard';
import { IconButton } from '@ui/atoms/BaseButton';
import {
  http,
  STORAGE_KEY_REFRESH_TOKEN,
  STORAGE_KEY_TOKEN,
} from '@src/services/http';

import useSWR from 'swr';
import { E_USERS_KEEPALIVE } from '@src/services/users/endpoint';
import { API_USERS_LOGOUT_ONLINE_ASSISTANCE } from '@src/services/users';
import { useUserContext } from '@context/user/userContext';
import { useEffect, useState } from 'react';
import cookie from 'js-cookie';
import { io } from 'socket.io-client';

const SOCKET_URL = 'http://192.168.2.23:8009';

type Props = {
  onlineAssistance: UserOnlineAssistance;
};
type IUserUpdate = Partial<IUser>;
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
    const updatedUser: IUserUpdate = { ...user, online_assistance: null };
    setUser(updatedUser as IUser);
  };

  const [socket, setSocket] = useState(null);
  const token = cookie.get(STORAGE_KEY_TOKEN);

  useEffect(() => {
    // Initialize socket connection
    const newSocket = io(SOCKET_URL, {
      transports: ['websocket'], // Use WebSocket transport
      path: '/ws/online_assistance/', // Ensure the correct path is used
      auth: {
        token: token, // Pass the token in the auth object
      },
    });

    // Save socket instance to state
    setSocket(newSocket);

    // Handle cleanup on component unmount
    return () => {
      newSocket.disconnect();
    };
  }, [token]);

  useEffect(() => {
    if (socket) {
      // Handle connection events
      socket.on('connect', () => {
        console.log('Connected to WebSocket server');
      });

      socket.on('connect_error', (error) => {
        console.error('Connection Error:', error);
      });

      socket.on('disconnect', () => {
        console.log('Disconnected from WebSocket server');
      });

      socket.on('some_event', (data) => {
        console.log('Received some_event:', data);
      });
    }
  }, [socket]);

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
