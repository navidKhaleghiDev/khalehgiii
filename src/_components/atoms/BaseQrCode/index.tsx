import { useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import QRCode from 'react-qr-code';

import PhArrowsClockwise from '@iconify-icons/ph/arrows-clockwise';
import { API_USERS_OTP } from '@src/services/users';
import { IconButton } from '@redesignUi/atoms/BaseButton';
import { LoadingSpinner } from '@redesignUi/molecules/Loading';
import { QrBorder } from '@redesignUi/atoms/Svgs/QrBorder';

interface BaseQrCodeProps {
  email?: string;
  secret?: string;
  setSecret: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export function BaseQrCode({ email, secret, setSecret }: BaseQrCodeProps) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const handleGenarateQrcode = async () => {
    if (email) {
      setLoading(true);
      await API_USERS_OTP(email)
        .then(({ data }) => {
          toast.success(t('global.sucessfulyUpdated'));
          setSecret(data?.secret);
        })
        .catch((err) => {
          toast.error(err);
        })
        .finally(() => setLoading(false));
    }
  };

  return (
    <div
      className={`md:relative flex flex-col gap-2 items-center justify-center lg:w-40 lg:h-40 w-[7.5rem]${
        loading ? 'loading' : ''
      }`}
    >
      <div className="flex items-center justify-center">
        {!loading ? (
          <div className="relative sm:h-[8.75rem] sm:w-[8.75rem] h-20 w-20">
            <QrBorder className="absolute sm:h-[8.75rem] sm:w-[8.75rem] h-20 w-20" />
            <QRCode
              value={`otpauth://totp/netsep?secret=${secret}`}
              className=" sm:w-[7.5rem] sm:h-[7.5rem] w-[3.75rem] h-[3.75rem] z-10 absolute right-2.5 top-2.5"
            />
          </div>
        ) : (
          <LoadingSpinner />
        )}
      </div>
      <IconButton
        disabled={loading}
        className="sm:absolute sm:bottom-2 sm:-right-10 "
        onClick={() => handleGenarateQrcode()}
        size="sm"
        icon={PhArrowsClockwise}
        color="neutral"
      />
    </div>
  );
}
