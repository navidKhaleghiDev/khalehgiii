// eslint-disable-next-line import/no-extraneous-dependencies
import CryptoJS from 'crypto-js';
import cookie from 'js-cookie';
import useWebSocket from 'react-use-websocket';
import { useEffect, useState } from 'react';
import { STORAGE_KEY_TOKEN } from '@src/services/http';
import { OnlineAssistantCard } from '@ui/organisms/Navbar/NavbarDashboard/HeadOnlineAssistant/OnlineAssistantCard';
import PhRecord from '@iconify-icons/ph/record';
import { BaseIcon } from '@redesignUi/atoms';
import usersThreeLight from '@iconify-icons/ph/users-three-light';
import userIcon from '@iconify-icons/ph/user';

const URL = import.meta.env.VITE_WEB_SOCKET_URL;

interface ConnectionMessage {
  admin: string;
  status: string;
  group: string;
}

/**
 * `HeadOnlineAssistantUser` is a React component that establishes a WebSocket connection
 * to monitor the online status of an assistant user. It displays the admin's name and
 * connection status when the connection is active.
 *
 * @component
 *
 * @returns {JSX.Element} The rendered component showing the online assistant's status and admin.
 *
 * @example
 * return <HeadOnlineAssistantUser />;
 */
export function HeadOnlineAssistantUser() {
  const [messageHistory, setMessageHistory] =
    useState<ConnectionMessage | null>(null);

  const token = cookie.get(STORAGE_KEY_TOKEN);

  // Secret key for token encryption
  const SECRET_KEY = CryptoJS.enc.Utf8.parse('F@#&C@)+*1!WRTGB');

  // Encrypt the token using AES encryption
  const encryptedToken = CryptoJS.AES.encrypt(token || '', SECRET_KEY, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  }).toString();

  // Encode the encrypted token for use in a URL
  const encodedToken = encodeURIComponent(encryptedToken);

  // WebSocket URL with the encoded token
  const socketUrl = `${URL}/ws/online_assistance/?token=${encodedToken}`;

  // Establish WebSocket connection
  const { lastMessage } = useWebSocket(socketUrl);

  /**
   * Effect to handle incoming WebSocket messages.
   * Updates the message history with the latest connection message.
   */
  useEffect(() => {
    if (!lastMessage) return;

    const { data } = lastMessage;
    const { message } = JSON.parse(data) || {};

    setMessageHistory(message);
  }, [lastMessage]);

  return (
    <div>
      {messageHistory && messageHistory.status === 'connected' && (
        <div className="flex justify-center items-center max-w-[450px] px-4 h-10 bg-gray-100 rounded-lg">
          <div className="flex gap-2 justify-between w-full items-center h-7">
            <OnlineAssistantCard
              icon={userIcon}
              description={messageHistory.admin}
            />
            <OnlineAssistantCard
              icon={usersThreeLight}
              description={messageHistory.group}
            />
            <BaseIcon icon={PhRecord} color="red" />
          </div>
        </div>
      )}
    </div>
  );
}