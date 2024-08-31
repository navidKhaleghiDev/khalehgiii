import userGearIcon from '@iconify-icons/ph/user-gear';
import cookie from 'js-cookie';
import PhRecordFill from '@iconify-icons/ph/record-fill';
import { OnlineAssistantCard } from '@ui/organisms/Navbar/NavbarDashboard/HeadOnlineAssistant/OnlineAssistantCard';
import { useEffect, useState } from 'react';
import { STORAGE_KEY_TOKEN } from '@src/services/http';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
// import CryptoJS from 'crypto-js';

interface ConnectionMessage {
  admin: string;
  status: string;
}

export function HeadOnlineAssistantUser() {
  const { t } = useTranslation();
  const [messageHistory, setMessageHistory] =
    useState<ConnectionMessage | null>(null);

  const token = cookie.get(STORAGE_KEY_TOKEN);

  // const SECRET_KEY = 'NETPARDAZ';
  // const encryptedToken = CryptoJS.AES.encrypt(token || '', SECRET_KEY, {
  //   mode: CryptoJS.mode.ECB,
  //   padding: CryptoJS.pad.Pkcs7,
  // }).toString();

  // const socketUrl = `ws://192.168.2.23:8009/ws/online_assistance/?token=${encodeURIComponent(
  //   encryptedToken
  // )}`;

  const socketUrl = `ws://192.168.2.23:8009/ws/online_assistance/?token=${token}`;

  const { lastMessage, readyState } = useWebSocket(socketUrl, {
    shouldReconnect: () => true,
  });

  useEffect(() => {
    if (!lastMessage) return;

    const { data } = lastMessage;
    const { message } = JSON.parse(data) || {};

    setMessageHistory(message);
  }, [lastMessage]);

  useEffect(() => {
    if (readyState === ReadyState.CLOSED) {
      toast.error(t('global.somethingWentWrong'));
    }
  }, [readyState, t]);

  return (
    <div>
      {messageHistory && messageHistory.status === 'connected' && (
        <div className="w-70 text-sm shadow-md rounded-lg h-7 px-2 flex items-center bg-white dark:inset-0 dark:bg-cover dark:bg-blur dark:bg-opacity-20 gap-2">
          <OnlineAssistantCard
            icon={userGearIcon}
            title={t('global.admin')}
            description={messageHistory.admin}
          />
          <OnlineAssistantCard
            icon={PhRecordFill}
            title={t('global.status')}
            color="teal"
            description={messageHistory.status}
          />
        </div>
      )}
    </div>
  );
}
